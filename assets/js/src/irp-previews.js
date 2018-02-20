/**
 * Inline Responsive Preview.
 */

/* global jQuery, InlineResponsivePreview */

var IRP = IRP || {};

IRP.previews = ( function( $ ) {
	'use strict';

	var init,
		triggerPreview,
		inlineButton,
		inlineContainer,
		addCloseButton,
		checkPreview,
		closePreview,
		setBreakpoint,
		resetBreakpoint,
		addControls,
		removeControls,
		addButtonListener,
		addBreakpointListener,
		removeBreakpointListener,
		triggerBreakpoint,
		previewFrame,
		previewButton,
		previewFrameName,
		breakpointContainer,
		body = document.body,
		editorContainer = document.getElementById( 'wpwrap' ),
		previewContainer = document.getElementsByClassName( 'irp-container' ),
		previewAction = document.getElementById( 'preview-action' ),
		wpPublishingActions = document.getElementById( 'minor-publishing-actions' );

	/**
	 * Set up the handlers to activate responsive preview.
	 */
	init = function() {

		// Clone the Preview Button.
		inlineContainer = previewAction.cloneNode( true );
		inlineContainer.setAttribute( 'id', 'inline-preview-action' );
		inlineContainer.setAttribute( 'class', 'inline-preview-action' );
		wpPublishingActions.append( inlineContainer );
		inlineButton = document.getElementById( 'inline-preview-action' ).getElementsByClassName( 'button' );
		previewButton = document.getElementById( 'preview-action' ).getElementsByClassName( 'button' );
		inlineButton[0].setAttribute( 'id', 'inline-preview' );
		inlineButton[0].setAttribute( 'class', 'inline-preview button' );
		inlineButton[0].innerHTML = 'Inline Preview';
		previewButton[0].setAttribute( 'target', 'wp-preview' );

		addButtonListener();
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
	 * Add preview button listener to trigger iframe.
	 */
	addButtonListener = function() {
		var button = document.getElementsByClassName( 'inline-preview' ),
			i;
		for ( i = 0; i < button.length; i++ ) {
			button[i].addEventListener( 'click', triggerPreview );
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
	 * Triggers the resizing of the iframe, based on the breakpoint size.
	 */
	triggerBreakpoint = function( element ) {
		var size = element.target.getAttribute( 'data-breakpoint' );

		element.preventDefault();
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
} ( jQuery, IRP ) );

( function() {
	IRP.previews.init();
} ( IRP ) );
