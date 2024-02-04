import inquirer from "inquirer";

class AdventureGame {
  private sleep = () => new Promise((r) => setTimeout(r, 2000));

  private maxEnemyHealth = 75;
  private enemyAttackDamage = 50;
  private enemiesList = ["Skeleton", "Warrior", "Zombie", "Assassin"];

  private health = 100;
  private attackDamage = 50;
  private totalHealthPotions = 3;
  private healthPotionHealAmount = 30;
  private healthPotionDropChance = 50; // 50% chance

  // Function to display attack animation
  private attackAnimation = async (enemy: string) => {
    let stepsDone: string[] = [];
    let stepsLeft = ["_", "_", "_", "_", "_", "_", "_", "_"];
    console.log(`ATTACK:                                          `);
    const animation = setInterval(() => {
      process.stdout.clearLine(0);
      process.stdout.cursorTo(0);
      process.stdout.write(
        `___________/|You|*${stepsLeft.join("")}${enemy}*|\\${stepsDone.join(
          ""
        )}___________`
      );
      if (!stepsLeft.length) {
        process.stdout.write("\n");
        clearInterval(animation);
      }
      stepsLeft.pop();
      stepsDone.push("_");
    }, 300);
  };

  // Main game loop
  private async mainGameLoop() {
    let running = true;
    let isRunAway = false;

    while (running) {
      let enemy =
        this.enemiesList[Math.floor(Math.random() * this.enemiesList.length)];
      let enemyHealth = Math.ceil(Math.random() * this.maxEnemyHealth);
      console.log(
        `\n\n<<<<<<<<<<<<<<  ${`${enemy.trim()} Has Appeared`}  >>>>>>>>>>>>>>`
      );

      while (enemyHealth > 0) {
        console.log(`----------------------------`);
        console.log(`Your Health: ${this.health}`);
        console.log(`----------------------------`);
        console.log(`${enemy.trim()}'s Health: ${enemyHealth}`);
        console.log(`----------------------------`);
        const { choice } = await inquirer.prompt([
          {
            name: "choice",
            message: "What would you like to do?",
            type: "rawlist",
            choices: ["Attack", "Drink Health Potion", "Run"],
          },
        ]);

        if (choice === "Attack") {
          let damageDealt = Math.ceil(Math.random() * this.attackDamage);
          let damageTaken = Math.ceil(Math.random() * this.enemyAttackDamage);

          this.health -= damageTaken;
          enemyHealth -= damageDealt;

          await this.attackAnimation(enemy);

          console.log(
            `>>> You strike the ${enemy.trim()} for ${damageDealt} damage`
          );
          console.log(`>>> ${enemy.trim()} damaged you for ${damageTaken}`);

          if (this.health < 1) {
            break;
          }
        } else if (choice === "Drink Health Potion") {
          if (this.totalHealthPotions > 0) {
            await this.sleep();
            this.totalHealthPotions--;
            this.health += this.healthPotionHealAmount;
            console.log(
              `>>> You drink a health potion, healing yourself for ${this.healthPotionHealAmount}`
            );
            console.log(`>>> You now have ${this.health} Health`);
            console.log(
              `>>> You have ${this.totalHealthPotions} health potion left`
            );
          } else {
            console.log(
              `>>> You have 0 health potion. Defeat enemies to get a chance for one`
            );
          }
        } else {
          console.log(`>>> You run away from the ${enemy.trim()}`);
          isRunAway = true;
          break;
        }
        console.log(`\n`);
      }

      if (isRunAway) {
        isRunAway = false;
        continue;
      }

      if (this.health < 1 && enemyHealth < 1) {
        console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        console.log(`  ${enemy.trim()} dropped BOMB, You Both were killed`);
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        break;
      }

      if (this.health < 1) {
        console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        console.log(`  You were defeated by the ${enemy.trim()}`);
        console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
        break;
      }

      console.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
      console.log(`  ${enemy.trim()} was defeated !!!`);
      console.log(`  You have ${this.health} Health left `);

      if (Math.ceil(Math.random() * 100) < this.healthPotionDropChance) {
        this.totalHealthPotions++;
        console.log(`  The ${enemy.trim()} dropped a health potion `);
        console.log(`  You now have ${this.totalHealthPotions} health potions`);
      }
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);

      const { choice } = await inquirer.prompt([
        {
          name: "choice",
          message: "what would you like to do?",
          type: "rawlist",
          choices: ["Continue Fighting", "Exit"],
        },
      ]);

      if (choice === "Continue Fighting") {
        continue;
      }
      break;
    }

    console.log(
      `\n============================================================`
    );
    console.log(`                 Thanks For Playing !!!!!!!                 `);
    console.log(`============================================================`);
  }

  // Function to start the game
  public startGame() {
    console.log(` INSTRUCTIONS :`);
    console.log(`=) You can damage enemy UPTO ${this.attackDamage} Health`);
    console.log(
      `=) Enemy can damage you UPTO ${this.enemyAttackDamage} Health`
    );
    this.mainGameLoop();
  }
}

// Create an instance of AdventureGame and start the game
const adventureGame = new AdventureGame();
adventureGame.startGame();
