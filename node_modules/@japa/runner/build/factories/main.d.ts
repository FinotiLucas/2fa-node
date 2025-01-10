import { ReporterContract } from '../src/types.js';
import { RunnerFactory } from './runner.js';
/**
 * Create an instance of the runner factory
 */
export declare const runner: () => RunnerFactory;
export { createDummyTests } from './create_dummy_tests.js';
export declare const syncReporter: ReporterContract;
