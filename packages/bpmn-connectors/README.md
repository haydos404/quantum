# node-typescript-starter

This is my simple baseline template for starting nodejs TypeScript projects. It includes:

* TypeScript
  * Sourcemaps
  * Typings
* Debuggable Mocha
* Test Coverage Reports
* TSLint and Prettier

## Installation

```text

git clone https://github.com/crazygravy89/node-typescript-starter.git <Your project name>

cd ./<Your project name>

npm i

```

Change the `package.json` to your settings

You're good to go.

## Usage

```text

npm run test - Runs all mocha tests with istanbul coverage report in terminal
npm run coverage - Runs all mocha tests with istanbul lcov coverage report in ./coverage
npm run test-debug - Runs all mocha tests in debug mode. Helpful for attaching the chrome tools profiler
npm run build - Builds Typescript source into Javascript and typings within a /lib file
npm run watch - Builds Typescript into Javascript on source code change within a /lib file
npm run start - Executes the generated javascript

```

Specific typescript settings (such as compiled target folder) can be set in `./tsconfig.json`.
