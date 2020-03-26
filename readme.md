# Diagnostics package bundle for Node.js applications
A project by Atweel Inc.


## Overview

This package bundle introduces a common abstraction layer that software develpers can use to integrate various tools that provide diagnostic capabilities such as logging, exception reporting, etc. into their applications and components.

## Solution structure

This repository is organized as a [lerna](https://github.com/lerna/lerna) monorepo and includes three packages:
- @atweel/diagnostics (packages/core) contains definition of the `Diagnostics` interface and related concepts,
- @atweel/diagnostics-console (packages/extensions/console) provides a console-based implementation of the `Diagnostics` interface,
- @atweel/diagnostics-showcase (showcase) demonstrates an example of using console-based diagnostics in a sample application.

The project uses `@stackeat/extensibility` package to separate shared abstractions from implmentation and allow for more granular dependency management for consumers. The core module is provided in `@atweel/diagnostics` package and extension modules are located under packages/extensions.

For more information about individual packages within this solution, please refer to package-specific documentation:
- [@atweel/diagnostics](packages/core/readme.md)
- [@atweel/diagnostics-console](packages/extensions/console/readme.md)

## Contribution guidelines

### Getting started

You will need to have `lerna` installed as a global package to get started. After pulling the source code, run `lerna bootstrap` to install package dependencies and link packages within the repository. If everything works as expected, you'll be able to build packages and run the shocase application.

### Building the solution

To build all packages, simply run `yarn build`. Dependencies between packages within the repository are maintained through TypeScript project references and all packages in the repository are in turn referenced by packages.tsconfig.json. Running `yarn build` causes TypeScript compiler to build packages.tsconfig.json and all its dependencies in the correct order. If you want to run the compiler in watch mode, use the `yarn watch` command instead.

Please note, that we are using the compiler from the `ttypescript` package instead of the one that comes with the standard `typescript` package to apply code transformations during build.

### Running the showcase

To start the showcase, run `yarn showcase`. The showcase will run and will get restarted as the packages are rebuilt.

## License

Copyright 2020 Atweel Inc.
Copyright 2020 Eduard Malakhov

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contacts

Shall you have any questions or suggestions about this project, please address them to eduard@atweel.com. We'll be happy to hear from you.