import { fetchText } from '@/util/network'

export const configs = {
	liberation: {
		url: 'https://rawgit.com/Wyqer/kp_liberation/master/Missionframework/ui/mission_params.hpp',
		translationUrl: ''
	},
	antistasi: {
		url: 'https://rawgit.com/A3Antistasi/antistasiofficial/master/AntistasiOfficial.Altis/description.ext'
	},
}

export default {
	async getConfig(config) {
		if(Object.keys(configs).indexOf(config) === -1) {
			throw new Error('Incorrect config name');
		}

		return fetchText(configs[config].url);
	}
}

