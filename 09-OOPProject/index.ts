#!/usr/bin/env node
// Importing the 'inquirer' library for handling user input
import inquirer from "inquirer";

// Importing the 'Person' class from the 'person.js' module
import { Person } from "./person.js";

// Main class to handle the program logic
class Main {
  // Async method to execute the main functionality
  public async main() {
    try {
      // Prompting the user to input their personality preference (1 or 2)
      const userInput = await inquirer.prompt([
        {
          name: "userPersonality",
          type: "input",
          message:
            "Type 1 If you talk to others or \nType 2 If you would rather keep to yourself: ",
        },
      ]);

      // Parsing the user input to ensure it's a number
      const userChoice: number = parseInt(userInput.userPersonality);

      // Creating an instance of the 'Person' class
      const myPerson = new Person();

      // Asking the user's question based on their choice
      myPerson.askQuestion(userChoice);

      // Displaying the user's personality based on their response
      console.log(`You are ${myPerson.getPersonality()}`);
    } catch (error) {
      // Handling errors, such as non-integer inputs
      console.log(`Please enter an integer value!`);
    }
  }
}

// Creating an instance of the 'Main' class
const myObject = new Main();

// Calling the 'main' method to execute the program logic
myObject.main();
