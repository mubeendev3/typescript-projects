# Student Management System

This project is a console-based Student Management System implemented in TypeScript using Object-Oriented Programming (OOP) concepts. The system allows you to manage students, enroll them in courses, view balances, pay tuition fees, and show detailed student status.

## Project Structure

The project consists of two main classes:

### 1. Student Class

- Properties:

  - `studentID`: Unique 5-digit student ID.
  - `name`: Student's name.
  - `courses`: Array of courses enrolled.
  - `balance`: Current balance.

- Methods:
  - `enrollCourse(course: string): void`: Enroll the student in a course.
  - `viewBalance(): void`: View the student's balance.
  - `payTuition(amount: number): void`: Pay tuition fees.
  - `showStatus(): void`: Display detailed student information.

### 2. StudentManagementSystem Class

- Properties:

  - `students`: Array of students in the system.

- Methods:
  - `addStudent(): Promise<void>`: Add a new student to the system.
  - `enrollStudentInCourse(): Promise<void>`: Enroll a student in a course.
  - `viewStudentBalance(): Promise<void>`: View a student's balance.
  - `payStudentTuition(): Promise<void>`: Pay tuition fees for a student.
  - `showStudentStatus(): Promise<void>`: Display detailed status for a student.

## Features

- 🎓 **Student Management**: Add and manage students in the system.
- 🆔 **Unique Student IDs**: Automatically generate unique 5-digit student IDs.
- 📚 **Enrollment in Courses**: Enroll students in various courses.
- 💰 **Balance Tracking**: View and manage student balances.
- 💸 **Tuition Payment**: Pay tuition fees to update the balance.
- 📊 **Detailed Student Status**: Display comprehensive student information.
- ➕ **Interactive CLI Interface**: Use Inquirer for a user-friendly command-line interface.
- 🔄 **Real-Time Interaction**: Dynamically interact with the system through prompts.
- 🔄 **Multiple Actions**: Perform actions like adding students, enrolling in courses, viewing balances, paying tuition, and showing student status.
- 🔄 **Error Handling**: Notify users if a student is not found during actions.
- 📈 **Maintainable Codebase**: Implement an object-oriented design for clean and organized code.

## Dependencies

AdventureGame relies on the following dependencies:

- [inquirer](https://www.npmjs.com/package/inquirer): A powerful library for handling interactive command-line prompts.

## How to Use

1. **Add Students**: Choose "Add Student" to add new students to the system. Enter the student's name when prompted.
2. **Enroll Students in Courses**: Select "Enroll Student in Course" to enroll a student in a course. Provide the student ID and course name as prompted.
3. **View Student Balance**: Opt for "View Student Balance" to check a student's balance. Input the student ID when prompted.
4. **Pay Student Tuition**: Choose "Pay Student Tuition" to pay tuition fees for a student. Enter the student ID and the amount to pay when prompted.
5. **Show Student Status**: Select "Show Student Status" to display detailed information about a student. Provide the student ID when prompted.
6. **Exit the System**: To exit the Student Management System, choose "Exit" from the list of actions.

## Installation & Usage

1. Clone the repository: `git clone https://github.com/mubeendev3/typescript-projects.git`
2. Change into the project directory: `cd 12-StudentManagementSystemProject`
3. Install dependencies: `npm install`
4. Compile the Adventure Game CLI into .js by using this command : `tsc`
5. Run the game.js file using: `node index.js`

## Example

```bash
npx mubeen-studentmanagement-project
```

## Issues

If you encounter any issues or have suggestions, please report them on the [GitHub repository](https://github.com/mubeendev3/typescript-projects/issues).

## Follow Me:

🌐 Connect with Mubeen on [LinkedIn](https://www.linkedin.com/in/mubeendeveloper/)<br>
🐙 Explore Mubeen's projects on [GitHub](https://github.com/mubeendev3)<br>
📸 Follow Mubeen's creative journey on [Instagram](https://www.instagram.com/mubeendeveloper/)<br>
🐦 Stay updated with Mubeen on [Twitter](https://twitter.com/mubeendeveloper)<br>
🎨 Discover Mubeen's design portfolio on [Behance](https://www.behance.net/pixuro)<br>
