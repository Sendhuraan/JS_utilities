(function() {

	var assert = require('chai').assert;

	describe('Primitive Types', function() {
		
		it(`Classified into
			undefined 
			string 
			number 
			boolean 
			object 
			function 
			null
			`);

		it('has value types as opposed to what a variable can hold');

		it('when typeof operator used on a variable, returns the value type that the variable is currently holding');

		it('returns \'undefined\' when used typeof operator on variable that is not declared', function() {
			assert.equal('undefined', typeof anyVarThatIsNotDeclared);
		});

		it('returns \'undefined\' when used typeof operator on variable that is not defined', function() {
			var foo;

			assert.equal('undefined', typeof foo);
		});

		it('returns \'number\' when used typeof operator on number', function() {
			assert.equal('number', typeof 42);
		});

		it('returns \'string\' when used typeof operator on string', function() {
			assert.equal('string', typeof '42');
		});

		it('returns \'boolean\' when used typeof operator on boolean', function() {
			assert.equal('boolean', typeof true);
		});

		it('returns \'object\' when used typeof operator on object', function() {
			assert.equal('object', typeof { a: 1 });
		});

		it('returns \'function\' when used typeof operator on function', function() {
			assert.equal('function', typeof function(){});
		});

		it('returns \'object\' when used typeof operator on null, while we may expect that it should return \'null\'. This is a bug in javascript', function() {
			assert.equal('object', typeof null);
		});
		
	});
	
})();