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
});