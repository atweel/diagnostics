import diagnostics, {
    BuiltInDiagnosticEventFormatters,
} from '@atweel/diagnostics';
import consoleDiagnostics from '@atweel/diagnostics-console';
import { Application } from 'components/Application';
import { Dependency } from 'components/Dependency';
import { Container } from 'inversify';

const container: Container = new Container();

diagnostics
    .bundle(consoleDiagnostics)
    .configure((bundle) => {
        bundle
            .useDefaultDiagnostics()
            .useConsoleEmitter()
            .useBuiltInFormatter(BuiltInDiagnosticEventFormatters.LONG_FLEXIBLE_TEXT);
    })
    .injectInto(container);

container.bind(Application)
    .toSelf();

container.bind(Dependency)
    .toSelf();

export default container;
