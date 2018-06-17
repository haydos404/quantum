# Quantum Universal Workflow Engine

> This is still very much a work in progress. API interfaces and project structure are likely to change without notice until v1.0.0.
>
> I'm also working on this in my free time and progress is likely to be slow.

The quantum workflow engine is a work in progress activity based workflow engine that aims to provide a modular, scalable framework for NodeJS.

We aim to do this by a few means:

- **Scalable** - Everything is stateless. When a workflow is executed elements are executed (asynchronously) sequentially giving us resource access safety and server throughput.
- **Modular by design** - Workflow elements of type are implemented by ['connectors'](##connectors). [Connectors](##connectors) are specific stateless units of work that may be hosted internally as a derived INativeConnector or externally as a type of IHTTPConnector. This allows people to define loose implementations means that we can scale to accommodate a number of language definitions.
- **Process Language Agnostic** - Quantum engine allows for [adaptor](##Adaptors) middleware to compile process definitions into the natively supported execution type, IDefinition. As an example quantum will provide a base BPMN 2.0 adaption middleware that will provide an example of this.

## Getting Started

We use `yarn` workspaces and `lerna` to help us with our build process.

To get started:

1.  Install yarn - `npm install -g yarn`
2.  Install all sub modules - `lerna bootstrap`
3.  Compile typescript - `lerna run build`
4.  Include core `quantum` package OR execute `quantum-rest` - `npm run start`

## Connectors

> Work in progress
>
> The design of connectors are still being heavily designed and are subject to change. We hope that we'll be able to define a fully dynamic number of adaptor types to help us scale for most infrastructures.

Connectors let use build the individual pieces of the workflow engine. We define what activities should be performed on each **type** of element. This is useful as it allows us to build the workflow engine bit by bit, easily allowing for extension and refactor.

There are two types of connectors currently

```typescript
interface INativeConnector
```

```typescript
interface IHTTPConnector
```

### Native

The native connector provides an execute action that will run on each **type** of `instance`. For example a BPMN UserTask will require a type of `BPMNUserTaskNativeConnector` that implements this interface.

### HTTP

This allows use to use external resources to implement the bits of our workflow engine. What is particularly exciting about this piece is we can define stateless functions (serverless functions), or utilise legacy code quite easily so long as they implement the interface correctly.

## Adaptors

> Work in progress
>
> The goals of the adaptor system and specific API are still being designed out.

Adaptors give us the ability to support new types of process definitions. For example a fully qualified workflow engine may support BPMN 2.0 or BPEL. To execute these in `quantum` this is a simple as defining an adaptor middleware for it to persist to the correct internal structure.

Alternatively if using a simple workflow structure (Such as an ITTT structure), you can define your own internal domain structure that makes sense in your system and provide an adaptor for execution.
