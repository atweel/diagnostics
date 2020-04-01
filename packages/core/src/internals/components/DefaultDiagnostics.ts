import { inject, injectable } from 'inversify';
import moment from 'moment';
import 'reflect-metadata';

import { UnknownException } from '@atweel/primitives';

import capabilities from 'capabilities';
import {
    DiagnosticEventEmitter,
    EventCategory,
} from 'conventions/DiagnosticEventEmitter';
import {
    Diagnostics,
    DefaultConstructibleError,
} from 'conventions/Diagnostics';

@injectable()
class DefaultDiagnostics implements Diagnostics {
    constructor(
        @inject(capabilities.DIAGNOSTIC_EVENT_EMITTER)
        private readonly eventEmitter: DiagnosticEventEmitter,
        @inject(capabilities.DIAGNOSTICS_ORIGIN)
        private readonly origin: string,
    ) {

    }

    public notify(message: string, tags?: string[], payload?: any): void {
        this.emitEvent(EventCategory.NOTIFICATION, message, tags, payload);
    }

    public warn(message: string, tags?: string[], payload?: any): void {
        this.emitEvent(EventCategory.WARNING, message, tags, payload);
    }

    public debug(message: string, tags?: string[], payload?: any): void {
        this.emitEvent(EventCategory.DEBUG, message, tags, payload);
    }

    public abort(): void;
    public abort(message: string): void;
    public abort(error: Error): void;
    public abort(errorConstructor: DefaultConstructibleError): void;
    public abort(arg?: string | Error | DefaultConstructibleError | undefined): void {
        const exception = typeof arg === 'function' ? 
            new arg() : arg instanceof Error ? 
                arg : typeof arg === 'string' ? 
                    new Error(arg) : new UnknownException();

        this.emitEvent(EventCategory.ERROR, exception.message);

        throw exception;
    }

    private emitEvent(category: EventCategory, message: string, tags?: string[], payload?: any): void {
        this.eventEmitter.emitEvent(moment(), category, message, this.origin, tags, payload);
    }
}

export {
    DefaultDiagnostics,
};
