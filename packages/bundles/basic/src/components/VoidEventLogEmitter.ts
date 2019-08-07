import {
    EventCategory,
    EventLogEmitter,
} from '@stackeat/diagnostics-framework';
import { injectable } from 'inversify';
import { Moment } from 'moment';

@injectable()
class VoidEventLogEmitter implements EventLogEmitter {
    public emitEvent(
        timestamp: Moment,
        category: EventCategory,
        message: string,
        origin?: string,
        tags?: string[],
        payload?: any): void {
        //
    }
}

export {
    VoidEventLogEmitter,
};
