export const getHeapSortAnimations = (array) => {
	const animations = [];
	if (array.length <= 1) return array;
	heapSort(array, animations);
	return array;
};

const heapSort = (array, animations) => {
	let n = array.length;

	for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
		heapify(array, n, i);
	}

	for (let i = n - 1; i > 0; i--) {
		let temp = array[0];
		array[0] = array[i];
		array[i] = temp;

		heapify(array, i, 0);
	}
};

const heapify = (array, n, i) => {
	let largest = i;
	let l = 2 * i + 1;
	let r = 2 * i + 2;

	if (l < n && array[l] > array[largest]) largest = l;

	if (r < n && array[r] > array[largest]) largest = r;

	if (largest !== i) {
		let temp = array[i];
		array[i] = array[largest];
		array[largest] = temp;

		heapify(array, n, largest);
	}
};
