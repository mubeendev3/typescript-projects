// Importing the 'Person' class from the 'person.js' module
import { Person } from "./person.js";
// Defining a new class 'Student' that extends the 'Person' class
export class Student extends Person {
    // Private member to store the student's name
    _name;
    // Constructor to initialize the 'Student' object
    constructor() {
        // Calling the constructor of the base class ('Person')
        super();
        // Initializing the '_name' property to an empty string
        this._name = "";
    }
    // Getter for the 'Name' property to retrieve the student's name
    get Name() {
        return this._name;
    }
    // Setter for the 'Name' property to set the student's name
    set Name(name) {
        this._name = name;
    }
}
