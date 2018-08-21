const styles = window.getComputedStyle(document.documentElement),
      main = document.getElementById('sizes'),
      fontSizeElement = document.getElementById('font-size'),
      lineHeightElement = document.getElementById('line-height'),
      pxInput = document.getElementById('pixels'),
      itrsInput = document.getElementById('itrs');

class CustomProperty {
	constructor(propertyName, container = null) {
		this._name = propertyName.replace(/[- ]+/ig, '').toLowerCase();
		this._container = container || document.documentElement;
	}

	get name() {
		return `--${this._name}`;
	}

	get value() {
		return window.getComputedStyle(this._container).getPropertyValue(this.name);
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

function getRem(pixels) {
	return +pixels * (1 / Math.max(1, new CustomProperty('font-size-base').unitless || 16));
}

function setText() {
	fontSizeElement.innerHTML = styles.getPropertyValue('--font-size-base').trim();
	lineHeightElement.innerHTML = styles.getPropertyValue('--line-height').trim();
}

function setSizes(max, decimals) {
	main.innerHTML = '';

	let itr = Math.min(max || 72, 300) + 1;

	decimals = Math.max(0, Math.min(10, decimals || 4));

	while (itr--) {
		const size = document.createElement('div'),
		      rem = getRem(itr),
		      remSize = +(Math.round(rem + `e+${decimals}`) + `e-${decimals}`);

		main.appendChild(size);

		size.className = 'sizes';
		size.innerHTML = '<div class="sizes__wrap">' + `<p class="sizes__rem" style="font-size:${rem}rem;">${remSize}rem</p>` + `<p class="sizes__px"><b>${itr}px</b></p></div>`;
	}
}

function update() {
	new CustomProperty('font-size-base').style = `${pxInput.value}px`;
	setText();
	setSizes(itrsInput.value);
}

pxInput.value = Math.round(new CustomProperty('font-size-base').unitless);

pxInput.addEventListener('change', update, true);
itrsInput.addEventListener('change', update, true);

update();
tippy('[data-toggle="tooltip"]');

//# sourceMappingURL=script.js.map