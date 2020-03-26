import { Diagnostics } from '@atweel/diagnostics';
import capabilities from 'capabilities';
import { ApplicationError } from 'components/ApplicationError';
import {
    inject,
    injectable,
} from 'inversify';
import 'reflect-metadata';

@injectable()
class Dependency {
    constructor(
        @inject(capabilities.DIAGNOSTICS)
        private readonly diagnostics: Diagnostics,
    ) {

    }

    public doWork(): void {
        this.diagnostics.notify('Doing work...');

        this.diagnostics.debug('This is a sample debug message.');

        this.diagnostics.abort(new ApplicationError());
    }
}

export {
    Dependency,
};
