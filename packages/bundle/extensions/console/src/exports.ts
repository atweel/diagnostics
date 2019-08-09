import { DiagnosticsBasicExtensionModule } from 'components/DiagnosticsBasicExtensionModule';

export * from 'components/VoidEventLogEmitter';
export * from 'components/ConsoleEventLogEmitter';
export { default as bindings } from 'bindings';
export default new DiagnosticsBasicExtensionModule();
