#!/usr/bin/env node
// Import required packages
import inquirer from "inquirer";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import boxen from "boxen";

// Define the structure of a quiz question
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Create a QuizApp class to manage the quiz
class QuizApp {
  // Private property to store the user's score
  private userScore: number = 0;

  // Array of quiz questions
  private questions: QuizQuestion[] = [
    {
      question: "What does TypeScript bring to JavaScript?",
      options: [
        "Static Typing",
        "Dynamic Typing",
        "No Typing",
        "Strong Typing",
      ],
      correctAnswer: "Static Typing",
    },
    {
      question:
        "Which keyword is used to declare a variable with a fixed type in TypeScript?",
      options: ["let", "var", "const", "type"],
      correctAnswer: "const",
    },
    {
      question: 'What is the purpose of the "interface" keyword in TypeScript?',
      options: [
        "To define a class",
        "To define a function",
        "To define a type structure",
        "To create an object",
      ],
      correctAnswer: "To define a type structure",
    },
    {
      question:
        'What is the TypeScript equivalent of "undefined" in JavaScript?',
      options: ["null", "undefined", "void", "NaN"],
      correctAnswer: "undefined",
    },
    {
      question:
        "How do you define an optional property in a TypeScript interface?",
      options: [
        "property?",
        "property!: type",
        "property?: type",
        "property!: type | undefined",
      ],
      correctAnswer: "property?: type",
    },
    {
      question:
        "Which TypeScript compiler option is used to watch for file changes and recompile?",
      options: ["--outFile", "--watch", "--strict", "--target"],
      correctAnswer: "--watch",
    },
    {
      question: "What is a union type in TypeScript?",
      options: [
        "A type that can be either null or undefined",
        "A type that can be of multiple types",
        "A type that can only be null",
        "A type that can only be undefined",
      ],
      correctAnswer: "A type that can be of multiple types",
    },
    {
      question:
        "How do you explicitly specify the type of a variable in TypeScript?",
      options: [
        'Using the "type" keyword',
        'Using the "var" keyword',
        'Using the "as" keyword',
        'Using the "let" keyword',
      ],
      correctAnswer: 'Using the "as" keyword',
    },
    {
      question: "Which version of ECMAScript is TypeScript based on?",
      options: ["ES5", "ES6", "ES2015", "ES2019"],
      correctAnswer: "ES2015",
    },
    {
      question: 'What is the purpose of the "readonly" modifier in TypeScript?',
      options: [
        "To make a property writable",
        "To make a property read-only",
        "To specify a variable type",
        "To define a constant",
      ],
      correctAnswer: "To make a property read-only",
    },
  ];
  // Total score of the quiz according to questions
  private totalScore: number = this.questions.length;

  // Display a welcome animation for the quiz
  public async welcomeScreenAnimation() {
    const animation = chalkAnimation.rainbow(
      boxen(
        `
 Welcome To Our
┏┓┳┳┳┏┓  ┏┓┏┓┏┓
┃┃┃┃┃┏┛  ┣┫┃┃┃┃
┗┻┗┛┻┗┛  ┛┗┣┛┣┛
Project
       `,

        {
          title: "Quiz App Project",
          titleAlignment: "center",
          textAlignment: "center",
          margin: 1,
          padding: 1,
          borderStyle: "double",
        }
      )
    );
    // Stop the animation after a specified duration
    await this.stopAnimation(animation, 3);
    this.startQuiz();
  }

  // Method for ending animation and thanking the user
  async endingAnimation(): Promise<void> {
    const endingAnimation = chalkAnimation.rainbow(
      `Thank You For Using Our QUIZ APP!`
    );
    await this.stopAnimation(endingAnimation, 3);
  }

  // Stop animations after a specified duration
  stopAnimation(animation: any, duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        animation.stop();
        resolve();
      }, duration * 1000);
    });
  }

  // Start the quiz
  public async startQuiz() {
    for (const question of this.questions) {
      await this.askQuestion(question);
    }
    console.log(
      chalk.bgCyan.bold(
        ` Your Scored: ${this.userScore}/${this.totalScore}! \n`
      )
    );
    await this.restartQuiz();
  }

  // Ask a every single question
  private async askQuestion(question: QuizQuestion) {
    const answer = await inquirer.prompt({
      type: "list",
      name: "userAnswer",
      message: chalk.green.bold.underline(question.question),
      choices: question.options,
    });

    this.checkAnswer(answer.userAnswer, question.correctAnswer);
  }

  // Check if the user's answer is correct
  private checkAnswer(userAnswer: string, correctAnswer: string) {
    if (userAnswer === correctAnswer) {
      this.userScore++;
    }
    console.log();
  }

  // Ask the user if they want to restart the quiz
  private async restartQuiz() {
    const userChoices: string[] = ["Yes", "No"];
    const userInput = await inquirer.prompt([
      {
        type: "list",
        name: "userDecision",
        message: "Do you want to start quiz again?",
        choices: userChoices,
      },
    ]);
    if (userInput.userDecision === userChoices[0]) {
      this.startQuiz();
    } else {
      this.endingAnimation();
    }
  }
}

// Create an instance of the QuizApp class
const quizApp = new QuizApp();

// Start the quiz
quizApp.welcomeScreenAnimation();
