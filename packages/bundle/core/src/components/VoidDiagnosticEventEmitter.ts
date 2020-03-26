import { DiagnosticEventEmitter } from 'conventions/DiagnosticEventEmitter';
import { injectable } from 'inversify';

@injectable()
class VoidDiagnosticEventEmitter implements DiagnosticEventEmitter {
    // tslint:disable-next-line: no-empty
    public emitEvent(): void {

    }
}

export {
    VoidDiagnosticEventEmitter,
};
