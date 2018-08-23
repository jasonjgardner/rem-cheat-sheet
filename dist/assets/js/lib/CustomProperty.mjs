export default class CustomProperty {
	constructor(propertyName, container = null) {
		this._name = propertyName.replace(/^--/ig, '').toLowerCase().trim();
		this._container = container || document.documentElement;
	}

	get name() {
		return `--${this._name}`;
	}

	get value() {
		return window.getComputedStyle(this._container).getPropertyValue(this.name).trim();
	}

	get unitless() {
		const number = +window.getComputedStyle(this._container).getPropertyValue(this.name).replace(/[^0-9]+/g, '');

		if (isNaN(number)) {
			return null;
		}

		return number;
	}

	set style(styles) {
		this._container.style.setProperty(this.name, `${styles}`);
	}
}
