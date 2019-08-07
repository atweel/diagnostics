import {
    Capabilities as FrameworkCapabilities,
    Diagnostics,
} from '@stackeat/diagnostics-framework';
import { inject, injectable, named } from 'inversify';
import 'reflect-metadata';
import { ApplicationError } from './ApplicationError';
import { Dependency } from './Dependency';

const Capabilities = {
    ...FrameworkCapabilities,
};

@injectable()
class Application {
    constructor(
        @inject(Dependency) @named('dependency')
        private readonly component: Dependency,
        @inject(Capabilities.DIAGNOSTICS)
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
