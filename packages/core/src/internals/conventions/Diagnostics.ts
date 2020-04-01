interface DefaultConstructibleError {
    new(): Error;
}

/**
 * Diagnostics interface declares methods for instrumenting your code with diagnostic messages and
 * handling failures.
 */
interface Diagnostics {
    /**
     * Reports progress in execution of the program. Is used for reconstructing execution path.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    notify(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports that the program has run into a potentially erroneous or dangerous situation.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    warn(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports current status of the program, typically at a high level of detail; used for debugging.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    debug(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports that the program has run into a non-recoverable error and aborts execution with the specified error.
     */
    abort(): void;
    abort(message: string): void;
    abort(error: Error): void;
    abort(errorConstructor: DefaultConstructibleError): void;
    abort(arg?: string | Error | DefaultConstructibleError | undefined): void;
}

export {
    Diagnostics,
    DefaultConstructibleError,
};
