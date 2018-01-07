import { fetchText } from '@/util/network'

/**
 * @typedef Config
 * @type {Object}
 * @property {string} url
 * @property {string} [translationUrl]
 */

 /**
	* @type {Object.<string, Config>}
	*/
export const configs = {
	liberation: {
		url: 'https://rawgit.com/Wyqer/kp_liberation/master/Missionframework/ui/mission_params.hpp',
		translationUrl: 'https://rawgit.com/Wyqer/kp_liberation/master/Missionframework/stringtable.xml'
	},
	antistasi: {
		url: 'https://rawgit.com/A3Antistasi/antistasiofficial/master/AntistasiOfficial.Altis/description.ext'
	},
	escape: {
		url: 'https://rawgit.com/NeoArmageddon/co10_Escape/master/Code/include/params.hpp'
	}
}

/**
 * Fetch mission params config
 * @param {string} configName
 */
const getConfig = async(configName) => {
	if(Object.keys(configs).indexOf(configName) === -1) {
		throw new Error('Incorrect config name');
	}

	return fetchText(configs[configName].url);
};

/**
 * Fetch mission stringtable
 * @param {string} configName
 */
export const getTranslations = async(configName) => {
	if(Object.keys(configs).indexOf(configName) === -1) {
		throw new Error('Incorrect config name');
	}

	const config = configs[configName];

	return config.hasOwnProperty('translationUrl') ? fetchText(config.translationUrl) : Promise.resolve('');
};

/**
 * Fetch mission params config and strintable if configured
 * @param {string} config
 */
export const getConfigWithTranslations = (config) => {
		const configPromise = getConfig(config),
			translationPromise = getTranslations(config);

		return [configPromise, translationPromise];
};

export default {
	getConfig,
	getTranslations,
	getConfigWithTranslations
}

