
type TSodaName = "Coke" | "Sprite" | "Fanta";

/**
 * Interface representing the properties of a soda.
 */
export interface ISoda {
    /** The name of the soda. */
    name: TSodaName;
    /** The amount of soda available.  */
    amount: number;
    /** The price of a single soda. */
    price: number;
}