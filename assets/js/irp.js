/**
 * IRP - Utilities.
 */

var IRP = IRP || {};

IRP.utils = ( function() {
	'use strict';

	var addClass, removeClass, init, removeElement, preventDefault;

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

	removeElement = function( element ) {
		console.log( element );
		element.parentNode.removeChild( element );
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
		removeElement: removeElement,
		removeClass: removeClass,
		addClass: addClass,
		preventDefault: preventDefault
	};

} ( IRP ) );

( function() {
	IRP.utils.init();
} ( IRP ) );

/**
 * Inline Responsive Preview.
 */

/* global jQuery, InlineResponsivePreview, wp */

var IRP = IRP || {};

IRP.previews = ( function( $, IRP, wp ) {
	'use strict';

	var init,
		addPreviewButton,
		reAddPreviewButton,
		triggerPreview,
		inlineButton,
		inlineButtonContainer,
		closeButton,
		addCloseButton,
		checkPreview,
		closePreview,
		setBreakpoint,
		resetBreakpoint,
		addControls,
		removeControls,
		addPreviewListener,
		removePreviewListener,
		addBreakpointListener,
		addCloseListener,
		removeBreakpointListener,
		removeCloseListener,
		triggerBreakpoint,
		previewFrame,
		previewTarget,
		previewButton,
		previewButtonContainer,
		previewFrameName,
		breakpointContainer,
		body = document.body,
		editorContainer = document.getElementById( 'wpwrap' ),
		inlineContainer = document.getElementsByClassName( 'inline-preview-action' ),
		previewContainer = document.getElementsByClassName( 'irp-container' ),
		previewAction = document.getElementById( 'preview-action' ),
		wpPublishingActions = document.getElementById( 'minor-publishing-actions' );

	/**
	 * Set up the handlers to activate responsive preview.
	 */
	init = function() {

		addPreviewButton();
	};

	/**
	 * Adds preview button.
	 */
	addPreviewButton = function() {

		if ( ! inlineContainer.length ) {
			inlineContainer = previewAction.cloneNode( true );
			inlineContainer.setAttribute( 'id', 'inline-preview-action' );
			inlineContainer.setAttribute( 'class', 'inline-preview-action' );
			wpPublishingActions.append( inlineContainer );
			inlineButtonContainer = document.getElementById( 'inline-preview-action' ).getElementsByClassName( 'button' );
			previewButtonContainer = document.getElementById( 'preview-action' ).getElementsByClassName( 'button' );
			inlineButton = inlineButtonContainer[ 0 ];
			previewButton = previewButtonContainer[ 0 ];
			inlineButton.setAttribute( 'id', 'inline-preview' );
			inlineButton.setAttribute( 'class', 'inline-preview button' );
			inlineButton.innerHTML = 'Inline Preview';
			previewButton.setAttribute( 'target', 'wp-preview' );
			addPreviewListener();
		}
	};

	/**
	 * Remove preview button.
	 */
	reAddPreviewButton = function() {
		inlineContainer.remove();
		removePreviewListener();
		addPreviewButton();
	};

	/**
	 * The user has initiated a preview.
	 */
	triggerPreview = function() {

		if ( ! checkPreview() ) {

			IRP.utils.addClass( body, 'folded' );
			IRP.utils.addClass( body, 'irp' );
			previewFrameName = document.getElementById( 'inline-preview' ).getAttribute( 'target' ) || 'wp-preview';

			previewFrame = document.createElement( 'iframe' );
			previewFrame.setAttribute( 'class', 'irp-iframe' );
			previewFrame.setAttribute( 'name', previewFrameName );

			previewContainer = document.createElement( 'div' );
			previewContainer.setAttribute( 'class', 'irp-container' );
			previewContainer.append( previewFrame );

			editorContainer.before( previewContainer );

			setBreakpoint( 'small' );
			addControls();

		} else {

			IRP.utils.preventDefault();

			// Simulate post preview click to reload inline preview frame.
			previewTarget = document.getElementById( 'inline-preview' ).getAttribute( 'target' ) || 'wp-preview';
			$( '#post-preview' ).attr( 'target', previewTarget );
			$( '#post-preview' ).click();
			$( '#post-preview' ).attr( 'target', 'wp-preview' );
		}

	};

	addCloseButton = function() {
		closeButton = document.createElement( 'a' );
		closeButton.setAttribute( 'class', 'irp-close' );
		closeButton.setAttribute( 'title', InlineResponsivePreview.close_label );
		closeButton.innerHTML = 'Close Preview';

		previewContainer.append( closeButton );
		addCloseListener();
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
		reAddPreviewButton();

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
	 * Add preview button listener to trigger iframe.
	 */
	addPreviewListener = function() {
		var button = document.getElementsByClassName( 'inline-preview' ),
			i;
		for ( i = 0; i < button.length; i++ ) {
			button[i].addEventListener( 'click', triggerPreview );
		}
	};

	/**
	 * Remove preview button listener to trigger iframe.
	 */
	removePreviewListener = function() {
		var button = document.getElementsByClassName( 'inline-preview' ),
			i;
		for ( i = 0; i < button.length; i++ ) {
			button[i].removeEventListener( 'click', triggerPreview );
		}
	};

	/**
	 * Add close button listener to trigger iframe.
	 */
	addCloseListener = function() {
		var button = document.getElementsByClassName( 'irp-close' ),
			i;
		for ( i = 0; i < button.length; i++ ) {
			button[i].addEventListener( 'click', closePreview );
		}
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
	 * Add preview button listener to trigger iframe.
	 */
	removeCloseListener = function() {
		var button = document.getElementsByClassName( 'irp-close' ),
			i;
		for ( i = 0; i < button.length; i++ ) {
			button[i].removeEventListener( 'click', closePreview );
		}
	};

	/**
	 * Triggers the resizing of the iframe, based on the breakpoint size.
	 */
	triggerBreakpoint = function( element ) {
		var size = element.target.getAttribute( 'data-breakpoint' );

		IRP.utils.preventDefault( element );
		setBreakpoint( size );
	};

	return {
		init: init,
		triggerPreview: triggerPreview,
		addControls: addControls,
		checkPreview: checkPreview,
		closePreview: closePreview,
		setBreakpoint: setBreakpoint,
		resetBreakpoint: resetBreakpoint,
		triggerBreakpoint: triggerBreakpoint
	};
} ( jQuery, IRP, wp ) );

( function() {
	IRP.previews.init();
} ( IRP ) );
