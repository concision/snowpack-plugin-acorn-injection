<h1 align="center">
    Snowpack Plugin: Acorn Plugin Injection
</h1>

<p align="center">
    <a href="https://github.com/concision/snowpack-plugin-acorn-injection
/blob/master/LICENSE">
        <img alt="repository license" src="https://img.shields.io/github/license/concision/snowpack-plugin-acorn-injection?style=for-the-badge"/>
    </a>
    <a href="https://www.npmjs.com/package/snowpack-plugin-acorn-injection">
        <img alt="repository license" src="https://img.shields.io/npm/v/snowpack-plugin-acorn-injection?color=red&logo=npm&style=for-the-badge"/>
    </a>
    <a href="https://bundlephobia.com/result?p=snowpack-plugin-acorn-injection">
        <img alt="repository license" src="https://img.shields.io/bundlephobia/min/snowpack-plugin-acorn-injection?color=green&label=Size&logo=node.js&logoColor=green&style=for-the-badge"/>
    </a>
</p>

<p align="center">
    <i>A <a href="https://www.snowpack.dev/">Snowpack</a> plugin to inject <a href="https://github.com/acornjs/acorn">Acorn</a> plugins into <a href="https://rollupjs.org/guide/en/">Rollup</a>'s internal configuration.</i>
</p>


## Table of Contents
- [About](#about)
- [Usage](#usage)
  - [Installation](#installation)
  - [Plugin Options](#plugin-options)
  - [Configuration Example](#configuration-example)
- [License](#license)


## About
This project features a [Snowpack](https://www.snowpack.dev/) plugin that injects [Acorn](https://github.com/acornjs/acorn) plugins into Snowpack's internal [Rollup](https://rollupjs.org/guide/en/) configuration. This resolves various issues with lack of parser support when bundling a Snowpack project's dependencies.

This project was created as a solution for a StackOverflow post. Relevant topics:
- [StackOverflow Post](https://stackoverflow.com/q/64437657/14352161): *"JavaScript private class methods with Snowpack"*
- [Snowpack Discussion#1209](https://github.com/snowpackjs/snowpack/discussions/1209): *"Snowpack doesn't support private class method"*
- [Snowpack issue#1263](https://github.com/snowpackjs/snowpack/issues/1263): *"Snowpack doesn't seem to support private ('hashed') class methods"*


## Usage
This plugin needs to be installed as a Node.js development dependency and configured within a [Snowpack configuration](https://www.snowpack.dev/#config-files). Instructions are included below.

### Installation
Installing the plugin as a Node.js development dependency can be done with any of the following package managers:

- [npm](https://docs.npmjs.com/cli/npm):
  ```
  npm install --save-dev snowpack-plugin-acorn-injection
  ```
- [Yarn](https://yarnpkg.com/):
  ```
  yarn add --dev snowpack-plugin-acorn-injection
  ```

### Plugin Options

| Name      | Type       | Description                                         |
|-----------|------------|-----------------------------------------------------|
| `plugins` | `string[]` | Acorn plugin dependency names to resolve and inject |

> Note: Plugins stated in `plugins` must be resolvable through Node.js' `require(...)`.

### Configuration Example
The plugin can be configured with any of [Snowpack's configuration](https://www.snowpack.dev/#config-files) types.

For example, injecting [`acorn-stage3`](https://github.com/acornjs/acorn-stage3) can be done with the following example:
```json
{
  ...
  "plugins": [
    [
      "snowpack-plugin-acorn-injection",
      {
        "plugins": [
          "acorn-stage3"
        ]
      }
    ]
  ],
  ...
}
```

> **An Important Note**: Acorn plugins must be installed separately as development dependencies; this plugin has no transitive Acorn dependencies. In this example, [`acorn-stage3`](https://github.com/acornjs/acorn-stage3) is installed as a development dependency in the project.


## License
Licensed under [MIT license](https://choosealicense.com/licenses/mit/).
