/**
 * IRP - Utilities.
 */

var IRP = IRP || {};

IRP.utils = ( function() {
	'use strict';

	var addClass, removeClass, init, preventDefault;

	init = function() {};

	addClass = function( element, className ) {
		if ( ! element.classList.contains( className ) ) {
			element.classList.add( className );
		}
	};

	removeClass = function( element, className ) {
		if ( element.classList.contains( className ) ) {
			element.classList.remove( className );
		}
	};

	preventDefault = function( e ) {
		var evt = e || window.event; // IE8 compatibility
		if ( evt.preventDefault ) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
			evt.cancelBubble = true;
		}
		return evt.currentTarget || evt.srcElement;
	};

	return {
		init: init,
		removeClass: removeClass,
		addClass: addClass,
		preventDefault: preventDefault
	};

} ( IRP ) );

( function() {
	IRP.utils.init();
} ( IRP ) );
