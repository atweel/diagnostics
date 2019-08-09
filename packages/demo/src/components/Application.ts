import {
    Diagnostics,
} from '@stackeat/diagnostics';
import capabilities from 'capabilities';
import { Dependency } from 'components/Dependency';
import { inject, injectable, named } from 'inversify';
import 'reflect-metadata';

@injectable()
class Application {
    constructor(
        @inject(Dependency) @named('Dependency')
        private readonly component: Dependency,
        @inject(capabilities.DIAGNOSTICS)
        private readonly diagnostics: Diagnostics,
    ) {

    }

    public execute() {
        this.diagnostics.notify('Starting the application...');

        try {
            this.component.doWork();
        } catch (error) {
            this.diagnostics.warn('The error was handled by catch clause.');
        }

        this.diagnostics.notify('The application will now exit...');
    }
}

export {
    Application,
};
