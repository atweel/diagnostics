import {
    Diagnostics,
} from '@atweel/diagnostics';
import capabilities from 'capabilities';
import { Application } from 'internals/Application';
import container from 'container';
import 'reflect-metadata';

console.clear();

//  This demonstrates how a diagnostic message looks like when Diagnostics is initialized
//  outside a named component.
container.get<Diagnostics>(capabilities.DIAGNOSTICS)
    .notify('Initializing...');

//  Since Application is the root of our component hierarchy, there is no way for us to set a name for it
//  other than by instantiating it from the container with 'getNamed'. Please note that diagnostic messages
//  in the console from Application are labeled with 'Application'.
container.getNamed<Application>(Application, 'Application')
    .execute();
