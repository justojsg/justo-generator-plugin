[![Build Status](https://travis-ci.org/justojsg/justo-generator-plugin.svg?branch=master)](https://travis-ci.org/justojsg/justo-generator-plugin)

Generator for a `Justo.js` plugin.

*Proudly made with ♥ in Valencia, Spain, EU.*

## Install

```
npm install -g justo-generator-plugin
```

## Parameters

- `type`. Plugin type: `simple` or `composite`.
- `desc`. The plugin description.
- `homepage`. The plugin homepage.
- `author`. The author name.
- `authorEmail`. The author email.
- `authorUrl`. The author URL.
- `npmWho`. The NPM user to publish.

Example:

```
//simple
justo -g plugin
justo -g plugin type:simple

//composite
justo -g plugin type:composite
```
