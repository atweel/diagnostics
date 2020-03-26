import capabilities from 'capabilities';
import { Diagnostics, ErrorFactory } from 'conventions/Diagnostics';
import unsafe from 'decorators/unsafe';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';

@injectable()
class SafeDiagnosticsProxy implements Diagnostics {
    constructor(
        @inject(capabilities.DIAGNOSTICS) @unsafe()
        private readonly target: Diagnostics,
    ) {

    }
    public notify(message: string, tags?: string[] | undefined, payload?: any): void {
        try {
            this.target.notify(message, tags, payload);
        } catch {
            //  Suppress all errors.
        }
    }
    public warn(message: string, tags?: string[] | undefined, payload?: any): void {
        try {
            this.target.warn(message, tags, payload);
        } catch {
            //  Suppress all errors.
        }
    }
    public debug(message: string, tags?: string[] | undefined, payload?: any): void {
        try {
            this.target.debug(message, tags, payload);
        } catch {
            //  Suppress all errors.
        }
    }
    public abort(error: Error | ErrorFactory): void {
        this.target.abort(error);
    }
}

export {
    SafeDiagnosticsProxy,
};
