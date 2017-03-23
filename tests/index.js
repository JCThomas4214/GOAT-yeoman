var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var JasmineReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.loadConfig({
	spec_dir: 'tests',
	spec_files: [
		'app.spec.js'
	]
});

jasmine.env.clearReporters();
jasmine.addReporter(new JasmineReporter());

jasmine.execute();