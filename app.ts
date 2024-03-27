#! /usr/bin/env node
import promptSync from "prompt-sync";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

const prompt = promptSync();

let secretNum = Math.floor(Math.random() * 10) + 1;
let compNum;

let userNum;
// let tries = 5;
let guessedNums: number[] = [];
// console.log(secretNum);
let winner: string = "";
let total = 1;
let compScore = 0;
let UserScore = 0;
let again = true;

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

 chalkAnimation.pulse(`GUESS THE CORRECT NUMBER! (1-10)\n`);

await sleep();
// rainbow.stop();

while (again) {
  while (total <= 5) {
    do {
      console.log(`Used numbers => ${chalk.red.bold([...guessedNums])}`);

      game();

      if (userNum == secretNum || compNum == secretNum) {
        winner = secretNum == userNum ? "you" : "computer";
        // console.log(winner)
        winner === "you"
          ? chalkAnimation.neon(
              `${winner} win! secret number was ${secretNum}\n\n`
            ,2)
          : chalkAnimation.glitch(
            `${winner} win! secret number was ${secretNum}\n\n`
          )
        await sleep();
        winner == "you" ? UserScore++ : compScore++;
        let userScoreString = chalk.bgGreen.white.bold(
          `Player score: ${UserScore}`
        );
        let compScoreString = chalk.bgBlue.whiteBright.bold(
          `computer score: ${compScore}`
        );
        total++;
        if (total <= 5) {
          console.log(`ROUND ${total} of 5`);
        }
        console.log(`${userScoreString} || ${compScoreString}`);
        // console.log(`Player score: ${UserScore}) || computer score ${compScore}`);
        // tries = 5
        guessedNums.length = 0;
        secretNum = Math.floor(Math.random() * 10) + 1;
      }

      // tries--;
    } while (!winner);
  }
  if (UserScore > compScore) {
    chalkAnimation.neon(
      `Player WIN! ${UserScore}/5`
    );
  } else if (UserScore < compScore) {
    chalkAnimation.glitch(
      `Computer WIN! ${compScore}/5`
    );
  }
  await sleep()
  let askAgain = prompt("Play again ? (y/n)");

  if (askAgain === "y") {
    resetGame();
  } else {
    process.exit(0);
  }
}

if (!winner) {
  console.log(`you lose! secret number was ${secretNum}`);
  console.log("better luck next time!");
  // tries = 5
}

function resetGame() {
  total = 1;
  UserScore = 0;
  compScore = 0;
  winner = "";
  console.clear();
}

function game() {
  userNum = parseInt(prompt("Enter your number: (1-10):  "));
  guessedNums.push(userNum);
  compNum = Math.floor(Math.random() * 10) + 1;

  while (guessedNums.includes(compNum)) {
    compNum = Math.floor(Math.random() * 10) + 1;
    // console.log(compNum)
  }
  if (!guessedNums.includes(compNum)) {
    guessedNums.push(compNum);
  }

  // console.log(compNum)
  // console.log(guessedNums)
  console.log(
    `your Guessed = ${chalk.green.bold(
      userNum
    )} computer Guessed = ${chalk.blue.bold(compNum)}\n`
  );
}
