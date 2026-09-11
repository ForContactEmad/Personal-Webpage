$(document.ready).ready(function () {
  
  // Custom jQuery extension for Typing Effect
  $.fn.writeText = function (content) {
    const contentArray = content.split('');
    let current = 0;
    const $elem = this;

    const timer = setInterval(() => {
      if (current < contentArray.length) {
        $elem.text($elem.text() + contentArray[current++]);
      } else {
        clearInterval(timer);
      }
    }, 80);
  };

  // Initialize plugins and UI elements
  const initApp = () => {
    // Start typing animation
    $('#holder').writeText('WEB DESIGNER + FRONT-END DEVELOPER');

    // Initialize WOW.js for scroll animations
    if (typeof WOW === 'function') {
      new WOW().init();
    }

    // Initialize Skill Bar colors dynamically from dataset
    $('.skillbar').each(function () {
      const color = $(this).data('color');
      if (color) {
        $(this).find('.skillbar__title, .skillbar__bar').css('background-color', color);
      }
    });
  };

  // Mobile Navigation Drawer Toggle
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
    $('#fullpage').fullpage({
      scrollBar: true,
      responsiveWidth: 400,
      navigation: true,
      navigationTooltips: ['home', 'about', 'portfolio', 'contact', 'connect'],
      anchors: ['home', 'about', 'portfolio', 'contact', 'connect'],
      menu: '#myMenu',
      fitToSection: false,

      afterLoad: function (anchorLink, index) {
        const $navbar = $('#navbar');

        // Toggle navbar header styles based on active section
        if (index === 1) {
          $navbar.removeClass('navbar--scrolled');
        } else {
          $navbar.addClass('navbar--scrolled');
        }

        // Trigger Skill Bars animation when entering 'About' section (Index 2)
        if (index === 2) {
          $('.skillbar').each(function () {
            const percent = $(this).data('percent');
            $(this).find('.skillbar__bar').css('width', percent);
          });
        }
      }
    });
  };

  // Event Handlers for Custom Navigation Controls
  const setupNavigationHandlers = () => {
    // Scroll down button
    $(document).on('click', '#moveDownBtn', () => {
      $.fn.fullpage.moveSectionDown();
    });
  };

  // Contact Form AJAX Submission with Error Handling
  const setupContactForm = () => {
    const $form = $('#ajax-contact');
    const $formMessages = $('#form-messages');

    $form.on('submit', function (e) {
      e.preventDefault();

      // Check spam honeypot field
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

        // Clear input fields
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

  // Initialize All Modules
  initApp();
  setupMobileNav();
  setupFullPage();
  setupNavigationHandlers();
  setupContactForm();
});
