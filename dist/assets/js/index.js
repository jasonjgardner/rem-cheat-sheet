import CustomProperty from './lib/CustomProperty.mjs';
import spaceless from './lib/spaceless.mjs';

const fontSizeBase = new CustomProperty('font-size-base'),
	settings = document.forms.settings,
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
 * Get base font size in pixels
 * @param {number} maxSize - Maximum font size in pixels
 * @returns {number} Base font size pixel value
 */
function getBase(maxSize) {
	return Math.max(1, Math.min(
		maxSize || settings.pixelRange.max,
		+fontSizeElement.innerHTML.replace(/[^0-9]/g, '')
	));
}

/**
 * Update px/rem list after form changes
 */
function update() {
	fontSizeBase.style = `${settings.elements.fontSizeRange.value}px`;
	fontSizeElement.innerHTML = `${fontSizeBase.unitless}`;

	/// Show in output
	settings.elements.pixelRangePixels.value = parseInt(settings.elements.pixelRange.value, 10);

	stage.innerHTML = '';

	const decimals = Math.max(0, Math.min(10, settings.elements.decimalPlaces.value || 4));

	let itr = +settings.elements.pixelRangePixels.value + 1,
		units = 'rem';

	if (document.body.classList.contains('unitless')) {
		units = '';
	}

	while (itr > settings.elements.pixelRange.min) {
		--itr;

		const size = document.createElement('div'),
			rem = getRem(itr),
			remRounded = parseFloat(Math.round(rem + `e+${decimals}`) + `e-${decimals}`);

		stage.appendChild(size);

		size.id = `${itr}px`;
		size.className = 'c-sizes';
		size.innerHTML = spaceless`<div class="sizes__wrap">
			<p class="sizes__rem" style="font-size:${rem}rem;">${remRounded}${units}</p>
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
 * @returns {boolean} Returns `false` to prevent bubbling
 */
function toggleSortDirection() {
	document.body.classList.toggle('sort--reversed');
	return false;
}

/**
 * Set caret position of [contenteditable="true"]
 * @param {HTMLElement} elem - Editable element
 */
function setCaret(elem) {
	const range = document.createRange(),
		selection = window.getSelection();

	range.setStart(elem.childNodes[0], elem.innerText.trim().length);
	range.collapse(true);
	selection.removeAllRanges();
	selection.addRange(range);
	elem.focus();
}

/**
 * Search for specific pixel size in UI
 */
function filterResults() {
	const val = getBase(settings.pixelRange.max);

	fontSizeElement.innerHTML = `${val}`;
	setCaret(fontSizeElement);

	settings.pixelRange.min = val;
	settings.pixelRange.value = val;

	update();
}

document.documentElement.classList.remove('no-js');

settings.addEventListener('input', update, false);
settingsToggle.addEventListener('click', toggleSettings, false);
sortToggle.addEventListener('click', toggleSortDirection, false);
fontSizeElement.addEventListener('input', filterResults, false);
settings.showUnits.addEventListener('change', () => document.body.classList.toggle('unitless'));

update();
