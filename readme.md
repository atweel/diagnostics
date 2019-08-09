# Diagnostics package bundle by Stackeat Company

## Overview

This package bundle introduces a common abstraction layer that software develpers can use to integrate various tools that provide diagnostic capabilities such as logging, exception reporting, etc. into their applications and components.

## Solution structure

This repository is organized as a [lerna](https://github.com/lerna/lerna) monorepo and includes three packages:
- @stackeat/diagnostics (packages/bundle/core) contains definition of the `Diagnostics` interface and related concepts,
- @stackeat/diagnostics-console (packages/bundle/extensions/console) provides a console-based implementation of the `Diagnostics` interface,
- @stackeat/diagnostics-demo (packages/demo) demonstrates an example of using console-based diagnostics in a sample application.

The project uses `@stackeat/extensibility` package to separate shared abstractions from implmentation and allow for more granular dependency management for consumers. The core module is provided in `@stackeat/diagnostics` package and extension modules are located under packages/bundle/extensions.

For more information about individual packages within this solution, please refer to package-specific documentation:
- [@stackeat/diagnostics](packages/bundle/core/readme.md)
- [@stackeat/diagnostics-console](packages/bundle/extensions/console/readme.md)

## Contribution guidelines

### Getting started

You will need to have `lerna` installed as a global package to get started. After pulling the source code, run `lerna bootstrap` to install package dependencies and link packages within the repository. If everything works as expected, you'll be able to build packages and run the demo.

### Building the solution

To build all packages, simply run `yarn build`. Dependencies between packages within the repository are maintained through TypeScript project references and all packages in the repository are in turn referenced by solution.tsconfig.json. Running `yarn build` causes TypeScript compiler to build solution.tsconfig.json and all its dependencies in the correct order. If you want to run the compiler in watch mode, use the `yarn watch` command instead.

Please note, that we are using the compiler from the `ttypescript` package instead of the one that comes with the standard `typescript` package to apply code transformations during build.

### Running the demo

To start the demo, run `yarn demo`. The demo will run and will get restarted as the packages are rebuilt.

## Contacts

If you've got any questions or suggestions about this project, please forward them to eduard@stackeat.com. Will be happy to hear from you.