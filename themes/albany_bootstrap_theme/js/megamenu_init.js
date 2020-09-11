(function($, Drupal) {
    Drupal.behaviors.megamenu = {
        attach: function(context, settings) {
            if (!$('.megamenu').hasClass('megamenu-init')) {
                //$('.megamenu').append('<a href="#" class="megamenu-close" id="block-mainnavigation-menu" title="Close Main Menu"><span class="sr-only">Close main menu</span></a>').children('h2').remove();
                $('.megamenu').children('h2').remove();
                $('.megamenu').children('div').remove();
                $('.megamenu > ul > li > ul > li').addClass('accessible-megamenu-panel-group').children('a').click(function(e) {
                    e.preventDefault();
                });
                $('.megamenu').accessibleMegaMenu().addClass('megamenu-init').attr('aria-labelledby', '');
                $('a.megamenu-toggle').click(function(e) {
                    e.preventDefault();
                });
            }
        }
    };
})(jQuery, Drupal);