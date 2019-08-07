type ErrorFactory = () => Error;

type DefaultConstructibleError = new() => Error;

interface Diagnostics {
    notify(message: string, tags?: string[], payload?: any): void;
    warn(message: string, tags?: string[], payload?: any): void;
    debug(message: string, tags?: string[], payload?: any): void;
    abort(error: Error | ErrorFactory): void;
    // fail<TError extends DefaultConstructibleError>(): void;
}

export {
    Diagnostics,
    ErrorFactory,
    DefaultConstructibleError,
};
