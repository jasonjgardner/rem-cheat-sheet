import CustomProperty from './lib/CustomProperty.mjs';
import spaceless from './lib/spaceless.mjs';

const fontSizeBase = new CustomProperty('font-size-base'),
	settings = document.forms['settings'],
	settingsToggle = document.getElementById('toggle-settings'),
	sortToggle = document.getElementById('sort-column'),
	stage = document.getElementById('stage'),
	fontSizeElement = document.getElementById('font-size');

function getRem(pixels) {
	return pixels / fontSizeBase.unitless;
}

function update() {
	fontSizeBase.style = `${settings.elements.fontSizeRange.value}px`;
	fontSizeElement.value = fontSizeBase.value;

	/// Show in output
	settings.elements.pixelRangePixels.value = parseInt(settings.elements.pixelRange.value, 10);

	stage.innerHTML = '';

	const decimals = Math.max(0, Math.min(10, settings.elements.decimalPlaces.value || 4));

	let itr = +settings.elements.pixelRangePixels.value + 1;

	while (itr > settings.elements.pixelRange.min) {
		--itr;

		const size = document.createElement('div'),
			rem = getRem(itr),
			remRounded = +(Math.round(rem + `e+${decimals}`) + `e-${decimals}`);

		stage.appendChild(size);

		size.id = `${itr}px`;
		size.className = 'c-sizes';
		size.innerHTML = spaceless`<div class="sizes__wrap">
			<p class="sizes__rem" style="font-size:${rem}rem;">${remRounded}rem</p>
			<p class="sizes__px"><b>${itr}px</b></p>
		</div>`;
	}
}

function toggleSettings() {
	const isVisible = settingsToggle.getAttribute('aria-expanded') === 'true';

	settingsToggle.classList.add('animated');
	settingsToggle.setAttribute('aria-expanded', JSON.stringify(!isVisible));
	settings.classList.toggle('u-hide', isVisible);
	settings.setAttribute('aria-hidden', JSON.stringify(isVisible));

	setTimeout(() => settingsToggle.classList.remove('animated'), 1000);
}

function toggleSortDirection(event) {
	event.preventDefault();
	document.body.classList.toggle('sort--reversed');
	return false;
}

document.documentElement.classList.remove('no-js');

settings.addEventListener('input', update, false);
settingsToggle.addEventListener('click', toggleSettings, false);
sortToggle.addEventListener('click', toggleSortDirection, false);

update();
