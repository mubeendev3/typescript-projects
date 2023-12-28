#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import boxen from "boxen";
import clear from "clear";
class NumberGuessingGame {
    // This method generated the random number every time the game starts
    generateRandomNumber() {
        const randomNumber = Math.floor(Math.random() * 10) + 1;
        return randomNumber;
    }
    // This method is used to stop the animations
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
        const animation = chalkAnimation.rainbow(boxen(`
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
         (_/`, {
            title: "Number Guessing Game Project",
            titleAlignment: "center",
            borderStyle: "double",
            padding: 1,
            margin: 1,
        }));
        await this.stopAnimation(animation, 3);
        this.gameLogic();
    }
    // This method is used to restart the game
    async restartGame() {
        const endingChoices = [
            "Yes, I can definitely do it this time.",
            "No, I'm done :'(",
        ];
        const restartGame = await inquirer.prompt([
            {
                name: "userDecision",
                type: "list",
                message: chalk
                    .hex("#F77F00")
                    .underline.bold("\nFeeling lucky for another try?"),
                choices: endingChoices,
            },
        ]);
        if (restartGame.userDecision === endingChoices[0]) {
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
        const targetNumber = this.generateRandomNumber();
        while (true) {
            if (userLife !== 0) {
                console.log(chalk.bgRed(` ${userLife} Lives Remaining! `));
                // Getting input from the user
                const userInput = await inquirer.prompt([
                    {
                        name: "userNumber",
                        type: "number",
                        message: chalk.green.underline.bold(`\nTime to guess! What's the number between 1-10?`),
                    },
                ]);
                if (!isNaN(userInput.userNumber)) {
                    /*
                  This variable is used to get the difference between the target value and the user guess
                  1. i.e differece = targetNumber - userNumber => 8 - 5 => 3 --> It means 3rd else it part will
                  be executed (You're close! Keep going!)
                  2. i.e differece = targetNumber - userNumber => 8 - 7 => 1 --> It means 2nd else if part will
                  be executed (Oof, so close! One number away from blowing my mind!)
                  3. i.e differece = targetNumber - userNumber => 8 - 8 => 0 --> It means 1st if part will be
                  executed (" Congratulations! You guessed the correct number! ")
                  */
                    const differece = Math.abs(targetNumber - userInput.userNumber);
                    if (differece === 0) {
                        console.log(chalk.bgMagenta.bold(` Congratulations! You guessed the correct number! It was ${targetNumber} `));
                        break;
                    }
                    else if (differece < 2) {
                        console.log(chalk.blue.bold.italic("Oof, so close! One number away from blowing my mind!"));
                        userLife--;
                    }
                    else if (differece <= 2) {
                        console.log(chalk.blue.bold("You're close! Keep going!"));
                        userLife--;
                    }
                    else {
                        userLife--;
                        console.log(chalk.blue.bold("You're far away. Try again!"));
                    }
                }
                else {
                    console.log(chalk.red.bold(`Please Enter a Valid Number`));
                }
            }
            else {
                console.log(chalk.bgRed(` Awww! Game Over... The number was ${targetNumber} `));
                break;
            }
        }
        this.restartGame();
    }
    async main() {
        // This method is used to clear the terminal before starting the main execution
        clear();
        this.greeting();
    }
}
// Creating an instance of the Class
const game = new NumberGuessingGame();
// Calling the main method
game.main();
