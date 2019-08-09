import { Moment } from 'moment';

enum EventCategory {
    NOTIFICATION = 'NOTIFICATION',
    WARNING = 'WARNING',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

/**
 * Emits a diagnostic event with the specified attributes.
 */
interface DiagnosticEventEmitter {
    /**
     * Emits a diagnostic event with the specified attributes.
     * @param timestamp Time when the event was registered.
     * @param category Event category (@see EventCategory).
     * @param message Event message.
     * @param origin Source of the event.
     * @param tags Optional array of tags associated with the event.
     * @param payload Optional object containing additional information about the event.
     */
    emitEvent(
        timestamp: Moment,
        category: EventCategory,
        message: string,
        origin?: string,
        tags?: string[],
        payload?: any): void;
}

export {
    DiagnosticEventEmitter,
    EventCategory,
};
