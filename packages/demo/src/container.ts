import {
    BasicAnonymousOriginDiagnostics,
    ConsoleEventLogEmitter,
    createBasicNamedOriginDiagnostics,
} from '@stackeat/diagnostics-basic-bundle';
import {
    BuiltInLogEventFormatters,
    Capabilities as FrameworkCapabilities,
    Diagnostics,
} from '@stackeat/diagnostics-framework';
import { Application } from 'components/Application';
import { Dependency } from 'components/Dependency';
import { Container } from 'inversify';

const Capabilities = {
    ...FrameworkCapabilities,
};

const container: Container = new Container();

container.bind(Application)
    .toSelf();

container.bind(Dependency)
    .toSelf();

container.bind<Diagnostics>(Capabilities.DIAGNOSTICS)
    .toDynamicValue(createBasicNamedOriginDiagnostics)
    .when((request) => !!request.parentRequest && request.parentRequest.target.isNamed());

container.bind(Capabilities.DIAGNOSTICS)
    .to(BasicAnonymousOriginDiagnostics)
    .when((request) => !request.parentRequest || !request.parentRequest.target.isNamed());

container.bind(Capabilities.EVENT_LOG_EMITTER)
    .to(ConsoleEventLogEmitter);

container.bind(Capabilities.LOG_EVENT_FORMATTER)
    .toConstantValue(BuiltInLogEventFormatters.LONG_STRICT_TEXT);

export default container;
