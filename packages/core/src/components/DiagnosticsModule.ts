import { CoreModule } from '@stackeat/extensibility';
import capabilities from 'capabilities';
import { DefaultDiagnostics } from 'components/DefaultDiagnostics';
import { DiagnosticsDummy } from 'components/DiagnosticsDummy';
import { VoidDiagnosticEventEmitter } from 'components/VoidDiagnosticEventEmitter';
import {
    BuiltInDiagnosticEventFormatterMapping,
    BuiltInDiagnosticEventFormatters,
    DiagnosticEventFormatter,
} from 'formatting';
import { interfaces } from 'inversify';

interface DiagnosticsModuleConfigurationApi {
    useDefaultDiagnostics(): void;
    useBuiltInFormatter(formatterName: string): void;
    useCustomFormatter(formatter: DiagnosticEventFormatter): void;
}

interface DiagnosticsModuleExtensionApi {
    setGlobalDiagnostics(diagnostics: any): void;
    setEmitter(emitter: any): void;
}

class DiagnosticsModule extends CoreModule<DiagnosticsModuleExtensionApi, DiagnosticsModuleConfigurationApi> {

    private formatter: DiagnosticEventFormatter =
        BuiltInDiagnosticEventFormatterMapping[BuiltInDiagnosticEventFormatters.LONG_STRICT_TEXT];
    private diagnostics: interfaces.Newable<any> = DiagnosticsDummy;
    private emitter: interfaces.Newable<any> = VoidDiagnosticEventEmitter;

    protected inject(container: interfaces.Container): void {
        container
            .bind(capabilities.DIAGNOSTICS)
            .to(this.diagnostics);

        container
            .bind(capabilities.DIAGNOSTIC_EVENT_EMITTER)
            .to(this.emitter);

        container
            .bind(capabilities.DIAGNOSTIC_EVENT_FORMATTER)
            .toConstantValue(this.formatter);

        if (!container.isBound(capabilities.DIAGNOSTICS_ORIGIN)) {
            container.bind(capabilities.DIAGNOSTICS_ORIGIN)
                .toDynamicValue((context) => this.extractGrandGrandParentName(context))
                .when((request) => this.grandGrandParentIsNamed(request));

            container.bind(capabilities.DIAGNOSTICS_ORIGIN)
                .toConstantValue(undefined)
                .when((request) => !this.grandGrandParentIsNamed(request));
        }
    }
    protected compileExtensionApi(): DiagnosticsModuleExtensionApi {
        return {
            setGlobalDiagnostics: (diagnostics: any): void => {
                this.diagnostics = diagnostics;
            },
            setEmitter: (emitter: any): void => {
                this.emitter = emitter;
            },
        };
    }
    protected compileConfigurationApi(): DiagnosticsModuleConfigurationApi {
        return {
            useDefaultDiagnostics: (): void => {
                this.diagnostics = DefaultDiagnostics;
            },
            useBuiltInFormatter: (formatterName: string): void => {
                if (!BuiltInDiagnosticEventFormatterMapping[formatterName]) {
                    throw new Error();
                }

                this.formatter = BuiltInDiagnosticEventFormatterMapping[formatterName];
            },
            useCustomFormatter: (formatter: DiagnosticEventFormatter): void => {
                this.formatter = formatter;
            },
        };
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
}

export {
    DiagnosticsModule,
    DiagnosticsModuleExtensionApi,
    DiagnosticsModuleConfigurationApi,
};
