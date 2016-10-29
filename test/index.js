const expect = require('chai').expect;
const path = require('path');

var ConfigGuardian = require('../index');

describe('ConfigGuardian', () => {
	const expectedStructure = {
		fl: 1.123,
		int: 1,
		char: 'a',
		str: 'abc',
		arr: [ '1', '2' ]
	};
	it('defaults projectRoot to caller function\'s directory', () => {
		expect(function() {
			const configGuardian = ConfigGuardian({
				refresh: true
			});
		}).to.throw();
	});
	it('works on a single file', () => {
		const configGuardian = ConfigGuardian({
			projectRoot: path.join(__dirname, '/data/1'),
			refresh: true
		});
		expect(configGuardian).to.eql(expectedStructure);
	});

	it('throws an error on duplicates', () => {
		expect(function() {
			const configGuardian = ConfigGuardian({
				projectRoot: path.join(__dirname, '/data/2'),
				refresh: true
			});
		}).to.throw();
	});

	it('collates configuration variables across a flat file hierarchy', () => {
		const configGuardian = ConfigGuardian({
			projectRoot: path.join(__dirname, '/data/3'),
			refresh: true
		});
		expect(configGuardian).to.eql(expectedStructure);
	});

	it('collates configuration variables recursively throughout all files', () => {
		const configGuardian = ConfigGuardian({
			projectRoot: path.join(__dirname, '/data/4'),
			refresh: true
		});
		expect(configGuardian).to.eql(expectedStructure);
	});

	it('can be instantiated with an ignore file list', () => {
		const configGuardian = ConfigGuardian({
			ignore: [
				'nope_modules',
				'exclude_me'
			],
			projectRoot: path.join(__dirname, '/data/5'),
			refresh: true
		});
		expect(configGuardian).to.eql(expectedStructure);
	});

	it('can be instantiated with a environments list', () => {
		const configGuardian = ConfigGuardian({
			projectRoot: path.join(__dirname, '/data/6'),
			environments: [ 'test', 'staging', 'prod' ],
			refresh: true
		});
		expect(configGuardian).to.eql({
			dbHost: { test: 'dbHost_test',                                                                       
				staging: 'dbHost_staging',                                                                 
				prod: 'dbHost_prod'
			}, dbPort: {
				test: 'dbPort_test',                                                                       
				staging: 'dbPort_staging',                                                                 
				prod: 'dbPort_prod'
			}, dbUser: { test: 'dbUser_test',                                                                       
				staging: 'dbUser_staging',                                                                 
				prod: 'dbUser_prod'
			}, dbPass: { test: 'dbPass_test',                                                                       
				staging: 'dbPass_staging',                                                                 
				prod: 'dbPass_prod'
			}, dbName: { test: 'dbName_test',                                                                       
				staging: 'dbName_staging',                                                                 
				prod: 'dbName_prod'
			}
		});
	});
});