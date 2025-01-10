import { Emitter, Runner } from '../main.js';
import type { TestEndNode, SuiteEndNode, GroupEndNode, TestStartNode, RunnerSummary, RunnerEndNode, GroupStartNode, SuiteStartNode, RunnerStartNode, BaseReporterOptions } from '../types.js';
/**
 * Base reporter to build custom reporters on top of
 */
export declare abstract class BaseReporter {
    runner?: Runner;
    /**
     * Path to the file for which the tests are getting executed
     */
    currentFileName?: string;
    /**
     * Suite for which the tests are getting executed
     */
    currentSuiteName?: string;
    /**
     * Group for which the tests are getting executed
     */
    currentGroupName?: string;
    protected options: BaseReporterOptions;
    constructor(options?: BaseReporterOptions);
    /**
     * Pretty prints the aggregates
     */
    protected printAggregates(summary: RunnerSummary): void;
    /**
     * Aggregates errors tree to a flat array
     */
    protected aggregateErrors(summary: RunnerSummary): {
        phase: string;
        title: string;
        error: Error;
    }[];
    /**
     * Pretty print errors
     */
    protected printErrors(summary: RunnerSummary): Promise<void>;
    /**
     * Handlers to capture events
     */
    protected onTestStart(_: TestStartNode): void;
    protected onTestEnd(_: TestEndNode): void;
    protected onGroupStart(_: GroupStartNode): void;
    protected onGroupEnd(_: GroupEndNode): void;
    protected onSuiteStart(_: SuiteStartNode): void;
    protected onSuiteEnd(_: SuiteEndNode): void;
    protected start(_: RunnerStartNode): Promise<void>;
    protected end(_: RunnerEndNode): Promise<void>;
    /**
     * Print tests summary
     */
    protected printSummary(summary: RunnerSummary): Promise<void>;
    /**
     * Invoked by the tests runner when tests are about to start
     */
    boot(runner: Runner, emitter: Emitter): void;
}
