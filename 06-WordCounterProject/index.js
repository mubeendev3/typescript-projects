#!/usr/bin/env node
// Importing necessary libraries for user input, text formatting, and animations
import inquirer from "inquirer";
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
// WordCounter class to handle the word counting application
class WordCounter {
    // Method to stop animations after a specified duration
    stopAnimations(animation, duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                animation.stop();
                resolve();
            }, duration * 1000);
        });
    }
    // Method to display the welcome screen with an animated box
    async welcomeScreen() {
        // Creating a neon animated box with a welcome message
        const startingAnimation = chalkAnimation.neon(boxen(`
       ┓ ┏     ┓  ┏┓           
       ┃┃┃┏┓┏┓┏┫  ┃ ┏┓┓┏┏┓╋┏┓┏┓
       ┗┻┛┗┛┛ ┗┻  ┗┛┗┛┗┻┛┗┗┗ ┛        
        `, {
            title: "Word Counter Project",
            titleAlignment: "center",
            borderStyle: "classic",
            borderColor: "magenta",
        }));
        // Stopping the animation after 3 seconds and moving to the next step
        await this.stopAnimations(startingAnimation, 3);
        await this.getUserInput();
    }
    // Method for ending animation and thanking the user
    async endingAnimation() {
        // Creating a neon animated box with a thank you message
        const endingAnimation = chalkAnimation.neon(boxen(`Thank You For Using Our WORD COUNTER!`, {
            title: "Developed By Mubeen Mehmood",
            titleAlignment: "center",
            borderStyle: "classic",
            padding: 0.5,
            borderColor: "magenta",
        }));
        // Stopping the animation after 3 seconds
        await this.stopAnimations(endingAnimation, 3);
    }
    // Private method to get user input for the paragraph
    async getUserInput() {
        const userInput = await inquirer.prompt([
            {
                name: "userParagraph",
                type: "input",
                message: "Enter your paragraph: ",
                validate: (input) => {
                    if (input.trim() === "") {
                        return "Please enter a non-empty paragraph.";
                    }
                    return true;
                },
            },
        ]);
        // Counting words based on user input
        this.countWords(userInput.userParagraph);
    }
    // Private method to count words and ask the user if they want to try again
    async countWords(userParagraph) {
        // Choices for the user to try again or end the program
        const userChoices = ["Yes", "No"];
        let paragraphList = userParagraph.trim().split(" ");
        let wordCounter = paragraphList.length;
        console.log(`Total Words Are: ${wordCounter}`);
        // Asking the user if they want to try again
        const userInput = await inquirer.prompt([
            {
                type: "list",
                name: "userDecision",
                message: "Do you want to try again?",
                choices: userChoices,
            },
        ]);
        // If the user chooses to try again, get user input again; otherwise, end the program
        if (userInput.userDecision === userChoices[0]) {
            await this.getUserInput();
        }
        else {
            await this.endingAnimation();
        }
    }
}
// Creating an instance of the WordCounter class and starting the word counter application
const myWordCounter = new WordCounter();
myWordCounter.welcomeScreen();
