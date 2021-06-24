import React from 'react';
import './SortingVisualizer.css';
import { getMergeSortAnimations } from '../SortingAlgorithms/mergeSort.js';
import { getBubbleSortAnimations } from '../SortingAlgorithms/bubbleSort.js';
import { getHeapSortAnimations } from '../SortingAlgorithms/heapSort.js';
import { getQuickSortAnimations } from '../SortingAlgorithms/quickSort.js';
import { withHooksHOC } from '../withHooksHOC';

// Change this value for the speed of the animations.
// const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars in the array.
// const NUMBER_OF_ARRAY_BARS = 200;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#fff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = '#ff4992';

class SortingVisualizer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			array              : [],
			animationSpeed     : 5,
			disabledButtons    : false,
			isAlgorithmRunning : false
		};
	}

	componentDidMount() {
		this.resetArray(70);
		// disableScrolling();
	}

	resetArray(size) {
		const array = [];
		let maxValue;
		if (this.props.screenWidth < 1000) {
			maxValue = this.props.screenWidth * 0.8;
		} else {
			maxValue = 650;
		}

		for (let i = 0; i < size; i++) {
			array.push(randomIntFromInterval(5, maxValue));
		}
		this.setState({ array });
	}

	enableButtons = () => {
		document.ontouchmove = function(e) {
			return true;
		};

		this.setState({ disabledButtons: false });
	};

	disableButtons = (algorithm) => {
		document.ontouchmove = function(e) {
			e.preventDefault();
		};

		this.setState({ disabledButtons: true }, () => {
			algorithm();
		});
	};

	bubbleSort = () => {
		const animations = getBubbleSortAnimations(this.state.array);
		let isMobile = this.props.screenWidth < 1000 ? true : false;

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const lastOne = i === animations.length - 1 ? true : false;
			if (animations[i].compare !== '') {
				const [ barOneIdx, barTwoIdx ] = animations[i].compare;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;
				const color = animations[i].first ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barTwoStyle.backgroundColor = color;
					barOneStyle.backgroundColor = color;
					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			} else if (animations[i].swap !== '') {
				const [ barOneIdx, barTwoIdx, barOneValue, barTwoValue ] = animations[i].swap;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				setTimeout(() => {
					if (isMobile) {
						barOneStyle.width = `${barTwoValue}px`;
						barTwoStyle.width = `${barOneValue}px`;
					} else {
						barOneStyle.height = `${barTwoValue}px`;
						barTwoStyle.height = `${barOneValue}px`;
					}

					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			}
		}
	};

	heapSort = () => {
		const animations = getHeapSortAnimations(this.state.array);
		let isMobile = this.props.screenWidth < 1000 ? true : false;

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			const lastOne = i === animations.length - 1 ? true : false;

			const [ barOneIdx, barTwoIdx, barOneValue, barTwoValue ] = animations[i];
			const barOneStyle = arrayBars[barOneIdx].style;
			const barTwoStyle = arrayBars[barTwoIdx].style;
			if (isColorChange) {
				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			} else {
				setTimeout(() => {
					if (isMobile) {
						barOneStyle.width = `${barTwoValue}px`;
						barTwoStyle.width = `${barOneValue}px`;
					} else {
						barOneStyle.height = `${barTwoValue}px`;
						barTwoStyle.height = `${barOneValue}px`;
					}

					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			}
		}
	};

	mergeSort = () => {
		const animations = getMergeSortAnimations(this.state.array);
		let isMobile = this.props.screenWidth < 1000 ? true : false;

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const isColorChange = i % 3 !== 2;
			const lastOne = i === animations.length - 1 ? true : false;

			if (isColorChange) {
				const [ barOneIdx, barTwoIdx ] = animations[i];
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					barOneStyle.backgroundColor = color;
					barTwoStyle.backgroundColor = color;
					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			} else {
				setTimeout(() => {
					const [ barOneIdx, newValue ] = animations[i];
					const barOneStyle = arrayBars[barOneIdx].style;
					if (isMobile) barOneStyle.width = `${newValue}px`;
					else barOneStyle.height = `${newValue}px`;

					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			}
		}
	};

	quickSort = () => {
		const animations = getQuickSortAnimations(this.state.array);
		let isMobile = this.props.screenWidth < 1000 ? true : false;

		for (let i = 0; i < animations.length; i++) {
			const arrayBars = document.getElementsByClassName('array-bar');
			const lastOne = i === animations.length - 1 ? true : false;
			if (animations[i].pivot !== '') {
				const [ pivot ] = animations[i].pivot;
				const pivotStyle = arrayBars[pivot].style;
				const color = animations[i].first ? SECONDARY_COLOR : PRIMARY_COLOR;
				setTimeout(() => {
					pivotStyle.backgroundColor = color;
					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			} else if (animations[i].swap !== '') {
				const [ barOneIdx, barTwoIdx, barOneValue, barTwoValue ] = animations[i].swap;
				const barOneStyle = arrayBars[barOneIdx].style;
				const barTwoStyle = arrayBars[barTwoIdx].style;

				setTimeout(() => {
					if (isMobile) {
						barOneStyle.width = `${barTwoValue}px`;
						barTwoStyle.width = `${barOneValue}px`;
					} else {
						barOneStyle.height = `${barTwoValue}px`;
						barTwoStyle.height = `${barOneValue}px`;
					}

					if (lastOne) this.enableButtons();
				}, i * this.state.animationSpeed);
			}
		}
	};

	arraySizeChange = (event) => {
		this.resetArray(event.target.value);
	};

	animationSpeedChange = (event) => {
		this.setState({ animationSpeed: -event.target.value });
	};

	render() {
		const { array } = this.state;

		return (
			<div className="hero">
				<nav className="navbar">
					<button
						className="btn"
						onClick={() => this.resetArray(this.state.array.length)}
						disabled={this.state.disabledButtons}
					>
						Generate New Array
					</button>
					<button
						className="btn"
						onClick={() => this.disableButtons(this.bubbleSort)}
						disabled={this.state.disabledButtons}
					>
						Bubble Sort
					</button>
					<button
						className="btn"
						onClick={() => this.disableButtons(this.heapSort)}
						disabled={this.state.disabledButtons}
					>
						Heap Sort
					</button>
					<button
						className="btn"
						onClick={() => this.disableButtons(this.mergeSort)}
						disabled={this.state.disabledButtons}
					>
						Merge Sort
					</button>
					<button
						className="btn"
						onClick={() => this.disableButtons(this.quickSort)}
						disabled={this.state.disabledButtons}
					>
						Quick Sort
					</button>
					<input
						type="range"
						min={20}
						max={this.props.screenWidth < 1000 ? 120 : 200}
						step={5}
						value={this.state.array.length}
						className="slider"
						onChange={this.arraySizeChange}
						disabled={this.state.disabledButtons}
					/>
					<input
						type="range"
						min={-50}
						max={-0.5}
						step={0.05}
						value={-this.state.animationSpeed}
						className="slider"
						onChange={this.animationSpeedChange}
						disabled={this.state.disabledButtons}
					/>
				</nav>
				<div className="array-container">
					{array.map((value, idx) => (
						<div
							className="array-bar"
							key={idx}
							style={{
								backgroundColor : PRIMARY_COLOR,
								width           : `${this.props.screenWidth < 1000
									? value
									: 700 / this.state.array.length}px`,
								height          : `${this.props.screenWidth < 1000
									? 400 / this.state.array.length
									: value}px`
							}}
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

// function disableScrolling() {
// 	// var x = window.scrollX;
// 	// var y = window.scrollY;
// 	window.onscroll = function() {
// 		window.scrollTo(0, 0);
// 	};
// }

// function enableScrolling() {
// 	window.onscroll = function() {};
// }

export default withHooksHOC(SortingVisualizer);
