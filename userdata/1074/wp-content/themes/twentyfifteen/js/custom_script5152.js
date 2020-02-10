function checkHeight(e){var t=0,r=jQuery(e);jQuery(r).each(function(){var e=parseInt(jQuery(this).css("height"));e>t&&(t=e)}),t+=1,jQuery(r).each(function(){jQuery(this).css("height",t+"px")})}
jQuery(document).keydown(function (event) {
	if (event.keyCode == 123) {
		return false;
	}
	else if ((event.ctrlKey && event.shiftKey && event.keyCode == 73) || (event.ctrlKey && event.shiftKey && event.keyCode == 74)) {
		return false;
	}
});
function owlslider(){
	var shop_single = jQuery('.product-images-carousel');
	var product_thumbnail  = jQuery('.product-thumbs-carousel');
	if (jQuery(".easyzoom").length ) {
		if ( jQuery(window).width() > 1024 ) {
			var $easyzoom = jQuery(".easyzoom").easyZoom({
				loadingNotice: 'Loading image',
				errorNotice: '',
				preventClicks: false,
			});
		}
	}
	shop_single.owlCarousel({
			dots:false,
			nav:true,
			items:1,
	}).on('changed.owl.carousel', function (e) {
			var currentItem = e.item.index;
			product_thumbnail.find('.owl-item').fadeTo(100, 0.5);
			product_thumbnail.find('.owl-item').eq(currentItem).fadeTo(100, 1);
			product_thumbnail.trigger('to.owl.carousel', [currentItem, 300, true]);
	});
		
	product_thumbnail.owlCarousel({
		dots:false,
		nav:false,
		items:5,
		margin:5,
	}).on('click', '.owl-item',function(e) {
		shop_single.trigger('to.owl.carousel', [jQuery(this).index(), 500, true]); 
		/*product_thumbnail.find('.owl-item').fadeTo(100, 0.5);
		product_thumbnail.find('.owl-item').eq(jQuery(this).index()).fadeTo(100, 1);
		product_thumbnail.trigger('to.owl.carousel', [jQuery(this).index(), 300, true]);*/
	}).on('changed.owl.carousel', function (e) {
		shop_single.trigger('to.owl.carousel', [e.item.index, 300, true]);		
	});
}
function ajaxSearch(e) {
	var searchInput = jQuery(e.currentTarget),
		searchValues = searchInput.parents('form').serialize() + '&action=ajax_search',
		results = jQuery('.ajax-search-results'),
		loadingIndicator = jQuery('.search-box .ajax-loading'),
		searchIcon = jQuery('.ajax-search-submit');

	jQuery.ajax({
		url: MyAjax.ajaxurl,
		type: "POST",
		data: searchValues,
		beforeSend: function() {
			jQuery('.ajax-search-results').slideUp(200);
			searchIcon.fadeOut(300);
			setTimeout(function() {						
				loadingIndicator.fadeIn(300);
			}, 300);
		},
		success: function(response) {
			if (response === 0) {
				response = "";
			} else {
				results.html(response);
			}
		},
		complete: function() {
			loadingIndicator.fadeOut(300);
			setTimeout(function() {
				searchIcon.fadeIn(300);
				results.slideDown(400);
			}, 300);

		}
	});
}
waitJquery(function(){
		//jQuery("body").on("contextmenu",function(e){ return false; });
		//jQuery("body").bind("cut copy paste", function (e) {e.preventDefault();});
		if (jQuery('#menu-primary').length) {
			var obj = jQuery('#menu-primary li.menu-item-has-children');
			obj.prepend('<span class="submenu-button"></span>');
			jQuery('.submenu-button').click(function() {
				jQuery(this).toggleClass('submenu-opened');
				if (jQuery(this).siblings('ul').hasClass('open')) {
				  jQuery(this).siblings('ul').removeClass('open').hide();
				}
				else {
				  jQuery(this).siblings('ul').addClass('open').show();
				}
			});
		}
		/* map */
		jQuery('#contact-map').click(function () {
			jQuery('#contact-map iframe').css("pointer-events", "auto");
		});

		jQuery( "#contact-map" ).mouseleave(function() {
			jQuery('#contact-map iframe').css("pointer-events", "none"); 
		});
		/* Product category */
		 jQuery('.product-categories .has_children > a').each(function(){
            var childIndicator = jQuery('<span class="child-indicator"></span>');
            
            if(jQuery(this).siblings('.children').is(':visible')){
                childIndicator.addClass( 'open' );
            }
            
            childIndicator.click(function(){
                jQuery(this).parent().siblings('.children').slideToggle( 'fast', function(){
                    if(jQuery(this).is(':visible')){
                        childIndicator.addClass( 'open' );
                    }else{
                        childIndicator.removeClass( 'open' );
                    }
                });
                return false;
            });
            jQuery(this).append(childIndicator);
        });
		checkHeight('.products li');
		checkMinheight('.products li h4 ');
		
		jQuery('.news-slider').owlCarousel({
            items:4,
            dots:false,
            responsiveClass:true,
            nav:true,
            responsive:{
                0:{
                    items:1,
                },
                640:{
                    items:2,
                },
                1200:{
                    items:3,
                }
            }
        });	
		
		var lastAjaxSearchValue = "",
				searchTimer = false;


			// AJAX SEARCH

			jQuery(document).click(function (e)
			{
			    var container = jQuery(".ajax-search-results");

			    if (!container.is(e.target)
			        && container.has(e.target).length === 0)
			    {
			        container.hide();
			    }
			});


			// AJAX SEARCH INPUT FUNCTION
			jQuery('.ajax-search-form input[name=s]').on('keyup', function(e) {
				var searchvalue = e.currentTarget.value,
					homeURL = jQuery('.ajax-search-form').attr('action');

				clearTimeout(searchTimer);
				if (lastAjaxSearchValue != jQuery.trim(searchvalue) && searchvalue.length >= 3) {
					searchTimer = setTimeout( function() {
						ajaxSearch(e);
					}, 400);
				}
			});

		
		if(jQuery(".quick-view-button").length){
			
			jQuery(".quick-view-button").prettyPhoto({
				hook: 'data-rel',
				social_tools: false,
				theme: 'pp_woocommerce',
				horizontal_padding: 8,
				opacity: 0.8,
				deeplinking: false,
				show_title: true,
				ajaxcallback: function(){ owlslider();wcqi_refresh_quantity_increments },
			});
		}
		
		jQuery( document ).ajaxComplete(function( event, request, settings ) {
			jQuery(".quick-view-button").prettyPhoto({
				hook: 'data-rel',
				social_tools: false,
				theme: 'pp_woocommerce',
				horizontal_padding: 8,
				opacity: 0.8,
				deeplinking: false,
				show_title: true,
				ajaxcallback: function(){ owlslider();wcqi_refresh_quantity_increments },
			});
		});
		
		
		
	});
jQuery( function( $ ) {

	if ( ! String.prototype.getDecimals ) {
		String.prototype.getDecimals = function() {
			var num = this,
				match = ('' + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
			if ( ! match ) {
				return 0;
			}
			return Math.max( 0, ( match[1] ? match[1].length : 0 ) - ( match[2] ? +match[2] : 0 ) );
		}
	}

	function wcqi_refresh_quantity_increments(){
		jQuery( 'div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)' ).addClass( 'buttons_added' ).append( '<input type="button" value="+" class="plus" />' ).prepend( '<input type="button" value="-" class="minus" />' );
	}

	jQuery( document ).on( 'updated_wc_div', function() {
		wcqi_refresh_quantity_increments();
	} );

	jQuery( document ).on( 'click', '.plus, .minus', function() {
		// Get values
		var $qty		= jQuery( this ).closest( '.quantity' ).find( '.qty'),
			currentVal	= parseFloat( $qty.val() ),
			max			= parseFloat( $qty.attr( 'max' ) ),
			min			= parseFloat( $qty.attr( 'min' ) ),
			step		= $qty.attr( 'step' );

		// Format values
		if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
		if ( max === '' || max === 'NaN' ) max = '';
		if ( min === '' || min === 'NaN' ) min = 0;
		if ( step === 'any' || step === '' || step === undefined || parseFloat( step ) === 'NaN' ) step = 1;

		// Change the value
		if ( jQuery( this ).is( '.plus' ) ) {
			if ( max && ( currentVal >= max ) ) {
				$qty.val( max );
			} else {
				$qty.val( ( currentVal + parseFloat( step )).toFixed( step.getDecimals() ) );
			}
		} else {
			if ( min && ( currentVal <= min ) ) {
				$qty.val( min );
			} else if ( currentVal > 0 ) {
				$qty.val( ( currentVal - parseFloat( step )).toFixed( step.getDecimals() ) );
			}
		}

		// Trigger change event
		$qty.trigger( 'change' );
	});
	wcqi_refresh_quantity_increments();
});
