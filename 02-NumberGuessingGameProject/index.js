#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
class NumberGuessingGame {
    targetNumber;
    constructor() {
        // Initialize the target number randomly using Math library
        this.targetNumber = Math.floor(Math.random() * 10) + 1;
    }
    // This method is used to stop the animations or add delay
    stopAnimation(animation, duration) {
        return new Promise((resolve) => {
            setTimeout(() => {
                animation.stop();
                resolve();
            }, duration * 1000);
        });
    }
    // This method is used to display starting of our game
    async greeting() {
        const animation = chalkAnimation.rainbow(`
Guess the secret number and conquer the game!
     ___________________________________
    | _____ |   | ___ | ___ ___ | |   | |
    | |   | |_| |__ | |_| __|____ | | | |
    | | | |_________|__ |______ |___|_| |
    | |_|   | _______ |______ |   | ____|
    | ___ | |____ | |x_____ | |_| |____ |
    |___|_|____ | |   ___ | |________ | |
    |   ________| | |__ | |______ | | | |
    | | | ________| | __|____ | | | __| |
    |_| |__ |   | __|__ | ____| | |_| __|
    |   ____| | |____ | |__ |   |__ |__ |
    | |_______|_______|___|___|___|_____|

    ______           __     __)                   
  (, /    )        (, /|  /|       /)            
    /---(            / | / |      (/_  _   _ __  
 ) / ____) (_/_   ) /  |/  |_(_(_/_) _(/__(/_/ (_ ... <3
(_/ (     .-/    (_/   '                         
         (_/                                     


        `);
        await this.stopAnimation(animation, 2);
        this.gameLogic();
    }
    // This method is used to restart the game
    async restartGame() {
        const restartGame = await inquirer.prompt([
            {
                name: "userDecision",
                type: "list",
                message: chalk.magenta.bold.underline("\nFeeling lucky for another try?"),
                choices: ["Yes", "No"],
            },
        ]);
        console.log("\n");
        if (restartGame.userDecision === "Yes") {
            this.gameLogic();
        }
        else {
            const endingAnimation = chalkAnimation.rainbow(`Good Bye! See you next time... :)`);
            await this.stopAnimation(endingAnimation, 3);
        }
    }
    // This is the main game logic
    async gameLogic() {
        let userLife = 5;
        while (true) {
            console.log(chalk.bgRed(` ${userLife} Lives Remaining! `));
            // Getting input from the user
            const userInput = await inquirer.prompt([
                {
                    name: "userNumber",
                    type: "number",
                    message: chalk.green.underline.bold("\nTime to guess! What's the number?"),
                },
            ]);
            // This variable is used to get the difference between the target value and the user guess
            const differece = Math.abs(this.targetNumber - userInput.userNumber);
            if (userLife !== 1) {
                if (differece === 0) {
                    console.log(chalk.bgMagenta.bold(" Congratulations! You guessed the correct number! "));
                    break;
                }
                else if (differece <= 2) {
                    console.log(chalk.yellow("You're too close! Keep going!"));
                    userLife--;
                }
                else {
                    userLife--;
                    console.log(chalk.yellow("You're far away. Try again!"));
                }
            }
            else {
                console.log(chalk.bgRed(`Awww! Game Over`));
                break;
            }
        }
        this.restartGame();
    }
    async main() {
        this.greeting();
    }
}
// Creating an instance of the Class
const game = new NumberGuessingGame();
game.main();
