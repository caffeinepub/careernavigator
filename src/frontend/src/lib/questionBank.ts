// Frontend question bank for all 6 categories
// Questions are designed for 10th-grade students with real-world scenarios

export interface LocalQuestion {
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUESTION_BANK: Record<string, LocalQuestion[]> = {
  Technical: [
    {
      text: "Riya wants to build a website for her school project. What should she learn FIRST?",
      options: ["HTML & CSS", "Microsoft Word", "A calculator app", "MS Paint"],
      correctIndex: 0,
      explanation:
        "HTML & CSS are the building blocks of every website. HTML creates the structure and CSS makes it look beautiful. Every web developer starts here!",
    },
    {
      text: "Your phone shows a warning: 'Unsecure network'. What does this mean?",
      options: [
        "Someone might spy on your data",
        "Your phone battery is low",
        "Screen brightness is too high",
        "WiFi signal is weak",
      ],
      correctIndex: 0,
      explanation:
        "An unsecure (HTTP) network means data sent over it is not encrypted. Hackers on the same network could intercept your information — always use secure (HTTPS) connections!",
    },
    {
      text: "Arjun wants to become a software developer. Which language is BEST to learn first?",
      options: ["Python", "Assembly language", "Machine code", "FORTRAN"],
      correctIndex: 0,
      explanation:
        "Python has simple, English-like syntax making it perfect for beginners. It's used in web development, data science, AI, and automation — very versatile!",
    },
    {
      text: "What does 'cloud storage' mean when someone says 'save your photos to the cloud'?",
      options: [
        "Storing files on remote internet servers",
        "Saving files in a rain cloud",
        "Printing and storing photos physically",
        "Deleting photos from your phone",
      ],
      correctIndex: 0,
      explanation:
        "Cloud storage means your files are saved on powerful computer servers connected via the internet (like Google Drive or iCloud). You can access them from anywhere!",
    },
    {
      text: "Priya's computer is very slow. Which action is MOST likely to help?",
      options: [
        "Close unused programs and restart",
        "Buy a new monitor",
        "Change the wallpaper",
        "Unplug the keyboard",
      ],
      correctIndex: 0,
      explanation:
        "Too many programs running at once use up RAM (memory) and processing power. Closing unused programs and restarting clears memory and fixes slowness!",
    },
    {
      text: "What is an 'app' on your smartphone?",
      options: [
        "A software program that performs specific tasks",
        "A type of phone charger",
        "The phone's camera",
        "A mobile network signal",
      ],
      correctIndex: 0,
      explanation:
        "An app (application) is a software program designed for a specific purpose — like WhatsApp for messaging, YouTube for videos, or Maps for navigation.",
    },
    {
      text: "Mohan received an email from 'bank.security@gmail.com' asking for his account password. What should he do?",
      options: [
        "Delete it — real banks never ask for passwords via email",
        "Reply with his password immediately",
        "Share it on social media",
        "Click all links in the email",
      ],
      correctIndex: 0,
      explanation:
        "This is a phishing scam! Real banks NEVER ask for passwords via email. The sender used a fake email to steal information. Always verify through official bank websites or call centers.",
    },
    {
      text: "What does 'downloading' a file mean?",
      options: [
        "Copying a file from the internet to your device",
        "Sending a file from your device to the internet",
        "Deleting a file permanently",
        "Renaming a file on your computer",
      ],
      correctIndex: 0,
      explanation:
        "Downloading = internet → your device. Uploading = your device → internet. When you save a song or movie from YouTube, that's downloading!",
    },
    {
      text: "A website asks to 'allow cookies'. What are website cookies?",
      options: [
        "Small data files that save your preferences",
        "Actual food items in your computer",
        "Viruses that damage your PC",
        "Browser history deletion tools",
      ],
      correctIndex: 0,
      explanation:
        "Website cookies are tiny text files that save your preferences — like staying logged in or remembering your shopping cart. They make browsing more convenient!",
    },
    {
      text: "Kavya wants to protect her email account. What is the STRONGEST password?",
      options: ["Kv@School2024!Sun#", "kavya123", "password", "12345678"],
      correctIndex: 0,
      explanation:
        "Strong passwords are long (12+ characters) and mix uppercase, lowercase, numbers, and symbols. Never use simple words, your name, or '12345' — these are guessed in seconds by hackers!",
    },
    {
      text: "What happens when you press Ctrl+Z on a computer?",
      options: [
        "It undoes the last action",
        "It shuts down the computer",
        "It zooms in on the screen",
        "It saves the file",
      ],
      correctIndex: 0,
      explanation:
        "Ctrl+Z is the universal 'Undo' shortcut. Made a mistake? Just press Ctrl+Z! Ctrl+Y or Ctrl+Shift+Z is 'Redo' to bring it back.",
    },
    {
      text: "What does 'WiFi' stand for?",
      options: [
        "Wireless Fidelity",
        "Wide Field Internet",
        "Wireless Frequency Interface",
        "Web File Interface",
      ],
      correctIndex: 0,
      explanation:
        "WiFi stands for Wireless Fidelity. It's a technology that allows devices to connect to the internet wirelessly using radio waves instead of cables.",
    },
  ],

  Medical: [
    {
      text: "During summer, Meena feels very dizzy and her skin looks dry. What is she most likely suffering from?",
      options: ["Dehydration", "Common cold", "Dengue fever", "Food poisoning"],
      correctIndex: 0,
      explanation:
        "Dizziness + dry skin in summer = classic dehydration signs. Our body needs 8-10 glasses of water daily. During summer or exercise, even more is needed. Drink water regularly!",
    },
    {
      text: "Raju's doctor says his blood sugar is very high. Which disease does he likely have?",
      options: ["Diabetes", "Malaria", "Typhoid", "Chickenpox"],
      correctIndex: 0,
      explanation:
        "High blood sugar levels indicate Diabetes. Type 1 is genetic; Type 2 is often lifestyle-related. It's managed through diet, exercise, and sometimes medication.",
    },
    {
      text: "Which organ pumps blood throughout your entire body?",
      options: ["Heart", "Liver", "Lungs", "Kidneys"],
      correctIndex: 0,
      explanation:
        "The heart is a muscular pump that beats 60-100 times per minute, pushing blood through 96,000 km of blood vessels to deliver oxygen and nutrients to every cell!",
    },
    {
      text: "Anita ate food from a street stall and got severe stomach pain, vomiting, and diarrhea. What does she likely have?",
      options: ["Food poisoning", "Appendicitis", "Heart attack", "Pneumonia"],
      correctIndex: 0,
      explanation:
        "Vomiting + diarrhea shortly after eating = food poisoning. It's caused by bacteria (like Salmonella) in contaminated food. Rest, ORS (oral rehydration solution), and clean food prevent it.",
    },
    {
      text: "Why do doctors wash their hands before examining a patient?",
      options: [
        "To prevent spreading germs/infections",
        "Because water is healthy",
        "To make their hands look clean",
        "Hospital rules require it only",
      ],
      correctIndex: 0,
      explanation:
        "Hand hygiene is the #1 way to prevent hospital-acquired infections. Doctors' hands can carry bacteria from patient to patient. Proper handwashing saves thousands of lives daily!",
    },
    {
      text: "What does a stethoscope measure?",
      options: [
        "Heartbeat and breathing sounds",
        "Blood pressure",
        "Body temperature",
        "Blood sugar levels",
      ],
      correctIndex: 0,
      explanation:
        "A stethoscope amplifies sounds inside the body — especially heartbeats and lung sounds. Doctors use it to detect abnormal heart rhythms or fluid in lungs.",
    },
    {
      text: "Priya has a fever of 103°F. What is the FIRST thing she should do?",
      options: [
        "Consult a doctor and rest",
        "Exercise intensely to sweat it out",
        "Eat very spicy food",
        "Take a very cold bath immediately",
      ],
      correctIndex: 0,
      explanation:
        "High fever (above 102°F) needs medical attention. Rest, hydration, and fever-reducing medicine (prescribed by doctor) help. Cold baths can cause shivering which raises body temperature further!",
    },
    {
      text: "Which vitamin do we get from sunlight?",
      options: ["Vitamin D", "Vitamin C", "Vitamin B12", "Vitamin A"],
      correctIndex: 0,
      explanation:
        "Skin produces Vitamin D when exposed to sunlight (UV-B rays). Vitamin D is essential for strong bones and immune system. 15-20 minutes of morning sunlight daily is beneficial!",
    },
    {
      text: "Why is blood called the 'river of life' in our body?",
      options: [
        "It carries oxygen and nutrients to all body parts",
        "It flows like a river outside the body",
        "It is blue in color like water",
        "It keeps the body cool",
      ],
      correctIndex: 0,
      explanation:
        "Blood delivers oxygen from lungs and nutrients from food to every cell. It also removes waste products (CO2). Without this transport system, cells would die within minutes!",
    },
    {
      text: "After a school exam, Rahul feels very tired despite sleeping 9 hours. The most likely reason is:",
      options: [
        "Poor nutrition and vitamin deficiency",
        "Too much sleep",
        "Studying too little",
        "Watching TV",
      ],
      correctIndex: 0,
      explanation:
        "Fatigue despite adequate sleep often indicates poor nutrition — especially iron, B12, or Vitamin D deficiency. A balanced diet with fruits, vegetables, protein, and dairy is key to sustained energy!",
    },
  ],

  Creative: [
    {
      text: "Neha wants to design a logo for her school's event. Which FREE tool should she use?",
      options: ["Canva", "Microsoft Word", "Excel spreadsheet", "Google Maps"],
      correctIndex: 0,
      explanation:
        "Canva is a free, beginner-friendly design tool with thousands of templates for logos, posters, social media graphics, and more. Perfect for school projects!",
    },
    {
      text: "A story has three main parts. What are they?",
      options: [
        "Beginning, Middle, End",
        "Introduction, Data, Conclusion",
        "Question, Research, Answer",
        "Plot, Setting, Theme",
      ],
      correctIndex: 0,
      explanation:
        "Every good story has a Beginning (introduces characters/setting), Middle (conflict/problem), and End (resolution). This is called the narrative arc — used in books, movies, and plays!",
    },
    {
      text: "Rohan wants his poster to catch people's attention quickly. What design principle is MOST important?",
      options: [
        "Visual hierarchy — making key info bigger/bolder",
        "Using as many colors as possible",
        "Making all text the same size",
        "Adding lots of decorative borders",
      ],
      correctIndex: 0,
      explanation:
        "Visual hierarchy guides the viewer's eye — the most important information should be largest/boldest. Good design communicates the key message in 3 seconds or less!",
    },
    {
      text: "What makes a good photograph according to photography basics?",
      options: [
        "Rule of thirds — subject placed at intersection points",
        "Always centering the subject",
        "Taking photos in the dark",
        "Using maximum zoom every time",
      ],
      correctIndex: 0,
      explanation:
        "The Rule of Thirds divides the frame into a 3x3 grid. Placing subjects at intersection points creates balanced, interesting compositions. Most phone cameras have this grid feature!",
    },
    {
      text: "Siya is writing a poem. She wants two lines to sound similar at the end. What is this called?",
      options: ["Rhyme", "Metaphor", "Alliteration", "Simile"],
      correctIndex: 0,
      explanation:
        "Rhyme is when words end with similar sounds. 'The sky is blue / and oceans too' — 'blue' and 'too' rhyme! Metaphor compares things without 'like/as', alliteration repeats beginning sounds.",
    },
    {
      text: "A filmmaker wants to show a character is scared WITHOUT showing their face. Which technique works BEST?",
      options: [
        "Show shaking hands or feet from close up",
        "Film the whole room from far away",
        "Use very bright, happy music",
        "Speed up the video",
      ],
      correctIndex: 0,
      explanation:
        "Close-up shots of body parts (shaking hands, trembling knees) are powerful storytelling tools. They build tension and create emotional connection without showing the face — a classic cinematic technique!",
    },
    {
      text: "Which color combination creates the MOST contrast and is easiest to read?",
      options: [
        "Black text on white background",
        "Yellow text on white background",
        "Red text on orange background",
        "Blue text on dark blue background",
      ],
      correctIndex: 0,
      explanation:
        "Black on white provides maximum contrast (ratio of 21:1). Good contrast is essential for readability — especially for people with vision difficulties. This is why most books use this combination!",
    },
    {
      text: "Aryan is creating an animation. What is the minimum frames-per-second (FPS) for smooth motion?",
      options: ["24 FPS", "5 FPS", "100 FPS", "1 FPS"],
      correctIndex: 0,
      explanation:
        "Movies run at 24 FPS — the human eye perceives this as smooth motion. Below 15 FPS looks choppy. Video games often run at 60 FPS for even smoother experience!",
    },
    {
      text: "Priya is designing a school magazine. She has too much text and it looks boring. What should she add?",
      options: [
        "Images, infographics, and white space",
        "More text in different fonts",
        "Colored borders around everything",
        "Smaller text to fit more words",
      ],
      correctIndex: 0,
      explanation:
        "Images break up text and make content digestible. White space (empty space) is a design tool — it gives the eye rest and makes content feel organized. 'Less is more' in good design!",
    },
    {
      text: "What does 'font' mean in design?",
      options: [
        "The style and size of text/letters",
        "The background color of text",
        "The spacing between paragraphs",
        "The number of words per page",
      ],
      correctIndex: 0,
      explanation:
        "A font is a complete set of characters in a particular style (like Arial, Times New Roman, or Comic Sans). Different fonts create different moods — formal, playful, modern, or traditional!",
    },
  ],

  Business: [
    {
      text: "Ananya wants to sell handmade bracelets. What should she research FIRST before starting?",
      options: [
        "Who her customers are and what they'll pay",
        "The most expensive materials available",
        "How to make the most complicated design",
        "How many bracelets she can make per hour",
      ],
      correctIndex: 0,
      explanation:
        "Market research — understanding your customers (target audience) and pricing — is the foundation of any successful business. Knowing who will buy and at what price prevents losing money!",
    },
    {
      text: "Rahul started a juice stall. He spent ₹500 making juice and earned ₹800 selling it. What is his PROFIT?",
      options: ["₹300", "₹800", "₹500", "₹1300"],
      correctIndex: 0,
      explanation:
        "Profit = Revenue - Cost = ₹800 - ₹500 = ₹300. This basic formula is the most fundamental concept in business and accounting!",
    },
    {
      text: "What does 'marketing' mean for a business?",
      options: [
        "Telling people about your product to attract buyers",
        "Making the product in a factory",
        "Counting money at the end of the day",
        "Hiring employees for the office",
      ],
      correctIndex: 0,
      explanation:
        "Marketing is about creating awareness and interest in your product/service. It includes advertising, social media, word-of-mouth, and promotions to attract and retain customers.",
    },
    {
      text: "Meera's lemonade stand ran out of lemons. She couldn't serve customers and lost ₹200. This is an example of:",
      options: [
        "Poor supply chain management",
        "Great marketing strategy",
        "Excellent customer service",
        "Perfect financial planning",
      ],
      correctIndex: 0,
      explanation:
        "Supply chain management ensures you have the right materials/products at the right time. Running out of stock (like lemons) = lost sales and unhappy customers. Planning supply is critical in business!",
    },
    {
      text: "What is the purpose of a business 'advertisement'?",
      options: [
        "To attract customers by showing the product's value",
        "To hide business secrets from competitors",
        "To explain tax rules to employees",
        "To count daily sales figures",
      ],
      correctIndex: 0,
      explanation:
        "Advertisements communicate value propositions — why customers should choose YOUR product. Good ads tell a story, show a benefit, or solve a problem the customer has.",
    },
    {
      text: "Raj borrowed ₹10,000 from a bank at 10% annual interest. How much does he owe after 1 year?",
      options: ["₹11,000", "₹10,000", "₹9,000", "₹20,000"],
      correctIndex: 0,
      explanation:
        "Interest = Principal × Rate × Time = ₹10,000 × 10% × 1 = ₹1,000. Total owed = ₹10,000 + ₹1,000 = ₹11,000. Understanding interest is crucial for financial literacy!",
    },
    {
      text: "A customer is unhappy with a product. What should a good business do FIRST?",
      options: [
        "Listen carefully and try to solve their problem",
        "Ignore the complaint and move on",
        "Argue that the customer is wrong",
        "Immediately give a refund without checking",
      ],
      correctIndex: 0,
      explanation:
        "Customer service excellence starts with listening. 68% of customers leave because they feel unappreciated. Resolving complaints well often creates loyal customers who recommend your business!",
    },
    {
      text: "Why do businesses need to keep financial records (accounts)?",
      options: [
        "To track income, expenses, and pay correct taxes",
        "To show off to competitors",
        "Because it's a fun hobby",
        "To make the office look official",
      ],
      correctIndex: 0,
      explanation:
        "Financial records help businesses know if they're profitable, plan future spending, and pay correct taxes (avoiding legal trouble). Good accounting = healthy business!",
    },
    {
      text: "What is an 'e-commerce' business?",
      options: [
        "A business that sells products/services online",
        "A business that uses electricity",
        "An electricity supply company",
        "A business with electronic machines",
      ],
      correctIndex: 0,
      explanation:
        "E-commerce (electronic commerce) is buying and selling via the internet. Amazon, Flipkart, and Meesho are examples. India's e-commerce market is growing rapidly!",
    },
    {
      text: "Priya wants to expand her fashion boutique. What is the FIRST step in strategic planning?",
      options: [
        "Define clear goals (how many sales, by when?)",
        "Buy the most expensive equipment immediately",
        "Hire 10 employees on day one",
        "Change the shop name to sound bigger",
      ],
      correctIndex: 0,
      explanation:
        "Strategic planning starts with SMART goals — Specific, Measurable, Achievable, Relevant, Time-bound. Without clear goals, businesses waste resources going in wrong directions!",
    },
  ],

  Government: [
    {
      text: "Priya wants to become an IAS officer. Which exam must she clear?",
      options: [
        "UPSC Civil Services Examination",
        "JEE Advanced",
        "NEET",
        "CAT",
      ],
      correctIndex: 0,
      explanation:
        "The UPSC (Union Public Service Commission) Civil Services Exam selects IAS, IPS, and IFS officers. It's one of India's most competitive exams with 3 stages: Prelims, Mains, and Interview.",
    },
    {
      text: "Which government body makes laws for the entire country of India?",
      options: [
        "Parliament (Lok Sabha + Rajya Sabha)",
        "Supreme Court",
        "Cabinet of Ministers",
        "Election Commission",
      ],
      correctIndex: 0,
      explanation:
        "India's Parliament (Sansad) consists of Lok Sabha (Lower House, directly elected) and Rajya Sabha (Upper House, elected by state legislatures). Both houses must approve laws before they become official.",
    },
    {
      text: "Rohan wants to serve in the Indian Army. Which exam should he prepare for?",
      options: [
        "NDA (National Defence Academy) exam",
        "UPSC IAS exam",
        "GATE exam",
        "IBPS bank exam",
      ],
      correctIndex: 0,
      explanation:
        "NDA exam is conducted by UPSC for entry into Army, Navy, and Air Force after 12th (PCM for Air Force/Navy, any stream for Army). CDS exam is for graduates. Both are prestigious paths!",
    },
    {
      text: "What is the RIGHT to Information (RTI) Act?",
      options: [
        "A law allowing citizens to ask government departments for information",
        "A law banning information on the internet",
        "A school education policy",
        "A tax law for businesses",
      ],
      correctIndex: 0,
      explanation:
        "RTI Act (2005) empowers every Indian citizen to ask any government department for information. It promotes transparency and accountability. This is a fundamental tool against corruption!",
    },
    {
      text: "Meena wants to work in a government bank. Which exam should she prepare for?",
      options: [
        "IBPS PO (Institute of Banking Personnel Selection)",
        "UPSC IAS",
        "JEE Main",
        "NEET",
      ],
      correctIndex: 0,
      explanation:
        "IBPS PO (Probationary Officer) and IBPS Clerk exams are gateway to government banking jobs in Banks like Punjab National Bank, Bank of Baroda, etc. SBI PO is for State Bank of India specifically.",
    },
    {
      text: "What does 'panchayati raj' mean?",
      options: [
        "A system of local self-government in villages",
        "A national parliament",
        "A central government ministry",
        "A state police department",
      ],
      correctIndex: 0,
      explanation:
        "Panchayati Raj is a 3-tier system of local governance in rural India: Gram Panchayat (village level), Panchayat Samiti (block level), Zila Parishad (district level). It empowers local communities!",
    },
    {
      text: "Which fundamental right guarantees that no person can be imprisoned without a legal reason?",
      options: [
        "Right to Freedom (Article 19-22)",
        "Right to Education (Article 21A)",
        "Right to Property",
        "Right to Constitutional Remedies",
      ],
      correctIndex: 0,
      explanation:
        "Article 22 (Right to Freedom) protects against arbitrary arrest and detention. Police must inform you of charges and produce you before a magistrate within 24 hours. Habeas Corpus ensures this!",
    },
    {
      text: "What does the term 'secular' mean in India's Constitution?",
      options: [
        "India has no official state religion — all religions are equal",
        "Only Hinduism is the official religion",
        "Religion is banned in India",
        "The government controls all religions",
      ],
      correctIndex: 0,
      explanation:
        "Secular means the state treats all religions equally and maintains separation from religion. India's Constitution guarantees freedom of religion to all citizens, regardless of faith.",
    },
    {
      text: "India's Constitution was adopted on which date?",
      options: [
        "26 November 1949",
        "15 August 1947",
        "26 January 1950",
        "2 October 1948",
      ],
      correctIndex: 0,
      explanation:
        "India's Constitution was adopted on 26 November 1949 (celebrated as Constitution Day/Samvidhan Divas). It came into effect on 26 January 1950 — celebrated as Republic Day! 🇮🇳",
    },
    {
      text: "What is the minimum age to vote in Indian elections?",
      options: ["18 years", "21 years", "16 years", "25 years"],
      correctIndex: 0,
      explanation:
        "The voting age was lowered from 21 to 18 years by the 61st Constitutional Amendment in 1988. Every Indian citizen aged 18+ has the right to vote — this is the foundation of democracy!",
    },
  ],

  Research: [
    {
      text: "Ananya is doing a science experiment and gets unexpected results. What should she do?",
      options: [
        "Record the results honestly and investigate why",
        "Change the results to match expectations",
        "Ignore the experiment and try again",
        "Declare the experiment failed and stop",
      ],
      correctIndex: 0,
      explanation:
        "Unexpected results are the heart of discovery! Many great inventions (like penicillin) came from unexpected observations. Honest recording and investigating anomalies is the scientific method!",
    },
    {
      text: "Rahul reads that 'Scientists discover chocolate cures all diseases!' Should he believe this immediately?",
      options: [
        "No — one study isn't enough proof; check multiple sources",
        "Yes — scientists are always right",
        "Yes — chocolate is delicious so it must be healthy",
        "No — all science is fake news",
      ],
      correctIndex: 0,
      explanation:
        "Scientific claims require replication (same result in multiple studies). One sensational headline is rarely the full truth. Always check: Who conducted the study? Was it peer-reviewed? How many participants?",
    },
    {
      text: "What is the FIRST step in the scientific method?",
      options: [
        "Observation and asking a question",
        "Forming a conclusion",
        "Conducting an experiment",
        "Publishing results",
      ],
      correctIndex: 0,
      explanation:
        "Science begins with curiosity! Step 1: Observe something interesting. Step 2: Ask 'Why/How?' Step 3: Form a hypothesis. Step 4: Test with experiments. Step 5: Analyze results. Step 6: Draw conclusions.",
    },
    {
      text: "Priya is writing a research report. She copied text directly from a book without crediting the author. This is called:",
      options: [
        "Plagiarism — which is unethical and often illegal",
        "Good research practice",
        "Smart shortcut",
        "Proper citation",
      ],
      correctIndex: 0,
      explanation:
        "Plagiarism is presenting someone else's work as your own without giving credit. It's unethical and can have serious consequences. Always cite your sources: 'According to [Author], [year]...'",
    },
    {
      text: "Scientists test a new medicine on 10 people and it works for all of them. Can they be sure it works for everyone?",
      options: [
        "No — 10 people is too small a sample size",
        "Yes — 100% success rate proves it works",
        "Yes — any positive result confirms the medicine works",
        "Only if the 10 people are friends of the scientists",
      ],
      correctIndex: 0,
      explanation:
        "Sample size matters enormously! A study with 10 people cannot represent billions of diverse humans. Clinical trials typically need thousands of participants to provide statistically valid results.",
    },
    {
      text: "What does the term 'hypothesis' mean?",
      options: [
        "An educated guess based on observation that can be tested",
        "A proven scientific fact",
        "A research paper conclusion",
        "A type of laboratory equipment",
      ],
      correctIndex: 0,
      explanation:
        "A hypothesis is a proposed explanation based on limited evidence — it's a starting point for investigation, NOT a proven fact. It must be testable and falsifiable (capable of being proven wrong).",
    },
    {
      text: "Which of these is the BEST evidence for a scientific claim?",
      options: [
        "Results from 5 independent studies all showing the same thing",
        "One person's personal experience",
        "A celebrity's recommendation",
        "A popular opinion poll",
      ],
      correctIndex: 0,
      explanation:
        "Scientific consensus (multiple independent studies reaching same conclusion) is the strongest evidence. Personal testimonials are anecdotal — they don't control for other variables affecting the outcome.",
    },
    {
      text: "Rohan wants to measure how much time students spend on phones. What research method should he use?",
      options: [
        "Survey/questionnaire with many students",
        "Ask only his best friends",
        "Guess based on his own usage",
        "Read a 10-year-old book on the topic",
      ],
      correctIndex: 0,
      explanation:
        "Surveys collect data from a large, diverse group making results more representative. Primary research (collecting your own data) is more current and relevant than relying solely on old secondary sources!",
    },
    {
      text: "What is ISRO famous for in India?",
      options: [
        "Space research and launching satellites",
        "Teaching in schools",
        "Producing Bollywood films",
        "Building roads and bridges",
      ],
      correctIndex: 0,
      explanation:
        "ISRO (Indian Space Research Organisation) is India's national space agency. It successfully launched Chandrayaan (Moon mission), Mangalyaan (Mars mission), and hundreds of satellites. India is a world leader in affordable space technology!",
    },
    {
      text: "Why do scientists write their findings in research papers and publish them?",
      options: [
        "So other scientists can verify, replicate, and build upon the work",
        "To show off their intelligence",
        "Because it is required by law",
        "To earn money from paper sales",
      ],
      correctIndex: 0,
      explanation:
        "Scientific publications allow peer review — other experts check the methodology and results for errors. This process validates findings and allows science to be built cumulatively, accelerating human knowledge!",
    },
  ],
};

/**
 * Get a shuffled set of questions for a category.
 * Supplements backend questions with local ones if needed.
 */
export function getLocalQuestions(
  category: string,
  count: number,
): LocalQuestion[] {
  const bank = QUESTION_BANK[category] ?? QUESTION_BANK.Technical;
  const shuffled = [...bank].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

/**
 * Merge backend questions (converted) with local questions
 * to always ensure `count` total questions.
 */
export function mergeQuestions(
  backendQuestions: Array<{
    text: string;
    options: string[];
    correctIndex: bigint;
    explanation: string;
  }>,
  category: string,
  count: number,
): LocalQuestion[] {
  const converted: LocalQuestion[] = backendQuestions.map((q) => ({
    text: q.text,
    options: q.options,
    correctIndex: Number(q.correctIndex),
    explanation: q.explanation,
  }));

  if (converted.length >= count) {
    return converted.slice(0, count).sort(() => Math.random() - 0.5);
  }

  // Need to supplement with local questions
  const needed = count - converted.length;
  const bank = QUESTION_BANK[category] ?? QUESTION_BANK.Technical;

  // Exclude questions that are duplicates of backend questions
  const backendTexts = new Set(
    converted.map((q) => q.text.toLowerCase().trim()),
  );
  const available = bank.filter(
    (q) => !backendTexts.has(q.text.toLowerCase().trim()),
  );
  const shuffled = [...available].sort(() => Math.random() - 0.5);
  const local = shuffled.slice(0, needed);

  const all = [...converted, ...local].sort(() => Math.random() - 0.5);
  return all.slice(0, count);
}
