/* ==========================================================================
   Main JavaScript - Portfolio & Contact Form
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

        // إضافة خلفية للهيدر عند التمرير لأسفل
        if (scrollPos > 50) {
            $navbar.addClass('navbar--scrolled');
        } else {
            $navbar.removeClass('navbar--scrolled');
        }

        // تحديث الرابط النشط في القائمة تلقائياً
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
       3. AJAX Contact Form Submission (FormSubmit)
       ---------------------------------------------------------------------- */
    const $contactForm = $('#ajax-contact');
    const $formMessages = $('#form-messages');

    $contactForm.on('submit', function(e) {
        // منع المتصفح من الانتقال لصفحة FormSubmit الخارجية
        e.preventDefault();

        const $submitBtn = $contactForm.find('button[type="submit"]');
        const originalBtnText = $submitBtn.text();

        // تغيير حالة الزر أثناء الإرسال
        $submitBtn.prop('disabled', true).text('جاري الإرسال...');
        $formMessages.removeClass('success error').hide();

        $.ajax({
            url: $contactForm.attr('action'),
            method: 'POST',
            data: $contactForm.serialize(),
            dataType: 'json',
            success: function(response) {
                // إظهار رسالة النجاح داخل الموقع
                $formMessages
                    .removeClass('error')
                    .addClass('success')
                    .text('تم إرسال رسالتك بنجاح! سأتواصل معك قريباً.')
                    .fadeIn();

                // إعادة إعادة ضبط الحقول والزر
                $contactForm[0].reset();
                $submitBtn.prop('disabled', false).text(originalBtnText);
            },
            error: function(err) {
                // إظهار رسالة الخطأ
                $formMessages
                    .removeClass('success')
                    .addClass('error')
                    .text('حدث خطأ أثناء الإرسال، يرجى المحاولة لاحقاً.')
                    .fadeIn();

                $submitBtn.prop('disabled', false).text(originalBtnText);
            }
        });
    });

});
