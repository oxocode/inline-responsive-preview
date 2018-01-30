/**
 * IRP - Utilities.
 */

var IRP = IRP || {};

IRP.utils = ( function() {
	'use strict';

	var _$, addEventListener, each, addClass, removeClass, init, preventDefault, ready, removeElement;

	init = function() {};

	_$ = function( selector ) {
		return document.querySelectorAll( selector );
	};

	addEventListener = function( element, eventName, handler ) {
		if ( element.addEventListener ) {
			element.addEventListener( eventName, handler );
		} else {
			element.attachEvent( 'on' + eventName, function() {
				handler.call( element );
			} );
		}
	};

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

	each = function( elements, fn ) {
		var i = 0;
		for ( i < elements.length; i++; ) {
			fn( elements[ i ], i );
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

	ready = function( fn ) {
		if ( 'loading' !== document.readyState ) {
			fn();
		} else if ( document.addEventListener ) {
			document.addEventListener( 'DOMContentLoaded', fn );
		} else {
			document.attachEvent( 'onreadystatechange', function() {
				if ( 'loading' !== document.readyState ) {
					fn();
				}
			} );
		}
	};

	removeElement = function( elementId ) {
		var element = document.getElementsByClassName( elementId );
		element.parentNode.removeChild( element );
	};

	return {
		init: init,
		_$: _$,
		addEventListener: addEventListener,
		each: each,
		removeClass: removeClass,
		addClass: addClass,
		preventDefault: preventDefault,
		ready: ready,
		removeElement: removeElement
	};

} ( IRP ) );

( function() {
	IRP.utils.init();
} ( IRP ) );
