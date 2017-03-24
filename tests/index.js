var Jasmine = require('jasmine');
var jasmine = new Jasmine();
var JasmineReporter = require('jasmine-spec-reporter').SpecReporter;

jasmine.loadConfig({
	spec_dir: 'tests',
	spec_files: [
		'app.spec.js',
		'endpoint.spec.js',
		'module.spec.js',
		'submodule.spec.js',
		'store-item.spec.js',
		'actions.spec.js',
		'component.spec.js',
		'directive.spec.js',
		'service.spec.js',
		'pipe.spec.js'
	]
});

jasmine.env.clearReporters();
jasmine.addReporter(new JasmineReporter());

jasmine.execute();