(function($, Drupal) {
    Drupal.behaviors.albany_slide_controls = {
        attach: function(context, settings) {
            $('.flexslider.optionset-hero-slider').bind('start', function(e, slider) {
                if (slider.last == 0) {
                    $(this).addClass('hero-width');
                    var $slide = $(this).find('ul.slides > li:eq(0)');
                    $(this).empty();
                    $(this).append('<ul class="slides"></ul>');
                    $(this).find('ul.slides').append($slide);
                    $(this).flexslider({
                        animation: "slide",
                        animationLoop: false,
                        minItems: 1,
                        maxItems: 1,
                        controlNav: false,
                        touch: false,
                        animationSpeed: 0,
                        direction: "horizontal",
                        slideshow: false,
                        easing: "swing",
                        smoothHeight: false,
                        reverse: false,
                        slideshowSpeed: 0,
                        randomize: false,
                        startAt: 0,
                        itemWidth: 0,
                        itemMargin: 0,
                        move: 0,
                        directionNav: false,
                        controlNav: false,
                        thumbCaptions: false,
                        thumbCaptionsBoth: false,
                        keyboard: false,
                        multipleKeyboard: false,
                        mousewheel: false,
                        prevText: "Previous",
                        nextText: "Next",
                        namespace: "flex-",
                        selector: ".slides \u003E li",
                        sync: "",
                        asNavFor: "",
                        initDelay: 0,
                        useCSS: true,
                        video: false,
                        pausePlay: false,
                        pauseText: "Pause",
                        playText: "Play",
                        pauseOnAction: true,
                        pauseOnHover: false,
                        controlsContainer: "",
                        manualControls: ""
                    });
                }
            });

            if ($('.flexslider.optionset-gallery-slider').length && !$('.flexslider.optionset-gallery-slider').hasClass('match-heights')) {
                $('.flexslider.optionset-gallery-slider').addClass('match-heights');

                $('.flexslider.optionset-gallery-slider').bind('start', function(e, slider) {
                    $(this).find('ul.slides li').removeClass('flex-active-slide');
                    $(this).find('ul.slides li:eq(' + slider.currentSlide + ')').addClass('flex-active-slide');
                    var imgHeight = $(this).find('ul.slides li:eq(' + slider.currentSlide + ') .views-field-field-slide-image img').height();
                    $(this).find('.flex-control-paging').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 26) + 'px'
                    });
                    $(this).find('.flex-pauseplay').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 6) + 'px'
                    });
                    $(this).find('.flex-direction-nav a').css({
                        'top': ((imgHeight / 2) - 22) + 'px'
                    });
                });

                $('.flexslider.optionset-gallery-slider').bind('after', function(e, slider) {
                    $(this).find('ul.slides li').removeClass('flex-active-slide');
                    $(this).find('ul.slides li:eq(' + slider.currentSlide + ')').addClass('flex-active-slide');
                    var imgHeight = $(this).find('ul.slides li:eq(' + slider.currentSlide + ') .views-field-field-slide-image img').height();
                    $(this).find('.flex-control-paging').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 26) + 'px'
                    });
                    $(this).find('.flex-pauseplay').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 6) + 'px'
                    });
                    $(this).find('.flex-direction-nav a').css({
                        'top': ((imgHeight / 2) - 22) + 'px'
                    });
                });

                $(window).resize(function() {
                    var imgHeight = $('.flexslider.optionset-gallery-slider').find('ul.slides li.flex-active-slide .views-field-field-slide-image img').height();
                    $('.flexslider.optionset-gallery-slider').find('.flex-control-paging').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 26) + 'px'
                    });
                    $('.flexslider.optionset-gallery-slider').find('.flex-pauseplay').css({
                        'bottom': 'auto',
                        'top': (imgHeight - 6) + 'px'
                    });
                    $('.flexslider.optionset-gallery-slider').find('.flex-direction-nav a').css({
                        'top': ((imgHeight / 2) - 22) + 'px'
                    });
                });
            }
        }
    };
})(jQuery, Drupal);