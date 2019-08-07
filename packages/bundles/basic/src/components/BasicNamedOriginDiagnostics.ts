import {
    Capabilities as FrameworkCapabilities,
    Diagnostics,
    ErrorFactory,
    EventCategory,
    EventLogEmitter,
} from '@stackeat/diagnostics-framework';
import { Container, interfaces } from 'inversify';
import moment from 'moment';

const Capabilities = {
    ...FrameworkCapabilities,
};

type BasicNamedOriginDiagnosticsFactory = (origin: string) => BasicNamedOriginDiagnostics;

function createBasicNamedOriginDiagnosticsFactory(context: interfaces.Context): BasicNamedOriginDiagnosticsFactory {
    return (origin: string) =>
        new BasicNamedOriginDiagnostics(origin, context.container.get<EventLogEmitter>(Capabilities.EVENT_LOG_EMITTER));
}

function createBasicNamedOriginDiagnostics(context: interfaces.Context): BasicNamedOriginDiagnostics {
    const namedTag = context.currentRequest.parentRequest
        && context.currentRequest.parentRequest.target.getNamedTag();
    const origin = namedTag ? namedTag.value : 'undefined';
    const eventLogEmitter = context.container.get<EventLogEmitter>(Capabilities.EVENT_LOG_EMITTER);

    return new BasicNamedOriginDiagnostics(origin, eventLogEmitter);
}

class BasicNamedOriginDiagnostics implements Diagnostics {
    constructor(
        private readonly origin: string,
        private readonly eventLogEmitter: EventLogEmitter,
    ) {

    }

    public notify(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.NOTIFICATION, message, this.origin, tags, payload);
    }
    public warn(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.WARNING, message, this.origin, tags, payload);
    }
    public debug(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.DEBUG, message, this.origin, tags, payload);
    }
    public abort(error: Error | ErrorFactory): void {
        const message = error instanceof Error
            ? error.message ? error.message : 'Undetermined error.'
            : error.toString();

        this.eventLogEmitter.emitEvent(moment(), EventCategory.ERROR, message, this.origin);

        throw error instanceof Error ? error : error();
    }
}

export {
    BasicNamedOriginDiagnostics,
    BasicNamedOriginDiagnosticsFactory,
    createBasicNamedOriginDiagnosticsFactory,
    createBasicNamedOriginDiagnostics,
};
