import { DiagnosticsCoreModule } from 'internals/components/DiagnosticsCoreModule';

export * from './internals/conventions/Diagnostics';
export * from './internals/conventions/DiagnosticEventEmitter';
export * from './formatting';
export { default as Capabilities } from './capabilities';
export * from './common';
export { default as unsafe } from 'internals/decorators/unsafe';
export * from 'internals/components/DiagnosticsCoreModule';
export default new DiagnosticsCoreModule();
