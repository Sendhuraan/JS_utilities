(function() {

	var assert = require('chai').assert;

	describe('Test', function() {

		describe('Test Submodule 1', function() {
			
			it('tests the output to tests', function() {
				var output = 'tests';

				assert.equal(output, 'tests');
			});
			
		});

		describe('Test Submodule 2', function() {

			it('tests the output to be 42', function() {
				var output = 42;

				assert.equal(output, 42);
			});
			
		});
		
	});

})();