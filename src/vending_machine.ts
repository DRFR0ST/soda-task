import Soda from "./soda";
import { ISoda } from "./types";

const frz = Object.freeze;

const initialInventory: readonly Soda[] = frz([
    new Soda("Coke", 5, 10.00),
    new Soda("Sprite", 3, 14.00),
    new Soda("Fanta", 3, 12.00),
]) 

/**
 * The Vending Machine
 * @description The vending machine is a class that handles the logic of a vending machine. It can be used to buy sodas or get them for free.
 */
class VendingMachine {
    private balance: number = 0;
    private inventory: Soda[];

    constructor() {
        this.inventory = [...initialInventory];
    }

    /**
     * @description Orders a soda from the vending machine.
     * @param name - Name of the soda to order
     */
    public buySoda(name: ISoda['name']) {
        const soda = this.getSodaByName(name);

        if(soda.price > this.balance) 
            throw new Error("Not enough money to buy soda.");

        if(soda.amount === 0)
            throw new Error(`${soda.name} is out of stock.`);

        soda.decrementAmount();
        this.balance -= soda.price;

        console.log(`You bought ${soda.name} for ${soda.price} and got ${this.balance} out in change.`);
        this.balance = 0;
    }

    /**
     * @description Gives out free soda from the vending machine.
     * @param name 
     */
    public getFreeSoda(name: ISoda['name']) {
        const soda = this.getSodaByName(name);

        soda.decrementAmount();
        console.log(`You got ${soda.name} for free.`);
    }

    /**
     * @description Adds money to the vending machine.
     * @param amount - Amount of money to add to the vending machine.
     */
    public insertMoney(amount: number) {
        if(amount <= 0) 
            throw new Error("Amount must be greater than 0.");

        this.balance += amount;
    } 

    /**
     * @description Returns the current balance put into the vending machine.
     */
    get currentBalance() {
        return this.balance;   
    }

    /**
     * @description Checks if the vending machine has a soda with the given name.
     * @param name - Name of the soda to check for.
     * @returns True if the vending machine has a soda with the given name, false otherwise.
     */
    public hasSoda(name: ISoda['name']) {
        return !!this.getSodaByName(name);
    }

    /**
     * @description Gets a soda from the vending machine by its name.
     * @param name - Name of the soda to get.
     * @returns The soda with the given name, or throws an error, if the vending machine does not have a soda with the given name.
     */
    private getSodaByName(name: ISoda['name']) {
        const soda = this.inventory.find(soda => soda.name.toLowerCase().trim() === name.toLowerCase().trim());

        if(!soda)
            throw new Error(`Soda with the name ${name} could not be found.`);
        
        return soda;
    }

    /**
     * @description Returns the current balance to the customer.
     */
    public recallMoney() {
        console.log(`Returning ${this.currentBalance} to customer.`)
        this.balance = 0;
    }
}

export default VendingMachine;