/**
 * Waits for X ms before resolving.
 */
export const wait = async (ms: number) => await new Promise(resolve => setTimeout(resolve, ms));