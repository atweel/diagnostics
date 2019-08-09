import { CoreModule } from '@stackeat/extensibility';

export * from './conventions/Diagnostics';
export * from './conventions/DiagnosticEventEmitter';
export * from './formatting';
export { default as Capabilities } from './capabilities';
export default new CoreModule();
