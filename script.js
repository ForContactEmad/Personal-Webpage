$(document).ready(function () {

  // Custom jQuery extension for Typing Effect
  $.fn.writeText = function (content) {
    const contentArray = content.split('');
    let current = 0;
    const $elem = this;

    $elem.text('');

    const timer = setInterval(() => {
      if (current < contentArray.length) {
        $elem.text($elem.text() + contentArray[current++]);
      } else {
        clearInterval(timer);
      }
    }, 80);
  };

  // Initialize UI elements
  const initApp = () => {
    const $holder = $('#holder');
    if ($holder.length) {
      $holder.writeText('WEB DESIGNER + FRONT-END DEVELOPER');
    }

    // Initialize Skill Bar dynamic colors
    $('.skillbar').each(function () {
      const color = $(this).data('color');
      if (color) {
        $(this).find('.skillbar__title, .skillbar__bar').css('background-color', color);
      }
    });
  };

  // Mobile Navigation Toggle
  const setupMobileNav = () => {
    const $body = $('body');

    $('#navOpenBtn').on('click', () => {
      $body.addClass('nav-open');
    });

    $('#navCloseBtn, .mobile-nav__links a').on('click', () => {
      $body.removeClass('nav-open');
    });
  };

  // FullPage.js Configuration
  const setupFullPage = () => {
    const $fullpage = $('#fullpage');

    if ($.fn.fullpage && $fullpage.length) {
      $fullpage.fullpage({
        scrollBar: true,
        responsiveWidth: 500,
        navigation: true,
        navigationTooltips: ['home', 'about', 'portfolio', 'contact'],
        anchors: ['home', 'about', 'portfolio', 'contact'],
        menu: '#myMenu',
        fitToSection: false,

        afterLoad: function (anchorLink, index) {
          const $navbar = $('#navbar');

          if (index === 1) {
            $navbar.removeClass('navbar--scrolled');
          } else {
            $navbar.addClass('navbar--scrolled');
          }

          if (index === 2) {
            $('.skillbar').each(function () {
              const percent = $(this).data('percent');
              $(this).find('.skillbar__bar').css('width', percent);
            });
          }
        },

        onLeave: function (index, nextIndex, direction) {
          if (index === 2) {
            $('.skillbar__bar').css('width', '0');
          }
        }
      });
    }
  };

  // Navigation Handlers
  const setupNavigationHandlers = () => {
    $(document).on('click', '#moveDownBtn', function (e) {
      e.preventDefault();
      if ($.fn.fullpage && $.fn.fullpage.moveSectionDown) {
        $.fn.fullpage.moveSectionDown();
      } else {
        const $aboutSection = $('[data-anchor="about"]');
        if ($aboutSection.length) {
          $('html, body').animate({
            scrollTop: $aboutSection.offset().top
          }, 800);
        }
      }
    });
  };

  // Contact Form Submission
  const setupContactForm = () => {
    const $form = $('#ajax-contact');
    const $formMessages = $('#form-messages');

    if (!$form.length) return;

    $form.on('submit', function (e) {
      e.preventDefault();

      if ($('#human').val() !== '') {
        return false;
      }

      const formData = $form.serialize();

      $.ajax({
        type: 'POST',
        url: $form.attr('action'),
        data: formData
      })
      .done((response) => {
        $formMessages
          .removeClass('error')
          .addClass('success')
          .text(response || 'Thank you! Your message has been sent.');

        $form.find('input[type="text"], input[type="email"], textarea').val('');
      })
      .fail((data) => {
        $formMessages
          .removeClass('success')
          .addClass('error');

        if (data.responseText && data.responseText.trim() !== '') {
          $formMessages.text(data.responseText);
        } else {
          $formMessages.text('Oops! An error occurred and your message could not be sent.');
        }
      });
    });
  };

  // Initialize All
  initApp();
  setupMobileNav();
  setupFullPage();
  setupNavigationHandlers();
  setupContactForm();
});
