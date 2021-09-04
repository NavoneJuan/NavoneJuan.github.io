/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
    var gridpal_secondary_container, gridpal_secondary_button, gridpal_secondary_menu, gridpal_secondary_links, gridpal_secondary_i, gridpal_secondary_len;

    gridpal_secondary_container = document.getElementById( 'gridpal-secondary-navigation' );
    if ( ! gridpal_secondary_container ) {
        return;
    }

    gridpal_secondary_button = gridpal_secondary_container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof gridpal_secondary_button ) {
        return;
    }

    gridpal_secondary_menu = gridpal_secondary_container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof gridpal_secondary_menu ) {
        gridpal_secondary_button.style.display = 'none';
        return;
    }

    gridpal_secondary_menu.setAttribute( 'aria-expanded', 'false' );
    if ( -1 === gridpal_secondary_menu.className.indexOf( 'nav-menu' ) ) {
        gridpal_secondary_menu.className += ' nav-menu';
    }

    gridpal_secondary_button.onclick = function() {
        if ( -1 !== gridpal_secondary_container.className.indexOf( 'gridpal-toggled' ) ) {
            gridpal_secondary_container.className = gridpal_secondary_container.className.replace( ' gridpal-toggled', '' );
            gridpal_secondary_button.setAttribute( 'aria-expanded', 'false' );
            gridpal_secondary_menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            gridpal_secondary_container.className += ' gridpal-toggled';
            gridpal_secondary_button.setAttribute( 'aria-expanded', 'true' );
            gridpal_secondary_menu.setAttribute( 'aria-expanded', 'true' );
        }
    };

    // Get all the link elements within the menu.
    gridpal_secondary_links    = gridpal_secondary_menu.getElementsByTagName( 'a' );

    // Each time a menu link is focused or blurred, toggle focus.
    for ( gridpal_secondary_i = 0, gridpal_secondary_len = gridpal_secondary_links.length; gridpal_secondary_i < gridpal_secondary_len; gridpal_secondary_i++ ) {
        gridpal_secondary_links[gridpal_secondary_i].addEventListener( 'focus', gridpal_secondary_toggleFocus, true );
        gridpal_secondary_links[gridpal_secondary_i].addEventListener( 'blur', gridpal_secondary_toggleFocus, true );
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function gridpal_secondary_toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .nav-menu.
        while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

            // On li elements toggle the class .focus.
            if ( 'li' === self.tagName.toLowerCase() ) {
                if ( -1 !== self.className.indexOf( 'gridpal-focus' ) ) {
                    self.className = self.className.replace( ' gridpal-focus', '' );
                } else {
                    self.className += ' gridpal-focus';
                }
            }

            self = self.parentElement;
        }
    }

    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */
    ( function( gridpal_secondary_container ) {
        var touchStartFn, gridpal_secondary_i,
            parentLink = gridpal_secondary_container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

        if ( 'ontouchstart' in window ) {
            touchStartFn = function( e ) {
                var menuItem = this.parentNode, gridpal_secondary_i;

                if ( ! menuItem.classList.contains( 'gridpal-focus' ) ) {
                    e.preventDefault();
                    for ( gridpal_secondary_i = 0; gridpal_secondary_i < menuItem.parentNode.children.length; ++gridpal_secondary_i ) {
                        if ( menuItem === menuItem.parentNode.children[gridpal_secondary_i] ) {
                            continue;
                        }
                        menuItem.parentNode.children[gridpal_secondary_i].classList.remove( 'gridpal-focus' );
                    }
                    menuItem.classList.add( 'gridpal-focus' );
                } else {
                    menuItem.classList.remove( 'gridpal-focus' );
                }
            };

            for ( gridpal_secondary_i = 0; gridpal_secondary_i < parentLink.length; ++gridpal_secondary_i ) {
                parentLink[gridpal_secondary_i].addEventListener( 'touchstart', touchStartFn, false );
            }
        }
    }( gridpal_secondary_container ) );
} )();


( function() {
    var gridpal_primary_container, gridpal_primary_button, gridpal_primary_menu, gridpal_primary_links, gridpal_primary_i, gridpal_primary_len;

    gridpal_primary_container = document.getElementById( 'gridpal-primary-navigation' );
    if ( ! gridpal_primary_container ) {
        return;
    }

    gridpal_primary_button = gridpal_primary_container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof gridpal_primary_button ) {
        return;
    }

    gridpal_primary_menu = gridpal_primary_container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof gridpal_primary_menu ) {
        gridpal_primary_button.style.display = 'none';
        return;
    }

    gridpal_primary_menu.setAttribute( 'aria-expanded', 'false' );
    if ( -1 === gridpal_primary_menu.className.indexOf( 'nav-menu' ) ) {
        gridpal_primary_menu.className += ' nav-menu';
    }

    gridpal_primary_button.onclick = function() {
        if ( -1 !== gridpal_primary_container.className.indexOf( 'gridpal-toggled' ) ) {
            gridpal_primary_container.className = gridpal_primary_container.className.replace( ' gridpal-toggled', '' );
            gridpal_primary_button.setAttribute( 'aria-expanded', 'false' );
            gridpal_primary_menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            gridpal_primary_container.className += ' gridpal-toggled';
            gridpal_primary_button.setAttribute( 'aria-expanded', 'true' );
            gridpal_primary_menu.setAttribute( 'aria-expanded', 'true' );
        }
    };

    // Get all the link elements within the menu.
    gridpal_primary_links    = gridpal_primary_menu.getElementsByTagName( 'a' );

    // Each time a menu link is focused or blurred, toggle focus.
    for ( gridpal_primary_i = 0, gridpal_primary_len = gridpal_primary_links.length; gridpal_primary_i < gridpal_primary_len; gridpal_primary_i++ ) {
        gridpal_primary_links[gridpal_primary_i].addEventListener( 'focus', gridpal_primary_toggleFocus, true );
        gridpal_primary_links[gridpal_primary_i].addEventListener( 'blur', gridpal_primary_toggleFocus, true );
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function gridpal_primary_toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .nav-menu.
        while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

            // On li elements toggle the class .focus.
            if ( 'li' === self.tagName.toLowerCase() ) {
                if ( -1 !== self.className.indexOf( 'gridpal-focus' ) ) {
                    self.className = self.className.replace( ' gridpal-focus', '' );
                } else {
                    self.className += ' gridpal-focus';
                }
            }

            self = self.parentElement;
        }
    }

    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */
    ( function( gridpal_primary_container ) {
        var touchStartFn, gridpal_primary_i,
            parentLink = gridpal_primary_container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

        if ( 'ontouchstart' in window ) {
            touchStartFn = function( e ) {
                var menuItem = this.parentNode, gridpal_primary_i;

                if ( ! menuItem.classList.contains( 'gridpal-focus' ) ) {
                    e.preventDefault();
                    for ( gridpal_primary_i = 0; gridpal_primary_i < menuItem.parentNode.children.length; ++gridpal_primary_i ) {
                        if ( menuItem === menuItem.parentNode.children[gridpal_primary_i] ) {
                            continue;
                        }
                        menuItem.parentNode.children[gridpal_primary_i].classList.remove( 'gridpal-focus' );
                    }
                    menuItem.classList.add( 'gridpal-focus' );
                } else {
                    menuItem.classList.remove( 'gridpal-focus' );
                }
            };

            for ( gridpal_primary_i = 0; gridpal_primary_i < parentLink.length; ++gridpal_primary_i ) {
                parentLink[gridpal_primary_i].addEventListener( 'touchstart', touchStartFn, false );
            }
        }
    }( gridpal_primary_container ) );
} )();
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */