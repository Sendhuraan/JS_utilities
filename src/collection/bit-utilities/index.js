(function() {

	function clearLowestSetBit(x) {
		return x & (x - 1);
	}

	function extractLowestSetBit(x) {
		return x & ~(x - 1);
	}

	function getLSB(x) {
		return x & 1;
	}

	function shiftBit(x, numOfBitsToShift) {
		return x >>> numOfBitsToShift;
	}

	function countSetBits__V__01(x) {
		var result = 0;

		while(x) {

			if(getLSB(x) === 1) {
				result++;
			}

			x = shiftBit(x, 1);
		}

		return result;
	}

	function countSetBits(x) {
		var result = 0;

		while(x) {
			x = clearLowestSetBit(x);
			result++;
		}

		return result;
	}

	var publicAPI = {
		clearLowestSetBit: clearLowestSetBit,
		extractLowestSetBit: extractLowestSetBit,
		getLSB: getLSB,
		shiftBit: shiftBit,
		countSetBits: countSetBits
	}

	module.exports = publicAPI;

})();