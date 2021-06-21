export const getBubbleSortAnimations = (array) => {
	const animations = [];
	if (array.length <= 1) return array;
	bubbleSort(array.slice(), animations);
	return animations;
};

const bubbleSort = (array, animations) => {
	for (let i = 0; i < array.length - 1; i++) {
		for (let j = 0; j < array.length - i - 1; j++) {
			// animations.push([ { compare: [ j, j + 1 ] } ]);
			animations.push({ compare: [ j, j + 1 ], swap: '' });
			animations.push({ compare: [ j, j + 1 ], swap: '' });
			if (array[j] > array[j + 1]) {
				animations.push({ compare: '', swap: [ j, j + 1 ] });
				[ array[j], array[j + 1] ] = [ array[j + 1], array[j] ];
				// animations.push([ { swap: [ j, j + 1 ] } ]);
			}
		}
	}
};
