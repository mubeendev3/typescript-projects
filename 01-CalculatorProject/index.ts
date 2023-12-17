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
    }, 5000);
  }
  async addition(num1: number, num2: number): Promise<void> {
    console.log(`${num1} + ${num2} = ${num1 + num2}`);
  }
  async subtraction(num1: number, num2: number): Promise<void> {
    console.log(`${num1} - ${num2} = ${num1 - num2}`);
  }
  async multiplication(num1: number, num2: number): Promise<void> {
    console.log(`${num1} * ${num2} = ${num1 * num2}`);
  }
  async division(num1: number, num2: number): Promise<void> {
    console.log(`${num1} / ${num2} = ${num1 / num2}`);
  }
  async power(num1: number, num2: number): Promise<void> {
    console.log(`${num1} ^ ${num2} = ${num1 ** num2}`);
  }
  //   async getUserInput(): Promise<void> {
  //     let numbers = await inquirer.prompt([

  //     ]);
  //     const firstNumber: number = numbers.number1;
  //     const secondNumber: number = numbers.number2;
  //   }

  async askQuestion(): Promise<void> {
    const input = await inquirer.prompt([
      {
        name: "selectedOperator",
        type: "list",
        message: "Which operation you want to perform?:",
        choices: [
          "+ Addition",
          "- Subtraction",
          "* Multiplication",
          "/ Division",
          "^ Power",
        ],
      },
      {
        type: "number",
        name: "number1",
        message: "Enter the value for number 1: ",
      },
      {
        type: "number",
        name: "number2",
        message: "Enter the value for number 2: ",
      },
    ]);

    // Transferring the flow according to selected operator

    switch (input.selectedOperator) {
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
  }
  async main() {
    await this.welcomeMessage();
  }
}

const myCalculator: Calculator = new Calculator();
myCalculator.main();
