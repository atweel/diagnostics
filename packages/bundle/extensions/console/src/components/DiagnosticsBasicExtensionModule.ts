import { ExtensionModule } from '@stackeat/extensibility';
import capabilities from 'capabilities';
import { BasicDiagnostics } from 'components/BasicDiagnostics';
import { ContainerModule, interfaces } from 'inversify';

class DiagnosticsBasicExtensionModule implements ExtensionModule {

    private readonly containerModule = new ContainerModule(this.bindingsCallback.bind(this));
    public getContainerModules(): interfaces.ContainerModule[] {
        return [
            new ContainerModule(this.bindingsCallback.bind(this)),
        ];
    }

    public injectContainerModules(container: interfaces.Container): void {
        container.load(this.containerModule);
    }

    private grandGrandParentIsNamed(request: interfaces.Request): boolean {
        return !!request.parentRequest
            && !!request.parentRequest.parentRequest
            && request.parentRequest.parentRequest.target.isNamed();
    }

    private extractGrandGrandParentName(context: interfaces.Context): string {
        const namedTag = context.currentRequest.parentRequest
            && context.currentRequest.parentRequest.parentRequest
            && context.currentRequest.parentRequest.parentRequest.target.getNamedTag();

        return namedTag && namedTag.value;
    }

    private bindingsCallback(
        bind: interfaces.Bind,
        unbind: interfaces.Unbind,
        isBound: interfaces.IsBound,
        rebind: interfaces.Rebind): void {
        if (!isBound(capabilities.DIAGNOSTICS)) {
            bind(capabilities.DIAGNOSTICS)
                .to(BasicDiagnostics);
        }

        if (!isBound(capabilities.DIAGNOSTICS_ORIGIN)) {
            bind(capabilities.DIAGNOSTICS_ORIGIN)
                .toDynamicValue((context) => this.extractGrandGrandParentName(context))
                .when((request) => this.grandGrandParentIsNamed(request));

            bind(capabilities.DIAGNOSTICS_ORIGIN)
                .toConstantValue(undefined)
                .when((request) => !this.grandGrandParentIsNamed(request));
        }
    }
}

export {
    DiagnosticsBasicExtensionModule,
};
