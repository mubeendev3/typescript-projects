import boxen from "boxen";
import chalk from "chalk";
import { clear } from "console";
import { differenceInMilliseconds } from "date-fns";
import inquirer from "inquirer";
class CountDownTimer {
    // Private property to store the end date provided by the user
    endDate = "";
    // Private method to calculate the time difference and display the countdown
    getTimeDifference() {
        // Static display text shown when countdown is active
        const displayText = "We will be right back soon!";
        // Get the current date and time
        const dateNow = new Date();
        // Calculate the time difference between the current date and the end date
        let difference = differenceInMilliseconds(this.endDate, dateNow);
        // If the difference is negative, the countdown has reached zero or has passed the end date
        if (difference < 0) {
            return;
        }
        else {
            // Convert milliseconds to days, hours, minutes, and seconds
            const seconds = Math.floor(difference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const remainingHours = Math.floor(hours % 24);
            const remainingMinutes = Math.floor(minutes % 60);
            const remainingSeconds = Math.floor(seconds % 60);
            // Create a dynamic countdown string with formatted colors
            const dynamicCountdown = ` ${chalk.magenta.bold(days)} Days | ${chalk.green.bold(remainingHours)} Hours | ${chalk.blue.bold(remainingMinutes)} Minutes | ${chalk.red.bold(remainingSeconds)} Seconds `;
            // Clear the console before each update
            clear();
            // Display the countdown within a box with title and styling
            console.log(boxen(`
${chalk.green.bold(displayText)}
${boxen(dynamicCountdown)}
      `, {
                title: "Countdown Timer Project",
                margin: 1,
                borderStyle: "double",
                borderColor: "magenta",
                padding: 1,
                titleAlignment: "center",
                textAlignment: "center",
            }));
        }
    }
    // Private method to start the countdown interval
    startCountDown() {
        setInterval(() => {
            this.getTimeDifference();
        }, 1000);
    }
    // Public method to get the countdown end date from the user
    async getCountdownDate() {
        // Prompt the user to enter the countdown ending date
        const userInput = await inquirer.prompt([
            {
                name: "userDate",
                type: "input",
                message: `Enter your Countdown Ending Date in this format --> ${chalk.bold.magenta(`1 February 2024 11:00:00 PM`)}: `,
            },
        ]);
        // Set the end date based on user input and start the countdown
        this.endDate = userInput.userDate;
        this.startCountDown();
    }
}
// Create an instance of CountDownTimer and start the countdown after getting user input
const myCountDown = new CountDownTimer();
myCountDown.getCountdownDate();
