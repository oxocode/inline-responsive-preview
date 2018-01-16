/**
 * IRP - Utilities.
 */

/* global jQuery */

var IRP = IRP || {};

IRP.utils = (function() {
	'use strict';

	var _$, addEventListener, each, init, preventDefault, ready;

	init = function() {};

	_$ = function( selector ) {
		return document.querySelectorAll( selector );
	};

	addEventListener = function( el, eventName, handler ) {
		if ( el.addEventListener ) {
			el.addEventListener( eventName, handler );
		} else {
			el.attachEvent( 'on' + eventName, function() {
				handler.call( el );
			} );
		}
	};

	each = function( elements, fn ) {
		for ( var i = 0; i < elements.length; i ++ ) {
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

	return {
		init: init,
		_$: _$,
		addEventListener: addEventListener,
		each: each,
		preventDefault: preventDefault,
		ready: ready
	};

} )( IRP );

(function() {
	IRP.utils.init();
})( IRP );
