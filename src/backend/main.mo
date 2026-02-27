import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Time "mo:core/Time";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Migration "migration";

// apply the migration function on upgrades with the anonymous record extension
(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
    education : Text;
    stream : Text;
  };

  public type Skill = {
    skillName : Text;
    requiredLevel : Nat;
  };

  public type RoadmapYear = {
    year : Nat;
    tasks : [Text];
  };

  public type Career = {
    id : Nat;
    title : Text;
    category : Text;
    description : Text;
    requiredSkills : [Skill];
    educationPath : [Text];
    roadmapYears : [RoadmapYear];
    salaryEntry : Text;
    salaryMid : Text;
    salarySenior : Text;
    topCompanies : [Text];
  };

  public type Assessment = {
    technicalScore : Nat;
    creativeScore : Nat;
    businessScore : Nat;
    medicalScore : Nat;
    governmentScore : Nat;
    researchScore : Nat;
    skillRatings : [SkillRating];
    topCareers : [Nat];
    timestamp : Int;
  };

  public type SkillRating = {
    skillName : Text;
    userRating : Nat;
  };

  public type Milestone = {
    careerTitle : Text;
    year : Nat;
    taskText : Text;
    completed : Bool;
  };

  public type Reminder = {
    title : Text;
    description : Text;
    dueDate : Int;
    completed : Bool;
  };

  public type StudyMaterial = {
    title : Text;
    materialType : Text;
    url : Text;
    description : Text;
    difficulty : Text;
  };

  public type Question = {
    text : Text;
    options : [Text];
    correctIndex : Nat;
    explanation : Text;
  };

  public type QuestionAttempt = {
    category : Text;
    score : Nat;
    total : Nat;
    timestamp : Int;
  };

  module Milestone {
    public func compare(m1 : Milestone, m2 : Milestone) : Order.Order {
      switch (Text.compare(m1.careerTitle, m2.careerTitle)) {
        case (#equal) {
          switch (Nat.compare(m1.year, m2.year)) {
            case (#equal) { Text.compare(m1.taskText, m2.taskText) };
            case (other) { other };
          };
        };
        case (other) { other };
      };
    };
  };

  module Assessment {
    public func compareByTimestampDesc(a1 : Assessment, a2 : Assessment) : Order.Order {
      Int.compare(a2.timestamp, a1.timestamp);
    };
  };

  let userProfiles = Map.empty<Principal, UserProfile>();
  let userAssessments = Map.empty<Principal, List.List<Assessment>>();
  let userMilestones = Map.empty<Principal, List.List<Milestone>>();
  let userReminders = Map.empty<Principal, List.List<Reminder>>();
  let userQuestionAttempts = Map.empty<Principal, List.List<QuestionAttempt>>();

  var nextCareerId = 1;
  let careersList : List.List<Career> = List.empty<Career>();

  // Populate careers
  func addCareer(title : Text, category : Text, description : Text, skills : [Skill], education : [Text], roadmap : [RoadmapYear], entry : Text, mid : Text, senior : Text, companies : [Text]) {
    let career : Career = {
      id = nextCareerId;
      title;
      category;
      description;
      requiredSkills = skills;
      educationPath = education;
      roadmapYears = roadmap;
      salaryEntry = entry;
      salaryMid = mid;
      salarySenior = senior;
      topCompanies = companies;
    };
    careersList.add(career);
    nextCareerId += 1;
  };

  addCareer(
    "Software Developer",
    "Technical",
    "Develops software applications and systems.",
    [{ skillName = "Programming"; requiredLevel = 5 }],
    ["B.Tech", "M.Tech"],
    [{ year = 1; tasks = ["Learn basics", "Practice coding"] }],
    "$50k", "$80k", "$120k",
    ["Google", "Microsoft"]
  );
  addCareer(
    "Data Scientist",
    "Technical",
    "Works with data analysis and modeling.",
    [{ skillName = "Statistics"; requiredLevel = 4 }],
    ["B.Sc", "M.Sc"],
    [{ year = 1; tasks = ["Learn statistics", "Practice with datasets"] }],
    "$60k", "$90k", "$130k",
    ["Facebook", "Amazon"]
  );
  addCareer(
    "Cybersecurity Analyst",
    "Technical",
    "Protects systems from cyber threats.",
    [{ skillName = "Security"; requiredLevel = 5 }],
    ["B.Tech", "Certifications"],
    [{ year = 1; tasks = ["Learn networking", "Study security protocols"] }],
    "$55k", "$85k", "$125k",
    ["Cisco", "IBM"]
  );
  addCareer(
    "UI/UX Designer",
    "Creative",
    "Designs user interfaces and experiences.",
    [{ skillName = "Design Thinking"; requiredLevel = 5 }],
    ["Design Degree"],
    [{ year = 1; tasks = ["Learn design software", "Build a portfolio"] }],
    "$45k", "$70k", "$100k",
    ["Design Agencies"]
  );
  addCareer(
    "Graphic Designer",
    "Creative",
    "Creates visual content for various media.",
    [{ skillName = "Creativity"; requiredLevel = 5 }],
    ["Design Degree", "Portfolio"],
    [{ year = 1; tasks = ["Master design tools", "Build portfolio"] }],
    "$40k", "$65k", "$95k",
    ["Adobe", "Creative Studios"]
  );
  addCareer(
    "Animator",
    "Creative",
    "Creates animations for films and games.",
    [{ skillName = "Animation"; requiredLevel = 5 }],
    ["Animation Degree"],
    [{ year = 1; tasks = ["Learn animation software", "Create demo reel"] }],
    "$42k", "$68k", "$98k",
    ["Pixar", "DreamWorks"]
  );
  addCareer(
    "Doctor",
    "Medical",
    "Diagnoses and treats patients.",
    [{ skillName = "Biology"; requiredLevel = 5 }],
    ["MBBS", "MD"],
    [{ year = 1; tasks = ["Study biology", "Volunteer at hospitals"] }],
    "$70k", "$120k", "$180k",
    ["Hospitals", "Clinics"]
  );
  addCareer(
    "Nurse",
    "Medical",
    "Provides patient care and support.",
    [{ skillName = "Healthcare"; requiredLevel = 4 }],
    ["Nursing Degree"],
    [{ year = 1; tasks = ["Study nursing", "Clinical practice"] }],
    "$45k", "$65k", "$85k",
    ["Hospitals", "Healthcare Centers"]
  );
  addCareer(
    "Pharmacist",
    "Medical",
    "Dispenses medications and advises patients.",
    [{ skillName = "Pharmacy"; requiredLevel = 4 }],
    ["Pharmacy Degree"],
    [{ year = 1; tasks = ["Study pharmacology", "Internship"] }],
    "$50k", "$75k", "$100k",
    ["Pharmacies", "Hospitals"]
  );
  addCareer(
    "MBA Manager",
    "Business",
    "Manages business operations and strategy.",
    [{ skillName = "Management"; requiredLevel = 4 }],
    ["MBA"],
    [{ year = 1; tasks = ["Study business", "Internships"] }],
    "$60k", "$95k", "$140k",
    ["Corporations", "Consulting Firms"]
  );
  addCareer(
    "Accountant",
    "Business",
    "Manages financial records.",
    [{ skillName = "Accounting Principles"; requiredLevel = 4 }],
    ["B.Com", "M.Com"],
    [{ year = 1; tasks = ["Learn accounting software", "Practice bookkeeping"] }],
    "$40k", "$65k", "$90k",
    ["Accounting Firms"]
  );
  addCareer(
    "Entrepreneur",
    "Business",
    "Starts and manages own business ventures.",
    [{ skillName = "Business Acumen"; requiredLevel = 5 }],
    ["Business Degree", "Experience"],
    [{ year = 1; tasks = ["Develop business plan", "Network"] }],
    "$30k", "$80k", "$150k+",
    ["Startups", "Self-employed"]
  );
  addCareer(
    "IAS Officer",
    "Government",
    "Administers government policies and programs.",
    [{ skillName = "Leadership"; requiredLevel = 5 }],
    ["Graduate Degree", "UPSC"],
    [{ year = 1; tasks = ["Prepare for UPSC", "Study governance"] }],
    "$50k", "$80k", "$120k",
    ["Government"]
  );
  addCareer(
    "Police Officer",
    "Government",
    "Maintains law and order.",
    [{ skillName = "Physical Fitness"; requiredLevel = 4 }],
    ["Graduate Degree"],
    [{ year = 1; tasks = ["Physical training", "Study law"] }],
    "$35k", "$55k", "$75k",
    ["Police Department"]
  );
  addCareer(
    "Defense Officer",
    "Government",
    "Serves in armed forces.",
    [{ skillName = "Discipline"; requiredLevel = 5 }],
    ["Graduate Degree", "NDA/CDS"],
    [{ year = 1; tasks = ["Physical training", "Prepare for exams"] }],
    "$40k", "$70k", "$100k",
    ["Armed Forces"]
  );
  addCareer(
    "Research Scientist",
    "Research",
    "Conducts scientific research.",
    [{ skillName = "Research Methods"; requiredLevel = 5 }],
    ["PhD"],
    [{ year = 1; tasks = ["Study research methods", "Lab work"] }],
    "$55k", "$85k", "$120k",
    ["Universities", "Research Labs"]
  );
  addCareer(
    "Journalist",
    "Research",
    "Reports news and investigates stories.",
    [{ skillName = "Communication"; requiredLevel = 5 }],
    ["Journalism Degree"],
    [{ year = 1; tasks = ["Study journalism", "Internships"] }],
    "$35k", "$60k", "$90k",
    ["Media Houses"]
  );
  addCareer(
    "Teacher",
    "Research",
    "Educates students in various subjects.",
    [{ skillName = "Teaching"; requiredLevel = 4 }],
    ["B.Ed", "Subject Degree"],
    [{ year = 1; tasks = ["Study pedagogy", "Practice teaching"] }],
    "$30k", "$50k", "$70k",
    ["Schools", "Colleges"]
  );
  addCareer(
    "Lawyer",
    "Government",
    "Provides legal advice and representation.",
    [{ skillName = "Legal Knowledge"; requiredLevel = 5 }],
    ["Law Degree"],
    [{ year = 1; tasks = ["Study law", "Internships"] }],
    "$45k", "$80k", "$130k",
    ["Law Firms", "Courts"]
  );
  addCareer(
    "Architect",
    "Creative",
    "Designs buildings and structures.",
    [{ skillName = "Design"; requiredLevel = 5 }],
    ["Architecture Degree"],
    [{ year = 1; tasks = ["Study architecture", "Design projects"] }],
    "$48k", "$75k", "$110k",
    ["Architecture Firms"]
  );

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func saveProfile(name : Text, education : Text, stream : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let profile : UserProfile = {
      name;
      education;
      stream;
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query func getAllCareers() : async [Career] {
    careersList.toArray().reverse();
  };

  public query func getCareerById(id : Nat) : async ?Career {
    let iter = careersList.values();
    switch (iter.find(func(c) { c.id == id })) {
      case (?career) { ?career };
      case (null) { null };
    };
  };

  public query func getCareersByCategory(category : Text) : async [Career] {
    careersList.values().toArray().filter(func(c) { c.category == category });
  };

  public shared ({ caller }) func saveAssessment(technicalScore : Nat, creativeScore : Nat, businessScore : Nat, medicalScore : Nat, governmentScore : Nat, researchScore : Nat, skillRatings : [SkillRating], topCareers : [Nat]) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save assessments");
    };

    let assessment : Assessment = {
      technicalScore;
      creativeScore;
      businessScore;
      medicalScore;
      governmentScore;
      researchScore;
      skillRatings;
      topCareers;
      timestamp = Time.now();
    };

    let existingAssessments = switch (userAssessments.get(caller)) {
      case (null) { List.empty<Assessment>() };
      case (?assessments) { assessments };
    };

    existingAssessments.add(assessment);
    userAssessments.add(caller, existingAssessments);
  };

  public query ({ caller }) func getAssessments() : async [Assessment] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access assessments");
    };
    switch (userAssessments.get(caller)) {
      case (null) { [] };
      case (?assessments) {
        assessments.toArray().sort(Assessment.compareByTimestampDesc);
      };
    };
  };

  public query ({ caller }) func getLatestAssessment() : async ?Assessment {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access assessments");
    };
    switch (userAssessments.get(caller)) {
      case (null) { null };
      case (?assessments) {
        assessments.first();
      };
    };
  };

  public shared ({ caller }) func initMilestones(careerId : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can initialize milestones");
    };

    let careerOpt = await getCareerById(careerId);
    switch (careerOpt) {
      case (null) { Runtime.trap("Career not found") };
      case (?career) {
        let milestonesList = List.empty<Milestone>();
        for (roadmap in career.roadmapYears.values()) {
          for (task in roadmap.tasks.values()) {
            let milestone : Milestone = {
              careerTitle = career.title;
              year = roadmap.year;
              taskText = task;
              completed = false;
            };
            milestonesList.add(milestone);
          };
        };
        userMilestones.add(caller, milestonesList);
      };
    };
  };

  public shared ({ caller }) func toggleMilestone(careerTitle : Text, year : Nat, taskText : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can toggle milestones");
    };

    let milestones = switch (userMilestones.get(caller)) {
      case (null) { Runtime.trap("No milestones found for user") };
      case (?milestones) { milestones };
    };

    let milestonesArray = milestones.toArray();
    let milestoneOpt = milestonesArray.find(func(m) { m.careerTitle == careerTitle and m.year == year and m.taskText == taskText });

    switch (milestoneOpt) {
      case (null) { Runtime.trap("Milestone not found") };
      case (?milestone) {
        let updatedMilestone : Milestone = {
          careerTitle = milestone.careerTitle;
          year = milestone.year;
          taskText = milestone.taskText;
          completed = not milestone.completed;
        };

        let updatedMilestones = milestonesArray.map(
          func(m) {
            if (m.careerTitle == careerTitle and m.year == year and m.taskText == taskText) {
              updatedMilestone;
            } else {
              m;
            };
          }
        );

        let updatedList = List.empty<Milestone>();
        updatedList.addAll(updatedMilestones.values());
        userMilestones.add(caller, updatedList);
      };
    };
  };

  public query ({ caller }) func getMilestones(careerTitle : Text) : async [Milestone] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access milestones");
    };
    switch (userMilestones.get(caller)) {
      case (null) { [] };
      case (?milestones) {
        milestones.toArray().filter(func(m) { m.careerTitle == careerTitle });
      };
    };
  };

  // Reminders methods
  public shared ({ caller }) func addReminder(title : Text, description : Text, dueDate : Int) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can add reminders");
    };
    let reminder : Reminder = {
      title;
      description;
      dueDate;
      completed = false;
    };
    let existingReminders = switch (userReminders.get(caller)) {
      case (null) { List.empty<Reminder>() };
      case (?reminders) { reminders };
    };
    existingReminders.add(reminder);
    userReminders.add(caller, existingReminders);
  };

  public query ({ caller }) func getReminders() : async [Reminder] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access reminders");
    };
    switch (userReminders.get(caller)) {
      case (null) { [] };
      case (?reminders) { reminders.toArray() };
    };
  };

  public shared ({ caller }) func deleteReminder(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete reminders");
    };
    let reminders = switch (userReminders.get(caller)) {
      case (null) { Runtime.trap("No reminders found for user") };
      case (?reminders) { reminders };
    };
    let remindersArray = reminders.toArray();
    let reminderOpt = remindersArray.find(func(r) { r.title == title });
    switch (reminderOpt) {
      case (null) { Runtime.trap("Reminder not found") };
      case (?_) {
        let updatedReminders = List.empty<Reminder>();
        for (reminder in reminders.reverseValues()) {
          if (reminder.title != title) {
            updatedReminders.add(reminder);
          };
        };
        userReminders.add(caller, updatedReminders.reverse());
      };
    };
  };

  public shared ({ caller }) func toggleReminderComplete(title : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can toggle reminders");
    };

    let reminders = switch (userReminders.get(caller)) {
      case (null) { Runtime.trap("No reminders found for user") };
      case (?reminders) { reminders };
    };

    let remindersArray = reminders.toArray();
    let reminderOpt = remindersArray.find(func(r) { r.title == title });

    switch (reminderOpt) {
      case (null) { Runtime.trap("Reminder not found") };
      case (?reminder) {
        let updatedReminder : Reminder = {
          title = reminder.title;
          description = reminder.description;
          dueDate = reminder.dueDate;
          completed = not reminder.completed;
        };

        let updatedReminders = remindersArray.map(
          func(r) {
            if (r.title == title) {
              updatedReminder;
            } else {
              r;
            };
          }
        );

        let updatedList = List.empty<Reminder>();
        updatedList.addAll(updatedReminders.values());
        userReminders.add(caller, updatedList);
      };
    };
  };

  let studyMaterials : [StudyMaterial] = [
    // Technical
    {
      title = "Head First Java";
      materialType = "Book";
      url = "https://www.amazon.com/Head-First-Java-Kathy-Sierra/dp/0596009208";
      description = "Beginner-friendly Java programming book.";
      difficulty = "Beginner";
    },
    {
      title = "Python for Everybody";
      materialType = "Course";
      url = "https://www.coursera.org/specializations/python";
      description = "Beginner Python programming course.";
      difficulty = "Beginner";
    },
    {
      title = "Network Security Fundamentals";
      materialType = "Website";
      url = "https://www.cisco.com/c/en/us/training-events/training-certifications/courses/online/cybersecurity.html";
      description = "Intro to cybersecurity concepts.";
      difficulty = "Beginner";
    },
    {
      title = "UI/UX Design for Beginners";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=3e-WO-9UneA";
      description = "Design principles video tutorial.";
      difficulty = "Beginner";
    },

    // Medical
    {
      title = "Introduction to Biology";
      materialType = "Book";
      url = "https://www.sapub.org/journal/journalarticles.aspx?journalid=1110";
      description = "Comprehensive biology textbook.";
      difficulty = "Beginner";
    },
    {
      title = "Nursing Fundamentals Course";
      materialType = "Course";
      url = "https://www.edx.org/learn/nursing";
      description = "Basic nursing techniques course.";
      difficulty = "Beginner";
    },
    {
      title = "Pharmacy Basics Tutorial";
      materialType = "Website";
      url = "https://www.pharmacytimes.com/";
      description = "Introduction to pharmacy concepts.";
      difficulty = "Beginner";
    },
    {
      title = "Medical Terminology Video";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=mt7mrP7o-rE";
      description = "Learn common medical terms.";
      difficulty = "Beginner";
    },

    // Creative
    {
      title = "Photoshop for Beginners";
      materialType = "Course";
      url = "https://www.udemy.com/course/adobe-photoshop-cc-essentials-training-course/";
      description = "Graphic design course for beginners.";
      difficulty = "Beginner";
    },
    {
      title = "Animation Fundamentals";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=wH_dcuPuk8E";
      description = "Animation basics video tutorials.";
      difficulty = "Beginner";
    },
    {
      title = "Creativity Techniques Ebook";
      materialType = "Book";
      url = "https://www.bl.uk/collection-items/creativity-theories-and-examples";
      description = "Learn creative thinking strategies.";
      difficulty = "Beginner";
    },
    {
      title = "UI Design Patterns";
      materialType = "Website";
      url = "https://www.smashingmagazine.com/category/user-experience";
      description = "User interface design concepts.";
      difficulty = "Beginner";
    },

    // Business
    {
      title = "Principles of Management";
      materialType = "Book";
      url = "https://www.mentorialbooks.com/product-page/principles-of-management-by-dr-mani-schwartz-pdf";
      description = "Management essentials textbook.";
      difficulty = "Beginner";
    },
    {
      title = "Accounting Basics";
      materialType = "Course";
      url = "https://www.coursera.org/learn/accounting-basics";
      description = "Introductory accounting course.";
      difficulty = "Beginner";
    },
    {
      title = "Business Strategy Foundations";
      materialType = "Website";
      url = "https://www.strategy-business.com/";
      description = "Business strategic planning resources.";
      difficulty = "Beginner";
    },
    {
      title = "Entrepreneurship 101";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=gXC3qD6f_Ng";
      description = "Startup fundamentals video.";
      difficulty = "Beginner";
    },

    // Government
    {
      title = "UPSC Exam Guide";
      materialType = "Book";
      url = "https://www.alsias.net/p/als-book-store.html";
      description = "Comprehensive UPSC exam prep guide.";
      difficulty = "Beginner";
    },
    {
      title = "Police Exam Preparation";
      materialType = "Course";
      url = "https://www.careerlauncher.com/blogs/up-police-exam-mock-test-series.html";
      description = "Courses and coaching tips for police entrance exams.";
      difficulty = "Beginner";
    },
    {
      title = "Government Schemes Portal";
      materialType = "Website";
      url = "https://india.gov.in/"; // Indian Government official portal
      description = "Official government resources and policies.";
      difficulty = "Beginner";
    },
    {
      title = "Defense Training Techniques";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=tiHWQp_yuBo";
      description = "Intro to defense readiness and physical training.";
      difficulty = "Beginner";
    },

    // Research
    {
      title = "Scientific Research Methods";
      materialType = "Book";
      url = "https://books.google.com/pub/books?id=bwUOgryO7yUC";
      description = "Comprehensive guide to research methodology.";
      difficulty = "Beginner";
    },
    {
      title = "Introduction to Journalism";
      materialType = "Course";
      url = "https://www.edx.org/learn/journalism";
      description = "Basic journalism course.";
      difficulty = "Beginner";
    },
    {
      title = "Teaching Resources Hub";
      materialType = "Website";
      url = "https://www.teachable.com/blog";
      description = "Diverse educational resources.";
      difficulty = "Beginner";
    },
    {
      title = "Education and Research Basics";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=L9SdkM9Qbvo";
      description = "Educational research video tutorials.";
      difficulty = "Beginner";
    },

    // Intermediate & Advanced Technical
    {
      title = "Object-Oriented Programming with Java";
      materialType = "Book";
      url = "https://www.amazon.com/Object-Oriented-Programming-Java-Gilad-Bracha/dp/0130159209";
      description = "Java programming concepts for intermediate learners.";
      difficulty = "Intermediate";
    },
    {
      title = "Python Data Science Handbook";
      materialType = "Book";
      url = "https://www.amazon.com/Python-Data-Science-Handbook-0/dp/1491912057";
      description = "Intermediate Python data analysis.";
      difficulty = "Intermediate";
    },
    {
      title = "Advanced Network Security";
      materialType = "Course";
      url = "https://www.coursera.org/specializations/cybersecurity";
      description = "Advanced cybersecurity skills and practices.";
      difficulty = "Advanced";
    },
    {
      title = "UI/UX Design Masterclass";
      materialType = "Course";
      url = "https://www.udemy.com/course/ui-ux-design-master-class";
      description = "Intermediate user experience design techniques.";
      difficulty = "Intermediate";
    },

    // Intermediate & Advanced Medical
    {
      title = "Intermediate Human Biology";
      materialType = "Book";
      url = "https://www.amazon.com/Interactive-Physiology-DVD-Package-Value/dp/080535628X";
      description = "Detailed human biology concepts.";
      difficulty = "Intermediate";
    },
    {
      title = "Advanced Nursing Skills";
      materialType = "YouTube";
      url = "https://www.youtube.com/watch?v=4qwCChvorsa";
      description = "Videos on specialized nursing procedures.";
      difficulty = "Advanced";
    },
  ];

  public query func getStudyMaterials(category : Text) : async [StudyMaterial] {
    studyMaterials.filter(func(sm) {
      if (category == "Technical") {
        ["Technical", "Advanced Technical"].find(func(cat) { cat == category }) != null;
      } else if (category == "Medical") {
        ["Medical", "Advanced Medical"].find(func(cat) { cat == category }) != null;
      } else {
        sm.materialType == category;
      };
    });
  };

  public query func getAllStudyMaterials() : async [StudyMaterial] {
    studyMaterials;
  };

  // Questions per category
  let technicalQuestions : [Question] = [
    {
      text = "Which of the following languages is used for web development?";
      options = ["HTML", "MS Word", "Excel", "PowerPoint"];
      correctIndex = 0;
      explanation = "HTML is used for web page creation, while the others are office productivity tools.";
    }
  ];

  public query ({ caller }) func getRandomQuestions(category : Text, count : Nat) : async [Question] {
    let questions = switch (category) {
      case ("Technical") { technicalQuestions };
      case (_) { [] };
    };
    if (questions.size() <= count) { return questions };

    let rand : Nat = Int.abs(Time.now()) % 100;
    let start = rand % (questions.size() - count + 1);
    Array.tabulate<Question>(count, func(i) { questions[i + start] });
  };

  public shared ({ caller }) func saveQuestionAttempt(category : Text, score : Nat, total : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save question attempts");
    };
    let attempt : QuestionAttempt = {
      category;
      score;
      total;
      timestamp = Time.now();
    };
    let existingAttempts = switch (userQuestionAttempts.get(caller)) {
      case (null) { List.empty<QuestionAttempt>() };
      case (?attempts) { attempts };
    };
    existingAttempts.add(attempt);
    userQuestionAttempts.add(caller, existingAttempts);
  };

  public query ({ caller }) func getQuestionHistory() : async [QuestionAttempt] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access question history");
    };
    switch (userQuestionAttempts.get(caller)) {
      case (null) { [] };
      case (?attempts) { attempts.toArray() };
    };
  };

  public query func careerChat(userQuery : Text) : async Text {
    userQuery.toLower();
  };
};
