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

### other-module.config.js
```
const config = require('config-guardian');
config.key1; // 1
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