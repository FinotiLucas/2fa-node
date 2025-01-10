import { ErrorsPrinter } from '@japa/errors-printer';
import { BaseReporter } from '../../modules/core/main.js';
/**
 * Prints annotations when executing tests within Github actions
 */
export declare class GithubReporter extends BaseReporter {
    /**
     * Performs string escape on annotation message as per
     * https://github.com/actions/toolkit/blob/f1d9b4b985e6f0f728b4b766db73498403fd5ca3/packages/core/src/command.ts#L80-L85
     */
    protected escapeMessage(value: string): string;
    /**
     * Performs string escape on annotation properties as per
     * https://github.com/actions/toolkit/blob/f1d9b4b985e6f0f728b4b766db73498403fd5ca3/packages/core/src/command.ts#L80-L85
     */
    protected escapeProperty(value: string): string;
    /**
     * Formats the message as per the Github annotations spec.
     * https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#setting-an-error-message
     */
    protected formatMessage({ command, properties, message, }: {
        command: string;
        properties: Record<string, string>;
        message: string;
    }): string;
    /**
     * Prints Github annotation for a given error
     */
    getErrorAnnotation(printer: ErrorsPrinter, error: {
        phase: string;
        title: string;
        error: Error;
    }): Promise<string | undefined>;
    end(): Promise<void>;
}
