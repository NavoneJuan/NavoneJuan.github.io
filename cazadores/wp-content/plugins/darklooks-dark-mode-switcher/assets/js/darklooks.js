(function($) {

    let darkModeClass = 'darklooks-mode-changer-enabled',
        dark_mode_storage_key  = 'darklooksDarkModeEnabled',
        $is_dark = localStorage.getItem(dark_mode_storage_key),
        $modeChanger = $('.darklooks-mode-changer');


    // Enabled Time based mode
    if( darklooksFrontendObject.modetime || $is_dark ) {
        // is mode time active 
        $is_dark = true;
        // 
        operationBunker();
    }

    // Mode changing
    $modeChanger.on( 'click', function() {
        $is_dark = $(this).is(':checked');
        //
        operationBunker();
    } )

/**
 *  OS Dark/Light
 * 
 */

if( darklooksFrontendObject.is_os ) {
    
    // OS Dark Event
    if( window.matchMedia('(prefers-color-scheme: dark)').matches ) {
        $is_dark = true;
        //
        operationBunker();
    }

    // OS Light Event
    if( window.matchMedia('(prefers-color-scheme: light)').matches ) {
        $is_dark = false;
        //
        operationBunker();
    }
}

/**
 *  Image and logo change on mode
 * 
 */
function operationBunker() {

let getLogoUrl = darklooksFrontendObject.site_logo,
    lightLogo  = getLogoUrl.light_logo,
    darkLogo   = getLogoUrl.dark_logo,
    getImages  = darklooksFrontendObject.images,
    $switch = $('.darklooks-mode-changer'),
    $html = $('html');

    if( $is_dark ) {
        // Add Dark Class
        $html.addClass(darkModeClass);
        // Add checked attr in switcher
        $switch.attr( 'checked', true );
        //Dark mode enabled status set in local store
        localStorage.setItem(dark_mode_storage_key, $is_dark );
        // Dark Logo
        $('[src="'+lightLogo+'"]').attr( {src: darkLogo,srcset:darkLogo} );
        // Show dark image 
        $.each( getImages, function( key, item ) {
            $('[src="'+item[0]+'"]').attr( {src: item[1],srcset:item[1]} );
        } )

    } else {

        // Remove Dark Class
        $html.removeClass(darkModeClass);
        // Remove checked attr in switcher
        $switch.attr( 'checked', false );
        // remove dark mode enabled status from local store
        localStorage.removeItem(dark_mode_storage_key);
        // Light Logo
        $('[src="'+darkLogo+'"]').attr( {src: lightLogo,srcset:lightLogo} );
        // Show light image 
        $.each( getImages, function( key, item ) {
            $('[src="'+item[1]+'"]').attr( {src: item[0],srcset:item[0]} );
        } )
    }
}


/**
 * 
 * Dark mode neglect background selector
 * 
 */
 
function neglect_bg_elements() {

    document.querySelectorAll( "div, section, header, footer, main, aside" ).forEach( function(e) {

        if( "none" !== window.getComputedStyle(e, null).backgroundImage ) {
            e.classList.add("dl-dark-neglect");
            e.querySelectorAll("*").forEach(function (e) {
                return e.classList.add("dl-dark-neglect");
            })
        }

    });
}
document.addEventListener("DOMContentLoaded", neglect_bg_elements);


})(jQuery)