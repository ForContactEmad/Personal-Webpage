/* ==========================================================================
   Main JavaScript - Portfolio & Contact Form Processing
   ========================================================================== */

$(document.documentElement).addClass('js');

$(document).ready(function() {

    /* ----------------------------------------------------------------------
       1. Mobile Navigation Toggle
       ---------------------------------------------------------------------- */
    const $navToggle = $('#navOpenBtn');
    const $navMenu = $('#myMenu');

    $navToggle.on('click', function() {
        $navMenu.toggleClass('navbar__links--open');
        $(this).attr('aria-expanded', $navMenu.hasClass('navbar__links--open'));
    });

    // إغلاق القائمة عند الضغط على أي رابط
    $('#myMenu a').on('click', function() {
        $navMenu.removeClass('navbar__links--open');
        $navToggle.attr('aria-expanded', 'false');
    });

    /* ----------------------------------------------------------------------
       2. Header Style & Active Section on Scroll
       ---------------------------------------------------------------------- */
    const $navbar = $('#navbar');
    const $sections = $('section, header[id]');

    $(window).on('scroll', function() {
        const scrollPos = $(window).scrollTop();

        // تغيير خلفية الهيدر عند التمرير لأسفل
        if (scrollPos > 50) {
            $navbar.addClass('navbar--scrolled');
        } else {
            $navbar.removeClass('navbar--scrolled');
        }

        // تحديث العنصر النشط في القائمة تلقائياً
        $sections.each(function() {
            const top = $(this).offset().top - 100;
            const bottom = top + $(this).outerHeight();
            const id = $(this).attr('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                $('#myMenu li').removeClass('active');
                $('#myMenu li[data-menuanchor="' + id + '"]').addClass('active');
            }
        });
    });

    /* ----------------------------------------------------------------------
       3. AJAX Contact Form Submission (FormSubmit Engine)
       ---------------------------------------------------------------------- */
    const $contactForm = $('#ajax-contact');
    const $formMessages = $('#form-messages');

    $contactForm.on('submit', function(e) {
        e.preventDefault();

        const $submitBtn = $contactForm.find('button[type="submit"]');
        const originalBtnText = $submitBtn.text();

        $submitBtn.prop('disabled', true).text('جاري الإرسال...');
        $formMessages.removeClass('success error').hide();

        $.ajax({
            url: $contactForm.attr('action'),
            method: 'POST',
            data: $contactForm.serialize(),
            headers: {
                'Accept': 'application/json' // إجبار السيرفر على إرجاع JSON
            },
            success: function(response) {
                $formMessages
                    .removeClass('error')
                    .addClass('success')
                    .text('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.')
                    .fadeIn();

                $contactForm[0].reset();
                $submitBtn.prop('disabled', false).text(originalBtnText);
            },
            error: function(xhr, status, error) {
                if (xhr.status === 0 || xhr.status === 403) {
                    $formMessages
                        .removeClass('success')
                        .addClass('error')
                        .text('يرجى التحقق من بريدك الإلكتروني والضغط على رابط التفعيل (Activate Form) أولاً.')
                        .fadeIn();
                } else {
                    $formMessages
                        .removeClass('success')
                        .addClass('error')
                        .text('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.')
                        .fadeIn();
                }

                $submitBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });

});
