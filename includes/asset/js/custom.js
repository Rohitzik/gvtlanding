var nonceValue = "S0c00714lB34t007";

$(document).ready(function($) {

    new WOW().init();
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: {
            delay: 8000,
        },
        direction: 'horizontal',
        effect: 'fade',
        arrows: false,
        loop: true,
        speed: 1000,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })



    jQuery(".popup-youtube").magnificPopup({
        disableOn: 700,
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });
    if ($(".fundraise_testimonia_slider").length > 0) {
        $(".fundraise_testimonia_slider").slick({
            dots: true,
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
        });
    }


    if ($(".stories_section12").length > 0) {
        $(".stories_section12").slick({
            dots: true,
            slidesToShow: 4,
            slidesToScroll: 1,
            arrows: false,
            prevArrow: '<button class="slide-arrow prev-arrow"></button>',
            nextArrow: '<button class="slide-arrow next-arrow"></button>',
            autoplay: false,
            responsive: [{
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1.1,
                        slidesToScroll: 1
                    }
                },
            ],
        });
    }
    if (jQuery(".center-slider").length > 0) {
        $(".center-slider").slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            centerMode: true,
            arrows: false,
            dots: false,
            focusOnSelect: false,
            centerMode: true,
            speed: 300,
            centerPadding: "60px",
            infinite: true,
            autoplaySpeed: 5000,
            autoplay: true,
            responsive: [{
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 767,
                    settings: {
                        slidesToShow: 1,
                        dots: false,
                        arrows: true
                    },
                },
            ],
        });
    }
    if (jQuery(".pub_slider").length > 0) {
        $(".pub_slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            fade: true,
            dots: true,
        });
    }
    if (jQuery(".carousel_testimonial_wrap").length > 0) {
        $(".carousel_testimonial_wrap").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
            fade: true,
            dots: true,
            adaptiveHeight: true,
        });
    }
    if (jQuery(".banner_slider").length > 0) {
        $(".banner_slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            arrows: false,
            fade: true,
            dots: true,
        });
    }
    if ($("input.mobile_number").length > 0) {
        $(".mobile_number").each(function(index) {
            var input = $(this)[0];
            window.intlTelInput(input, {
                separateDialCode: true,
                initialCountry: "In",
                hiddenInput: "full_number",
                geoIpLookup: function(callback) {
                    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(
                        resp
                    ) {
                        var countryCode = resp && resp.country ? resp.country : "us";
                        callback(countryCode);
                    });
                },
            });
        });
        if (jQuery("#alt_tel").length > 0) {
            var input_alt = document.querySelector("#alt_tel");
            window.intlTelInput(input_alt, {
                separateDialCode: true,
                initialCountry: "In",
                hiddenInput: "alt_full_number",
                geoIpLookup: function(callback) {
                    $.get("https://ipinfo.io", function() {}, "jsonp").always(function(
                        resp
                    ) {
                        var countryCode = resp && resp.country ? resp.country : "us";
                        callback(countryCode);
                    });
                },
            });
        }
    }


    jQuery(".single_photo_gallery").magnificPopup({
        type: "image",
        mainClass: "mfp-with-zoom",
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300,
            easing: "ease-in-out",
            opener: function(openerElement) {
                return openerElement.is("img") ?
                    openerElement :
                    openerElement.find("img");
            },
        },
    });
});

$(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
        $("#scroll").fadeIn();
    } else {
        $("#scroll").fadeOut();
    }
});
$("#scroll").click(function() {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});
$(document).on("change", "input[name='offline_op']", function() {
    var tab = $(this).data("tabn");
    var title = $(this).val();
    $("#of_heading").text(title);
    $(".offline_tab.active_t").removeClass("active_t");
    $("#" + tab).addClass("active_t");
});
$("#primary-menu a,.scroll").click(function(e) {
    $("html,body").animate({
            scrollTop: $($(this).attr("href")).offset().top - 90
        },
        500
    );
    $('input[name="Name"]').focus();
    e.preventDefault();
});
$(window).on("load", function() {
    if ($(window).width() > 767.98) {
        var height = 0;
        $(".Consultative-equal-height").each(function() {
            if (height < $(this).outerHeight()) {
                height = $(this).outerHeight();
            }
        });
        $(".Consultative-equal-height").css("height", height);
    }
});
$(window).on("load", function() {
    if ($(window).width() > 767.98) {
        var height = 0;
        $(".contact-us-equal-height").each(function() {
            if (height < $(this).outerHeight()) {
                height = $(this).outerHeight();
            }
        });
        $(".contact-us-equal-height").css("height", height);
    }
});
$(window).on("load", function() {
    equaliseIt();
    if ($(window).width() > 767.98) {
        var height = 0;
        $(".box-border").each(function() {
            if (height < $(this).outerHeight()) {
                height = $(this).outerHeight();
            }
        });
        $(".box-border").css("height", height);
    }
    var cardWrappers = $(".stories_section12 .card_wrapper");
    var maxHeight = 0;
    cardWrappers.each(function() {
        var title = $(this).find("h2");
        var titleHeight = title.outerHeight();
        if (titleHeight > maxHeight) {
            maxHeight = titleHeight;
        }
    });
    cardWrappers.find("h2").css("height", maxHeight + "px");
});
$(window).resize(function() {
    equaliseIt();
});

function equaliseIt() {
    $(".impact_grid_wrapper").each(function() {
        var highestBox = 0;
        $(".child_heading", this).each(function() {
            if ($(this).height() > highestBox) highestBox = $(this).height();
        });
        $(".child_heading", this).height(highestBox);
    });
    if ($(".impact_summery").length > 0) {
        $(".impact_grid_wrapper").each(function() {
            var highestBox = 0;
            $(".impact_summery", this).each(function() {
                if ($(this).height() > highestBox) highestBox = $(this).height();
            });
            $(".impact_summery", this).height(highestBox);
        });
    }
    var maxHeight = 0;
    if ($("div.profile_box .feat_desc").length > 0) {
        $("div.profile_box .feat_desc").each(function() {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $("div.profile_box .feat_desc").height(maxHeight);
    }
    if ($("div.trustees_wrap .trustees_designation").length > 0) {
        $("div.trustees_wrap .trustees_designation").each(function() {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $("div.trustees_wrap .trustees_designation").height(maxHeight);
    }
    if ($("div.how_wrap h5").length > 0) {
        $("div.how_wrap h5").each(function() {
            if ($(this).height() > maxHeight) {
                maxHeight = $(this).height();
            }
        });
        $("div.how_wrap h5").height(maxHeight);
    }
}

$(document).ready(function() {
    $(".careers .accordion>.card>.card-header").click(function() {
        $(".careers .accordion>.card>.card-header").removeClass(
            "heading_color_gray"
        );
        $(this).toggleClass("heading_color_gray");
    });
});
var init = {
    infinite: false,
    cssEase: "linear",
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button class="slide-arrow prev-arrow"><i class="fa fa-chevron-left"></i></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><i class="fa fa-chevron-right"></i></button>',
};
$(function() {});
document.body.addEventListener('click', function(event) {
    var target = event.target;

    // Check if the clicked element matches the specified selector
    if (target.matches('div.know_more_section a.read-button')) {
        // Find the closest '.know_more_section' relative to the clicked element
        var closestKnowMoreSection = target.closest('.know_more_section');

        // Find the '.know_more_desc' within the closest '.know_more_section'
        var currentKnowMoreDesc = closestKnowMoreSection.querySelector('.know_more_desc');

        // Toggle the visibility of the current '.know_more_desc'
        currentKnowMoreDesc.style.display = (currentKnowMoreDesc.style.display === 'none' || currentKnowMoreDesc.style.display === '') ? 'block' : 'none';

        // Hide other '.know_more_desc' elements
        var allKnowMoreDesc = document.querySelectorAll('.know_more_desc');
        allKnowMoreDesc.forEach(function(element) {
            if (element !== currentKnowMoreDesc) {
                element.style.display = 'none';
            }
        });
    }
});



jQuery(document).on(
    "click",
    "body.mega-menu-menu-1-mobile-open ul#mega-menu-menu-1 > li.mega-menu-item",
    function(e) {
        var current = $(this)
            .closest("ul#mega-menu-menu-1")
            .find("li.mega-menu-item");
        current.removeClass("mega-toggle-on");
        current.removeClass("menu_open");
        $(this).addClass("menu_open");
        $(".menu_open").addClass("mega-toggle-on");
    }
);

function isInView(elem) {
    return (
        $(elem).offset().top + $(elem).height() - $(window).scrollTop() <
        $(elem).height()
    );
}
$(window).scroll(function() {
    if ($(".testimonial_section").length > 0) {
        if (isInView($(".testimonial_section"))) {
            if (jQuery(".filter_div").hasClass("filter_sticky")) {
                jQuery(".filter_div").removeClass("filter_sticky");
            }
        } else {
            if (!jQuery(".filter_div").hasClass("filter_sticky")) {
                jQuery(".filter_div").addClass("filter_sticky");
            }
        }
    }
});
if (jQuery(".select-wrapper").length > 0) {
    document
        .querySelector(".select-wrapper")
        .addEventListener("click", function() {
            this.querySelector(".select").classList.toggle("open");
        });
}
if (jQuery(".custom-option").length > 0) {
    for (const option of document.querySelectorAll(".custom-option")) {
        option.addEventListener("click", function() {
            if (!this.classList.contains("selected")) {
                this.parentNode
                    .querySelector(".custom-option.selected")
                    .classList.remove("selected");
                this.classList.add("selected");
                this.closest(".select").querySelector(
                    ".select__trigger span"
                ).textContent = this.textContent;
            }
        });
    }
}
var currentTab = 0;
if ($(".donation_form").length > 0) {
    showTab(currentTab);
}
jQuery("input[name='fav_language']").on("change", function() {
    var g_way = jQuery("input[name='fav_language']:checked").data("gateway");
    if (jQuery(this).val() == "Foreign") {
        jQuery("#pan_number").parent().toggle();
        jQuery("input[name='district']").parent().toggle();
        jQuery("input[name='pass']").parent().next("p").toggle();
        jQuery("#inputState").attr("placeholder", "Province*");
        jQuery("#country option[value='']").prop("selected", true);
        jQuery("input[name='zip_code']").val("");
        jQuery("input[name='zip_code']").attr("placeholder", "Zip code");
        jQuery("input[name='state']").val("");
        jQuery("input[name='district']").val("");
    } else {
        jQuery("#pan_number").parent().toggle();
        jQuery("#inputState").attr("placeholder", "State*");
        jQuery("input[name='zip_code']").attr("placeholder", "Pincode");
        jQuery("#country option[value='India']").prop("selected", true);
    }
    jQuery("input[name='payment_gateway']").val(g_way);
});

function showTab(n) {
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    if (n == 0) {
        if (jQuery("#prevBtn").length > 0) {
            document.getElementById("prevBtn").style.display = "none";
        }
    } else {
        if (jQuery("#prevBtn").length > 0) {
            document.getElementById("prevBtn").style.display = "inline";
        }
    }
    if (n == x.length - 1) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n);
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab");
    if (n == 1 && !validateForm() && currentTab != 3) {
        var target = x[0];
        target = $(target);
        if (target.length) {
            $("html,body").animate({
                scrollTop: target.offset().top
            }, 1000);
        }
        return false;
    }
    x[currentTab].style.display = "none";
    cTab = currentTab;
    if (jQuery("#offline_transfer").length == 0) {
        $("#nextBtn").hide();
    }
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return true;
    }
    if (
        $("input[name='d_amount']").is(":checked") &&
        $("input[name='amount']").val() == ""
    ) {
        var amount = $("input[name='d_amount']:checked").val();
        $("input[name='amount']").val(amount);
    }
    if (
        $("input[name='other_amount']").val() != "" &&
        $("input[name='amount']").val() == ""
    ) {
        var amount = $("input[name='other_amount']").val();
        $("input[name='amount']").val(amount);
    }
    if (cTab == 0 && jQuery('input[name="payment_gateway"]').length > 0) {
        var formData = new FormData();
        let encryption = new Encryption();
        var amount = $("input[name='amount']").val();
        if (amount == "") {
            return false;
        }
        var merchant_id = $("input[name='merchant_id']").val();
        formData.append("merchant_id", encryption.encrypt(merchant_id, nonceValue));
        var language = $("input[name='language']").val();
        formData.append("language", encryption.encrypt(language, nonceValue));
        var amount = $("input[name='amount']").val();
        formData.append("amount", encryption.encrypt(amount, nonceValue));
        var currency = $("input[name='currency']").val();
        formData.append("currency", encryption.encrypt(currency, nonceValue));
        var dp_page = jQuery("input[name='dp_page_url']").val();
        formData.append("dp_page", encryption.encrypt(dp_page, nonceValue));
        var redirect_url = $("input[name='redirect_url']").val();
        formData.append(
            "redirect_url",
            encryption.encrypt(redirect_url, nonceValue)
        );
        var cancel_url = $("input[name='cancel_url']").val();
        formData.append("cancel_url", encryption.encrypt(cancel_url, nonceValue));
        var billing_name = $("input[name='billing_name']").val();
        formData.append(
            "billing_name",
            encryption.encrypt(billing_name, nonceValue)
        );
        var billing_address = $("input[name='billing_address']").val();
        formData.append(
            "billing_address",
            encryption.encrypt(billing_address, nonceValue)
        );
        var inputState = $("#inputState").val();
        formData.append(
            "billing_state",
            encryption.encrypt(inputState, nonceValue)
        );
        var billing_zip = $("#billing_zip").val();
        formData.append("billing_zip", encryption.encrypt(billing_zip, nonceValue));
        var inputDistrict = $("#inputDistrict").val();
        formData.append(
            "billing_city",
            encryption.encrypt(inputDistrict, nonceValue)
        );
        var country = $("#country").val();
        formData.append("billing_country", encryption.encrypt(country, nonceValue));
        var billing_tel = $("input[name='billing_tel']").val();
        formData.append("billing_tel", encryption.encrypt(billing_tel, nonceValue));
        var billing_email = $("input[name='billing_email']").val();
        formData.append(
            "billing_email",
            encryption.encrypt(billing_email, nonceValue)
        );
        var integration_type = $("input[name='integration_type']").val();
        formData.append(
            "integration_type",
            encryption.encrypt(integration_type, nonceValue)
        );
        var payment_option = $("input[name='payment_option']").val();
        formData.append(
            "payment_option",
            encryption.encrypt(payment_option, nonceValue)
        );
        var payment_gateway = $("input[name='payment_gateway']").val();
        formData.append(
            "payment_gateway",
            encryption.encrypt(payment_gateway, nonceValue)
        );
        var hard_copy = $("input[name='hard_copy']").val();
        formData.append("hard_copy", encryption.encrypt(hard_copy, nonceValue));
        var pan_number = $("input[name='pan']").val();
        if (pan_number == undefined) {
            pan_number = $("input[name='pass']").val();
        }
        formData.append("pan", encryption.encrypt(pan_number, nonceValue));
        var payment_type = $("input[name='payment_type']").val();
        formData.append(
            "payment_type",
            encryption.encrypt(payment_type, nonceValue)
        );
        var email_update = $("input[name='email_update']").val();
        formData.append(
            "email_update",
            encryption.encrypt(email_update, nonceValue)
        );
        var birthdate_date = $("input[name='birthdate_date']").val();
        formData.append(
            "birthdate_date",
            encryption.encrypt(birthdate_date, nonceValue)
        );
        var anonymous = $("input[name='anonymous']").val();
        formData.append("anonymous", encryption.encrypt(anonymous, nonceValue));
        var fav_language = $("input[name='fav_language']:checked").val();
        formData.append("citizen", encryption.encrypt(fav_language, nonceValue));
        var address = $("input[name='address']").val();
        formData.append("address", encryption.encrypt(address, nonceValue));
        var zip_code = $("input[name='zip_code']").val();
        formData.append("zip_code", encryption.encrypt(zip_code, nonceValue));
        var inputDistrict = $(".inputDistrict").val();
        formData.append(
            "billing_city",
            encryption.encrypt(inputDistrict, nonceValue)
        );
        var country = $("#country").val();
        formData.append("billing_country", encryption.encrypt(country, nonceValue));
        var is_whatsapp = $("input[name='is_whatsapp']:checked").val();
        if (is_whatsapp == undefined) {
            is_whatsapp = "0";
        }
        formData.append(
            "is_whatsapp_number",
            encryption.encrypt(is_whatsapp, nonceValue)
        );
        var alt_tel = $("input[name='alt_tel']").val();
        formData.append(
            "alternative_phone",
            encryption.encrypt(alt_tel, nonceValue)
        );
        if ($("input[name='school_repopen']").length > 0) {
            var school = $("input[name='school_repopen']").val();
            formData.append("school_reopen", encryption.encrypt(school, nonceValue));
        }
        if ($("input[name='campaign_id']").length > 0) {
            var campaign_id = $("input[name='campaign_id']").val();
            formData.append(
                "campaign_id",
                encryption.encrypt(campaign_id, nonceValue)
            );
        }
        if ($("input[name='campaign_name']").length > 0) {
            var campaign_name = $("input[name='campaign_name']").val();
            formData.append(
                "campaign_name",
                encryption.encrypt(campaign_name, nonceValue)
            );
        }
        if ($("#occassion").length > 0) {
            if (
                $("#occassion").val() == "other-occassion" &&
                $('input[name="occassion_name"]').val() != ""
            ) {
                var occassion_name = $("input[name='occassion_name']").val();
                formData.append(
                    "occassion_name",
                    encryption.encrypt(occassion_name, nonceValue)
                );
                var occassion = $("#occassion").val();
                formData.append(
                    "occassion_other",
                    encryption.encrypt(occassion, nonceValue)
                );
            }
            if ($("#occassion").val() != "other-occassion") {
                var occassion = $("#occassion").val();
                formData.append(
                    "occassion_name",
                    encryption.encrypt(occassion, nonceValue)
                );
            }
            var occassion_date = $("input[name='occassion_date']").val();
            formData.append(
                "occassion_date",
                encryption.encrypt(occassion_date, nonceValue)
            );
            var relationship = $("input[name='relationship']").val();
            formData.append(
                "relationship",
                encryption.encrypt(relationship, nonceValue)
            );
            var honor_name = $("input[name='honor_name']").val();
            formData.append("honor_name", encryption.encrypt(honor_name, nonceValue));
            var honor_email_id = $("input[name='honor_email_id']").val();
            formData.append(
                "honor_email",
                encryption.encrypt(honor_email_id, nonceValue)
            );
            var honor_mobile_number = $("input[name='honor_mobile_number']").val();
            formData.append(
                "honor_mobile",
                encryption.encrypt(honor_mobile_number, nonceValue)
            );
        }
        formData.append("action", "donation_data");
        jQuery.ajax({
            method: "post",
            processData: false,
            contentType: false,
            cache: false,
            enctype: "multipart/form-data",
            url: siteurls.ajax_url,
            data: formData,
            success: function(response) {
                jQuery(".rerorr_wrap").remove();
                var res_data = JSON.parse(response);
                if (res_data.rstatus == 1) {
                    response = res_data.form;
                } else {
                    jQuery(".donation_amount_wrap").prepend(res_data.form);
                    nextPrev(-1);
                    jQuery("#nextBtn").show();
                    return false;
                }
                if ($("input[name='payment_gateway']").val() == "PayU") {
                    $("#payment_screen").html(response);
                    var payuForm = document.forms.payuForm;
                    payuForm.submit();
                }
                if ($("input[name='payment_gateway']").val() == "razor_pay") {
                    razorpay_options = JSON.parse(response);
                    jQuery("#post_id").val(razorpay_options.post_id);
                    razorpay_mode(razorpay_options);
                }
                if ($("input[name='payment_gateway']").val() == "ccavenue") {
                    $("#payment_screen").html(response);
                }
            },
        });
    }
    showTab(currentTab);
}
$(function() {
    $("input[id='mobile_india']").on("input", function(e) {
        $(this).val(
            $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
    });
    $("input[id='alt_tel']").on("input", function(e) {
        $(this).val(
            $(this)
            .val()
            .replace(/[^0-9]/g, "")
        );
    });
});
$('input[name="relationship"],input[name="honor_name"]').bind(
    "keydown",
    function(e) {
        var key = e.which;
        if (e.shiftKey || e.ctrlKey || e.altKey) {
            e.preventDefault();
        } else {
            var key = e.keyCode;
            if (!(
                    key == 8 ||
                    key == 32 ||
                    key == 46 ||
                    (key >= 35 && key <= 40) ||
                    (key >= 65 && key <= 90)
                )) {
                e.preventDefault();
            }
        }
    }
);

function validateForm() {
    var x,
        y,
        valid = true;
    x = document.getElementsByClassName("tab");
    y = x[currentTab].getElementsByTagName("input");
    var numbers = /^[-+]?[0-9]+$/;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    var a_flag = false;
    var f_lang = jQuery("input[name='fav_language']:checked").val();
    for (i = 0; i < y.length; i++) {
        if (y[i].value.trim() == "" && y[i].type != "hidden") {
            if (f_lang == "Foreign" && y[i].name == "pass") {
                continue;
            }
            if (f_lang == "Foreign" && y[i].name == "district") {
                continue;
            }
            if (y[i].name == "alt_tel") {
                continue;
            }
            if (y[i].name == "other_amount" && a_flag) {
                continue;
            } else if (y[i].name == "occassion_name") {
                if (
                    ($("#occassion").val() == "other-occassion" &&
                        $('input[name="occassion_name"]').val() != "") ||
                    $("#occassion").val() != "other-occassion"
                ) {
                    continue;
                } else {
                    y[i].className += " invalid";
                    valid = false;
                }
            } else {
                y[i].className += " invalid";
                valid = false;
            }
        } else if (y[i].value.trim() !== "") {
            y[i].removeClass = "invalid";
            console.log(y[i].parentNode.parentNode.className);
            if (y[i].name == "d_amount" && y[i].checked) {
                a_flag = true;
            }
            if (y[i].name == "other_amount" && !a_flag && y[i].value < 100) {
                y[i].className += " invalid";
                valid = false;
                const otAmErrors = document.querySelectorAll(".ot_am_error");
                otAmErrors.forEach((error) => error.remove());
                var element = document.querySelector(".single_amount_wrapper");
                var span = document.createElement("span");
                span.className = "ot_am_error text-danger";
                span.textContent = "Minimum amount of donation is rupees 100";
                element.parentNode.insertBefore(span, element.nextSibling);
            }
            if (y[i].parentNode.parentNode.className == ".fname") {
                if (y[i].value.match(numbers)) {
                    y[i].className += " deep_invalid";
                    valid = false;
                }
            }
            if (y[i].type == "email") {
                if (y[i].value.match(mailformat)) {
                    console.log("mailformat");
                    var reg_email = y[i].value;
                    console.log(reg_email);
                    valid = true;
                } else {
                    console.log("not mailformat");
                    y[i].className += " invalid";
                    valid = false;
                }
            }
            if (
                y[i].name == "billing_tel" ||
                y[i].name == "honor_mobile_number" ||
                y[i].name == "alt_tel"
            ) {
                var mobile = y[i].value;
                if (phonenumber(mobile)) {
                    valid = true;
                } else {
                    y[i].className += " invalid";
                    valid = false;
                }
            }
            if (y[i].name == "billing_name" || y[i].name == "fname") {
                var name = y[i].value;
                var regex = /^[A-Za-z\s]*$/;
                if (!regex.test(name)) {
                    y[i].className += " invalid";
                    valid = false;
                }
            }
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    var i,
        x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    x[n].className += " active";
}

jQuery(document).on("blur", "#other_amount", function() {
    var d = jQuery(this).val();
    if (d != "") {
        jQuery("input[name='amount']").val(d);
    }
});
jQuery(document).on("change", "#inputState", function() {
    var state = jQuery(this).val();
    jQuery("#billing_state").val(state);
});
jQuery(document).on("change", "#inputDistrict", function() {
    var city = jQuery(this).val();
    jQuery("#billing_city").val(city);
});

function focusFunction() {
    jQuery('input:radio[name="d_amount"]').removeAttr("checked");
    jQuery('input:radio[name="d_amount"]').prop("checked", false);
    jQuery("input[name='amount']").val("");
}
$(document).ready(function() {
    $("input[name='billing_name']").on("blur", function() {
        var name = $(this).val();
        var regex = /^[A-Za-z\s]*$/;
        $(".name_error.text-danger").remove();
        $(".name_error.text-danger").removeClass("text-danger");
        if (!regex.test(name)) {
            $("input[name='billing_name']").addClass("text-danger");
            $("input[name='billing_name']")
                .parent()
                .append(
                    "<span class='name_error text-danger'>Please enter valid name</span>"
                );
            return regex.test(name);
        }
    });
    $("input[name='billing_tel'],input[name='honor_mobile_number']").on(
        "blur",
        function() {
            var mobile = $(this).val();
            $(".mobile_error.text-danger").remove();
            $(".mobile_error.text-danger").removeClass("text-danger");
            if (!phonenumber(mobile)) {
                $(this).addClass("text-danger");
                $(this)
                    .parent()
                    .append(
                        "<span class='mobile_error text-danger'>Please enter valid number</span>"
                    );
                return false;
            } else {
                $(this).removeClass("text-danger");
                $(".mobile_error.text-danger").remove();
                return true;
            }
        }
    );
    $("input[name='billing_email'],input[name='honor_email_id']").on(
        "blur",
        function() {
            var email = $(this).val();
            var regex =
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            $(".email_error.text-danger").remove();
            $(".email_error.text-danger").removeClass("text-danger");
            if (!regex.test(email)) {
                $(this).addClass("text-danger");
                $(this)
                    .parent()
                    .after(
                        "<span class='email_error text-danger'>Please enter valid email address</span>"
                    );
                return regex.test(email);
            }
        }
    );
    $("select[name='country']").on("change", function() {
        var country = $(this).val();
        if (country == "India") {
            $("#Indian").trigger("click");
            jQuery("input[name='pass']").parent().next("p").toggle();
            jQuery("input[name='district']").parent().toggle();
        } else {
            $("#Foreign").trigger("click");
        }
    });
    $("input[name='zip_code']").on("blur", function() {
        var zip_code = $(this).val();
        if ($("select[name='country']").val() != "India") {
            return;
        }
        if (
            $("body").hasClass("page-template-template-wire-transfer") ||
            jQuery("input[name='offline_op']").val() != "Wire Transfer"
        ) {
            if (zip_code.length > 0) {
                if ($("body").hasClass("page-template-template-wire-transfer")) {
                    var tb = jQuery("input[name='offline_op']:checked").data("tabn");
                    $("#" + tb)
                        .find("#inputState")
                        .parent()
                        .css("opacity", 0.1);
                    $("#" + tb)
                        .find("#inputDistrict")
                        .parent()
                        .css("opacity", 0.1);
                }
                $("#inputState").parent().css("opacity", 0.1);
                $("#inputDistrict").parent().css("opacity", 0.1);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: frontendajax.ajaxurl,
                    data: {
                        zip_code: zip_code,
                        action: "zipcode_ajax"
                    },
                    success: function(data) {
                        if (data.status != "undefined" && data.length != 0) {
                            if (data.status == 1) {
                                var state = data.state;
                                var city = data.city;
                                if (
                                    $("body").hasClass("page-template-template-wire-transfer")
                                ) {
                                    var tb = jQuery("input[name='offline_op']:checked").data(
                                        "tabn"
                                    );
                                    $("#" + tb)
                                        .find("#inputState")
                                        .val(state);
                                    $("#" + tb)
                                        .find("#inputDistrict")
                                        .val(city);
                                    $("#" + tb)
                                        .find("#inputState")
                                        .parent()
                                        .css("opacity", 1);
                                    $("#" + tb)
                                        .find("#inputDistrict")
                                        .parent()
                                        .css("opacity", 1);
                                }
                                $("#inputState").val(state);
                                $("#inputDistrict").val(city);
                                $("#inputState").parent().css("opacity", 1);
                                $("#inputDistrict").parent().css("opacity", 1);
                            }
                        } else {
                            $("#inputState").val("");
                            $("#inputDistrict").val("");
                            $("#inputState").parent().css("opacity", 1);
                            $("#inputDistrict").parent().css("opacity", 1);
                        }
                    },
                });
            }
        }
        if (jQuery("input[name='fav_language']:checked").val() == "Indian") {
            if (zip_code.length > 0) {
                $("#inputState").parent().css("opacity", 0.1);
                $("#inputDistrict").parent().css("opacity", 0.1);
                $.ajax({
                    type: "POST",
                    dataType: "json",
                    url: frontendajax.ajaxurl,
                    data: {
                        zip_code: zip_code,
                        action: "zipcode_ajax"
                    },
                    success: function(data) {
                        if (data.status != "undefined" && data.length != 0) {
                            if (data.status == 1) {
                                var state = data.state;
                                var city = data.city;
                                $("#inputState").val(state);
                                $("#inputDistrict").val(city);
                                $("#inputState").parent().css("opacity", 1);
                                $("#inputDistrict").parent().css("opacity", 1);
                            }
                        } else {
                            $("#inputState").val("");
                            $("#inputDistrict").val("");
                            $("#inputState").parent().css("opacity", 1);
                            $("#inputDistrict").parent().css("opacity", 1);
                        }
                    },
                });
            }
        }
    });
});

function phonenumber(inputtxt) {
    var phoneno = /^\d{10}$/;
    if (inputtxt.match(phoneno)) {
        return true;
    } else {
        return false;
    }
}

function final_step() {
    setTimeout(function() {
        var x = document.getElementsByClassName("tab");
        x[currentTab].style.display = "none";
        showTab(2);
    }, 300);
    jQuery("#nextBtn").hide();
    jQuery(".tab.thankyou .message").html(jQuery(".m_text_pay").text().trim());
    setTimeout(function() {
        window.location.href = window.location.href;
    }, 55000);
}

function final_step_single_form() {
    jQuery("#ag_donation_form").hide();
    jQuery("html,body").animate({
            scrollTop: jQuery("#thankyou").offset().top - 200
        },
        3000
    );
    jQuery(".thankyou .message").html(
        "Thank you for donation . Your account has been charged and your transaction is successful.<br>We will be processing your donation."
    );
    jQuery(".thankyou .message").show();
    setTimeout(function() {
        window.location.replace(window.location.href);
    }, 55000);
}
$("#loginbtn").click(function() {
    $("#loginModal").modal("show");
});
$(".registerpopup").click(function() {
    $("#loginModal").modal("hide");
    $("#forgotpasswordModal").modal("hide");
    $("#registerModal").modal("show");
});
$(".loginpopup").click(function() {
    $("#loginModal").modal("show");
    $("#registerModal").modal("hide");
    $("#forgotpasswordModal").modal("hide");
});

$(".forgotpasswordpopup").click(function() {
    $("#loginModal").modal("hide");
    $("#registerModal").modal("hide");
    $("#forgotpasswordModal").modal("show");
});