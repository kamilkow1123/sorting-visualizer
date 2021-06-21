import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort.js';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 300;

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
		let firstCompare = true;
		// console.log(animations);
		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');

			// console.log(animations[i]);
			if (animations[i].compare !== '') {
				const [ barOneIdx, barTwoIdx ] = animations[i].compare;
				// console.log(barOneIdx, barTwoIdx);
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				if (firstCompare) {
					setTimeout(() => {
						barOneStyle.backgroundColor = SECONDARY_COLOR;
						barTwoStyle.backgroundColor = SECONDARY_COLOR;
					}, i * ANIMATION_SPEED_MS);
					firstCompare = false;
				} else {
					setTimeout(() => {
						barTwoStyle.backgroundColor = PRIMARY_COLOR;
						barOneStyle.backgroundColor = PRIMARY_COLOR;
					}, i * ANIMATION_SPEED_MS);
					firstCompare = true;
				}
			} else if (animations[i].swap !== '') {
				const [ barOneIdx, barTwoIdx ] = animations[i].swap;

				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				setTimeout(() => {
					const temp = barOneStyle.height;
					barOneStyle.height = barTwoStyle.height;
					barTwoStyle.height = temp;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	heapSort() {}

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
					console.log(newHeight);
					const barOneStyle = arrayBars[barOneIdx].style;
					barOneStyle.height = `${newHeight}px`;
				}, i * ANIMATION_SPEED_MS);
			}
		}
	}

	quickSort() {}

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
