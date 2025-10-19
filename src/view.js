/**
 * NavyGator Table of Contents - Frontend JavaScript
 * 
 * Handles:
 * - Mobile toggle functionality
 * - Scroll spy (active section highlighting)
 * - Smooth scrolling
 * - Drawer open/close
 */

( function() {
	'use strict';

	// Wait for DOM to be ready
	if ( document.readyState === 'loading' ) {
		document.addEventListener( 'DOMContentLoaded', init );
	} else {
		init();
	}

	function init() {
		const tocWrapper = document.querySelector( '.navygator-toc-wrapper' );
		
		if ( ! tocWrapper ) {
			return;
		}

		const toc = tocWrapper.querySelector( '.navygator-toc' );
		const toggleBtn = tocWrapper.querySelector( '.navygator-toc-toggle' );
		const closeBtn = tocWrapper.querySelector( '.navygator-toc-close' );
		const backdrop = tocWrapper.querySelector( '.navygator-toc-backdrop' );
		const tocLinks = tocWrapper.querySelectorAll( '.navygator-toc-link' );

		// Mobile toggle functionality
		if ( toggleBtn ) {
			toggleBtn.addEventListener( 'click', openDrawer );
		}

		if ( closeBtn ) {
			closeBtn.addEventListener( 'click', closeDrawer );
		}

		if ( backdrop ) {
			backdrop.addEventListener( 'click', closeDrawer );
		}

		// Close drawer on escape key
		document.addEventListener( 'keydown', function( e ) {
			if ( e.key === 'Escape' && toc && toc.classList.contains( 'is-open' ) ) {
				closeDrawer();
			}
		} );

		// Smooth scroll and close drawer on link click
		tocLinks.forEach( function( link ) {
			link.addEventListener( 'click', function( e ) {
				e.preventDefault();
				
				const targetId = this.getAttribute( 'href' ).substring( 1 );
				const targetElement = document.getElementById( targetId );

				if ( targetElement ) {
					// Close drawer on mobile
					if ( window.innerWidth <= 768 ) {
						closeDrawer();
					}

					// Smooth scroll to target
					const yOffset = -20; // Offset for fixed headers
					const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;

					window.scrollTo( {
						top: y,
						behavior: 'smooth'
					} );

					// Update URL hash without jumping
					if ( history.pushState ) {
						history.pushState( null, null, '#' + targetId );
					}
				}
			} );
		} );

		// Scroll spy - highlight active section
		setupScrollSpy( tocLinks );

		function openDrawer() {
			if ( toc ) {
				toc.classList.add( 'is-open' );
			}
			if ( backdrop ) {
				backdrop.classList.add( 'is-visible' );
			}
			document.body.classList.add( 'navygator-toc-open' );
		}

		function closeDrawer() {
			if ( toc ) {
				toc.classList.remove( 'is-open' );
			}
			if ( backdrop ) {
				backdrop.classList.remove( 'is-visible' );
			}
			document.body.classList.remove( 'navygator-toc-open' );
		}
	}

	/**
	 * Set up scroll spy using Intersection Observer
	 */
	function setupScrollSpy( tocLinks ) {
		// Get all heading IDs from TOC links
		const headingIds = Array.from( tocLinks ).map( function( link ) {
			return link.getAttribute( 'href' ).substring( 1 );
		} );

		// Get all heading elements
		const headings = headingIds
			.map( function( id ) {
				return document.getElementById( id );
			} )
			.filter( function( el ) {
				return el !== null;
			} );

		if ( headings.length === 0 ) {
			return;
		}

		// Create Intersection Observer
		const observerOptions = {
			rootMargin: '-20% 0px -35% 0px',
			threshold: 0
		};

		let activeHeading = null;

		const observer = new IntersectionObserver( function( entries ) {
			entries.forEach( function( entry ) {
				if ( entry.isIntersecting ) {
					activeHeading = entry.target;
					updateActiveLink( entry.target.id, tocLinks );
				}
			} );
		}, observerOptions );

		// Observe all headings
		headings.forEach( function( heading ) {
			observer.observe( heading );
		} );

		// Initial active state based on scroll position
		updateActiveLink( getActiveHeadingId( headings ), tocLinks );
	}

	/**
	 * Update active link in TOC
	 */
	function updateActiveLink( activeId, tocLinks ) {
		tocLinks.forEach( function( link ) {
			const linkId = link.getAttribute( 'href' ).substring( 1 );
			
			if ( linkId === activeId ) {
				link.classList.add( 'is-active' );
			} else {
				link.classList.remove( 'is-active' );
			}
		} );
	}

	/**
	 * Get the currently active heading ID based on scroll position
	 */
	function getActiveHeadingId( headings ) {
		const scrollPosition = window.scrollY + 100;

		for ( let i = headings.length - 1; i >= 0; i-- ) {
			const heading = headings[ i ];
			if ( heading.offsetTop <= scrollPosition ) {
				return heading.id;
			}
		}

		return headings[ 0 ] ? headings[ 0 ].id : null;
	}

} )();
