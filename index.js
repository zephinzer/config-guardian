const fs = require('fs');
const path = require('path');
const q = require('q');

function ConfigGuardianSync(_projectRoot, _options) {
	const projectRoot = _projectRoot;
	const options = _options || {};

	const fileExtension = options.extension || '.config.js';
	const configGuardianKeyName = options.keyName || 'config';
	const configuration = {};
	const currentDirectoryListing = fs.readdirSync(projectRoot);
	const ignoreList = options.ignore || [];

	currentDirectoryListing.forEach(function(filename) {
		const fullPath = path.join(projectRoot, filename);
		const thisPath = fs.lstatSync(fullPath);
		const isJavaScriptFile = (fullPath.lastIndexOf(fileExtension) === (fullPath.length - fileExtension.length));
		const notInIgnoreList = (ignoreList.indexOf(filename) === -1); 
		
		if(thisPath.isFile() && (isJavaScriptFile)) {
			const loadedModule = require(fullPath);
			if(loadedModule) {
				for(var key in loadedModule) {
					if(configuration[key]) { throw new Error('The configuration key `' + key + '` already exists.'); }
					configuration[key] = loadedModule[key];
				}
			}
		} else if(thisPath.isDirectory() && (notInIgnoreList)) {
			const downstreamConfiguration = ConfigGuardianSync(fullPath, _options);
			for(var key in downstreamConfiguration) {
				configuration[key] = downstreamConfiguration[key];
			}
		}
	});
	return configuration;
};

function ConfigGuardian(_options) {
	const options = _options || {};
	if(!ConfigGuardian.store || (_options.refresh === true)) {
		const callerPath = (new Error()).stack.split('\n')[2];
		const projectRoot = (options.projectRoot) ? options.projectRoot : callerPath.substr( callerPath.indexOf('(') + 1, callerPath.lastIndexOf('/') - callerPath.indexOf('(') );
		ConfigGuardian.envs = options.environments || [ 'test', 'development', 'staging', 'production' ];
		options.keyName = options.keyName || 'config';
		options.sync = (options.sync === undefined) ? true : options.sync;
		ConfigGuardian.store = ConfigGuardianSync(projectRoot, options);
	} 
	return ConfigGuardian.store 
};

ConfigGuardian.store = null;
ConfigGuardian.envs = [];

ConfigGuardian.EnvConfig = function() {
	const configValue = {};
	const args = arguments;
	var counter = 0;
	ConfigGuardian.envs.forEach(function(environment) {
		configValue[environment] = args[counter++]; 
	});
	return configValue;
};

module.exports = ConfigGuardian;