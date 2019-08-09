import {
    DiagnosticEventEmitter,
} from '@stackeat/diagnostics';
import { injectable } from 'inversify';

@injectable()
class VoidEventLogEmitter implements DiagnosticEventEmitter {
    // tslint:disable-next-line: no-empty
    public emitEvent(): void {

    }
}

export {
    VoidEventLogEmitter,
};
