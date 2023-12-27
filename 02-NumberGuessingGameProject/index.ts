#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import boxen from "boxen";
import clear from "clear";

class NumberGuessingGame {
  private targetNumber: number;
  constructor() {
    // Initialize the target number randomly using Math library
    this.targetNumber = Math.floor(Math.random() * 10) + 1;
  }

  // This method is used to stop the animations
  stopAnimation(animation: any, duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        animation.stop();
        resolve();
      }, duration * 1000);
    });
  }
  // This method is used to display starting of our game
  async greeting() {
    const animation = chalkAnimation.rainbow(
      boxen(
        `
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
         (_/`,
        {
          title: "Number Guessing Game Project",
          titleAlignment: "center",
          borderStyle: "double",
          padding: 1,
          margin: 1,
        }
      )
    );
    await this.stopAnimation(animation, 2);
    this.gameLogic();
  }
  // This method is used to restart the game
  async restartGame() {
    const restartGame = await inquirer.prompt([
      {
        name: "userDecision",
        type: "list",
        message: chalk.magenta.bold.underline(
          "\nFeeling lucky for another try?"
        ),
        choices: [
          chalk.hex("#F38F17").bold("Yes, I can definitely do it this time."),
          chalk.hex("#F38F17").bold("No, I'll pass this time... :'("),
        ],
      },
    ]);
    if (restartGame.userDecision === "Yes") {
      this.gameLogic();
    } else {
      const endingAnimation = chalkAnimation.rainbow(
        `Good Bye! See you next time... :)`
      );
      await this.stopAnimation(endingAnimation, 3);
    }
  }
  // This is the main game logic
  async gameLogic() {
    let userLife: number = 5;
    while (true) {
      console.log(chalk.bgRed(` ${userLife} Lives Remaining! `));

      // Getting input from the user
      const userInput = await inquirer.prompt([
        {
          name: "userNumber",
          type: "number",
          message: chalk.green.underline.bold(
            "\nTime to guess! What's the number between 1-10?"
          ),
        },
      ]);

      /*
      This variable is used to get the difference between the target value and the user guess
      1. i.e differece = targetNumber - userNumber => 8 - 5 => 3 --> It means 3rd else it part will
      be executed (You're close! Keep going!)
      2. i.e differece = targetNumber - userNumber => 8 - 7 => 1 --> It means 2nd else if part will 
      be executed (Oof, so close! One number away from blowing my mind!)
      3. i.e differece = targetNumber - userNumber => 8 - 8 => 0 --> It means 1st if part will be
      executed (" Congratulations! You guessed the correct number! ")
      */
      const differece: number = Math.abs(
        this.targetNumber - userInput.userNumber
      );
      if (userLife !== 1) {
        if (differece === 0) {
          console.log(
            chalk.bgMagenta.bold(
              " Congratulations! You guessed the correct number! "
            )
          );
          break;
        } else if (differece < 2) {
          console.log(
            chalk.yellow.bold(
              "Oof, so close! One number away from blowing my mind!"
            )
          );
          userLife--;
        } else if (differece <= 2) {
          console.log(chalk.yellow("You're close! Keep going!"));
          userLife--;
        } else {
          userLife--;
          console.log(chalk.yellow("You're far away. Try again!"));
        }
      } else {
        console.log(chalk.bgRed(`Awww! Game Over`));
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
game.main();
