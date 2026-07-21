import { Sermon, Ministry, Event, Testimony, QuizQuestion } from "./types";

export const sermonsData: Sermon[] = [
  {
    id: "sermon-1",
    title: "The Architecture of Restoration",
    speaker: "Apostle David Martinez",
    date: "July 12, 2026",
    duration: "42 min",
    category: "Faith",
    series: "Restoration Season",
    description: "Discover how God takes the broken pieces of our lives, families, and dreams and reconstructs them into masterpieces of divine grace.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder fits standard iframe
    summary: "In this foundation message, Apostle David outlines the biblical architecture of spiritual, relational, and emotional rebuilding based on Nehemiah and Joel 2.",
    keyPoints: [
      "Brokenness is never the final destination; it is the raw material for a miracle.",
      "God's restoration is never a mere patch; it is a complete upgrades process.",
      "Taking ownership of our spiritual gates aligns us with divine reconstruction."
    ],
    bibleReferences: [
      "Joel 2:25-27 - 'I will restore to you the years that the swarming locust has eaten...'",
      "Nehemiah 2:17 - 'Come, let us rebuild the wall of Jerusalem, and we will no longer be in disgrace.'"
    ],
    discussionQuestions: [
      "What areas of your life currently feel like 'broken walls' that need God's structural restoration?",
      "How does Nehemiah's strategy of praying first, then planning, apply to your current personal challenges?",
      "How do we guard our 'gates' (what we see, hear, and allow in our hearts) during a rebuilding phase?"
    ],
    prayer: "Heavenly Father, I thank You that You are the Master Builder. I surrender every broken wall of my family, career, and inner spirit to Your healing hands. Restore, rebuild, and re-establish me in Your grace. In Jesus' name, Amen.",
    reflection: "Spend 5 minutes in silence today listing your concerns. Then write ' Joel 2:25' across them as a physical act of faith in God's power to restore.",
    transcript: "Welcome church. Today we are launching a new series: The Architecture of Restoration. Look at Nehemiah. He looked at the broken walls of Jerusalem and wept. But he didn't stay in tears; he moved into prayer, planning, and action. Many of you are looking at broken structures in your family or mind. God is saying, 'Let Me build.' When God restores, He doesn't just put back what was lost; He makes it far more beautiful. Trust the blueprint of Jesus Christ. Let us rise and build..."
  },
  {
    id: "sermon-2",
    title: "Abiding in Perfect Peace",
    speaker: "Prophetess Maria Martinez",
    date: "July 5, 2026",
    duration: "38 min",
    category: "Healing",
    series: "Unshakable Souls",
    description: "In a world screaming with anxiety, how do we establish our minds in the tranquil, healing sanctuary of God's presence?",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "Prophetess Maria Martinez delivers a powerful message on mental health and spiritual warfare, sharing key scriptures and techniques to silence anxiety.",
    keyPoints: [
      "Anxiety is a indicator of a missing connection to the Vine.",
      "The mind is a battlefield; we conquer it with the Word of God.",
      "Peace is not the absence of trouble; it is the presence of Jesus Christ."
    ],
    bibleReferences: [
      "Philippians 4:6-7 - 'Do not be anxious about anything, but in everything...'",
      "Isaiah 26:3 - 'You will keep in perfect peace him whose mind is steadfast...'"
    ],
    discussionQuestions: [
      "What thoughts typically trigger anxiety in your daily routine?",
      "How can we practice 'casting our cares' onto Jesus practically, rather than picking them back up?",
      "What does a 'steadfast mind' look like in times of sudden changes or distress?"
    ],
    prayer: "Lord Jesus, Prince of Peace, guard my heart and mind. I exchange my heavy worries for Your light yoke. Fill my soul with the calm assurance of Your perfect sovereignty. Amen.",
    reflection: "Every time an anxious thought enters your mind today, whisper the name 'Jesus' three times as an anchor of peace.",
    transcript: "Grace and peace, beloved. Let's open our Bibles to Isaiah 26:3. 'Perfect peace.' In Hebrew, this is 'Shalom Shalom'—complete, untroubled, multi-dimensional peace. How do we obtain it? Not by striving or escaping, but by anchoring our minds on Him. When your eyes are on the storm, you sink. When your eyes are on the Creator of the storm, you walk on water. Let's break the spirit of fear over our children, our homes, and our minds..."
  },
  {
    id: "sermon-3",
    title: "Unified in Covenant Grace",
    speaker: "Apostle David & Prophetess Maria Martinez",
    date: "June 28, 2026",
    duration: "45 min",
    category: "Marriage",
    series: "Family First",
    description: "A special co-preached message outlining the spiritual foundations for deep intimacy, restorative communication, and unbreakable marriages.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "A warm, dual-perspective guide to constructing a Christian home, highlighting the transition from contract marriages to covenant marriages.",
    keyPoints: [
      "Contract says 'I will do if you do'; Covenant says 'I will serve because Christ served.'",
      "Healing in a marriage begins with an apology and is sustained by forgiveness.",
      "When a family prays together, they align their home to heaven's authority."
    ],
    bibleReferences: [
      "Ephesians 5:21 - 'Submit to one another out of reverence for Christ.'",
      "Ecclesiastes 4:12 - 'A cord of three strands is not quickly broken.'"
    ],
    discussionQuestions: [
      "What is the difference between a contract relationship and a covenant relationship in practice?",
      "How do we handle disagreements in a way that honors Christ and builds up our spouse?",
      "What are simple ways we can start introducing prayer and devotion into our immediate family household?"
    ],
    prayer: "Father of all families, we thank You for the covenant of marriage. Bless our household. Heal any wounds, open doors of deep understanding, and weave Jesus into the center of our lives as the third strand. Amen.",
    reflection: "For married couples: Sit together tonight, hold hands, and pray a simple 1-minute prayer of blessing over each other. For singles: Pray for your future marriage or families in your community.",
    transcript: "Welcome to our special family service. Today, David and I wanted to talk to you directly about relationships. Marriages are under attack. Why? Because the enemy knows that a healthy, restored family is a fortress of God's light. Many couples act like business partners rather than spiritual covenants. We must learn to speak with grace, seek forgiveness quickly, and invite Jesus to dine with us daily. Let us restore our altars of family prayer..."
  },
  {
    id: "sermon-4",
    title: "Kingdom Leadership and Ethics",
    speaker: "Apostle David Martinez",
    date: "June 21, 2026",
    duration: "41 min",
    category: "Leadership",
    series: "Equipped to Serve",
    description: "How to excel in the marketplace, church, and society by adopting a posture of servant-leadership and uncompromising integrity.",
    youtubeUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    summary: "A masterclass in character-based leadership. Apostle David teaches that true leadership is measured not by influence or power, but by service.",
    keyPoints: [
      "Your gift may open a door, but only your character will keep you in the room.",
      "Servant-leadership flips the worldly pyramid; we lead by supporting others.",
      "Integrity is what we do when nobody is looking except the Holy Spirit."
    ],
    bibleReferences: [
      "Mark 10:45 - 'For even the Son of Man did not come to be served, but to serve...'",
      "Daniel 6:3 - 'Now Daniel so distinguished himself... by his exceptional qualities...'"
    ],
    discussionQuestions: [
      "How can you apply 'servant leadership' in your workplace or school this week?",
      "What is a practical way to deal with temptation or ethical gray areas in your professional career?",
      "How do we balance professional excellence with deep humility?"
    ],
    prayer: "Lord, make me a leader of integrity and honor. May my speech, work ethic, and character shine as a witness of Your Kingdom in my school, business, and community. Equip me to serve. Amen.",
    reflection: "Perform an act of quiet, unrewarded service for someone in your sphere of influence today without seeking credit.",
    transcript: "Saints, leadership is not a title; it's a responsibility. The world teaches us to climb over others to reach the top. Jesus took off His robe, wrapped a towel around His waist, and washed the dusty feet of His disciples. True greatness is found at the basin of service. When you are in the marketplace, lead by serving your boss, your colleagues, and your customers with exceptional quality and supernatural honesty. Let Daniel's spirit of excellence rise in you..."
  }
];

export const ministriesData: Ministry[] = [
  {
    id: "ministry-1",
    name: "Kingdom Kids Ministry",
    description: "An exciting, safe, and spirit-filled space where children learn Scripture, experience worship, and develop a real relationship with Jesus through interactive lessons, crafts, and games.",
    leader: "Director Sarah Henderson",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600",
    schedule: "Every Sunday during 9:00 AM & 11:30 AM Services",
    category: "Children",
    leadersInfo: {
      name: "Sarah Henderson",
      role: "Children's Pastor",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
    }
  },
  {
    id: "ministry-2",
    name: "Restoration Youth",
    description: "A passionate movement empowering teenagers to find their identity in Christ, live boldly, and share the hope of Jesus with their campuses and peer circles.",
    leader: "Pastor Nathan & Chloe Ross",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
    schedule: "Fridays at 7:30 PM in the Youth Hall",
    category: "Youth",
    leadersInfo: {
      name: "Nathan Ross",
      role: "Youth Pastor",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200"
    }
  },
  {
    id: "ministry-3",
    name: "Young Adults (Elevate)",
    description: "Connect with young professionals, entrepreneurs, and university students. Our mission is to elevate Christ, build solid relationships, and impact culture with biblical wisdom.",
    leader: "Pastor Caleb Martinez",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=600",
    schedule: "Every 2nd & 4th Thursday at 7:30 PM",
    category: "Young Adults",
    leadersInfo: {
      name: "Caleb Martinez",
      role: "Young Adults Pastor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
    }
  },
  {
    id: "ministry-4",
    name: "Virtuous Women of Restoration",
    description: "A sisterhood of prayer, support, and spiritual growth. Women of all ages gather to study God's Word, pray for our families, and activate our callings in life and business.",
    leader: "Prophetess Maria Martinez",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
    schedule: "Second Saturday Prayer Breakfasts at 9:00 AM",
    category: "Women",
    leadersInfo: {
      name: "Prophetess Maria",
      role: "Women's Ministry Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
    }
  },
  {
    id: "ministry-5",
    name: "Men of Honor",
    description: "Equipping men to lead their families with love, live with absolute integrity in the marketplace, and stand together as strong brothers in Christ.",
    leader: "Apostle David Martinez",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600",
    schedule: "First Saturday Men's Fellowship Breakfasts at 8:30 AM",
    category: "Men",
    leadersInfo: {
      name: "Apostle David",
      role: "Senior Pastor / Men's Lead",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
    }
  },
  {
    id: "ministry-6",
    name: "The Quohelettes",
    description: "Our music and worship ministry dedicated to creating an environment of raw, authentic, and high-quality worship that invites the heavy and beautiful presence of God.",
    leader: "Worship Pastor Daniel Song",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=600",
    schedule: "Rehearsals Thursdays at 7:00 PM",
    category: "Music",
    leadersInfo: {
      name: "Daniel Song",
      role: "Worship Pastor",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200"
    }
  }
];

export const eventsData: Event[] = [
  {
    id: "event-1",
    title: "Prophetic Night of Restoration",
    date: "July 24, 2026",
    time: "7:00 PM",
    location: "Main Sanctuary & Online",
    description: "Join Apostle David & Prophetess Maria Martinez for a night of deep intercessory prayer, prophetic worship, and healing. Bring anyone seeking restoration and a touch of God's power.",
    category: "Worship",
    ageGroup: "All Ages Welcome",
    volunteerRole: "Altar Worker / Usher Team",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "event-2",
    title: "United in Grace Couples Date Night",
    date: "August 1, 2026",
    time: "6:30 PM",
    location: "Fellowship Gala Hall",
    description: "An elegant night of romantic dining, interactive marriage building exercises, and pastoral panel Q&A designed to refresh the joy and covenant within your marriage.",
    category: "Family",
    ageGroup: "Married & Engaged Couples",
    volunteerRole: "Gala Banquet Server / Host",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "event-3",
    title: "Elevate Young Adults Summer Cookout",
    date: "August 8, 2026",
    time: "1:00 PM",
    location: "Memorial Park Shelter 4",
    description: "Food, fun, volleyball, and authentic fellowship! Unwind and connect with fellow young adults in a beautiful outdoor environment. Burger and vegan options provided.",
    category: "Fellowship",
    ageGroup: "Ages 18-35",
    volunteerRole: "Grill Master / Set Up Team",
    image: "https://images.unsplash.com/photo-1533143708019-ea5cfa80213e?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "event-4",
    title: "Hands of Hope Back-To-School Drive",
    date: "August 15, 2026",
    time: "9:00 AM",
    location: "Church Plaza & Parking Lot",
    description: "Blessing our neighborhood families! We are giving away 1,000 free backpacks stuffed with school supplies, providing free haircuts for kids, and hosting face painting and cotton candy.",
    category: "Outreach",
    ageGroup: "All Families Welcome",
    volunteerRole: "Backpack Organizer / Barber Helper",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=600"
  }
];

export const testimoniesData: Testimony[] = [
  {
    id: "t-1",
    author: "Elena & Marcus Rodriguez",
    text: "Our marriage was on the brink of divorce. We had separated and were packing bags when a coworker invited us to United in Grace Marriage night. Through the healing prayer of Prophetess Maria and the continuous mentorship of the pastors, God completely restored our love, healed our communication, and saved our family. We are now happier than ever!",
    date: "June 20, 2026"
  },
  {
    id: "t-2",
    author: "Christopher Evans",
    text: "I was battling chronic clinical depression and severe panic attacks for nearly five years. One Wednesday night, I stepped into the Sanctuary of Jesus Christ, feeling completely empty. During worship, a heavy weight physically lifted off my shoulders. Apostle David prayed for me and I received deep emotional healing. I haven't had a panic attack since!",
    date: "May 14, 2026"
  },
  {
    id: "t-3",
    author: "Theresa Swahili",
    text: "Hands of Hope food pantry blessed my family when I lost my job in construction last winter. The volunteers didn't just give me groceries; they sat with me, prayed for my financial restoration, and encouraged my faith. Two weeks later, another church member connected me to an incredible job opportunity. Our God is truly a restorer!",
    date: "April 29, 2026"
  }
];

export const volunteerQuizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which of your spiritual gifts or natural inclinations do you resonate with most?",
    options: [
      { label: "Worshipping, playing musical instruments, or singing", value: "music" },
      { label: "Showing heavy hospitality, welcoming strangers, and cooking", value: "hospitality" },
      { label: "Operating cameras, video editing, social media, or slide production", value: "media" },
      { label: "Intercessory prayer, listening to people, and giving spiritual counsel", value: "prayer" },
      { label: "Teaching children, inventing crafts, and telling storytelling Bible loops", value: "children" },
      { label: "Organizing logistics, database entries, and administrative tasking", value: "administration" },
      { label: "Feeding the homeless, distributing clothes, and outdoor community outreach", value: "outreach" }
    ]
  },
  {
    id: "q2",
    question: "What is your typical availability for serving in the House of Restoration?",
    options: [
      { label: "Sunday Mornings (during services)", value: "sunday" },
      { label: "Friday Evenings (youth/young adult assemblies)", value: "friday" },
      { label: "Midweek evenings (Wednesdays/Thursdays)", value: "midweek" },
      { label: "Saturdays (monthly projects or outreach blockades)", value: "saturdays" },
      { label: "Flexible / remote administrative tasks during weekdays", value: "flexible" }
    ]
  },
  {
    id: "q3",
    question: "What is your comfort level with technological tools or public engagement?",
    options: [
      { label: "High Tech: I love computers, audio consoles, and camera feeds", value: "tech" },
      { label: "High Contact: I love greeting new faces and hugging families", value: "social" },
      { label: "Behind the Scenes: I prefer quiet setups, organizing, and cleaning", value: "behind" },
      { label: "Creative/Spiritual: I am focused on playing music or praying with individuals", value: "creative" }
    ]
  }
];
