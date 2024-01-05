#!/usr/bin/env node
// Importing necessary modules
import boxen from "boxen";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import clear from "clear";

// Class representing an ATM Machine
class ATMMachine {
  private colorCode: string = "#FF00FF";

  // Method to stop animations after a specified duration
  stopAnimations(animation: any, duration: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        animation.stop();
        resolve();
      }, duration * 1000);
    });
  }

  // Method used to generate receipt
  async getUserDecision(message?: string): Promise<string> {
    const messageTitle: string =
      message === "restart"
        ? "Do You Want To Start Again? Type Y or N:"
        : "Do You Want To Generate Receipt? Type Y or N:";
    const userInput = await inquirer.prompt([
      {
        name: "userDecision",
        type: "input",
        message: chalk.green(messageTitle),
        validate: function (input) {
          const userInput: string = input;
          if (
            userInput.toLowerCase() === "y" ||
            userInput.toLowerCase() === "n"
          ) {
            return true;
          } else {
            chalk.red.bold(`Please Enter A Valid Letter 'Y' or 'N'`);
          }
        },
      },
    ]);
    return userInput.userDecision;
  }

  // Method to display the welcome screen with an animated box
  async welcomeScreen() {
    const startingAnimation = chalkAnimation.neon(
      boxen(
        `
    Welcome to our ATM!       
    .------------------.
    |  [ 1 ] Withdraw  |
    |  [ 2 ] Deposit   |
    |  [ 3 ] Balance   |
    |  [ 4 ] Transfer  |
    |  [ 5 ] Exit      |
    '------------------'
`,
        {
          title: "ATM Machine Project",
          titleAlignment: "center",
          borderStyle: "classic",
          padding: 1,
          borderColor: "magenta",
        }
      )
    );
    await this.stopAnimations(startingAnimation, 3);
    this.askUserDetails();
  }
  // Method to prompt the user for their details using Inquirer
  async askUserDetails() {
    const userDetails = await inquirer.prompt([
      {
        type: "input",
        name: "userName",
        message: "Enter Your Full Name:",
        validate: function (input) {
          // Validate that the name contains only letters
          if (isNaN(input)) {
            return true;
          } else {
            return `Name should only contain letters.`;
          }
        },
      },
    ]);
    const userPin: number = await this.askUserPin();

    await this.afterUserLoggedIn(userDetails.userName, userPin);
    this.restartProcess();
  }

  async askUserPin(previousPin?: number): Promise<number> {
    const userInput = await inquirer.prompt([
      {
        type: "password",
        name: "userPin",
        message: "Enter Your 4-Digits Pin Code:",
        mask: "*",
        validate: function (input) {
          const errorMessage: string = `Your PIN must be 4 digits long & Can Only Contain Numbers!`;
          // Validate that the PIN is a 4-digit number
          if (!isNaN(input) && input.length === 4) {
            if (previousPin) {
              return input === previousPin ? true : errorMessage;
            }
            return true;
          } else {
            return errorMessage;
          }
        },
      },
    ]);
    return userInput.userPin;
  }

  async handleTransaction(
    currentBalance: number,
    userName: string,
    transactionType: string
  ) {
    const transactionMessage: string =
      transactionType === "withdraw"
        ? "Please Enter The Amount You Want To Withdraw: $"
        : "Please Enter The Amount You Want To Deposit: $";

    const userInput = await inquirer.prompt([
      {
        type: "input",
        name: "amount",
        message: chalk.green(transactionMessage),
        validate: function (input) {
          if (
            (transactionType === "withdraw" &&
              input > 0 &&
              input <= currentBalance) ||
            (transactionType === "deposit" && input > 0)
          ) {
            return true;
          } else {
            return chalk.red.bold(
              transactionType === "withdraw"
                ? "Insufficient funds. Please enter a valid withdrawal amount."
                : "Please enter a valid deposit amount."
            );
          }
        },
      },
    ]);
    const receipt: string = await this.getUserDecision();
    if (receipt.toLowerCase() === "y") {
      const transactionAmount: number = Number.parseInt(userInput.amount);
      const newBalance: number =
        transactionType === "withdraw"
          ? currentBalance - transactionAmount
          : currentBalance + transactionAmount;
      const transactionTitle: string =
        transactionType === "withdraw"
          ? "Amount Withdrawn: "
          : "Deposit Amount: ";
      console.log(
        boxen(
          chalk.hex("#FF00FF")("Name: ") +
            chalk.green.bold(userName) +
            "\n" +
            chalk.hex("#FF00FF")(transactionTitle) +
            chalk.green.bold(`$${transactionAmount}`) +
            "\n" +
            chalk.hex("#FF00FF")("Remaining Balance: ") +
            chalk.green.bold(`$${newBalance}`),
          {
            title: "Receipt",
            borderColor: "magenta",
            borderStyle: "double",
            padding: 1,
            margin: 1,
          }
        )
      );
    }
  }

  // Method to withdraw money from the account
  async withdrawMoney(currentBalance: number, userName: string) {
    await this.handleTransaction(currentBalance, userName, "withdraw");
  }

  // Method to deposit money into the account
  async depositMoney(currentBalance: number, userName: string) {
    await this.handleTransaction(currentBalance, userName, "deposit");
  }

  // Method to check account information
  checkAccountInformation(currentBalance: number, userName: string) {
    console.log(
      boxen(
        chalk.hex("#FF00FF")("Name: ") +
          chalk.green.bold(userName) +
          "\n" +
          chalk.hex("#FF00FF")("Account ID: ") +
          chalk.green.bold("0x9243...") +
          "\n" +
          chalk.hex("#FF00FF")("Gender: ") +
          chalk.green.bold("Male") +
          "\n" +
          chalk.hex("#FF00FF")("Account Type: ") +
          chalk.green.bold("Current") +
          "\n" +
          chalk.hex("#FF00FF")("Total Balance: ") +
          chalk.green.bold(`$${currentBalance}`),
        {
          title: "Account Information",
          borderColor: "magenta",
          borderStyle: "double",
          padding: 1,
          margin: 1,
        }
      )
    );
  }

  // Method to transfer balance to another account
  async transferBalance(
    currentUserPin: number,
    currentBalance: number,
    userName: string
  ) {
    const userInput = await inquirer.prompt([
      {
        type: "input",
        name: "recipientAccount",
        message: chalk.green("Enter Recipient's Account Number: 0x2345... :"),
      },
      {
        type: "input",
        name: "amount",
        message: chalk.green("Please Enter amount you want to transfer: $"),
        validate: function (input) {
          const amount: number = Number.parseInt(input);
          if (amount !== 0 && amount <= currentBalance) {
            return true;
          } else {
            return chalk.red.bold(
              "Insufficient funds. Please enter a valid withdrawal amount."
            );
          }
        },
      },
    ]);
    await this.askUserPin(currentUserPin);
    const receipt: string = await this.getUserDecision();
    if (receipt.toLowerCase() === "y") {
      const transferAmount: number = userInput.amount;
      const remainingBalance: number = currentBalance - userInput.amount;
      console.log(
        boxen(
          chalk.hex("#FF00FF")("Name: ") +
            chalk.green.bold(userName) +
            "\n" +
            chalk.hex("#FF00FF")("Transfered To: ") +
            chalk.green.bold(userInput.recipientAccount) +
            "\n" +
            chalk.hex("#FF00FF")("Amount Transferred: ") +
            chalk.green.bold(`$${transferAmount}`) +
            "\n" +
            chalk.hex("#FF00FF")("Status: ") +
            chalk.green.bold(`Successful`) +
            "\n" +
            chalk.hex("#FF00FF")("Remaining Balance: ") +
            chalk.green.bold(`$${remainingBalance}`),
          {
            title: "Receipt",
            borderColor: "magenta",
            borderStyle: "double",
            padding: 1,
            margin: 1,
          }
        )
      );
    }
  }

  // Method to restart the ATM process
  async restartProcess(): Promise<void> {
    const userDecision: string = await this.getUserDecision("restart");
    if (userDecision.toLowerCase() === "y") {
      this.main();
    } else {
      this.endingAnimation();
    }
  }

  // Method for ending animation and thanking the user
  async endingAnimation(): Promise<void> {
    const endingAnimation = chalkAnimation.neon(
      boxen(`Thank You For Using Our ATM MACHINE!`, {
        title: "Developed By Mubeen Mehmood",
        titleAlignment: "center",
        borderStyle: "classic",
        padding: 0.5,
        borderColor: "magenta",
      })
    );
    await this.stopAnimations(endingAnimation, 3);
  }

  // Method to prompt user for ATM operations
  async askUserOperations(
    userBalance: number,
    userName: string,
    currentUserPin: number
  ) {
    const atmOperations: string[] = [
      "Withdraw Money",
      "Deposit Money",
      "Account Information",
      "Transfer Balance",
      "Exit",
    ];
    const userOperation = await inquirer.prompt([
      {
        type: "list",
        name: "operations",
        message: "Choose An Operation!",
        choices: atmOperations,
      },
    ]);
    switch (userOperation.operations) {
      case atmOperations[0]:
        await this.withdrawMoney(userBalance, userName);
        break;
      case atmOperations[1]:
        await this.depositMoney(userBalance, userName);
        break;
      case atmOperations[2]:
        this.checkAccountInformation(userBalance, userName);
        break;
      case atmOperations[3]:
        await this.transferBalance(currentUserPin, userBalance, userName);
        break;
      case atmOperations[4]:
        break;

      default:
        break;
    }
  }

  // Method called after user logs in, displaying welcome message and prompting for operations
  async afterUserLoggedIn(userName: string, userPin: number): Promise<void> {
    const userBalance: number = this.randomBalanceGenerator();
    clear();
    console.log(
      boxen(
        chalk.hex("#FF00FF")("Name: ") +
          chalk.green.bold(userName) +
          "\n" +
          chalk.hex("#FF00FF")("Balance: ") +
          chalk.green.bold(`$${userBalance}`),
        {
          title: "Welcome To ATM Machine",
          borderColor: "magenta",
          borderStyle: "double",
          padding: 1,
          margin: 1,
          titleAlignment: "center",
        }
      )
    );
    await this.askUserOperations(userBalance, userName, userPin);
  }

  // Method to generate a random account balance
  randomBalanceGenerator(): number {
    const randomBalance: number = Math.floor(Math.random() * 100000);
    return randomBalance;
  }

  // Main method to start the ATM application
  main() {
    clear();
    this.welcomeScreen();
  }
}

// Creating an instance of the ATMMachine class and running the welcome screen
const myATM = new ATMMachine();
myATM.main();
