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

/**
 * Inline Responsive Preview.
 */

/* global jQuery, InlineResponsivePreview */

var IRP = IRP || {};

IRP.previews = ( function( $ ) {
	'use strict';

	var init,
		initPreview,
		addCloseButton,
		checkPreview,
		closePreview,
		setBreakpoint,
		resetBreakpoint,
		addControls,
		removeControls,
		addBreakpointListener,
		removeBreakpointListener,
		triggerBreakpoint,
		previewFrame,
		previewFrameName,
		breakpointContainer,
		body = document.body,
		editorContainer = $( '#wpwrap' ),
		previewContainer = document.getElementsByClassName( 'irp-container' ),
		previewButton = document.getElementById( 'post-preview' ),
		wpPublishingActions = document.getElementById( 'minor-publishing-actions' );

	/**
	 * Set up the handlers to activate responsive preview.
	 */
	init = function() {
		$( 'a[id="post-preview"][href$="preview=true"]' ).on( 'click.irp', function() {
			initPreview();
		} );

		$( 'a[id!="post-preview"][href$="preview=true"]' ).on( 'click', function() {
			IRP.utils.preventDefault();
			previewButton.click();
			console.log( 'Preview Button clicked.' );
		} );
	};

	/**
	 * The user has initiated a preview.
	 */
	initPreview = function() {

		if ( ! checkPreview() ) {

			IRP.utils.addClass( body, 'folded' );
			IRP.utils.addClass( body, 'irp' );

			previewFrameName = $( '#post-preview' ).attr( 'target' ) || 'wp-preview';

			previewFrame = document.createElement( 'iframe' );
			previewFrame.setAttribute( 'class', 'irp-iframe' );
			previewFrame.setAttribute( 'name', previewFrameName );

			console.log( previewFrame );

			previewContainer = document.createElement( 'div' );
			previewContainer.setAttribute( 'class', 'irp-container' );
			previewContainer.append( previewFrame );

			editorContainer.before( previewContainer );

			setBreakpoint( 'small' );
			addControls();

		}
	};

	addCloseButton = function() {
		previewContainer
				.append(
					$( '<a class="irp-close media-modal-close">Close Preview<span' +
						' class="media-modal-icon"></span></a>' )
						.on( 'click.irp', function( e ) {
							IRP.utils.preventDefault( e );
							closePreview();
						} )
						.attr( 'title', InlineResponsivePreview.close_label )
				);
	};

	/**
	 * Checks if preview is active.
	 * @return {boolean} Preview iframe is active.
	 */
	checkPreview = function() {

		if ( document.body.classList.contains( 'irp' ) ) {
			return true;
		}

		return false;
	};

	/**
	 * Set the container width. Happens after a window resize or when the preview frame opens initially.
	 *
	 * @param {string} size Width of preview frame.
	 */
	setBreakpoint = function( size ) {

		if ( size ) {

			resetBreakpoint();

			if ( ! document.body.classList.contains( size ) ) {
				IRP.utils.addClass( body, size );
			}
		}
	};

	/**
	 * Close the preview frame and event handlers, as if Preview was never clicked.
	 */
	closePreview = function() {

		// Remove body classes.
		IRP.utils.removeClass( body, 'irp' );
		IRP.utils.removeClass( body, 'folded' );

		// Remove the preview container.
		previewContainer.remove();

		resetBreakpoint();
		removeControls();

		return false;
	};

	/**
	 * Removes/resets breakpoint size classe(s), if they exist.
	 */
	resetBreakpoint = function() {
		if ( document.body.classList.contains( 'small' ) ) {
			IRP.utils.removeClass( body, 'small' );
		}
		if ( document.body.classList.contains( 'medium' ) ) {
			IRP.utils.removeClass( body, 'medium' );
		}
	};

	/**
	 * Add breakpoint list to Publishing Actions container.
	 */
	addControls = function() {
		var smallLink = '<li class="irp-breakpoint-list-item"><a class="irp-breakpoint-list-item-link icon-small"' +
			' href="#" target="irp" data-breakpoint="small">SM</a></li>',
			mediumLink = '<li class="irp-breakpoint-list-item"><a class="irp-breakpoint-list-item-link icon-medium"' +
				' href="#" target="irp" data-breakpoint="medium">MD</a></li>';

		// Build breakpoint container.
		breakpointContainer = document.createElement( 'ul' );
		breakpointContainer.setAttribute( 'class', 'irp-breakpoint-list' );
		wpPublishingActions.append( breakpointContainer );
		breakpointContainer.innerHTML = smallLink;
		breakpointContainer.innerHTML += mediumLink;

		addBreakpointListener();
		addCloseButton();
	};

	/**
	 * Remove breakpoint list from Publishing Actions container.
	 */
	removeControls = function() {

		removeBreakpointListener();
		$( '.irp-close' ).remove();
		$( '.irp-breakpoint-list' ).remove();

	};

	/**
	 * Add breakpoint listener to trigger iframe resize.
	 */
	addBreakpointListener = function() {
		var breakpoint = document.getElementsByClassName( 'irp-breakpoint-list-item-link' ),
			i;
		for ( i = 0; i < breakpoint.length; i++ ) {
			breakpoint[i].addEventListener( 'click', triggerBreakpoint );
		}
	};

	/**
	 * Remove breakpoint listener that triggers iframe resize.
	 */
	removeBreakpointListener = function() {
		var breakpoint = document.getElementsByClassName( 'irp-breakpoint-list-item-link' ),
			i;
		for ( i = 0; i < breakpoint.length; i++ ) {
			breakpoint[i].removeEventListener( 'click', triggerBreakpoint );
		}
	};

	/**
	 * Triggers the resizing of the iframe, based on the breakpoint size.
	 */
	triggerBreakpoint = function( element ) {
		var size = element.target.getAttribute( 'data-breakpoint' );

		element.preventDefault();
		setBreakpoint( size );
	};

	return {
		init: init,
		initPreview: initPreview,
		addControls: addControls,
		checkPreview: checkPreview,
		closePreview: closePreview,
		setBreakpoint: setBreakpoint,
		resetBreakpoint: resetBreakpoint,
		triggerBreakpoint: triggerBreakpoint
	};
} ( jQuery, IRP ) );

( function() {
	IRP.previews.init();
} ( IRP ) );
