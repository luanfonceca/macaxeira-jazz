$(document).ready(function() {
  $("#header a[href^='#']").on('click', function(e) {
     e.preventDefault();
     var hash = this.hash;

     $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 1200, function(){

      window.location.hash = hash;
    });
  });

	var isMobile = window.matchMedia("only screen and (max-width: 760px)");
	if (isMobile.matches) {
    var phone_links = $('#contact').find('.phone-link');
    for (var i = phone_links.length - 1; i >= 0; i--) {
    	var phone = phone_links[i];

    	var new_href = $(phone).attr('href').replace('callto', 'tell');
    	$(phone).attr('href', new_href);
    }
	}

});
