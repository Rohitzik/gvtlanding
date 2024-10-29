$(document).ready(function() {
    $('.mega-menu-megamenu .submenulinks.active').parents('.mega-menu-megamenu').addClass('current-man-menu-item');
    // Change Language (normal dropdown)
    $('#defaultLanguage').change(function() {
        $('#changeDefaultLanguage').submit();
    });
    //Change to default english lang on clicking logo
    $('#changeEngLanguage').click(function() {
        $('#changeEnglishLanguage').submit();
    });
    $('#defaultLanguage_2').click(function() {
        $('#changeDefaultLanguage_2').submit();
    });
    // End of Change Language (normal dropdown)

    // Change Language (div based dropdown)
    //$('.selectmenu .dropdown-menu li').click(function(event) {
    $('.dropdown-menus').change(function(event) {
        var defaultLanguage = $("#defaults").val();
        if (!$.isNumeric(defaultLanguage)) {
            window.open(defaultLanguage, '_blank'); //Uk and USa site direct opne in new tab because those not the language
        }
        if (defaultLanguage != 12 && defaultLanguage != 13 && defaultLanguage != 11 && defaultLanguage != 18) {
            $('#changeDefaultLanguage').attr('action', "https://www.akshayapatra.org/change-language");
        } else if (defaultLanguage == '12') {
            $('#changeDefaultLanguage').attr('action', "https://www.akshayapatra.org/change-language");
        } else if (defaultLanguage == '13') {
            $('#changeDefaultLanguage').attr('action', "https://www.akshayapatra.org/change-language");
        } else if (defaultLanguage == '11') {
            $('#changeDefaultLanguage').attr('action', "https://www.akshayapatra.org/change-language");
        } else if (defaultLanguage == '18') {
            $('#changeDefaultLanguage').attr('action', "https://www.akshayapatra.org/change-language");
        }
        $('#changeDefaultLanguage').submit();
        return false;
    });

    $('.selectmenu .dropdown-menu li a').filter(function() {
        var url = window.location.href;
        if ((url == 'https://www.akshayapatra.org/' || url == 'akshayapatra.org' || url == 'https://www.akshayapatra.org/') && $('#defaultLanguage').val() != 12 && $('#defaultLanguage').val() != 18 && $('#defaultLanguage').val() != 13 && $('#defaultLanguage').val() != 11) {
            if ($(this).attr('href') == $('#defaultLanguage').val()) {
                var lang_name = 'India';
                $('.selectmenu button span[data-bind="label"]').html(lang_name);
            }
        } else {
            if ($(this).attr('href') == $('#defaultLanguage').val()) {
                var lang_name = $(this).text();
                $('.selectmenu button span[data-bind="label"]').html(lang_name);
            }
        }
    });
    // End of Change Language (div based dropdown)

    //donation login page begins here
    $('#register_frms').validate({
        debug: false,
        rules: {
            first_name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
            mobile: {
                required: true,
            },
            password: {
                required: true,
                minlength: 5,
                maxlength: 10,
            },
            confirm_password: {
                required: true,
                minlength: 5,
                maxlength: 10,
                //equalTo: "#password",
            },
        },
        submitHandler: function() {
            $('#register_frms .status_message').html('');
            $.post("ajax/register_frms", $("#register_frms").serialize(), function(res) {
                if (res.status == 1) {
                    location.href = res.url;
                } else {
                    $('#register_frms .status_message').show();
                    $('#register_frms .status_message').html(res.msg);
                    $('#register_frms .status_message').fadeOut(8000);
                }
            });
        }

    });
    //donation login page end here

    //donation login page begins here
    $('#loginform').validate({
        debug: false,
        rules: {
            username: {
                required: true,
                email: true,
            },
            password: {
                required: true,
            },
        },
        submitHandler: function() {
            $('#loginform .status_message').html('');
            $.post("ajax/loginpage", $("#loginform").serialize(), function(res) {
                if (res.status == 1) {
                    if (res.login_user == 0) {
                        var update = confirm("Your profile is not updated do you want to udpate it");
                        if (update) {
                            location.href = 'my-account/onlinedonations';
                            exit;
                        } else {
                            location.href = res.url;
                        }
                    }
                    location.href = res.url;

                } else {
                    $('#loginform .status_message').show();
                    $('#loginform .status_message').html(res.msg);
                    $('#loginform .status_message').fadeOut(8000);
                    $('#loginform').each(function() {
                        this.reset(); //Here form fields will be cleared.
                    });
                }
            });
        }

    });
    //donation login page end here



    //donation login page begins here
    $('#forgotpasswordform').validate({
        debug: false,
        rules: {
            email: {
                required: true,
                email: true,
            },
        },
        submitHandler: function() {
            $('#forgotpasswordform .status_message').html('');
            $.post("ajax/forgotpassword", $("#forgotpasswordform").serialize(), function(res) {
                if (res.status == 1) {
                    $('#forgotpasswordform .status_message').show();
                    $('#forgotpasswordform .status_message').html(res.msg);
                    $('#forgotpasswordform .status_message').fadeOut(8000);
                } else {
                    $('#forgotpasswordform .status_message').show();
                    $('#forgotpasswordform .status_message').html(res.msg);
                    $('#forgotpasswordform .status_message').fadeOut(8000);
                }
            });
        }

    });
    //donation login page end here

    //Create campign validation page begins here

    $('#campaign_create_form').validate({
        debug: false,
        rules: {
            campaign_name: {
                required: true,
            },
            goal_amount: {
                required: true,
            },
            start_date: {
                required: true,
            },
            end_date: {
                required: true,
            },
            campaign_short_desc: {
                required: true,
            },
        },
        submitHandler: function() {
            form.submit();
        }

    });

    $("#f_login_user").click(function() {
        $('#loginModal').modal('show');
    });
    ///Create campign validation page end here

    //subscriver code page begins here
    $('#subscribers').validate({
        debug: false,
        rules: {
            name: {
                required: true,
            },
            email: {
                required: true,
                email: true,
            },
        },
        submitHandler: function() {
            form.submit();
        }

    });
    //subscriver code end here

    //corporate partners red more code starts here
    $(".read-button.p_read-button").click(function() {
        $(this).parents(".box-border_wrapper").find(".p_description").toggleClass("open_p");
        if ($(this).text() === "Read More") {
            $(this).text("Read Less");
        } else {
            $(this).text("Read More");
        }
    });
    //corporate partners red more code ends here

    jQuery('#yeardown').click(function() {
        jQuery('.yearset1').hide();
        jQuery('.yearset2').show();
    })
    jQuery('#yearup').click(function() {
        jQuery('.yearset1').show();
        jQuery('.yearset2').hide();
    })

    //get_states();
    $(document).on('change', '#country_id', function() {
        get_states();
        if ($("#country_id").val() == 1) {
            $("#state_id").show();
            $("#state_select").show();
            $('#province_id').hide();
        } else if ($("#country_id").val() != 1) {
            $("#province_id").show();
            $("#state_select").hide();
            //$("#province_id").show();
        }
    });

    if ($("#country_id").val() == 1 || $("#country_id").val() == "") {
        $("#state_id").show();
        $("#state_select").show();
        $('#province_id').hide();
    } else if ($("#country_id").val() != 1) {
        $("#province_id").show();
        $("#state_select").hide();
        //$("#province_id").show();
    }

    function get_states() {
        var country_id = $('#country_id').val();
        if (typeof(country_id) === 'undefined') {
            return;
        } else {
            $('#state_id').html('<option value="">Loading...</option>');
            $.getJSON('ajax/getstates/' + country_id, function(data) {
                var state_id_options = '<option value="">-- Select State --</option>';
                $.each(data, function(key, item) {
                    state_id_options += '<option value="' + item.state_id + '">' + item.state_name + '</option>';
                });
                $('#state_id').html(state_id_options);
            });
        }
    }
    //get_states end here;
    //
    //CKEDITOR START
    var ckConfig = {
        filebrowserBrowseUrl: 'includes/ckfinder/ckfinder.html',
        filebrowserImageBrowseUrl: 'includes/ckfinder/ckfinder.html?type=Images',
        filebrowserFlashBrowseUrl: 'includes/ckfinder/ckfinder.html?type=Flash',
        filebrowserUploadUrl: 'includes/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files',
        filebrowserImageUploadUrl: 'includes/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Images',
        filebrowserFlashUploadUrl: 'includes/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Flash'
    }

    $('.ckeditor').each(function() {
        var currentInatance = $(this).attr('id');
        var editor = CKEDITOR.replace(currentInatance, ckConfig);
        CKFinder.setupCKEditor(editor, '../');
    });
    //CKEDITOR END
});