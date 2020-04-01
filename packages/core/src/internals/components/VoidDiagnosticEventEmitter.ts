import { DiagnosticEventEmitter } from 'conventions/DiagnosticEventEmitter';
import { injectable } from 'inversify';

@injectable()
class VoidDiagnosticEventEmitter implements DiagnosticEventEmitter {
    public emitEvent(): void {
        /** */
    }
}

export {
    VoidDiagnosticEventEmitter,
};
