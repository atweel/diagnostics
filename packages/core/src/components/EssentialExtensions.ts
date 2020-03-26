import { ExtensionModule } from '@stackeat/extensibility';
import capabilities from 'capabilities';
import { UNSAFE_DIAGNOSTICS_TAG } from 'common';
import { interfaces } from 'inversify';
import { DiagnosticsDummy } from './DiagnosticsDummy';
import { SafeDiagnosticsProxy } from './SafeDiagnosticsProxy';

class EssentialExtensions implements ExtensionModule<{}, {}> {
    constructor(
        private readonly injectSafeProxy: boolean,
    ) {

    }
    public compileConfigurationApi(): {} {
        throw new Error('Method not implemented.');
    }

    public injectContainerModules(container: interfaces.Container): void {
        if (!container.isBound(capabilities.DIAGNOSTICS)) {
            container.bind(capabilities.DIAGNOSTICS)
                .to(DiagnosticsDummy);
        } else {
            if (this.injectSafeProxy) {
                container.applyMiddleware((next: interfaces.Next) => {
                    return (args: interfaces.NextArgs) => {
                        const nextContextInterceptor = args.contextInterceptor;

                        args.contextInterceptor = (contexts: interfaces.Context) => {
                            if (!contexts.currentRequest) {
                                // tslint:disable-next-line: no-console
                                console.log('dfsdfsd');
                            }

                            const result = nextContextInterceptor(contexts);

                            return result;
                        };

                        return next(args);

                        // if (args.serviceIdentifier === capabilities.DIAGNOSTICS && this.injectSafeProxy) {
                        //     return new SafeDiagnosticsProxy(next(args));
                        // } else {
                        //     return next(args);
                        // }
                    };
                });
            }
        }
    }
}

export {
    EssentialExtensions,
};