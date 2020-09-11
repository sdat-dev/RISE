(function(Drupal) {

    /* ensure any open panels are closed before showing selected */
    jQuery('.albany-utilities').on('show.bs.collapse', function() {
        jQuery('.albany-utilities .in').collapse('hide');
    });
    /* jQuery('.path-search form.search-page-form').attr('method','get').attr('onsubmit','return albany_search(type.value, albany_URLEncode(keywords.value));').attr('action',''); */
    var searchBlock = '<div class="search-block-form albany-utilities collapse small text-right"><form class="headerSearchForm form-type-search form-search" method="get" onsubmit="return albany_search(type.value, albany_URLEncode(keywords.value));" action="">	<select name="type" title="Select Search Type" class="headerSearchSelect" style="height:27px; display: none"><option selected="selected" value="GOOGLE">Albany Sites</option>	</select>	   <input type="text" name="keywords" value="" title="Search Input Box" size="45" class="headerSearchBox form-search glyphicon-search" />	<input type="submit" name="albanySearch" value="Search" title="Submit Search" class="headerSearchBtn form-submit search-button btn btn-sm btn-success s3-m-3" /></form></div>';

    jQuery(".region-navigation").append(searchBlock);

    jQuery("#block-topnav .albany-search-link").click(function() {
        if (jQuery(window).width() > 1045) {
            jQuery('.search-block-form').animate({
                width: 'toggle',
                paddingLeft: 'toggle',
                paddingRight: 'toggle'
            }, 320, function() {
                jQuery('.search-button .field--name-body a').toggleClass('open');
            });
        } else {
            jQuery('.search-block-form').slideToggle(320, function() {
                jQuery('.search-button .field--name-body a').toggleClass('open');
            });
        } /* jQuery('.search-block-form').fadeToggle('fast'); */
        /* jQuery( "#block-topnav .albany-utilities" ).collapse('toggle'); */
    });
    /*

    jQuery( "#block-userlinksheadermenu-3" ).append( searchBlock );
    jQuery( "#block-userlinksheadermenu-3 .albany-search-link" ).click(function() {
      jQuery( "#block-userlinksheadermenu-3 .albany-utilities" ).collapse('toggle');
    });
    */

})(Drupal);

/* caller url-encodes 'keywords' */
function albany_search(type, keywords) {
    var searchURL = '';
    switch (type) {
        /*
              case 'SITE':
                searchURL = '/search/node?keys=' + keywords;
                break;
        */
        case 'GOOGLE':
        default:

            searchURL = 'https://www.albany.edu/search/search_results.php?cx=009452333206896616693%3Aabbjmkl5yry&cof=FORID%3A11&ie=UTF-8&sa.x=0&sa.y=0&sa=Search&siteurl=www.albany.edu%2F&ref=www.google.com%2F&ss=233j24671j6&q=' + keywords;
            break;
    }
    //location.href = searchURL;
    window.open(searchURL, '_blank');
    return false;
}

function albany_URLEncode(url) {
    var safechars = "0123456789" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
        "abcdefghijklmnopqrstuvwxyz" +
        "-_.!~*'()";
    var hex = "0123456789ABCDEF";

    var plaintext = url;
    var encoded = "";
    for (var i = 0; i < plaintext.length; i++) {
        var ch = plaintext.charAt(i);
        if (ch == " ") {
            encoded += "+";
        } else if (safechars.indexOf(ch) != -1) {
            encoded += ch;
        } else {
            var charCode = ch.charCodeAt(0);
            if (charCode > 255) {
                encoded += "+";
            } else {
                encoded += "%";
                encoded += hex.charAt((charCode >> 4) & 0xF);
                encoded += hex.charAt(charCode & 0xF);
            }
        }
    }
    return encoded;
};
(function($, Drupal) {
    Drupal.behaviors.searchbutton = {
        attach: function(context, settings) {
            if (!$('.search-block-form').hasClass('search-processed')) {
                $('.search-block-form').addClass('search-processed');
                $('.search-button .field--name-body a').unbind().on('click', function(event) {
                    event.preventDefault();
                    if (jQuery(window).width() > 1045) {
                        jQuery('.search-block-form').animate({
                            width: 'toggle',
                            paddingLeft: 'toggle',
                            paddingRight: 'toggle'
                        }, 320, function() {
                            jQuery('.search-button .field--name-body a').toggleClass('open');
                        });
                    } else {
                        jQuery('.search-block-form').slideToggle(320, function() {
                            jQuery('.search-button .field--name-body a').toggleClass('open');
                        });
                    }
                });
            }
            /*
            if (!$('body').hasClass('proccessed-flex')) {
              console.log("what")
            $('.right-text-slideshow').each(function(){
              //remove nav button if only one
              if ($(this).find('.views-row').length == 1) {
                console.log('check');
                $(this).find$('.left-button').remove();
                $(this).find$('.right-button').remove();
                return;
              }
              $(this).find('.views-row').each(function(){
                console.log('check_2');
                var title =  $(this).find('.slide-text h1');
                var prev_title = '';
                var next_title = '';
                //if there is a previous button
                if ($(this).prev('.views-row').length != 0 ){
                  prev_title =$(this).prev('.views-row').find('.slide-text h1').text();

                }

                //get the last child
                else{
                  prev_title = $(this).last().find('.slide-text h1').text();
                }

                //find the next title

                if ($(this).next('.views-row').length != 0 ) {
                  next_title = $(this).next('.views-row').find('.slide-text h1').text();
                }
                //get the first title
                else {
                  next_title = $(this).first().find('.slide-text h1').text();
                }
                $(this).find('.left-button').text(prev_title);
                $(this).find('.right-button').text(next_title);
                          });
                $(this).flexslider();
                $(this).addClass("flexslider");
            });
            }
            //$('#flexslider-2').flexslider

            $('.left-button').unbind().click(function(){
            $(this).parents('.flexslider').flexslider('prev')
            });
            $('.right-button').unbind().click(function(){
            $(this).parents('.flexslider').flexslider('next')
            });
            */
            $('body').addClass("proccessed-flex");
        }
    }


})(jQuery, Drupal);