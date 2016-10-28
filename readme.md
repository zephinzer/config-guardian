# Config Guardian

Recursively goes through all folders starting from the folder you called ConfigGuardian
from and includes all keys inside *.config.js files into ConfigGuardian.

Example usage:

` main.js
```
// ...
ConfigGuardian();
// ...
```

` some-module.config.js
```
module.exports = {
	key1: 1,
	key2: 1.123
};
```

` other-module.config.js
```
const config = require('config-guardian');
config.key1; // 1
```