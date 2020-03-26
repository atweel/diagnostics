import capabilities from 'capabilities';
import {
    DiagnosticEventEmitter,
    EventCategory,
} from 'conventions/DiagnosticEventEmitter';
import {
    Diagnostics,
    ErrorFactory,
} from 'conventions/Diagnostics';
import { inject, injectable } from 'inversify';
import moment from 'moment';
import 'reflect-metadata';

@injectable()
class DefaultDiagnostics implements Diagnostics {
    constructor(
        @inject(capabilities.DIAGNOSTICS_ORIGIN)
        private readonly origin: string,
        @inject(capabilities.DIAGNOSTIC_EVENT_EMITTER)
        private readonly eventLogEmitter: DiagnosticEventEmitter,
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
    public abort(error: Error | ErrorFactory): void {
        this.emitEvent(EventCategory.ERROR, this.extractErrorMessage(error));

        throw error instanceof Error
            ? error
            : error instanceof Function
                ? error()
                : new Error('Undetermined error.');
    }

    private emitEvent(category: EventCategory, message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), category, message, this.origin, tags, payload);
    }
    private extractErrorMessage(error: Error | ErrorFactory): string {
        return error instanceof Error
            ? error.message ? error.message : 'Undetermined error.'
            : error.toString();
    }
}

export {
    DefaultDiagnostics,
};
