# SCORM API Wrapper

![npm](https://img.shields.io/npm/v/scorm-promised.svg) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/scorm-promised.svg) ![NPM](https://img.shields.io/npm/l/scorm-promised.svg)


### Currently *WIP*

This simple SCORM API wrapper is designed to give developers a simple interface to the SCORM 1.4 API. This library is small and simple. It is tree shaking friendly. Only import the functions you are using.

## Installation

Install using npm and webpack/rollup etc.
```
npm install scorm-promised
```

Then functions can then be imported and used.
```js
import { init, get, set } from 'scorm-promised';
```

## Usage

### init

Before using the library you must initialise the module. This will find the SCORM API in the window and begin the session.

```js
import { init } from 'scorm-promised';

init().then(() => console.log('Init library'));
```

### set

```js
import { set } from 'scorm-promised';

set('cmi.suspend_data', 'example')
    .then(() => console.log('Value set'));
```

### get

```js
import { get } from 'scorm-promised';

get('cmi.suspend_data')
    .then(val => console.log(val));
```

### terminate

```js
import { terminate } from 'scorm-promised';

terminate().then(() => console.log('API Terminated'));
```

### getErrorCode

```js
import { getErrorCode } from 'scorm-promised';

getErrorCode().then(code => console.log(code));
```