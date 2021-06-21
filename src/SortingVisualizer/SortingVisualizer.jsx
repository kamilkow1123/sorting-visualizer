import React from 'react';
import './SortingVisualizer.css';
import * as sortingAlgorithms from '../SortingAlgorithms/sortingAlgorithms.js';

export default class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array : []
		};
	}

	componentDidMount() {
		this.resetArray();
	}

	resetArray() {
		const array = [];
		for (let i = 0; i < 310; i++) {
			array.push(randomIntFromInterval(5, 700));
		}
		this.setState({ array });
	}

	bubbleSort() {}

	heapSort() {}

	mergeSort() {
		const jsSortedArray = this.state.array.slice().sort((a, b) => a - b);
		const sortedArray = sortingAlgorithms.mergeSort(this.state.array);

		console.log(arraysAreEqual(jsSortedArray, sortedArray));
	}

	quickSort() {}

	testSortingAlgorithms() {
		for (let i = 0; i < 100; i++) {
			const array = [];
			const length = randomIntFromInterval(1, 1000);
			for (let i = 0; i < length; i++) {
				array.push(randomIntFromInterval(-1000, 1000));
			}
			const jsSortedArray = array.slice().sort((a, b) => a - b);
			const mergeSortedArray = sortingAlgorithms.mergeSort(array.slice());

			console.log(arraysAreEqual(jsSortedArray, mergeSortedArray));
		}
	}

	render() {
		const { array } = this.state;

		return (
			<div className="array-container">
				{array.map((value, idx) => <div className="array-bar" key={idx} style={{ height: `${value}px` }} />)}
				<button onClick={() => this.resetArray()}>Generate New Array</button>
				<button onClick={() => this.bubbleSort()}>Bubble Sort</button>
				<button onClick={() => this.heapSort()}>Heap Sort</button>
				<button onClick={() => this.mergeSort()}>Merge Sort</button>
				<button onClick={() => this.quickSort()}>Quick Sort</button>
				<button onClick={() => this.testSortingAlgorithms()}>Test Algorithm</button>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
	if (arrayOne.length != arrayTwo.length) return false;
	for (let i = 0; i < arrayOne.length; i++) {
		if (arrayOne[i] != arrayTwo[i]) return false;
	}
	return true;
}
