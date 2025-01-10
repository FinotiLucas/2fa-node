import { ParsedError } from 'youch/types';
/**
 * ErrorsPrinter exposes the API to pretty print errors occurred during
 * tests executed via Japa.
 */
export declare class ErrorsPrinter {
    #private;
    constructor(options?: {
        stackLinesCount?: number;
        framesMaxLimit?: number;
    });
    /**
     * Prints a section with heading and borders around it
     */
    printSectionBorder(paging: string): void;
    /**
     * Prints section header with a centered title and
     * borders around it
     */
    printSectionHeader(title: string): void;
    /**
     * Parses an error to JSON
     */
    parseError(error: any): Promise<ParsedError | {
        message: string;
    }>;
    /**
     * Pretty print the error to the console
     */
    printError(error: any): Promise<void>;
    /**
     * Print summary errors
     */
    printErrors(errors: {
        title: string;
        phase: string;
        error: any;
    }[]): Promise<void>;
}
