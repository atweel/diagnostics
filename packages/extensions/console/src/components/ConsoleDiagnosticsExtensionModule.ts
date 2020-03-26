import { DiagnosticsModuleExtensionApi } from '@atweel/diagnostics';
import { ExtensionModule  } from '@stackeat/extensibility';
import capabilities from 'capabilities';
import { ContainerModule, interfaces } from 'inversify';
import { ConsoleDiagnosticEventEmitter } from './ConsoleDiagnosticEventEmitter';

interface DiagnosticsBasicConfigurationApi {
    useConsoleEmitter(): void;
}

class ConsoleDiagnosticsExtensionModule
implements ExtensionModule<DiagnosticsModuleExtensionApi, DiagnosticsBasicConfigurationApi> {

    private readonly containerModule = new ContainerModule(this.bindingsCallback.bind(this));
    public compileConfigurationApi(extensionApi: DiagnosticsModuleExtensionApi): DiagnosticsBasicConfigurationApi {
        return {
            useConsoleEmitter: (): void => {
                extensionApi.setEmitter(ConsoleDiagnosticEventEmitter);
            },
        };
    }
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
        isBound: interfaces.IsBound,): void {
        // if (!isBound(capabilities.DIAGNOSTICS)) {
        //     bind(capabilities.DIAGNOSTICS)
        //         .to(DefaultDiagnostics);
        // }

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
    ConsoleDiagnosticsExtensionModule,
};
