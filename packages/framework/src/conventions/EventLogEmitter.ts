import { Moment } from 'moment';

enum EventCategory {
    NOTIFICATION = 'NOTIFICATION',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

interface EventLogEmitter {
    emitEvent(
        timestamp: Moment,
        category: EventCategory,
        message: string,
        origin?: string,
        tags?: string[],
        payload?: any): void;
}

export {
    EventLogEmitter,
    EventCategory,
};
