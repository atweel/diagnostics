import { DiagnosticsModule } from 'components/DiagnosticsModule';

export * from './conventions/Diagnostics';
export * from './conventions/DiagnosticEventEmitter';
export * from './formatting';
export { default as Capabilities } from './capabilities';
export * from './common';
export { default as unsafe } from 'decorators/unsafe';
export * from 'components/DiagnosticsModule';
export default new DiagnosticsModule();
