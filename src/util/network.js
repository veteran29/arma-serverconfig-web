import HttpStatus from 'http-status-codes';

export const fetchText = async(url, options) => {
	const response = await fetch(url, options);
	if(response.status !== HttpStatus.OK) {
		throw new Error(response.status);
	}

	const text = await response.text();
	return text;
};

export default {
	fetchText
}
