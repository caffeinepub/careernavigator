// Smart frontend response engine for Career Assistant chatbot
// Pattern-matches user messages and returns helpful, friendly responses
// for 10th-grade students

type ResponsePattern = {
  patterns: RegExp[];
  response: () => string;
};

const RESPONSES: ResponsePattern[] = [
  // ── Greetings ─────────────────────────────────────────────
  {
    patterns: [/^(hi|hello|hey|hiya|howdy|namaste|helo)\b/i],
    response: () =>
      "Hey there! 👋 I'm your CareerNavigator assistant. I can help you with career choices, study tips, subject doubts, and staying motivated. What's on your mind today?",
  },
  {
    patterns: [/\b(good morning|good afternoon|good evening|good night)\b/i],
    response: () =>
      "Hello! 😊 Great to chat with you! I'm here to help with anything career-related or study tips. What would you like to know?",
  },
  {
    patterns: [/\b(how are you|how r u|how do you do)\b/i],
    response: () =>
      "I'm doing great and ready to help you! 🚀 Whether it's career guidance, study strategies, or just motivation — I've got you. What's up?",
  },

  // ── Career interest discovery ─────────────────────────────
  {
    patterns: [/\b(i like math|love math|good at math|enjoy math|maths)\b/i],
    response: () =>
      "Great! Being strong in math opens up awesome careers! 🧮\n\n📌 **Top picks for math lovers:**\n• Software Developer / Data Scientist\n• Financial Analyst / Chartered Accountant\n• Engineer (Civil, Mechanical, Electrical)\n• Statistician or Actuary\n\nMath is the superpower behind all these fields. Have you tried our career assessment? It gives you a personalized roadmap! 🎯",
  },
  {
    patterns: [
      /\b(i like science|love science|good at science|enjoy science|physics|chemistry)\b/i,
    ],
    response: () =>
      "Science lovers have so many exciting paths ahead! 🔬\n\n📌 **Top careers for science enthusiasts:**\n• Doctor / Medical Professional\n• Research Scientist / Physicist\n• Chemical Engineer\n• Environmental Scientist\n• Space/Aerospace Engineer\n\nWhich branch of science excites you most — physics, chemistry, or biology?",
  },
  {
    patterns: [
      /\b(i like biology|love biology|good at bio|medical|doctor|health)\b/i,
    ],
    response: () =>
      "Biology opens doors to one of the most rewarding career paths — healthcare! 🏥\n\n📌 **Medical & health careers:**\n• MBBS Doctor\n• Pharmacist\n• Nurse / Healthcare Professional\n• Biomedical Researcher\n• Dentist / Physiotherapist\n\nThe path needs dedication but it's incredibly fulfilling. NEET is the key exam after 12th. Want to know more about preparing for it?",
  },
  {
    patterns: [
      /\b(i like art|love art|drawing|painting|design|creative|creativity)\b/i,
    ],
    response: () =>
      "Creative minds build the world's most beautiful things! 🎨\n\n📌 **Top creative careers:**\n• UI/UX Designer\n• Graphic Designer / Illustrator\n• Animator / Video Editor\n• Fashion Designer\n• Architect\n• Game Designer\n\nCreativity + digital skills = 🔥 powerful combo in today's market. Have you tried any design tools like Canva or Figma?",
  },
  {
    patterns: [
      /\b(i like coding|love programming|coding|programming|software|developer|tech)\b/i,
    ],
    response: () =>
      "Excellent! Coding is one of the most in-demand skills right now! 💻\n\n📌 **Top tech careers:**\n• Full-Stack Web Developer\n• Data Scientist / AI Engineer\n• Cybersecurity Analyst\n• App Developer (Android/iOS)\n• Cloud Engineer\n\n**To start learning:**\n1. Python or JavaScript first\n2. Free resources: freeCodeCamp, CS50, Khan Academy\n3. Build small projects to show in your portfolio\n\nWhich area of coding interests you most?",
  },
  {
    patterns: [
      /\b(i like business|entrepreneurship|start.?up|own company|business)\b/i,
    ],
    response: () =>
      "The entrepreneurial spirit! 🚀 Business is a fantastic career path.\n\n📌 **Business & entrepreneurship careers:**\n• Business Manager / MBA Professional\n• Marketing Specialist\n• Financial Advisor\n• E-commerce Entrepreneur\n• Human Resources Manager\n\nMany successful founders started with just an idea and lots of curiosity. What kind of business excites you?",
  },
  {
    patterns: [
      /\b(government job|civil service|ias|ips|upsc|government|sarkari)\b/i,
    ],
    response: () =>
      "Government jobs offer great security and the chance to serve your country! 🇮🇳\n\n📌 **Top government career paths:**\n• IAS / IPS Officer (UPSC)\n• Banking (IBPS PO, SBI PO)\n• Defense Forces (Army, Navy, Air Force)\n• Railway Officer\n• State PSC Services\n\n**Key tip:** Start building strong general knowledge habits now. Read newspapers and NCERT books thoroughly. Want to know how to prepare?",
  },
  {
    patterns: [
      /\b(research|scientist|laboratory|discover|invention|innovation)\b/i,
    ],
    response: () =>
      "Research careers are for curious minds who love asking 'why'! 🔭\n\n📌 **Research career paths:**\n• Scientific Researcher (ISRO, DRDO, IITs)\n• Data Analyst / Research Analyst\n• Climate Scientist\n• Social Science Researcher\n• Medical Researcher\n\nIndia has amazing research institutes like IIT, IISc, ISRO, and DRDO. Top students often get scholarships too!",
  },

  // ── Subject struggles ─────────────────────────────────────
  {
    patterns: [
      /\b(bad at math|hate math|math is hard|struggle.*math|math.*difficult)\b/i,
    ],
    response: () =>
      "Don't worry — many successful people once felt the same way about math! 😊\n\n**Here's how to get better:**\n1. 📺 Watch Khan Academy videos (they explain everything from scratch)\n2. ✏️ Practice 10-15 problems daily — consistency beats cramming\n3. 🤝 Form a study group with friends\n4. Start with basics and slowly move harder\n\nRemember: math is like a muscle. The more you practice, the stronger it gets! Which topic in math is giving you trouble?",
  },
  {
    patterns: [
      /\b(bad at science|hate science|science is hard|struggle.*science)\b/i,
    ],
    response: () =>
      "Science can feel overwhelming but it actually explains everyday things around us! 🌍\n\n**Tips to enjoy science more:**\n1. 🎬 Watch YouTube channels like Veritasium, SciShow, or BYJU's\n2. Connect concepts to real life (e.g. physics in cricket, chemistry in cooking)\n3. Make mind maps instead of just reading\n4. Ask 'why does this happen?' for every concept\n\nWhich part of science — physics, chemistry, or biology — confuses you?",
  },
  {
    patterns: [
      /\b(bad at english|struggle.*english|english is hard|weak.*english)\b/i,
    ],
    response: () =>
      "English gets better with daily practice — promise! 📚\n\n**Simple daily habits:**\n1. 🎵 Watch English YouTube videos with subtitles\n2. 📖 Read one page of any book every day\n3. 🗣️ Think in English for 5 minutes daily\n4. 📝 Write a 3-sentence diary in English\n\nYou don't need to be perfect — just keep practicing. Even small improvements add up fast!",
  },

  // ── Study tips ────────────────────────────────────────────
  {
    patterns: [
      /\b(how to study|study tips|study better|study smart|improve.*study|focus.*study)\b/i,
    ],
    response: () =>
      "Smart studying beats hard studying! 📖✨\n\n**Top 5 study techniques:**\n1. ⏱️ **Pomodoro Technique** — Study 25 min, break 5 min. Repeat 4 times, then take 30 min break\n2. 📝 **Active recall** — Close the book and write what you remember\n3. 🗂️ **Spaced repetition** — Review notes after 1 day, 3 days, 1 week\n4. 🎯 **Feynman technique** — Explain a concept as if teaching a child\n5. 😴 **Sleep well** — Memory consolidates during sleep!\n\nWhich of these sounds most useful for you?",
  },
  {
    patterns: [
      /\b(time management|manage time|schedule|routine|plan.*study|study.*plan)\b/i,
    ],
    response: () =>
      "Good time management is a superpower for students! ⏰\n\n**Simple daily schedule template:**\n• Morning (1 hr): Most difficult subject\n• School/College hours: Stay fully present\n• Evening (2 hrs): Homework + notes review\n• Night (30 min): Light reading or quiz yourself\n\n**Tools to try:**\n• Google Calendar — for weekly planning\n• Notion or a simple notebook — for daily to-dos\n• CareerNavigator Reminders — to track deadlines!\n\nWant me to help you think through your schedule?",
  },
  {
    patterns: [
      /\b(concentration|focus|distracted|phone.*distract|can't focus|lose focus)\b/i,
    ],
    response: () =>
      "Focus is hard in the smartphone era — but totally trainable! 📵\n\n**Focus hacks that work:**\n1. 📱 Put phone in another room while studying\n2. 🎵 Play lo-fi music or brown noise (YouTube has free playlists)\n3. 🌿 Study near a window with natural light\n4. 📝 Write ONE goal at top of your study page\n5. ⏰ Use a timer — knowing it will end makes it easier to start\n\nThe first 5 minutes are the hardest. After that, focus comes naturally!",
  },
  {
    patterns: [/\b(memorize|remember|forget.*notes|memory|retain)\b/i],
    response: () =>
      "Struggling to remember things? Here are memory hacks! 🧠\n\n**Science-backed techniques:**\n1. **Storytelling** — Turn facts into a mini story\n2. **Acronyms** — Use first letters to make a word (e.g., BODMAS)\n3. **Mind maps** — Draw connections visually\n4. **Teach someone else** — Best way to truly remember\n5. **Review before sleep** — Your brain processes memories overnight\n\nThe golden rule: Review notes within 24 hours of learning them. That alone cuts forgetting by 80%!",
  },

  // ── Motivation & emotional support ───────────────────────
  {
    patterns: [
      /\b(stressed|stress|anxiety|anxious|overwhelmed|pressure|tension)\b/i,
    ],
    response: () =>
      "Hey, it's completely okay to feel stressed sometimes — you're not alone! 💙\n\n**Quick stress relievers:**\n1. 🌬️ Deep breathing — 4 counts in, 4 hold, 4 out\n2. 🚶 10-minute walk outside\n3. 📓 Write down what's stressing you (just getting it out helps)\n4. 🎵 Play your favorite song and just listen\n\n**Remember:** Feeling stressed means you care. Now channel that energy into action — start with just ONE small task. You've got this! 💪",
  },
  {
    patterns: [
      /\b(give up|giving up|quit|hopeless|useless|failure|failed|i.m failing)\b/i,
    ],
    response: () =>
      "Please don't give up — every person who succeeded felt this way at some point! 🌟\n\n**Truth bomb:** Failure is just feedback. It tells you what to try differently — not that you should stop.\n\n**When you feel like quitting:**\n1. Take a 30-minute break (seriously, step away)\n2. Write down 3 things you're actually good at\n3. Remember WHY you started\n4. Break your goal into tiny, tiny steps\n\nYou're stronger than you think. What specifically is making you feel this way? I'm here to listen!",
  },
  {
    patterns: [
      /\b(scared.*exam|fear.*exam|exam.*fear|exam.*scared|exam.*nervous|worried.*exam)\b/i,
    ],
    response: () =>
      "Exam nerves are super normal — even top students feel them! 📝\n\n**Beat exam anxiety:**\n1. 📚 Prepare well — confidence comes from preparation\n2. 🌙 Sleep 7-8 hours the night before (all-nighters don't help!)\n3. 🍎 Eat properly — your brain needs fuel\n4. ⏱️ Practice with past papers under time pressure\n5. 💭 Replace 'I'll fail' thoughts with 'I've prepared, I can do this'\n\nWhat exam are you worried about? I can help you make a study plan!",
  },
  {
    patterns: [
      /\b(motivat|inspire|encourage|boost|feel.*(sad|low|bad|down))\b/i,
    ],
    response: () =>
      "Here's something true: every expert was once a beginner who refused to quit! 🌅\n\n**Daily motivation tips:**\n• Start your day with 5 minutes of intention setting\n• Track small wins — even tiny progress matters\n• Surround yourself with people who lift you up\n• Remember: your future self is counting on present you!\n\n🌟 **Quote for today:** *\"The secret of getting ahead is getting started.\" — Mark Twain*\n\nWhat's one small step you can take right now toward your goal?",
  },

  // ── Career roadmap questions ──────────────────────────────
  {
    patterns: [
      /\b(how to become.*doctor|doctor.*career|medical.*career|mbbs)\b/i,
    ],
    response: () =>
      "Becoming a doctor is a noble and respected goal! 🩺\n\n**Roadmap to becoming a Doctor:**\n1. **10th-12th:** Science stream with Biology, Chemistry, Physics\n2. **Competitive Exam:** Crack NEET-UG after 12th\n3. **MBBS:** 5.5 years including 1-year internship\n4. **Specialization (optional):** NEET-PG for MD/MS (3 more years)\n\n**Salary range:** ₹6-12 LPA (starting) → ₹30+ LPA (specialist)\n\n**Key tip:** Start NEET preparation from 11th class. Focus on NCERT Biology first!",
  },
  {
    patterns: [
      /\b(how to become.*engineer|engineer.*career|engineering|b\.?tech|btech)\b/i,
    ],
    response: () =>
      "Engineering is one of India's most popular and rewarding fields! ⚙️\n\n**Roadmap to Engineering:**\n1. **10th-12th:** Science stream (PCM — Physics, Chemistry, Math)\n2. **Competitive Exam:** JEE Main or JEE Advanced for IITs/NITs\n3. **B.Tech:** 4 years in your chosen branch\n4. **Job/Higher Studies:** Campus placements or M.Tech/MBA\n\n**Hot branches right now:**\n• Computer Science & Engineering 💻\n• Artificial Intelligence\n• Data Science\n• Electronics & Communication\n\n**Salary:** ₹4-8 LPA (starting) → ₹20-50+ LPA (experienced)",
  },
  {
    patterns: [
      /\b(how to become.*designer|ux.*design|ui.*design|graphic design|design.*career)\b/i,
    ],
    response: () =>
      "Design is a super creative and growing field! 🎨\n\n**Path to becoming a Designer:**\n1. **Learn the tools:** Figma (UI/UX), Adobe Illustrator, Photoshop, Canva\n2. **Take online courses:** Google UX Design (Coursera), Interaction Design Foundation\n3. **Build a portfolio:** 4-5 strong projects matter more than degrees\n4. **Degree option:** B.Des from NID or any design college\n\n**Salary:** ₹3-6 LPA (fresher) → ₹15-30+ LPA (senior designer)\n\n**Best part:** You can start practicing RIGHT NOW with free tools! Want some beginner project ideas?",
  },
  {
    patterns: [/\b(salary|earn|income|pay|lpa|money.*career|career.*money)\b/i],
    response: () =>
      "Great question — understanding salary expectations is smart planning! 💰\n\n**Approximate salary ranges in India:**\n• Software Developer: ₹5-8 LPA → ₹20-40+ LPA\n• Doctor (MBBS): ₹6-12 LPA → ₹30+ LPA (specialist)\n• Chartered Accountant: ₹7-12 LPA → ₹25+ LPA\n• Data Scientist: ₹8-15 LPA → ₹30-60+ LPA\n• Civil Services (IAS): ₹56,100+/month (govt scale)\n• Graphic Designer: ₹3-6 LPA → ₹15+ LPA\n• Marketing Manager: ₹5-10 LPA → ₹20+ LPA\n\nRemember: Salary grows with skills, experience, and initiative. Your passion + skill = highest earning potential!",
  },

  // ── Study materials & resources ───────────────────────────
  {
    patterns: [
      /\b(study material|resource|book|course|learn.*online|online.*course|what.*study|where.*learn)\b/i,
    ],
    response: () =>
      "Great resources are everywhere online — and mostly FREE! 📚\n\n**Best free platforms:**\n• **Khan Academy** — Math, Science, all subjects explained clearly\n• **NPTEL** — Engineering & Science by IIT professors\n• **Coursera / edX** — World-class courses (audit for free)\n• **YouTube** — Unacademy, BYJU's, 3Blue1Brown, Crash Course\n• **NCERT eBooks** — Must read for Indian students\n\n**Check the Study Materials section in your dashboard** — we've curated the best resources based on your interest category! 📖",
  },
  {
    patterns: [
      /\b(coding.*learn|learn.*coding|start.*programming|programming.*start|python|javascript)\b/i,
    ],
    response: () =>
      "Starting your coding journey? Excellent choice! 🖥️\n\n**Best path for beginners:**\n1. **Python first** — simplest syntax, most versatile\n2. **Free resources:**\n   • CS50 (Harvard) on edX — best intro course ever\n   • Python.org tutorial\n   • freeCodeCamp YouTube\n   • Replit.com — code in browser\n3. **Practice:** Solve 1 problem daily on HackerRank or LeetCode (easy level)\n4. **Build something real** — a calculator, quiz game, or to-do app\n\n**Time to first job:** 6-18 months of consistent practice. You've got this! 💪",
  },

  // ── Questions about CareerNavigator features ──────────────
  {
    patterns: [
      /\b(assessment|quiz.*career|career.*test|find.*career|which career)\b/i,
    ],
    response: () =>
      "Our Career Assessment is the perfect starting point! 🎯\n\n**What it does:**\n• Asks about your interests and strengths\n• Calculates your scores across 6 career categories\n• Recommends top career matches just for you\n• Shows your skill gap analysis\n\n👉 **Go to Assessment** in the top navigation to take it!\n\nIt takes just 10-15 minutes and gives you a personalized career roadmap. Many students say it was eye-opening!",
  },
  {
    patterns: [
      /\b(reminder|deadline|track.*task|manage.*task|forget.*deadline)\b/i,
    ],
    response: () =>
      "Never miss an important deadline again! ⏰\n\n**CareerNavigator Reminders** helps you:\n• Set study deadlines and assignment due dates\n• Get visual alerts for overdue tasks\n• Track daily and weekly goals\n• Stay on top of exam dates\n\n👉 Visit the **Reminders** page from the navigation bar. You can add, complete, and manage all your tasks there!\n\nPro tip: Add exam dates as soon as they're announced. Future you will thank present you! 😄",
  },
  {
    patterns: [
      /\b(question|quiz|practice.*question|assignment|test.*knowledge)\b/i,
    ],
    response: () =>
      "Practice makes perfect — and real-world questions make learning stick! 🎓\n\n**Questions feature:**\n• 6 categories to choose from\n• 5 questions per quiz, based on your interests\n• Real-world scenarios (not just textbook stuff!)\n• Instant feedback with explanations\n• Track your progress over time\n\n👉 Click **Questions** in the navigation to start a quiz!\n\nNew questions every time you play — so you'll never see the same quiz twice!",
  },

  // ── 10th class specific ───────────────────────────────────
  {
    patterns: [/\b(10th|tenth|ssc|board exam|board.*class|class.*10)\b/i],
    response: () =>
      "10th class is a really important year — great that you're thinking ahead! 🏫\n\n**For 10th students:**\n1. **Focus on NCERT** — board exams are mostly NCERT-based\n2. **Don't choose stream by pressure** — choose what you genuinely like\n3. **Take our career assessment** — great way to discover your interests!\n4. **Important: Stream choice after 10th:**\n   • Science (PCM/PCB) — for Engineering/Medical\n   • Commerce — for CA, Business, Finance\n   • Arts/Humanities — for Law, UPSC, Journalism, Psychology\n\nYou have time to explore! What subjects do you enjoy most right now?",
  },
  {
    patterns: [
      /\b(stream selection|which stream|science or commerce|what.*stream|after.*10th|after 10th)\b/i,
    ],
    response: () =>
      "Choosing your stream after 10th is a big decision — let's think it through! 🤔\n\n**Quick guide:**\n\n📌 **Science (PCM)** — if you like Math/Physics → Engineering, IT, Architecture\n📌 **Science (PCB)** — if you like Biology → Doctor, Pharmacy, Biotech\n📌 **Commerce** — if you like business/economics → CA, MBA, Finance, Marketing\n📌 **Arts/Humanities** — if you like language/history → Law, UPSC, Journalism, Psychology\n\n**Golden rule:** Choose based on YOUR interest, not friends or parents. You'll study it for 2+ years!\n\nHave you taken our career assessment? It helps identify your natural interests!",
  },

  // ── Specific career questions ─────────────────────────────
  {
    patterns: [
      /\b(data science|machine learning|ai|artificial intelligence|ml)\b/i,
    ],
    response: () =>
      "Data Science and AI are the hottest fields right now! 🤖\n\n**What you need:**\n• Strong Math skills (statistics, linear algebra)\n• Programming (Python is key)\n• Basic ML concepts\n\n**Roadmap:**\n1. Learn Python well\n2. Study Statistics basics\n3. Take Andrew Ng's ML course (Coursera - free to audit)\n4. Practice on Kaggle datasets\n5. Build 2-3 projects for portfolio\n\n**Salary:** ₹8-15 LPA (entry) → ₹25-60+ LPA (senior)\n\nIt's very achievable even for self-learners! Start with Python today 🐍",
  },
  {
    patterns: [/\b(chartered accountant|ca|finance.*career|accounting)\b/i],
    response: () =>
      "CA is one of India's most prestigious professional qualifications! 📊\n\n**CA Roadmap:**\n1. Commerce stream in 11th-12th\n2. Register for CA Foundation after 12th\n3. CA Intermediate (2 papers, 2.5 years)\n4. Articleship (3 years practical training)\n5. CA Final exam\n\n**Time to qualify:** ~5-6 years typically\n**Salary:** ₹7-12 LPA (fresh CA) → ₹25-50+ LPA (senior/partner)\n\nThe journey is tough but the career is incredibly rewarding and respected!",
  },

  // ── Thanking & closing ────────────────────────────────────
  {
    patterns: [/\b(thank|thanks|thank you|ty|thx|helpful|great help)\b/i],
    response: () =>
      "You're very welcome! 😊 Happy to help anytime!\n\nRemember — your career journey is unique to YOU. Keep exploring, stay curious, and don't be afraid to ask questions. 🌟\n\nIs there anything else about careers or studies I can help you with?",
  },
  {
    patterns: [/\b(bye|goodbye|see you|later|cya)\b/i],
    response: () =>
      "Goodbye! Keep exploring and building your future! 🚀\n\nRemember — I'm always here whenever you have career questions or need motivation. All the best! 💪✨",
  },
];

const FALLBACK_RESPONSES = [
  "That's an interesting question! 🤔 I specialize in career guidance, study tips, and motivation for students. Could you tell me more about what career path or subject you're curious about?",
  "I'm not sure I understood that fully! 😊 I'm best at helping with career choices, study strategies, and subject guidance. What aspect of your future career are you thinking about?",
  "Great question! To help you better — are you curious about a specific career, struggling with a subject, or looking for study tips? Tell me more and I'll give you the best advice!",
  "I'd love to help! I'm your career and study guide. Try asking me things like 'What career is good for me if I love science?' or 'How do I study better for exams?'",
  "Hmm, let me think... 🤔 For career guidance, try asking about specific fields like tech, medical, design, business, or government. For study help, ask about any subject or study technique!",
];

let fallbackIndex = 0;

export function getSmartResponse(message: string): string {
  const lower = message.toLowerCase().trim();

  // Try each pattern in order
  for (const { patterns, response } of RESPONSES) {
    for (const pattern of patterns) {
      if (pattern.test(lower)) {
        return response();
      }
    }
  }

  // Rotate through fallback responses
  const fallback =
    FALLBACK_RESPONSES[fallbackIndex % FALLBACK_RESPONSES.length];
  fallbackIndex++;
  return fallback;
}

// Dynamic suggestions that rotate based on conversation context
export const SUGGESTION_SETS = [
  [
    "I like math",
    "I love design",
    "I want to help people",
    "Which stream after 10th?",
  ],
  [
    "How to study better?",
    "I'm stressed about exams",
    "What is Data Science?",
    "How to become a doctor?",
  ],
  [
    "I like coding",
    "What is AI?",
    "Best study tips",
    "Government career options",
  ],
  [
    "Time management help",
    "I feel like giving up",
    "Medical career roadmap",
    "Top paying jobs",
  ],
  [
    "How to focus?",
    "Best free courses",
    "Engineering roadmap",
    "Business career path",
  ],
];

export function getNextSuggestions(index: number): string[] {
  return SUGGESTION_SETS[index % SUGGESTION_SETS.length];
}
