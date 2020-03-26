# Diagnostics Core package by Atweel Inc.

## Overview

This package is part of the Diagnostics Bundle developed and maintained by Atweel Inc.. The package defines common abstractions for integrating diagnostic utilities into application software. By implementing these abstractions, diagnostic utility vendors and third parties allow for seamless integration of these tools into any software that uses interfaces defined in this package.

## Key concepts

In your code, you would interact with diagnostic components through the `Diagnostics` interface which is defined as follows.

```typescript
type ErrorFactory = () => Error;

type DefaultConstructibleError = new() => Error;

/**
 * Diagnostics interface declares methods for instrumenting your code with diagnostic messages and
 * handling failures.
 */
interface Diagnostics {
    /**
     * Reports progress in execution of the program. Is used for reconstructing execution path.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    notify(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports that the program has run into a potentially erroneous or dangerous situation.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    warn(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports current status of the program, typically at a high level of detail; used for debugging.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    debug(message: string, tags?: string[], payload?: any): void;
    /**
     * Reports that the program has run into a non-recoverable error and aborts execution with the specified error.
     * @param message The text message to output.
     * @param tags An array of tags to label the message.
     * @param payload An arbitrary object that contains additional information about the event.
     */
    abort(error: Error | ErrorFactory): void;
    // fail<TError extends DefaultConstructibleError>(): void;
}
```

Being a fundamental component that is heavily used across the codebase, deiagnostics must be extremely reliable. For all instances provided by InversifyJS container diagnostics specifically ensures that all exceptions shall such be thrown by the implementation (except for those that occur in the `abort` method) will be supressed. If you're using containers and prefer to disable this behaviour certain cases, apply the `@unsafe()` decorator to the respective dependency.

## Integrating diagnostic capabilities into your applications

If you want to use diagnostics in your application, here are the steps to follow.

1. Add `@atweel/diagnostics` as a dependency to your package(s). Please note, that this will only install client interfaces but not implementations.
2. Pick extension package(s) that serve(s) your needs like `@atweel/diagnostics-console` which provides console-based diagnostic and add it as dependency. We will use `@atweel/diagnostics-console` in this tutorial.
3. The recommended way to instantiate diagnostic components is through InversifyJS containers. If you do not want toypue  use InversifyJS, you can import and manually create instances of components of your choice from extension packages. To start with diagnostics and InversifyJS, you'll need to import the core module from `@atweel/diagnostics` and any extension moduled from extension packages that you've installed. Then, you need to load these extensions into the core and inject it into the container as demonstrated below.
   ```typescript
    import diagnostics, {
        BuiltInDiagnosticEventFormatters,
    } from '@atweel/diagnostics';
    import consoleDiagnostics from '@atweel/diagnostics-console';
    import { Container } from 'inversify';

    diagnostics.use(consoleDiagnostics);

    const container: Container = new Container();

    diagnostics.injectContainerModules(container);
   ```
4. Once diagnostic components are available from the container, consuming them in your code is straightforward. For example, if you want to instrument your class with diagnostics, you could do it like this.
   ```typescript
   @injectable()
    class SampleComponent {
        constructor(
            @inject(capabilities.DIAGNOSTICS)
            private readonly diagnostics: Diagnostics,
        ) {

        }

        public doWork() {
            this.diagnostics.notify('Doing work...');

            this.diagnostics.debug('This is a sample debug message.');

            this.diagnostics.abort(new ApplicationError());
        }
    }
   ```
5. 
## Providing support for additional diagnostic tools

[TBD]

## Contacts
Shall you have any questions or suggestions about this package, please forward them to eduard@atweel.com. We'll be happy to hear from you.