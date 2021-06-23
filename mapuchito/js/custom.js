jQuery(document).ready(function($) {
    'use strict';

    if(gridnext_ajax_object.secondary_menu_active){

        $(".gridnext-nav-secondary .gridnext-secondary-nav-menu").addClass("gridnext-secondary-responsive-menu");

        $( ".gridnext-secondary-responsive-menu-icon" ).on( "click", function() {
            $(this).next(".gridnext-nav-secondary .gridnext-secondary-nav-menu").slideToggle();
        });

        $(window).on( "resize", function() {
            if(window.innerWidth > 1112) {
                $(".gridnext-nav-secondary .gridnext-secondary-nav-menu, nav .sub-menu, nav .children").removeAttr("style");
                $(".gridnext-secondary-responsive-menu > li").removeClass("gridnext-secondary-menu-open");
            }
        });

        $( ".gridnext-secondary-responsive-menu > li" ).on( "click", function(event) {
            if (event.target !== this)
            return;
            $(this).find(".sub-menu:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-secondary-menu-open");
            $(this).find(".children:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-secondary-menu-open");
        });

        $( "div.gridnext-secondary-responsive-menu > ul > li" ).on( "click", function(event) {
            if (event.target !== this)
                return;
            $(this).find("ul:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-secondary-menu-open");
        });

    }

    if(gridnext_ajax_object.primary_menu_active){

        $(".gridnext-nav-primary .gridnext-primary-nav-menu").addClass("gridnext-primary-responsive-menu");

        $( ".gridnext-primary-responsive-menu-icon" ).on( "click", function() {
            $(this).next(".gridnext-nav-primary .gridnext-primary-nav-menu").slideToggle();
        });

        $(window).on( "resize", function() {
            if(window.innerWidth > 1112) {
                $(".gridnext-nav-primary .gridnext-primary-nav-menu, nav .sub-menu, nav .children").removeAttr("style");
                $(".gridnext-primary-responsive-menu > li").removeClass("gridnext-primary-menu-open");
            }
        });

        $( ".gridnext-primary-responsive-menu > li" ).on( "click", function(event) {
            if (event.target !== this)
            return;
            $(this).find(".sub-menu:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-primary-menu-open");
            $(this).find(".children:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-primary-menu-open");
        });

        $( "div.gridnext-primary-responsive-menu > ul > li" ).on( "click", function(event) {
            if (event.target !== this)
                return;
            $(this).find("ul:first").toggleClass('gridnext-submenu-toggle').parent().toggleClass("gridnext-primary-menu-open");
        });

    }

    if($(".gridnext-sidebar-one-wrapper").length){
    $(".gridnext-main-wrapper").before($(".gridnext-sidebar-one-wrapper"));
    $(window).on( "resize", function() {
        if(window.innerWidth > 960) {
            $(".gridnext-main-wrapper").before($(".gridnext-sidebar-one-wrapper"));
        } else {
            $(".gridnext-main-wrapper").after($(".gridnext-sidebar-one-wrapper"));
        }
    });
    }

    if($(".gridnext-header-social-icon-search").length){
        $(".gridnext-header-social-icon-search").on('click', function (e) {
            e.preventDefault();
            //document.getElementById("gridnext-search-overlay-wrap").style.display = "block";
            $("#gridnext-search-overlay-wrap").fadeIn();
            const gridnext_focusableelements = 'button, [href], input';
            const gridnext_search_modal = document.querySelector('#gridnext-search-overlay-wrap');
            const gridnext_firstfocusableelement = gridnext_search_modal.querySelectorAll(gridnext_focusableelements)[0];
            const gridnext_focusablecontent = gridnext_search_modal.querySelectorAll(gridnext_focusableelements);
            const gridnext_lastfocusableelement = gridnext_focusablecontent[gridnext_focusablecontent.length - 1];
            document.addEventListener('keydown', function(e) {
              let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
              if (!isTabPressed) {
                return;
              }
              if (e.shiftKey) {
                if (document.activeElement === gridnext_firstfocusableelement) {
                  gridnext_lastfocusableelement.focus();
                  e.preventDefault();
                }
              } else {
                if (document.activeElement === gridnext_lastfocusableelement) {
                  gridnext_firstfocusableelement.focus();
                  e.preventDefault();
                }
              }
            });
            gridnext_firstfocusableelement.focus();
        });
    }

    if($(".gridnext-search-closebtn").length){
        $(".gridnext-search-closebtn").on('click', function (e) {
            e.preventDefault();
            //document.getElementById("gridnext-search-overlay-wrap").style.display = "none";
            $("#gridnext-search-overlay-wrap").fadeOut();
        });
    }

    if(gridnext_ajax_object.fitvids_active){
        $(".entry-content, .widget").fitVids();
    }

    if($(".gridnext-scroll-top").length){
        var gridnext_scroll_button = $( '.gridnext-scroll-top' );
        gridnext_scroll_button.hide();

        $( window ).on( "scroll", function() {
            if ( $( window ).scrollTop() < 20 ) {
                $( '.gridnext-scroll-top' ).fadeOut();
            } else {
                $( '.gridnext-scroll-top' ).fadeIn();
            }
        } );

        gridnext_scroll_button.on( "click", function() {
            $( "html, body" ).animate( { scrollTop: 0 }, 300 );
            return false;
        } );
    }

    if(gridnext_ajax_object.sticky_header_active){

    // grab the initial top offset of the navigation 
    var gridnextstickyheadertop = $('#gridnext-header-end').offset().top;
    
    // our function that decides weather the navigation bar should have "fixed" css position or not.
    var gridnextstickyheader = function(){
        var gridnextscrolltop = $(window).scrollTop(); // our current vertical position from the top
             
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative
        if(window.innerWidth > 1112) {
            if (gridnextscrolltop > gridnextstickyheadertop) {
                $('.gridnext-site-header').addClass('gridnext-fixed');
            } else {
                $('.gridnext-site-header').removeClass('gridnext-fixed');
            }
        }
    };

    gridnextstickyheader();
    // and run it again every time you scroll
    $(window).on( "scroll", function() {
        gridnextstickyheader();
    });

    }

    if(gridnext_ajax_object.sticky_sidebar_active){
        $('.gridnext-main-wrapper, .gridnext-sidebar-one-wrapper').theiaStickySidebar({
            containerSelector: ".gridnext-content-wrapper",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            minWidth: 960,
        });

        $(window).on( "resize", function() {
            $('.gridnext-main-wrapper, .gridnext-sidebar-one-wrapper').theiaStickySidebar({
                containerSelector: ".gridnext-content-wrapper",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                minWidth: 960,
            });
        });
    }

});
/*This file was exported by "Export WP Page to Static HTML" plugin which created by ReCorp (https://myrecorp.com) */