const ConfigGuardian = require('../../../index');
const EnvConfig = ConfigGuardian.EnvConfig;

module.exports = {
	dbHost: EnvConfig('dbHost_test', 'dbHost_staging', 'dbHost_prod'),
	dbPort: EnvConfig('dbPort_test', 'dbPort_staging', 'dbPort_prod'),
	dbUser: EnvConfig('dbUser_test', 'dbUser_staging', 'dbUser_prod'),
	dbPass: EnvConfig('dbPass_test', 'dbPass_staging', 'dbPass_prod'),
	dbName: EnvConfig('dbName_test', 'dbName_staging', 'dbName_prod')
};