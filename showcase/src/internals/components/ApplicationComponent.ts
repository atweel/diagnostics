import { Diagnostics } from '@atweel/diagnostics';
import capabilities from 'capabilities';
import { ApplicationException } from 'exceptions/ApplicationException';
import {
    inject,
    injectable,
} from 'inversify';
import 'reflect-metadata';

@injectable()
class ApplicationComponent {
    constructor(
        @inject(capabilities.DIAGNOSTICS)
        private readonly diagnostics: Diagnostics,
    ) {

    }

    public doWork(): void {
        this.diagnostics.notify('This is a sample notification message from ApplicationComponent.');

        this.diagnostics.debug('This is a sample debug message from ApplicationComponent.');

        this.diagnostics.abort(new ApplicationException());
    }
}

export {
    ApplicationComponent,
};
