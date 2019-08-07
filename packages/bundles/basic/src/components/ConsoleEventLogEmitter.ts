// tslint:disable: no-console

import {
    Capabilities as FrameworkCapabilities,
    EventCategory,
    EventLogEmitter,
    LogEventFormatter,
} from '@stackeat/diagnostics-framework';
import {
    inject,
    injectable,
} from 'inversify';
import { Moment } from 'moment';

type CategorySpecificWriterMap = {
    [category in EventCategory]: (message: string) => void;
};

const Capabilities = {
    ...FrameworkCapabilities,
};

@injectable()
class ConsoleEventLogEmitter implements EventLogEmitter {

    private readonly categorySpecificWriters: CategorySpecificWriterMap = {
        DEBUG: console.debug,
        ERROR: console.error,
        NOTIFICATION: console.log,
        WARNING: console.warn,
    };
    constructor(
        @inject(Capabilities.LOG_EVENT_FORMATTER)
        private readonly formatter: LogEventFormatter,
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
    ConsoleEventLogEmitter,
};
