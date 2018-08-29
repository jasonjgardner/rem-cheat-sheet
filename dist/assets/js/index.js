import debounce from './lib/debounce.mjs';
import CustomProperty from './lib/CustomProperty.mjs';
import spaceless from './lib/spaceless.mjs';

const fontSizeBase = new CustomProperty('font-size-base'),
	settings = document.forms['settings'],
	settingsToggle = document.getElementById('toggle-settings'),
	sortToggle = document.getElementById('sort-column'),
	stage = document.getElementById('stage'),
	fontSizeElement = document.getElementById('font-size');

/**
 * Convert pixels to rem units
 * @param {number} pixels - Pixel size
 * @returns {number} rem size
 */
function getRem(pixels) {
	return pixels / fontSizeBase.unitless;
}

/**
 * Update px/rem list after form changes
 */
function update() {
	fontSizeBase.style = `${settings.elements.fontSizeRange.value}px`;
	//fontSizeElement.value = fontSizeBase.value;

	/// Show in output
	settings.elements.pixelRangePixels.value = parseInt(settings.elements.pixelRange.value, 10);

	stage.innerHTML = '';

	const decimals = Math.max(0, Math.min(10, settings.elements.decimalPlaces.value || 4));

	let itr = +settings.elements.pixelRangePixels.value + 1;

	while (itr > settings.elements.pixelRange.min) {
		--itr;

		const size = document.createElement('div'),
			rem = getRem(itr),
			remRounded = +(
				Math.round(rem + `e+${decimals}`) + `e-${decimals}`
			);

		stage.appendChild(size);

		size.id = `${itr}px`;
		size.className = 'c-sizes';
		size.innerHTML = spaceless`<div class="sizes__wrap">
			<p class="sizes__rem" style="font-size:${rem}rem;">${remRounded}rem</p>
			<p class="sizes__px"><b>${itr}px</b></p>
		</div>`;
	}
}

/**
 * Show hide settings on button click
 */
function toggleSettings() {
	const isVisible = settingsToggle.getAttribute('aria-expanded') === 'true';

	settingsToggle.classList.add('animated');
	settingsToggle.setAttribute('aria-expanded', JSON.stringify(!isVisible));
	settings.classList.toggle('u-hide', isVisible);
	settings.setAttribute('aria-hidden', JSON.stringify(isVisible));

	setTimeout(() => settingsToggle.classList.remove('animated'), 1000);
}

/**
 * Change sort direction on button click
 * @param {Event} event - Click event
 * @returns {boolean} Returns `false` to prevent bubbling
 */
function toggleSortDirection(event) {
	event.preventDefault();
	document.body.classList.toggle('sort--reversed');
	return false;
}

function filterResults() {
	const pixelRange = document.forms['settings'].pixelRange,
		val = Math.max(1, Math.min(
			pixelRange.max,
			+fontSizeElement.innerText.replace(/[^0-9]/g, '')
		));

	fontSizeElement.innerText = `${val}`;
	pixelRange.min = val;
	pixelRange.value = val;

	console.log(pixelRange.value, val);

	update();
}

document.documentElement.classList.remove('no-js');

settings.addEventListener('input', debounce(update, 300), false);
settingsToggle.addEventListener('click', debounce(toggleSettings, 100), false);
sortToggle.addEventListener('click', debounce(toggleSortDirection, 100), false);
fontSizeElement.addEventListener('input', debounce(filterResults, 300), false);

update();
