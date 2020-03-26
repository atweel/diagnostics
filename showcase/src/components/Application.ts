import { inject, injectable, named } from 'inversify';
import 'reflect-metadata';

import {
    Diagnostics,
} from '@atweel/diagnostics';

import capabilities from 'capabilities';
import { Dependency } from 'components/Dependency';

@injectable()
class Application {
    constructor(
        @inject(Dependency) @named('Dependency')
        private readonly dependency: Dependency,
        @inject(capabilities.DIAGNOSTICS)
        private readonly diagnostics: Diagnostics,
    ) {

    }

    public execute(): void {
        this.diagnostics.notify('Starting the application...');

        try {
            this.dependency.doWork();
        } catch (error) {
            this.diagnostics.warn('The error was handled by catch clause.');
        }

        this.diagnostics.notify('The application will now exit...');
    }
}

export {
    Application,
};
