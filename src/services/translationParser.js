const xmlToJSON = require('xmlToJSON');

/**
 * @typedef {Array.<{ _text: String}>} KeyText
 */
/**
 * @typedef KeyAttr
 * @type {Object}
 * @property {{ _value: string }} ID
 */
/**
 * @typedef KeyObj
 * @type {Object}
 * @property {KeyAttr} _attr
 * @property {KeyText} Original
 */

export const defaultTranslations = {
	Original: {
		"STR_A3_ReviveMode": 'Revive mode',
		"STR_A3_MissionDefault": 'Mission default',
		"STR_A3_Disabled": 'Disabled',
		"STR_A3_EnabledForAllPlayers": 'Enabled for all players',
		"STR_A3_RequiredTrait": 'Required trait',
		"STR_A3_Medic": 'Medic',
		"STR_A3_None": 'None',
		"STR_A3_RequiredItems": 'Required items',
		"STR_A3_Medikit": 'Medikit',
		"STR_A3_FirstAidKitOrMedikit": 'First aid kit or Medikit',
		"STR_A3_ReviveDuration": 'Revive duration',
		"STR_A3_RequiredTrait_MedicSpeedMultiplier": 'Medic speed multiplier',
		"STR_A3_BleedOutDuration": 'Bleed out duration',
		"STR_A3_IncapacitationMode": 'Incapacitation mode',
		"STR_A3_Basic": 'Basic',
		"STR_A3_Advanced": 'Advanced',
		"STR_A3_Realistic": 'Realistic',
		"STR_A3_ForceRespawnDuration": 'Force respawn duration'
	}
}

/**
 * @param {string} stringXml
 */
export const fromString = (stringXml, language = 'Original') => {
	if(!stringXml) {
		return {};
	}
	const json = xmlToJSON.parseString(stringXml);

	/** @type {KeyObj[]} */
	const keyArr = json.Project[0].Package[0].Key;

	const parsed = keyArr.map(
		key => ({
			[language]: { [key._attr.ID._value]: key[language][0]._text }
		})
	).reduce(
		(obj, key) => Object.assign(obj, { ...key[language] } ),
		{}
	);

	return Object.assign(defaultTranslations[language], parsed);
};

export default {
	fromString,
	defaultTranslations
}
