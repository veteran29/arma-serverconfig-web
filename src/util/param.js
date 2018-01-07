export const isParamACategory = (param) => {
	// eslint-disable-next-line eqeqeq
	return (param.default == false && param.values.length === 1 && param.values[0] == false);
};

/**
 * Sanitizes category title by removing characters commonly used to indicate that param is a category.
 * ("====" etc.)
 * @param {string} name
 */
export const sanitizeParamCategoryName = (name) => name.replace(/(?: ?==+ ?)/gi, '');

/**
 *
 * @param {Object} params
 *
 */
export const categorizeParams = (params) => {
	try {
		var data = [ { title: 'Params', params: {} } ];

		Object.keys(params).forEach(paramKey => {
			const param = params[paramKey];

			if (isParamACategory(param)) {
				data.push({ title: sanitizeParamCategoryName(param.title), params: {} });
			}
			else {
				data[(data.length - 1)].params[paramKey] = param;
			}
		});

		return data;
	}
	catch (e) {
		console.error(e);
		throw e;
	}
};

export default {
	categorizeParams,
	isParamACategory,
	sanitizeParamCategoryName
}
