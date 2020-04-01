import {
    DiagnosticEventEmitter,
    DiagnosticEventFormatter,
    EventCategory,
} from '@atweel/diagnostics';
import capabilities from 'capabilities';
import {
    inject,
    injectable,
} from 'inversify';
import { Moment } from 'moment';

type CategorySpecificWriterMap = {
    [category in EventCategory]: (message: string) => void;
};

@injectable()
class ConsoleDiagnosticEventEmitter implements DiagnosticEventEmitter {

    private readonly categorySpecificWriters: CategorySpecificWriterMap = {
        DEBUG: console.debug,
        ERROR: console.error,
        NOTIFICATION: console.log,
        WARNING: console.warn,
    };
    constructor(
        @inject(capabilities.DIAGNOSTIC_EVENT_FORMATTER)
        private readonly formatter: DiagnosticEventFormatter,
    ) {

    }
    public emitEvent(
        timestamp: Moment,
        category: EventCategory,
        message: string,
        origin?: string,
        tags?: string[],
        payload?: any): void {
        this.categorySpecificWriters[category](this.formatter(
            timestamp,
            category,
            message,
            origin,
            tags || [],
            payload,
        ));
    }
}

export {
    ConsoleDiagnosticEventEmitter,
};
