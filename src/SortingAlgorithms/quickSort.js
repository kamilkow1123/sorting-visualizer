export const getQuickSortAnimations = (array) => {
	const animations = [];
	if (array.length <= 1) return array;
	quickSort(array, 0, array.length - 1, animations);
	return animations;
};

const quickSort = (array, l, r, animations) => {
	if (l < r) {
		let pi = partition(array, l, r, animations);
		quickSort(array, l, pi - 1, animations);
		quickSort(array, pi + 1, r, animations);
	}
};

const partition = (array, left, right, animations) => {
	let pivot = array[right];
	let i = left - 1;

	for (let j = left; j <= right - 1; j++) {
		if (array[j] < pivot) {
			i++;
			animations.push([ i, j, array[i], array[j] ]);
			let temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
	animations.push([ i + 1, right, array[i + 1], array[right] ]);
	let temp = array[i + 1];
	array[i + 1] = array[right];
	array[right] = temp;

	return i + 1;
};
