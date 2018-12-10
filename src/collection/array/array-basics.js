(function() {

	var assert = require('chai').assert;

	describe('Array', function() {
		
		it('Arrays can be created by using []. Example, var a = [1,2]');

		it('Array can also be created by using new Array(). Example, var a = new Array();');

		it('In constructor way, passing number parameter results in single element. While we may think that it creates first element as 42, In fact it creates 42 empty slots.', function() {
			var a = new Array(42);

			assert.equal(a.length, 42);
		});

		it('Array.length returns the number of elements in an Array.', function() {

			var a = [1,2];

			assert.equal(a.length, 2);

		});

	});
	
})();