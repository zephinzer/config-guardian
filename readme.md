# Config Guardian

Recursively goes through all folders starting from the folder you called ConfigGuardian
from and includes all keys inside *.config.js files into ConfigGuardian.

## Example usage

### main.js
```
// ...
ConfigGuardian({ /* :options */ });
// ...
```

### some-module.config.js
```
module.exports = {
	key1: 1,
	key2: 1.123
};
```

### other-module.js
```
const config = require('config-guardian');
config.key1; // 1
```

## Initialisation Options
Below is a complete list of all options.
```
projectRoot : String
 - defaults to the directory of the calling file.

environments : Array

refresh : Boolean
 - if this is set to true, ConfigGuardian will reconfigure itself regardless of current state

ignore : Array
 - a list of directory names that should not be processed during the recursive descent

```

## API

## ConfigGuardian()
The first time ConfigGuardian() is called, it initialises itself and does a recursive
descent through the folders starting from projectRoot, collating the exported properties
from files ending with `.config.js`, placing the keys into itself.

On second and subsequent calls, ConfigGuardian() returns an object with all the keys of
all files ending with `.config.js` for your use.

## ConfigGuardian.EnvConfig
EnvConfig is a structure you can use to define different values for different environments
depending on the `environments` options you passed into the intiial constructor. If the
`environments` options contains `'test', 'dev', 'stage', 'prod'`, calling 
`new EnvConfig('testValue', 'devValue', 'stageValue', 'prodValue')` will result in a
hash:
```
{
	test:  'testValue',
	dev:   'devValue',
	stage: 'stageValue',
	prod:  'prodValue'
}
```


## Changelog
### 1.2.0
Added `envs` option to specify events and create environment configs with
ConfigGuardian.EnvConfig();

### 1.1.0
Added `ignore` option to ignore certain file names so that `node_modules` does not
get included.

### 1.0.0
Initial release