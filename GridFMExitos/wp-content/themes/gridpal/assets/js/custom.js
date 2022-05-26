jQuery(document).ready(function($) {
    'use strict';

    if(gridpal_ajax_object.secondary_menu_active){
        $(".gridpal-nav-secondary .gridpal-secondary-nav-menu").addClass("gridpal-secondary-responsive-menu");

        $( ".gridpal-secondary-responsive-menu-icon" ).on( "click", function() {
            $(this).next(".gridpal-nav-secondary .gridpal-secondary-nav-menu").slideToggle();
        });

        $(window).on( "resize", function() {
            if(window.innerWidth > 1112) {
                $(".gridpal-nav-secondary .gridpal-secondary-nav-menu, nav .sub-menu, nav .children").removeAttr("style");
                $(".gridpal-secondary-responsive-menu > li").removeClass("gridpal-secondary-menu-open");
            }
        });

        $( ".gridpal-secondary-responsive-menu > li" ).on( "click", function(event) {
            if (event.target !== this)
            return;
            $(this).find(".sub-menu:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-secondary-menu-open");
            $(this).find(".children:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-secondary-menu-open");
        });

        $( "div.gridpal-secondary-responsive-menu > ul > li" ).on( "click", function(event) {
            if (event.target !== this)
                return;
            $(this).find("ul:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-secondary-menu-open");
        });
    }

    if(gridpal_ajax_object.primary_menu_active){
        $(".gridpal-nav-primary .gridpal-primary-nav-menu").addClass("gridpal-primary-responsive-menu");

        $( ".gridpal-primary-responsive-menu-icon" ).on( "click", function() {
            $(this).next(".gridpal-nav-primary .gridpal-primary-nav-menu").slideToggle();
        });

        $(window).on( "resize", function() {
            if(window.innerWidth > 1112) {
                $(".gridpal-nav-primary .gridpal-primary-nav-menu, nav .sub-menu, nav .children").removeAttr("style");
                $(".gridpal-primary-responsive-menu > li").removeClass("gridpal-primary-menu-open");
            }
        });

        $( ".gridpal-primary-responsive-menu > li" ).on( "click", function(event) {
            if (event.target !== this)
            return;
            $(this).find(".sub-menu:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-primary-menu-open");
            $(this).find(".children:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-primary-menu-open");
        });

        $( "div.gridpal-primary-responsive-menu > ul > li" ).on( "click", function(event) {
            if (event.target !== this)
                return;
            $(this).find("ul:first").toggleClass('gridpal-submenu-toggle').parent().toggleClass("gridpal-primary-menu-open");
        });
    }

    if($(".gridpal-sidebar-one-wrapper").length){
    $(".gridpal-main-wrapper").before($(".gridpal-sidebar-one-wrapper"));
    $(window).on( "resize", function() {
        if(window.innerWidth > 960) {
            $(".gridpal-main-wrapper").before($(".gridpal-sidebar-one-wrapper"));
        } else {
            $(".gridpal-main-wrapper").after($(".gridpal-sidebar-one-wrapper"));
        }
    });
    }

    if($(".gridpal-header-social-icon-search").length){
        $(".gridpal-header-social-icon-search").on('click', function (e) {
            e.preventDefault();
            //document.getElementById("gridpal-search-overlay-wrap").style.display = "block";
            $("#gridpal-search-overlay-wrap").fadeIn();
            const gridpal_focusableelements = 'button, [href], input';
            const gridpal_search_modal = document.querySelector('#gridpal-search-overlay-wrap');
            const gridpal_firstfocusableelement = gridpal_search_modal.querySelectorAll(gridpal_focusableelements)[0];
            const gridpal_focusablecontent = gridpal_search_modal.querySelectorAll(gridpal_focusableelements);
            const gridpal_lastfocusableelement = gridpal_focusablecontent[gridpal_focusablecontent.length - 1];
            document.addEventListener('keydown', function(e) {
              let isTabPressed = e.key === 'Tab' || e.keyCode === 9;
              if (!isTabPressed) {
                return;
              }
              if (e.shiftKey) {
                if (document.activeElement === gridpal_firstfocusableelement) {
                  gridpal_lastfocusableelement.focus();
                  e.preventDefault();
                }
              } else {
                if (document.activeElement === gridpal_lastfocusableelement) {
                  gridpal_firstfocusableelement.focus();
                  e.preventDefault();
                }
              }
            });
            gridpal_firstfocusableelement.focus();
        });
    }

    if($(".gridpal-search-closebtn").length){
        $(".gridpal-search-closebtn").on('click', function (e) {
            e.preventDefault();
            //document.getElementById("gridpal-search-overlay-wrap").style.display = "none";
            $("#gridpal-search-overlay-wrap").fadeOut();
        });
    }

    if(gridpal_ajax_object.fitvids_active){
        $(".entry-content, .widget").fitVids();
    }

    if($(".gridpal-scroll-top").length){
        var gridpal_scroll_button = $( '.gridpal-scroll-top' );
        gridpal_scroll_button.hide();

        $( window ).on( "scroll", function() {
            if ( $( window ).scrollTop() < 20 ) {
                $( '.gridpal-scroll-top' ).fadeOut();
            } else {
                $( '.gridpal-scroll-top' ).fadeIn();
            }
        } );

        gridpal_scroll_button.on( "click", function() {
            $( "html, body" ).animate( { scrollTop: 0 }, 300 );
            return false;
        } );
    }

    if(gridpal_ajax_object.sticky_header_active){

    // grab the initial top offset of the navigation 
    var gridpalstickyheadertop = $('#gridpal-header-end').offset().top;
    
    // our function that decides weather the navigation bar should have "fixed" css position or not.
    var gridpalstickyheader = function(){
        var gridpalscrolltop = $(window).scrollTop(); // our current vertical position from the top
             
        // if we've scrolled more than the navigation, change its position to fixed to stick to top,
        // otherwise change it back to relative

        if(gridpal_ajax_object.sticky_header_mobile_active){
            if (gridpalscrolltop > gridpalstickyheadertop) {
                $('.gridpal-site-header').addClass('gridpal-fixed');
            } else {
                $('.gridpal-site-header').removeClass('gridpal-fixed');
            }
        } else {
            if(window.innerWidth > 1112) {
                if (gridpalscrolltop > gridpalstickyheadertop) {
                    $('.gridpal-site-header').addClass('gridpal-fixed');
                } else {
                    $('.gridpal-site-header').removeClass('gridpal-fixed');
                }
            }
        }
    };

    gridpalstickyheader();
    // and run it again every time you scroll
    $(window).on( "scroll", function() {
        gridpalstickyheader();
    });

    }

    if(gridpal_ajax_object.sticky_sidebar_active){
        $('.gridpal-main-wrapper, .gridpal-sidebar-one-wrapper, .gridpal-sidebar-two-wrapper').theiaStickySidebar({
            containerSelector: ".gridpal-content-wrapper",
            additionalMarginTop: 0,
            additionalMarginBottom: 0,
            minWidth: 960,
        });

        $(window).on( "resize", function() {
            $('.gridpal-main-wrapper, .gridpal-sidebar-one-wrapper, .gridpal-sidebar-two-wrapper').theiaStickySidebar({
                containerSelector: ".gridpal-content-wrapper",
                additionalMarginTop: 0,
                additionalMarginBottom: 0,
                minWidth: 960,
            });
        });
    }

    // init Masonry
    var $gridpal_grid = $('.gridpal-posts-grid').masonry({
      itemSelector: '.gridpal-grid-post',
      columnWidth: gridpal_ajax_object.columnwidth,
      gutter: gridpal_ajax_object.gutter,
      percentPosition: true,
      transitionDuration: '0.4s'
    });
    // layout Masonry after each image loads
    $gridpal_grid.imagesLoaded().progress( function() {
      $gridpal_grid.masonry('layout');
    });

    $(".gridpal-grid-posts").each(function(){
    var $thisgrid = $(this);

    // init Masonry
    var $gridpal_grid_widget = $thisgrid.masonry({
      itemSelector: '.gridpal-grid-post',
      columnWidth: $thisgrid.find(".gridpal-col-sizer")[0],
      gutter: $thisgrid.find(".gridpal-col-gutter")[0],
      percentPosition: true
    });
    // layout Masonry after each image loads
    $gridpal_grid_widget.imagesLoaded().progress( function() {
      $gridpal_grid_widget.masonry('layout');
    });

    });

});