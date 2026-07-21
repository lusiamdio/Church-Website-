import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent set to 'aistudio-build' as required
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY environment variable is missing. AI functionality will fallback to high-quality template responses.");
}

// Church Information Context to guide the AI
const CHURCH_SYSTEM_INSTRUCTION = `
You are "Grace AI", the premium spiritual and operational digital assistant of the "Sanctuary of Jesus Christ Evangelical Church House of Restoration".
Your tone is deeply encouraging, respectful, warm, spiritual, wise, and highly organized. 

Church Profile:
- Name: Sanctuary of Jesus Christ Evangelical Church House of Restoration.
- Lead Pastors: Apostle David Martinez & Prophetess Maria Martinez.
- Vision: To restore families, heal the broken-hearted, and equip believers to impact the world for Jesus Christ.
- Location: 11 Lower Maynard Road, Wynberg, Cape Town.
- Contact Numbers: +27 67 998 2100 | +27 74 349 0883
- Contact Email: contact@sjchchurch.org
- Service Times: 
  - Sundays at 10:15 AM SAST: Sunday Early Celebration (Praise, Testimonies).
  - Tuesdays at 9:30 PM SAST: Tuesday Online Intercession Service.
  - Thursdays at 7:15 PM SAST: Thursday Church Intercession Service.
- Ministries:
  - Kingdom Kids: Exciting and safe children's church (Ages 1-11) during Sunday services.
  - Restoration Youth: Dynamic youth ministry (Ages 12-18), meeting Fridays at 7:30 PM.
  - Young Adults (Elevate): Gathering for young professionals and university students (Ages 18-35), monthly meetings.
  - Virtuous Women of Restoration: Empowering women's ministry, prayer breakfasts every 2nd Saturday.
  - Men of Honor: Character-building men's group, monthly fellowship every 1st Saturday.
  - United in Grace: Marriage and family ministry, counseling, and dynamic date nights.
  - The Quohelettes (Music/Worship): Premium acoustic and electronic modern worship.
  - Global Impact (Missions): Supporting missionaries in Latin America, Africa, and Asia.
  - Hands of Hope (Outreach): Food pantry, clothing drives, and community rehabilitation projects.

Theological Alignment:
You believe in the Bible as the final authority of faith and practice, salvation through faith in Jesus Christ, the power of prayer, spiritual transformation, and the active gifts of the Holy Spirit.

Answering Capabilities:
- Answer church questions (service times, ministries, events, location, directions).
- Provide biblically-grounded counsel and spiritual guidance (encouragement, verses, prayers).
- Guide users on event registration, children's check-in, small groups, and secure online giving.
- Offer assistance in multiple languages (English, Spanish, Portuguese, French, Swahili, Zulu, Xitsonga, Lingala).
- Keep responses relatively concise, structured, and spiritually uplifting. Do not invent details that are not in this prompt.
`;

// 1. Grace AI Assistant Endpoint
app.post("/api/chat", async (req, res) => {
  const { messages, userLanguage = "English" } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages array" });
  }

  const userQuery = messages[messages.length - 1]?.text || "Hello";

  // Fallback if API key is not present
  if (!ai) {
    return res.json({
      text: `Hello! Welcome to Sanctuary of Jesus Christ Evangelical Church House of Restoration. I'm Grace AI, your virtual assistant. Currently, I'm running in offline/template mode, but I can happily tell you that we meet on Sundays at 10:15 AM (Early Celebration - Praise & Testimonies), Tuesdays at 9:30 PM (Online Intercession Service), and Thursdays at 7:15 PM (Church Intercession Service). Our address is 11 Lower Maynard Road, Wynberg, Cape Town. Let me know if you would like to plan a visit!`,
    });
  }

  try {
    // Format conversation history for Gemini Content structure
    const promptContents = messages.map((m: any) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }));

    // Generate content using the correct SDK model and parameters
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptContents,
      config: {
        systemInstruction: `${CHURCH_SYSTEM_INSTRUCTION}\nPreferred output language is ${userLanguage}. Please respond naturally in this language.`,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "I'm sorry, I'm experiencing an issue generating a response." });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    // Graceful offline fallback on error so the app never fails
    res.json({
      text: `Hello! Welcome to Sanctuary of Jesus Christ Evangelical Church House of Restoration. I'm Grace AI, your virtual assistant. Currently, I'm running in an automated offline mode, but I can happily tell you that we meet on Sundays at 10:15 AM (Early Celebration - Praise & Testimonies), Tuesdays at 9:30 PM (Online Intercession Service), and Thursdays at 7:15 PM (Church Intercession Service). Our address is 11 Lower Maynard Road, Wynberg, Cape Town. Let me know how I can help support you today!`,
    });
  }
});

// 2. AI Sermon Assistant Endpoint
app.post("/api/sermon-chat", async (req, res) => {
  const { sermonTitle, sermonScriptures, question, history = [] } = req.body;
  if (!sermonTitle || !question) {
    return res.status(400).json({ error: "Missing sermonTitle or question" });
  }

  if (!ai) {
    return res.json({
      text: `That is a wonderful question about the sermon "${sermonTitle}". In the sermon notes, we discuss walking in faith, restoring our relationship with God, and shining our light. Keep studying and applying the principles of Scripture to your daily walk!`,
    });
  }

  try {
    const systemPrompt = `
You are the "AI Sermon Assistant" for Sanctuary of Jesus Christ Evangelical Church House of Restoration.
Your task is to answer user questions about a specific sermon.

Sermon Details:
- Title: "${sermonTitle}"
- Accompanying Bible Verses: ${sermonScriptures || "Not specified"}

Theology Guide:
Provide biblical, faith-affirming, practical answers that clarify theological concepts, provide real-world applications of scripture, and encourage the user's walk of faith. Focus on restoration, grace, and spiritual growth. Keep your answers warm and spiritually nourishing.
`;

    const chatContents = [
      ...history.map((h: any) => ({
        role: h.sender === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      {
        role: 'user',
        parts: [{ text: question }]
      }
    ];

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: chatContents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.6,
      }
    });

    res.json({ text: response.text || "Grace is with you. Let's continue reflecting on this word." });
  } catch (error: any) {
    console.error("Gemini Sermon Chat Error:", error);
    // Graceful offline fallback on error so the app never fails
    res.json({
      text: `Thank you for your question about the sermon "${sermonTitle}". In our sermon series, we explore walking in faith, restoring our relationship with God, and shining our light. Reflect on the scriptures we discussed: ${sermonScriptures || "our foundational texts"}. Keep studying and applying the principles of Scripture to your daily walk!`,
    });
  }
});

// 3. AI Bible Study Recommendation Endpoint
app.post("/api/bible-study", async (req, res) => {
  const { feeling } = req.body;
  if (!feeling) {
    return res.status(400).json({ error: "Feeling/Emotion is required." });
  }

  if (!ai) {
    return res.json({
      text: "Based on what you are experiencing, we encourage you to reflect on Philippians 4:6-7: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' Remember that our church family stands with you, and Pastors Apostle David and Prophetess Maria Martinez pray for your complete restoration.",
      scriptures: [
        { reference: "Philippians 4:6-7", text: "Do not be anxious about anything..." },
        { reference: "Isaiah 41:10", text: "So do not fear, for I am with you..." }
      ],
      devotion: "Experiencing Peace in Stressful Seasons. God is near and holds your future.",
      prayer: "Lord, I surrender my worries and embrace Your infinite grace.",
      churchGroup: "Restoring Grace Support Group & United Prayer Ministry"
    });
  }

  try {
    const prompt = `
The visitor is expressing that they feel: "${feeling}".
Provide a spiritually nourishing, customized Christian devotional recommendations package in JSON format.

Your output must be a valid JSON object matching this structure exactly:
{
  "text": "A warm, empathetic pastoral paragraph of 2-3 sentences responding to their feeling.",
  "scriptures": [
    { "reference": "Bible book, chapter, and verse", "text": "Full verse text" },
    { "reference": "Bible book, chapter, and verse", "text": "Full verse text" }
  ],
  "devotion": "A concise 3-4 sentence devotional reflection on God's truth regarding this emotion.",
  "prayer": "A beautiful, personal prayer (2 sentences) they can pray right now.",
  "churchGroup": "Name of an applicable church group or ministry (e.g., United Prayer Team, Young Adults Elevate, Men of Honor, Kingdom Ladies, United in Grace Marriage counseling)"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Bible Study Error:", error);
    // Graceful offline fallback on error so the app never fails
    res.json({
      text: `Based on your feelings of "${feeling}", we encourage you to reflect on Philippians 4:6-7: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.' Remember that our church family stands with you in this hour.`,
      scriptures: [
        { reference: "Philippians 4:6-7", text: "Do not be anxious about anything..." },
        { reference: "Isaiah 41:10", text: "So do not fear, for I am with you..." }
      ],
      devotion: "Experiencing Peace in Stressful Seasons. God is near and holds your future. He will never leave you nor forsake you.",
      prayer: "Lord, I surrender my thoughts and feelings to You. I embrace Your infinite grace.",
      churchGroup: "Restoring Grace Support Group & United Prayer Ministry"
    });
  }
});

// 4. AI Admin Event Planner Endpoint
app.post("/api/admin/event-planner", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Event details prompt is required." });
  }

  if (!ai) {
    return res.json({
      posterText: "YOUTH REVIVAL FRIDAY\nDate: This Friday at 7:30 PM\nLocation: Main Sanctuary\nTheme: Set Ablaze for Christ!",
      socialPost: "🔥 Are you ready for an encounter? Join Restoration Youth this Friday at 7:30 PM! High energy praise, powerful worship, and a life-transforming message. Bring a friend! #RestorationYouth #YouthRevival",
      emailCampaign: "Subject: You are invited to the Youth Revival this Friday!\n\nDear Sanctuary Family,\n\nOur youth ministry is gathering this Friday at 7:30 PM for a night of spiritual fire and restoration. Pastors Apostle David and Prophetess Maria encourage all families to participate!\n\nBlessings,\nMedia Team",
      schedule: "6:30 PM - Set Up & Volunteer Prayer\n7:00 PM - Doors Open & Icebreakers\n7:30 PM - Main Event Begins (Worship & Word)\n9:00 PM - Fellowship & Refreshments",
      volunteerAssignments: "Ushers: Kingdom Youth Leaders\nAudio/Visual: Sanctuary Media Team\nHospitality: United in Grace volunteers"
    });
  }

  try {
    const systemPrompt = `
You are the "AI Event Planner & Communications Specialist" for Sanctuary of Jesus Christ Evangelical Church House of Restoration.
You will receive an event concept (e.g., "Youth Revival Friday" or "Marriage Date Night").
Generate high-end promotional material and operational outlines in JSON format.

Your output must be a valid JSON object matching this structure exactly:
{
  "posterText": "Bold, cinematic, promotional text layout for physical or digital flyers.",
  "socialPost": "An engaging, modern Instagram/Facebook post including hashtags and emojis.",
  "emailCampaign": "A structured, warm email newsletter campaign with an inviting Subject Line.",
  "schedule": "Hour-by-hour operational breakdown of the event day.",
  "volunteerAssignments": "Recommended team role assignments based on our church ministry sectors."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.8,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Event Planner Error:", error);
    // Graceful fallback on error so the admin view doesn't break
    res.json({
      posterText: `SPECIAL EVENT\nTopic: ${prompt}\nLocation: Main Sanctuary\nJoin us for a powerful time of gathering!`,
      socialPost: `🔥 Don't miss out on our upcoming event focusing on "${prompt}"! Come with an open heart. Bring your family and friends! #Restoration #SanctuaryGrace`,
      emailCampaign: `Subject: You are invited to our special focus event: ${prompt}!\n\nDear Sanctuary Family,\n\nWe invite you to join us as we gather together around "${prompt}". Apostle David and Prophetess Maria look forward to welcoming you!\n\nBlessings,\nMedia Team`,
      schedule: "6:30 PM - Set Up & Volunteer Prayer\n7:00 PM - Doors Open\n7:30 PM - Main Event Begins\n9:00 PM - Fellowship & Connections",
      volunteerAssignments: "Ushers: Kingdom Welcome Team\nAudio/Visual: Sanctuary Media Team\nHospitality: United in Grace volunteers"
    });
  }
});

// 5. AI Pastor Content Generator Endpoint
app.post("/api/admin/content-generator", async (req, res) => {
  const { sermonOutline } = req.body;
  if (!sermonOutline) {
    return res.status(400).json({ error: "Sermon outline text is required." });
  }

  if (!ai) {
    return res.json({
      blogPost: "Walking in Divine Restoration: A Reflection from our Pastor\n\nMany of us walk through seasons of brokenness, but Apostle David teaches that God is in the business of complete restoration. No matter where you find yourself, grace is available to rebuild, refresh, and restore...",
      instagramSlides: [
        "Slide 1: God is in the Business of RESTORATION.",
        "Slide 2: Brokenness is never the end of your story.",
        "Slide 3: Walk in Grace. Grow in faith. Impact your community."
      ],
      newsletter: "Restoration News & Weekly Devotional\n\nThis week, Prophetess Maria Martinez shared a powerful word about abiding in the vineyard of the Lord...",
      smallGroupGuide: "Small Group Discussion Questions:\n1. Read Joel 2:25. How have you seen God restore years in your own life?\n2. What practical steps can we take to encourage others going through brokenness?",
      childDevotional: "Memory Verse: 'I am restoring you.'\nHey Kids! Did you know that God can fix anything? Just like putting a puzzle back together, Jesus puts our hearts back together with His love!"
    });
  }

  try {
    const systemPrompt = `
You are the "AI Pastoral Content Coordinator" for Sanctuary of Jesus Christ Evangelical Church House of Restoration.
You will receive a raw sermon outline or topic.
Generate highly refined content packages in JSON format.

Your output must be a valid JSON object matching this structure exactly:
{
  "blogPost": "A complete, beautifully structured editorial article (approx 200-300 words) with title, subtitles, and inspiring call to action.",
  "instagramSlides": [
    "Slide 1 Title & Text",
    "Slide 2 Title & Text",
    "Slide 3 Title & Text",
    "Slide 4 Title & Text"
  ],
  "newsletter": "A heartwarming pastoral email letter summarizing the devotional focus for families.",
  "smallGroupGuide": "A comprehensive small group leader guide containing opening prayer, scripture focus, 3 discussion questions, and application step.",
  "childDevotional": "A fun, simple, illustrative devotional with a memory verse and short story suitable for parents to teach kids."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: sermonOutline,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Content Generator Error:", error);
    // Graceful fallback on error
    res.json({
      blogPost: `Reflections on: ${sermonOutline}\n\nOur pastoral team is focused on helping you grow in faith and walk in divine grace. In this devotional, we explore the depth of Scripture and how to find divine peace amidst life's challenges. Remember that God's grace is sufficient for you...`,
      instagramSlides: [
        `Slide 1: Understanding ${sermonOutline.slice(0, 30)}...`,
        "Slide 2: Find strength in scripture and fellowship.",
        "Slide 3: Join us this Sunday to learn and grow together."
      ],
      newsletter: `Weekly Devotional Focus: ${sermonOutline.slice(0, 50)}\n\nHello Family,\nThis week we are diving into our spiritual journey and discovering the restoring grace of God in every area of life...`,
      smallGroupGuide: `Small Group Discussion Questions:\n1. Reflecting on ${sermonOutline.slice(0, 30)}, what stood out to you most?\n2. How can we apply these truths to our daily lives this week?\n3. What prayer focus should our group have?`,
      childDevotional: `Memory Verse: 'The Lord is my shepherd.'\nHey Kids! Jesus is always with us, leading us and caring for us like a shepherd. No matter what, we can trust Him because He loves us so much!`
    });
  }
});

// 6. AI Prayer Follow-up Endpoint
app.post("/api/prayer-followup", async (req, res) => {
  const { name, text, category, prayedCount } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Prayer request text is required." });
  }

  // Helper local fallback function
  const getLocalPrayerFollowup = () => {
    let defaultVerse = "Philippians 4:6-7 - 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God.'";
    if (category === "Health" || category === "Healing") {
      defaultVerse = "Jeremiah 30:17 - 'But I will restore you to health and heal your wounds, declares the Lord...'";
    } else if (category === "Financial" || category === "Employment" || category === "Financial / Job") {
      defaultVerse = "Philippians 4:19 - 'And my God will meet all your needs according to the riches of his glory in Christ Jesus.'";
    } else if (category === "Family" || category === "Marriage") {
      defaultVerse = "Joshua 24:15 - 'But as for me and my household, we will serve the Lord.'";
    }

    return {
      message: `Dear ${name || "beloved family member"}, we receive your prayer request regarding your ${category || "needs"} with a heart of faith. We stand in agreement with you, believing that God's power of restoration is breaking through in your life. Do not lose heart—He is faithful to hold you in this season.`,
      verse: defaultVerse,
      communitySummary: `Our United Prayer Team, along with ${prayedCount || 1} members from the House of Restoration community, are actively lifting your petition. Pastors Apostle David and Prophetess Maria pray over these needs daily, trusting God for your complete restoration.`
    };
  };

  if (!ai) {
    return res.json(getLocalPrayerFollowup());
  }

  try {
    const prompt = `
You are the "AI Pastoral Care Companion" at Sanctuary of Jesus Christ Evangelical Church House of Restoration.
Your task is to provide a gentle, deeply encouraging, biblically-sound, and compassionate pastoral follow-up to a user's prayer request.
We lead with restoration, hope, and faith in Jesus Christ, guided by our Lead Pastors Apostle David and Prophetess Maria Martinez.

Prayer Details:
- Submitted by: "${name || "Anonymous"}"
- Prayer Category: "${category || "General"}"
- Prayer Text: "${text}"
- Number of people who have prayed on the wall: ${prayedCount || 1}

Generate a compassionate response package in JSON format. Your output must be a valid JSON object matching this structure exactly:
{
  "message": "A deeply compassionate, comforting, and encouraging pastoral message (3-4 sentences) responding to their specific trial or praise report. Align with church teachings, mention their faith, and assure them of God's active power of restoration.",
  "verse": "A relevant Bible verse with reference and full text to comfort them in their specific need.",
  "communitySummary": "A summary of how the church community is standing with them (e.g., 'Our United Prayer Circle and corresponding ministry teams have added your request to their weekly intercession logs. Apostle David and Prophetess Maria pray over these requests every morning. You have ${prayedCount} prayer warriors standing in agreement with you right now.')"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.7,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Prayer Follow-up Error:", error);
    // Graceful offline fallback on error so the app never fails!
    res.json(getLocalPrayerFollowup());
  }
});

// 7. AI Sermon Recommendations Endpoint
app.post("/api/sermon-recommendations", async (req, res) => {
  const { viewingHistory = [], explicitInterests = [], prayerRequests = [], allSermons = [] } = req.body;

  const getLocalSermonRecommendations = () => {
    // Offline recommendation matching by category
    const recommended: any[] = [];
    const queryCategories = new Set([
      ...explicitInterests.map((i: string) => i.toLowerCase()),
      ...prayerRequests.map((p: any) => p.category?.toLowerCase())
    ]);

    allSermons.forEach((sermon: any) => {
      const matchInterest = queryCategories.has(sermon.category.toLowerCase());
      const hasWatched = viewingHistory.includes(sermon.id);
      if (matchInterest && !hasWatched && recommended.length < 3) {
        recommended.push({
          sermonId: sermon.id,
          reasoning: `Based on your interest in ${sermon.category} and current prayers, Apostle David's teaching in "${sermon.title}" will build your faith.`
        });
      }
    });

    if (recommended.length < 2) {
      allSermons.slice(0, 3).forEach((sermon: any) => {
        if (!recommended.find(r => r.sermonId === sermon.id) && recommended.length < 3) {
          recommended.push({
            sermonId: sermon.id,
            reasoning: `Highly recommended foundational sermon on ${sermon.category} by our pastoral team to encourage your walk.`
          });
        }
      });
    }

    return {
      recommendations: recommended,
      spiritualFocus: "A season of alignment and rebuilding your personal altar of prayer."
    };
  };

  if (!ai) {
    return res.json(getLocalSermonRecommendations());
  }

  try {
    const prompt = `
You are the "AI Sermon Recommender" for Sanctuary of Jesus Christ Evangelical Church House of Restoration.
Your job is to recommend the most relevant sermons from our library to a church member based on:
1. Their sermon viewing history: ${JSON.stringify(viewingHistory)}
2. Their explicit interests: ${JSON.stringify(explicitInterests)}
3. Inferred needs from their prayer requests: ${JSON.stringify(prayerRequests.map((p: any) => ({ category: p.category, text: p.text })))}

Available Sermons in Library:
${JSON.stringify(allSermons.map((s: any) => ({ id: s.id, title: s.title, category: s.category, description: s.description, series: s.series })))}

Analyze these inputs and select the top 2-3 most relevant sermons. For each recommended sermon, provide a tailored pastoral reasoning of why it matches their current season, viewing habits, or prayer needs.

Your output must be a valid JSON object matching this structure exactly:
{
  "recommendations": [
    {
      "sermonId": "The ID of the recommended sermon",
      "reasoning": "A highly personalized, compassionate pastoral sentence explaining why this sermon was recommended based on their interests, history, or prayer needs."
    }
  ],
  "spiritualFocus": "A brief summary (1-2 sentences) of their current spiritual focus area with a warm, encouraging closing word."
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.6,
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (error: any) {
    console.error("Gemini Recommendations Error:", error);
    // Graceful offline fallback on error so the app never fails!
    res.json(getLocalSermonRecommendations());
  }
});


// Serve Vite App
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
  });
}

bootstrap();
