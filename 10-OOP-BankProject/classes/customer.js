// Import the BankAccount class from the account module
import { BankAccount } from "./account.js";
// Define a Customer class to represent bank customers
export class Customer {
    // Properties of the Customer class
    name;
    userId;
    age;
    contactNumber;
    pin;
    bankAccount;
    // Constructor to initialize Customer object with provided information
    constructor(name, age, contactNumber, pin, userId) {
        // Assign values to properties based on constructor parameters
        this.name = name;
        this.age = age;
        this.contactNumber = contactNumber;
        this.pin = pin;
        this.userId = userId;
        // Create a new BankAccount object for the customer
        this.bankAccount = new BankAccount();
    }
}
