import inquirer from "inquirer";
// Utility function to introduce a delay
const sleep = () => new Promise((r) => setTimeout(r, 2000));
// Function to display customer information
export function DisplayInfo(customer) {
    console.log("--------------------------------------");
    console.log(`Name            : ${customer.name}`);
    console.log(`Age             : ${customer.age}`);
    console.log(`Contact Number  : ${customer.contactNumber}`);
    console.log(`UserID          : ${customer.userId}`);
    console.log(`Account Balance : RS: ${customer.bankAccount.accountBalance}`);
    console.log(`Account Number  : ${customer.bankAccount.accountNumber}`);
    console.log("--------------------------------------");
}
// Function to display customer account balance
export function ShowAccountBalance(customer) {
    console.log("--------------------------------------");
    console.log(`Account Balance : RS: ${customer.bankAccount.accountBalance}`);
    console.log("--------------------------------------");
}
// Function to handle crediting the customer account
export async function Credit(customer) {
    while (true) {
        // Prompt user for the credit amount
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep(); // Introduce a delay for a more user-friendly experience
        // Validate the entered amount
        if (!amount) {
            console.error(" Enter Correct Amount");
            continue;
        }
        // Perform credit operation and provide transaction feedback
        customer.bankAccount.Credit(amount);
        if (amount > 100) {
            console.log("Transaction Successful");
        }
        else {
            console.log("Transaction Successful And RS:1 Minus");
        }
        return;
    }
}
// Function to handle debiting the customer account
export async function Debit(customer) {
    while (true) {
        // Prompt user for the debit amount
        const { amount } = await inquirer.prompt([
            {
                name: "amount",
                message: "Enter Amount : ",
                type: "number",
            },
        ]);
        await sleep(); // Introduce a delay for a more user-friendly experience
        // Validate the entered amount
        if (!amount) {
            console.error(" Enter Correct Amount");
            continue;
        }
        // Check if the entered amount exceeds the account balance
        if (amount > customer.bankAccount.accountBalance) {
            console.error(" Amount is Greater than Your Balance");
            return;
        }
        // Perform debit operation and provide transaction feedback
        customer.bankAccount.Debit(amount);
        console.log("Transaction Successful");
        return;
    }
}
// Function to display the transaction history of the customer
export function TransactionHistory(customer) {
    if (!customer.bankAccount.transactionHistory.length) {
        console.log(" No Transaction Available");
        return;
    }
    // Display transaction history in a tabular format
    console.table(customer.bankAccount.transactionHistory.map((val) => {
        return { ...val, fee: `RS: ${val.fee}`, amount: `RS: ${val.amount}` };
    }));
}
