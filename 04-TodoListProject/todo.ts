#!/usr/bin/env node
import boxen from "boxen";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";

class TodoApp {
  private todoItemsList: string[] = [];

  async sleep() {
    await new Promise((resolve) => {
      setTimeout(resolve, 3000);
    });
  }

  async welcomeScreen() {
    const startingAnimation = chalkAnimation.karaoke(
      boxen(
        `
  Welcome to our ⤹★ TODO App ★⤸  
            
      .------------------.
      |  [ 1 ] Add       |
      |  [ 2 ] View      |
      |  [ 3 ] Update    |
      |  [ 4 ] Delete    |
      |  [ 5 ] Exit      |
      '------------------'
`,
        {
          title: "TODO App Project",
          titleAlignment: "center",
          borderStyle: "classic",
          float: "left",
          //   borderColor: "magenta",
        }
      )
    );
    await this.sleep();
    startingAnimation.stop();
    this.main();
  }
  async endingScreen() {
    const endingAnimation = chalkAnimation.karaoke(
      `Thank You For Using Our Todo App!`
    );
    await this.sleep();
    endingAnimation.stop();
  }

  async addTask() {
    const userInput = await inquirer.prompt([
      {
        type: "input",
        name: "todoItem",
        message: "Add item in your TODO List: ",
      },
    ]);
    this.todoItemsList.push(userInput.todoItem);
    console.log("Task Added Successfully!");
  }

  async deleteTask() {
    const userInput = await inquirer.prompt([
      {
        type: "list",
        name: "todoItem",
        message: "Which Task You Wanted To Delete?",
        choices: this.todoItemsList,
      },
    ]);
    const deletedTaskIndex: number = this.todoItemsList.indexOf(
      userInput.todoItem
    );
    this.todoItemsList.splice(deletedTaskIndex, 1);
    console.log(`Task ${userInput.todoItem} Deleted Successfully!`);
  }
  async updateTask() {
    const userInput = await inquirer.prompt([
      {
        type: "list",
        name: "todoItem",
        message: "Choose Task You Wanted To Update",
        choices: this.todoItemsList,
      },
      {
        type: "input",
        name: "newTodoItem",
        message: "Enter Updated Task: ",
      },
    ]);
    const oldTaskIndex: number = this.todoItemsList.indexOf(userInput.todoItem);
    this.todoItemsList[oldTaskIndex] = userInput.newTodoItem;
    console.log(`Task Updated Successfully!`);
  }

  async main() {
    let breakLoop: boolean = true;
    const todoOperations: string[] = [
      "Add",
      "View",
      "Update",
      "Delete",
      "Exit",
    ];
    do {
      const userInput = await inquirer.prompt([
        {
          name: "choice",
          type: "list",
          message: "Which operation you want to perform?",
          choices: todoOperations,
        },
      ]);

      switch (userInput.choice) {
        case todoOperations[0]:
          await this.addTask();
          break;
        case todoOperations[1]:
          console.log(this.todoItemsList);
          break;
        case todoOperations[2]:
          await this.updateTask();
          break;
        case todoOperations[3]:
          if (this.todoItemsList.length === 0) {
            console.log(`Oops Nothing To Delete Add Something First`);
            continue;
          } else {
            await this.deleteTask();
          }
          break;
        case todoOperations[4]:
          await this.endingScreen();
          breakLoop = false;
          break;
      }
    } while (breakLoop);
  }
}

const todoApp = new TodoApp();
todoApp.welcomeScreen();
