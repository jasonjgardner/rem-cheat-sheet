/**
 * CSS Custom Property class
 * @author Jason Gardner <holler@jasongardner.co>
 */
export default class CustomProperty {
	/**
	 * Declare a custom property to find in a given container.
	 * @param {string} propertyName - Custom property name. Leading double dashes can be omitted.
	 * @param {HTMLElement|null} [container] - The element to which the custom property is applied. Defaults to `document.documentElement`
	 */
	constructor(propertyName, container = null) {
		this._name = propertyName.replace(/^--/ig, '').toLowerCase().trim();
		this._container = container || document.documentElement;
	}

	/**
	 * Get the custom property name
	 * @returns {string} Custom property with dashes
	 */
	get name() {
		return `--${this._name}`;
	}

	/**
	 * Get the computed value of the custom property
	 * @returns {string} Custom property value
	 */
	get value() {
		return window.getComputedStyle(this._container).getPropertyValue(this.name).trim();
	}

	/**
	 * Gets the custom property numeric value.
	 * @returns {number|null} Value without units
	 */
	get unitless() {
		const number = +window.getComputedStyle(this._container).getPropertyValue(this.name).replace(/[^0-9]+/g, '');

		if (isNaN(number)) {
			return null;
		}

		return number;
	}

	/**
	 * Applies a value to the custom property
	 * @param {string|number} styles - CSS property value
	 */
	set style(styles) {
		this._container.style.setProperty(this.name, `${styles}`);
	}
}
