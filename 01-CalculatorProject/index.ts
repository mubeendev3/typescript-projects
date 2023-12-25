#!/usr/bin/env node
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
class Calculator {
  async welcomeMessage() {
    let glitchAnimation = chalkAnimation.karaoke(
      `Hey! Get ready for some math magic with our calculator. xD 😅
                       _____________________
                      |  _________________  |
                      | | mubeendev3   0. | |
                      | |_________________| |
                      |  ___ ___ ___   ___  |
                      | | 7 | 8 | 9 | | + | |
          ----------> | |___|___|___| |___| | <----------
                      | | 4 | 5 | 6 | | - | |
                      | |___|___|___| |___| |
                      | | 1 | 2 | 3 | | x | |
                      | |___|___|___| |___| |
                      | | . | 0 | = | | / | |
                      | |___|___|___| |___| |
                      |_____________________|
      
             ______           __     __)                   
            (, /    )        (, /|  /|       /)            
              /---(            / | / |      (/_  _   _ __  
           ) / ____) (_/_   ) /  |/  |_(_(_/_) _(/__(/_/ (_ ... <3
          (_/ (     .-/    (_/   '                         
                   (_/                                     
      `
    );

    // Stop the animation after 5 seconds
    setTimeout(() => {
      glitchAnimation.stop();
      this.askQuestion();
    }, 4500);
  }
  addition(num1: number, num2: number): void {
    console.log(
      chalk.bgGreen.bold(` ---> ${num1} + ${num2} = ${num1 + num2} `)
    );
  }
  subtraction(num1: number, num2: number): void {
    console.log(
      chalk.bgGreen.bold(` ---> ${num1} - ${num2} = ${num1 - num2} `)
    );
  }
  multiplication(num1: number, num2: number): void {
    console.log(
      chalk.bgGreen.bold(` ---> ${num1} * ${num2} = ${num1 * num2} `)
    );
  }
  division(num1: number, num2: number): void {
    console.log(
      chalk.bgGreen.bold(` ---> ${num1} / ${num2} = ${num1 / num2} `)
    );
  }
  power(num1: number, num2: number): void {
    console.log(
      chalk.bgGreen.bold(` ---> ${num1} ^ ${num2} = ${num1 ** num2} `)
    );
  }

  async askQuestion(): Promise<void> {
    const choices = [
      "+ Addition",
      "- Subtraction",
      "* Multiplication",
      "/ Division",
      "^ Power",
      "> Exit",
    ];
    while (true) {
      const operator = await inquirer.prompt([
        {
          name: "selectedOperator",
          type: "list",
          message: chalk.green.underline(
            "\nWhich operation you want to perform?:\n"
          ),
          choices: [
            "+ Addition",
            "- Subtraction",
            "* Multiplication",
            "/ Division",
            "^ Power",
            "> Exit",
          ],
        },
      ]);
      if (operator.selectedOperator === choices[5]) {
        let endingAnimation = chalkAnimation.karaoke(
          `Thank you for using our Magical Calculator!`
        );

        // Stop the animation after 5 seconds
        setTimeout(() => {
          endingAnimation.stop();
        }, 4000);
        break;
      } else {
        const input = await inquirer.prompt([
          {
            type: "number",
            name: "number1",
            message: chalk.hex("#e0b609")("Enter the value for number 1: "),
          },
          {
            type: "number",
            name: "number2",
            message: chalk.hex("#e0b609")("Enter the value for number 2: "),
          },
        ]);
        if (
          !isNaN(parseFloat(input.number1)) &&
          !isNaN(parseFloat(input.number2))
        ) {
          // Transferring the flow according to selected operator

          switch (operator.selectedOperator) {
            case "+ Addition":
              this.addition(input.number1, input.number2);
              break;
            case "- Subtraction":
              this.subtraction(input.number1, input.number2);
              break;
            case "* Multiplication":
              this.multiplication(input.number1, input.number2);
              break;
            case "/ Division":
              this.division(input.number1, input.number2);
              break;
            case "^ Power":
              this.power(input.number1, input.number2);
              break;

            default:
              console.log("No Such Operator Found!");
              break;
          }
        } else {
          console.log(chalk.bgRed` Please enter a valid number `);
        }
      }
    }
  }
  async main() {
    await this.welcomeMessage();
  }
}

const myCalculator = new Calculator();
myCalculator.main();
