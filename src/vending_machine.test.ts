import VendingMachine from "./vending_machine";

const vendingMachine = new VendingMachine();

describe("Vending Machine", () => {
    test("should be valid class", () => {
        expect(vendingMachine).toBeInstanceOf(VendingMachine);
        expect(vendingMachine.currentBalance).toBe(0);
    })

    // TODO: Write better tests...
});