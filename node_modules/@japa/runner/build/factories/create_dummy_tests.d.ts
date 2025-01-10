import { Suite, Emitter, Refiner } from '../modules/core/main.js';
/**
 * Returns an array of suites with dummy tests reproducting
 * different test behavior
 */
export declare function createDummyTests(emitter: Emitter, refiner: Refiner, file?: string): Suite[];
