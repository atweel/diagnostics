import {
    Capabilities as FrameworkCapabilities,
    Diagnostics,
    ErrorFactory,
    EventCategory,
    EventLogEmitter,
} from '@stackeat/diagnostics-framework';
import { inject, injectable } from 'inversify';
import moment from 'moment';

const Capabilities = {
    ...FrameworkCapabilities,
};

@injectable()
class BasicAnonymousOriginDiagnostics implements Diagnostics {
    constructor(
        @inject(Capabilities.EVENT_LOG_EMITTER)
        private readonly eventLogEmitter: EventLogEmitter,
    ) {

    }

    public notify(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.NOTIFICATION, message, undefined, tags, payload);
    }
    public warn(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.WARNING, message, undefined, tags, payload);
    }
    public debug(message: string, tags?: string[], payload?: any): void {
        this.eventLogEmitter.emitEvent(moment(), EventCategory.DEBUG, message, undefined, tags, payload);
    }
    public abort(error: Error | ErrorFactory): void {
        // this.eventLogger.logEvent(moment(), EventCategory.ERROR, message, undefined, tags, payload);
        throw error instanceof Error ? error : error();
    }
}

export {
    BasicAnonymousOriginDiagnostics,
};
