import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort.js';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars in the array.
const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#fff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#ff3131';

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
		for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
			array.push(randomIntFromInterval(5, 700));
		}
		this.setState({ array });
	}

	bubbleSort() {
		const animations = getBubbleSortAnimations(this.state.array);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			if (animations[i].compare !== '') {
				const [ barOneIdx, barTwoIdx ] = animations[i].compare;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = animations[i].first ? SECONDARY_COLOR : PRIMARY_COLOR;

				setTimeout(() => {
					barTwoStyle.backgroundColor = color;
					barOneStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else if (animations[i].swap !== '') {
				const [ barOneIdx, barTwoIdx, barOneHeight, barTwoHeight ] = animations[i].swap;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				setTimeout(() => {
					barOneStyle.height = `${barTwoHeight}px`;
					barTwoStyle.height = `${barOneHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	heapSort() {
		const animations = getHeapSortAnimations(this.state.array);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;

			const [ barOneIdx, barTwoIdx, barOneHeight, barTwoHeight ] = animations[i];
			const barOneStyle = arrayBars[barOneIdx].style;
			const barTwoStyle = arrayBars[barTwoIdx].style;
			if (isColorChange) {
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					barOneStyle.height = `${barTwoHeight}px`;
					barTwoStyle.height = `${barOneHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	mergeSort() {
		const animations = getMergeSortAnimations(this.state.array);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;

			if (isColorChange) {
				const [ barOneIdx, barTwoIdx ] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
				}, i * ANIMATION_SPEED_MS);
			} else {
				setTimeout(() => {
					const [ barOneIdx, newHeight ] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	quickSort() {
		const animations = getQuickSortAnimations(this.state.array);

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');

			const [ barOneIdx, barTwoIdx, barOneHeight, barTwoHeight ] = animations[i];
			const barOneStyle = arrayBars[barOneIdx].style;
			const barTwoStyle = arrayBars[barTwoIdx].style;

			setTimeout(() => {
				barOneStyle.height = `${barTwoHeight}px`;
				barTwoStyle.height = `${barOneHeight}px`;
			}, i * ANIMATION_SPEED_MS);
		}
	}

	render() {
		const { array } = this.state;

		return (
			<div className="hero">
				<nav className="navbar">
					<button className="btn" onClick={() => this.resetArray()}>
						Generate New Array
					</button>
					<button className="btn" onClick={() => this.bubbleSort()}>
						Bubble Sort
					</button>
					<button className="btn" onClick={() => this.heapSort()}>
						Heap Sort
					</button>
					<button className="btn" onClick={() => this.mergeSort()}>
						Merge Sort
					</button>
					<button className="btn" onClick={() => this.quickSort()}>
						Quick Sort
					</button>
				</nav>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{ backgroundColor: PRIMARY_COLOR, height: `${value}px` }}
						/>
					))}
				</div>
			</div>
		);
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}
