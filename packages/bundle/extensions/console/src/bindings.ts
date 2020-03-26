import capabilities from 'capabilities';
import {
    ContainerModule,
    interfaces,
} from 'inversify';

function grandGrandParentIsNamed(request: interfaces.Request): boolean {
    return !!request.parentRequest
        && !!request.parentRequest.parentRequest
        && request.parentRequest.parentRequest.target.isNamed();
}

function extractGrandGrandParentName(context: interfaces.Context): string {
    const namedTag = context.currentRequest.parentRequest
        && context.currentRequest.parentRequest.parentRequest
        && context.currentRequest.parentRequest.parentRequest.target.getNamedTag();

    return namedTag && namedTag.value;
}

function bindingsCallback(
    bind: interfaces.Bind,
    unbind: interfaces.Unbind,
    isBound: interfaces.IsBound,
    rebind: interfaces.Rebind): void {
    // if (!isBound(capabilities.DIAGNOSTICS)) {
    //     bind(capabilities.DIAGNOSTICS)
    //         .to(DefaultDiagnostics);
    // }

    if (!isBound(capabilities.DIAGNOSTICS_ORIGIN)) {
        bind(capabilities.DIAGNOSTICS_ORIGIN)
            .toDynamicValue((context) => extractGrandGrandParentName(context))
            .when((request) => grandGrandParentIsNamed(request));

        bind(capabilities.DIAGNOSTICS_ORIGIN)
            .toConstantValue('anonymous')
            .when((request) => !grandGrandParentIsNamed(request));
    }
}

export default new ContainerModule(bindingsCallback);
