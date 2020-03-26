import { expect } from 'chai';
import 'mocha';
import { It, Mock } from 'typemoq';
import { Diagnostics } from '../conventions/Diagnostics';
import { SafeDiagnosticsProxy } from './SafeDiagnosticsProxy';

describe('SafeDiagnosticsProxy', () => {
    it (`Supresses the error thrown from the underlying diagnostics' 'notify' method.`, () => {
        const underlyingDiagnosticsMock = Mock.ofType<Diagnostics>();

        underlyingDiagnosticsMock
            .setup((d) => d.notify(It.isAny()))
            .throws(new Error());

        const diagnosticsProxy = new SafeDiagnosticsProxy(underlyingDiagnosticsMock.object);

        diagnosticsProxy.notify('dummy message');
    });

    it (`Supresses the error thrown from the underlying diagnostics' 'warn' method.`, () => {
        const underlyingDiagnosticsMock = Mock.ofType<Diagnostics>();

        underlyingDiagnosticsMock
            .setup((d) => d.warn(It.isAny()))
            .throws(new Error());

        const diagnosticsProxy = new SafeDiagnosticsProxy(underlyingDiagnosticsMock.object);

        diagnosticsProxy.warn('dummy message');
    });

    it (`Supresses the error thrown from the underlying diagnostics' 'debug' method.`, () => {
        const underlyingDiagnosticsMock = Mock.ofType<Diagnostics>();

        underlyingDiagnosticsMock
            .setup((d) => d.debug(It.isAny()))
            .throws(new Error());

        const diagnosticsProxy = new SafeDiagnosticsProxy(underlyingDiagnosticsMock.object);

        diagnosticsProxy.debug('dummy message');
    });

    it (`Does not suppress the error thrown from the underlying diagnostics' 'abort' method.`, () => {
        const underlyingDiagnosticsMock = Mock.ofType<Diagnostics>();

        underlyingDiagnosticsMock
            .setup((d) => d.abort(It.isAny()))
            .throws(new Error());

        const diagnosticsProxy = new SafeDiagnosticsProxy(underlyingDiagnosticsMock.object);

        expect(() => diagnosticsProxy.abort(new Error()))
            .to.throw(Error);
    });
});
