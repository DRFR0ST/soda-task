import prompt from 'prompt-sync';
import chalk from 'chalk';
import ora from 'ora';
import boxen from 'boxen';
import { ISoda } from './types';
import VendingMachine from "./vending_machine";
import { wait } from './utils';

const Prompt = prompt({ sigint: true });

(async function() {
    const vendingMachine = new VendingMachine();

    const printHelp = () => {

        console.log("\n")
        // TODO: Refactor to separate function, for readability.
        console.log(chalk.bgBlue(" Available commands "))
        console.log(chalk.bold("insert"), chalk.italic("[money]"), "- Money put into money slot")
        console.log(chalk.bold("order"), chalk.italic("[coke, sprite, fanta]"), "- Order from machines buttons")
        console.log(chalk.bold("sms order"), chalk.italic("[coke, sprite, fanta]"), "- Order sent by sms")
        console.log(chalk.bold("recall"), "- Gives money back")
        console.log(chalk.bold("help"), "- Prints this message")
    }

    // Print the help once, on start.
    printHelp();

    while(true) {
        console.log("\n")
        console.log(boxen(`Inserted money\n${chalk.redBright(vendingMachine.currentBalance)}`, { padding: 1, title: "Vending Machine State" }), "\n")

        const input = Prompt(">> ");
        console.clear(); 

        try {

            if(input.startsWith('order')) {
                const sodaName = input.split(' ')[1] as unknown as ISoda['name'];

                // A little extra effects ^^ for immersion
                const loader = ora(`Your can is being delivered...`).start();
                await wait(3500);
                console.clear();

                vendingMachine.buySoda(sodaName);

                loader.stop();
            } else if(input.startsWith('insert')) {
                const amount = parseInt(input.split(' ')[1]);
                
                vendingMachine.insertMoney(amount);
            } else if(input.startsWith("sms order")) {
                const sodaName = input.split(' ')[2] as unknown as ISoda['name'];

                const loader = ora(`Your can is being delivered...`).start();
                await wait(3500);
                console.clear();

                vendingMachine.getFreeSoda(sodaName);

                loader.stop();
            } else if(input.startsWith("recall")) {
                vendingMachine.recallMoney();
            } else if(input.startsWith('help')) {
                printHelp();
            } else {
                throw new Error("Invalid command");
            }
        } catch(err) {
            console.error(err);
        }
    }
})()