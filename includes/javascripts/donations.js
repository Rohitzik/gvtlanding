$("#screenwidth").val(screen.width);
$("#screenheight").val(screen.height);

//new script added
var pagepathurl = window.location.pathname;
//alert(pagepathurl);
var campaignid = $('#campaign_id').val();
//alert(campaignid);
if (pagepathurl == "/donate-in-memory-of-someone-you-love" || pagepathurl == "/donate-in-honor-of-the-one-you-admire" || pagepathurl == "/wire-transfer-cheque-dd" || pagepathurl == "/donate-for-a-special-occasion" || pagepathurl == "/onlinedonations") {
    if (campaignid == "") {
        $("#donations_id_13").prop("checked", true);
        $("#chidlrenserved").html(3);
        $("#donation_amount").val(4800);
        $("#hidamount").val(4800);
        $("#hidamount").html(4800);
    }
} else if (pagepathurl == "/sponsor-a-school-for-a-year") {
    $("#donations_id_0").prop("checked", true);
    $("#donation_amount").val(480000);
    $("#hidamount").val(480000);
    $("#hidamount").html(480000);
} else if (pagepathurl == "/sme-donations") {
    $("#donations_id_4").prop("checked", true);
    $("#donation_amount").val(100000);
    $("#hidamount").val(100000);
    $("#hidamount").html(100000);
} else {
    $("#donation_amount").val();
    $("#hidamount").val();
    $("#hidamount").html();
}


$(".bankdtls").hide();
$(".donordetails").show();
$("input[id=6]").on("click", function () {
    $(".bankdtls").hide();
    $(".donordetails").show();
});
$("input[id=4]").on("click", function () {
    $(".bankdtls").show();
    $(".donordetails").hide();
});
$("input[id=13]").on("click", function () {
    $(".bankdtls").show();
    $(".donordetails").hide();
});
//end

$("#otheroccasionfld").hide();

function onchangeoccasion(val) {
    if (val == "Other") {
        $("#otheroccasionfld").show();
    } else {
        $("#otheroccasionfld").hide();
    }
}

function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}

//if browse is IE8 Or less this if condtions will check code begins here
function getInternetExplorerVersion() {
    var rv = -1;
    if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re = new RegExp("MSIE ([0-8]{1,}[\.0-8]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat(RegExp.$1);
    }
    return rv;
}

//new donation validation code
function chk_other_donationamt() {
    var donatnamt = $("#other_amount").val();
    var donatnamt_a = $("#other_amount_a").val();
    var donatnamt_h = $("#other_amount_h").val();
    $('#mode_id_note_error_while_filling').hide();
    $('#mode_id_error_while_filling').hide();
    if (donatnamt !== '' && donatnamt < 499) {
        $('#other_amount').focus();
        $('#donationamt_error_while_filling').show();
    } else if (donatnamt_a !== '' && donatnamt_a < 499) {
        $('#other_amount_a').focus();
        $('#donationamt_error_while_filling').show();
    } else if (donatnamt_h !== '' && donatnamt_h < 499) {
        $('#other_amount_h').focus();
        $('#donationamt_error_while_filling').show();
    } else {
        $('#donationamt_error_while_filling').hide();
    }

}

function chk_donationamt() {
    var donatnamt = $("#other").val();
    var donations_amount = $("input[name=donations_amount]:checked").val();
    $('#mode_id_note_error_while_filling').hide();
    $('#mode_id_error_while_filling').hide();
    if (donations_amount == 'other' && donatnamt == '') {
        $('#other').focus();
        $('#donationamt_error_while_filling').show();
    } else {
        $('#donationamt_error_while_filling').hide();
    }
}
$('#donationamt_error_while_filling').hide();

function chk_citizenshipsel() {
    if (!$("input[name='mode_id']:checked").val()) {
        //$("input[name='mode_id']").focus();
        $("#7").focus();
        $('#mode_id_error_while_filling').show();
        $('#mode_id_note_error_while_filling').show();
        $('#donationamt_error_while_filling').show();
    } else {
        $('#mode_id_note_error_while_filling').hide();
        $('#mode_id_error_while_filling').hide();
        $('#donationamt_error_while_filling').hide();
    }
}
//end

//if browse is IE8 Or less this if condtions will check code end here
//new online daonation page
$("#hoverdropdown").hide();
$("a").click(function () {
    var slectedamt = $(this).attr("id");
    //alert(slectedamt);
    if (slectedamt != 'other') {
        $("#donation_amount").val(slectedamt);
        $('#otheramt').hide();
    } else {
        $('#otheramt').show();
    }
    $("#hoverdropdown").hide();
})
/*function onchangeamount(val){
 var donation_amount = $("#sel_donation_amount").val();
 if(donation_amount != 'other'){
 $("#donation_amount").val(donation_amount);
 $('#otheramt').hide();
 }else{
 $('#otheramt').show();
 }
 }
 function onchangeamtother(val){
 var other_amt = $("#other_amt").val();
 $("#donation_amount").val(other_amt);
 }*/
//end

//mid day meal chked for new donation page
$("#mid_day_meal_plate_chked").change(function () {
    //alert('sss');
    var donations_amount = $("input[name=donations_amount]:checked").val();
    if (donations_amount == 'other') {
        var donations_amount = $("#other").val();
    }
    if (this.checked) {
        var no_of_plate = parseInt(donations_amount / 1100);
        //alert(no_of_plate);
        $("#mid_day_meal_plates").val(no_of_plate);
        var mid_day_meal_plate_chked = $("input[name=mid_day_meal_plate_chked]:checked").val();
        if (mid_day_meal_plate_chked == 1 && donations_amount != '') {
            var mid_day_meal_amt = parseInt(no_of_plate * 115);
            $("#mid_day_meal_amt").val(mid_day_meal_amt);
            var total_donation_amt = (parseInt(donations_amount) + parseInt(mid_day_meal_amt));
            $("#donation_amount").val(total_donation_amt);
        }
    } else {
        $("#donation_amount").val(donations_amount);
    }
});

function onchange_numof_mealplate(val) {
    var donations_amount = $("input[name=donations_amount]:checked").val();
    if (donations_amount == 'other') {
        var donations_amount = $("#other").val();
    }
    var no_of_plate = val;
    var mid_day_meal_plate_chked = $("input[name=mid_day_meal_plate_chked]:checked").val();
    if (mid_day_meal_plate_chked == 1 && donations_amount != '') {
        $("#mid_day_meal_plates").val(no_of_plate);
        var mid_day_meal_amt = parseInt(no_of_plate * 115);
        var total_donation_amt = (parseInt(donations_amount) + parseInt(mid_day_meal_amt));
        $("#donation_amount").val(total_donation_amt);
    } else {
        $("#donation_amount").val(donations_amount);
    }
}
//end

//mid day meal amount for donation page
$("#mid_day_meal_plate_chk").change(function () {
    donationamtchk();
    var donations_amount = $("input[name=donations_amount]:checked").val();
    if (donations_amount == 'other') {
        var donations_amount = $("#other").val();
    }

    if (this.checked) {
        var mid_day_meal_plate_chk = $("input[name=mid_day_meal_plate_chk]:checked").val();
        if (mid_day_meal_plate_chk == 1 && donations_amount != '') {
            var mid_day_meal_amt = $("#mid_day_meal_amt").val();
            if (mid_day_meal_amt == "") {
                $("#mid_day_meal_amt").val(115);
                $("#mid_day_meal_plates").val(1);
                mid_day_meal_amt = 115;
            }
            var total_donation_amt = (parseInt(donations_amount) + parseInt(mid_day_meal_amt));
            $("#donation_amount").val(total_donation_amt);
            $("#hidamount").html(total_donation_amt);
        }

    } else {
        $("#donation_amount").val(donations_amount);
        $("#hidamount").html(donations_amount);
        $("#mid_day_meal_amt").val('');
        $("#mid_day_meal_plates").val('');
    }

    //currency exchange rate begin on change amount
    var currency_code = $('#currency_code').val();
    //alert(currency_code);
    //currency_exchange_rate(currency_code);
    //currency exchange rate end on change amount

});

function donationamtchk() {
    var donations_amount_chk = $("input[name=donations_amount]:checked").val();
    //alert(donations_amount_chk);
    if (donations_amount_chk == 'other') {
        var donations_amount = $("#other").val();
        if (donations_amount != '') {
            $('#donations_amount_chk_error').hide();
        } else {
            $('#donations_amount_chk_error').show();
        }
    } else {
        $('#donations_amount_chk_error').hide();
    }
}

function onchangenumofplateformiddaymeal(val) {
    var no_of_plates_mid_day_meal = val;
    var donations_amount = $("input[name=donations_amount]:checked").val();
    if (donations_amount == 'other') {
        var donations_amount = $("#other").val();
    }
    var amount_per_plate = no_of_plates_mid_day_meal * 115;
    $("#mid_day_meal_amt").val(amount_per_plate);
    if (donations_amount != '') {
        var total_donation_amt = (parseInt(donations_amount) + parseInt(amount_per_plate));
    } else {
        var total_donation_amt = (parseInt(amount_per_plate));
    }

    $("#donation_amount").val(total_donation_amt);
    //currency exchange rate begin on change amount
    var currency_code = $('#currency_code').val();
    //currency_exchange_rate(currency_code);
    //currency exchange rate end on change amount

}
//end
//for plates donation start
function onchangenumofplateforvri(val) {
    var no_of_plates = $("#no_of_plates_vri").val();
    var amount_per_plate = no_of_plates * 115;
    $("#donation_amount1").val(amount_per_plate);
    if (amount_per_plate != '') {
        $("#donation_amount").val(amount_per_plate);
    }
}

function onchangenumofplateforbhav(val) {
    var no_of_plates = $("#no_of_plates_bhav").val();
    var amount_per_plate = no_of_plates * 115;
    $("#donation_amount2").val(amount_per_plate);
    if (amount_per_plate != '') {
        $("#donation_amount").val(amount_per_plate);
    }
}

function onchangenumofplateforpuri(val) {
    var no_of_plates = $("#no_of_plates_puri").val();
    var amount_per_plate = no_of_plates * 115;
    $("#donation_amount3").val(amount_per_plate);
    if (amount_per_plate != '') {
        $("#donation_amount").val(amount_per_plate);
    }
}

function show_plates_required(val) {
    if (val == 'Vrindavan') {
        $("#no_of_plates_bhav").val('');
        $("#no_of_plates_puri").val('');
        $("#donation_amount2").val('');
        $("#donation_amount3").val('');
    } else if (val == 'Bhavnagar') {
        $("#no_of_plates_vri").val('');
        $("#no_of_plates_puri").val('');
        $("#donation_amount1").val('');
        $("#donation_amount3").val('');
    } else {
        $("#no_of_plates_vri").val('');
        $("#no_of_plates_bhav").val('');
        $("#donation_amount1").val('');
        $("#donation_amount2").val('');
    }
}
//plates donation end
//for online-fund-raising-campaign-or-share-my-lunch start
//var target_of_children = $("#target_of_children").val();
function onchangechildren(val) {
    var no_of_children = $("#no_of_children").val();
    if (no_of_children != 'other') {
        var amount_per_child = no_of_children * 1500;
        $("#donation_amount").val(amount_per_child);
        $("#hidamount").html(amount_per_child);
        //$("#target_of_children").val(target_of_children - no_of_children);
        //$("#targetofchildren").html(target_of_children - no_of_children);
        $('#otherchildren').hide();

    } else {
        $('#otherchildren').show();
        //$("#target_of_children").val(target_of_children);
        //$("#targetofchildren").html(target_of_children);
    }

}

function onchangechilrendother(val) {
    var other_no_children = $("#other_children").val();
    var amount_per_child = other_no_children * 1500;
    $("#donation_amount").val(amount_per_child);
    $("#hidamount").html(amount_per_child);
    //$("#target_of_children").val(target_of_children - other_no_children);
    //$("#targetofchildren").html(target_of_children - other_no_children);
}
//end
//for online-fund-raising-campaign start
/*var target_of_children = $("#target_of_children").val();
 function onchangechildren(val){
 var no_of_children = $("#no_of_children").val();
 if(no_of_children != 'other'){
 var amount_per_child = no_of_children * 1100;
 $("#donation_amount").val(amount_per_child);
 $("#hidamount").html(amount_per_child);
 $("#target_of_children").val(target_of_children - no_of_children);
 $("#targetofchildren").html(target_of_children - no_of_children);
 $('#otherchildren').hide();
 }else{
 $('#otherchildren').show();
 $("#target_of_children").val(target_of_children);
 $("#targetofchildren").html(target_of_children);
 }
 }
 function onchangechilrendother(val){
 var other_no_children = $("#other_children").val();
 var amount_per_child = other_no_children * 1100;
 $("#donation_amount").val(amount_per_child);
 $("#hidamount").html(amount_per_child);
 $("#target_of_children").val(target_of_children - other_no_children);
 $("#targetofchildren").html(target_of_children - other_no_children);
 } */
//end

/*only donate code start*/
//$('#otheramount').hide();
function onchangedonationamtperday(val) {
    var donation_amt_per_day = $("#donation_amt_per_day").val();
    //alert(donation_amt_per_day);
    if (donation_amt_per_day != '' && donation_amt_per_day != 'other') {
        $("#donations_id_5").attr("checked", true);
        $("#donation_amount").val(donation_amt_per_day);
        $("#hidamount").html(donation_amt_per_day);
        $('#other').val('');
        $('#other').hide();
        $('#otheramount').hide();
        $('#donation_amt_per_mnth').val('');
        $('#donation_amt_per_yr').val('');
        $('#donations_id_5').prop('checked', true);
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other').show();
        $('#otheramount').show();
        $("#donation_amt_per_yr").val('');
        $('#donation_amt_per_mnth').val('');
    }
}

function onchangedonationamtpermonth(val) {
    var donation_amt_per_mnth = $("#donation_amt_per_mnth").val();
    //alert(donation_amt_per_mnth);
    if (donation_amt_per_mnth != '' && donation_amt_per_mnth != 'other') {
        $("#donation_amount").val(donation_amt_per_mnth);
        $("#hidamount").html(donation_amt_per_mnth);
        $('#other').val('');
        $('#other').hide();
        $('#otheramount').hide();
        $("#donation_amt_per_yr").val('');
        $("#donation_amt_per_day").val('');
        $('#donations_id_95').prop('checked', true);
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other').show();
        $('#otheramount').show();
        $("#donation_amt_per_yr").val('');
        $("#donation_amt_per_day").val('');
    }
}

function onchangedonationamtperyear(val) {
    var donation_amt_per_yr = $("#donation_amt_per_yr").val();
    //alert(donation_amt_per_yr);
    if (donation_amt_per_yr != '' && donation_amt_per_yr != 'other') {
        $("#donation_amount").val(donation_amt_per_yr);
        $("#hidamount").html(donation_amt_per_yr);
        $('#other').val('');
        $('#other').hide();
        $('#otheramount').hide();
        $('#donation_amt_per_mnth').val('');
        $("#donation_amt_per_day").val('');
        $('#donations_id_950').prop('checked', true);
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other').show();
        $('#otheramount').show();
        $('#donation_amt_per_mnth').val('');
        $("#donation_amt_per_day").val('');
    }
}
/*donate only code ends*/

//sanitisation kit for donation page
if (pagepathurl == "/donate-in-memory-of-someone-you-love" || pagepathurl == "/donate-in-honor-of-the-one-you-admire" || pagepathurl == "/wire-transfer-cheque-dd" || pagepathurl == "/donate-for-a-special-occasion" || pagepathurl == "/onlinedonations") {
    $("#senitisation_kit_amt").val(300);
} else {
    $("#senitisation_kit_amt").val(100);
}

$("#senitisation_kit_chk").change(function () {
    var pagepathname = window.location.pathname;
    var seldonationamount = $(".selamount input[type=\"radio\"]").val();
    var other_meals_amount = $("#other_meals_amount").val();
    var otheramount = $("#other").val();
    var donationsamount = $("input[name=donations_amount]:checked").val();
    //alert(seldonationamount);
    //alert(pagepathname);
    if (pagepathname == "/back-to-school" || pagepathname == "/smithsgroupindia" || pagepathname == "/donate-to-midday-meal-programme1" || pagepathname == "/feed-for-freedom" || pagepathname == "/pledge-to-feed" || pagepathname == "/help-school-going-children" || pagepathname == "/make-a-donation-on-navratri1") {
        boxdonationamtchk();
        var donationamount = $("input[name=donation_amount]:checked").val();
        var donations_amount_chk = $("#other_meals_amount").val();
        if (donationamount == 'other') {
            var donations_amount = $(".otheramt").val();
        }
        //alert(donationamount);
    } else {
        if (other_meals_amount != null) {
            var donations_amount = other_meals_amount;
        } else if (otheramount !== "") {
            var donations_amount = otheramount;
            //alert('hi');
        } else if (donationsamount != null) {
            var donations_amount = donationsamount;
            //alert(donations_amount);
        } else {
            donationamtchk();
            var donations_amount = $("input[name=donations_amount]:checked").val();
            var pagepathname = window.location.pathname;
            if (donations_amount == 'other') {
                var donations_amount = $(".otheramt").val();
            }
        }
    }

    if (this.checked) {
        var senitisation_kit_chk = $("input[name=senitisation_kit_chk]:checked").val();
        if (senitisation_kit_chk == 1 && donations_amount != '' && seldonationamount == null) {
            var senitisation_kit_amt = $("#senitisation_kit_amt").val();
            if (senitisation_kit_amt == "") {
                if (pagepathname == '/donate-family-happiness-kits' || pagepathname == '/donate-happiness-boxes') {
                    $("#senitisation_kit_amt").val(150);
                    $("#senitisation_kits").val(1);
                    senitisation_kit_amt = 150;
                } else {
                    $("#senitisation_kit_amt").val(100);
                    $("#senitisation_kits").val(1);
                    senitisation_kit_amt = 100;
                }
            }
            if (pagepathname == "/back-to-school2" || pagepathname == "/smithsgroupindia" || pagepathname == "/donate-to-midday-meal-programme1" || pagepathname == "/feed-for-freedom" || pagepathname == "/pledge-to-feed" || pagepathname == "/help-school-going-children" || pagepathname == "/make-a-donation-on-navratri1") {
                if (donations_amount_chk != "") {
                    var total_donation_oamt = (parseInt(donations_amount_chk) + parseInt(senitisation_kit_amt));
                    $("#donation_amount").val(total_donation_oamt);
                    $("#hidamount").html(total_donation_oamt);
                } else {
                    var total_donation_amt = (parseInt(donationamount) + parseInt(senitisation_kit_amt));
                    $("#donation_amount").val(total_donation_amt);
                    $("#hidamount").html(total_donation_amt);
                }
            } else {
                var total_donation_amt = (parseInt(donations_amount) + parseInt(senitisation_kit_amt));
                $("#donation_amount").val(total_donation_amt);
                $("#hidamount").html(total_donation_amt);
            }
        } else {
            //var feeds_children = seldonationamount/1500;
            //var senitisation_kit_amt = feeds_children*100;

            var total_donation_amt = (parseInt(seldonationamount) + 100);
            $("#donation_amount").val(total_donation_amt);
            $("#hidamount").html(total_donation_amt);
        }

    } else {
        if (pagepathname == "/back-to-school2" || pagepathname == "/smithsgroupindia" || pagepathname == "/donate-to-midday-meal-programme1" || pagepathname == "/feed-for-freedom" || pagepathname == "/pledge-to-feed" || pagepathname == "/help-school-going-children" || pagepathname == "/make-a-donation-on-navratri1") {
            if (donations_amount_chk != "") {
                $("#donation_amount").val(donations_amount_chk);
                $("#hidamount").html(donations_amount_chk);
                $("#senitisation_kit_amt").val('');
                $("#senitisation_kits").val('');
            } else {
                var tdonationamount = $(".selamount input[type=\"radio\"]").val();
                var rdonationamount = parseInt(tdonationamount) / 1500;
                //alert(tdonationamount);
                //alert(rdonationamount);
                var mdonationamount = Math.round(rdonationamount);
                var sdonationamount = parseInt(mdonationamount) * 100;
                //alert(sdonationamount);
                var donationamount = parseInt(tdonationamount) - parseInt(sdonationamount);
                //alert(donationamount);
                $("#senitisation_kit_amt").val('');
                $("#senitisation_kits").val('');
                $("#donation_amount").val(donationamount);
                $("#hidamount").html(donationamount);
            }
        } else if (seldonationamount == null) {
            $("#donation_amount").val(donations_amount);
            $("#hidamount").html(donations_amount);
            $("#senitisation_kit_amt").val('');
            $("#senitisation_kits").val('');
        } else {
            $("#donation_amount").val(seldonationamount);
            $("#hidamount").html(seldonationamount);
            $("#senitisation_kit_amt").val('');
            $("#senitisation_kits").val('');
        }
    }

});

function boxdonationamtchk() {
    var donations_amount_chk = $("input[name=donation_amount]:checked").val();
    //alert(donations_amount_chk);
    if (donations_amount_chk == 'other') {
        var donations_amount = $("#other").val();
        if (donations_amount != '') {
            $('#donations_amount_chk_error').hide();
        } else {
            $('#donations_amount_chk_error').show();
        }
    } else {
        $('#donations_amount_chk_error').hide();
    }
}

function pinzipplaceholder() {
    var countryid = $("#country_id").val();
    if (countryid == 1) {
        $('#postal_code').attr("placeholder", "Pin Code");
    } else {
        $('#postal_code').attr("placeholder", "Zip Code");
    }
}

function get_currency_val() {
    var currency_code = $('#currency_code').val();
    var donation_amount = $('#donation_amount').val();
    $.getJSON('ajax/currency_convesion/' + currency_code + '/' + donation_amount, function (data) {
        if (data != "") {
            $("#convert_amt").val(data);
        } else {
            $("#convert_amt").val('');
        }
    });

}
//get currency converted value
$(document).on('change', '#currency_code', function () {
    get_currency_val();
});

$(document).ready(function () {
    $(".view-more").click(function () {
        $(".view-more").hide();
        $('.view-read-more').attr('style', 'max-height: none;');
    });

    $("#autocomplete").on("keydown", function (event) {
        if (event.which == 13)
            return false;
        return true;
    });

    //optum employee email validate
    $.validator.addMethod("isemailuhcOroptum",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'optum') {
                return /.+@(uhc|optum)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use @uhc.com and @optum.com domains only."
    );
    //End optum employee email validate

    //astrazeneca employee email validate
    $.validator.addMethod("isemailastrazeneca",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'astrazeneca') {
                return /.+@(gmail|yahoo|outlook|rediff)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use your personal email id only."
    );
    //end astrazeneca employee email validate

    //adobe employee email validate
    $.validator.addMethod("isemailadobe",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'adobe') {
                return /.+@(adobe)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use @adobe.com only."
    );
    //End adobe employee email validate

    //collabera employee email validate
    $.validator.addMethod("isemailcollabera",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'joylicious') {
                return /.+@(collabera)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use @collabera.com only."
    );
    //End collabera employee email validate

    //collabera employee email validate
    $.validator.addMethod("isemailascendion",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'nourishing-future') {
                return /.+@(ascendion)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use @ascendion.com only."
    );
    //End collabera employee email validate

    //applied-materials employee email validate
    $.validator.addMethod("isemailamat",
        function (value, element) {
            if ($("input[name=donation_url]").val() == 'applied-materials') {
                return /.+@(contractor.amat|amat)\.com$/.test(value);
            } else {
                return true;
            }
        },
        "Kindly use @amat.com only."
    );
    //End applied-materials employee email validate

    //custom validation rule
    $.validator.addMethod("customemail",
        function (value, element) {
            return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
        },
        "Please enter ealid Email-Id"
    );

    $.validator.addMethod("lettersonly",
        function (value, element) {
            return this.optional(element) || /^[a-z\s]+$/i.test(value);
        },
        "Please enter valid name"
    );

    $.validator.addMethod("Mobileno",
        function (value, element) {
            return this.optional(element) || value.length === 10;
        },
        "Please enter valid phone number"
    );

    //pincode validation
    $.validator.addMethod("validpincode",
        function (value, element) {
            return this.optional(element) || value.length === 6;
        },
        "Please enter valid Pincode number"
    );


    //commented below code as per requirement on 6-jan-2017
    /* $("#login_user").click(function() {
     $('#myLogin').modal('show');
     }); */

    //login form popup for donatin page end here

    //vehicle donation code begins here 2/1
    $(".vehicle_mode").click(function () {
        var vehicle_title_mode = $("input[name=vehicle_title_mode]:checked").val();
        if (vehicle_title_mode == 1) {
            $("#vehicle_title_name").show();
        } else {
            $("#vehicle_title_name").hide();
        }
    })

    if ($("input[name=vehicle_title_mode]:checked").val() == 1) {
        $("#vehicle_title_name").show();
    } else {
        $("#vehicle_title_name").hide();
    }
    //vehicle donation code end here 2/1
    //how did you hear about us code begins here
    $("#how_did_you_hear_us").change(function () {
        if ($("#how_did_you_hear_us").val() == 'Friends & Family' || $("#how_did_you_hear_us").val() == 'Others') {
            $("#hear_from").show();
        } else {
            $("#hear_from").hide();
        }
    })
    if ($("#how_did_you_hear_us").val() == 'Friends & Family' || $("#how_did_you_hear_us").val() == 'Others') {
        $("#hear_from").show();
    } else {
        $("#hear_from").hide();
    }
    //how did you hear about us code end here
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
        submitHandler: function () {
            // alert("hii");
            /* $.post("ajax/loginpage", $("#share_form #loginform").serialize(), function(res) {
             if (res.status == 1) {
             if (res.login_user == 0) {
             var update = confirm("Your profile not updated do you want to udpate it");
             if (update) {
             location.href = 'my-account/onlinedonations';
             exit;
             }
             else {
             location.href = res.url;
             }
             }
             location.href = res.url;
             
             } else {
             $('#loginform > span').html(res.msg);
             $('#loginform > span').fadeOut(8000);
             $('#loginform').each(function() {
             this.reset();   //Here form fields will be cleared.
             });
             }
             });*/
        }

    });
    //donation login page end here

    //form_donation_dd_cheque form validation
    $('#form_donation_dd_cheque').validate({
        debug: false,
        rules: {
            firstname: {
                required: true,
                minlength: 2,
                maxlength: 50,
                lettersonly: true,
            },
            email_id: {
                required: true,
                email: true,
                email: true,
                customemail: true,
            },
            addres: {
                required: function (element) {
                    return ($("input[name=receipt_through_online_or_offline]:checked").val() == '0' || $("input[name=mode_id]:checked").val() == '4' && $("input[name=donation_url]").val() != 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() != 'i-share-my-lunch' || $("input[name=donation_url]").val() != 'project-hunger1' || $("input[name=donation_url]").val() != 'project-hunger-2');

                }
            },
            countryid: {
                required: function (element) {
                    return ($("input[name=receipt_through_online_or_offline]:checked").val() == '0' || $("input[name=mode_id]:checked").val() == '4' && $("input[name=donation_url]").val() != 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() != 'i-share-my-lunch' || $("input[name=donation_url]").val() != 'project-hunger1' || $("input[name=donation_url]").val() != 'project-hunger-2');

                }
            },
            state: {
                required: function (element) {
                    return ($("#country_id").val() == "1");
                },
            },
            phone_no: {
                required: true,
                digits: true,
                Mobileno: true,
            },
            captcha_result: {
                required: true,
                validCaptcha1: true
            },
        },
        messages: {
            captcha_result: {
                required: "Validate.",
                validCaptcha1: "Invalid."
            },
        },
        submitHandler: function () {
            $("#step2").css("display", "block");
            form.submit();
        }

    });

    $.validator.addMethod('validCaptcha1', function (value) {
        $result = (parseInt($('#num11').val()) + parseInt($('#num22').val()) == parseInt($('#captcha_result1').val()));
        return $result;
    },
        'Incorrect value, please try again.'
    );

    /*$('#form_donation_dd_cheque').submit(function() {
        var error = 0;
        var captchaval = $('#g-recaptcha-response').val();
        $('.recaptcha-error-message').hide();
        if (captchaval <= 0) {
            var error = 1
            $('.recaptcha-error-message').show();
        }
        if (error == "1") {
            return false; //result = true;
        } else {
            result = false;
        }

    });*/
    //end

    //if browse is IE8 Or less this if condtions will check code begins here
    if (getInternetExplorerVersion() == 7 || getInternetExplorerVersion() == 8) { } else {
        var captchaval = $('#g-recaptcha-response').val();
        $('#form_donation').validate({
            debug: false,
            rules: {
                //vehicle donation code begins here 2/2
                no_of_smiles: {
                    required: function (element) {
                        return ($("#per_smile").val() != "" && $("#no_of_smiles").val() <= "0");
                    },
                    min: 1
                },
                /*donation_amt_per_meal: {
                 required: function(element) {
                 return ($("input[name=donation_url]").val() == 'donate-to-gorakhpur-flood-relief' && $("#other_meals").val() == '' && $("#other_meals_amount").val() == '');
                 },
                 },
                 other_meals: {
                 required: function(element) {
                 return ($("input[name=donation_url]").val() == 'donate-to-gorakhpur-flood-relief' && $("#donation_amt_per_meal").val() == 'other');
                 },
                 },*/
                occasion_honor_pan_no: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'project-hunger1' && $("input[name=tax_excp_cert]:checked").val() == 'tax_excp_cert');
                    },
                },
                donationsamount: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2' && $("#other_meals_amount").val() == '');
                    },
                    donationsamountvaldtn: true,
                },
                donations_amount: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'nokhaalipet' && $("#other_meals_amount").val() == '');
                    },
                },
                other_meals_amount: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'donate-to-gorakhpur-flood-relief' || $("input[name=donation_url]").val() == 'donate-to-kerala-flood-relief' || $("input[name=donation_url]").val() == 'donate-to-odisha-cyclone-relief' || $("input[name=donation_url]").val() == 'growwithsadya' || $("input[name=donation_url]").val() == 'hunger-action-month' || $("input[name=donation_url]").val() == 'scholarship' || $("input[name=donation_url]").val() == 'covid-relief-services' || $("input[name=donation_url]").val() == 'donate-for-covid-relief' || $("input[name=donation_url]").val() == 'vedanta-group' || $("input[name=donation_url]").val() == 'mufg' || $("input[name=donation_url]").val() == 'world-hunger-day' || $("input[name=donation_url]").val() == 'boa' || $("input[name=donation_url]").val() == 'trendmicro' || $("input[name=donation_url]").val() == 'serving-the-shramiks' || $("input[name=donation_url]").val() == 'economics-for-the-real-world' || $("input[name=donation_url]").val() == 'artists-for-a-cause' || $("input[name=donation_url]").val() == 'donate-to-shramiks-feeding' || $("input[name=donation_url]").val() == 'iim' || $("input[name=donation_url]").val() == 'support-now' || $("input[name=donation_url]").val() == 'preparing-for-boards' || $("input[name=donation_url]").val() == 'feeding-covid19-patients' || $("input[name=donation_url]").val() == 'hp' || $("input[name=donation_url]").val() == 'empower-to-educate' || $("input[name=donation_url]").val() == 'covidfoodrelief' || $("input[name=donation_url]").val() == '3i' || $("input[name=donation_url]").val() == 'bkt' || $("input[name=donation_url]").val() == 'morgan-stanley' || $("input[name=donation_url]").val() == 'jp-infra' || $("input[name=donation_url]").val() == 'franklin-templeton' || $("input[name=donation_url]").val() == 'tangerine' || $("input[name=donation_url]").val() == 'donate-happiness-boxes' || $("input[name=donation_url]").val() == 'nomura' || $("input[name=donation_url]").val() == 'bbk' || $("input[name=donation_url]").val() == 'bluedart-dhl' || $("input[name=donation_url]").val() == 'honour-your-ancestors' || $("input[name=donation_url]").val() == 'joy-of-giving' || $("input[name=donation_url]").val() == 'motilal-oswal' || $("input[name=donation_url]").val() == 'joy-of-giving-week' || $("input[name=donation_url]").val() == 'tripura' || $("input[name=donation_url]").val() == 'world-food-day' || $("input[name=donation_url]").val() == 'ekthali' || $("input[name=donation_url]").val() == 'the-joy-of-giving' || $("input[name=donation_url]").val() == 'sublime-life' || $("input[name=donation_url]").val() == 'gep' || $("input[name=donation_url]").val() == 'ta-digital' || $("input[name=donation_url]").val() == 'diwaligiving' || $("input[name=donation_url]").val() == 'iex' || $("input[name=donation_url]").val() == 'donate-on-this-diwali' || $("input[name=donation_url]").val() == 'giving-tuesday' || $("input[name=donation_url]").val() == 'covid-stories' || $("input[name=donation_url]").val() == 'gift-a-child' || $("input[name=donation_url]").val() == 'happy-new-year' || $("input[name=donation_url]").val() == 'tcs' || $("input[name=donation_url]").val() == 'egain' || $("input[name=donation_url]").val() == 'school-sanitisation' || $("input[name=donation_url]").val() == 'donate-and-save-tax' || $("input[name=donation_url]").val() == 'tax-exemption-donations' || $("input[name=donation_url]").val() == 'pledge-to-support' || $("input[name=donation_url]").val() == 'donate-to-feed-children' || $("input[name=donation_url]").val() == 'donate-to-midday-meal-programme' || $("input[name=donation_url]").val() == 'womens-day' || $("input[name=donation_url]").val() == 'feed-the-homeless-mothers' || $("input[name=donation_url]").val() == 'deutsche-bank' || $("input[name=donation_url]").val() == 'yatri-sewa' || $("input[name=donation_url]").val() == 'wells-fargo' || $("input[name=donation_url]").val() == 'sewa' || $("input[name=donation_url]").val() == 'abinbev' || $("input[name=donation_url]").val() == 'donate-on-akshaya-tritiya' || $("input[name=donation_url]").val() == 'bkt-akshaya-patra-covid-food-relief' || $("input[name=donation_url]").val() == 'amway' || $("input[name=donation_url]").val() == 'feed-the-marginalised-communities' || $("input[name=donation_url]").val() == 'project-hunger' || $("input[name=donation_url]").val() == 'ness' || $("input[name=donation_url]").val() == 'digbi' || $("input[name=donation_url]").val() == 'gradeup' || $("input[name=donation_url]").val() == 'barclays-akshaya-patra-covid-relief' || $("input[name=donation_url]").val() == 'checkmate-covid' || $("input[name=donation_url]").val() != 'donate-cooked-meals' || $("input[name=donation_url]").val() == 'artisans' || $("input[name=donation_url]").val() == 'fathers-day' || $("input[name=donation_url]").val() == 'grab-grecco-llp' || $("input[name=donation_url]").val() == 'donate-family-happiness-kits' || $("input[name=donation_url]").val() == 'mizoram-aid' || $("input[name=donation_url]").val() == 'gurgaonmoms' || $("input[name=donation_url]").val() == 'joylicious' || $("input[name=donation_url]").val() == 'genesisray' || $("input[name=donation_url]").val() == 'shakti-kit-for-pregnant-women' || $("input[name=donation_url]").val() == 'donate-raksha-kits' || $("input[name=donation_url]").val() == 'donate-on-krishna-janmashtami' || $("input[name=donation_url]").val() == 'fitmap' && $("#other_meals_amount").val() == '' && $("input[name=donations_amount]:checked").val() == 'other');
                    },
                    donationsamountvaldtn: true,
                },

                no_of_childs: {
                    required: function (element) {
                        return (($("input[name=donation_url]").val() == 'lionsclub' || $("input[name=donation_url]").val() == 'lions-club' || $("input[name=donation_url]").val() == 'ooh' || $("input[name=donation_url]").val() == 'solenis-gss-hyderabad-join-hands-with-akshaya-patra' || $("input[name=donation_url]").val() == 'each-one-feed-one' || $("input[name=donation_url]").val() == 'freedom-from-hunger' || $("input[name=donation_url]").val() == 'factset' || $("input[name=donation_url]").val() == 'mission-million-2018' || $("input[name=donation_url]").val() == 'no-khali-pet-1' || $("input[name=donation_url]").val() == 'fitmap') && $("#other_childs").val() == '');
                    },
                },
                no_of_year: {
                    required: function (element) {
                        return (($("input[name=donation_url]").val() == 'lionsclub' || $("input[name=donation_url]").val() == 'lions-club' || $("input[name=donation_url]").val() == 'ooh' || $("input[name=donation_url]").val() == 'solenis-gss-hyderabad-join-hands-with-akshaya-patra' || $("input[name=donation_url]").val() == 'each-one-feed-one' || $("input[name=donation_url]").val() == 'freedom-from-hunger' || $("input[name=donation_url]").val() == 'factset' || $("input[name=donation_url]").val() == 'mission-million-2018' || $("input[name=donation_url]").val() == 'no-khali-pet-1') && $("#otheryear").val() == '');
                    },
                },
                donation_amount: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'onlinedonations' || $("input[name=donation_url]").val() == 'goloka');
                    },
                    donationamountlimitchk: true,
                },
                no_of_children: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'bosch' && $("#donation_amount").val() == '');
                    },
                },
                type_of_vehicle: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'donate-a-mid-day-meal-delivery-vehicle');
                    },
                },
                vehicle_year: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_make: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_model: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_color: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_doors: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_id: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_doors: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_mileage: {
                    required: function (element) {
                        return ($("input[name=type_of_vehicle]").val() == '1' || $("input[name=type_of_vehicle]").val() == '2' || $("input[name=type_of_vehicle]").val() == '3');
                    },
                },
                vehicle_title_name: {
                    required: function (element) {
                        return ($("input[name=vehicle_title_mode]:checked").val() == '1');
                    },
                },
                //vehicle donation code end here 2/2
                otheramt: {
                    required: function (element) {
                        return ($("input[name=donations_amount]:checked").val() == 'other' && $("input[name=mid_day_meal_plate_chk]:checked").val() != '1');
                    },
                    digits: function (element) {
                        return ($("input[name=donations_amount]:checked").val() == 'other');
                    },
                    // min: 100
                },
                receipt_through_online_or_offline: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() != 'feed-a-million' || $("input[name=donation_url]").val() != 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() != 'i-share-my-lunch' || $("input[name=donation_url]").val() != 'project-hunger1' || $("input[name=donation_url]").val() != 'project-hunger-2');
                    },
                },
                perchild: {
                    required: function (element) {
                        return ($("input[name=donations_amount]:checked").val() == 750);
                    },
                    digits: function (element) {
                        return ($("input[name=donations_amount]:checked").val() == 750);
                    },
                },
                mode_id: {
                    required: true,
                },
                first_name: {
                    required: true,
                    minlength: 2,
                    maxlength: 50,
                    lettersonly: true,
                },
                last_name: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'adobe');
                    },
                    minlength: 2,
                    maxlength: 50,
                    lettersonly: true,
                },
                adobe_payment: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'adobe');
                    },
                },
                email: {
                    required: true,
                    email: true,
                    email: true,
                    customemail: true,
                    //isemailuhcOroptum: true,
                    isemailadobe: true,
                    isemailcollabera: true,
                    isemailastrazeneca: true,
                    isemailamat: true,
                    isemailascendion: true,
                },
                address: {
                    //below line commented on 16th aug 2022 for address fld mandatory
                    /*required: function(element) {
                        if ($("input[name=mode_id]").val() == '9') {
                            return ($("input[name=receipt_through_online_or_offline]:checked").val() == '0');
                        } else {
                            return (($("input[name=receipt_through_online_or_offline]").val() != '1' && $("input[name=receipt_through_online_or_offline]:checked").val() == '0' || $("input[name=mode_id]:checked").val() == '4') && $("input[name=donation_url]").val() != 'genesisray');
                        }

                    }*/
                    required: true,
                },
                /*area: {
                 required: true,
                 },*/
                city: {
                    //minlength: 2,
                    //maxlength: 50,
                    //lettersonly: true,
                    required: function (element) {
                        return ($("input[name=donation_url]").val() != 'genesisray');
                    }
                },
                country_id: {
                    //below line commented on 16th aug 2022 for address fld mandatory
                    /*required: function(element) {
                        return (($("input[name=receipt_through_online_or_offline]:checked").val() == '0' || $("input[name=mode_id]:checked").val() == '4' || $("input[name=mode_id]:checked").val() == '8') && $("input[name=donation_url]").val() != 'genesisray');

                    }*/
                    required: true,
                },
                state_id: {
                    required: function (element) {
                        //return ($("input[name=country_id]:checked").val() == '1' || $("input[name=mode_id]:checked").val() == '2' || $("input[name=mode_id]:checked").val() == '3');
                        //return ($("#country_id").val() == "1" && $("input[name=receipt_through_online_or_offline]:checked").val() == '0');
                        return ($("#country_id").val() == "1");
                    },
                },
                state_name: {
                    required: function (element) {
                        //return ($("input[name=country_id]:checked").val() == '1' || $("input[name=mode_id]:checked").val() == '2' || $("input[name=mode_id]:checked").val() == '3');
                        //return ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '1' && $("input[name=mode_id]:checked").val() == '2' && $("input[name=mode_id]:checked").val() == '3' && $("input[name=mode_id]:checked").val() == '5');
                        return ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '1' && $("input[name=mode_id]:checked").val() == '2' && $("input[name=mode_id]:checked").val() == '3');
                    },
                },
                pan: {
                    minlength: 10,
                    maxlength: 10,
                    required: function (element) {
                        return (($("input[name=mode_id]:checked").val() == '1' || $("input[name=mode_id]:checked").val() == '2' || $("input[name=mode_id]:checked").val() == '3' || $("input[name=mode_id]:checked").val() == '5' || $("input[name=mode_id]:checked").val() == '6' || $("input[name=mode_id]:checked").val() == '9' || $("input[name=tax_excp_cert]:checked").val() != 'tax_excp_cert') && $("input[name=donation_url]").val() != 'support-effected-workers-by-covid-19' && $("input[name=donation_url]").val() != 'tangerine' && $("input[name=donation_url]").val() != 'amway' && $("input[name=donation_url]").val() != 'checkmate-covid' && $("input[name=donation_url]").val() != 'donate-cooked-meals' && $("input[name=donation_url]").val() != 'donate-to-akshayapatra');
                    },
                },
                postal_code: {
                    //below line commented on 16th aug 2022 for address fld mandatory
                    /*required: function(element) {
                        return (($("input[name=receipt_through_online_or_offline]:checked").val() == '0' || $("input[name=mode_id]:checked").val() == '4') && $("input[name=donation_url]").val() != 'genesisray');
                    }*/
                    //digits: true,
                    required: true,
                    validpincode: true,
                },
                mobile: {
                    required: function (element) {
                        return ($("input[name=mode_id]:checked").val() == '1' || $("input[name=mode_id]:checked").val() == '2' || $("input[name=mode_id]:checked").val() == '5' || $("input[name=mode_id]:checked").val() == '6' || $("input[name=mode_id]").val() == '9' || $("input[name=mode_id]").val() == '10');
                    },
                    digits: function (element) {
                        return ($("input[name=mode_id]:checked").val() == '1' || $("input[name=mode_id]:checked").val() == '2' || $("input[name=mode_id]:checked").val() == '5' || $("input[name=mode_id]:checked").val() == '6' || $("input[name=mode_id]:checked").val() == '9' || $("input[name=mode_id]").val() == '10');
                    },
                    digits: true,
                    Mobileno: true,
                },
                alternate_mobile: {
                    digits: true,
                    Mobileno: true,
                },
                ohr_id: {
                    minlength: 9,
                    maxlength: 9,
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'feed-a-million');
                    },
                    digits: true,
                },
                relationship_with_vedanta: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'vedanta-group');
                    },
                },
                vessel_required_location: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'sponsor-kitchen-equipment');
                    },
                },
                donation_amount1: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'sponsor-kitchen-equipment' && $("input[name=vessel_required_location]:checked").val() == 'Vrindavan');
                    },
                },
                donation_amount2: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'sponsor-kitchen-equipment' && $("input[name=vessel_required_location]:checked").val() == 'Bhavnagar');
                    },
                },
                donation_amount3: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'sponsor-kitchen-equipment' && $("input[name=vessel_required_location]:checked").val() == 'Puri');
                    },
                },
                /*
                 phone: {
                 required: function(element) {
                 return ($("input[name=mode_id]:checked").val() == '3' || $("input[name=mode_id]:checked").val() == '4');
                 },
                 digits: function(element) {
                 return ($("input[name=mode_id]:checked").val() == '3' || $("input[name=mode_id]:checked").val() == '4');
                 },
                 },*/
                province: {
                    required: function (element) {
                        return (($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '1') || ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '2') || ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '3') || ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '5') || ($("#country_id").val() != '1' && $("input[name=mode_id]:checked").val() == '4' && $("input[name=donation_url]").val() != 'genesisray'));
                    },
                },
                foreign_id_proof: {
                    required: function (element) {
                        return ($("input[name=mode_id]:checked").val() == '4' && $("input[name=donation_url]").val() == 'ness');
                    },
                },
                honor_first_name: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() != 'happy-thanksgiving');
                    },
                    lettersonly: true,
                },
                honoree_email_id: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() != 'donate-on-friendship-day');
                    },
                    email: true,
                },
                honoree_mobile_no: {
                    required: true,
                    digits: true,
                    Mobileno: true,
                },
                occasion_name: {
                    required: true,
                    lettersonly: true,
                },
                occasion_honor_name: {
                    required: true,
                    lettersonly: true,
                },
                memory_first_name: {
                    required: true,
                    lettersonly: true,
                },
                relationship_with: {
                    required: true,
                    lettersonly: true,
                },
                occasion_date: {
                    required: true,
                },
                /*captcha_image: {
                 required: true,
                 //validCaptcha: true,
                 },*/
                /*captchaval: {
                 required: true,
                 },*/
                captcha_result: {
                    required: true,
                    validCaptcha: true
                },
                agree: {
                    required: true,
                },
                'item_name[]': {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'donate-to-kerala-flood-relief' || $("input[name=donation_url]").val() == 'daan-ustaav-with-amazon-cares' || $("input[name=donation_url]").val() == 'multiple-donation');
                    },
                },
                'item_quantity[]': {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'donate-vessels');
                    },
                },
                item_othr_qnty: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'hpcl' && $('#item_quantity_1 :selected').val() == 'other');
                    },
                },
                sdl_employee_office_location: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'sdl-partner-with-akshaya-patra');
                    },
                },
                lionsclub_member_id: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'lionsclub');
                    },
                },
                alt_pledge_fund_for: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'altruistic-pledge' || $("input[name=donation_url]").val() == 'aima');
                    },
                },
                corporate_name: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'joy-of-giving' || $("input[name=donation_url]").val() == 'diwaligiving' || $("input[name=donation_url]").val() == 'back2school');
                    },
                },
                organization_name: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'back2school' || $("input[name=donation_url]").val() == 'donate-a-raincoat');
                    },
                },
                optum_office_location: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'optum');
                    },
                },
                amazon_your_site_name: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'amazon-goes-gold');
                    },
                },
                amazon_badge_colour: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'amazon-goes-gold');
                    },
                },
                amazon_your_business_unit: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'amazon-goes-gold');
                    },
                },
                amazon_employee_zone: {
                    required: function (element) {
                        return ($("input[name=donation_url]").val() == 'amazon-goes-gold');
                    },
                },
                vouchernumber: {
                    required: function (element) {
                        return ($("input[name=mode_id]:checked").val() == '11');
                    },
                },
            },
            messages: {
                no_of_smiles: {
                    required: "Please unlock at least one smile.",
                    min: "Please unlock at least one smile.",
                },
                captcha_result: {
                    required: "Validate.",
                    validCaptcha: "Invalid."
                },
                pan: {
                    minlength: "Please enter valid PAN NO",
                    maxlength: "Please enter valid PAN NO",
                },
                ohr_id: {
                    minlength: "Please enter 9 digit OHR ID",
                    maxlength: "Please enter 9 digit OHR ID",
                },
                'item_name[]': {
                    required: "Please select any one option.",
                },
            },
            submitHandler: function () {
                $("#step2").css("display", "block");
                form.submit();
            }

        });

        $.validator.addMethod('validCaptcha', function (value) {
            $result = (parseInt($('#num1').val()) + parseInt($('#num2').val()) == parseInt($('#captcha_result').val()));
            return $result;
        },
            'Incorrect value, please try again.'
        );

        /* $.validator.addMethod("donationsamountvaldtn",
                 function(value, element) {
                     $result = ($('#other_meals_amount').val() > 99);
                     return $result;
                 },
                 " "
                 );*/

        $.validator.addMethod("donationsamountvaldtn",
            function (value, element) {
                $donationurl = $('#donation_url').val();
                $amt = $('#other_meals_amount').val();
                $donationurl = $('#donation_url').val();
                if ($amt > 0) {
                    if ($donationurl == "share-our-strength") {
                        if ($amt > 1999) {
                            return true;
                        } else {
                            $myemail = $('.email-id').val();
                            if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == "laxmi@creativeyogi.com" || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com') {
                                return true;
                            } else {
                                return false;
                            }
                        }

                    } else {
                        if ($amt > 99) {
                            return true;
                        } else {
                            $myemail = $('.email-id').val();
                            if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == "laxmi@creativeyogi.com" || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com' || $donationurl == 'donate-cooked-meals') {
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }
                } else {
                    return false;
                }
            },
            " "
        );

        //newdonationpage js
        $.validator.addMethod("donationamountcheck",
            function (value, element) {
                $amt = $('#other_amount').val();
                $amt_a = $('#other_amount_a').val();
                $amt_h = $('#other_amount_h').val();
                if ($amt > 0) {
                    if ($amt > 499) {
                        return true;
                    } else {
                        $myemail = $('#email').val();
                        //alert($campgnid);
                        if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == 'laxmi@creativeyogi.com' || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com' || $myemail == 'ssakkur@gmail.com') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if ($amt_a > 0) {
                    if ($amt_a > 499) {
                        return true;
                    } else {
                        $myemail = $('#email').val();
                        //alert($campgnid);
                        if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == 'laxmi@creativeyogi.com' || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com' || $myemail == 'ssakkur@gmail.com') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else if ($amt_h > 0) {
                    if ($amt_h > 499) {
                        return true;
                    } else {
                        $myemail = $('#email').val();
                        //alert($campgnid);
                        if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == 'laxmi@creativeyogi.com' || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com' || $myemail == 'ssakkur@gmail.com') {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            },
            "Thank you for your consideration. Request you to sponsor for a minimum of INR 500, as any contribution lower than that is unviable due to processing costs. Appreciate your benevolence."
        );

        $.validator.addMethod("donationamountlimitchk",
            function (value, element) {
                $amt = $('#donation_amount').val();
                if ($amt > 0) {
                    if ($amt > 99) {
                        return true;
                    } else {
                        $myemail = $('#email').val();
                        $donationurl = $('#donation_url').val();
                        $campgnid = $('#campaign_id').val();
                        //alert($campgnid);
                        if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == 'laxmi@creativeyogi.com' || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'sharanu@creativeyogi.com' || $myemail == 'ssakkur@gmail.com' || $donationurl == 'sponsor-meal-plates-for-children' || $donationurl == 'testoners' || $campgnid == "3098") {
                            return true;
                        } else {
                            return false;
                        }
                    }
                } else {
                    return false;
                }
            },
            "Thank you for your consideration. Request you to sponsor for a minimum of INR 500, as any contribution lower than that is unviable due to processing costs. Appreciate your benevolence."
        );

        $('#form_donation').submit(function () {
            var error = 0;
            var captchaval = $('#g-recaptcha-response').val();
            $('.recaptcha-error-message').hide();
            if (captchaval <= 0) {
                var error = 1
                $('.recaptcha-error-message').show();
            }
            if (error == "1") {
                return false; //result = true;
            } else {
                result = false;
            }

        });
        /*$.validator.addMethod('validCaptcha', function(value) {
         var result = false;
         var captcha_image = $("#captcha_image").val();
         if (captcha_image.length == 5) {
         $.ajax({x
         type: "POST",
         async: false,
         cache: false,
         url: "ajax/validatecaptcha",
         data: {captcha_image: captcha_image},
         success: function(msg) {
         if (msg == "true") {
         result = true;
         } else {
         result = false;
         }
         }
         });
         }
         return result;
         }, '');*/
    }
    //if browse is IE8 Or less this if condtions will check code end here

    $("#last_two1").hide();
    $("#last_two2").hide();
    $("#last_two3").hide();
    $("#last_two4").hide();
    $("#other_state").hide();
    $("#phone_id").hide();
    $("#banks_id").hide();
    $("#dollar_id").hide();
    $("#memory_id").hide();
    $("#occasion_id").hide();
    $("#honor_id").hide();
    $("#convert_amt_id").hide();
    $("#currency_code_id").hide();
    $("#state_name").hide();

    var url = window.location.href;
    var page = url.substring(url.lastIndexOf('/') + 1);
    $("#" + page + "_id").show();

    //get area pincode begins here
    /*
     $("#postal_code").change(function() {
     //$(".loader").show();
     var postal_code = $("#postal_code").val();
     var country_id = $("#country_id").val();
     $.ajax({
     type: "POST",
     async: false,
     cache: false,
     url: "ajax/getpincode",
     data: {postal_code: postal_code, country_id: country_id},
     success: function(data) {
     if (data.status == 1) {
     $("#city").val(data.city);
     //$("#country_id").val(data.country_id);
     if (parseInt(data.state_id) && country_id == 1) {
     $("#province").val("");
     $("#province_id").hide();
     $("#state_id").show();
     $("#state_id").val(data.state_id);
     } else if (!parseInt(data.state_id) && country_id != 1) {
     $("#state_id").val("");
     $("#state_id").hide();
     $("#province_id").show();
     $("#province").val(data.state_id);
     }
     $(".loader").hide();
     } else {
     if (country_id == 1) {
     $("#province").val("");
     $("#province_id").hide();
     $("#state_id").val("");
     $("#state_id").show();
     $(".loader").hide();
     } else {
     $("#state_id").val("");
     $("#state_id").hide();
     $("#province").val("");
     $("#province_id").show();
     $(".loader").hide();
     }
     }
     
     }
     });
     });
     */
    //get area pincode end here

    //onlclicking the Registered User radio button passing the entered doation amount and mode
    $('#login_user').click(function () {
        var d_amounts = $("input[name=donations_amount]:checked").val();
        var otr_amounts = $("input[name=otheramt]").val();
        var mode_ids = $("input[name=mode_id]:checked").val();

        var d_amount = document.getElementById('d_amount');
        var otr_amount = document.getElementById('otr_amount');
        var modeid = document.getElementById('modeid');

        d_amount.value = d_amounts;
        otr_amount.value = otr_amounts;
        modeid.value = mode_ids;
    });

    //commented on 27-01-2024
    //onlclicking the Registered User radio button passing the entered doation amount and mode code end here
    /*var donations_amt = $("input[name=donations_amount]:checked").val();
    if (donations_amt != '' && donations_amt != 'other') {
        $("#other").hide();
    }*/
    //end

    ///onload function for payment mode selectio after login with session data code begins here
    //var val = $("input[name=mode_id]:chekced").val();
    var val = $("input[name=mode_id]:checked").val();
    //alert(val);
    if (val == '4') //international donation for payumoney
    {
        $("#cityid").hide();
        $("#taxexcpcertf").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").hide();
        $("#province_id").show();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        if ($("input[name=donation_url]").val() != 'genesisray') {
            $("#phone").css('border-color', '#FF0000');
        }
        $("#foreign_id_proof").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();

    } else if (val == '6') { //Indian donation for payumoney
        $("#taxexcpcertf").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        //for indian citizen mode hiding country fld as per ap requirement
        $("#country_id").show();

        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == "urban-ladder" || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    } else if (val == '7') { //Indian donation for CCAvenue
        $("#taxexcpcertf").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    } else if (val == '8') //international donation for CCAvenue
    {
        $("#cityid").hide();
        $("#taxexcpcertf").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").hide();
        $("#province_id").show();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        $("#phone").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();

    } else if (val == '9') { //Indian donation for Instamojo
        $("#taxexcpcertf").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        $("#phone").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();
    } else if (val == '10') { //Indian donation for Razorpay
        $("#taxexcpcertf").show();
        $("#cityid").show();
        $("#forgnhlpmodenote").hide();
        $("#indhlpmodenote").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    }
    ///onload function for payment mode selectio after login with session data code end here
    /*$('#donation_amount').on('keyup', function() {
     $('#other_option').prop('checked', !!this.value.length);
     $("#other").show();
     });*/

    $(".plural").hide();
    $(".plural_2").hide();

    //added for occasion date
    var d = new Date();
    var n = d.getFullYear();
    var fmyr = n - 1;
    var toyr = n + 8;
    jQuery("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showOn: "both",
        buttonImage: "./images/calendar.gif",
        buttonImageOnly: false,
        buttonText: "",
        yearRange: fmyr + ":" + toyr,
        dateFormat: "yy-mm-dd"
    });

    //added for donor occasion date
    /*var d = new Date();
     var n = d.getFullYear();
     var fmyr = n - 90;
     var toyr = n - 0;
     jQuery("#donor_occasion_datepicker").datepicker({
     changeMonth: true,
     changeYear: true,
     showOn: "both",
     buttonImage: "./images/calendar.gif",
     buttonImageOnly: false,
     buttonText: "",
     yearRange: fmyr + ":" + toyr,
     dateFormat: "yy-mm-dd"
     }); */

    //added for donor_date_of_birth
    var d = new Date();
    var n = d.getFullYear();
    var fmyr = n - 100;
    var toyr = n - 0;
    jQuery("#donor_date_of_birth_datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        showOn: "both",
        buttonImage: "./images/calendar.gif",
        buttonImageOnly: false,
        buttonText: "",
        yearRange: fmyr + ":" + toyr,
        dateFormat: "dd-mm-yy"
    });


});

function GetDetailsfrompincode() {
    var pincode = $("#postal_code").val();
    //alert(pincode);
    if (pincode == "") {
        $("#city").val('');
        $("#state_id").val('');
    } else {
        $.getJSON('ajax/getcitynstate/' + pincode, function (data) {
            //alert(data);
            if (data == 'no') {
                alert('Enter valid pincode');
                $("#city").val('');
                $("#state_id").val('');
            } else {
                var getdata1 = JSON.stringify(data);
                var getData = JSON.parse(getdata1);
                $("#city").val(getData.city);
                $("#state_id").val(getData.state);
            }
        });

    }
};

//added this function as per new changes in honor donation
function postalcodecheck() {
    var postal_code = $("#postal_code").val();
    var country_id = $("#country_id").val();
    $.ajax({
        type: "POST",
        async: false,
        cache: false,
        url: "ajax/getpincode",
        data: {
            postal_code: postal_code,
            country_id: country_id
        },
        success: function (data) {
            if (data.status == 1) {
                $("#city").val(data.city);
                //$("#country_id").val(data.country_id);
                if (parseInt(data.state_id) && country_id == 1) {
                    $("#province").val("");
                    $("#province_id").hide();
                    $("#state_select").show();
                    $("#state_id").val(data.state_id);
                } else if (!parseInt(data.state_id) && country_id != 1) {
                    $("#state_id").val("");
                    $("#state_select").hide();
                    $("#province_id").show();
                    $("#province").val(data.state_id);
                }
                $(".loader").hide();
            } else {
                if (country_id == 1) {
                    $("#province").val("");
                    $("#province_id").hide();
                    $("#state_id").val("");
                    $("#state_select").show();
                    $(".loader").hide();
                } else {
                    $("#state_id").val("");
                    $("#state_select").hide();
                    $("#province").val("");
                    $("#province_id").show();
                    $(".loader").hide();
                }
            }

        }
    });
}

/*95 campaign code*/
$('#otheramount').hide();
$('#yourcontribution').hide();

function onchangedonationamtpermnt(val) {
    var donation_amt_per_month = $("#donation_amt_per_month").val();
    //alert(donation_amt_per_month);
    if (donation_amt_per_month != '' && donation_amt_per_month != 'other') {
        $("#donation_amount").val(donation_amt_per_month);
        $("#hidamount").html(donation_amt_per_month);
        $('#other').val('');
        $('#other').hide();
        $('#yourcontribution').show();
        //$('#donation_amt_per_year').prop('disabled', true);
        $('#donation_amt_per_year').val('');
        $("#donation_amt_error").hide();
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other').show();
        $('#otheramount').show();
        $("#donation_amt_per_year").val('');
    }
}

function onchangedonationamtperyr(val) {
    var donation_amt_per_year = $("#donation_amt_per_year").val();
    //alert(donation_amt_per_year);
    if (donation_amt_per_year != '' && donation_amt_per_year != 'other') {
        $("#donation_amount").val(donation_amt_per_year);
        $("#hidamount").html(donation_amt_per_year);
        $('#other').val('');
        $('#other').hide();
        $('#yourcontribution').show();
        $('#donation_amt_per_month').val('');
        $("#donation_amt_error").hide();
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other').show();
        $('#otheramount').show();
        $('#donation_amt_per_month').val('');
    }
}
/*95 campaign code*/

//gorakpur flood meals count code
//$('#other_meals').hide();
$("#othermealmsg").hide();

function onchangedonationamtpermeal(val) {
    var donation_amt_per_meal = $("#donation_amt_per_meal").val();
    if (donation_amt_per_meal != '' && donation_amt_per_meal != 'other') {
        $("#donation_amount").val(donation_amt_per_meal);
        $("#hidamount").html(donation_amt_per_meal);
        $('#other_meals').hide();
        $(".lions-clubs-head").attr("style", "display:none");
        $('#othermealmsg').hide();
        $('#othernomealsor').show();
        $("#other_meals_amount").val('');
        $("#donation_amt_error").hide();
    } else if (donation_amt_per_meal == '') {
        $(".lions-clubs-head").attr("style", "display:none");
        $('#othermealmsg').hide();
        $("#donation_amount").val("");
        $("#hidamount").html("");
    } else {
        $("#donation_amount").val("");
        $("#hidamount").html("");
        $('#other_meals').show();
        $(".lions-clubs-head").attr("style", "display:block");
        $("#othermealmsg").show();
    }
}

function onchangemealother(val) {
    var donation_amt_per_meal = $("#donation_amt_per_meal").val();
    if (donation_amt_per_meal != '' && donation_amt_per_meal == 'other') {
        var donationamt = 20 * val;
        $("#donation_amount").val(donationamt);
        $("#hidamount").html(donationamt);
        $("#other_meals_amount").val('');
        $("#othermealmsg").show();
    }
}

function onenterothermealamt(val) {
    var other_meals_amount = $("#other_meals_amount").val();
    var donationsamt = val;

    //sanitisation kit
    var sanitisation_kit_chk = $("input[name=senitisation_kit_chk]:checked").val();
    var senitisation_kit_chked = document.getElementById("senitisation_kit_chk");
    //alert(senitisation_kit_chked);
    //end sanitisation kit
    var pagepathname = window.location.pathname;

    if (other_meals_amount != '') {
        if (senitisation_kit_chked.checked == true) {
            //alert('qq');
            var senitisation_kit_amt = $("#senitisation_kit_amt").val();
            if (senitisation_kit_amt == "") {
                if (pagepathname == '/donate-family-happiness-kits' || pagepathname == '/donate-happiness-boxes') {
                    $("#senitisation_kit_amt").val(150);
                    $("#senitisation_kits").val(1);
                    senitisation_kit_amt = 150;
                } else {
                    $("#senitisation_kit_amt").val(100);
                    $("#senitisation_kits").val(1);
                    senitisation_kit_amt = 100;
                }
            }
            var donationsamt = val;
            if (donationsamt == '') {
                donationsamt = 0;
            }

            var total_donation_amt = (parseInt(donationsamt) + parseInt(senitisation_kit_amt));
            //alert(total_donation_amt);
            document.getElementById('donation_amount').value = total_donation_amt;
            document.getElementById('hidamount').innerHTML = total_donation_amt;
        } else {
            document.getElementById('hidamount').innerHTML = val;
            document.getElementById('donation_amount').value = val;
            document.getElementById('other').value = val;
            $("#senitisation_kit_amt").val('');
            $("#mid_day_meal_amt").val('');
            $("#mid_day_meal_plates").val('');
        }
        $("#donation_amt_per_meal").val('');
        $("#other_meals").val('');
        document.getElementById('hidamount').innerHTML = val;
        document.getElementById('donation_amount').value = val;
        $("#otheramtmsg").show();
    }
}
//gorakpur flood: end
//for smiles
function onchangesmiles(smiles) {
    var tot_smiles = smiles * 1100;
    $("#donation_amount").val(tot_smiles);
    document.getElementById('tosmiles').innerHTML = smiles;
}
//smiles:end
//for solenis gss hyderbad
function onchangechildforsolenis(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && no_of_year > 0) {
        $('#other-amount').hide();
        $("#other_option").prop("checked", false);
        $("#other_childs").val("");
        $("#otheryear").val("");
        var per_child = no_of_childs * 1100; //750 to 950 to 1100 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (no_of_childs > 0 && otheryear > 0) {
        $('#other-amount').hide();
        $("#other_option").prop("checked", false);
        $("#other_childs").val("");
        $("#no_of_year").val("");
        var per_child = no_of_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        $('#other-amount').show();
        $("#other_option").prop("checked", true);
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }
}

function onchangeyearforsolenis(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && no_of_year > 0) {
        $('#other-amount').hide();
        $("#other_option").prop("checked", false);
        $("#other_childs").val("");
        $("#otheryear").val("");
        var per_child = no_of_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (other_childs > 0 && no_of_year > 0) {
        $('#other-amount').hide();
        $("#other_option").prop("checked", false);
        $("#no_of_childs").val("");
        $("#otheryear").val("");
        var per_child = other_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = no_of_year;
    } else {
        $('#other-amount').show();
        $("#other_option").prop("checked", true);
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }
}

function onchangechildotherforsolenis(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (other_childs > 0 && no_of_year > 0) {
        $('#other-amount').hide();
        $("#no_of_childs").val("");
        $("#otheryear").val("");
        var per_child = other_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (other_childs > 0 && otheryear > 0) {
        $('#other-amount').hide();
        $("#no_of_childs").val("");
        $("#no_of_year").val("");
        var per_child = other_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        $('#other-amount').show();
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }

}

function changeotheryearforsolenis(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && otheryear > 0) {
        $('#other-amount').hide();
        $("#other_childs").val("");
        $("#no_of_year").val("");
        var per_child = no_of_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = otheryear;

    } else if (other_childs > 0 && otheryear > 0) {
        $('#other-amount').hide();
        $("#no_of_childs").val("");
        $("#no_of_year").val("");
        var per_child = other_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        $('#other-amount').show();
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }

}
//solenis: end
//lions clubg code begins here
function onchangechild(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && no_of_year > 0) {
        $("#other_childs").val("");
        $("#otheryear").val("");
        var per_child = no_of_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (no_of_childs > 0 && otheryear > 0) {
        $("#other_childs").val("");
        $("#no_of_year").val("");
        var per_child = no_of_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }
}

function onchangeyear(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && no_of_year > 0) {
        $("#other_childs").val("");
        $("#otheryear").val("");
        var per_child = no_of_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (other_childs > 0 && no_of_year > 0) {
        $("#no_of_childs").val("");
        $("#otheryear").val("");
        var per_child = other_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = no_of_year;
    } else {
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }
}

function onchangechildother(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (other_childs > 0 && no_of_year > 0) {
        $("#no_of_childs").val("");
        $("#otheryear").val("");
        var per_child = other_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * no_of_year;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (no_of_year == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (no_of_year > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = no_of_year;

    } else if (other_childs > 0 && otheryear > 0) {
        $("#no_of_childs").val("");
        $("#no_of_year").val("");
        var per_child = other_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }

}

function changeotheryear(val) {
    var other_childs = $("#other_childs").val();
    var otheryear = $("#otheryear").val();
    var no_of_childs = $("#no_of_childs").val();
    var no_of_year = $("#no_of_year").val();

    if (no_of_childs > 0 && otheryear > 0) {
        $("#other_childs").val("");
        $("#no_of_year").val("");
        var per_child = no_of_childs * 750; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (no_of_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (no_of_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = no_of_childs;
        document.getElementById('year').innerHTML = otheryear;

    } else if (other_childs > 0 && otheryear > 0) {
        $("#no_of_childs").val("");
        $("#no_of_year").val("");
        var per_child = other_childs * 1100; //750 to 950 changed by laxmi
        var per_year = per_child * otheryear;
        $("#donation_amount").val(per_year);
        $("#hidamount").html(per_year);
        if (other_childs == 1) {
            $(".plural").hide();
            $(".singular").show();
        } else if (other_childs > 1) {
            $(".plural").show();
            $(".singular").hide();
        }
        if (otheryear == 1) {
            $(".plural_2").hide();
            $(".singular_2").show();
        } else if (otheryear > 1) {
            $(".plural_2").show();
            $(".singular_2").hide();
        }
        document.getElementById('child').innerHTML = other_childs;
        document.getElementById('year').innerHTML = otheryear;
    } else {
        document.getElementById('child').innerHTML = "0";
        document.getElementById('year').innerHTML = "0";
        $("#donation_amount").val("");
        $("#hidamount").html("");
    }

}
// lions clubg code end here


function more_amounts() {
    $("#last_two1").show();
    $("#last_two2").show();
    $("#last_two3").show();
    $("#last_two4").show();
    // $(".view_mores").hide();
}
//$('#online-offline').hide();
if ($("#International_Donation").prop("checked")) {
    $('#online-offline').hide();
    $('#online-offline-label').hide();
}

function enabel_mode_id(val) {
    //alert(val);
    if (val == '4') //international donation for payumoney
    {
        $("#cityid").hide();
        $("#taxexcpcertf").hide();
        $("#forgnhlpmodenote").show();
        $("#indhlpmodenote").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").hide();
        $("#province_id").show();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $("#country_id").show();
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        if ($("input[name=donation_url]").val() != 'genesisray') {
            $("#phone").css('border-color', '#FF0000');
        }
        $("#foreign_id_proof").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();

    } else if (val == '6') { //Indian donation for payumoney
        $("#taxexcpcertf").show();
        $("#cityid").show();
        $("#forgnhlpmodenote").hide();
        $("#indhlpmodenote").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        $("#country_id").hide();
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == "urban-ladder" || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    } else if (val == '7') { //Indian donation for CCAvenue
        $("#taxexcpcertf").show();
        $("#cityid").show();
        $("#forgnhlpmodenote").hide();
        $("#indhlpmodenote").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == "urban-ladder" || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    } else if (val == '8') //international donation for CCAvenue
    {
        $("#cityid").hide();
        $("#taxexcpcertf").hide();
        $("#forgnhlpmodenote").show();
        $("#indhlpmodenote").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").hide();
        $("#province_id").show();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        $("#phone").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();

    } else if (val == '9') { //Indian donation for Instamojo
        $("#taxexcpcertf").show();
        $("#pan_id").show();
        $(".pan_id").show();
        $("#mobile_id").show();
        $("#phone_id").hide();
        $("#banks_id").hide();
        $("#state_select").show();
        $("#province_id").hide();
        $("#dollar_id").hide();
        $("#convert_amt_id").hide();
        $("#currency_code_id").hide();
        $("#form_donation").attr("action", "donation-confirmation");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('1');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").show();
        $("#tax_exception_certificate").show();
        $("#pan_mobile_email_help_msg3").hide();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").show();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert' && $("input[name=donation_url]").val() != 'feed-a-million') {
            $(".pan_id").hide();
            if ($("#address_dtls_flds").html() == '') {
                $("#pan_mobile_email_help_msg3").hide();
                $("#pan_mobile_email_help_msg2").show();
                $("#pan_mobile_email_help_msg").hide();
            } else {
                $("#hpanid").html($("#pan_id").html());
                $("#pan_id").html('');
                $("#append1").html($("#address_dtls_flds").html());
                $("#address_dtls_flds").html('');
                $("#pan_mobile_email_help_msg").hide();
                $("#pan_mobile_email_help_msg2").show();
            }

        }
        $("#receipt_through_offline").prop('checked', false);
        $("#receipt_through_online").prop('checked', true);
        $('#online-offline').show();
        $('#onlineofflineradio').show();
        $('#online-offline-label').show();
        $('#postal_code').attr("placeholder", "Pin Code");
        if ($("input[name=receipt_through_online_or_offline]:checked").val() == 1 || $("input[name=donation_url]").val() == 'feed-a-million' || $("input[name=donation_url]").val() == 'share-my-lunch-with-school-children' || $("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
            $("#addressdiv").hide();
        } else {
            $("#address_dtls_flds").show();
            $("#addressdiv").show();
        }
    } else if (val == '10') { //international donation for Instamojo
        $("#taxexcpcertf").hide();
        $("#pan_id").hide();
        $(".pan_id").hide();
        $("#phone_id").show()
        $("#mobile_id").hide();
        $("#state_select").hide();
        $("#province_id").show();
        $("#dollar_id").show();
        $("#banks_id").hide();
        $("#convert_amt_id").show();
        $("#currency_code_id").show();
        //$("#form_donation").attr("action", "confirm-ccavenue");
        //alert($("#form_donation").attr("action"));
        $("#country_id > option[value=1]").show();
        $('[name=country_id]').val('');
        $('[name=pan]').val('');
        $('[name=mobile]').val('');
        $(".or-lable1").show();
        $(".or-lable2").show();
        $(".tax-exception").hide();
        $("#tax_exception_certificate").hide();
        $("#pan_mobile_email_help_msg3").show();
        $("#pan_mobile_email_help_msg2").hide();
        $("#pan_mobile_email_help_msg").hide();
        var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
        if (tax_excp_cert == 'tax_excp_cert') {
            $("#address_dtls_flds").html($("#append1").html());
            $("#append1").html('');
            $("#pan_id").html($("#hpanid").html());
            $("#hpanid").html('');
            $("#pan_mobile_email_help_msg2").hide();
            $("#pan_mobile_email_help_msg").hide();
        }
        $("#receipt_through_offline").prop('checked', true);
        $("#receipt_through_online").prop('checked', false);
        $('#online-offline').hide();
        $('#onlineofflineradio').hide();
        $('#online-offline-label').hide();
        $('#postal_code').attr("placeholder", "Zip Code");
        $("#phone").css('border-color', '#FF0000');
        if ($("input[name=donation_url]").val() == 'project-hunger1' || $("input[name=donation_url]").val() == 'project-hunger-2') {
            $("#address_dtls_flds").hide();
        } else {
            $("#address_dtls_flds").show();
        }
        $("#addressdiv").show();

    }

}

$('#other').show();
$('#other').prop('disabled', false);
$('#child').prop('disabled', true);

function enableother(val) {
    $(".single_amount_wrapper label").removeClass("removeselbg");
    //alert(val);
    //currency exchange rate begin on change amount
    var currency_code = $('#currency_code').val();
    //currency_exchange_rate(currency_code);
    //currency exchange rate end on change amount
    if (val != 'other') {
        //for assamfloodrelief page count noofkits
        if ($("input[name=donation_url]").val() == 'assam-flood-relief') {
            var noofkits = val / 750;
            $('#noofkits').html(noofkits);
            //alert(noofkits);
            console.log(noofkits);

        } else if ($("input[name=donation_url]").val() == 'deutsche-bank-supports-kerala-flood-relief' || $("input[name=donation_url]").val() == 'donate-to-natural-disasters-relief-program' || $("input[name=donation_url]").val() == 'benevity-supports-disaster-relief-across-india' || $("input[name=donation_url]").val() == 'donate-to-kerala-flood-relief') {
            var noofkits = val / 1200;
            var noofkits = Math.round(noofkits);
            $('#noofkits').html(noofkits);
            console.log(noofkits);
        } else {
            function calculateSaplings(donationAmount) {
                // Base values: ₹499 corresponds to 20 saplings
                const baseDonation = 499;
                const baseSaplings = 20;
                const incrementAmount = 500;
                const saplingsPerIncrement = 20;
            
                // Calculate the number of increments above the base donation
                const increments = Math.floor((donationAmount - baseDonation) / incrementAmount);
            
                // Calculate total saplings: base saplings + (increments * saplings per increment)
                const totalSaplings = baseSaplings + (increments * saplingsPerIncrement);
            
                // Ensure that the number of saplings is at least the base number or higher
                return donationAmount >= baseDonation ? totalSaplings : 0;
            }

            // // Example usage:
            // const donationAmounts = [499, 999, 1499, 1999, 2499, 2999, 4999, 9999];
            // donationAmounts.forEach(amount => {
            //     console.log(`For a donation of ₹${amount}, you will plant ${numberOfSaplings} saplings.`);
            // });
            const numberOfSaplings = calculateSaplings(val);

            $('#noofkits').html(numberOfSaplings);

            // console.log(`For a donation of ₹${donation}, you will plant ${numberOfSaplings} saplings.`);

        }
        //end

        //capex
        var donationsamt = val;
        var noofplates = parseInt(donationsamt / 115);
        $("#meal_plates").val(noofplates);
        $("#meal_amt").val(donationsamt);
        //end
        donationamtchk();
        var mid_day_meal_plate_chk = $("input[name=mid_day_meal_plate_chk]:checked").val();
        var mid_day_meal_plate_chked = $("input[name=mid_day_meal_plate_chked]:checked").val();
        var no_of_plate = parseInt(donationsamt / 1500);
        $("#mid_day_meal_plates").val(no_of_plate);
        var mid_day_meal_amt = parseInt(no_of_plate * 115);
        $("#mid_day_meal_amt").val(mid_day_meal_amt);

        var pagepathname = window.location.pathname;

        //senitisation_kit_chk checked
        var senitisation_kit_chk = $("input[name=senitisation_kit_chk]:checked").val();
        var senitisation_kit_chked = $("input[name=senitisation_kit_chked]:checked").val();
        if ($("input[name=donation_url]").val() == 'donate-to-midday-meal-programme1' || $("input[name=donation_url]").val() == 'make-a-donation-on-special-occasion') {
            var no_of_kits = parseInt(donationsamt / 1500);
        } else if (pagepathname == '/donate-family-happiness-kits') {
            var no_of_kits = parseInt(donationsamt / 1200);
        } else if (pagepathname == '/donate-happiness-boxes') {
            var no_of_kits = parseInt(donationsamt / 550);
        } else {
            //var no_of_kits = parseInt(donationsamt / 550);
            var no_of_kits = parseInt(donationsamt / 1500);
        }
        $("#senitisation_kits").val(no_of_kits);
        if (pagepathname == '/donate-family-happiness-kits' || pagepathname == '/donate-happiness-boxes') {
            var senitisation_kit_amt = parseInt(no_of_kits * 150);
        } else {
            var senitisation_kit_amt = parseInt(no_of_kits * 100);
        }
        $("#senitisation_kit_amt").val(senitisation_kit_amt);
        //end

        if (mid_day_meal_plate_chk == 1) {
            var total_donation_amt = (parseInt(donationsamt) + parseInt(mid_day_meal_amt));
            document.getElementById('donation_amount').value = total_donation_amt;
            document.getElementById('hidamount').innerHTML = total_donation_amt;
            document.getElementById('chidlrenserved').innerHTML = donationsamt / 1500;
        } else if (senitisation_kit_chk == 1) {
            var total_donation_amt = (parseInt(donationsamt) + parseInt(senitisation_kit_amt));
            document.getElementById('donation_amount').value = total_donation_amt;
            document.getElementById('hidamount').innerHTML = total_donation_amt;
            document.getElementById('chidlrenserved').innerHTML = donationsamt / 1500;
        } else if (mid_day_meal_plate_chked == 1) {
            $("#mid_day_meal_plates").val(no_of_plate);
            var mid_day_meal_amt = parseInt(no_of_plate * 115);
            $("#mid_day_meal_amt").val(mid_day_meal_amt);
            var total_donation_amt = (parseInt(donationsamt) + parseInt(mid_day_meal_amt));
            document.getElementById('donation_amount').value = total_donation_amt;
            document.getElementById('hidamount').innerHTML = total_donation_amt;
            document.getElementById('chidlrenserved').innerHTML = donationsamt / 1500;
        } else if (pagepathname == '/music-for-meals') {
            document.getElementById('donation_amount').value = val;
            var fechildren = val / 1500;
            var complementryinvite = fechildren / 3;
            document.getElementById('complementryinvite').innerHTML = complementryinvite;
            document.getElementById('fedchildren').innerHTML = fechildren;
        } else {
            //alert(val);
            document.getElementById('donation_amount').value = val;
            document.getElementById('hidamount').innerHTML = val;
            document.getElementById('chidlrenserved').innerHTML = val / 1500;
        }
        $('.removecont').hide();
        $('#other').val('');
        $('#other_meals_amount').val('');
        $('#child').val('');
        //$('#other').hide();
        $('#other_meals_amount').hide();
        $('#other_meals_amount-error').hide();
        $('#child').prop('disabled', true);
        $('#amt_error_msg').hide();
        $("#donation_amt_error").hide();
        $('#donationamt_error_while_filling').hide();
    } else {
        //document.getElementById('amount').value = '';
        document.getElementById('hidamount').innerHTML = '';
        //document.getElementById('other').disabled = false;
        document.getElementById('donation_amount').removeAttribute('readonly', '');
        $("#mid_day_meal_plates").val(1);
        $("#mid_day_meal_amt").val(115);
        var pagepathname = window.location.pathname; // Returns path only (/path/example.html)
        if (pagepathname == '/donate-family-happiness-kits' || pagepathname == '/donate-happiness-boxes') {
            $("#senitisation_kit_amt").val(150);
        } else {
            $("#senitisation_kit_amt").val(100);
        }
        $('#donation_amount').val('');
        $('#other').val('');
        $('#child').val('');
        $('#other').prop('disabled', false);
        $('#child').prop('disabled', true);
        $('#other').show();
        $('#other_meals_amount').show();
        $('.removecont').show();
    }
}

$('#hidoptioname').hide();
$('#otherlable').hide();

function enableothersingledonation(val, optionname) {
    if (val != 'other') {
        //alert(optionname);
        document.getElementById('donation_amount').value = val;
        document.getElementById('hidamount').innerHTML = val;
        document.getElementById('hidoptioname').innerHTML = 'By your contribution ' + optionname;
        $('#hidoptioname').show();
        $('.removecont').hide();
        $('#other').val('');
        $('#child').val('');
        $('#other').hide();
        $('#otherlable').show();
        $('#child').prop('disabled', true);
        $("#donation_amt_error").hide();
    } else {
        document.getElementById('hidamount').innerHTML = '';
        document.getElementById('donation_amount').removeAttribute('readonly', '')
        document.getElementById('hidoptioname').innerHTML = '';
        $('#hidoptioname').hide();
        $('#donation_amount').val('');
        $('#other').val('');
        $('#child').val('');
        $('#other').prop('disabled', false);
        $('#child').prop('disabled', true);
        $('#other').show();
        $('#otherlable').hide();
        $('.removecont').show();
    }
}

function enableperchild(val) {
    $('#child').prop('disabled', false);
    document.getElementById('hidamount').innerHTML = '';
    $('#child').val('');
    $('#other').hide();
}

$('#mode_id_note_error_while_filling').hide();
$('#mode_id_error_while_filling').hide();

function chkcitizenshipsel() {
    var citizenradioValue = $("input[name='mode_id']:checked").val();
    if (citizenradioValue) {
        $('#mode_id_error_while_filling').hide();
        $('#mode_id_note_error_while_filling').hide();
    } else {
        $('#mode_id_error_while_filling').show();
        $('#mode_id_note_error_while_filling').show();
    }
}

$('#lessmealamt').hide();

function changeamt(val) {
    //no of kits/children/family
    if ($("input[name=donation_url]").val() == 'deutsche-bank-supports-kerala-flood-relief' || $("input[name=donation_url]").val() == 'benevity-supports-disaster-relief-across-india' || $("input[name=donation_url]").val() == 'donate-to-natural-disasters-relief-program' || $("input[name=donation_url]").val() == 'donate-to-kerala-flood-relief') {
        var noofkits = val / 1200;
        var noofkits = Math.round(noofkits);
        $('#noofkits').html(noofkits);
    } else if ($("input[name=donation_url]").val() == 'assam-flood-relief') {
        var noofkits = val / 750;
        $('#noofkits').html(noofkits);
        //alert(noofkits);
    } else {
        function calculateSaplings(donationAmount) {
            // Base values: ₹499 corresponds to 20 saplings
            const baseDonation = 499;
            const baseSaplings = 20;
            const incrementAmount = 500;
            const saplingsPerIncrement = 20;
        
            // Calculate the number of increments above the base donation
            const increments = Math.floor((donationAmount - baseDonation) / incrementAmount);
        
            // Calculate total saplings: base saplings + (increments * saplings per increment)
            const totalSaplings = baseSaplings + (increments * saplingsPerIncrement);
        
            // Ensure that the number of saplings is at least the base number or higher
            return donationAmount >= baseDonation ? totalSaplings : 0;
        }

        // // Example usage:
        // const donationAmounts = [499, 999, 1499, 1999, 2499, 2999, 4999, 9999];
        // donationAmounts.forEach(amount => {
        //     console.log(`For a donation of ₹${amount}, you will plant ${numberOfSaplings} saplings.`);
        // });
        const numberOfSaplings = calculateSaplings(val);
        $('#noofkits').html(numberOfSaplings);
        // console.log(noofkits);
        
    }
    //end



    $(".single_amount_wrapper label").addClass("removeselbg");
    //currency exchange rate begin on change amount
    var currency_code = $('#currency_code').val();
    //currency_exchange_rate(currency_code);
    //currency exchange rate end on change amount
    donationamtchk();

    //sanitisation kit
    var sanitisation_kit_chk = $("input[name=senitisation_kit_chk]:checked").val();
    //end sanitisation kit

    var mid_day_meal_plate_chk = $("input[name=mid_day_meal_plate_chk]:checked").val();
    if (mid_day_meal_plate_chk == 1) {
        var mid_day_meal_amt = $("#mid_day_meal_amt").val();
        if (mid_day_meal_amt == "") {
            $("#mid_day_meal_amt").val(115);
            $("#mid_day_meal_plates").val(1);
            mid_day_meal_amt = 115;
        }
        var donationsamt = val;
        if (donationsamt == '') {
            donationsamt = 0;
        }
        var total_donation_amt = (parseInt(donationsamt) + parseInt(mid_day_meal_amt));
        //alert(total_donation_amt);
        document.getElementById('donation_amount').value = total_donation_amt;
        document.getElementById('hidamount').innerHTML = total_donation_amt;
        document.getElementById('amount').value = val;
        document.getElementById('chidlrenserved').innerHTML = Math.round(val / 1500);
    } else if (sanitisation_kit_chk == 1) {
        var senitisation_kit_amt = $("#senitisation_kit_amt").val();
        if (senitisation_kit_amt == "") {
            var pagepathname = window.location.pathname;
            if (pagepathname == '/donate-family-happiness-kits' || pagepathname == '/donate-happiness-boxes') {
                $("#senitisation_kit_amt").val(150);
                $("#senitisation_kits").val(1);
                senitisation_kit_amt = 150;
            } else {
                $("#senitisation_kit_amt").val(100);
                $("#senitisation_kits").val(1);
                senitisation_kit_amt = 100;
            }
        }

        //number of children/family/kits
        if ($("input[name=donation_url]").val() == 'deutsche-bank-supports-kerala-flood-relief' || $("input[name=donation_url]").val() == 'donate-to-natural-disasters-relief-program' || $("input[name=donation_url]").val() == 'donate-to-kerala-flood-relief') {
            var noofkits = val / 1200;
            var noofkits = Math.round(noofkits);
            $('#noofkits').html(noofkits);
        } else if ($("input[name=donation_url]").val() == 'assam-flood-relief') {
            var noofkits = val / 750;
            $('#noofkits').html(noofkits);
            //alert(noofkits);
        } else {
            var noofkits = val / 1500;
            var noofkits = Math.round(noofkits);
            $('#noofkits').html(noofkits);
        }

        //end
        if (val < 1500) {
            var no_of_kits = (1500 / 1500);
        } else {
            var no_of_kits = (val / 1500);
        }
        //var no_of_kits = (val/1500);
        var senitisation_kit_amt = parseInt(no_of_kits * 100);
        var senitisation_kit_amt = Math.round(senitisation_kit_amt / 100) * 100;
        $("#senitisation_kit_amt").val(senitisation_kit_amt);

        var donationsamt = val;
        if (donationsamt == '') {
            donationsamt = 0;
        }
        var total_donation_amt = (parseInt(donationsamt) + parseInt(senitisation_kit_amt));
        //alert(donationsamt);
        //alert(senitisation_kit_amt);
        //alert(total_donation_amt);
        document.getElementById('donation_amount').value = total_donation_amt;
        document.getElementById('hidamount').innerHTML = total_donation_amt;
        document.getElementById('amount').value = val;
        document.getElementById('chidlrenserved').innerHTML = Math.round(val / 1500);
    } else {
        //alert(val);
        document.getElementById('amount').value = val;
        document.getElementById('hidamount').innerHTML = val;
        document.getElementById('donation_amount').value = val;
        document.getElementById('other').value = val;
        //alert(val);
        if (val >= 1500) {
            document.getElementById('chidlrenserved').innerHTML = Math.round(val / 1500);
        } else {
            document.getElementById('chidlrenserved').innerHTML = 0;
        }
        $("#senitisation_kit_amt").val('');
        $("#mid_day_meal_amt").val('');
        $("#mid_day_meal_plates").val('');
    }

    $('#amt_error_msg').hide();
    $('#donationamt_error_while_filling').hide();


    //document.getElementById("donationamountcls").style.background = "rgb(185 232 255)";
    //document.getElementById("donationamountcls").style.color = "#000";

}

function changeval(val) {
    var child_optoins = document.getElementById('child_optoins').value;
    var childper = val;
    var totalamount = child_optoins * childper;
    $("#meal_plates").val(childper);
    $("#meal_amt").val(totalamount);
    document.getElementById('child_amount').value = totalamount;
    document.getElementById('hidamount').innerHTML = totalamount;
    document.getElementById('donation_amount').value = totalamount;
}

function Is_update(val) {
    $("#step3").css("display", "block");
    $.post("ajax/donation_confirm", $("#frmDonationJSP").serialize(), function (data) {
        document.frmDonationJSP.submit();
        return true;
    });
}

function taxexceptioncertf(val) {
    if (val == 'tax_excp_cert') {
        $(".pan_id").show();
        $("#pan").css('border-color', '#FF0000');
    } else {
        var donationamount = $("#donation_amount").val();
        if (donationamount > 2000) {
            $(".pan_id").show();
            $("#pan").css('border-color', '#FF0000');
        } else {
            $(".pan_id").hide();
            $("#pan").css('border-color', '#FFF');
        }

    }
}

if ($("input[name=donation_url]").val() == 'joy-of-giving') {
    $(".corporate_name").css('border-color', '#FF0000');
}
if ($("input[name=donation_url]").val() == 'optum') {
    $(".optumofficelocation").css('border-color', '#FF0000');
}
if ($("input[name=donation_url]").val() == 'lionsclub') {
    $("#lionsclub_member_id").css('border-color', '#FF0000');
}
if ($("input[name=donation_url]").val() != 'genesisray') {
    $(".cityborder").css('border-color', '#FF0000');
}
$(".email-id").css('border-color', '#FF0000');
$(".ohrid").css('border-color', '#FF0000');
$(".emailfld").css('border-color', '#FF0000');
if ($("input[name=donation_url]").val() != 'daan-ustaav-with-amazon-cares') {
    $("#mobile").css('border-color', '#FF0000');
}
if ($("input[name=donation_url]").val() != 'support-effected-workers-by-covid-19' && $("input[name=donation_url]").val() != 'amway' && $("input[name=donation_url]").val() != 'checkmate-covid' && $("input[name=donation_url]").val() != 'donate-cooked-meals' && $("input[name=donation_url]").val() != 'donate-to-akshayapatra') {
    $("#pan").css('border-color', '#FF0000');
}
$("#first_name").css('border-color', '#FF0000');
$("#donation_amount").css('border-color', '#FF0000');
$("#address_dtls_flds").hide();
$("#addressdiv").hide();

function receiptcheck(val) {
    //alert(val);
    if ($("input[name=donation_url]").val() == 'wire-transfer-cheque-dd') {
        $(".email-id").css('border-color', '#FF0000');
        $("#mobile").css('border-color', '#FF0000');
        $("#phone").css('border-color', '#FF0000');
        $("#province").css('border-color', '#FF0000');
        $("#pan").css('border-color', '#FF0000');
        $("#first_name").css('border-color', '#FF0000');
        $("#address").css('border-color', '#FF0000');
        $("#postal_code").css('border-color', '#FF0000');
        $("#city").css('border-color', '#FF0000');
        $("#city").attr("placeholder", "City *");
        $("#address").attr("placeholder", "Address *");
        $("#postal_code").attr("placeholder", "Pin Code *");
        $("#province").attr("placeholder", "Province *");
        $('#receipt_through_online_or_offline_error').hide();
        $("#address_dtls_flds").show();
        $("#addressdiv").show();
    } else if (val == 1) {
        $(".email-id").css('border-color', '#FF0000');
        $("#mobile").css('border-color', '#FF0000');
        $("#pan").css('border-color', '#FF0000');
        $("#first_name").css('border-color', '#FF0000');
        $("#address").css('border-color', '#FFF');
        $("#postal_code").css('border-color', '#FFF');
        $("#city").css('border-color', '#FFF');
        $("#city").attr("placeholder", "City");
        $("#address").attr("placeholder", "Address");
        $("#postal_code").attr("placeholder", "Pin Code");
        $('#receipt_through_online_or_offline_error').hide();
        $("#phone").css('border-color', '#FF0000');
        $("#province").css('border-color', '#FFF');
        $("#address_dtls_flds").hide();
        $("#address_dtls_flds").hide();
        $("#addressdiv").hide();
    } else {
        $(".email-id").css('border-color', '#FF0000');
        $("#mobile").css('border-color', '#FF0000');
        $("#phone").css('border-color', '#FF0000');
        $("#province").css('border-color', '#FF0000');
        $("#pan").css('border-color', '#FF0000');
        $("#first_name").css('border-color', '#FF0000');
        $("#address").css('border-color', '#FF0000');
        $("#postal_code").css('border-color', '#FF0000');
        $("#city").css('border-color', '#FF0000');
        $("#city").attr("placeholder", "City *");
        $("#address").attr("placeholder", "Address *");
        $("#postal_code").attr("placeholder", "Pin Code *");
        $("#province").attr("placeholder", "Province *");
        $('#receipt_through_online_or_offline_error').hide();
        $("#address_dtls_flds").show();
        $("#address_dtls_flds").show();
        $("#addressdiv").show();
    }
}

$("#wire_trasfer_form").hide();
$("#bankdetails").hide();

function check(val) {
    //alert(val);
    if (val == "Need your cheque pick up service") {
        $("#dd_chq_form").show();
        $("#wire_trasfer_form").hide();
        $("#cheque1").show();
        $("#post").hide();
        $("#need_cheque").show();
        $("#need_post").hide();
        $(".option_1").show();
        $(".option_2").hide();
        $("#bankdetails").hide();
        $("#chequeddwiretitle").html("Donate Through A Cheque Dd");
    } else if (val == "No pick up service, I will send it by post") {
        $("#dd_chq_form").show();
        $("#wire_trasfer_form").hide();
        $("#cheque1").show();
        $("#post").hide();
        $("#need_cheque").hide();
        $("#need_post").show();
        $(".option_1").hide();
        $(".option_2").show();
        $("#bankdetails").hide();
        $("#chequeddwiretitle").html("Donate Through A Cheque Dd");
    } else if (val == "Wire transfer") {
        $("#dd_chq_form").hide();
        $("#wire_trasfer_form").show();
        $("#chequeddwiretitle").html("Wire transfer");
        $("#address_dtls_flds").show();
        $("#addressdiv").show();
        $("#form_donation").attr("action", "wire-transfer-details");
        $("#bankdetails").hide();
    } else if (val == "Bank Details") {
        $("#dd_chq_form").hide();
        $("#wire_trasfer_form").hide();
        $("#chequeddwiretitle").html("Bank Details");
        $("#bankdetails").show();
    } else {
        $("#cheque1").hide();
        $("#post").hide();
        $("#need_cheque").hide();
        $("#need_post").hide();
        $(".option_1").hide();
        $(".option_2").hide();

    }

}

///google locations code begins here
var placeSearch, autocomplete;
var componentForm = {
    street_number: 'short_name',
    route: 'long_name',
    locality: 'long_name',
    administrative_area_level_1: 'short_name',
    country: 'short_name',
    postal_code: 'short_name'
};

function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var geolocation = new google.maps.LatLng(
                position.coords.latitude, position.coords.longitude);
            var circle = new google.maps.Circle({
                center: geolocation,
                radius: position.coords.accuracy
            });
            autocomplete.setBounds(circle.getBounds());
        });
    }
}
// goolge locations code end here


///===========================================================================
//donation amount error or min limit of donation amount error display
$("#donation_amt_error").hide();
$(document).on('blur', '.limit_donation_amt', function () {
    var donation_amount_val = $('#other').val();
    if ($("input[name=donation_url]").val() == 'onlinedonations' || $("input[name=donation_url]").val() == 'pledge-to-feed' || $("input[name=donation_url]").val() == 'donate-in-honor-of-the-one-you-admire' || $("input[name=donation_url]").val() == 'donate-in-memory-of-someone-you-love' || $("input[name=donation_url]").val() == 'donate-for-a-special-occasion' || $("input[name=donation_url]").val() == 'sponsor-a-school-for-a-year' || $("input[name=donation_url]").val() == 'donate-to-anganwadi-feeding' || $("input[name=donation_url]").val() == 'make-a-donation-on-special-occasion' || $("input[name=donation_url]").val() == 'donate-on-akshaya-tritiya' || $("input[name=donation_url]").val() == 'annadaan-on-akshaya-tritiya' || $("input[name=donation_url]").val() == 'donate-to-midday-meal-programme' || $("input[name=donation_url]").val() == 'feed-the-homeless-mothers1' || $("input[name=donation_url]").val() == 'make-a-donation-on-special-occasion' || $("input[name=donation_url]").val() == 'kitchen-equipment1' || $("input[name=donation_url]").val() == 'donate-and-save-tax' || $("input[name=donation_url]").val() == 'take-a-1500-challenge' || $("input[name=donation_url]").val() == 'donate-on-this-guru-purnima' || $("input[name=donation_url]").val() == 'back-to-school') {
        if (donation_amount_val != '' && donation_amount_val <= 499) {
            $("#donation_amt_error").show();
            $("#other").focus();
            $("#other").css('border-color', '#FF0000');
        } else {
            $("#other").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'assam-flood-relief1') {
        if (donation_amount_val != '' && donation_amount_val <= 749) {
            $("#donation_amt_error").show();
            $("#other").focus();
            $("#other").css('border-color', '#FF0000');
        } else {
            $("#other").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
        var noofkits = donation_amount_val / 750;
        $('#noofkits').html(noofkits);
    } else if ($("input[name=donation_url]").val() == 'kitchen-equipment') {
        if (donation_amount_val != '' && donation_amount_val <= 999) {
            $("#donation_amt_error").show();
            $("#other").focus();
            $("#other").css('border-color', '#FF0000');
        } else {
            $("#other").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
        var noofkits = donation_amount_val / 750;
        $('#noofkits').html(noofkits);
    } else {
        if (donation_amount_val != '' && donation_amount_val <= 99) {
            $("#donation_amt_error").show();
            $("#other").focus();
            $("#other").css('border-color', '#FF0000');
        } else {
            $("#other").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    }

});
//end

$(document).on('blur', '.limit_other_meals_amount', function () {
    var donation_amount_val = $('#other_meals_amount').val();
    if ($("input[name=donation_url]").val() == 'growwithsadya') {
        if (donation_amount_val != '' && donation_amount_val <= 99) {
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'preparing-for-boards' || $("input[name=donation_url]").val() == 'covid-relief-services' || $("input[name=donation_url]").val() == 'donate-for-covid-relief' || $("input[name=donation_url]").val() == 'donate-happiness-boxes' || $("input[name=donation_url]").val() == 'tripura' || $("input[name=donation_url]").val() == 'world-food-day') {
        if (donation_amount_val != '' && donation_amount_val <= 99) {
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'motilal-oswal') {
        if (donation_amount_val != '' && donation_amount_val < 99) {
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'feedtheneedy' || $("input[name=donation_url]").val() == "donate-to-assam-flood-relief" || $("input[name=donation_url]").val() == "amazon-goes-gold" || $("input[name=donation_url]").val() == "honour-your-ancestors" || $("input[name=donation_url]").val() == "make-a-donation-on-navratri1") {
        if (donation_amount_val != '' && donation_amount_val < 499) {
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'donate-cooked-meals' || $("input[name=donation_url]").val() == 'barclays') {
        if (donation_amount_val != '' && donation_amount_val < 1) {
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else if ($("input[name=donation_url]").val() == 'share-our-strength') {
        if (donation_amount_val != '' && donation_amount_val < 2000) {
            // alert('aaabbb');
            $("#donation_amt_error").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    } else {
        if (donation_amount_val != '' && donation_amount_val <= 99) {
            $myemail = $('#email').val();
            if ($myemail == 'biradar.laxmi02@gmail.com' || $myemail == 'kavitha.br@akshayapatra.org' || $myemail == 'laxmi@creativeyogi.com' || $myemail == 'sharanu@creativeyogi.com') {
                $("#donation_amt_error").hide();
                return true;
            } else {
                $("#donation_amt_error").show();
                $("#other_meals_amount").focus();
                $("#other_meals_amount").css('border-color', '#FF0000');
            }
        } else {
            $("#other_meals_amount").css('border-color', '#ccc');
            $("#donation_amt_error").hide();
        }
    }

});
//end

//feed-a-million limit of donation amount code
$("#donationamterror").hide();
$(document).on('keyup', '.amtfeedamillion', function () {
    var donation_amount_val = $('#other_meals_amount').val();
    if ($("input[name=donation_url]").val() == 'i-share-my-lunch' || $("input[name=donation_url]").val() == 'bosch') {
        if (donation_amount_val != '' && donation_amount_val < 100) {
            $("#donationamterror").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#FFF');
            $("#donationamterror").hide();
        }
    } else {
        if (donation_amount_val != '' && donation_amount_val < 100) {
            $("#donationamterror").show();
            $("#other_meals_amount").focus();
            $("#other_meals_amount").css('border-color', '#FF0000');
        } else {
            $("#other_meals_amount").css('border-color', '#FFF');
            $("#donationamterror").hide();
        }
    }

});
//end feed-a-million limit of donation amount code

//Auto fill the form with details Fetching from Pan No and Mobile No OR Pan No and Email ID Code Begins here
function onlineOffline() {
    var online = $("input[name=receipt_through_online_or_offline]:checked").val();
    if (online == 1 || online == 0) {
        $('#receipt_through_online_or_offline_error').hide();
    } else {
        $('#receipt_through_online_or_offline_error').show();
    }
}
//as per new requirement fectch data based on pan no.
$(document).on('keyup', '.pan-card-num', function () {
    onlineOffline();
    var mobile = $('#mobile').val();
    var pan = $('#pan').val();
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var email = $('.email-id').val();
    if ($(this).val().length == 10 && mobile.length == 10) {
        donor_details_to_autofill(1); //IsStep =2
    } else if ($(this).val().length == 10 && emailReg.test(email) == true) {
        donor_details_to_autofill(2); //IsStep =2
    }
});

$(document).on('keyup', '.mobile-num', function () {
    var pan = $('#pan').val();
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var email = $('.email-id').val();
    var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
    if (tax_excp_cert == 'tax_excp_cert') {
        if ($(this).val().length == 10 && emailReg.test(email) == true) {
            donor_details_to_autofill(4); //IsStep =1
        }
    } else {
        if ($(this).val().length == 10 && pan.length == 10) {
            donor_details_to_autofill(1); //IsStep =1
        }
    }
});

$(document).on('keyup', '.email-id', function () {
    onlineOffline();
    var pan = $('#pan').val();
    var phone = $('#phone').val();
    var mobile = $('#mobile').val();
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var email = this.value;
    var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
    if (tax_excp_cert == 'tax_excp_cert') {
        if (mobile.length == 10 && emailReg.test(email) == true) {
            donor_details_to_autofill(4); //IsStep =1
        }
    } else {
        if (emailReg.test(email) == true && pan.length == 10) {
            donor_details_to_autofill(2);
        } else if (emailReg.test(email) == true && phone.length == 10) {
            donor_details_to_autofill(3);
        }
    }
});

//fetch details by phone num for international user
$(document).on('keyup', '.phone-num', function () {
    var emailReg = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    var email = $('.email-id').val();
    if (emailReg.test(email) == true && $(this).val().length == 10) {
        donor_details_to_autofill(3);
    }
});

//IsStep value is 1 the data fetching from pan and mobile condtion and IsStep value is 2 the data fetching from pan and email condtion
function donor_details_to_autofill(IsStep) {
    var pan = $('#pan').val();
    pan = encodeURIComponent(pan).replace(/!/g, '%21');
    var phone = $('#phone').val();
    var mobile = $('#mobile').val();
    var email = $('.email-id').val();
    var email = encodeURIComponent(email);
    var value1 = '';
    var value2 = '';
    if (IsStep == 1) {
        value1 = pan;
        value2 = mobile;
    } else if (IsStep == 2) {
        value1 = pan;
        value2 = email;
    } else if (IsStep == 3) {
        value1 = phone;
        value2 = email;
    } else if (IsStep == 4) {
        value1 = mobile;
        value2 = email;
    }
    var first_name = $('#first_name').val();
    var tax_excp_cert = $("input[name=tax_excp_cert]:checked").val();
    if (first_name == "") {
        if (value1 != "" && value2 != "") {
            $.getJSON('ajax/getdonordetails/' + IsStep + '/' + value1 + '/' + value2, function (data) {
                if (data != "") {
                    if (tax_excp_cert == 'tax_excp_cert') {
                        $('#first_name').val(data.first_name);
                        $('#last_name').val(data.last_name);
                        $(".email-id").val(data.email);
                        $("#how_did_you_hear_us").val(data.how_did_you_hear_us);
                        $('#user_error_msg').hide();
                    } else {
                        if (data.country_id == 1) {
                            $("#province_id").hide();
                            $("#state_select").show();
                        } else {
                            $("#state_select").hide();
                            $("#province_id").show();
                        }
                        $('#first_name').val(data.first_name);
                        $('#mobile').val(data.mobile);
                        $('#email').val(data.email);
                        $('#phone').val(data.phone);
                        $('#last_name').val(data.last_name);
                        $("#address").val(data.address);
                        $("#pan").val(data.pan);
                        $(".email-id").val(data.email);
                        $("#city").val(data.city);
                        $("#country_id").val(data.country_id);
                        $("#state_id").val(data.state_id);
                        $("#postal_code").val(data.postal_code);
                        $("#province").val(data.province);
                        //$(".areaa").val(data.area);
                        $("#how_did_you_hear_us").val(data.how_did_you_hear_us);
                        $('#user_error_msg').hide();
                    }
                } else {
                    //alert('The detail you enter does not match with the one on our record. Please fill all the details');
                    $('#user_error_msg').show();
                    setTimeout(function () {
                        $('#user_error_msg').hide();
                    }, 10000);
                    $('#first_name').val('');
                    $('#address').val('');
                    $('#city').val('');
                    //$('#country_id').val('');
                    $('#state_id').val('');
                    $('#province').val('');
                    $('#area').val('');
                    $('#how_did_you_hear_us').val('');
                }
            });
        }
    }

}
//Auto fill the form with details Fetching from Pan No and Mobile No OR Pan No and Email ID Code end here
///===========================================================================

$('.middaymealsoptions').show();
$('.homelessmothersoptions').hide();

function subprogramcheck(val) {
    if (val == 'middaymeals') {
        $('.middaymealsoptions').show();
        $('.homelessmothersoptions').hide();
    } else {
        $('.middaymealsoptions').hide();
        $('.homelessmothersoptions').show();
    }
}

//get currency exchange rate code begins here
$(document).on('change', '.currencychange', function () {
    var currency_code = $('#currency_code').val();
    //alert(currency_code);
    currency_exchange_rate(currency_code);
});

function currency_exchange_rate(currency_code) {
    var currency_code = currency_code;
    var donation_amount = $('#donation_amount').val();
    $.getJSON('ajax/getcurrencyrates/' + currency_code + '/' + donation_amount, function (data) {
        if (data != "") {
            $("#convert_amt").val(data);
        } else {
            $("#convert_amt").val('');
        }
    });

}
//get currency exchange rate code end here

//kitchen Equipment
$("#softener").click(function () {
    //$("#donation_amount").val(211455);
    //$("#damount").html(211455);
    $("#kitchen_equipment").val('Boiler new Water Softener');
    $("#kitchenequipmentname").html('Boiler new Water Softener');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/boiler.jpg">');
});

$("#grinder").click(function () {
    //$("#donation_amount").val(236476);
    //$("#damount").html(236476);
    $("#kitchen_equipment").val('GRINDER CMG 30 Premium Version');
    $("#kitchenequipmentname").html('GRINDER CMG 30 Premium Version');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/grinder.jpg">');
});

$("#khadai").click(function () {
    //$("#donation_amount").val(338321);
    //$("#damount").html(338321);
    $("#kitchen_equipment").val('SS KHADAI 100 KG CAPACITY');
    $("#kitchenequipmentname").html('SS KHADAI 100 KG CAPACITY');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/kadai.jpg">');
});

$("#cuttingmachine").click(function () {
    //$("#donation_amount").val(363735);
    //$("#damount").html(363735);
    $("#kitchen_equipment").val('Multi Vegetable Cutting Machine');
    $("#kitchenequipmentname").html('Multi Vegetable Cutting Machine');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/multi vegetable cutting machine.jpg">');
});
$("#rice_steamer").click(function () {
    $("#kitchen_equipment").val('Rice Steamer');
    $("#kitchenequipmentname").html('Rice Steamer');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/Rice-Steamer.jpg">');
});

$("#sambar_cauldron").click(function () {
    $("#kitchen_equipment").val('Sambar cauldron');
    $("#kitchenequipmentname").html('Sambar cauldron');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/Sambar-Cauldron.jpg">');
});

$("#puliyogare_mixing_machine").click(function () {
    $("#kitchen_equipment").val('Puliyogare Mixing machine');
    $("#kitchenequipmentname").html('Puliyogare Mixing machine');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/Puliyogare-Mixing-machine.jpg">');
});

$("#wet_grinder").click(function () {
    $("#kitchen_equipment").val('40 lts wet Grinder');
    $("#kitchenequipmentname").html('40 lts wet Grinder');
    $("#kitchenequipmentimg").html('<img class="img-responsive" src="includefiles/pages/Commercial-Tilting-wet-grinder.jpg">');
});
//END

//newdonationpage js
//$('.middaymealsoptions').hide();
var pagepath = window.location.pathname;
if (pagepath == "/donate-on-this-ashada-ekadashi") {
    $('#donatnamt_60000').prop('checked', true);
    $('#donatnamt_60000').val(60000);
    $("#donation_amount").val(60000);
    $('#hidamount').html('₹60000');
    $('.hidamount').html('₹60000')
}
$('.homelessmotheroptions').hide();
$('.aganwadioptions').hide();

function subprogramcheck(val) {
    if (val == 'middaymeals') {
        $('.middaymealsoptions').show();
        $('.homelessmotheroptions').hide();
        $('.aganwadioptions').hide();

        $('#other_amount_a').val('');
        $('#other_amount_h').val('');
    } else if (val == "anganwadi") {
        $('.aganwadioptions').show();
        $('.middaymealsoptions').hide();
        $('.homelessmotheroptions').hide();

        $('#other_amount').val('');
        $('#other_amount_h').val('');

    } else if (val == "homelessmothers") {
        $('.homelessmotheroptions').show();
        $('.aganwadioptions').hide();
        $('.middaymealsoptions').hide();

        $('#other_amount').val('');
        $('#other_amount_a').val('');
    }
}

function givecampgnamtClick(id) {
    var amtval = id;
    $('#donatnamt_' + id).prop('checked', true);
    $('#donatnamt_' + id).val(amtval);
    var donationamount = $("input[name='donation_amount']:checked").val();
    if (donationamount == 1500) {
        $('#hidamount').html('₹1500');
        $('.hidamount').html('₹1500');
        $("input[name='donation_amount']").val(1500);
        //mid-day meal
        $('#donationsamount_1500').addClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 4500) {
        $('#hidamount').html('₹4500');
        $('.hidamount').html('₹4500');
        $("input[name='donation_amount']").val(4500);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').addClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 6000) {
        $('#hidamount').html('₹6000');
        $('.hidamount').html('₹6000');
        $("input[name='donation_amount']").val(6000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').addClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 15000) {
        $('#hidamount').html('₹15000');
        $('.hidamount').html('₹15000');
        $("input[name='donation_amount']").val(15000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').addClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 18000) {
        $('#hidamount').html('₹18000');
        $('.hidamount').html('₹18000');
        $("input[name='donation_amount']").val(18000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').addClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 21000) {
        $('#hidamount').html('₹21000');
        $('.hidamount').html('₹21000');
        $("input[name='donation_amount']").val(21000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').addClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 24000) {
        $('#hidamount').html('₹24000');
        $('.hidamount').html('₹24000');
        $("input[name='donation_amount']").val(24000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').addClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 30000) {
        $('#hidamount').html('₹30000');
        $('.hidamount').html('₹30000');
        $("input[name='donation_amount']").val(30000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').addClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 60000) {
        $('#hidamount').html('₹60000');
        $('.hidamount').html('₹60000');
        $("input[name='donation_amount']").val(60000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').addClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 52500) {
        $('#hidamount').html('₹52500');
        $('.hidamount').html('₹52500');
        $("input[name='donation_amount']").val(52500);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').addClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 45000) {
        $('#hidamount').html('₹45000');
        $('.hidamount').html('₹45000');
        $("input[name='donation_amount']").val(45000);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').addClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 37500) {
        $('#hidamount').html('₹37500');
        $('.hidamount').html('₹37500');
        $("input[name='donation_amount']").val(37500);
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').addClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount').val('');
        $('#donation_amt_errorc').hide();
    } else if (donationamount == 1900) {
        $('#hidamount').html('₹1900');
        $('.hidamount').html('₹1900');
        $("input[name='donation_amount']").val(1900);
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').addClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount_a').val('');
        $('#donation_amt_errorc_a').hide();
    } else if (donationamount == 5700) {
        $('#hidamount').html('₹5700');
        $('.hidamount').html('₹5700');
        $("input[name='donation_amount']").val(5700);
        //anganwadi
        $('#donationsamount_5700').addClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount_a').val('');
        $('#donation_amt_errorc_a').hide();
    } else if (donationamount == 9500) {
        $('#hidamount').html('₹9500');
        $('.hidamount').html('₹9500');
        $("input[name='donation_amount']").val(9500);
        //anganwadi
        $('#donationsamount_9500').addClass('selamount');
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount_a').val('');
        $('#donation_amt_errorc_a').hide();
    } else if (donationamount == 19000) {
        $('#hidamount').html('₹19000');
        $('.hidamount').html('₹19000');
        $("input[name='donation_amount']").val(19000);
        //anganwadi
        $('#donationsamount_19000').addClass('selamount');
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //otheramt
        $('#other_amount_a').val('');
        $('#donation_amt_errorc_a').hide();
    } else if (donationamount == 9125) {
        $('#hidamount').html('₹9125');
        $('.hidamount').html('₹9125');
        $("input[name='donation_amount']").val(9125);
        //homeless mother
        $('#donationsamount_9125').addClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //otheramt
        $('#other_amount_h').val('');
        $('#donation_amt_errorc_h').hide();
    } else if (donationamount == 27375) {
        $('#hidamount').html('₹27375');
        $('.hidamount').html('₹27375');
        $("input[name='donation_amount']").val(27375);
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').addClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //otheramt
        $('#other_amount_h').val('');
        $('#donation_amt_errorc_h').hide();
    } else if (donationamount == 45625) {
        $('#hidamount').html('₹45625');
        $('.hidamount').html('₹45625');
        $("input[name='donation_amount']").val(45625);
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').addClass('selamount');
        $('#donationsamount_91250').removeClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //otheramt
        $('#other_amount_h').val('');
        $('#donation_amt_errorc_h').hide();
    } else if (donationamount == 91250) {
        $('#hidamount').html('₹91250');
        $('.hidamount').html('₹91250');
        $("input[name='donation_amount']").val(91250);
        //homeless mother
        $('#donationsamount_9125').removeClass('selamount');
        $('#donationsamount_27375').removeClass('selamount');
        $('#donationsamount_45625').removeClass('selamount');
        $('#donationsamount_91250').addClass('selamount');
        //mid-day meal
        $('#donationsamount_1500').removeClass('selamount');
        $('#donationsamount_4500').removeClass('selamount');
        $('#donationsamount_6000').removeClass('selamount');
        $('#donationsamount_15000').removeClass('selamount');
        $('#donationsamount_18000').removeClass('selamount');
        $('#donationsamount_21000').removeClass('selamount');
        $('#donationsamount_24000').removeClass('selamount');
        $('#donationsamount_30000').removeClass('selamount');
        $('#donationsamount_60000').removeClass('selamount');
        $('#donationsamount_52500').removeClass('selamount');
        $('#donationsamount_45000').removeClass('selamount');
        $('#donationsamount_37500').removeClass('selamount');
        //anganwadi
        $('#donationsamount_5700').removeClass('selamount');
        $('#donationsamount_9500').removeClass('selamount');
        $('#donationsamount_19000').removeClass('selamount');
        $('#donationsamount_1900').removeClass('selamount');
        //otheramt
        $('#other_amount_h').val('');
        $('#donation_amt_errorc_h').hide();
    }

}

$('#donation_amt_errorc').hide();
$('#donation_amt_errorc_a').hide();
$('#donation_amt_errorc_h').hide();

$(".getmidmealotheramt").on('keyup', function (event) {
    var donationamt = $('#other_amount').val();
    var donationamta = $('#other_amount_a').val();
    var donationamth = $('#other_amount_h').val();
    if (donationamt != "") {
        $('#hidamount').html('₹' + donationamt);
        $('.hidamount').html('₹' + donationamt);
        $("input[name='donation_amount']").val(donationamt);
        if (donationamt < 499) {
            $('#donation_amt_errorc').show();
        } else {
            $('#donation_amt_errorc').hide();
        }
    } else if (donationamta != "") {
        $('#hidamount').html('₹' + donationamta);
        $('.hidamount').html('₹' + donationamta);
        $("input[name='donation_amount']").val(donationamta);
        if (donationamta < 499) {
            $('#donation_amt_errorc_a').show();
        } else {
            $('#donation_amt_errorc_a').hide();
        }
    } else if (donationamth != '') {
        $('#hidamount').html('₹' + donationamth);
        $('.hidamount').html('₹' + donationamth);
        $("input[name='donation_amount']").val(donationamth);
        if (donationamth < 499) {
            $('#donation_amt_errorc_h').show();
        } else {
            $('#donation_amt_errorc_h').hide();
        }
    }

    //homeless mother
    $('#donationsamount_9125').removeClass('selamount');
    $('#donationsamount_27375').removeClass('selamount');
    $('#donationsamount_45625').removeClass('selamount');
    $('#donationsamount_91250').removeClass('selamount');
    //mid-day meal
    $('#donationsamount_1500').removeClass('selamount');
    $('#donationsamount_4500').removeClass('selamount');
    $('#donationsamount_6000').removeClass('selamount');
    $('#donationsamount_15000').removeClass('selamount');
    $('#donationsamount_18000').removeClass('selamount');
    $('#donationsamount_21000').removeClass('selamount');
    $('#donationsamount_24000').removeClass('selamount');
    $('#donationsamount_30000').removeClass('selamount');
    $('#donationsamount_60000').removeClass('selamount');
    $('#donationsamount_52500').removeClass('selamount');
    $('#donationsamount_45000').removeClass('selamount');
    $('#donationsamount_37500').removeClass('selamount');
    //anganwadi
    $('#donationsamount_5700').removeClass('selamount');
    $('#donationsamount_9500').removeClass('selamount');
    $('#donationsamount_19000').removeClass('selamount');
    $('#donationsamount_1900').removeClass('selamount');

});
//end