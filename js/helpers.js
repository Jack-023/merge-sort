/* Helpers */
// http://stackoverflow.com/questions/4994201/is-object-empty
var hasOwnProperty = Object.prototype.hasOwnProperty;
var isEmpty = function (obj) {
	// null and undefined are "empty"
	if (obj == null || obj == undefined) return true;

	// Assume if it has a length property with a non-zero value
	// that that property is correct.
	if (obj.length && obj.length > 0)   return false;
	if (obj.length === 0)  return true;

	// Otherwise, does it have any properties of its own?
	// Note that this doesn't handle
	// toString and toValue enumeration bugs in IE < 9
	for (var key in obj) {
		if (hasOwnProperty.call(obj, key))
			return false;
	}

	return true;
}

/* SVG */

// Get group element by node



function highlightCode(range) {
	$code.attr('data-line', range);
	Prism.highlightElement(codeEl);

	var lineHighlight = $('.line-highlight:first');
	var offset = lineHighlight.offset().top + $code.scrollTop() - $code.offset().top;

	$code.animate({
		scrollTop: offset
	}, 300);
};


/* Joyride setup */
$(document).foundation({
	joyride: {
		cookie_monster: false,
		tip_animation_fade_speed : 200
	}
});
$(document).foundation('joyride', 'start');

// Joyride restart
$('a[data-joyride-restart]').on('click', function (e){
e.preventDefault();
	$(document).foundation({
		joyride : { 'cookie_monster': false }
	}).foundation().foundation('joyride', 'start');
});