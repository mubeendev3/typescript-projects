// Definition of the 'Person' class
export class Person {
  // Private member to store the personality of the person
  private _personality!: string;

  // Constructor to initialize a 'Person' object
  constructor() {
    // Setting the default personality to "Mystery"
    this._personality = "Mystery";
  }

  // Method to ask a question and determine the personality based on the answer
  askQuestion(answer: number) {
    // Checking the provided answer and updating the personality accordingly
    if (answer === 1) {
      this._personality = "Extrovert";
    } else if (answer === 2) {
      this._personality = "Introvert";
    } else {
      // Defaulting to "Mystery" if the answer is neither 1 nor 2
      this._personality = "Mystery";
    }
  }

  // Method to retrieve the current personality of the person
  getPersonality() {
    return this._personality;
  }
}
