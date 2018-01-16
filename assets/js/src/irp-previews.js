/**
 * Inline Responsive Preview.
 */

/* global jQuery, InlineResponsivePreview */

var IRP = IRP || {};

IRP.previews = (function( $ ) {
	'use strict';

	var init,
		initPreview,
		checkPreview,
		closePreview,
		triggerPreview,
		setContainerWidth,
		sizeiframe,
		addControls,
		addBreakpointListener,
		triggerBreakpoint,
		animationDuration = 500,
		resizeTimer,
		body = $( 'body' ),
		windowWidth = $( window ).width(),
		editorContainer = $( '#wpwrap' ),
		previewContainer = $( '.irp-container' ),
		previewFrame = $( '.irp-iframe' ),
		previewButton = $( '#post-preview' ),
		previewFrameName,
		hiddenFrame,
		wpPublishingActions = document.getElementById( 'minor-publishing-actions' ),
		breakpointContainer;

	/**
	 * Set up the handlers to activate responsive preview.
	 */
	init = function() {
		$( 'a[id="post-preview"][href$="preview=true"]' ).on( 'click.irp', function() {
			initPreview();
		} );

		$( 'a[id!="post-preview"][href$="preview=true"]' ).on( 'click.irp', function() {
			IRP.utils.preventDefault();
			previewButton.click();
		} );
	};

	/**
	 * The user has initiated a preview.
	 */
	initPreview = function() {

		if ( ! checkPreview() ) {

			body.addClass( 'folded' );
			body.addClass( 'irp' );

			previewFrameName = $( '#post-preview' ).attr( 'target' ) || 'wp-preview';
			previewFrame = $( '<iframe class="irp-iframe"></iframe>' ).attr( 'name', previewFrameName );
			previewContainer = $( '<div class="irp-container"></div>' ).append( previewFrame );

			editorContainer.before( previewContainer );

			previewContainer.addClass( 'loading' );

			previewContainer.resizable( {
				minWidth: 420,
				handles: 'w',
				alsoResize: '#wpwrap',
				start: function() {
					previewContainer.css( 'z-index', '' );
				},
				resize: function( event, ui ) {
					editorContainer.css( 'padding-right', ui.size.width );
					window.scrollTop();
				},
				stop: function() {
					previewContainer.css( 'z-index', '1000' );
				}
			} );

			setContainerWidth( 360 );
			addControls();

			previewFrame.on( 'load.irp', function() {
				previewContainer.removeClass( 'loading' );
				previewFrameName = previewFrame.attr( 'name' );
				previewFrame.unbind( 'load.irp' ).removeAttr( 'name' );
				hiddenFrame = $( '<iframe class="irp-hidden-frame"></iframe>' );
				hiddenFrame.attr( 'name', previewFrameName );
				previewContainer.append( hiddenFrame );
			} );
		}
	};

	/**
	 * Checks if preview is active.
	 * @return {boolean} Preview iframe is active.
	 */
	checkPreview = function() {

		var preview = false;
		if ( body.hasClass( 'irp' ) ) {
			preview = true;
		}

		return preview;
	};

	/**
	 * Set the container width. Happens after a window resize or when the preview frame opens initially.
	 *
	 * @param {string} size Width of preview frame.
	 */
	setContainerWidth = function( size ) {

		var previewWidth = 480,
			editorWidthPx;

		if ( size ) {
			previewWidth = size;
		}

		previewContainer.css( 'left', windowWidth ).show();
		editorWidthPx = Math.round( windowWidth - previewWidth );

		previewContainer.css( 'width', previewWidth );

		editorContainer.animate(
			{ 'padding-right': previewWidth },
			{
				duration: animationDuration,
				queue: false
			}
		);

		previewContainer.animate(
			{ 'left': editorWidthPx },
			{
				duration: animationDuration,
				queue: false,
				complete: function() {}
			}
		);

		previewContainer
			.append(
				$( '<a class="irp-close media-modal-close">Close Preview<span' +
					' class="media-modal-icon"></span></a>' )
					.on( 'click.irp', function( e ) {
						IRP.utils.preventDefault( e );
						closePreview();
					} )
					.attr( 'title', InlineResponsivePreview.close_label )
			)
			.css( 'z-index', '1000' );
	};

	sizeiframe = function( size ) {
			$( '.irp-container' ).width( size );
	};

	triggerPreview = function( size ) {
		setContainerWidth( size );
	};

	/**
	 * Close the preview frame and event handlers, as if Preview was never clicked.
	 */
	closePreview = function() {

		$( document ).off( '.irp' );
		$( window ).off( '.irp' );
		body.removeClass( 'irp' );
		body.removeClass( 'folded' );
		$( '.irp-close' ).hide();
		$('.irp-breakpoint-list').hide();

		previewContainer.animate(
			{ 'left': $( window ).width() },
			{
				duration: animationDuration,
				queue: false,
				complete: function() {}
			}
		);

		editorContainer.animate(
			{ 'padding-right': '0' },
			{
				duration: animationDuration,
				queue: false
			}
		);
		previewContainer.remove();
		clearTimeout( resizeTimer );
	};

	addControls = function() {
		var smallLink = '<li class="irp-breakpoint-list-item"><a class="irp-breakpoint-list-item-link icon-small"' +
			' href="#" target="irp" data-breakpoint="360">XS</a></li>',
			mediumLink = '<li class="irp-breakpoint-list-item"><a class="irp-breakpoint-list-item-link icon-medium"' +
				' href="#" target="irp" data-breakpoint="668">MD</a></li>',
			newLink = '<li class="irp-breakpoint-list-item"><a class="irp-breakpoint-list-item-link icon-new"' +
				' href="#" target="blank">New</a></li>';
		breakpointContainer = document.createElement( 'ul' );
		breakpointContainer.setAttribute( 'class', 'irp-breakpoint-list' );
		wpPublishingActions.append( breakpointContainer );
		breakpointContainer.innerHTML = smallLink;
		breakpointContainer.innerHTML += mediumLink;
		breakpointContainer.innerHTML += newLink;
		addBreakpointListener();
	};

	addBreakpointListener = function() {
		var breakpoint = document.getElementsByClassName( 'irp-breakpoint-list-item-link' ),
			i;
		for ( i = 0; i < breakpoint.length; i++ ) {
			breakpoint[i].addEventListener( 'click', triggerBreakpoint );
		}
	};

	triggerBreakpoint = function( e ) {
		var size = e.target.getAttribute( 'data-breakpoint' );
		e.preventDefault();
		setContainerWidth( size );
	};

	return {
		init: init,
		initPreview: initPreview,
		checkPreview: checkPreview,
		triggerPreview: triggerPreview,
		closePreview: closePreview,
		setContainerWidth: setContainerWidth,
		sizeiframe: sizeiframe,
		addControls: addControls,
		addBreakpointListener: addBreakpointListener,
		triggerBreakpoint: triggerBreakpoint
	};
})( jQuery, IRP );

(function() {
	IRP.previews.init();
})( IRP );
