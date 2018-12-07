'use strict';

(function() {

	var Mocha = require('mocha');

	exports.runTests = function runTestFn(options, files) {

		var mocha = new Mocha(options);

		files.forEach(function(file){
			mocha.addFile(file);
		});

		mocha.run(function(failures){
			process.exitCode = failures ? -1 : 0;
		});

	};

})();