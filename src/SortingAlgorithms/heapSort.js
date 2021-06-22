export const getHeapSortAnimations = (array) => {
	const animations = [];
	if (array.length <= 1) return array;
	heapSort(array, animations);
	return animations;
};

const heapSort = (array, animations) => {
	let n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(array, n, i, animations);
	}

	for (let i = n - 1; i > 0; i--) {
		animations.push([ 0, i, array[0], array[i] ]);
		let temp = array[0];
		array[0] = array[i];
		array[i] = temp;

		heapify(array, i, 0, animations);
	}
};

const heapify = (array, n, i, animations) => {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < n && array[l] > array[largest]) largest = l;

	if (r < n && array[r] > array[largest]) largest = r;

	if (largest !== i) {
		animations.push([ i, largest, array[i], array[largest] ]);
		let temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		heapify(array, n, largest, animations);
	}
};
