import { ISoda } from "./types";

class Soda implements ISoda {
    name: ISoda['name'];
    amount: ISoda['amount'];
    price: ISoda['price'];

    constructor(name: ISoda['name'], amount: ISoda['amount'], price: ISoda['price']) {
        this.name = name;
        this.amount = amount;
        this.price = price;
    }

    /**
     * @description Decrements the amount of the soda.
     */
    public decrementAmount() {
        this.amount--;
    }
}

export default Soda;