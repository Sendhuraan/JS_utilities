(function() {

	var assert = require('chai').assert;

	describe('Operators', function() {

		describe('Addition (+)', function() {
			
			it('adds integer values', function() {
				var a = 5 + 5;

				assert.equal(10, a);
			});
			
			it('concatenates string values', function() {
				var a = 'Hi ' + 'there';
				
				assert.equal('Hi there', a);
			});

			it('when operated with boolean values, it interprets true as 1 and false as 0', function() {
				var a = true + 1;

				assert.equal(2, a);
			});

			it('concatenates number and string values', function() {
				var a = 2 + 'foo';

				assert.equal('2foo', a);
			});

			it('concatenates string and number values', function() {
				var a = 'foo' + 2;

				assert.equal('foo2', a);
			});
			
		});

		describe('Subtraction (-)', function() {

			it('subtracts two numbers', function() {
				var c = 10 - 5;

				assert.equal(5, c);
			});

			it('when operated on operands other than numbers, it returns NaN', function () {
				var a = 'foo' - 2;

				assert.equal(isNaN(a), true);
			});
			
		});
		
	});

})();