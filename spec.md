# CareerNavigator

## Current State
The app has:
- User registration/login with role-based access control
- Career assessment wizard (interest questions, skill ratings → category scores)
- Career database (20 careers across 6 categories)
- Career detail pages (skills, roadmap, salary, companies)
- Skill gap analysis (user rating vs required level)
- Milestone tracker (roadmap task completion)
- Basic rule-based chatbot (`careerChat`) responding to keywords
- Profile saving and history

## Requested Changes (Diff)

### Add
1. **Recommended Study Materials** -- Per career/interest, surfaced on dashboard and career detail pages. Materials include books, YouTube channels, online courses (Coursera/NPTEL links), and practice sites. Stored as static data tied to category/career. Shown based on assessment scores/interests.
2. **AI Chatbot (enhanced)** -- A real conversational AI chatbot that:
   - Understands context (career interest, assessment scores, student profile)
   - Answers questions in simple language a 10th-class student can understand
   - Provides career guidance, study tips, motivational messages
   - Responds with study material suggestions based on chat topics
   - Stored chat history per user session (frontend state, not persisted)
3. **Reminders / Study Planner** -- Students can set named reminders with date/time (study sessions, exam prep, assignment deadlines). Stored per user in backend. CRUD operations: add, list, delete, toggle complete.
4. **Assignment Questions** -- Dynamic, psychology-aware question sets:
   - Questions based on student's top career interests (from assessment)
   - Questions use simple real-world scenarios a 10th-grader understands
   - Each category has a pool of 20+ questions; app randomly selects 5 each time so they never repeat in the same session
   - Questions are multiple-choice with explanation of the correct answer
   - Student answers are scored and feedback is given based on performance
   - Question sets stored in backend, served per category with random selection
5. **Interests-based content filtering** -- Dashboard shows content (materials, questions, chat suggestions) based on stored assessment results

### Modify
- `DashboardPage` -- Add sections: Study Materials, Daily Questions, Reminders
- `CareerDetailPage` -- Add recommended study materials section at bottom
- Chatbot component -- Replace simple keyword chatbot with full floating AI chat UI that handles natural conversation, study tips, motivational quotes, simple career Q&A

### Remove
- Nothing removed

## Implementation Plan
1. **Backend**: Add `Reminder` type + CRUD (addReminder, getReminders, deleteReminder, toggleReminder). Add `StudyMaterial` type stored per category. Add `getStudyMaterials(category)`. Add `getAssignmentQuestions(category, count)` that returns a random subset from a large pool. Add `saveQuestionAttempt` for tracking score history. Keep and extend `careerChat` for richer responses.
2. **Frontend - Study Materials**: New `StudyMaterialsSection` component. Shown on dashboard (based on top interest) and career detail page.
3. **Frontend - Reminders**: New `RemindersPage` and `ReminderWidget` on dashboard. Uses backend CRUD. Shows due-today reminders highlighted.
4. **Frontend - Assignment Questions**: New `QuestionsPage` with dynamic MCQ UI. Questions change each session. After answering all, show score + explanations. Tracks history.
5. **Frontend - Chatbot**: Replace or upgrade existing chatbot with a full floating chat widget with conversation history, typing indicator, and smart responses (rule-based but comprehensive, covering career advice, study tips, motivation, subject help for 10th graders).
6. **Frontend - Dashboard update**: Integrate widgets for reminders, today's questions prompt, and study materials.
