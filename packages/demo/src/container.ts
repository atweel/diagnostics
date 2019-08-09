import diagnostics, {
    BuiltInLogEventFormatters,
} from '@stackeat/diagnostics';
import consoleDiagnostics, {
    ConsoleEventLogEmitter,
} from '@stackeat/diagnostics-console';
import capabilities from 'capabilities';
import { Application } from 'components/Application';
import { Dependency } from 'components/Dependency';
import { Container } from 'inversify';

diagnostics.use(consoleDiagnostics);

const container: Container = new Container();

container.bind(Application)
    .toSelf();

container.bind(Dependency)
    .toSelf();

container.bind(capabilities.DIAGNOSTIC_EVENT_EMITTER)
    .to(ConsoleEventLogEmitter);

container.bind(capabilities.DIAGNOSTIC_EVENT_FORMATTER)
    .toConstantValue(BuiltInLogEventFormatters.LONG_FLEXIBLE_TEXT);

diagnostics.injectContainerModules(container);

export default container;
