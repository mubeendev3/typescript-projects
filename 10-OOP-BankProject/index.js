#!/usr/bin/env node
// Import necessary packages
import inquirer from "inquirer";
import { Customer } from "./classes/customer.js";
import { DisplayInfo, ShowAccountBalance, Credit, Debit, TransactionHistory, } from "./customerOptions.js";
// Utility function to introduce a delay
const sleep = () => new Promise((r) => setTimeout(r, 2000));
// Array to store customer data
let customers = [];
// Function to prompt the user for the main choice (Create New Account or Sign In)
async function Choice() {
    const { option } = await inquirer.prompt([
        {
            name: "option",
            message: "What Would You Like To Do ?",
            type: "list",
            choices: [
                { name: "Create New Account", value: "C" },
                { name: "Sign In", value: "S" },
            ],
        },
    ]);
    return option;
}
// Function to create a new customer account
async function CreateNewAccount() {
    // Enum defining input types for specific user information
    let Names;
    (function (Names) {
        Names["Name"] = "Name";
        Names["Age"] = "Age";
        Names["ContactNumber"] = "Contact Number";
        Names["Pin"] = "Pin";
        Names["UserID"] = "UserID";
    })(Names || (Names = {}));
    // Function to handle user input with validation
    async function Inputs(name, type) {
        while (true) {
            const { input } = await inquirer.prompt([
                {
                    name: "input",
                    message: `Enter Your ${name} : `,
                    type: type,
                },
            ]);
            // Validation for specific input types
            // (e.g., validating phone number format or unique UserID)
            if (!input) {
                continue;
            }
            if (name === Names.ContactNumber) {
                // Validate the phone number format
                let numRegex = /^(\+92|0|92)[0-9]{10}$/;
                if (!numRegex.test(input)) {
                    console.log(`  Use Pakistani Number`);
                    continue;
                }
            }
            if (name === Names.UserID) {
                // Check if the UserID is already taken
                let customer = customers.find((val) => val.userId === input);
                if (customer) {
                    console.log(`  This UserID Is Already Taken. Try a Different One.`);
                    continue;
                }
            }
            return input;
        }
    }
    // Prompt user for various account information
    let name = await Inputs(Names.Name, "string");
    let age = await Inputs(Names.Age, "number");
    let contactNumber = await Inputs(Names.ContactNumber, "string");
    let pin = await Inputs(Names.Pin, "number");
    let userId = await Inputs(Names.UserID, "string");
    // Create a new Customer instance and add it to the customers array
    let customer = new Customer(name, age, contactNumber, pin, userId);
    await sleep(); // Introduce a delay for a more user-friendly experience
    customers.push(customer);
    console.log(`Account Created Successfully`);
}
// Function to handle user sign-in process
async function SignIn() {
    // Prompt user for UserID and PIN
    const { userID, pin } = await inquirer.prompt([
        {
            name: "userID",
            message: "Enter Your UserID : ",
        },
        {
            name: "pin",
            message: "Enter Your Pin : ",
            type: "number",
        },
    ]);
    // Find the customer with the provided UserID
    let customer = customers.find((val) => val.userId === userID);
    if (!customer) {
        console.log(` No Customer With This UserID`);
        return;
    }
    else {
        // Check if the provided PIN matches the customer's PIN
        if (customer.pin !== pin) {
            console.log(` Incorrect PIN`);
            return;
        }
        console.log("Signed In Successfully");
        // User menu for various actions after signing in
        while (true) {
            const { userChoice, } = await inquirer.prompt([
                {
                    name: "userChoice",
                    message: "Make Your Choice",
                    type: "rawlist",
                    choices: [
                        "Show Profile",
                        "Debit",
                        "Credit",
                        "Account Balance",
                        "Transaction History",
                    ],
                },
            ]);
            // Perform actions based on user choice
            switch (userChoice) {
                case "Show Profile":
                    DisplayInfo(customer);
                    break;
                case "Account Balance":
                    ShowAccountBalance(customer);
                    break;
                case "Credit":
                    await Credit(customer);
                    break;
                case "Debit":
                    await Debit(customer);
                    break;
                case "Transaction History":
                    TransactionHistory(customer);
                    break;
                default:
                    break;
            }
            // Prompt user to perform another task or sign out
            const { choice } = await inquirer.prompt([
                {
                    name: "choice",
                    message: "Select One: ",
                    type: "list",
                    choices: ["Perform Another Task", "Sign Out"],
                },
            ]);
            if (choice === "Sign Out") {
                console.log(`\n------------------\n`);
                break;
            }
            else {
                console.log(`\n------------------\n`);
                continue;
            }
        }
    }
}
// Main function to manage the overall flow of the program
async function main() {
    while (true) {
        // Prompt user for the main choice (Create New Account or Sign In)
        let choice = await Choice();
        if (choice === "C") {
            await CreateNewAccount();
        }
        else if (choice === "S") {
            await SignIn();
        }
        // Prompt user to exit the program or continue
        const input = await inquirer.prompt([
            {
                name: "exit",
                message: `Do You Want To Exit?`,
                type: "confirm",
                default: false,
            },
        ]);
        if (input.exit) {
            break;
        }
        console.log("\n---------------------");
        console.log("---------------------\n");
    }
}
// Start the main function to run the program
main();
