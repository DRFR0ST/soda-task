import prompt from 'prompt-sync';
import chalk from 'chalk';
import { ISoda } from './types';
import VendingMachine from "./vending_machine";

const Prompt = prompt();

(function() {
    const vendingMachine = new VendingMachine();

    const printHelp = () => {
        console.log("\n")
        console.log(chalk.bgBlue(" Available commands "))
        console.log(chalk.bold("insert"), chalk.italic("[money]"), "- Money put into money slot")
        console.log(chalk.bold("order"), chalk.italic("[coke, sprite, fanta]"), "- Order from machines buttons")
        console.log(chalk.bold("sms order"), chalk.italic("[coke, sprite, fanta]"), "- Order sent by sms")
        console.log(chalk.bold("recall"), "- Gives money back")
        console.log(chalk.bold("help"), "- Prints this message")
    }

    printHelp();

    while(true) {
        console.log("\n-------")
        console.log("Inserted money:", chalk.bold(vendingMachine.currentBalance));
        console.log("-------\n")


        var input = Prompt(">> ");
        console.clear();

        try {

            if(input.startsWith('order')) {
                const sodaName = input.split(' ')[1] as unknown as ISoda['name'];

                vendingMachine.buySoda(sodaName);
            } else if(input.startsWith('insert')) {
                const amount = parseInt(input.split(' ')[1]);
                
                vendingMachine.insertMoney(amount);
            } else if(input.startsWith("sms order")) {
                const sodaName = input.split(' ')[2] as unknown as ISoda['name'];

                vendingMachine.getFreeSoda(sodaName);
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