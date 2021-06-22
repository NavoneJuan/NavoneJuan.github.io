/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
    var gridnext_secondary_container, gridnext_secondary_button, gridnext_secondary_menu, gridnext_secondary_links, gridnext_secondary_i, gridnext_secondary_len;

    gridnext_secondary_container = document.getElementById( 'gridnext-secondary-navigation' );
    if ( ! gridnext_secondary_container ) {
        return;
    }

    gridnext_secondary_button = gridnext_secondary_container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof gridnext_secondary_button ) {
        return;
    }

    gridnext_secondary_menu = gridnext_secondary_container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof gridnext_secondary_menu ) {
        gridnext_secondary_button.style.display = 'none';
        return;
    }

    gridnext_secondary_menu.setAttribute( 'aria-expanded', 'false' );
    if ( -1 === gridnext_secondary_menu.className.indexOf( 'nav-menu' ) ) {
        gridnext_secondary_menu.className += ' nav-menu';
    }

    gridnext_secondary_button.onclick = function() {
        if ( -1 !== gridnext_secondary_container.className.indexOf( 'gridnext-toggled' ) ) {
            gridnext_secondary_container.className = gridnext_secondary_container.className.replace( ' gridnext-toggled', '' );
            gridnext_secondary_button.setAttribute( 'aria-expanded', 'false' );
            gridnext_secondary_menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            gridnext_secondary_container.className += ' gridnext-toggled';
            gridnext_secondary_button.setAttribute( 'aria-expanded', 'true' );
            gridnext_secondary_menu.setAttribute( 'aria-expanded', 'true' );
        }
    };

    // Get all the link elements within the menu.
    gridnext_secondary_links    = gridnext_secondary_menu.getElementsByTagName( 'a' );

    // Each time a menu link is focused or blurred, toggle focus.
    for ( gridnext_secondary_i = 0, gridnext_secondary_len = gridnext_secondary_links.length; gridnext_secondary_i < gridnext_secondary_len; gridnext_secondary_i++ ) {
        gridnext_secondary_links[gridnext_secondary_i].addEventListener( 'focus', gridnext_secondary_toggleFocus, true );
        gridnext_secondary_links[gridnext_secondary_i].addEventListener( 'blur', gridnext_secondary_toggleFocus, true );
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function gridnext_secondary_toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .nav-menu.
        while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

            // On li elements toggle the class .focus.
            if ( 'li' === self.tagName.toLowerCase() ) {
                if ( -1 !== self.className.indexOf( 'gridnext-focus' ) ) {
                    self.className = self.className.replace( ' gridnext-focus', '' );
                } else {
                    self.className += ' gridnext-focus';
                }
            }

            self = self.parentElement;
        }
    }

    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */
    ( function( gridnext_secondary_container ) {
        var touchStartFn, gridnext_secondary_i,
            parentLink = gridnext_secondary_container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

        if ( 'ontouchstart' in window ) {
            touchStartFn = function( e ) {
                var menuItem = this.parentNode, gridnext_secondary_i;

                if ( ! menuItem.classList.contains( 'gridnext-focus' ) ) {
                    e.preventDefault();
                    for ( gridnext_secondary_i = 0; gridnext_secondary_i < menuItem.parentNode.children.length; ++gridnext_secondary_i ) {
                        if ( menuItem === menuItem.parentNode.children[gridnext_secondary_i] ) {
                            continue;
                        }
                        menuItem.parentNode.children[gridnext_secondary_i].classList.remove( 'gridnext-focus' );
                    }
                    menuItem.classList.add( 'gridnext-focus' );
                } else {
                    menuItem.classList.remove( 'gridnext-focus' );
                }
            };

            for ( gridnext_secondary_i = 0; gridnext_secondary_i < parentLink.length; ++gridnext_secondary_i ) {
                parentLink[gridnext_secondary_i].addEventListener( 'touchstart', touchStartFn, false );
            }
        }
    }( gridnext_secondary_container ) );
} )();


( function() {
    var gridnext_primary_container, gridnext_primary_button, gridnext_primary_menu, gridnext_primary_links, gridnext_primary_i, gridnext_primary_len;

    gridnext_primary_container = document.getElementById( 'gridnext-primary-navigation' );
    if ( ! gridnext_primary_container ) {
        return;
    }

    gridnext_primary_button = gridnext_primary_container.getElementsByTagName( 'button' )[0];
    if ( 'undefined' === typeof gridnext_primary_button ) {
        return;
    }

    gridnext_primary_menu = gridnext_primary_container.getElementsByTagName( 'ul' )[0];

    // Hide menu toggle button if menu is empty and return early.
    if ( 'undefined' === typeof gridnext_primary_menu ) {
        gridnext_primary_button.style.display = 'none';
        return;
    }

    gridnext_primary_menu.setAttribute( 'aria-expanded', 'false' );
    if ( -1 === gridnext_primary_menu.className.indexOf( 'nav-menu' ) ) {
        gridnext_primary_menu.className += ' nav-menu';
    }

    gridnext_primary_button.onclick = function() {
        if ( -1 !== gridnext_primary_container.className.indexOf( 'gridnext-toggled' ) ) {
            gridnext_primary_container.className = gridnext_primary_container.className.replace( ' gridnext-toggled', '' );
            gridnext_primary_button.setAttribute( 'aria-expanded', 'false' );
            gridnext_primary_menu.setAttribute( 'aria-expanded', 'false' );
        } else {
            gridnext_primary_container.className += ' gridnext-toggled';
            gridnext_primary_button.setAttribute( 'aria-expanded', 'true' );
            gridnext_primary_menu.setAttribute( 'aria-expanded', 'true' );
        }
    };

    // Get all the link elements within the menu.
    gridnext_primary_links    = gridnext_primary_menu.getElementsByTagName( 'a' );

    // Each time a menu link is focused or blurred, toggle focus.
    for ( gridnext_primary_i = 0, gridnext_primary_len = gridnext_primary_links.length; gridnext_primary_i < gridnext_primary_len; gridnext_primary_i++ ) {
        gridnext_primary_links[gridnext_primary_i].addEventListener( 'focus', gridnext_primary_toggleFocus, true );
        gridnext_primary_links[gridnext_primary_i].addEventListener( 'blur', gridnext_primary_toggleFocus, true );
    }

    /**
     * Sets or removes .focus class on an element.
     */
    function gridnext_primary_toggleFocus() {
        var self = this;

        // Move up through the ancestors of the current link until we hit .nav-menu.
        while ( -1 === self.className.indexOf( 'nav-menu' ) ) {

            // On li elements toggle the class .focus.
            if ( 'li' === self.tagName.toLowerCase() ) {
                if ( -1 !== self.className.indexOf( 'gridnext-focus' ) ) {
                    self.className = self.className.replace( ' gridnext-focus', '' );
                } else {
                    self.className += ' gridnext-focus';
                }
            }

            self = self.parentElement;
        }
    }

    /**
     * Toggles `focus` class to allow submenu access on tablets.
     */
    ( function( gridnext_primary_container ) {
        var touchStartFn, gridnext_primary_i,
            parentLink = gridnext_primary_container.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

        if ( 'ontouchstart' in window ) {
            touchStartFn = function( e ) {
                var menuItem = this.parentNode, gridnext_primary_i;

                if ( ! menuItem.classList.contains( 'gridnext-focus' ) ) {
                    e.preventDefault();
                    for ( gridnext_primary_i = 0; gridnext_primary_i < menuItem.parentNode.children.length; ++gridnext_primary_i ) {
                        if ( menuItem === menuItem.parentNode.children[gridnext_primary_i] ) {
                            continue;
                        }
                        menuItem.parentNode.children[gridnext_primary_i].classList.remove( 'gridnext-focus' );
                    }
                    menuItem.classList.add( 'gridnext-focus' );
                } else {
                    menuItem.classList.remove( 'gridnext-focus' );
                }
            };

            for ( gridnext_primary_i = 0; gridnext_primary_i < parentLink.length; ++gridnext_primary_i ) {
                parentLink[gridnext_primary_i].addEventListener( 'touchstart', touchStartFn, false );
            }
        }
    }( gridnext_primary_container ) );
} )();
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */