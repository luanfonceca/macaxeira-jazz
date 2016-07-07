$(document).ready(function() {
  $("#header a[href^='#']:not('.dropdown-toggle')").on('click', function(e) {
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

  $('#form-contact').submit(function(e) {
    var form = $(this);
    e.preventDefault();

    $.ajax({
      url: 'http://formspree.io/luanfonceca@gmail.com',
      method: 'POST',
      data: $(this).serialize(),
      dataType: 'json',
      success: function(data) {
        $.simplyToast('Mensagem enviada!', 'success');
        $(form).trigger("reset");
      },
      error: function(err) {
        $.simplyToast('Erro ao enviar mensagem!', 'danger');
      }
    });
  });

  var i18n_options = {
    lng: 'pt_BR',
    whitelist: ['pt_BR', 'en'],
    fallbackLng: ['en'],
    debug: true,
    returnObjects: true,
    resGetPath: "/macaxeira-jazz/__lng__/__ns__.json",
  }

  i18next.use(i18nextXHRBackend);
  i18next.init(i18n_options, function() {
    jqueryI18next.init(i18next, $);
    $('body').localize();
  });

  function toggleCaret(from, to) {
    $('.flags').removeClass(from).addClass(to);
  }

  $('#header').affix({
    offset: {
      top: $('.cover').height() - 85
    }
  }).on('affix.bs.affix', function() {
    toggleCaret('dropup', 'dropdown');
  }).on('affix-top.bs.affix', function() {
    toggleCaret('dropdown', 'dropup');
  });

  $(".navbar-collapse").on('click', 'a:not(.dropdown-toggle)', null, function () {
    $(".navbar-collapse").collapse('hide');
  });

  if ($('#header').hasClass('affix')) {
    toggleCaret('dropup', 'dropdown');
  } else {
    toggleCaret('dropdown', 'dropup');
  }

  $('.flags .dropdown-menu a').click(function () {
    var lng = $(this).attr('data-language');
    i18next.changeLanguage(lng, function(err, t) {
      $('body').localize();
    });

    var lgn_class = $(this).find('.flag').attr('class');
    $('.flags .dropdown-toggle span:first').attr('class', lgn_class);
  });
});
