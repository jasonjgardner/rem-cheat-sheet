/**
 * Returns a function, that, as long as it continues to be invoked, will not be triggered.
 * The function will be called after it stops being called for *n* milliseconds.
 * If `immediate` is passed, trigger the function on the leading edge, instead of the trailing.
 *
 * @param func Function to regulate
 * @param wait The number of milliseconds to wait before invoking the function
 * @param immediate If `true` the function will be invoked without delay
 * @returns {function()}
 * @link https://davidwalsh.name/javascript-debounce-function
 */
export default function debounce(func, wait, immediate) {
	let timeout;

	return () => {
		const context = this,
			args = arguments,
			later = function() {
				timeout = null;

				if (!immediate) {
					func.apply(context, args);
				}
			},
			callNow = (immediate && !timeout);

		clearTimeout(timeout);
		timeout = setTimeout(later, wait);

		if (callNow) {
			func.apply(context, args);
		}
	};
}
