import {
    Capabilities as FrameworkCapabilities,
    Diagnostics,
} from '@stackeat/diagnostics-framework';
import { Application } from 'components/Application';
import 'reflect-metadata';
import container from './container';

const Capabilities = {
    ...FrameworkCapabilities,
};

// tslint:disable-next-line: no-console
console.clear();

container.get<Diagnostics>(Capabilities.DIAGNOSTICS)
    .notify('Initializing...');

container.getNamed<Application>(Application, 'application')
    .execute();
