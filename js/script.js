import { IMC, notANumber } from './utils.js';

const form = document.querySelector('form');
const inputWeight = document.querySelector('#weight');
const inputHeight = document.querySelector('#height');

const modal = {
	wrapper: document.querySelector('.modal-wrapper'),
	message: document.querySelector('.modal .title span'),
	buttonClose: document.querySelector('.modal button.close'),

	open() {
		modal.wrapper.classList.add('open');
	},
	close() {
		modal.wrapper.classList.remove('open');
	},
};

const alertError = {
	alert: document.querySelector('.alert-error'),
	open() {
		alertError.alert.classList.add('open');
	},
	close() {
		alertError.alert.classList.remove('open');
	},
};

form.onsubmit = (event) => {
	event.preventDefault();

	const height = inputHeight.value;
	const weight = inputWeight.value;

	const result = IMC(height, weight);
	const message = `Seu IMC é de ${result}`;

	const showAlertError = notANumber(weight) || notANumber(height);

	if (showAlertError) {
		alertError.open();
		return;
	}

	alertError.close();

	modal.message.innerText = message;
	modal.open();
};

modal.buttonClose.onclick = () => {
	modal.close();
	inputHeight.value = '';
	inputWeight.value = '';
};

inputWeight.oninput = () => alertError.close();
inputHeight.oninput = () => alertError.close();

window.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') {
		modal.close();
		inputHeight.value = '';
		inputWeight.value = '';
	}
});

// function IMC(height, weight) {
// 	return (weight / (height / 100) ** 2).toFixed(2);
// }

// function notANumber(value) {
// 	return isNaN(value) || value == '';
// }
