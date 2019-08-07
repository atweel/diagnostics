import { Capabilities as FrameworkCapabilities, Diagnostics } from '@stackeat/diagnostics-framework';
import {
    inject,
    injectable,
} from 'inversify';
import { ApplicationError } from './ApplicationError';

const Capabilities = {
    ...FrameworkCapabilities,
};

@injectable()
class Dependency {
    constructor(
        @inject(Capabilities.DIAGNOSTICS)
        private readonly diagnostics: Diagnostics,
    ) {

    }

    public doWork() {
        this.diagnostics.notify('Doing work...');

        this.diagnostics.debug('This is a sample debug message.');

        this.diagnostics.abort(new ApplicationError());
    }
}

export {
    Dependency,
};
