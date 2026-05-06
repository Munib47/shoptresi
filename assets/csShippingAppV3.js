window.csCdnSbzJs = 1;
if(typeof window.csServerSbzJs === 'undefined' && window.csServerSbzJs != 1){
    var csShippingAppBaseUrl = "https://sbz.cirkleinc.com/",
    cssbz = "cssbz",
    csCurrentPageUrl = window.location.href,
    csCurrentPagePath = window.location.pathname,
    csShopify = window.Shopify,
    csAppendMainDiv = "csShippingAppCode",
    csAppendMainDivSelector = "#csShippingAppCode",
    csDelvDayVal = '#csDeliveryDayValue',
    csDelvDateVal = '#csDeliveryDateValue',
    csDelvTimeVal = '#csDeliveryTimeValue',
    csPickDayVal = '#csPickupDayValue',
    csPickDateVal = '#csPickupDateValue',
    csPickTimeVal = '#csPickupTimeValue',
    csShipDayVal = '#csShippingDayValue',
    csShipDateVal = '#csShippingDateValue',
    csShipTimeVal = '#csShippingTimeValue',
    csCartFormSelector = 'form[action="/cart"]:not(.sbzForm), form[action="/cart?locale=en"]:not(.sbzForm), form[action*="/cart"]:not(.sbzForm), form[action*="/cart"]:not(.sbzForm)',
    csCartData = null,
    csProductIds = [],
    csSetProductIds = [],
    csProductVendorArr = [], 
    csProductTypeArr = [],
    csProductTagArr = [],
    csProductTitleArr = [],
    csProductSkuArr = [],
    csProductPropArr = [],
    csProductRateVisibility = null,
    htmlData = "",
    result_data = "",
    csTimeSettingStatus = "",
    csJq = null,
    csShopData = null,
    csCartContent = "",
    csCartAttributes = "",
    csCartProperties = "",
    csPostalCode = "",
    getShippingPickup = "",
    shippingDateDisable = 0,
    varianIds = [],
    cityArray = "",
    locale = '',
    locationcollect = [],
    hasBehaviour, allmodidata = [],behaviourData = [],datearray = [],csGoogleMapLocations = [],locationHtml = "",
    csDateFormat = "",items_length = "",cart_tags = [],cart_collections  = [],cart_call_timeout = 10000,normal_cart_ajax =  'ToCancelPrevReq', getDistanceArray = [];
    var csMarkers = [];
    var csMap;
    var csGeocoder;
    checkout_selectors = "input[name='checkout']:not(.csapps-ignore), input[value='Checkout']:not(.csapps-ignore), button[name='checkout']:not(.csapps-ignore), [href$='checkout']:not(.csapps-ignore), button[value='Checkout']:not(.csapps-ignore), input[name='goto_pp'], button[name='goto_pp'], input[name='goto_gc'], button[name='goto_gc'],.csapps_checkout";
    if (csCart.attributes != "" && csCart.attributes != null) {
        csCartAttributes = csCart.attributes;
    }
window.formatMoney = function (t, r) { function n(t, r) { return void 0 === t ? r : t } function e(t, r, e, o) { if (r = n(r, 2), e = n(e, ","), o = n(o, "."), isNaN(t) || null == t) return 0; var a = (t = (t / 100).toFixed(r)).split("."); return a[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1" + e) + (a[1] ? o + a[1] : "") } "string" == typeof t && (t = t.replace(".", "")); var o = "", a = /\{\{\s*(\w+)\s*\}\}/, i = r || this.money_format; switch (i.match(a)[1]) { case "amount": o = e(t, 2); break; case "amount_no_decimals": o = e(t, 0); break; case "amount_with_comma_separator": o = e(t, 2, ".", ","); break; case "amount_with_space_separator": o = e(t, 2, " ", ","); break; case "amount_with_period_and_space_separator": o = e(t, 2, " ", "."); break; case "amount_no_decimals_with_comma_separator": o = e(t, 0, ".", ","); break; case "amount_no_decimals_with_space_separator": o = e(t, 0, ".", ""); break; case "amount_with_space_separator": o = e(t, 2, ",", ""); break; case "amount_with_apostrophe_separator": o = e(t, 2, "'", ".") } return i.replace(a, o) }
window.csLoadScript = function(e,t){var a=document.createElement("script");a.type="text/javascript",a.src=e,document.getElementsByTagName("head")[0].appendChild(a),a.readyState?a.onreadystatechange=function(){"loaded"!=a.readyState&&"complete"!=a.readyState||(a.onreadystatechange=null,t())}:a.onload=function(){t()}};
window.csLoadCss = function(e){var t=document.getElementsByTagName("head")[0],n=document.createElement("link");n.rel="stylesheet",n.href=e,t.appendChild(n)}
function MainCode(csJq) {
    if(!csJq('#csShippingAppCode').length) return false;
    (function (ns, fetch) {
        if (typeof fetch !== "function") return;
        ns.fetch = function () {
            const response = fetch.apply(this, arguments);
            response.then((res) => {
                if (res.url.toString().indexOf("/cart/add") > -1 || res.url.toString().indexOf("/cart/add.js") > -1 || res.url.toString().indexOf("https://" + csShopify.shop + "/cart/change?t=") > -1 || res.url.toString().indexOf("https://" + csShopify.shop + "/cart/change") > -1 || res.url.toString().indexOf("https://" + csShopify.shop + "/cart/change.js?line=") > -1 || res.url.toString().indexOf("https://" + csShopify.shop + "/cart/update.js") > -1 || res.url.toString().indexOf("https://" + csShopify.shop + "/cart/change.js") > -1 || res.url.toString().indexOf("/cart/change") > -1 ){
                    if (res.url.indexOf("?csapp=shipcs") == -1){
                        csUpdateCart(1);
                    }
                }
            });
            return response;
        };
    })(window, window.fetch);

    csJq(document).ajaxComplete(function (event, xhr, settings) {
        if(settings != undefined){
            if (settings.url.toString().indexOf("/cart/add") > -1 || settings.url.toString().indexOf("/cart/add.js") > -1 || settings.url.toString().indexOf("/cart/change?t=") > -1 || settings.url.toString().indexOf("/cart/change") > -1 || settings.url.toString().indexOf("/cart/change.js?line=") > -1 || settings.url.toString().indexOf("/cart/update.js") > -1 || settings.url.toString().indexOf("/cart/change.js") > -1){
                if (settings.url.indexOf("?csapp=shipcs") == -1){
                    csUpdateCart(1);
                }
            }
        }
    });
    csPostalCode = localStorage.getItem("_cspcod_");
    var csExitOrNot = true;
    if (1){
        if(csJq('.csLoader').length == 0){
            csJq(csAppendMainDivSelector).append('<div class="csLoader"><img src="' + csShippingAppBaseUrl + 'assets/images/loading.gif"></div>');
        }
        csExitOrNot = false;
    } else {
        if (csCurrentPagePath.search("/cart") != -1){
            csJq(csAppendMainDivSelector).append('<div id="' + csAppendMainDiv + '" style="display:none;"><div class="csLoader"><img src="' + csShippingAppBaseUrl + 'assets/images/loading.gif"></div></div>');
            csExitOrNot = false;
        }
    }
    if (csExitOrNot) return false;
    csJq.getJSON("/cart.js", function(cart) {
        csCartContent = cart;
    });
    csCartContent = csCart;
    getAppData(csCartContent);
    csJq(document).on("click", ".cs-time-picker", function () {
        var csTimeValue = csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") ? csDelvTimeVal : csJq(".cs-tab_last[rel='cs-tab3']").hasClass("active") ? "#csPickupTimeValue"  : '#csShippingTimeValue';
        csJq(".cs-time-picker").removeClass("active");
        csJq(this).addClass("active");
        csJq(csTimeValue).val(csJq(this).text().trim());
        csJq("#csTimePicker,#csTimePicker1,#csTimeShippingPicker").val(csJq(this).text().trim());
        csJq(".time-block").hide();
        csUpdateCart(0);
        csJq("#required-error").html("");
        // csJq(checkout_selectors).attr("disabled", false);
    });
    csJq(document).on("click", "#csTimePicker,#csTimePicker1,#csTimeShippingPicker", function () {
        csJq(".time-block").show();
    });
    csJq(document).on("click", ".close-time-slot", function () {
        csJq(".time-block").hide();
    });
    csJq(document).mouseup(function (e) {
        var container = csJq(".time-block");
        if (!container.is(e.target) && container.has(e.target).length === 0){
            container.hide();
        }
    });
    function postalcode(){
        csJq("#csTimePicker").val('');
        csSearchOrSelect(csCartContent);
        if (csJq("#csDatepicker").val() != "" || csJq("#csTimePicker").val() != ""){
            count = 0;
            csUpdateCart(0);
        }
        csJq('#csDatepicker').val("");
        return false;
    }
    csJq(document).on("keyup input", "#postal_code", function (e){
         e.preventDefault;
         var postal = csJq("#postal_code").val().replace(/\s+/g, '');
         if(result_data.generalSettingData.gen_location_type == 1){
         var map_option = {
            componentRestrictions: { country: result_data.shopData.country_code  }
         };
         var autocomplete = new google.maps.places.Autocomplete(csJq("#postal_code")[0], map_option);
         google.maps.event.addListener(autocomplete, 'place_changed', function() {
              autocomplete.getPlace();
         });
        }

            if(result_data.generalSettingData.gen_location_type == 2){
              if (postal != '') {
                cityFetchAll(csLocations);
                if (e.which == 13) {
                    postalcode()
                }
              }
            }
            if(result_data.generalSettingData.gen_location_type == 0){
                if(result_data.generalSettingData.gen_loc_zipcode_trigger == null || parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) == 0){
                    if (e.which == 13) {
                        postalcode()
                    }
                }else{
                    hasPostalcode = false;
                    regexp = parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) == 1
                    ? /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/ :
                    /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/i;
                    if(parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) <= 2){
                        if (regexp.test(postal.toUpperCase())){
                            hasPostalcode = true;
                        }else{
                            hasPostalcode = false;
                        }
                    }else if ((e.which == 13 && postal.length >= parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger)) || postal.length >= parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger)) {
                        hasPostalcode = true;
                    }
                    if(hasPostalcode == true){
                        postalcode()
                    }else{
                        csJq("#cs-tab2 .error-cls,#cs-tab2 .datepicker-block,#cs-tab2 .select-block").hide();
                    }
                }   

            }
    });
    csJq(document).on("click", ".autoupdatecity li", function (){
        csJq('#postal_code').val(csJq(this).text());
        csJq('.autoupdatecity').hide();
        postalcode()
    })
    csJq(document).on("click", "#zip_search", function (){
        var postal = csJq("#postal_code").val().replace(/\s+/g, '')
        if(result_data.generalSettingData.gen_location_type == 2){
          if (postal != '') {
            cityFetchAll(csLocations);
            postalcode()
          }
        }
        if(result_data.generalSettingData.gen_location_type == 1){
                postalcode()
        }
        if(result_data.generalSettingData.gen_location_type == 0){
            if(result_data.generalSettingData.gen_loc_zipcode_trigger == null || parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) == 0){
                postalcode()
            }else{
                hasPostalcode = false;
                regexp = parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) == 1
                ? /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/ :
                /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z] ?[0-9][A-Z][0-9]$/i;
                if(parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger) <= 2){
                    if (regexp.test(postal)){
                        hasPostalcode = true;
                    }else{
                        hasPostalcode = false;
                    }
                }else if ((postal.length >= parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger)) || postal.length >= parseInt(result_data.generalSettingData.gen_loc_zipcode_trigger)) {
                    hasPostalcode = true;
                }
                if(hasPostalcode == true){
                    postalcode()
                }else{
                    csJq("#cs-tab2 .error-cls,#cs-tab2 .datepicker-block,#cs-tab2 .select-block").hide();
                }
            }
        }
        csJq('.autoupdatecity').hide();
    });
    csJq(document).on("click", ".cs-tab_last,.tab_drawer_heading", function () {
        csTabRefresh(this);
    });
    csJq(document).on("click", "ul.cs-tabs li", function () {
        csJq(this).closest(".tab-view").find(".cs-tab_content").hide();
        var activeTab = csJq(this).attr("rel");
        csJq("#" + activeTab).fadeIn();
        csJq(this).closest(".tab-view").find("ul.cs-tabs li").removeClass("active");
        csJq(this).addClass("active");
        if (activeTab == "cs-tab2") {
            csJq(csPickDayVal+","+csPickDateVal+",#csLocationId,#csDeliveryLocationValue,#csLocationAddress1,#csPickupTimeValue,#csShippingDateValue,#csShippingDayValue,#csShippingTimeValue").val("");
            if (result_data.generalSettingData.gen_date_time_required == 1){
                csJq(checkout_selectors).attr("disabled", true);
            }
        }
        if (activeTab == "cs-tab3") {
            csJq(csDelvDateVal+","+csDelvTimeVal+","+csDelvDayVal+",#csDeliveryZipValue,#csShippingDateValue,#csShippingDayValue,#csShippingTimeValue").val("");
            if(result_data.generalSettingData.gen_date_time_selection == 0){
                csJq("#required-error").html("");
            }
            csGeneralSettingData = result_data.generalSettingData;
            csJq("#cs-location-list").html(locationHtml);
            if(csJq('.cs-radio-card').length == 1 && csJq('.cs-tab_last[rel="cs-tab3"]').hasClass('active') == true){
              csJq('.cs-radio-card:first-child').trigger('click');
            }
        }
        if (activeTab == "cs-tab1") {
            csJq("#no-found-location").text(" ").hide();
            csJq(checkout_selectors).attr("disabled", false);
            csJq(csDelvDateVal+","+csDelvTimeVal+","+csDelvDayVal+","+csPickDayVal+","+csPickDateVal+",#csDeliveryZipValue,#csLocationId,#csDeliveryLocationValue,#csLocationAddress1,#csPickupTimeValue,#csShippingpicker,#csTimeShippingPicker").val("");
            csDateAndTimePicker(result_data.shippingDeliveryDateSettingData, "shipping");
            csCheckValidation(1);
            csJq('#csShippingpicker').show();
            if(result_data.shippingDeliveryDateSettingData.date_status == 0){
                csJq('#csShippingpicker,#csTimeShippingPicker').hide();
                csJq('#csShippingDateValue,#csTimeShippingPicker').val("");
                if(csJq("#cs-tab1 .order_must").length == 0) csJq(checkout_selectors).attr("disabled", false);
                csJq("#required-error").html("");
                csUpdateCart(0);
            }else if(result_data.shippingDeliveryDateSettingData.status == 0){
                csJq('.cs-tab_last[rel="cs-tab1"]').hide();
            }
            get_url = '/cart';
            action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=&checkout[shipping_address][zip]=&checkout[shipping_address][country]=&checkout[shipping_address][province]=`;
            if(window.unsetCheckoutInfo == undefined){ 
                csJq(csCartFormSelector).attr("action", action_url);
            }
            if(csJq("#cs-tab1 .order_must").length == 1){
                csJq('#cs-tab1 .tab-inner-content,#required-error').hide();
            }
        }
        if(typeof sbzMethodChange != 'undefined'){
            sbzMethodChange(activeTab);
        }
    });
    csJq(document).on("click", "#cs-location-list .cs-radio-card", function () {
        var get_url = csJq(csCartFormSelector).attr("action");
        csJq("#cs-location-list .cs-radio-card").removeClass("csactive");
        csJq(this).addClass("csactive");
        index = csJq(this).attr("data-location-id");
        localStorage.setItem("_cslocationid_", index);
        csJq("#csLocationId").val(csJq(this).attr("data-location-mainid"));
        csJq("#csTimePicker1").parent().hide();
        csJq(csDelvDayVal+","+csDelvDateVal+","+csDelvTimeVal+","+csPickDateVal+",#csTimePicker1,#csDeliveryZipValue,#csShippingDateValue,#csShippingDayValue,#csPickupTimeValue").val("");
        Adress2 = result_data.locations[index].address2 != undefined ? result_data.locations[index].address2 : "";
        city1 = result_data.locations[index].city != undefined ? result_data.locations[index].city : "";
        state_code1 = result_data.locations[index].state_code != undefined ? result_data.locations[index].state_code : "";
        last_name = csJq('input[name=pickup-last-name]').val();
        phone_number = csJq('input[name=pickup-number]').val();
        email = csJq('input[name=pickup-email]');
        csJq("#csShippingAddress1").val(result_data.locations[index].address1);
        csJq("#csLocationAddress1").val(result_data.locations[index].address1+', '+city1 +', '+ state_code1 +', '+result_data.locations[index].country_code + ', ' + result_data.locations[index].zip);
        csJq("#csShippingAddress2").val(Adress2);
        csJq("#csShippingCity").val(result_data.locations[index].city);
        csJq("#csShippingZip").val(result_data.locations[index].zip);
        csJq("#csDeliveryLocationValue").val(result_data.locations[index].name);
        get_url = '/cart';
        if(result_data.generalSettingData.prepopulate_address != '' && result_data.generalSettingData.prepopulate_address != null) locale = result_data.generalSettingData.prepopulate_address.indexOf('3')  > -1 ? result_data.generalSettingData.prepopulate_pickup_text : '';
        action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=${result_data.locations[index].address1}&checkout[shipping_address][address2]=${Adress2}&checkout[shipping_address][city]=${city1}&checkout[shipping_address][zip]=${result_data.locations[index].zip}&checkout[shipping_address][country]=${result_data.locations[index].country_code}&checkout[shipping_address][province]=${state_code1}${locale != null ? `&locale=${locale}` : ``}`;
        if(window.unsetCheckoutInfo == undefined){ 
            csJq(csCartFormSelector).attr("action", action_url);
        }
        csDateAndTimePicker(result_data.locations[index].pickupSettingData, "storepickup");
        hastime = csJq(this).closest(".cs-tab_content").find(".select-block").is(":hidden") ? 0 : 1;
        csCheckValidation(1, hastime);
        if (csJq("#csDatepicker1").val() != "" || csJq("#csTimePicker1").val() != "") {
            csUpdateCart(0);
        }
        csJq('#customer-information').show();
        csCartPickCond =  checkcartcondition(result_data.locations[index].pickupSettingData,0,"storepickup");
        csJq('#cs-tab3 .tab-inner-content,#required-error').hide();
        if(hasStorePickuplocation  == true && csHasCartCondition['csHasConditionbase'] == true){
            if(csCartPickCond['csHasConditionbase'] == false){
                csJq('#cs-tab3 .tab-inner-content,#required-error').hide();
                if(csJq('.generalmsg').length == 0){csJq('#cs-tab3 .order_must').remove(); csJq('#cs-tab3').append(csCartPickCond['msgcon'] )}
                csJq(checkout_selectors).attr("disabled", true);
            }else{
                csJq('.cs-tab_last[rel="cs-tab3"]').show();
                csJq('#cs-tab3 .order_must').remove();
                csJq('#cs-tab3 .tab-inner-content,#required-error').show(); 
            }
        }
        if( csJq("#csDatepicker1").val().length != 0) csJq("#csDatepicker1").val('');
        if(result_data.generalSettingData.gen_date_time_selection == 0 && csCartPickCond['csHasConditionbase'] == true){
            csJq("#required-error").html("");
            if (result_data.generalSettingData.gen_date_time_required == 1){
                csJq(checkout_selectors).attr("disabled", false);
            }
        }
    });
  csJq('input[name="update"]').on("click", function (e) {
      e.preventDefault()
      var self = csJq(this);
      self.closest('form').attr('action','/cart');
      csJq('.csIgnoreCngEvent').remove();
      setTimeout(function(){
        self.unbind('click').click();
      },100);
    });
    csJq(document).on("click", ".sbzdiscount button", function (e) {
        if(csJq('input[name=pickup-discount]').val().length == 0){
            var error1 = csShopData.generalSettingData.gen_pickup_discount_error_msg == null || csShopData.generalSettingData.gen_pickup_discount_error_msg == undefined || csShopData.generalSettingData.gen_pickup_discount_error_msg == '' ? 'Discount not applied!' : csShopData.generalSettingData.gen_pickup_discount_error_msg;
            csJq('.sucess-error').text('');
            csJq('.sucess-error').text(`${error1}`).addClass('errordis').removeClass('sucessdis');
        }else{
        csJq.getJSON("/payments/config", function (result) {
                window.hasdiscount = false;
                window.accessToken = result.paymentInstruments.accessToken;
                var params = {
                checkout: {
                    discount_code: csJq("input[name='pickup-discount']").val().trim(),
                    line_items: csCartContent.items,
                }
            };
            
            csJq.ajax({
                url: '/wallets/checkouts',
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "Authorization": "Basic " + btoa(window.accessToken)
                },
                method: 'POST',
                data: JSON.stringify(params),
                success: function(response) {
                    var sucess = csShopData.generalSettingData.gen_pickup_discount_success_msg == null || csShopData.generalSettingData.gen_pickup_discount_success_msg == undefined || csShopData.generalSettingData.gen_pickup_discount_success_msg == '' ? 'Discount applied!' : csShopData.generalSettingData.gen_pickup_discount_success_msg;
                    csJq('.sucess-error').text('');
                    csJq('.sucess-error').text(`${sucess}`).addClass('sucessdis').removeClass('errordis');
                    window.hasdiscount = true;
                },
                error: function(error) {
                    var error1 = csShopData.generalSettingData.gen_pickup_discount_error_msg == null || csShopData.generalSettingData.gen_pickup_discount_error_msg == undefined|| csShopData.generalSettingData.gen_pickup_discount_error_msg == '' ? 'Discount not applied!' : csShopData.generalSettingData.gen_pickup_discount_error_msg;
                    csJq('.sucess-error').text('');
                    csJq('.sucess-error').text(`${error1}`).addClass('errordis').removeClass('sucessdis');
                    window.hasdiscount = false;
                }
            });
             })
        }
    });
    csJq(document).on("click", checkout_selectors, function (e) {
        localStorage.removeItem("__ui");
        csJq('.sucess-error').text('').removeClass('sucessdis').removeClass('errordis');
        var planStatus = false;                
        if(result_data.shopData.plan_display_name == "Developer Preview" || result_data.shopData.plan_display_name == "Development" || (result_data.shopData.plan_id == 2 && result_data.shopData.plan_status == "active")){
            planStatus = true;
        } else if(result_data.shopData.plan_id == 4 && result_data.shopData.plan_status == "active" && csJq('.cs-tab_last[rel="cs-tab3"]').hasClass('active') == true){
            planStatus = true;
        }
  if(result_data.generalSettingData.gen_shipping_price_setting == 1 && planStatus ){
        e.preventDefault();
        var first_name = csJq('input[name=pickup-first-name]'), last_name = csJq('input[name=pickup-last-name]'), phone_number = csJq('input[name=pickup-number]'), email = csJq('input[name=pickup-email]'),
        self = this;
        var hasError = true;
        csJq('#customer-information input').css('border','1px solid');
        if(csJq('.cs-tab_last[rel="cs-tab3"]').hasClass('active') == true){
            if(first_name.length && first_name.val() == ''){ hasError = false; first_name.css('border','1px solid red'); }
            if(last_name.length && last_name.val() == ''){ hasError = false; last_name.css('border','1px solid red'); }
            if(phone_number.length && phone_number.val() == ''){ hasError = false; phone_number.css('border','1px solid red');}
            if(email.length){
                var validateEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/i;
                if(!validateEmail.test( email.val())){hasError = false; email.css('border','1px solid red'); }
            }
            Adress2 = result_data.locations[index].address2 != undefined ? result_data.locations[index].address2 : "";
            city1 = result_data.locations[index].city != undefined ? result_data.locations[index].city : "";
            state_code1 = result_data.locations[index].state_code != undefined ? result_data.locations[index].state_code : "";
            last_name1 = last_name.val()!=undefined?last_name.val():"";
            first_name1 = first_name.val()!=undefined?first_name.val():"";
            email1 = email.val()!=undefined?email.val():"";
            phone_number1 = phone_number.val()!=undefined?phone_number.val():""
            var get_url = csJq(csCartFormSelector).attr("action");
            get_url = '/cart'
            if(result_data.generalSettingData.prepopulate_address != '' && result_data.generalSettingData.prepopulate_address != null) locale = result_data.generalSettingData.prepopulate_address.indexOf('3')  > -1 ? result_data.generalSettingData.prepopulate_pickup_text : '';
            action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=${result_data.locations[index].address1}&checkout[shipping_address][address2]=${Adress2}&checkout[shipping_address][city]=${city1}&checkout[shipping_address][zip]=${result_data.locations[index].zip}&checkout[shipping_address][country]=${result_data.locations[index].country_code}&checkout[shipping_address][province]=${state_code1}&checkout[shipping_address][first_name]=${first_name1}&checkout[shipping_address][last_name]=${last_name1}&checkout[shipping_address][phone]=${phone_number1}&checkout[email_or_phone]=${email1}${locale != null ? `&locale=${locale}` : ``}`;
            if(window.unsetCheckoutInfo == undefined) csJq(csCartFormSelector).attr("action", action_url);
      
            csJq.getJSON("/cart.json", function (cart) {   
                var formsub = csJq(self).closest('form').length != 0 ? csJq(self).closest('form') : csJq(csCartFormSelector);
                if(result_data.generalSettingData.gen_shipping_price_setting == 1 && planStatus && hasError){
                    dataLocation1 = {}, customer = {}, 
                    dataLocation1.shop = csShopify.shop,
                    dataLocation1.cart =  cart, 
                    customer['first_name'] = first_name.val(), 
                    customer['last_name'] = last_name.val(), 
                    customer['contact_number'] = phone_number.val(), 
                    customer['email'] = email.val(), 
                    dataLocation1.cart.customer  = customer;
                    if(window.hasdiscount == true){
                        dataLocation1.checkout_access_token =  accessToken;
                        dataLocation1.discount_code =  csJq("input[name='pickup-discount']").val().trim();
                    }
                    dataLocation1 = JSON.stringify(dataLocation1);
                    csJq.ajax({
                    url: csShippingAppBaseUrl + "cs-sbz-draft-order",
                    type: "POST",
                    data: dataLocation1,
                    dataType: "JSON",
                    error: function (error) {
                        formsub.submit();
                    }
                    }).done(function(result){
                        csJq('#csShippingAppCode').addClass('sbzdeactive');
                        if(result.success){
                            window.location.href = result.checkout_url+'?locale='+result_data.generalSettingData.prepopulate_pickup_text;
                        }else{
                            formsub.submit();
                        }
                    });
                }else if(hasError){
                    csJq('#csShippingAppCode').addClass('sbzdeactive');
                    formsub.submit();
                } 
            });
        }else{
            csJq('#csShippingAppCode').addClass('sbzdeactive');
            var formsub = csJq(self).closest('form').length != 0 ? csJq(self).closest('form') : csJq(csCartFormSelector);
            formsub.submit();
        }
    }
    });
}
function csuploadMap(csGeneralSettingData,csGoogleMapLocations) {
    if ((result_data.generalSettingData.gen_location_type == 1) || (csGeneralSettingData.gen_google_api_key != undefined && csGeneralSettingData.gen_google_api_key != "" && csGeneralSettingData.gen_google_api_key != null && csGoogleMapLocations.length != 0)) {
        csLoadScript("https://sbz.cirkleinc.com/assets/js/front/polyfill.min.js", () => {
             csLoadScript("https://maps.googleapis.com/maps/api/js?key=" + csGeneralSettingData.gen_google_api_key + "&v=weekly&libraries=places", () => {
                 if (google != undefined) {
                     csLoadScript(csShippingAppBaseUrl + "assets/js/front/csGooglemap.js", function() {
                         if (result_data.generalSettingData.gen_display_same_location_product == 1) { 
                             csJq('.csLoader1').remove();
                             csJq('#cs-tab3').append('<div class="csLoader1"><img src="' + csShippingAppBaseUrl + 'assets/images/loading.gif"></div>');
                             csJq("#cs-tab3 .tab-inner-content").hide();
                         }
                         if(csGoogleMapLocations.length != 0)csLoadMapCanvas(csGoogleMapLocations);
                     });
                 }
             }); 
         });
    }
}
function csDateFormatter(fmt, date) { var dmyArr = ["d", "m", "y"]; var dmyValArr = [("0" + date.getDate()).slice(-2), ("0" + (date.getMonth() + 1)).slice(-2), "" + date.getFullYear()]; var fmtArr = fmt.indexOf("-") != -1 ? fmt.split("-") : fmt.split("/"); var returnDate = []; for (var i = 0; i < fmtArr.length; i++) { if (dmyArr.indexOf(fmtArr[i].toLowerCase().charAt(0)) != -1) { returnDate[i] = dmyValArr[dmyArr.indexOf(fmtArr[i].toLowerCase().charAt(0))]; } } returnDateVal = fmt.indexOf("-") != -1 ? returnDate.join("-") : returnDate.join("/"); return returnDateVal; }
function csYmdDateFormate(fmt, date) { var dateFormat = fmt; var dateFormatArray = dateFormat.includes("/") ? dateFormat.split("/") : dateFormat.split("-"); var dArray = date.includes("/") ? date.split("/") : date.split("-"); var m = dateFormatArray.indexOf("mm"); var d = dateFormatArray.indexOf("dd"); var y = dateFormatArray.indexOf("yyyy"); var dt = dArray[y] + "/" + dArray[m] + "/" + dArray[d]; return dt; }
function dislayLocationBasedProduct(){
    if(result_data.generalSettingData.gen_display_same_location_product == 1){
        csJq('.cs-tab_last[rel="cs-tab3"]').hide();
        variant_ids = varianIds.join(",");
        dataLocation = {};
        dataLocation.shop = csShopify.shop;
        dataLocation.variant_ids = variant_ids;
        csJq.ajax({
            url: csShippingAppBaseUrl + "variant-based-location",
            type: "POST",
            data: dataLocation,
            dataType: "JSON",
            success: function (result) {
                hasLocationShow = true;
                csJq('.cs-radio-card').each(function(){
                    csJq(this).addClass('show');
                    if(csJq(this).attr('data-locatioid') != 'null'){
                        hasLocation = true;
                        locationId = csJq(this).attr('data-locatioid');
                        csJq(result.variantLocationData).each(function(index,data){
                            if(data.location_id.indexOf(locationId) == -1){
                                hasLocation = false;
                            }
                        });
                        if(hasLocation == false){
                            csJq('.cs-radio-card[data-locatioid="'+locationId+'"]').hide().removeClass('show');
                            csJq('.cs-radio-card[data-locatioid="'+locationId+'"]').parent('.google-map-label').hide();
                            if(csJq('.cs-radio-card[data-locatioid="'+locationId+'"]').hasClass('csactive')){
                                csJq('.cs-radio-card[data-locatioid="'+locationId+'"]').removeClass('csactive');
                                csJq('#cs-tab3 .select-block,#cs-tab3 .datepicker-block ').hide();
                            }
                        }
                        csJq("#cs-tab3 .tab-inner-content").show();
                        csJq(".csLoader1").hide();
                    }
                    if(csJq(this).hasClass("show")){
                        hasLocationShow = false;
                    }
                    csJq(".csLoader1").hide();
                })
                if(hasLocationShow){
                    csJq("#cs-tab3 .tab-inner-content").hide();
                    csJq('.cs-tab_last[rel="cs-tab3"]').hide();
                }else{
                    csJq("#cs-tab3 .tab-inner-content").show();
                    csJq('.cs-tab_last[rel="cs-tab3"]').show();
                }
            }
        })
    }else{
        if(csHasCartCondition['csHasConditionbase']) csJq("#cs-tab3 .tab-inner-content").show();
        csJq(".csLoader1").hide();
    }
}
function getWidget(result_data, csCartContent) {
    csResponseData = htmlDataWidget(result_data);
    csGeneralSettingData = result_data.generalSettingData;
    csLocations = result_data.locations;
    (hasDelieverylocation = false), (hasStorePickuplocation = false);
        normal_cart_ajax = csJq.ajax({
            url: '//' + window.location.host + '/cart?view=sbz_proxy&csapp=shipcs',
            type: 'GET',
            beforeSend: function () {
                if (normal_cart_ajax != 'ToCancelPrevReq' && normal_cart_ajax.readyState < 4){
                    normal_cart_ajax.abort();
                }
            },
            success: function (vdata) {
                csJq('#cart_data').remove();
                var vdata = JSON.parse(vdata);
                csJq('<script id="cart_data">' + vdata.collection + vdata.cs_cart_count + '</script>').appendTo(document.body);
                csJq(csLocations).each(function (index, location) {
                    getDelivery = csCheckProductDeliveryStatus(location.deliverySettingData,csCartContent,"localdelivery");
                    getStorePickup = csCheckProductDeliveryStatus(location.pickupSettingData,csCartContent,"storepickup");
                    hasDelieverylocation = getDelivery == true ? true : hasDelieverylocation;
                    hasStorePickuplocation = getStorePickup == true ? true : hasStorePickuplocation;
                    locationAdress2 = location.address2 != "" ? location.address2 : "";
                    if(getDelivery && result_data.generalSettingData.gen_location_type == 2)  cityArray = cityArray.concat(",", location.deliverySettingData.cities);
                    if (getStorePickup) locationcollect.push(index);
                });
                locationcollect = locationcollect.filter(onlyUnique);
                csGoogleMapLocations = [];
                locationHtml = '';
                csJq(locationcollect).each(function(location1, locateItem) {
                    location1 = result_data.locations[locateItem];
                    Adress2 = location1.address2 != undefined ? "<p class='sbzadd2'>" + location1.address2 + "</p>" : " ";
                    city1 = location1.city != undefined ? location1.city : " ";
                    state_code1 = location1.state_code != undefined ? ", " + location1.state_code : " ";
                    more_information_text = strip(location1.more_information_text).replace(/<[^>]*>?/gm, '').trim();
                    gen_more_information_text = '';
                    if (more_information_text != '' && more_information_text != 'null')
                        gen_more_information_text = csGeneralSettingData.gen_more_information_text != undefined && csGeneralSettingData.gen_more_information_text != '' && csGeneralSettingData.gen_more_information_text != null ? "<p><a href='javascript:' onclick='moreInformationText(this);' data-more_information='" + location1.more_information_text + "'>" + csGeneralSettingData.gen_more_information_text + "</a>" : "<a href='javascript:' onclick='moreInformationText(this);' data-more_information='" + location1.more_information_text + "'>More Information</a></p>";
                    if (csGeneralSettingData.gen_google_api_key != undefined && csGeneralSettingData.gen_google_api_key != "" && csGeneralSettingData.gen_google_api_key != null) {
                        csGoogleMapLocations.push({
                            ...result_data.locations[locateItem],
                            html: `<div class="cs-radio-card" data-location-id="${locateItem}"  data-location-mainid="${location1.id}" data-locatioId="${location1.location_id}">
                                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="circleOkIconTitle" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">  <polyline points="7 13 10 16 17 9"></polyline> <circle cx="12" cy="12" r="10"></circle> </svg><div class="top-row"><label data-for="location-${locateItem}"><h6>${location1.name != null ? location1.name : ''}</h6><p class="sbzadd1">${location1.address1 != null ? location1.address1 : ''} </p>${Adress2 != null ? Adress2 : ''}<p><span class="cs_city">${city1 != null ? city1 : ''}</span><span class="cs_state_code">${state_code1 != null ? state_code1 : ''}</span><span class="cs_country_code">${location1.country_code != null ? ", " + location1.country_code : ''}</span><span class="cs_zip">${location1.zip != null ? ', ' + location1.zip : ''}</span></p>${gen_more_information_text}</label></div></div>`,
                        });
                    }
                    locationHtml += `<div class="cs-radio-card" data-location-id="${locateItem}"  data-location-mainid="${location1.id}" data-locatioId="${location1.location_id}"><svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="circleOkIconTitle" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">  <polyline points="7 13 10 16 17 9"></polyline> <circle cx="12" cy="12" r="10"></circle> </svg><div class="top-row"><label data-for="location-${locateItem}"><h6>${location1.name != null ? location1.name : ''}</h6><p>${location1.address1 != null ? location1.address1 : ''} </p>${Adress2 != null ? Adress2 : ''}<p><span class="cs_city">${city1 != null ? city1 : ''}</span><span class="cs_state_code">${state_code1 != null ? state_code1 : ''}</span><span class="cs_country_code">${location1.country_code != null ? ", " + location1.country_code : ''}</span><span class="cs_zip">${location1.zip != null ? ', ' + location1.zip : ''}</span></p>${gen_more_information_text}</label></div></div>`;
                });
                getShippingPickup = csCheckProductDeliveryStatus(result_data.shippingDeliveryDateSettingData,csCartContent,"shipping");
                csCartShipCond = checkcartcondition(result_data.shippingDeliveryDateSettingData,0,"shipping");
                csuploadMap(csGeneralSettingData,csGoogleMapLocations);
                csJq(csAppendMainDivSelector).hide().html(' ');
                csJq(csCartContent.items).each(function (index, csCartData) {
                    if(csCartData.vendor != '')  csProductVendorArr.push(csCartData.vendor);
                    if(csCartData.product_type != '') csProductTypeArr.push(csCartData.product_type);
                });
                csHasCondition =  checkProductcondition(result_data.generalSettingData,csProductTypeArr,csProductVendorArr,1)
                csHasCartCondition =  checkcartcondition(result_data.generalSettingData,1)
                if((getShippingPickup && result_data.shippingDeliveryDateSettingData.status == 0 && result_data.shippingDeliveryDateSettingData.date_status == 1) && (hasDelieverylocation || hasStorePickuplocation) ) getShippingPickup = false;
                if ((hasDelieverylocation || hasStorePickuplocation || getShippingPickup) && csHasCondition){
                    csJq(csAppendMainDivSelector).html(csResponseData).show();
                } else{
                    csJq(csAppendMainDivSelector).html(csResponseData).hide();
                    csJq('#csOrderTypeValue').val("");
                    csUpdateCart(0,1);
                }
                csJq('#cs-tab3').append('<div class="csLoader1"><img src="' + csShippingAppBaseUrl + 'assets/images/loading.gif"></div>');
                csJq("#cs-location-list").html(locationHtml);
                csJq("#cs-tab3 .tab-inner-content, #cs-tab2 .tab-inner-content").hide();
                csJq('.cs-tab_last[rel="cs-tab1"],.cs-tab_last[rel="cs-tab2"],.cs-tab_last[rel="cs-tab3"]').hide();
                if(csHasCartCondition['csHasConditionbase'] == true){
                    if(csHasCondition){
                        if (hasDelieverylocation == true)csJq('.cs-tab_last[rel="cs-tab2"],#cs-tab2 .tab-inner-content').show(); 
                        if (getShippingPickup == true){
                            csCartPropertiesCheck = false;
                            csJq(csAppendMainDivSelector).show();
                            csJq('.cs-tab_last[rel="cs-tab1"]').show();
                        } 
                        if (hasStorePickuplocation == true){
                            csJq('.cs-tab_last[rel="cs-tab3"],#cs-tab3 .tab-inner-content').show();
                            dislayLocationBasedProduct()
                        }
                    }
                }else{
                    if (hasDelieverylocation == true){
                        csJq('.cs-tab_last[rel="cs-tab2"]').show(); 
                        csJq("#cs-tab2 .tab-inner-content").hide();
                        csJq('#cs-tab2.cs-tab_content').append(csHasCartCondition['msgcon']);
                    }
                    if (getShippingPickup == true){
                        csCartPropertiesCheck = false;
                        csJq(csAppendMainDivSelector).show();
                        csJq('.cs-tab_last[rel="cs-tab1"]').show();
                        csJq("#cs-tab1 .tab-inner-content").hide();
                        csJq('#cs-tab1.cs-tab_content').append(csHasCartCondition['msgcon']);
                    } 
                    if (hasStorePickuplocation == true){
                        csJq('.cs-tab_last[rel="cs-tab3"]').show();
                        csJq("#cs-tab3 .tab-inner-content").hide();
                        csJq('#cs-tab3.cs-tab_content').append(csHasCartCondition['msgcon']);
                        dislayLocationBasedProduct()
                    }
                    csJq('.cs-tab_container').addClass('generalmsg');
                }
                if(getShippingPickup == true && csHasCartCondition['csHasConditionbase'] == true){
                    if(csCartShipCond['csHasConditionbase'] == false){
                        csJq('#cs-tab1 .tab-inner-content,#required-error').hide();
                        if(csJq('.generalmsg').length == 0){csJq('#cs-tab1 .order_must').remove(); csJq('#cs-tab1').append(csCartShipCond['msgcon'] )}
                        csJq(checkout_selectors).attr("disabled", true);
                    }else{
                        csJq('.cs-tab_last[rel="cs-tab1"]').show();
                        csJq('#cs-tab1 .order_must').remove();
                        csJq('#cs-tab1 .tab-inner-content,#required-error').show(); 
                    }
                }
                csJq(".csLoader").hide();
                csDefaultSelectedValue(hasDelieverylocation,hasStorePickuplocation,getShippingPickup);
            if(csJq('.cs-radio-card').length == 1 && csJq('.cs-tab_last[rel="cs-tab3"]').hasClass('active') == true){
                csJq('.cs-radio-card:first-child').trigger('click');
            }
            if(typeof csOuterfunction != 'undefined'){
                csOuterfunction();
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // console.log(xhr.status);
           // console.log(thrownError);
        }
    });
}
function getResult(result){
    if (result.msg == 200) {
        if (result.success) {
            result_data = result;
            wmf = result_data.shopData.money_format;
            getWidget(result_data, csCartContent);
            if (csGeneralSettingData) {
                if (csGeneralSettingData.gen_hide_additional_checkout_button == 1){
                    csJq(".additional-checkout-buttons").hide();
                }
            }
            csCreateCustomDropdown();
        }
        if (result.error){
            csJq(csAppendMainDivSelector).html("");
        }
    }
}
async function getAppData(csCartContent) {
    var csResponseData = false;
    var csFormData = new FormData();
    csFormData.append("shop", csShopify.shop);
    csFormData.append("product_ids", csProductIds);
    await csJq.ajax({
        url: csShippingAppBaseUrl + "cs-sbz-front-data",
        type: "POST",
        data: csFormData,
        dataType: "JSON",
        contentType: false,
        processData: false,
        success: function (result) {
            if (result.msg == 200) {
                if (result.success) {
                    result_data = result;
                    wmf = result_data.shopData.money_format;
                    getWidget(result_data, csCartContent);
                    if (csGeneralSettingData) {
                        if (csGeneralSettingData.gen_hide_additional_checkout_button == 1){
                            csJq(".additional-checkout-buttons").hide();
                        }
                    }
                    csCreateCustomDropdown();
                }
                if (result.error){
                    csJq(csAppendMainDivSelector).html("");
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // console.log(xhr.status);
            // console.log(thrownError);
        },
    });
    return csResponseData;
}
function csSearchOrSelect(csCartContent) {
    csProductIds = [],varianIds = [], cart = csCartContent
        csJq(cart.items).each(function (index, csCartData) {
            csProductIds.push(csCartData.product_id);
            varianIds.push(csCartData.id);
        });
        var csPostalCode1 = csJq("#postal_code").val();
        if(csPostalCode1 != '' && csPostalCode1 != undefined){
        var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
        }
        localStorage.setItem("_cspcod_", csPostalCode);
        if (result_data.msg == 200) {
            var notshow = 0,
                haswidget = false;

            csJq(checkout_selectors).attr("disabled", false);
            csLocations = result_data.locations;
            var getzip = false;
            var csShippingDeliveryCombine = result_data.generalSettingData.gen_combine_ship_delivery;
            if(result_data.generalSettingData.gen_location_type == 1){
                getAllDistance(csLocations,csJq("#postal_code").val()).then(result => { 
                    if (result_data.success) {
                        csJq(csLocations).each(function (index, location) {
                        if(result[index] != undefined){
                            getzip1 = distanceCodeMatch(result[index],location,csPostalCode);
                        } 
                        });
                        csJq(getzip1).each(function (index, location) {
                            getDelivery = csCheckProductDeliveryStatus(location.data, cart,"localdelivery");
                           
                            if (getDelivery) {
                                notshow++;
                            }
                            if (notshow == 1) {
                                csDateAndTimePicker(location.data,  "localdelivery");
                                csJq("#csLocationId").val(location.id);
                                csCheckValidation(1);
                                if(typeof sbzZipcodeUpdate != 'undefined') sbzZipcodeUpdate(csPostalCode);
                                get_url = '/cart' 
                                if(result_data.generalSettingData.prepopulate_address != '' && result_data.generalSettingData.prepopulate_address != null) locale = result_data.generalSettingData.prepopulate_address.indexOf('2')  > -1 ? result_data.generalSettingData.prepopulate_local_text : '';
                                var gcode = new google.maps.Geocoder();
                                gcode.geocode({'address': csJq("#postal_code").val()}, function(results, status) { 
                                  var zip = results[0].address_components.find(component => component.types.includes("postal_code")).long_name;
                                  if (zip) {
                                    var action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=&checkout[shipping_address][zip]=${zip}&checkout[shipping_address][country]=&checkout[shipping_address][province]=${locale != null ? `&locale=${locale}` : ``}`;
                                  } else {
                                    var action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=&checkout[shipping_address][zip]=&checkout[shipping_address][country]=&checkout[shipping_address][province]=${locale != null ? `&locale=${locale}` : ``}`;
                                  }
                                  if(window.unsetCheckoutInfo == undefined){ 
                                      csJq(csCartFormSelector).attr("action", action_url);
                                  }
                                });
                                return false;
                            }
                        });
                    }
                    csJq("#postal-code-error").parent().hide();
                    if (result_data.error || notshow == 0) {
                        csJq(csCartFormSelector).attr("action", '/cart');
                        csJq("#postal-code-error").html(result_data.generalSettingData.gen_loc_zip_error_message_text).parent().show();
                        csJq("#postal-code-error").show();
                        csJq("#csDatepicker, #csTimePicker, .time-block").parent().hide().val("");
                        csJq("#csDeliveryDateValue,#csDeliveryTimeValue,#csDeliveryDayValue,#csDeliveryZipValue,#csDeliveryLocationValue,#csLocationAddress1,#csPickupDateValue,#csPickupTimeValue,#csPickupDayValue,#csShippingDateValue,#csShippingDayValue").val("");
                        if( result_data.generalSettingData.gen_date_time_required == 1 || csJq("#required-error #postal-code-error").length > 0){
                         csJq(checkout_selectors).attr("disabled", true);
                         csJq('#required-error').hide();
                         csJq('#csDatepicker').val("");
                        }
                    }
                });
                
            } else{
                if (result_data.success) {
                    // csJq('#postal-code-error, #required-error #postal-code-error').text(' ').hide();
                    if (typeof csShippingDeliveryCombine != 'undefined' && csShippingDeliveryCombine == 1) {
                      var _this = csJq('.cs-tab_last[rel="cs-tab2"]')[0];
                      var csTabVal = csJq(_this).attr("rel"),
                          typeOfOrder = "";
                      if (typeof csDisableDateArray != 'undefined') {
                          csDisableDateArray = []
                      }
                      if (typeof csEnableDateArray != 'undefined') {
                          csEnableDateArray = []
                      }
                      if (csTabVal == "cs-tab1") {
                          typeOfOrder = "Shipping";
                      } else if (csTabVal == "cs-tab2") {
                          typeOfOrder = "Local Delivery";
                      } else if (csTabVal == "cs-tab3") {
                          typeOfOrder = "Store Pickup";
                      }
                      csJq("#csDatepicker").datepicker().data("datepicker").clear();
                      csJq("#csDatepicker1").datepicker().data("datepicker").clear();
                      csJq("#csShippingpicker").datepicker().data("datepicker").clear();
                      csJq("#csOrderTypeValue").val(typeOfOrder);
                      csJq('#cs-tab1').hide();
                      csJq(csPickDayVal+","+csPickDateVal+",#csLocationId,#csDeliveryLocationValue,#csLocationAddress1,#csPickupTimeValue,#csShippingDateValue,#csShippingDayValue,#csShippingTimeValue").val("");
                      if (result_data.generalSettingData.gen_date_time_required == 1){
                          csJq(checkout_selectors).attr("disabled", true);
                      }
                    }
                    if (result_data.generalSettingData.calendar_display_style == 1) {
                      csJq("#csDatepicker").datepicker().data("datepicker").clear();
                      csJq("#csDatepicker1").datepicker().data("datepicker").clear();
                      csJq("#csShippingpicker").datepicker().data("datepicker").clear();
                    }
                    csJq(checkout_selectors).attr("disabled", false);
                    csLocations = result_data.locations;
                    var locCheck = 0;
                    csJq(csLocations).each(function (index, location) {
                        getDelivery = csCheckProductDeliveryStatus(location.deliverySettingData, cart,"localdelivery");
                        if(result_data.generalSettingData.gen_location_type == 2){
                          if (typeof csPostalCode != 'undefined') {
                            var getzip = cityMatch(location,csPostalCode);
                          }
                        }else{
                            var getzip = zipCodeMatch(location.deliverySettingData.zip_codes, csPostalCode, location.country_code,location);
                        }
                        csCartDelCond =  checkcartcondition(location.deliverySettingData,0,"localdelivery")
                        if (getzip && getDelivery) {
                            notshow++;
                        }
                        if (notshow == 1) {
                            var checkcsDateAndTimePicker = csDateAndTimePicker(location.deliverySettingData,  "localdelivery", csJq("#postal_code").val(), location);
                            if (checkcsDateAndTimePicker == 'no') {
                              locCheck = 1;
                              return false;
                            }
                            csJq("#csLocationId").val(location.id);
                            csCheckValidation(1);
                            if(typeof sbzZipcodeUpdate != 'undefined') sbzZipcodeUpdate(csPostalCode);
                            get_url = '/cart' 
                            if(result_data.generalSettingData.prepopulate_address != '' && result_data.generalSettingData.prepopulate_address != null) locale = result_data.generalSettingData.prepopulate_address.indexOf('2')  > -1 ? result_data.generalSettingData.prepopulate_local_text : '';
                            if (result_data.generalSettingData.gen_location_type == 2) {
                              var action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=${csJq("#postal_code").val()}&checkout[shipping_address][zip]=&checkout[shipping_address][country]=${csJq("#postal_code").attr('data-code')}&checkout[shipping_address][province]=${locale != null ? `&locale=${locale}` : ``}`;
                            } else {
                              var action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=&checkout[shipping_address][zip]=${csJq("#postal_code").val()}&checkout[shipping_address][country]=&checkout[shipping_address][province]=${locale != null ? `&locale=${locale}` : ``}`;
                            }
                            if(window.unsetCheckoutInfo == undefined){ 
                                csJq("form[action*='/cart']:not(.sbzForm),form[action='/cart?locale=en'],form[action='/checkout']").attr("action", action_url);
                            }
                            if(csCartDelCond['csHasConditionbase'] == false){
                                csJq('#cs-tab2 .search-content-wrap,#required-error').hide(); 
                                if(csJq('.generalmsg').length == 0){csJq('#cs-tab2 .order_must').remove(); csJq('#cs-tab2').append(csCartDelCond['msgcon'] )}
                             }else{
                                csJq('#cs-tab2 .order_must').remove();
                                csJq('#cs-tab2 .search-content-wrap,#required-error').show(); 
                             }
                            return false;
                        } 
                    });
                    if (locCheck == 0) {
                      csJq("#postal-code-error").parent().hide();
                    }
                }
                if (result_data.error || notshow == 0) {
                    if (typeof csShippingDeliveryCombine != 'undefined' && csShippingDeliveryCombine == 1 && csPostalCode1 != '') {
                      var _this = csJq('.cs-tab_last[rel="cs-tab1"]')[0];
                      var csTabVal = csJq(_this).attr("rel"),
                          typeOfOrder = "";
                      if (typeof csDisableDateArray != 'undefined') {
                          csDisableDateArray = []
                      }
                      if (typeof csEnableDateArray != 'undefined') {
                          csEnableDateArray = []
                      }
                      if (csTabVal == "cs-tab1") {
                          typeOfOrder = "Shipping";
                      } else if (csTabVal == "cs-tab2") {
                          typeOfOrder = "Local Delivery";
                      } else if (csTabVal == "cs-tab3") {
                          typeOfOrder = "Store Pickup";
                      }
                      csJq("#csDatepicker").datepicker().data("datepicker").clear();
                      csJq("#csDatepicker1").datepicker().data("datepicker").clear();
                      csJq("#csShippingpicker").datepicker().data("datepicker").clear();
                      csJq("#csOrderTypeValue").val(typeOfOrder);
                      csJq('#cs-tab2 .select-block, #cs-tab2 .datepicker-block').hide();
                      csJq("#cs-tab1").fadeIn();
                      csJq("#no-found-location").text(" ").hide();
                      csJq(checkout_selectors).attr("disabled", false);
                      csJq(csDelvDateVal+","+csDelvTimeVal+","+csDelvDayVal+","+csPickDayVal+","+csPickDateVal+",#csDeliveryZipValue,#csLocationId,#csDeliveryLocationValue,#csLocationAddress1,#csPickupTimeValue,#csShippingpicker,#csTimeShippingPicker").val("");
                      csDateAndTimePicker(result_data.shippingDeliveryDateSettingData, "shipping");
                      csCheckValidation(1);
                      csJq('#csShippingpicker').show();
                      if(result_data.shippingDeliveryDateSettingData.date_status == 0){
                          csJq('#csShippingpicker,#csTimeShippingPicker').hide();
                          csJq('#csShippingDateValue,#csTimeShippingPicker').val("");
                          if(csJq("#cs-tab1 .order_must").length == 0) csJq(checkout_selectors).attr("disabled", false);
                          csJq("#required-error").html("");
                          csUpdateCart(0);
                      }else if(result_data.shippingDeliveryDateSettingData.status == 0){
                          csJq('.cs-tab_last[rel="cs-tab1"]').hide();
                      }
                      get_url = '/cart';
                      action_url = `${get_url}?step=contact_information&checkout[shipping_address][address1]=&checkout[shipping_address][address2]=&checkout[shipping_address][city]=&checkout[shipping_address][zip]=&checkout[shipping_address][country]=&checkout[shipping_address][province]=`;
                      if(window.unsetCheckoutInfo == undefined){ 
                          csJq(csCartFormSelector).attr("action", action_url);
                      }
                      if(csJq("#cs-tab1 .order_must").length == 1){
                          csJq('#cs-tab1 .tab-inner-content,#required-error').hide();
                      }
                    }
                    csJq("form[action*='/cart']:not(.sbzForm),form[action='/cart?locale=en']").attr("action", '/cart');
                    if ((typeof csShippingDeliveryCombine != 'undefined' && csShippingDeliveryCombine != 1) || typeof csShippingDeliveryCombine == 'undefined' || csPostalCode1 == '') {
                      csJq("#postal-code-error").html(result_data.generalSettingData.gen_loc_zip_error_message_text).parent().show();
                      csJq("#postal-code-error").show();
                      csJq("#csDatepicker, #csTimePicker, .time-block").parent().hide().val("");
                      csJq("#csDeliveryDateValue,#csDeliveryTimeValue,#csDeliveryDayValue,#csDeliveryZipValue,#csDeliveryLocationValue,#csLocationAddress1,#csPickupDateValue,#csPickupTimeValue,#csPickupDayValue,#csShippingDateValue,#csShippingDayValue").val("");
                    }
                    if( result_data.generalSettingData.gen_date_time_required == 1 || csJq("#required-error #postal-code-error").length > 0){
                        csJq(checkout_selectors).attr("disabled", true);
                        csJq('#required-error').hide();    
                        csJq('#csDatepicker').val("");
                    }
                }
            }
        }
}
function cityFetchAll(csLocations) {
    var self =  csJq('#postal_code').val(),result = "";
       var filterArr = [];
    if (typeof cityArray == 'string') cityArray = cityArray.split(',');
        csJq(cityArray).each(function(index,data){
            if(data != '' && data.toLowerCase().indexOf(self.toLowerCase()) != -1)filterArr.push(data);
        })
        filterArr = filterArr.filter(onlyUnique);
        result += '<ul>'
        for (var i in filterArr) {
            result += '<li>'+filterArr[i] + '</li>';
        }
        result += '</ul>'
        csJq('.autoupdatecity').html('');
        result = filterArr.length != 0  ? result : result_data.generalSettingData != '' && result_data.generalSettingData.gen_loc_search_error_msg_text != '' ? '<ul><li>'+result_data.generalSettingData.gen_loc_search_error_msg_text+'</li></ul>' : '<ul><li>No matches!</li></ul>';
        if(filterArr.length == 0) csJq("#cs-tab2 .error-cls,#cs-tab2 .datepicker-block,#cs-tab2 .select-block,#required-error").hide();
        csJq('.autoupdatecity').html(result).show();
        if(csJq('.autoupdatecity ul').height() > 200){
            csJq('.autoupdatecity ul').css('height', '200px')
        }
}
function cityMatch(result,city) {
    var data = result.deliverySettingData, customerCityTrueFalse = false;
    if(data.cities != null){
        cities =  data.cities.split(',');
        csJq(cities).each(function(index,data1){
            data1 = data1.replace(/-|\s/g,"");
            if(data1 != '' && data1.toLowerCase() == city.toLowerCase() && customerCityTrueFalse == false){
                customerCityTrueFalse = true;
            }
        })
    }
    return customerCityTrueFalse;
}
function getDistance (start, end) {
    data = start.deliverySettingData, getAll = [];
        if(start.deliverySettingData.status == 1 && start.zip != null){
            var service = new google.maps.DistanceMatrixService();
            return new Promise((resolve, reject) => {
            service.getDistanceMatrix(
            {
                origins: [start.zip.replace(/-|\s/g,"")],
                destinations: [end],
                travelMode:   google.maps.TravelMode.DRIVING,
                unitSystem:   google.maps.UnitSystem.IMPERIAL
            }, (response, status) => {
                if(status === 'OK' ){
                    resolve({ distance: response.rows[0].elements[0] });
                }
            }
            );
            });
        }
}
function getAllDistance (result, end) {
    const promisedDistances = result.map((start) => getDistance(start, end));
    console.log(Promise.all(promisedDistances));
    return Promise.all(promisedDistances);
}
function distanceCodeMatch(result,zipcode){
    customerZipTrueFalse = false,   lowestDistance = '';
    if(result.distance.status == 'OK' ){
        var deliverySettingData = zipcode.deliverySettingData,
        tempDistance = result.distance.distance.text.includes('mi') == true ? parseFloat(result.distance.distance.text.replace('mi', '').replace(/,/g, '')) : parseFloat(result.distance.distance.text.replace('ft', '').replace(/,/g, '') / 5280),
        tempDistance = result_data.generalSettingData.gen_search_measurement_type == 0 ? tempDistance * 1.6: tempDistance;
        if(parseFloat(deliverySettingData.minimum_distance) <= tempDistance && parseFloat(deliverySettingData.maximum_distance) >= tempDistance){
          getAll[zipcode.id] = [];
          getAll[zipcode.id]['data'] = deliverySettingData;
          getAll[zipcode.id]['distance']  = tempDistance;
        }
         lowestDistance = getAll.sort(
         (teamA, teamB) =>  teamA.distance - teamB.distance,
        )
    }
    return lowestDistance;
}
function zipCodeMatchForUK(destPostalCode, zipCodes){
    destPostalCode = destPostalCode.replace(/\s/g, "");
    var regex = /^[A-Z]{1,2}[0-9RCHNQ][0-9A-Z]?\s?[0-9][ABD-HJLNP-UW-Z]{2}$|^[A-Z]{2}-?[0-9]{4}$/i;
    if(regex.test(destPostalCode) == false){
      return -1;
    }
    customerZip             =  destPostalCode.slice(0, -3).toLowerCase();
    codes                   = zipCodes.split(",");
    customerZipTrueFalse    = false;
    destPostalCode = destPostalCode.toLowerCase();
    common_codes = [];
      csJq(codes).each(function (index, code) {
        code           = code.replace(/-|\s/g,"");
        is_found_start =  code.indexOf('*');
        is_found_len   =  code.indexOf('#');
        if (is_found_start > -1) {
            if(is_found_len > -1 && is_found_start > -1 &&  code.length == destPostalCode.length)
            {
                code = code.replace(/#/g, "");
                // $code = str_replace("#", "", $code);
            }
             code  = code .replace("*", ""); 
            if(customerZipTrueFalse != true) {
              
                switch (code.length) {
                    case 4:
                            // customerZip =  destPostalCode.slice(0, -2).toLowerCase(); 
                            // if(customerZip == code || code.includes(customerZip) != false){  || code == destPostalCode.substr(0, 4)
                            if(customerZip == code){
                                customerZipTrueFalse = true;
                            }
                        break;
                    case 3:        
                    
                          if(isNaN(code.substr(0, 2)) == true && isNaN(code[2]) == false && customerZip == code){
                              customerZipTrueFalse = true;
                          }else if(isNaN(code[0]) == true && isNaN(code.substr(1, 2)) == false && customerZip.substr(0, 3)  == code){
                              customerZipTrueFalse = true;
                          }else if(isNaN(code[0]) == true && isNaN(code[1]) == false && isNaN(code[2]) == true && customerZip == code){
                              customerZipTrueFalse = true;
                          }else if(!isNaN(customerZip[3]) == false && !isNaN(code.substr(0, 2)) == false && isNaN(code[2]) == false && customerZip.substr(0, 3) == code){
                              customerZipTrueFalse = true;
                          }
                        break;
                    case 2:
 
                      if(!isNaN(code.substr(0, 2)) == false && isNaN(destPostalCode[2]) == true && customerZip == code){
                          customerZipTrueFalse = true;
                      }else if(!isNaN(code[0]) == false && customerZip[1] != undefined && isNaN(customerZip[1]) == true &&  customerZip == code){
                          customerZipTrueFalse = true;
                      }else if(!isNaN(code[0]) == false   && !isNaN(code[1]) == false && customerZip.substr(0, 2)  == code){
                          customerZipTrueFalse = true;
                      }else if(!isNaN(destPostalCode[2]) == false && !isNaN(code.substr(0, 2)) == false && customerZip.substr(0, 2) == code){
                          customerZipTrueFalse = true;
                      }else if(!isNaN(code[0]) == false &&  !isNaN(customerZip[1]) == true && customerZip.substr(0, 2)  == code){
                          customerZipTrueFalse = true;
                      }
                        break;
                    case 1:
                            if(isNaN(code[0]) == true && isNaN(destPostalCode[1]) == false && customerZip[0] == code){
                                customerZipTrueFalse = true;
                            }
                        break;    
                }
            }
        } else {
          if (code.indexOf("=") > -1) {
                    min = code.split("=")[0],
                    max = code.split("=")[1],
                    range_codes = range(min, max);
                csJq(range_codes).each(function (index, v) {
                    common_codes.push(v)
                });
            }
            else {
                common_codes.push(code);
            }
        }
        if(customerZipTrueFalse == false && common_codes.includes(destPostalCode) != false){
            customerZipTrueFalse = true;
        }
    });
                    console.log('customerZipTrueFalse',customerZipTrueFalse);
  
  return customerZipTrueFalse;
}
function zipCodeMatch(zipCodes = "", dest_postal_code = "",country_code,location) {

    if (zipCodes != null && zipCodes != "" && dest_postal_code != "") {
        zipCodes = zipCodes.toLowerCase();
        if(country_code == 'GB'){
            is_found_code =  zipCodeMatchForUK(dest_postal_code,zipCodes)
            if(is_found_code == -1){
                return false;   
            }
        }else{
            dest_postal_code = dest_postal_code.toLowerCase();
            is_found_code = false;
            var common_codes = [], common_codes_star = [], common_codes_star_5 = [], common_codes_star_4 = [], common_codes_star_3 = [], common_codes_star_2 = [], common_codes_star_1 = [];
            codes = zipCodes.split(",");
            csJq(codes).each(function (index, code) {
                var code = code.replace(/-|\s/g,""), is_found_start = code.indexOf("*"), is_found_len = code.indexOf("#");
                if (is_found_start > -1) {
                    if (is_found_len > -1 && is_found_start > -1 && code.length == dest_postal_code.length)  code = code.replace(/#/g, "");  //str_replace("#", "", code);
                    code = code.replace("*", ""); //str_replace("*", "", code);
                    if(code.indexOf("#") == -1) {
                        common_codes_star.push(code);
                        if (code.length == 5) {
                            common_codes_star_5.push(code);
                        } else if (code.length == 4) {
                            common_codes_star_4.push(code);
                        } else if (code.length == 3) {
                            common_codes_star_3.push(code);
                        } else if (code.length == 2) {
                            common_codes_star_2.push(code);
                        } else if (code.length == 1) {
                            common_codes_star_1.push(code);
                        }
                    }
                } else {
                    if (code.indexOf("=") > -1) {
                        var min = code.split("=")[0],
                            max = code.split("=")[1],
                            range_codes = range(min, max);
                        csJq(range_codes).each(function (index, v) {
                            common_codes.push(v.toString());
                        });
                    } else {
                        common_codes.push(code);
                    }
                }
            });
            if (common_codes.includes(dest_postal_code) != false) is_found_code = true;
            if (is_found_code === false && common_codes_star != "" && common_codes_star.length > 0) {
                common_codes_star = common_codes_star.filter(onlyUnique);
                csJq(common_codes_star).each(function (index, code) {
                    var search_zipcode_5 = dest_postal_code.substr(0, 5);
                    var search_zipcode_4 = dest_postal_code.substr(0, 4);
                    var search_zipcode_3 = dest_postal_code.substr(0, 3);
                    var search_zipcode_2 = dest_postal_code.substr(0, 2);
                    var search_zipcode_1 = dest_postal_code.substr(0, 1);
                    if (code.includes(dest_postal_code) != false && is_found_code != true && code.length > 0)  is_found_code = true;
                    if (common_codes_star_5.includes(search_zipcode_5) != false && is_found_code != true && common_codes_star_5.length > 0) is_found_code = true;
                    if (common_codes_star_4.includes(search_zipcode_4) != false && is_found_code != true && common_codes_star_4.length > 0) is_found_code = true;
                    if (common_codes_star_3.includes(search_zipcode_3) != false && is_found_code != true && common_codes_star_3.length > 0) is_found_code = true;
                    if (common_codes_star_2.includes(search_zipcode_2) != false && is_found_code != true && common_codes_star_2.length > 0) is_found_code = true;
                    if (common_codes_star_1.includes(search_zipcode_1) != false && is_found_code != true && common_codes_star_1.length > 0) is_found_code = true;
                });
            }
        }
        if(is_found_code == true && location.deliverySettingData.zip_code_status == 1){
            is_found_code = false;
        }else if(is_found_code == false && location.deliverySettingData.zip_code_status == 1){
            is_found_code = true;
        }
        return is_found_code;
    }
    return false;
}
function csDateModify(datemodifierjson,datearray){
    behaviourData = [];
    for (let i = 0; i < datemodifierjson.length; i++) {
        datearray = [],allmodidata  =[];
        var ruleConditionMatch = false,ruleConditionMatchCount = 0, datemodifierdata = datemodifierjson[i],ruleConditionsubMatch = false;
        csDatetype = parseInt(datemodifierdata.date_modifier_condition_type),
        csDatemodiWhen = parseInt(datemodifierdata.date_modifier_when),
        csDatemodiWhenOpe = parseInt(datemodifierdata.date_modifier_when_operator),
        csDatemodiWhenVal = datemodifierdata.date_modifier_when_value,
        csDateBehaviour = parseInt(datemodifierdata.date_behaviour),
        csDatemodiType = parseInt(datemodifierdata.date_modifier_type),
        csDatemodiTypeVal = parseInt(datemodifierdata.date_modifier_type_value),
        csDatemodiSub = parseInt(datemodifierdata.date_modifier_when_sub),
        csDatemodiSubOp = parseInt(datemodifierdata.date_modifier_when_sub_operator),
        csDatemodiSubOpVal = datemodifierdata.date_modifier_when_sub_value,
        qty = csCartContent.item_count;
    modify: while (true) {
        switch (true) {
            case csDatemodiWhen == 0:
                ruleConditionMatch = checkRulePerProduct(csDatemodiWhen,csDatemodiWhenOpe,csDatemodiWhenVal,csDatemodiSub); // ids
            break;
            case csDatemodiWhen == 1:
                ruleConditionMatch = checkRulePerProduct(csDatemodiWhen,csDatemodiWhenOpe,csDatemodiWhenVal); // tags
            break;  
            case csDatemodiWhen == 2:
                ruleConditionMatch = checkRulePerProduct(csDatemodiWhen,csDatemodiWhenOpe,csDatemodiWhenVal); // SKU
            break;  
            case csDatemodiWhen == 3:
                ruleConditionMatch = checkRulePerProduct(csDatemodiWhen,csDatemodiWhenOpe,csDatemodiWhenVal); // Properties
            break; 
            case csDatemodiWhen == 4:
                ruleConditionMatch = checkRulePerProduct(csDatemodiWhen,csDatemodiWhenOpe,csDatemodiWhenVal);// collections
            break; 
            case csDatemodiWhen == 5:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// selected date
            break; 
            case csDatemodiWhen == 6:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// selected day
            break; 
            case csDatemodiWhen == 7:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// current date
            break; 
            case csDatemodiWhen == 8:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// current day
            break;
            case csDatemodiWhen == 9:
                ruleConditionMatch = true;
            break; 
            case csDatemodiWhen == 10:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// current time
            break;
            case csDatemodiWhen == 11:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// X day from today
            break;
            case csDatemodiWhen == 12:
                ruleConditionMatch = true;
                ruleConditionsubMatch = true;
                datearray['csDatemodiWhen'] = csDatemodiWhen;
                datearray['csDatemodiWhenOpe'] = csDatemodiWhenOpe;
                datearray['csDatemodiWhenVal'] = csDatemodiWhenVal;
                datearray = dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch);// Zipcodes
            break;
        };
       if(ruleConditionsubMatch == false && typeof csDatemodiSub != 'undefined' && typeof csDatemodiSubOp != 'undefined' && typeof csDatemodiSubOpVal != 'undefined' ){
            if(csDatetype == 1 && ruleConditionMatch == true){
                csDatemodiWhen = csDatemodiSub;
                csDatemodiWhenOpe = csDatemodiSubOp;
                csDatemodiWhenVal = csDatemodiSubOpVal;
                ruleConditionsubMatch = true;
                continue modify;
            }else if(csDatetype == 2 && ruleConditionMatch != true){
                csDatemodiWhen = csDatemodiSub;
                csDatemodiWhenOpe = csDatemodiSubOp;
                csDatemodiWhenVal = csDatemodiSubOpVal;
                ruleConditionsubMatch = true;
                continue modify;
            }else{
                break modify;
            }
       }else{   
            break modify;
       }
    }
    if(ruleConditionMatch){
        ruleConditionMatchCount++;
    }

    if(csDatemodiWhen == 5){
        allmodidata['selected_date']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 6){
        allmodidata['selected_day']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 7){
        allmodidata['current_date']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 8){
        allmodidata['current_day']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 10){
        allmodidata['current_time']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 11){
        allmodidata['x_day']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen == 12){
        allmodidata['zipcode']  = datearray;
        behaviourData.push(allmodidata);
    } if(csDatemodiWhen < 5 || csDatemodiWhen == 9){
        behaviourData.push(csDatemodiType1(ruleConditionMatch,csDatemodiType,datemodifierdata));
    }
    hasBehaviour = csDateBehaviour == 0 ? false : ruleConditionMatch ? false : true;
    if(hasBehaviour) break;
  }
  return behaviourData
}
function dateValue(datearray,csDatemodiType,datemodifierdata,ruleConditionMatch) {
    if(ruleConditionMatch){
       datearray['modiminday'] ,datearray['modimaxday'] ,datearray['modienabledate'],datearray['modidisabledate'] ,datearray['modicuttime'],datearray['modienableday'],datearray['modidisableday'],datearray['tp'] ,datearray['moditimeslot'], datearray['modienabledatenew'], datearray['modienabledatenew'], datearray['modiremovedelivery'], datearray['modiaddtimeslot'], datearray['modiupdatetimeslot'];
        switch (ruleConditionMatch) {
            case csDatemodiType == 0:
                datearray['modiminday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 1:
                datearray['modimaxday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 2:
                datearray['modienabledate'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 3:
                datearray['modidisabledate']  = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 4:
                datearray['modicuttime'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 5:
                datearray['modienableday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 6:
                datearray['modidisableday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 7:
                datearray['tp']  = datemodifierdata['date_modifier_type_value'] ;
            break;
            case csDatemodiType == 8:
                datearray['moditimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 9:
                datearray['modienabledatenew'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 10:
                datearray['modiremovedelivery'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 11:
                datearray['modiaddtimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 12:
                datearray['modiupdatetimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
        }
    }
    return  datearray;
}
function checkRulePerProduct(csDatemodiWhen,operator,csDatemodiWhenVal) {
    csJq(csCartContent.items).each(function (index, csCartData) {
        if(csCartData.product_id != '')  csProductIds.push(csCartData.product_id);
        if(csCartData.product_title != '')  csProductTitleArr.push(csCartData.product_title);
        if(csCartData.sku != '') csProductSkuArr.push(csCartData.sku);
        if(csDatemodiWhen == 3){
            csJq(csCartData.properties).each(function (index, prop) {
                var prop = Object.entries(prop).map(([key, value]) => `${key}:${value}`);
                if(prop != ''){
                    csProductPropArr.push(prop);
                }
            });
        }
      });
    var  matchProductId = 0, notmatchProductId = 0,ruleConditionMatchOperator = false;

    value_get = csDatemodiWhen == 0 ? csProductIds:csDatemodiWhen == 1 ? cart_tags :csDatemodiWhen == 2 ? csProductSkuArr:csDatemodiWhen == 3 ? csProductPropArr:csDatemodiWhen == 4 ? cart_collections:
    csDatemodiWhen == 5 ? csProductSelDateArr:csDatemodiWhen == 6 ? csProductSelDayArr:csDatemodiWhen == 7 ? csProductCurDateArr:csDatemodiWhen == 8 ? csProductCurDateArr:csDatemodiWhen == 9 ? csProductDefaultArr:'';
    if(csDatemodiWhen == 0 || csDatemodiWhen == 2){
        value_get = value_get.filter(onlyUnique);
            cartProductVendor = csDatemodiWhenVal.split(',');
        csJq(value_get).each(function(index, proItem) {
            var regEx = new RegExp(`^${proItem}`);
            var found = false;
            if(operator == 5 || operator == 6){
                if (cartProductVendor.some(r => proItem.indexOf(r) > -1)) {
                    found = true;
                }
            }else if(operator == 2){
                found = cartProductVendor.some(r => regEx.test(r));
            }else{
                if (cartProductVendor.some(r => proItem == r)) {
                    found = true;
                }
            }
            if (typeof proItem != "undefined" && found == true) {
                matchProductId++;
            } else { 
                notmatchProductId++;
            }
        })
    }else if(csDatemodiWhen == 1 || csDatemodiWhen == 4){
        cartProductVendor = csDatemodiWhenVal.split(',');
        csJq(csCartContent.items).each(function(index, proItem) {
            id_item = csCartContent.items[index].id.toString();
            proItem = value_get[id_item];
            var found = false; 
            if(operator == 0 || operator == 1 ){
                found =  cartProductVendor.some(r => proItem.includes(r));
            }else{
                csJq(proItem).each(function(index, val) {
                    if (cartProductVendor.some(r => val.indexOf(r) > -1)) {
                        found = true; return false; 
                    }
                });
            }
            if (typeof proItem != "undefined" && found == true) {
                matchProductId++;
            } else {
                notmatchProductId++;
            }
        })
    }else if(csDatemodiWhen == 3){
        var propdetail = '';
        cartProductVendor = csDatemodiWhenVal.split(',');
        csJq(csProductPropArr).each(function (index, proparr) {
            csJq(proparr).each(function (index, propitem) {
                propdetail += propitem;
                propdetail += ',';
            });
        });
        propdetail = propdetail.split(',').filter(onlyUnique); 
        csJq(propdetail).each(function(index, proItem) {
            if (typeof proItem != "undefined" && proItem != '' && cartProductVendor.some(r => proItem == r) == true) {
                matchProductId++;
            } else if( proItem != ''){ 
                notmatchProductId++;
            }
        });
    }
    switch (operator) {  
        case 0: if(matchProductId != 0  && operator == 0) ruleConditionMatchOperator = true; // equal 
        break;
        case 1: if(matchProductId <= 0 && operator == 1) ruleConditionMatchOperator = true; // not equal 
        break;
        case 2: if(matchProductId != 0 && operator == 2) ruleConditionMatchOperator = true;
        break;
        case 5: if(matchProductId != 0 && operator == 5) ruleConditionMatchOperator = true;// contains
        break;
        case 6: if(matchProductId <= 0  && operator == 6) ruleConditionMatchOperator = true;// does not contains
        break;
        case 7: if(notmatchProductId == 0 && matchProductId != 0 && operator == 7) ruleConditionMatchOperator = true;// contains all
        break;
        case 8: if(notmatchProductId != 0 && matchProductId == 0 && operator == 8) ruleConditionMatchOperator = true;// does not contains all
        break;
    }
    return ruleConditionMatchOperator;
}
function csDatemodiType1(ruleConditionMatch,csDatemodiType,datemodifierdata){
    if(ruleConditionMatch){
       datearray['modiminday'] ='',datearray['modimaxday'] ='',datearray['modienabledate'] ='',datearray['modidisabledate'] ='',datearray['modicuttime'] ='',datearray['modienableday'] ='',datearray['modidisableday'] ='',datearray['tp'] ='',datearray['moditimeslot'] ='',datearray['modienabledatenew'] ='',datearray['modiremovedelivery']='',datearray['modiaddtimeslot']='',datearray['modiupdatetimeslot']='';
        switch (ruleConditionMatch) {
            case csDatemodiType == 0:
                allmodidata['modiminday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 1:
                allmodidata['modimaxday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 2:
                allmodidata['modienabledate'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 3:
                allmodidata['modidisabledate']  = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 4:
                allmodidata['modicuttime'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 5:
                allmodidata['modienableday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 6:
                allmodidata['modidisableday'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 7:
                allmodidata['tp']  = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 8:
                allmodidata['moditimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 9:
                allmodidata['modienabledatenew'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 10:
                allmodidata['modiremovedelivery'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 11:
                allmodidata['modiaddtimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
            case csDatemodiType == 12:
                allmodidata['modiupdatetimeslot'] = datemodifierdata['date_modifier_type_value'];
            break;
        }
    }
    return  allmodidata;
}
  
function modifyDate(dateText, final_modi, csCurrentDate,dateText1, csDeliverySetting, zipcode, location){
  var hasSeleDate = false;
  if (final_modi.length) {
    csJq.each(final_modi, function(i, v) {
        if(typeof v.selected_date != 'undefined'){
            if((v.selected_date.csDatemodiWhenVal).indexOf(dateText1) >= 0 && v.selected_date.csDatemodiWhenOpe == 0){
                hasSeleDate = true;
            }else if((v.selected_date.csDatemodiWhenVal).indexOf(dateText1) < 0 && v.selected_date.csDatemodiWhenOpe == 1){
                hasSeleDate = true;
            }else{
                var modidates = (v.selected_date.csDatemodiWhenVal).split(',');
                csJq(modidates).each(function(csIndex, date) {
                    var date = csYmdDateFormate(result_data.generalSettingData.gen_date_format,date);
                    if(new Date(dateText1).getTime() >= new Date(date).getTime() && v.selected_date.csDatemodiWhenOpe == 2){
                        if(hasSeleDate == false){
                            hasSeleDate = true;
                        }else{
                            return false
                        }
                    }else if(new Date(dateText1).getTime() <= new Date(date).getTime() && v.selected_date.csDatemodiWhenOpe == 3){
                        if(hasSeleDate == false){
                            hasSeleDate = true;
                        }else{
                            return false
                        }
                    }
                });
            }
        }else if(typeof v.selected_day != 'undefined'){
            if(new Date(dateText1).getDay() == parseInt(v.selected_day.csDatemodiWhenVal) && v.selected_day.csDatemodiWhenOpe == 0){
                hasSeleDate = true;
            }
            if(new Date(dateText1).getDay() != parseInt(v.selected_day.csDatemodiWhenVal) && v.selected_day.csDatemodiWhenOpe == 1){
                hasSeleDate = true;
            }
            if(new Date(dateText1).getDay() >= parseInt(v.selected_day.csDatemodiWhenVal) && v.selected_day.csDatemodiWhenOpe == 2){
                hasSeleDate = true;
            }
            if(new Date(dateText1).getDay() <= parseInt(v.selected_day.csDatemodiWhenVal) && v.selected_day.csDatemodiWhenOpe == 3){
                hasSeleDate = true;
            }
        }else if(typeof v.current_date != 'undefined'){

          
            if(new Date(dateText1).getTime() ==  new Date(csCurrentDate).getTime()){
                if((v.current_date.csDatemodiWhenVal).indexOf(dateText1) >= 0 && v.current_date.csDatemodiWhenOpe == 0){
                    hasSeleDate = true;
                }else if((v.current_date.csDatemodiWhenVal).indexOf(dateText1) < 0 && v.current_date.csDatemodiWhenOpe == 1){
                    hasSeleDate = true;
                }else{
                    var modidates = (v.current_date.csDatemodiWhenVal).split(',');
                    csJq(modidates).each(function(csIndex, date) {
                        var date = csYmdDateFormate(result_data.generalSettingData.gen_date_format,date);
                        if(new Date(dateText1).getTime() >= new Date(date).getTime() && v.current_date.csDatemodiWhenOpe == 2){
                            if(hasSeleDate == false){
                                hasSeleDate = true;
                            }else{
                                return false
                            }
                        }else if(new Date(dateText1).getTime() <= new Date(date).getTime() && v.current_date.csDatemodiWhenOpe == 3){
                            if(hasSeleDate == false){
                                hasSeleDate = true;
                            }else{
                                return false
                            }
                        }
                    });
                }
            }
        }else if(typeof v.current_day != 'undefined'){
            if(new Date(dateText1).getDay() ==  new Date(csCurrentDate).getDay() && new Date(dateText1).getTime() ==  new Date(csCurrentDate).getTime()){
                if(new Date(dateText1).getDay() == parseInt(v.current_day.csDatemodiWhenVal) && v.current_day.csDatemodiWhenOpe == 0){
                    hasSeleDate = true;
                }
                if(new Date(dateText1).getDay() != parseInt(v.current_day.csDatemodiWhenVal) && v.current_day.csDatemodiWhenOpe == 1){
                    hasSeleDate = true;
                }
                if(new Date(dateText1).getDay() >= parseInt(v.current_day.csDatemodiWhenVal) && v.current_day.csDatemodiWhenOpe == 2){
                    hasSeleDate = true;
                }
                if(new Date(dateText1).getDay() <= parseInt(v.current_day.csDatemodiWhenVal) && v.current_day.csDatemodiWhenOpe == 3){
                    hasSeleDate = true;
                }
            }
        }else if(typeof v.current_time != 'undefined'){
              var currentTimeBase = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(csDeliverySetting.current_time) : csDeliverySetting.current_time,
              currentDateTime = dateText1 + ' ' + currentTimeBase,
              oldCurrentDate = new Date(currentDateTime),
              cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
              cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
              if(cutOffTimeBase.getTime() == oldCurrentDate.getTime() && v.current_time.csDatemodiWhenOpe == 0){
                  hasSeleDate = true;
              }
              if(cutOffTimeBase.getTime() != oldCurrentDate.getTime() && v.current_time.csDatemodiWhenOpe == 1){
                  hasSeleDate = true;
              }
              if(cutOffTimeBase.getTime() <= oldCurrentDate.getTime() && v.current_time.csDatemodiWhenOpe == 2){
                  hasSeleDate = true;
              }
              if(cutOffTimeBase.getTime() >= oldCurrentDate.getTime() && v.current_time.csDatemodiWhenOpe == 3){
                  hasSeleDate = true;
              }
        }else if(typeof v.x_day != 'undefined'){
          var oldCurrentDate = new Date(dateText1),
          updatedDate = new Date(new Date(csCurrentDate).setDate(new Date(csCurrentDate).getDate() + parseInt(v.x_day['csDatemodiWhenVal'])));
          if(updatedDate.getTime() == oldCurrentDate.getTime() && v.x_day.csDatemodiWhenOpe == 0){
              hasSeleDate = true;
          }
          if(updatedDate.getTime() != oldCurrentDate.getTime() && v.x_day.csDatemodiWhenOpe == 1){
              hasSeleDate = true;
          }
          if(updatedDate.getTime() <= oldCurrentDate.getTime() && v.x_day.csDatemodiWhenOpe == 2){
              hasSeleDate = true;
          }
          if(updatedDate.getTime() >= oldCurrentDate.getTime() && v.x_day.csDatemodiWhenOpe == 3){
              hasSeleDate = true;
          }
        }else if(typeof v.zipcode != 'undefined'){
          var csPostalCode1 = csJq("#postal_code").val();
          if (csPostalCode1 != '' && csPostalCode1 != undefined) {
            var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
          }
          var getzip = false;
          var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
          if (v.zipcode['csDatemodiWhenOpe'] == 0) {
            if (location.deliverySettingData.zip_code_status == 0) {
              if (getzip) {
                hasSeleDate = true;
              }
            } else {
              if (getzip == false) {
                hasSeleDate = true;
              };
            }
          } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
            if (location.deliverySettingData.zip_code_status == 0) {
              if (getzip == false) {
                hasSeleDate = true;
              }
            } else {
              if (getzip) {
                hasSeleDate = true;
              };
            }
          }
        }
        if(hasSeleDate) return false;
      });
  }
  return hasSeleDate
}
function csDateAndTimePicker(csGetData, ordertype, zipcode, location) {
    csShopData = csGetData;
    if (typeof csJq.fn.datepicker != "undefined") {
        var csDeliverySetting = csGetData,
            currentTimeBase = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(csDeliverySetting.current_time) : csDeliverySetting.current_time,
            currentDateTime = csDeliverySetting.current_date + ' ' + currentTimeBase,
            oldCurrentDate = new Date(currentDateTime),
            final_modi = csDeliverySetting.date_modifier_json != null ? csDateModify(JSON.parse(csDeliverySetting.date_modifier_json)) : '',
            get_final_modi = final_modi.length > 0 ? final_modi.filter(function(v, i) {
              if (typeof v.selected_date != 'undefined') {
                return v.selected_date['csDatemodiWhenVal'].indexOf(csDeliverySetting.current_date) > -1;
              } else if (typeof v.selected_day != 'undefined') {
                return v.selected_day['csDatemodiWhenVal'] == new Date(csDeliverySetting.current_date).getDay();
              } else if (typeof v.current_date != 'undefined') {
                return v.current_date['csDatemodiWhenVal'].indexOf(csDeliverySetting.current_date) > -1;
              } else if (typeof v.current_day != 'undefined') {
                return v.current_day['csDatemodiWhenVal'] == new Date(csDeliverySetting.current_date).getDay();
              } else if (typeof v.current_time != 'undefined') {
                var cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
                cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
                if (v.current_time['csDatemodiWhenOpe'] == 0) {
                  return cutOffTimeBase.getTime() == oldCurrentDate.getTime();
                } else if (v.current_time['csDatemodiWhenOpe'] == 1) {
                  return cutOffTimeBase.getTime() != oldCurrentDate.getTime();
                } else if (v.current_time['csDatemodiWhenOpe'] == 2) {
                  return cutOffTimeBase.getTime() <= oldCurrentDate.getTime();
                } else if (v.current_time['csDatemodiWhenOpe'] == 3) {
                  return cutOffTimeBase.getTime() >= oldCurrentDate.getTime();
                };
              }
            })[0] : '',
            get_final_modi = typeof get_final_modi == 'undefined' ? get_final_modi = final_modi.filter(function(v, i) {return i == final_modi.length - 1;})[0] : get_final_modi,        
            csGeneralSetting = result_data.generalSettingData,
            csFullDaysArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            csDaysArr = csGeneralSetting.gen_days_text.split(","),
            csDaysArrNew = [],
            csMonthsArr = csGeneralSetting.gen_months_text.split(","),
            csNextPervArr = csGeneralSetting.gen_next_previous_text.split(","),
            csGenHideAdditionalCheckoutButton = parseInt(csGeneralSetting.gen_hide_additional_checkout_button),
            csDateFormat = csGeneralSetting.gen_date_format,
            csTimeFormat = "hh:ii aa",
            csFirstDay = parseInt(csDeliverySetting.first_day_calender),
            csCurrentDate = new Date(csDeliverySetting.current_date),
            csCurrentTime = csDeliverySetting.current_time,
            csTimeSettingStatus = parseInt(csDeliverySetting.time_status),
            csTimeSettingStatus = csGeneralSetting.gen_hide_front_time_slot == 1 ? 0 : csTimeSettingStatus,
            csTimeSettingStatus = typeof get_final_modi.tp != "undefined" ? get_final_modi.tp : csTimeSettingStatus,
            date_availability = ordertype == "localdelivery" ? csDeliverySetting.delivery_date_availability :  ordertype == "storepickup" ? csDeliverySetting.pickup_date_availability: csDeliverySetting.shipping_date_availability, 
            csDisabled_days = ordertype == "localdelivery" ? csDeliverySetting.disable_delivery_date :  ordertype == "storepickup" ? csDeliverySetting.disable_pickup_date : csDeliverySetting.disable_shipping_date, // Disable Particular Date like ["06/10/2021", "06/14/2021", "06/16/2021", "06/22/2021"],
            getDisableModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { 
              if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modidisabledate'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modidisabledate'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modidisabledate'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modidisabledate'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modidisabledate != 'undefined'; 
              }
            }) : [],
            getDisableModiArray = [],
            getDisableModiArrayValue = getDisableModi.length > 0 ? getDisableModi.forEach((val) => {
              if (typeof val.zipcode != 'undefined') {
                getDisableModiArray.push(val.zipcode["modidisabledate"])
              } else {
                getDisableModiArray.push(val.modidisabledate); 
              }
            }) : getDisableModiArray,
            disabledArray = getDisableModiArray.length > 1 ? getDisableModiArray.map(item => item).join(',') : getDisableModiArray.length > 0 && typeof getDisableModiArray[0] != 'undefined'? getDisableModiArray[0] : disabledArray,
            csmodidisabledate = typeof disabledArray != 'undefined' ? (disabledArray).split(',').filter((value, index, self) => self.indexOf(value) === index) : [],
            csenabled_days = ordertype == "localdelivery" ? csDeliverySetting.enable_delivery_date :  ordertype == "storepickup" ? csDeliverySetting.enable_pickup_date : csDeliverySetting.enable_shipping_date, 
            getEnableModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { 
              if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modienabledate'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modienabledate'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modienabledate'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modienabledate'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modienabledate != 'undefined'; 
              }
            }) : [],
            getEnableModiArray = [],
            getEnableModiArrayValue = getEnableModi.length > 0 ? getEnableModi.forEach((val) => {
              if (typeof val.zipcode != 'undefined') {
                getEnableModiArray.push(val.zipcode["modienabledate"])
              } else {
                getEnableModiArray.push(val.modienabledate); 
              }
            }) : getEnableModiArray,
            enabledArray = getEnableModiArray.length > 1 ? getEnableModiArray.map(item => item).join(',') : getEnableModiArray.length > 0 && typeof getEnableModiArray[0] != 'undefined'? getEnableModiArray[0] : enabledArray,
            csmodienabledate =  typeof enabledArray != 'undefined' ? (enabledArray).split(',').filter((value, index, self) => self.indexOf(value) === index) : [],
            getEnableNewModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { 
              if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modienabledatenew'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modienabledatenew'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modienabledatenew'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modienabledatenew'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modienabledatenew != 'undefined'; 
              }
            }) : [],
            getEnableNewModiArray = [],
            getEnableNewModiArrayValue = getEnableNewModi.length > 0 ? getEnableNewModi.forEach((val) => {
              if (typeof val.zipcode != 'undefined') {
                getEnableNewModiArray.push(val.zipcode["modienabledatenew"])
              } else {
                getEnableNewModiArray.push(val.modienabledatenew); 
              }
            }) : getEnableNewModiArray,
            enabledNewArray = getEnableNewModiArray.length > 1 ? getEnableNewModiArray.map(item => item).join(',') : getEnableNewModiArray.length > 0 && typeof getEnableNewModiArray[0] != 'undefined'? getEnableNewModiArray[0] : enabledNewArray,
            csmodienabledatenew =  typeof enabledNewArray != 'undefined' ? (enabledNewArray).split(',').filter((value, index, self) => self.indexOf(value) === index) : [],
            csDisabledDays = ordertype == "localdelivery" ? csDeliverySetting.delivery_day : ordertype == "storepickup" ? csDeliverySetting.pickup_day : csDeliverySetting.shipping_day, // disable every sunday day or any other day like [0,6] sunday and saturday
            csenableweek =  ordertype == "localdelivery" ? csDeliverySetting.delivery_week : ordertype == "storepickup" ? csDeliverySetting.pickup_week : csDeliverySetting.shipping_week, 
            csenableweek = csenableweek == null ? '1,2,3,4,5,6' : csenableweek,
            disable_limit_per_day = csDeliverySetting.disable_limit_per_day,
            cut_off_date = csDeliverySetting.cut_off_date,
            // cut_off_date = result_data.generalSettingData.gen_working_day_setting == 2 ? [] : csDeliverySetting.cut_off_date,
            minimum_interval_day = ordertype == "localdelivery" ? csDeliverySetting.minimum_delivery_interval_day != null?csDeliverySetting.minimum_delivery_interval_day:0 : ordertype == "storepickup" ? csDeliverySetting.minimum_pickup_interval_day != null? csDeliverySetting.minimum_pickup_interval_day:0 : csDeliverySetting.minimum_shipping_interval_day != null? csDeliverySetting.minimum_shipping_interval_day:0,
            minimum_interval_day = (window.setMaxDays) ? window.setMaxDays : minimum_interval_day,
            getMinModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { 
              if (typeof v.current_date != 'undefined') {
                return v.current_date['csDatemodiWhenVal'].indexOf(csDeliverySetting.current_date) > -1 && typeof v.current_date['modiminday'] != 'undefined';
              } else if (typeof v.current_day != 'undefined') {
                return v.current_day['csDatemodiWhenVal'] == new Date(csDeliverySetting.current_date).getDay() && typeof v.current_day['modiminday'] != 'undefined';
              } else if (typeof v.current_time != 'undefined') {
                var cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
                cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
                if (v.current_time['csDatemodiWhenOpe'] == 0) {
                  return cutOffTimeBase.getTime() == oldCurrentDate.getTime() && typeof v.current_time['modiminday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 1) {
                  return cutOffTimeBase.getTime() != oldCurrentDate.getTime() && typeof v.current_time['modiminday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 2) {
                  return cutOffTimeBase.getTime() <= oldCurrentDate.getTime() && typeof v.current_time['modiminday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 3) {
                  return cutOffTimeBase.getTime() >= oldCurrentDate.getTime() && typeof v.current_time['modiminday'] != 'undefined';
                }
              } else if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modiminday'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modiminday'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modiminday'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modiminday'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modiminday != 'undefined'; 
              }
            }) : [],
            getMinModiArray = [],
            getMinModiArrayValue = getMinModi.length > 0 ? getMinModi.forEach((val) => {
              if (typeof val.current_date != 'undefined') {
                getMinModiArray.push(val.current_date["modiminday"])
              } else if (typeof val.current_day != 'undefined') {
                getMinModiArray.push(val.current_day["modiminday"])
              } else if (typeof val.current_time != 'undefined') {
                getMinModiArray.push(val.current_time["modiminday"])
              } else if (typeof val.zipcode != 'undefined') {
                getMinModiArray.push(val.zipcode["modiminday"])
              } else {
                getMinModiArray.push(val.modiminday); 
              }
            }) : getMinModiArray,             
            getMinDay = getMinModiArray.length > 1 ? !isNaN(Math.max(...getMinModiArray.map(item => item))) ? Math.max(...getMinModiArray.map(item => item)) : getMinModiArray[getMinModiArray.length -1] : getMinModiArray.length > 0 && typeof getMinModiArray[0] != 'undefined' ? getMinModiArray[0] : getMinDay,
            minimum_interval_day = typeof getMinDay != 'undefined' ? parseInt(getMinDay) : minimum_interval_day,
            maximum_day = ordertype == "localdelivery" ? csDeliverySetting.maximum_delivery_day != null ? csDeliverySetting.maximum_delivery_day : 0 :  ordertype == "storepickup" ? csDeliverySetting.maximum_pickup_day != null ? csDeliverySetting.maximum_pickup_day:0 :  csDeliverySetting.maximum_shipping_day != null ? csDeliverySetting.maximum_shipping_day : 0,
            getMaxModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { 
              if (typeof v.current_date != 'undefined') {
                return v.current_date['csDatemodiWhenVal'].indexOf(csDeliverySetting.current_date) > -1 && typeof v.current_date['modimaxday'] != 'undefined';
              } else if (typeof v.current_day != 'undefined') {
                return v.current_day['csDatemodiWhenVal'] == new Date(csDeliverySetting.current_date).getDay() && typeof v.current_day['modimaxday'] != 'undefined';
              } else if (typeof v.current_time != 'undefined') {
                var cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
                cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
                if (v.current_time['csDatemodiWhenOpe'] == 0) {
                  return cutOffTimeBase.getTime() == oldCurrentDate.getTime() && typeof v.current_time['modimaxday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 1) {
                  return cutOffTimeBase.getTime() != oldCurrentDate.getTime() && typeof v.current_time['modimaxday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 2) {
                  return cutOffTimeBase.getTime() <= oldCurrentDate.getTime() && typeof v.current_time['modimaxday'] != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 3) {
                  return cutOffTimeBase.getTime() >= oldCurrentDate.getTime() && typeof v.current_time['modimaxday'] != 'undefined';
                }
              } else if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modimaxday'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modimaxday'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modimaxday'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modimaxday'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modimaxday != 'undefined'; 
              }
            }) : [],
            getMaxModiArray = [],
            getMaxModiArrayValue = getMaxModi.length > 0 ? getMaxModi.forEach((val) => {
              if (typeof val.current_date != 'undefined') {
                getMaxModiArray.push(val.current_date["modimaxday"])
              } else if (typeof val.current_day != 'undefined') {
                getMaxModiArray.push(val.current_day["modimaxday"])
              } else if (typeof val.current_time != 'undefined') {
                getMaxModiArray.push(val.current_time["modimaxday"])
              } else if (typeof val.zipcode != 'undefined') {
                getMaxModiArray.push(val.zipcode["modimaxday"])
              } else {
                getMaxModiArray.push(val.modimaxday); 
              }
            }) : getMaxModiArray,
            getMaxDay = getMaxModiArray.length > 1 ? !isNaN(Math.max(...getMaxModiArray.map(item => item))) ? Math.max(...getMaxModiArray.map(item => item)) : getMaxModiArray[getMaxModiArray.length -1] : getMaxModiArray.length > 0 && typeof getMaxModiArray[0] != 'undefined' ? getMaxModiArray[0] : getMaxDay,
            maximum_day = typeof getMaxDay != 'undefined' ? parseInt(getMaxDay) == 1 ? parseInt(getMaxDay) : parseInt(getMaxDay) - 1 : maximum_day == 1 ? maximum_day : maximum_day - 1,
            csMinDate = parseInt(minimum_interval_day) > 0 ? new Date(new Date(csCurrentDate).getTime() + minimum_interval_day * 24 * 60 * 60 * 1000) : csCurrentDate,
            csMaxDate = parseInt(maximum_day) > 0 ? getMinModi.length > 0 && getMaxModi.length > 0 ? new Date(new Date(csCurrentDate).getTime() + maximum_day * 24 * 60 * 60 * 1000) : new Date(new Date(csMinDate).getTime() + maximum_day * 24 * 60 * 60 * 1000) : "",
            csDatepicker = ordertype == "localdelivery" ? "#csDatepicker" :  ordertype == "storepickup" ?"#csDatepicker1" : "#csShippingpicker",
            csTimepicker = ordertype == "localdelivery" ? "#csTimePicker":  ordertype == "storepickup" ? "#csTimePicker1" : "#csTimeShippingPicker",
            csDayValue = ordertype == "localdelivery" ? csDelvDayVal :  ordertype == "storepickup" ? csPickDayVal : "#csShippingDayValue",
            csDateValue = ordertype == "localdelivery" ? csDelvDateVal :  ordertype == "storepickup" ?  csPickDateVal : "#csShippingDateValue",
            csTimeValue = ordertype == "localdelivery" ? csDelvTimeVal :  ordertype == "storepickup" ? "#csPickupTimeValue" : "#csShippingTimeValue",
            csGeneralcutoftime = ordertype == "localdelivery" && csGeneralSetting.gen_local_delivery_cut_off != null ? csGeneralSetting.gen_local_delivery_cut_off[csCurrentDate.getDay()] :  ordertype == "storepickup" && csGeneralSetting.gen_local_delivery_cut_off != null  ? csGeneralSetting.gen_store_pickup_cut_off[csCurrentDate.getDay()] :  ordertype == "shipping" && csGeneralSetting.gen_local_delivery_cut_off != null  ? csGeneralSetting.gen_shipping_delivery_date_cut_off[csCurrentDate.getDay()] : '',
            cut_off_time = csDeliverySetting.active_cut_off == 1 ? csDeliverySetting.cut_off_time : csGeneralcutoftime != '' && csGeneralcutoftime != null && csGeneralcutoftime != "undefined" ? csGeneralcutoftime : '',          
            getCutoffModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { return typeof v.modicuttime != 'undefined'; }) : [],
            getCutoffTime = getCutoffModi.length > 1 ? getCutoffModi.reduce((min, current) => {return current.modicuttime < min.modicuttime ? current : min;}, getCutoffModi[0]).modicuttime : getCutoffModi.length > 0 && typeof getCutoffModi[0].modicuttime != 'undefined' ? getCutoffModi[0].modicuttime : getCutoffTime,
            cut_off_time = typeof getCutoffTime != 'undefined' ? getCutoffTime : cut_off_time,
            gen_disable_holidays =  csGeneralSetting.gen_disable_holidays != null  ? csGeneralSetting.gen_disable_holidays.split(',') : "",
            calPosition = (window.calPosition) ? window.calPosition : 'top left',
            csTimePickerVal = ordertype == "localdelivery" ? "#csTimePickerVal" : ordertype == "storepickup" ? "#csTimePickerVal1" : "#csTimeShippingVal",
            getCCutoffModi = final_modi.length > 0 ? final_modi.filter(function(v, i) {
              if (typeof v.current_date != "undefined") {
                return typeof v.current_date.modicuttime != 'undefined';
              } else if (typeof v.current_day != "undefined") {
                return typeof v.current_day.modicuttime != 'undefined'; 
              } else if (typeof v.current_time != "undefined") {
                var cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
                cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
                if (v.current_time['csDatemodiWhenOpe'] == 0) {
                  return cutOffTimeBase.getTime() == oldCurrentDate.getTime() && typeof v.current_time.modicuttime != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 1) {
                  return cutOffTimeBase.getTime() != oldCurrentDate.getTime() && typeof v.current_time.modicuttime != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 2) {
                  return cutOffTimeBase.getTime() <= oldCurrentDate.getTime() && typeof v.current_time.modicuttime != 'undefined';
                } else if (v.current_time['csDatemodiWhenOpe'] == 3) {
                  return cutOffTimeBase.getTime() >= oldCurrentDate.getTime() && typeof v.current_time.modicuttime != 'undefined';
                }
              } else if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modicuttime'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modicuttime'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modicuttime'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modicuttime'] != 'undefined';
                  }
                }
              }
            }) : [],
            getCCutoffTime = getCCutoffModi.length > 1 ? getCCutoffModi.reduce((min, current) => {
              if (typeof current.current_date != "undefined") {
                return current.current_date.modicuttime < current.current_date.modicuttime ? current : min;
              } else if (typeof current.current_day != "undefined") {
                return current.current_day.modicuttime < current.current_day.modicuttime ? current : min;
              } else if (typeof current.current_time != "undefined") {
                return current.current_time.modicuttime < current.current_time.modicuttime ? current : min;
              } else if (typeof current.zipcode != "undefined") {
                return current.zipcode.modicuttime < current.zipcode.modicuttime ? current : min;
              }
            }, getCCutoffModi[0]) : getCCutoffModi.length > 0 ? getCCutoffModi[0] : getCCutoffModi,
            getDeliveryModi = final_modi.length > 0 ? final_modi.filter(function(v, i) {
              if (typeof v.zipcode != 'undefined') {
                return typeof v.zipcode.modiremovedelivery != 'undefined';
              }
            }) : [],
            getDeliveryModiArray = [],
            getDeliveryModiArrayValue = getDeliveryModi.length > 0 ? getDeliveryModi.forEach((val) => {
              if (val.zipcode.csDatemodiWhenVal != '' && val.zipcode.csDatemodiWhenOpe == 0) {
                getDeliveryModiArray.push(val.zipcode.csDatemodiWhenVal); 
              }
            }) : getDeliveryModiArray;
            if (getDeliveryModiArray.length > 0) {
              var zip = getDeliveryModiArray.join(',');
              var showLocalDate = 0;
              var csPostalCode1 = csJq("#postal_code").val();
              if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
              }
              var getzip = false;
              var getDelivery = csCheckProductDeliveryStatus(location.deliverySettingData, cart,"localdelivery");
              var getzip = zipCodeMatch(zip, csPostalCode, location.country_code,location);
              if (getzip && getDelivery && location.deliverySettingData.zip_code_status == 0) {
                showLocalDate++;
              }
              if (getzip == false && getDelivery && location.deliverySettingData.zip_code_status == 1) {
                showLocalDate++;
              }
              if (showLocalDate > 0) {
                csJq("#postal-code-error").html(result_data.generalSettingData.gen_loc_zip_error_message_text).parent().show();
                csJq("#postal-code-error").show();
                csJq("#csDatepicker, #csTimePicker, .time-block").parent().hide().val("");
                csJq("#csDeliveryDateValue,#csDeliveryTimeValue,#csDeliveryDayValue,#csDeliveryZipValue,#csDeliveryLocationValue,#csLocationAddress1,#csPickupDateValue,#csPickupTimeValue,#csPickupDayValue,#csShippingDateValue,#csShippingDayValue").val("");
                if (result_data.generalSettingData.gen_date_time_required == 1 || csJq("#required-error #postal-code-error").length > 0) {
                  csJq(checkout_selectors).attr("disabled", true);
                  csJq('#required-error').hide();    
                  csJq('#csDatepicker').val("");
                }
                return 'no';
              }
            }
            if (csGenHideAdditionalCheckoutButton == 1){
                csJq(".additional-checkout-buttons").hide();
            }
            csJq(csDatepicker).parent().show();
            if(csGeneralSetting.gen_date_time_selection == 0 && ordertype == 'storepickup'){
                csJq(csDatepicker).parent().hide();
                csUpdateCart(0);
                if (csGeneralSetting.gen_date_time_required == 1){
                     csJq(checkout_selectors).attr("disabled", false);
                }
            }
            csDisableDateArray = typeof csDisableDateArray != 'undefined' ? csDisableDateArray : [],
            csModiDisableDateArray = [], csModiEnableDateArray  = [], csModiEnableNewDateArray = [], csDisableLimitPerDay =[], csDisableCutoffDate =[],
            csEnableDateArray = typeof csEnableDateArray != 'undefined' ? csEnableDateArray : [];
            if (csGeneralSetting.gen_disable_holidays != null && csGeneralSetting.gen_disable_holidays != "") {
                csJq(gen_disable_holidays).each(function(csIndex, holiday) {
                    csDisableDate1 = new Date(holiday.replace(/\-/g, "/") + ' ' + csCurrentTime);
                    csDisableDateArray.push(csDateFormatter(csDateFormat, csDisableDate1));
                });
            }
            csJq(csDisabled_days).each(function(csIndex, csDisableDate) {
                csDisableDate1 = new Date(csDisableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csDisableDateArray.push(csDateFormatter(csDateFormat, csDisableDate1));
            });
            csJq(csmodidisabledate).each(function(csIndex, csDisableDate) {
                csDisableDate1 = new Date(csDisableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csModiDisableDateArray.push(csDateFormatter(csDateFormat, csDisableDate1));
            });
            csJq(disable_limit_per_day).each(function(csIndex, csDisableDate) {
                csDisableDate1 = new Date(csDisableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csDisableLimitPerDay.push(csDateFormatter(csDateFormat, csDisableDate1));
            });
            if (getCutoffModi.length == 0 && getCCutoffModi.length == 0) {
                csJq(cut_off_date).each(function(csIndex, csDisableDate) {
                    csDisableDate1 = new Date(csDisableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                    csDisableCutoffDate.push(csDateFormatter(csDateFormat, csDisableDate1));
                });
            }   
            csJq(csenabled_days).each(function(csIndex, csenableDate) {
                csenableDate1 = new Date(csenableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csenableDate = csDateFormatter(csDateFormat, csenableDate1);
                csEnableDateArray.push(csenableDate);
            });
            csJq(csmodienabledate).each(function(csIndex, csenableDate) {
                csenableDate1 = new Date(csenableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csenableDate = csDateFormatter(csDateFormat, csenableDate1);
                csModiEnableDateArray.push(csenableDate);
                csEnableDateArray.push(csenableDate);
            });
            csJq(csmodienabledatenew).each(function(csIndex, csenableDate) {
                csenableDate1 = new Date(csenableDate.replace(/\-/g, "/") + ' ' + csCurrentTime);
                csenableDate = csDateFormatter(csDateFormat, csenableDate1);
                csModiEnableNewDateArray.push(csenableDate);
            });
            if(csDisableDateArray.length != 0 && csModiEnableDateArray.length != 0){
                csJq(csModiEnableDateArray).each(function(index,cseabledate){
                    var index = csDisableDateArray.indexOf(cseabledate);
                    if (index > -1) {
                        csDisableDateArray.splice(index, 1);
                    }
                })
            }
            var getEnableDayModi = final_modi.length > 0 ? final_modi.filter(function(v, i) {
              if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modienableday'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modienableday'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modienableday'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modienableday'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modienableday != 'undefined'; 
              }
            }) : [];
            var getEnableDayArray = [];
            var getEnableDayArrayValue = getEnableDayModi.length > 0 ? getEnableDayModi.forEach((val) => {
              if (typeof val.zipcode != 'undefined') {
                getEnableDayArray.push(val.zipcode["modienableday"])
              } else {
                getEnableDayArray.push(val.modienableday); 
              }
            }) : getEnableDayArray;
            var getDisableDayModi = final_modi.length > 0 ? final_modi.filter(function(v, i) { return typeof v.modidisableday != 'undefined'; }) : [];
            var getDisableDayModi = final_modi.length > 0 ? final_modi.filter(function(v, i) {
              if (typeof v.zipcode != 'undefined') {
                var csPostalCode1 = csJq("#postal_code").val();
                if (csPostalCode1 != '' && csPostalCode1 != undefined) {
                  var csPostalCode = csPostalCode1.replace(/-|\s/g,"");
                }
                var getzip = false;
                var getzip = zipCodeMatch(v.zipcode['csDatemodiWhenVal'], csPostalCode, location.country_code, location);
                if (v.zipcode['csDatemodiWhenOpe'] == 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip && typeof v.zipcode['modidisableday'] != 'undefined';
                  } else {
                    return getzip == false && typeof v.zipcode['modidisableday'] != 'undefined';
                  }
                } else if (v.zipcode['csDatemodiWhenOpe'] != 0) {
                  if (location.deliverySettingData.zip_code_status == 0) {
                    return getzip == false && typeof v.zipcode['modidisableday'] != 'undefined';
                  } else {
                    return getzip && typeof v.zipcode['modidisableday'] != 'undefined';
                  }
                }
              } else {
                return typeof v.modidisableday != 'undefined'; 
              }
            }) : [];
            var getDisableDayArray = [];
            var getDisableDayArrayValue = getDisableDayModi.length > 0 ? getDisableDayModi.forEach((val) => {
              if (typeof val.zipcode != 'undefined') {
                getDisableDayArray.push(val.zipcode["modidisableday"])
              } else {
                getDisableDayArray.push(val.modidisableday); 
              }
            }) : getDisableDayArray;
            var enabledDayArray = getEnableDayArray.length > 1 ? getEnableDayArray.map(item => item).join(',') : getEnableDayArray.length > 0 && typeof getEnableDayArray[0] != 'undefined'? getEnableDayArray[0] : enabledDayArray;
            var disabledDayArray = getDisableDayArray.length > 1 ? getDisableDayArray.map(item => item).join(',') : getDisableDayArray.length > 0 && typeof getDisableDayArray[0] != 'undefined'? getDisableDayArray[0] : disabledDayArray;
            // var enabledDayArray = getEnableDayModi.length > 0 && getDisableDayModi.length > 0 ? get_final_modi.modienableday : getEnableDayModi.length > 1 ? getEnableDayModi.map(item => item.modienableday).join(',') : getEnableDayModi.length > 0 && typeof getEnableDayModi[0].modienableday != 'undefined'? getEnableDayModi[0].modienableday : typeof get_final_modi.modienableday != 'undefined' ? get_final_modi.modienableday : enabledDayArray;
            // var disabledDayArray = getEnableDayModi.length > 0 && getDisableDayModi.length > 0 ? get_final_modi.modidisableday : getDisableDayModi.length > 1 ? getDisableDayModi.map(item => item.modidisableday).join(',') : getDisableDayModi.length > 0 && typeof getDisableDayModi[0].modidisableday != 'undefined'? getDisableDayModi[0].modidisableday : typeof get_final_modi.modidisableday != 'undefined' ? get_final_modi.modidisableday : disabledDayArray;
            csDisabledDays =  typeof enabledDayArray != 'undefined' ? enabledDayArray+','+ csDisabledDays : csDisabledDays;
            var cutoffdate = csMinDate;
            var weekDayArr = csDisabledDays == null || csDisabledDays == 'all' ? "0,1,2,3,4,5,6".split(',') : csDisabledDays.split(',');
            weekDayArr = weekDayArr.filter(onlyUnique)
            if (typeof disabledDayArray != 'undefined') {
              modidisableday = (disabledDayArray).split(',')
              csJq(modidisableday).each(function (csIndex, day) {
                weekDayArr.splice(weekDayArr.indexOf(day), 1);
              })
              csDisabledDays = weekDayArr.toString()
            }
            hasSeleDate =  modifyDate(csDateFormatter(csDateFormat, csCurrentDate), final_modi, csCurrentDate, csDeliverySetting.current_date, csDeliverySetting, zipcode, location);
            if(hasSeleDate){
                if(typeof getCCutoffTime.current_date != "undefined"){
                    cut_off_time = typeof getCCutoffTime.current_date.modicuttime != "undefined" ? getCCutoffTime.current_date.modicuttime : cut_off_time;
                } else if(typeof getCCutoffTime.current_day != "undefined"){
                    cut_off_time = typeof getCCutoffTime.current_day.modicuttime != "undefined" ? getCCutoffTime.current_day.modicuttime : cut_off_time;
                } else if(typeof getCCutoffTime.current_time != "undefined"){
                    cut_off_time = typeof getCCutoffTime.current_time.modicuttime != "undefined" ? getCCutoffTime.current_time.modicuttime : cut_off_time;
                } else if(typeof getCCutoffTime.zipcode != "undefined"){
                    cut_off_time = typeof getCCutoffTime.zipcode.modicuttime != "undefined" ? getCCutoffTime.zipcode.modicuttime : cut_off_time;
                }
            }
            csMinDate = dateBetweenWorkingDays(weekDayArr, csDisableDateArray, csDeliverySetting.current_date, csDeliverySetting.current_time, minimum_interval_day, cut_off_time,cutoffdate);
            csJq(csDaysArr).each(function (csIndex, csDays) {
                if(csDays.includes('|')){
                    csDays = csDays.split("|");
                    csDays = csDays[0]
                }
                csDaysArrNew.push(csDays);
            })
            csJq(csDatepicker).datepicker({
                language: {
                    days: csDaysArrNew,
                    daysShort: csDaysArrNew,
                    daysMin: csDaysArrNew,
                    months: csMonthsArr,
                    monthsShort: csMonthsArr,
                    today: "Today",
                    clear: "Clear",
                    dateFormat: csDateFormat,
                    timeFormat: csTimeFormat,
                    firstDay: csFirstDay,
                },
                position: calPosition,
                minDate: csMinDate,
                maxDate: csMaxDate,
                prevText: csNextPervArr[0],
                nextText: csNextPervArr[1],
                autoClose: true,
                onRenderCell: function(csDate, csCellType) {
                    var disabled = false, fulldate = '', attrText = '' ;
                    if (csCellType == "day") {
                        var csDay = csDate.getDay();
                        if (disabled != true) {
                            csPrettyDate = csDateFormatter(csDateFormat, csDate);
                            var firstDayOfMonth = new Date(csDate.getFullYear(), csDate.getMonth(), 1 - csFirstDay);
                            var daysInFirstWeek = 7 - firstDayOfMonth.getDay();
                            var dayOfMonth = csDate.getDate();
                            var weekOfMonth = Math.ceil((dayOfMonth - daysInFirstWeek) / 7) + 1;
                            if ((csDisabledDays != "all" && csDisabledDays.indexOf(csDay) == -1 && csModiEnableDateArray.indexOf(csPrettyDate) == -1 && csModiEnableNewDateArray.indexOf(csPrettyDate) <= -1) || (csModiDisableDateArray.indexOf(csPrettyDate) != -1 && csModiEnableNewDateArray.indexOf(csPrettyDate) <= -1) || (csDisableDateArray.indexOf(csPrettyDate) != -1 && csenabled_days.length == 0 && csModiEnableNewDateArray.indexOf(csPrettyDate) <= -1) || (csDisableCutoffDate.indexOf(csPrettyDate) != -1 )) {
                                disabled = true;
                                fulldate = 'cs-disable-limit-per-day',
                                attrText = window.hasAddFullText == true && window.AddFullText == '' ? 'full' : window.AddFullText != '' ? window.AddFullText : '';
                            }
                            if(csDisableLimitPerDay.indexOf(csPrettyDate) != -1){
                              disabled = true;
                              fulldate = 'cs-disable-limit-per-day',
                              attrText = window.hasAddFullText == true && window.AddFullText == '' ? 'full' : window.AddFullText != '' ? window.AddFullText : '';
                            }
                            if ((csEnableDateArray.indexOf(csPrettyDate) <= -1 && date_availability == 1 && csenabled_days.length != 0 && csModiEnableNewDateArray.indexOf(csPrettyDate) <= -1) || (csModiEnableDateArray.length != 0 && csModiEnableDateArray.indexOf(csPrettyDate) <= -1 && csModiEnableNewDateArray.indexOf(csPrettyDate) <= -1)) {
                                disabled = true;
                            }
                            if (csenableweek.indexOf(weekOfMonth) <= -1) {
                                disabled = true;
                            }
                        } else {
                            disabled = false;
                        }
                    }
                    return {
                        disabled: disabled,
                        classes: fulldate,
                        html:attrText
                    };
                },
                onSelect: function (dateText, fullDate) {
                    hasSeleDate =  modifyDate(dateText,final_modi,csCurrentDate,csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText), csDeliverySetting, zipcode, location);
                    var get_final_modi_select = final_modi.length > 0 ? final_modi.filter(function(v, i) {
                      if (typeof v.selected_date != 'undefined') {
                        return v.selected_date['csDatemodiWhenVal'].indexOf(csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText)) > -1;
                      } else if (typeof v.selected_day != 'undefined') {
                        return v.selected_day['csDatemodiWhenVal'] == new Date(csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText)).getDay();
                      } else if (typeof v.current_date != 'undefined') {
                        return v.current_date['csDatemodiWhenVal'].indexOf(csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText)) > -1;
                      } else if (typeof v.current_day != 'undefined') {
                        return v.current_day['csDatemodiWhenVal'] == new Date(csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText)).getDay();
                      } else if (typeof v.current_time != 'undefined') {
                        var currentTimeBase = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(csDeliverySetting.current_time) : csDeliverySetting.current_time,
                        currentDateTime = csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText) + ' ' + currentTimeBase,
                        oldCurrentDate = new Date(currentDateTime),
                        cutOffTimeBase = result_data.generalSettingData.gen_time_format == 0 && v.current_time['csDatemodiWhenVal'] != '' ? convertTime12to24(v.current_time['csDatemodiWhenVal']) : result_data.generalSettingData.gen_time_format == 1 && v.current_time['csDatemodiWhenVal'] != '' ? v.current_time['csDatemodiWhenVal'] + ":00" : currentTimeBase,
                        cutOffTimeBase = cutOffTimeBase != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTimeBase) : '';
                        if (v.current_time['csDatemodiWhenOpe'] == 0) {
                          return cutOffTimeBase.getTime() == oldCurrentDate.getTime();
                        } else if (v.current_time['csDatemodiWhenOpe'] == 1) {
                          return cutOffTimeBase.getTime() != oldCurrentDate.getTime();
                        } else if (v.current_time['csDatemodiWhenOpe'] == 2) {
                          return cutOffTimeBase.getTime() <= oldCurrentDate.getTime();
                        } else if (v.current_time['csDatemodiWhenOpe'] == 3) {
                          return cutOffTimeBase.getTime() >= oldCurrentDate.getTime();
                        }
                      } else if (typeof v.x_day != 'undefined') {
                        var currentDateTime = csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText),
                        oldCurrentDate = new Date(currentDateTime),
                        updatedDate = new Date(new Date(currentDateTime).setDate(new Date(currentDateTime).getDate() + parseInt(v.x_day['csDatemodiWhenVal'])));
                        if (v.x_day['csDatemodiWhenOpe'] == 0) {
                          return updatedDate.getTime() == oldCurrentDate.getTime();
                        } else if (v.x_day['csDatemodiWhenOpe'] == 1) {
                          return updatedDate.getTime() != oldCurrentDate.getTime();
                        } else if (v.x_day['csDatemodiWhenOpe'] == 2) {
                          return updatedDate.getTime() <= oldCurrentDate.getTime();
                        } else if (v.x_day['csDatemodiWhenOpe'] == 3) {
                          return updatedDate.getTime() >= oldCurrentDate.getTime();
                        }
                      }
                    })[0] : '';
                    get_final_modi_select = typeof get_final_modi_select == "undefined" ? get_final_modi_select = final_modi.filter(function(v, i) {return i == final_modi.length - 1;})[0] : get_final_modi_select;
                    csTimeSettingStatus = parseInt(csDeliverySetting.time_status),
                    csTimeSettingStatus = csGeneralSetting.gen_hide_front_time_slot == 1 ? 0 : csTimeSettingStatus;
                    csTimeSettingStatus = typeof get_final_modi_select.tp != "undefined" ? get_final_modi_select.tp : csTimeSettingStatus;
                    if(hasSeleDate == true){
                      if(typeof get_final_modi_select.selected_date != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.selected_date.tp != "undefined" ? get_final_modi_select.selected_date.tp : csTimeSettingStatus;
                      }else if(typeof get_final_modi_select.selected_day != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.selected_day.tp != "undefined" ? get_final_modi_select.selected_day.tp : csTimeSettingStatus;
                      }else if(typeof get_final_modi_select.current_date != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.current_date.tp != "undefined" ? get_final_modi_select.current_date.tp : csTimeSettingStatus;
                      }else if(typeof get_final_modi_select.current_day != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.current_day.tp != "undefined" ? get_final_modi_select.current_day.tp : csTimeSettingStatus;
                      }else if(typeof get_final_modi_select.current_time != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.current_time.tp != "undefined" ? get_final_modi_select.current_time.tp : csTimeSettingStatus;
                      }else if(typeof get_final_modi_select.x_day != "undefined"){
                          csTimeSettingStatus = typeof get_final_modi_select.x_day.tp != "undefined" ? get_final_modi_select.x_day.tp : csTimeSettingStatus;
                      }
                    }
                    if ((csGeneralSetting.gen_date_time_selection == 1 && ordertype == 'storepickup' && csTimeSettingStatus == 1) || (ordertype == 'localdelivery' && csTimeSettingStatus == 1)  || (ordertype == 'shipping' && csTimeSettingStatus == 1) ) {
                        csJq(csTimepicker).html();
                        csJq(csTimepicker).parent().show();
                    }else{
                        csJq(csTimepicker).parent().hide();
                    }
                    var csSelectedDay = new Date(fullDate);
                    csSelectedDay = csSelectedDay.getDay();
                    csJq(csDayValue).val(csFullDaysArr[csSelectedDay]);
                    csJq(csDateValue).val(dateText);
                    if (csTimeSettingStatus == 1) {
                        csJq(csTimeValue).val("");
                        csJq(csTimepicker).val("");
                        getDate = csYmdDateFormate(csDateFormat, dateText);
                        timeHtmlCode = csCheckTimeSlotHtml(csDeliverySetting, csSelectedDay, csFullDaysArr, getDate,dateText, ordertype, 1, get_final_modi_select, hasSeleDate);
                        hastime = csJq(csDatepicker).closest(".cs-tab_content").find(".select-block").is(":hidden") ? 0 : 1;
                        csCheckValidation(1, hastime);
                    } else {
                        csJq(csTimeValue).val("");
                        csUpdateCart(0);
                        hastime = csJq(csDatepicker).closest(".cs-tab_content").find(".select-block").is(":hidden") ? 0 : 1;
                        csCheckValidation(1, hastime);
                    }
                    if (csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") == true) csJq("#csDeliveryZipValue").val(csJq("#postal_code").val());
                    if (csTimeSettingStatus == 1 && csDeliverySetting.time_format == 1 && csDeliverySetting.is_number_of_orders == true) {
                        csJq(csTimePickerVal).append('<div class="csLoaderTime"><img src="' + csShippingAppBaseUrl + 'assets/images/loading.gif"></div>')
                        csJq('.cs-time-picker').hide();
                    var csshippingDateValue = csJq("#csShippingDateValue").val(),
                        csDeliveryDateValue = csJq(csDelvDateVal).val(),
                        csPickupDateValue = csJq(csPickDateVal).val(),
                        shop =  csShopify.shop,
                        location_id = csJq('#csLocationId').val(),
                        order_type = csJq('#csOrderTypeValue').val(),
                        dataTime = {};
                        selected_date = csDeliveryDateValue != "" ? csDeliveryDateValue :  csPickupDateValue != "" ?  csPickupDateValue : csshippingDateValue;
                        order_type_val = order_type == "Shipping" ? 0 :  order_type == "Local Delivery" ? 1 : 2;
                        dataTime.shop = shop;
                        dataTime.order_type = order_type_val;
                        if(csJq('#csLocationId').val() != '') dataTime.location_id = location_id;
                        if(selected_date != ''){
                            dataTime.selected_date = selected_date;
                            csJq.ajax({
                                url: csShippingAppBaseUrl + "get-date-wise-slot-data",
                                type: "POST",
                                data: dataTime,
                                dataType: "JSON",
                                success: function (result) {
                                    if(typeof result.success != 'undefined'){
                                        if(result.dateTimeSlotData.length != 0){
                                            hideSlot = [];
                                            csJq(result.dateTimeSlotData[csSelectedDay]).each(function (index, data) {
                                                if(parseInt(data.orders_count) >= parseInt(data.number_of_orders) && parseInt(data.number_of_orders) != 0){
                                                    hideSlot.push(data.slot_value_label);
                                                }
                                            })
                                            if(hideSlot.length > 0){
                                                csJq(hideSlot).each(function (index, data) {
                                                    csJq('.cs-time-picker').show();
                                                    csJq('.cs-time-picker[data-value="'+ data +'"]').hide();
                                                });
                                            }else{
                                                csJq('.cs-time-picker').show();
                                            }
                                        }else{
                                            csJq('.cs-time-picker').show();
                                        }
                                    }else{
                                        csJq('.cs-time-picker').show();
                                    }
                                    csJq('.csLoaderTime').hide();
                                    if (csJq(csTimePickerVal + ' .cs-time-picker').length == 1 && csJq('.time-body ' + csTimePickerVal + ' .t[for="t0"]').css('display') == 'block') csJq('.time-body ' + csTimePickerVal + ' .t[for="t0"]').trigger('click');
                                    var moditimeslot = [];
                                    hasSeleDate =  modifyDate(dateText,final_modi,csCurrentDate,csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText), csDeliverySetting, zipcode, location);
                                    if(typeof get_final_modi_select.moditimeslot != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.moditimeslot != "undefined" ? get_final_modi_select.moditimeslot : [];
                                        hasSeleDate = true;
                                    }else if(typeof get_final_modi_select.selected_date != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.selected_date.moditimeslot != "undefined" ? get_final_modi_select.selected_date.moditimeslot : [];
                                    }else if(typeof get_final_modi_select.selected_day != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.selected_day.moditimeslot != "undefined" ? get_final_modi_select.selected_day.moditimeslot : [];
                                    }else if(typeof get_final_modi_select.current_date != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.current_date.moditimeslot != "undefined" ? get_final_modi_select.current_date.moditimeslot : [];
                                    }else if(typeof get_final_modi_select.current_day != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.current_day.moditimeslot != "undefined" ? get_final_modi_select.current_day.moditimeslot : [];
                                    }else if(typeof get_final_modi_select.current_time != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.current_time.moditimeslot != "undefined" ? get_final_modi_select.current_time.moditimeslot : [];
                                    }else if(typeof get_final_modi_select.x_day != "undefined"){
                                        moditimeslot = typeof get_final_modi_select.x_day.moditimeslot != "undefined" ? get_final_modi_select.x_day.moditimeslot : [];
                                    }
                                    moditimeslot = moditimeslot != ''? moditimeslot.split(',') : moditimeslot;

                                    if(hasSeleDate){
                                        csJq(moditimeslot).each(function (index, data) {
                                          csJq('.cs-time-picker[data-value="'+ data +'"]').hide();
                                        });
                                        if (csJq(csTimePickerVal + ' .cs-time-picker').length == 1 && csJq('.time-body ' + csTimePickerVal + ' .t[for="t0"]').css('display') == 'none') csJq(csTimepicker).val('');
                                    }
                                    if (typeof sbzDateUpdate != 'undefined'){
                                      sbzDateUpdate(dateText);
                                    }
                                    if (typeof csCheckTimeSlotHtmlUpdate != 'undefined'){
                                        csCheckTimeSlotHtmlUpdate(csDeliverySetting, csSelectedDay, csFullDaysArr, getDate, dateText, ordertype, 1, get_final_modi_select.moditimeslot);
                                    }
                                },
                                error: function (xhr, ajaxOptions, thrownError) {
                                    // console.log(xhr.status);
                                    // console.log(thrownError);
                                },
                            });
                        }
                   }else{
                    csJq('.csLoaderTime').hide();
                    var moditimeslot = [];
                    hasSeleDate =  modifyDate(dateText,final_modi,csCurrentDate,csYmdDateFormate(result_data.generalSettingData.gen_date_format, dateText), csDeliverySetting, zipcode, location);
                    if(typeof get_final_modi_select.selected_date != "undefined"){
                        moditimeslot = typeof get_final_modi_select.selected_date.moditimeslot != "undefined" ? get_final_modi_select.selected_date.moditimeslot : [];
                    }else if(typeof get_final_modi_select.selected_day != "undefined"){
                        moditimeslot = typeof get_final_modi_select.selected_day.moditimeslot != "undefined" ? get_final_modi_select.selected_day.moditimeslot : [];
                    }else if(typeof get_final_modi_select.current_date != "undefined"){
                        moditimeslot = typeof get_final_modi_select.current_date.moditimeslot != "undefined" ? get_final_modi_select.current_date.moditimeslot : [];
                    }else if(typeof get_final_modi_select.current_day != "undefined"){
                        moditimeslot = typeof get_final_modi_select.current_day.moditimeslot != "undefined" ? get_final_modi_select.current_day.moditimeslot : [];
                    }else if(typeof get_final_modi_select.current_time != "undefined"){
                        moditimeslot = typeof get_final_modi_select.current_time.moditimeslot != "undefined" ? get_final_modi_select.current_time.moditimeslot : [];
                    }else if(typeof get_final_modi_select.x_day != "undefined"){
                        moditimeslot = typeof get_final_modi_select.x_day.moditimeslot != "undefined" ? get_final_modi_select.x_day.moditimeslot : [];
                    }

                    moditimeslot = moditimeslot != ''? moditimeslot.split(',') : moditimeslot;
                    if(hasSeleDate){
                        csJq(moditimeslot).each(function (index, data) {
                          csJq('.cs-time-picker[data-value="'+ data +'"]').hide();
                        });
                        if (csJq(csTimePickerVal + ' .cs-time-picker').length == 1 && csJq('.time-body ' + csTimePickerVal + ' .t[for="t0"]').css('display') == 'none') csJq(csTimepicker).val('');
                    }
                    if (typeof sbzDateUpdate != 'undefined'){
                        sbzDateUpdate(dateText);
                    }
                    if (typeof csCheckTimeSlotHtmlUpdate != 'undefined'){
                        csCheckTimeSlotHtmlUpdate(csDeliverySetting, csSelectedDay, csFullDaysArr, getDate, dateText, ordertype, 1, get_final_modi_select.moditimeslot);
                    }
                   }
                   if (csGeneralSetting.gen_date_time_required == 1 && dateText == ''){
                     csJq(checkout_selectors).attr("disabled", true);
                   }
                },
            });
            if ((csGeneralSetting.gen_date_time_selection == 1 && ordertype == 'storepickup' && csTimeSettingStatus == 1) || (ordertype == 'localdelivery' && csTimeSettingStatus == 1)  || (ordertype == 'shipping' && csTimeSettingStatus == 1) ) {
                csJq(csTimepicker).html();
                csJq(csTimepicker).parent().show();
            }else{
                csJq(csTimepicker).parent().hide();
            }
    }
}
function csCreateCustomDropdown() { csJq(".cs-tab_content").hide(); csJq(".cs-tab_content:first").show(); }
function csTabRefresh(_this) { var csTabVal = csJq(_this).attr("rel"), csTabClass = csJq(_this).attr("class"), typeOfOrder = ""; if (typeof csDisableDateArray != 'undefined') { csDisableDateArray = [] } if (typeof csEnableDateArray != 'undefined') { csEnableDateArray = [] } if (csTabVal == "cs-tab1") { typeOfOrder = "Shipping";} else if (csTabVal == "cs-tab2") { typeOfOrder = "Local Delivery"; } else if (csTabVal == "cs-tab3") { typeOfOrder = "Store Pickup"; } csJq("#csDatepicker,#csDatepicker1,#csTimePicker,#csTimePicker1,#csTimeShippingPicker,#postal-code-error").parent().hide(); csJq("#csDatepicker").datepicker().data("datepicker").clear(); csJq("#csDatepicker1").datepicker().data("datepicker").clear(); csJq("#csShippingpicker").datepicker().data("datepicker").clear(); csJq("#csOrderTypeValue").val(typeOfOrder); csJq(csDelvDayVal+",#csDeliveryZipValue,"+csDelvDateVal+","+csDelvTimeVal+",#csTimePicker,#csTimePicker1,#postal_code,#csShippingDateValue,#csShippingDayValue").val(""); }
function csCheckValidation(notshow = "", csTimeSettingStatus = 1) {
    csShopData = result_data,hasError = false,
    csDateValue = csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") ? csDelvDateVal :  csJq(".cs-tab_last[rel='cs-tab3']").hasClass("active") ? csPickDateVal  : "#csShippingDateValue",
    csTimeValue = csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") ? csDelvTimeVal : csJq(".cs-tab_last[rel='cs-tab3']").hasClass("active") ? "#csPickupTimeValue"  : "#csShippingTimeValue";
    if (csJq(".cs-tab_last[rel='cs-tab1']").hasClass("active") == true || csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") == true || (csJq(".cs-tab_last[rel='cs-tab3']").hasClass("active") == true && csJq("#no_location").text() == "")) {
        if (notshow == 1) {
            if (csShopData != null) {
                if (csShopData.generalSettingData.gen_date_time_required == 1) {
                    csJq("#required-error").html('<div class="error-cls"><span id="postal-code-error">' + csShopData.generalSettingData.gen_date_time_required_msg + "</span></div>").hide();
                    csJq(checkout_selectors).attr("disabled", true);
                    if (csTimeSettingStatus == 1 && csJq(csDateValue).val().length > 0 && csJq(csTimeValue).val().length > 0) {
                        hasError = true;
                    } else if (csTimeSettingStatus == 0 && csJq(csDateValue).val().length > 0) {
                        hasError = true;
                    }
                } else {
                    hasError = true;
                }
            }
        }
    } else {
        hasError = true;
    }
    if (hasError == true || csJq("#csShippingAppCode").is(':visible') == false) {
        csJq(checkout_selectors).attr("disabled", false);
        csJq("#required-error").html("");
    }else{
        if(csJq(".cs-tab_last[rel='cs-tab1']").hasClass("active") == true || (csJq('#postal_code').val() != '' && csJq(".cs-tab_last[rel='cs-tab2']").hasClass("active") == true) || (csJq('.cs-radio-card').hasClass('csactive') == true && csJq(".cs-tab_last[rel='cs-tab3']").hasClass("active") == true)) csJq('#required-error').show()
    }
}
function updateCall(csPostAttr,csLineProp) {
    fetch('/cart/update.js?csapp=shipcs', {
      method: "POST",
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;'
      },
      body: JSON.stringify({
        attributes: csPostAttr
      })
    }).then(function (data) {
        if (result_data.generalSettingData.gen_date_time_required == 0) {
          csJq(checkout_selectors).attr("disabled", false);
        } else {
          var activeTab = csJq('.cs-tab_last.active').attr('rel');
          if (activeTab == 'cs-tab1') {
            if (result_data.shippingDeliveryDateSettingData.date_status != 0) {
              if (csJq('#'+activeTab+' .tab-inner-content').is(':visible')) {
                if (csJq('#'+activeTab+' .datePicker').val() != '') {
                  csJq(checkout_selectors).attr("disabled", false);
                } 
              } else {
                if (csHasCondition) {
                  if (csHasCondition && csCartShipCond.csHasConditionbase) {
                    csJq(checkout_selectors).attr("disabled", false);
                  }
                } else {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              }
            } else {
              if (csHasCondition) {
                if (csHasCondition && csCartShipCond.csHasConditionbase) {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              } else {
                csJq(checkout_selectors).attr("disabled", false);
              }
            }
          } else if (activeTab == 'cs-tab3') {
            if (result_data.generalSettingData.gen_date_time_selection != 0) {
              if (csJq('#'+activeTab+' .tab-inner-content').is(':visible')) {
                if (csJq('#'+activeTab+' .datePicker').val() != '') {
                  csJq(checkout_selectors).attr("disabled", false);
                } 
              } else {
                if (csHasCondition) {
                  if (csHasCondition && csCartPickCond.csHasConditionbase) {
                    csJq(checkout_selectors).attr("disabled", false);
                  }
                } else {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              }
            } else {
              if (csHasCondition) {
                if (csHasCondition && csCartPickCond.csHasConditionbase) {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              } else {
                csJq(checkout_selectors).attr("disabled", false);
              }
            }
          } else {
            if (csJq('#'+activeTab+' .tab-inner-content').is(':visible')) {
              if (csJq('#'+activeTab+' .datePicker').val() != '') {
                csJq(checkout_selectors).attr("disabled", false);
              }
              if (result_data.generalSettingData.gen_combine_ship_delivery == 1) {
                if (csJq('#cs-tab1 .datePicker').val() != '') {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              }
            } else {
              if (csHasCondition) {
                if (csHasCondition && csCartDelCond.csHasConditionbase) {
                  csJq(checkout_selectors).attr("disabled", false);
                }
              } else {
                csJq(checkout_selectors).attr("disabled", false);
              }
            }
          }
        }
        if (typeof AfterUpdate != 'undefined') {
            csJq.getJSON("/cart.json", function (csCart) {
                 AfterUpdate(csCart, csLineProp);
            });
        }
    });
}
function csUpdateCart(haswidget, hasnoattr = 0) {
    csJq.getJSON("/cart.json", function (cart) {
        if (haswidget == 1) {
            csCartContent = cart;
            getWidget(result_data,csCartContent);
            csSearchOrSelect(csCartContent);
        }
        if (hasnoattr == 1){
            csJq('#csOrderTypeValue').val("");  
        }
        if (cart.item_count > 0) {
                csJq(checkout_selectors).attr("disabled", true);
                var csOrderTypeValue = csJq("#csOrderTypeValue").val(), 
                csLocationIdName = csJq("#csLocationId").attr("data-name"),
                 csLocationValue = csJq("#csLocationId").val(), 
                 csLocationName = csJq('.cs-radio-card[data-location-mainid="' + csLocationValue + '"] h6').text().trim(), 
                 csLocationAttr = csJq("#csDeliveryLocationValue").attr("data-name"), 
                 csDeliveryZipValue = csJq("#csDeliveryZipValue").val(), 
                 csDeliveryZipAttr = csJq("#csDeliveryZipValue").attr("data-name"), 
                 csOrderTypeAttr = csJq("#csOrderTypeValue").attr("data-name"), 
                 csDeliveryDayValue = csJq(csDelvDayVal).val(), 
                 csDeliveryDateValue = csJq(csDelvDateVal).val(), 
                 csDeliveryTimeValue = csJq(csDelvTimeVal).val(), 
                 csDeliveryDayAttr = csJq(csDelvDayVal).attr("data-name"), 
                 csDeliveryDateAttr = csJq(csDelvDateVal).attr("data-name"), 
                 csDeliveryTimeAttr = csJq(csDelvTimeVal).attr("data-name"), 
                 csPickupDayValue = csJq(csPickDayVal).val(), 
                 csPickupDateValue = csJq(csPickDateVal).val(), 
                 csPickupTimeValue = csJq("#csPickupTimeValue").val(), 
                 csPickupTimeAttr = csJq("#csPickupTimeValue").attr("data-name"), 
                 csPickupDayAttr = csJq(csPickDayVal).attr("data-name"), 
                 csPickupDateAttr = csJq(csPickDateVal).attr("data-name"), 
                 csshippingDateValue = csJq("#csShippingDateValue").val(), 
                 csshippingDateAttr = csJq("#csShippingDateValue").attr("data-name"), 
                 csshippingDayValue = csJq("#csShippingDayValue").val(), 
                 csshippingDayAttr = csJq("#csShippingDayValue").attr("data-name"), 
                 csShippingTimeValue = csJq("#csShippingTimeValue").val(), 
                 csShippingTimeAttr = csJq("#csShippingTimeValue").attr("data-name"), 
                 csLoactionAddressAttr = csJq("#csLocationAddress1").attr("data-name"), 
                 csLoactionAddressValue = csJq("#csLocationAddress1").val(), 
                 csPostData = {},
                 csPostAttr = {}, 
                 csLineProp = cart.items[0].properties != null && cart.items[0].properties != undefined ? cart.items[0].properties : {};
                csPostData = {  
                    line: 1,    
                    quantity: cart.items[0].quantity,   
                    properties: ''  
                };
                if(csShopify.shop == "hello.myshopify.com" || window.notAddProperty == true){
                  csLineProp = csLineProp; 
                }else{
                    csLineProp["_odd"] = csDeliveryDayValue != "" ? csDeliveryDayValue : csPickupDayValue != "" ? csPickupDayValue : csshippingDayValue;
                    csLineProp["_odate"] = csDeliveryDateValue != "" ? csDeliveryDateValue :  csPickupDateValue != "" ?  csPickupDateValue : csshippingDateValue;
                    csLineProp["_odm"] = csOrderTypeValue != "" ? csOrderTypeValue : " ";
                    csLineProp["_odt"] = csDeliveryTimeValue != "" ? csDeliveryTimeValue : csPickupTimeValue != "" ? csPickupTimeValue : csShippingTimeValue;
                    csLineProp["_LocationId"] = csLocationValue;
                }
            csPostData.properties = csLineProp;
            csPostAttr[csLocationAttr] = csOrderTypeValue == "Store Pickup" ? csLocationName : "";
            csPostAttr[csOrderTypeAttr] = csOrderTypeValue != "" || window.sbzIssueAttr == undefined? csOrderTypeValue  : '-', 
            csPostAttr[csDeliveryZipAttr] = csDeliveryZipValue != "" || window.sbzIssueAttr == undefined? csDeliveryZipValue  : '-',
            csPostAttr[csDeliveryDateAttr] = csDeliveryDateValue != ""  || window.sbzIssueAttr == undefined ? csDeliveryDateValue  : '-',
            csPostAttr[csDeliveryDayAttr] = csDeliveryDayValue != "" || window.sbzIssueAttr == undefined ? csDeliveryDayValue  : '-',
            csPostAttr[csDeliveryTimeAttr] = csDeliveryTimeValue != ""  || window.sbzIssueAttr == undefined ? csDeliveryTimeValue  : '-',
            csPostAttr[csPickupDateAttr] = csPickupDateValue != "" || window.sbzIssueAttr == undefined ? csPickupDateValue  : '-', 
            csPostAttr[csPickupDayAttr] = csPickupDayValue != "" || window.sbzIssueAttr == undefined ? csPickupDayValue  : '-', 
            csPostAttr[csPickupTimeAttr] = csPickupTimeValue != "" || window.sbzIssueAttr == undefined ? csPickupTimeValue  : '-', 
            csPostAttr[csshippingDateAttr] = csshippingDateValue != "" || window.sbzIssueAttr == undefined ? csshippingDateValue  : '-', 
            csPostAttr[csshippingDayAttr] = csshippingDayValue != "" || window.sbzIssueAttr == undefined ? csshippingDayValue : '-', 
            csPostAttr[csShippingTimeAttr] = csShippingTimeValue != "" || window.sbzIssueAttr == undefined ? csShippingTimeValue : '-', 
            csPostAttr[csLoactionAddressAttr] = csLoactionAddressValue != "" || window.sbzIssueAttr == undefined ? csLoactionAddressValue  : '-', 
            csPostAttr[csLocationIdName] = csLocationValue != "" || window.sbzIssueAttr == undefined ? csLocationValue  : '-';
            if(window.notAjaxProperty == undefined || window.notAjaxProperty == false) {
                csJq.ajax({
                    url: "/cart/change.js?csapp=shipcs",
                    type: "post",
                    dataType: "json",
                    data: csPostData,
                    async: !1,
                    success: function (csCart) {
                        updateCall(csPostAttr,csLineProp)
                        
                    },
                });
            }else{
                updateCall(csPostAttr,csLineProp)
            }
        }
    });
}

function csDefaultSelectedValue(hasDelieverylocation,hasStorePickuplocation,getShippingPickup) {
    if ((csCartAttributes != "" && csCartAttributes != undefined && csCartProperties._odd != "" && csCartProperties._odd != undefined) || (csCartAttributes != "" && csCartAttributes != undefined && csCartAttributes["Type Of Order"] == "Store Pickup")) {
        if ((csCartAttributes["Type Of Order"] == "Local Delivery" && hasDelieverylocation == true)) {
            if(csJq(".cs-tab_last[rel='cs-tab2']").hasClass('active') == false){
                csJq(".cs-tab_last[rel='cs-tab2']").trigger("click");
            }
            if (csPostalCode != "" && csPostalCode != undefined && csPostalCode != null && csPostalCode != 'undefined') {
                csJq("#postal_code").val(csPostalCode);
                if(result_data.generalSettingData.gen_location_type != 1){
                    csSearchOrSelect(csCartContent);
                }
            }
            csJq("#csOrderTypeValue").val("Local Delivery");
            csJq(csDelvDateVal).val(csCartProperties._odate);
            csJq(csDelvTimeVal).val(csCartProperties._odt);
            csJq(csDelvDayVal).val(csCartProperties._odd);
            csJq("#csLocationId").val(csCartProperties._LocationId);
        } else if ((csCartAttributes["Type Of Order"] == "Store Pickup" && hasStorePickuplocation == true)) {
            if(csJq(".cs-tab_last[rel='cs-tab3']").hasClass('active') == false){
                csJq(".cs-tab_last[rel='cs-tab3']").addClass("active").trigger("click");
                csJq("#cs-tab3").show();
            } else if (csJq(".cs-tab_last[rel='cs-tab3']").hasClass('active')) {
              csJq(".cs-tab_last[rel='cs-tab3']").trigger("click");
            }
            Adress2 = result_data.locations[localStorage.getItem("_cslocationid_")].address2 != undefined ? result_data.locations[localStorage.getItem("_cslocationid_")].address2 : " ";
            csJq("#csShippingAddress1").val(result_data.locations[localStorage.getItem("_cslocationid_")].address1);
            csJq("#csShippingAddress2").val(Adress2);
            csJq("#csShippingCity").val(result_data.locations[localStorage.getItem("_cslocationid_")].city);
            csJq("#csShippingZip").val(result_data.locations[localStorage.getItem("_cslocationid_")].zip);
            csJq("#csOrderTypeValue").val("Store Pickup");
            csJq(csPickDateVal).val(csCartProperties._odate);
            csJq("#csPickupTimeValue").val(csCartProperties._odt);
            csJq(csPickDayVal).val(csCartProperties._odd);
            csJq("#csLocationId").val(csCartProperties._LocationId);
            csJq("#csDeliveryLocationValue").val(result_data.locations[localStorage.getItem("_cslocationid_")].name);
        }else if ((csCartAttributes["Type Of Order"] == "Shipping" && getShippingPickup == true && result_data.shippingDeliveryDateSettingData.status == 1 && result_data.generalSettingData.gen_combine_ship_delivery != 1)) {
            if(csJq(".cs-tab_last[rel='cs-tab1']").hasClass('active') == false){
                csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
                csJq("#cs-tab1").show();
            }
            csJq("#csOrderTypeValue").val("Shipping");
            csJq("#csShippingDateValue").val(csCartProperties._odate);
            csJq("#csShippingTimeValue").val(csCartProperties._odt);
            csJq("#csShippingDayValue").val(csCartProperties._odd);
        }else{
            if(result_data.shippingDeliveryDateSettingData.status == 0 && getShippingPickup == false && hasStorePickuplocation == false && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l')+1 == 1){
                csJq(".cs-tab_last[rel='cs-tab2']").addClass("active").trigger("click");
            }else if(getShippingPickup == true && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1 && result_data.generalSettingData.gen_combine_ship_delivery != 1){
                csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
            }else{
                if((result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1 &&  csJq(".cs-tabs .cs-tab_last[rel='cs-tab1']").is(':visible') && result_data.generalSettingData.gen_combine_ship_delivery != 1) || (hasDelieverylocation == false && hasStorePickuplocation == false) ){
                    csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
                }else if ((result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l') + 1 == 1 && csJq(".cs-tabs .cs-tab_last[rel='cs-tab2']").is(':visible')) || (result_data.generalSettingData.gen_combine_ship_delivery == 1 && getShippingPickup == false && hasStorePickuplocation == false) || (getShippingPickup == false && hasStorePickuplocation == false) || (result_data.shippingDeliveryDateSettingData.status == 1 && getShippingPickup == true && hasStorePickuplocation == false && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l') + 1 == 2)) {
                    csJq(".cs-tab_last[rel='cs-tab2']").addClass("active").trigger("click");
                }else{
                    csJq(".cs-tab_last[rel='cs-tab3']").addClass("active").trigger("click");
                }
            }
        }
    }else{
        if(result_data.shippingDeliveryDateSettingData.status == 0 && getShippingPickup == false && hasStorePickuplocation == false && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l')+1 == 1){
            csJq(".cs-tab_last[rel='cs-tab2']").trigger("click");
        }else if(getShippingPickup == true && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1){
            csJq('.cs-tab_last[rel="cs-tab1"]').show();
            csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
            csJq("#cs-tab1").show();
            csPostalCode = "";
            localStorage.removeItem("_cspcod_");
            if (result_data.generalSettingData.gen_combine_ship_delivery == 1) {
              if (result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1 && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('p')+1 == 2) {
                csJq(".cs-tab_last[rel='cs-tab3']").trigger("click");
              } else {
                csJq(".cs-tab_last[rel='cs-tab2']").trigger("click");
              }
            } else {
              csJq('.cs-tab_last[rel="cs-tab1"]').show();
              csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
              csJq("#cs-tab1").show();
              csPostalCode = "";
              localStorage.removeItem("_cspcod_");
            }
        }else{
            if((result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1 &&  csJq(".cs-tabs .cs-tab_last[rel='cs-tab1']").is(':visible')) || (hasDelieverylocation == false && hasStorePickuplocation == false && result_data.generalSettingData.gen_combine_ship_delivery != 1) ){
                csJq(".cs-tab_last[rel='cs-tab1']").addClass("active").trigger("click");
            }else if ((result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l') + 1 == 1 && csJq(".cs-tabs .cs-tab_last[rel='cs-tab2']").is(':visible')) || (getShippingPickup == false && hasStorePickuplocation == false && csJq(".cs-tabs .cs-tab_last[rel='cs-tab2']").is(':visible')) || (result_data.shippingDeliveryDateSettingData.status == 1 && getShippingPickup == true && hasStorePickuplocation == false && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l') + 1 == 2 && csJq(".cs-tabs .cs-tab_last[rel='cs-tab2']").is(':visible')) || (getShippingPickup == false && hasStorePickuplocation == true && result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l') + 1 == 2 && csJq(".cs-tabs .cs-tab_last[rel='cs-tab2']").is(':visible'))) {
                csJq(".cs-tab_last[rel='cs-tab2']").addClass("active").trigger("click");
            }else{
                csJq(".cs-tab_last[rel='cs-tab3']").addClass("active").trigger("click");
            }
        }
    }
}
function checkcartcondition(SettingData, hasComman,ordertype) {
    var csHasConditionbase = false,
    condition_type = hasComman == 0 ? SettingData.condition_type : SettingData.gen_condition_type,
    condition_name = hasComman == 0 ? SettingData.condition_name : SettingData.gen_condition_name,
    condition_total_weight_price = condition_name == 0 ? csCartContent.total_price : csCartContent.total_weight,
    set_condition = hasComman == 0 ? SettingData.set_condition : SettingData.gen_set_condition;

    if (hasComman == 0) {
        condition_price = condition_name == 0 ? SettingData.condition_price * 100 : SettingData.condition_price * 1000;
    } else {
        condition_price = condition_name == 0 ? SettingData.gen_condition_price * 100 : SettingData.gen_condition_price * 1000;
    }
    if (set_condition != 0) {
        if (condition_type == 0 && condition_total_weight_price >= condition_price) {
            csHasConditionbase = true;
        } else if (condition_type == 1 && condition_total_weight_price <= condition_price) {
            csHasConditionbase = true;
        }
    }else{
        csHasConditionbase = true;
    }
    moretext = result_data.generalSettingData.gen_con_more_than != null && result_data.generalSettingData.gen_con_more_than != ''? result_data.generalSettingData.gen_con_more_than : "more than" ;
    lesstext = result_data.generalSettingData.gen_con_less_than != null && result_data.generalSettingData.gen_con_less_than != ''? result_data.generalSettingData.gen_con_less_than : "less than" ;
    ordermust = result_data.generalSettingData.gen_con_order_must_be != null && result_data.generalSettingData.gen_con_order_must_be != ''? result_data.generalSettingData.gen_con_order_must_be : 'Orders Must be at least';
    moreless = condition_type == 0 ? moretext : lesstext;
    msgcon = condition_name == 0 ? '<p class="order_must"><span class="must_1">'+ordermust+'</span><span class="must_2"> '+moreless +'</span><span class="must_3"> '+window.formatMoney(condition_price, wmf) +'</span></p>' :'<p class="order_must"><span class="must_1">'+ordermust+'</span><span class="must_2"> '+moreless +'</span><span class="must_3"> '+condition_price/1000 +result_data.shopData.weight_unit+'</span></p>'
    return  {csHasConditionbase,msgcon};
}
function checkProductcondition(SettingData, csProductTypeArr, csProductVendorArr, hasComman) {
    var cartConditionalArr = [],
        matchProductCondition = 0,
        csHasCondition = false,
        conditional_activations = hasComman == 0 ? SettingData.conditional_activations : SettingData.gen_conditional_activations,
        cartProductVendorsArr = hasComman == 0 ? SettingData.conditional_activation_contains : SettingData.gen_conditional_activation_contains,
        activation_conditional_checkbox = hasComman == 0 ? SettingData.activation_conditional_checkbox : SettingData.gen_activation_conditional_checkbox,
        conditional_activation_status = hasComman == 0 ? SettingData.conditional_activation_status : SettingData.gen_conditional_activation_status,
        set_condition = hasComman == 0 ? SettingData.set_condition : SettingData.gen_set_condition;
    if (set_condition != 0) {
        if (activation_conditional_checkbox != 0) {
            matchProductId = 0, notmatchProductId = 0;
            if (conditional_activations == 3 || conditional_activations == 1) {
                cartConditionalArr1 = []
                cartConditionalArr = conditional_activations == 1 ? csProductTypeArr : csProductVendorArr;
                cartConditionalArr1 = cartConditionalArr.filter(onlyUnique)
                cartProductVendor = cartProductVendorsArr.split(',');
                csJq(cartConditionalArr1).each(function(index, proItem) {
                    if (typeof proItem != "undefined" && cartProductVendor.includes(proItem)) {
                        matchProductId++;
                    } else {
                        notmatchProductId++;
                    }
                })
            } else {
                cartProductVendor = cartProductVendorsArr.split(',');
                cartConditionalArr1 = csCartContent.items;
                csJq(csCartContent.items).each(function(index, proItem) {
                    id_item = csCartContent.items[index].id.toString();
                    proItem = conditional_activations == 0 ? cart_collections[id_item] : cart_tags[id_item];
                    if (typeof proItem != "undefined" && cartProductVendor.some(r => proItem.includes(r))) {
                        matchProductId++;
                    } else {
                        notmatchProductId++;
                    }
                })
            }
            if (conditional_activation_status == 0 && matchProductId <= 0) {
                csHasCondition = true;
            }
            if (conditional_activation_status == 1 && matchProductId != 0) {
                csHasCondition = true;
            }
            if (conditional_activation_status == 2 && notmatchProductId != 0) {
                csHasCondition = true;
            }
            if (conditional_activation_status == 3 && matchProductId != 0 && notmatchProductId == 0) {
                csHasCondition = true;
            }
        } else {
            csHasCondition = true;
        }
    } else {
        csHasCondition = true;
    }
    return csHasCondition;
}
function csCheckProductDeliveryStatus(SettingData, csCartContent,ordertype) {
    var  csHasWidget = false, csProductIdArr = [],
        csDeliveryStatus = SettingData.status,
        csDeliveryDate = result_data.shippingDeliveryDateSettingData.date_status,
        csProductSelectionStatus = SettingData.products_selection,
        csProductRateVisibility = SettingData.product_rate_visibility,
        csSetProductIds = SettingData.product_id;
        if (csDeliveryStatus == 0 && csDeliveryDate == 1 && ordertype == 'shipping' ){
            csDeliveryStatus = 1;
        }
    if ((csDeliveryStatus != 0 && csDeliveryStatus != undefined)) {
        csProductVendorArr = [], csProductTypeArr = [];
      csJq(csCartContent.items).each(function (index, csCartData) {
        csProductIdArr.push(csCartData.product_id);
        if(csCartData.vendor != '')  csProductVendorArr.push(csCartData.vendor);
        if(csCartData.product_type != '') csProductTypeArr.push(csCartData.product_type);
      });
      csProductIdArr = csProductIdArr.filter(onlyUnique);
      csHasCondition =  checkProductcondition(SettingData,csProductTypeArr,csProductVendorArr,0)
      if (csHasCondition == true) {
        if (csProductSelectionStatus != 0) {
          if (csProductIdArr.length > 0 && csSetProductIds.length > 0) {
              matchProductId = 0,notmatchProductId = 0;
              csJq(csProductIdArr).each(function (index, items) {
                items = items.toString();
                if (csSetProductIds.includes(items)) {
                  matchProductId++;
                }else{
                  notmatchProductId++
                }
              });
              if (csProductRateVisibility == 3) {
                if (matchProductId != 0 && notmatchProductId == 0){ csHasWidget = true; }
              }else if (csProductRateVisibility == 2) {
                if (matchProductId == 0){
                     csHasWidget = true;
                }
              }else if (csProductRateVisibility == 1){
                if (notmatchProductId == 0){
                    csHasWidget = true;
                }
              } else if (csProductRateVisibility == 0) {
                if (matchProductId <= csSetProductIds.length && matchProductId != 0){
                    csHasWidget = true;
                }
              }
          }
        } else {
          csHasWidget = true;
        }
      }
        if (csDeliveryStatus == 1 && csDeliveryDate == 0 && ordertype == 'shipping'  && csHasCondition == true){
            csHasWidget = true;
        }
    }
    return csHasWidget;
  }
function convertTime12to24(time12h) { var [time, modifier] = time12h.split(" "); var [hours, minutes,second] = time.split(":"); if (hours === "12") hours = "00"; if (modifier === "PM") hours = parseInt(hours, 10) + 12; if(second == undefined) second =  "00"; return `${hours}:${minutes}:${second}`; }
function createSlotObject(label, template) {
  const [start_time, end_time] = label.split(" to ");
  return {
    ...template,
    start_time: start_time.trim(),
    end_time: end_time.trim(),
    slot_value: `${start_time.trim()}-${end_time.trim()}`,
    slot_value_label: label
  };
}
function csCheckTimeSlotHtml(csDeliverySetting, csSelectedDay, csFullDaysArr, dateText, dateText1, ordertype, hasdate, get_final_modi_select, hasSeleDate) {
        csTimePickerVal = ordertype == "localdelivery" ? "#csTimePickerVal" :  ordertype == "storepickup" ? "#csTimePickerVal1": "#csTimeShippingVal",
        csDayValue = ordertype == "localdelivery" ? csDelvDayVal :  ordertype == "storepickup" ? csPickDayVal : "#csShippingDayValue",
        csDateValue = ordertype == "localdelivery" ? csDelvDateVal :  ordertype == "storepickup" ?  csPickDateVal : "#csShippingDateValue";
    var csSlotWiseData = csDeliverySetting.slot_wise_data,
        csDefaultTime = csDeliverySetting.default_time,
        csHideSlots = parseInt(csDeliverySetting.is_hide_slots),
        csHideSlotsTime = parseInt(csDeliverySetting.hide_slots_time),
        csCurrentTime = csDeliverySetting.current_time,
        csCurrentDateMDY = csDeliverySetting.current_date,
        csActivepaddingTime = csDeliverySetting.active_padding_time,
        csPaddingTimeMinute = csDeliverySetting.padding_time_minute,
        csaAllowStoreWorkTime = csDeliverySetting.allow_store_work_time,
        csStartWorkTime = csDeliverySetting.start_work_time,
        csEndWorkTime = csDeliverySetting.end_work_time,
        selected_date = dateText,
        endWorkTimeStamp = result_data.generalSettingData.gen_time_format == 0 && csaAllowStoreWorkTime == 1 ? convertTime12to24(csEndWorkTime) : csEndWorkTime + ":00",
        csStartWorkTime =  result_data.generalSettingData.gen_time_format == 0 && csaAllowStoreWorkTime == 1 ? convertTime12to24(csStartWorkTime) : csStartWorkTime + ":00",
        csDateFormat = result_data.generalSettingData.gen_date_format;
        csJq(csDayValue).val(csFullDaysArr[csSelectedDay]);
        var timeHtmlCode = "";
        changeTimestamp = new Date(dateText).getTime(), 
        csCurrentTimeStamp_only = new Date(csCurrentDateMDY).getTime(),
        csCurrentDate = csDateFormatter(csDateFormat, new Date(csCurrentTimeStamp_only))
        csNextDay = csCurrentTimeStamp_only + 24 * 60 * 60 * 1000,
        csNextDay = csDateFormatter(csDateFormat, new Date(csNextDay)),
        csCurrentEndtime = new Date(csCurrentDateMDY + " " + endWorkTimeStamp).getTime();
  
    var modiaddtimeslot = [];
    if(typeof get_final_modi_select.selected_date != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.selected_date.modiaddtimeslot != "undefined" ? get_final_modi_select.selected_date.modiaddtimeslot : [];
    }else if(typeof get_final_modi_select.selected_day != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.selected_day.modiaddtimeslot != "undefined" ? get_final_modi_select.selected_day.modiaddtimeslot : [];
    }else if(typeof get_final_modi_select.current_date != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.current_date.modiaddtimeslot != "undefined" ? get_final_modi_select.current_date.modiaddtimeslot : [];
    }else if(typeof get_final_modi_select.current_day != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.current_day.modiaddtimeslot != "undefined" ? get_final_modi_select.current_day.modiaddtimeslot : [];
    }else if(typeof get_final_modi_select.current_time != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.current_time.modiaddtimeslot != "undefined" ? get_final_modi_select.current_time.modiaddtimeslot : [];
    }else if(typeof get_final_modi_select.x_day != "undefined"){
        modiaddtimeslot = typeof get_final_modi_select.x_day.modiaddtimeslot != "undefined" ? get_final_modi_select.x_day.modiaddtimeslot : [];
    }
    modiaddtimeslot = modiaddtimeslot != '' ? modiaddtimeslot.replaceAll(', ', ',').split(',') : modiaddtimeslot;

    var modiupdatetimeslot = [];
    if(typeof get_final_modi_select.selected_date != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.selected_date.modiupdatetimeslot != "undefined" ? get_final_modi_select.selected_date.modiupdatetimeslot : [];
    }else if(typeof get_final_modi_select.selected_day != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.selected_day.modiupdatetimeslot != "undefined" ? get_final_modi_select.selected_day.modiupdatetimeslot : [];
    }else if(typeof get_final_modi_select.current_date != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.current_date.modiupdatetimeslot != "undefined" ? get_final_modi_select.current_date.modiupdatetimeslot : [];
    }else if(typeof get_final_modi_select.current_day != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.current_day.modiupdatetimeslot != "undefined" ? get_final_modi_select.current_day.modiupdatetimeslot : [];
    }else if(typeof get_final_modi_select.current_time != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.current_time.modiupdatetimeslot != "undefined" ? get_final_modi_select.current_time.modiupdatetimeslot : [];
    }else if(typeof get_final_modi_select.x_day != "undefined"){
        modiupdatetimeslot = typeof get_final_modi_select.x_day.modiupdatetimeslot != "undefined" ? get_final_modi_select.x_day.modiupdatetimeslot : [];
    }
    modiupdatetimeslot = modiupdatetimeslot != '' ? modiupdatetimeslot.replaceAll(', ', ',').split(',') : modiupdatetimeslot;

    if (csSlotWiseData[csSelectedDay]) {
      if (modiaddtimeslot.length > 0 && hasSeleDate) {
        var updatedTimeSlots = [];
        var newTimeSlots = modiaddtimeslot;
        csSlotWiseData[csSelectedDay].forEach(slot => {
          updatedTimeSlots.push(slot);
        });
        newTimeSlots.forEach(label => {
          var exists = updatedTimeSlots.some(slot => slot.slot_value_label === label);
          if (!exists) {
            const template = updatedTimeSlots[0];
            updatedTimeSlots.push(createSlotObject(label, template));
          }
        });
        csSlotWiseData[csSelectedDay] = updatedTimeSlots;
      }
      
      if (modiupdatetimeslot.length > 0 && hasSeleDate) {
        var updatedTimeSlots = [];
        var newTimeSlots = modiupdatetimeslot;
        newTimeSlots.forEach(label => {
          const template = csSlotWiseData[csSelectedDay][0];
          updatedTimeSlots.push(createSlotObject(label, template));
        });
        csSlotWiseData[csSelectedDay] = updatedTimeSlots;
      }
    }
  
    if (csDefaultTime.length > 0) {
      if (modiaddtimeslot.length > 0 && hasSeleDate) {
        var updatedTimeSlots = [];
        var newTimeSlots = modiaddtimeslot;
        csDefaultTime.forEach(slot => {
          updatedTimeSlots.push(slot);
        });
        newTimeSlots.forEach(label => {
          var exists = updatedTimeSlots.some(slot => slot === label.replace('to', '-'));
          if (!exists) {
            updatedTimeSlots.push(label.replace('to', '-'));
          }
        });
        csDefaultTime = updatedTimeSlots;
      }
      
      if (modiupdatetimeslot.length > 0 && hasSeleDate) {
        var updatedTimeSlots = [];
        var newTimeSlots = modiupdatetimeslot;
        newTimeSlots.forEach(label => {
          updatedTimeSlots.push(label.replace('to', '-'));
        });
        csDefaultTime = updatedTimeSlots;
      }
    }
  
    if (dateText) {
        if (csDeliverySetting.time_format == 1) {
            csJq.each(csSlotWiseData[csSelectedDay], function (index, csSlotWiseDataValue) {
                hasdate = 0;
                startStampformat = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(csSlotWiseDataValue.start_time) : csSlotWiseDataValue.start_time + ":00";
                endStampformat = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(csSlotWiseDataValue.end_time) : csSlotWiseDataValue.end_time + ":00";
                csCurrentTimeStamp = new Date(csCurrentDateMDY + " " + csCurrentTime).getTime(),
                csstart_time = new Date(selected_date + " " + startStampformat).getTime(),
                csend_time = new Date(selected_date + " " + endStampformat).getTime(),
                csgGetCurrentTimeStamp = new Date(csCurrentDateMDY + " " + csCurrentTime);
                csnextend_time = csend_time + 3600000;
                var csFirstTimeSelected = "";
                if (hasdate == 0) {
                    csFirstTimeSelected = timeHtmlCode == "" ? "active" : "";
                }
                if (csHideSlots == 1 || csActivepaddingTime == 1) {
                        if (csActivepaddingTime == 1) {
                            if (csCurrentTimeStamp_only == changeTimestamp) {
                                csCurrentTimeStamp = csCurrentTimeStamp + csPaddingTimeMinute * 60000;
                            }else if(csaAllowStoreWorkTime  == 1 && csNextDay == dateText1 && csCurrentTimeStamp >= csCurrentEndtime){
                                csCurrentTimeStamp12 = new Date(csNextDay + " " + csStartWorkTime).getTime();
                                csCurrentTimeStamp = csHideSlotsTime == 1 ? csCurrentTimeStamp12 + 60  + csPaddingTimeMinute  * 60000 : csCurrentTimeStamp12 - 60  + csPaddingTimeMinute  * 60000;
                            }else{
                                csCurrentTimeStamp12 = new Date(csCurrentDateMDY + " " + csCurrentTime);
                                csCurrentTimeStamp = csCurrentTimeStamp12.setHours(csCurrentTimeStamp12.getHours() + csPaddingTimeMinute/60);
                            }
                        }
                        if (csHideSlotsTime == 1) {
                            if (csCurrentTimeStamp <= csend_time || csstart_time > csCurrentTimeStamp) {
                                timeHtmlCode +=
                                    '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-value="' + csSlotWiseDataValue.slot_value_label + '"> ' + csSlotWiseDataValue.slot_value_label + " </label>";
                            }
                        } else {
                            if (csstart_time > csCurrentTimeStamp) {
                                timeHtmlCode +=
                                    '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-value="' + csSlotWiseDataValue.slot_value_label + '"> ' + csSlotWiseDataValue.slot_value_label + " </label>";
                            }

                        }
                } else if (csCurrentTimeStamp <= csend_time || csstart_time > csCurrentTimeStamp) {
                    timeHtmlCode += '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-value="' + csSlotWiseDataValue.slot_value_label + '"> ' + csSlotWiseDataValue.slot_value_label + " </label>";
                }
            });
        } else {
            csJq.each(csDefaultTime, function (index, value) {
                valuestampformat = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(value) : value.split("-")[0].trim() + ":00";
                var csFirstTimeSelected = "";
                if (hasdate == 0) {
                    csFirstTimeSelected = timeHtmlCode == "" ? "active" : "";
                }
                    csCurrentTimeStamp = new Date(csCurrentDateMDY + " " + csCurrentTime).getTime(),
                    valueStamp = new Date(selected_date + " " + valuestampformat).getTime();
                    valueStampNext = valueStamp + 3600000;
                    csgGetCurrentTimeStamp = new Date(csCurrentDateMDY + " " + csCurrentTime);
                    if (csHideSlots == 1 || csActivepaddingTime == 1) {
                        if (csActivepaddingTime == 1) {
                            if (csCurrentTimeStamp_only == changeTimestamp) {
                                csCurrentTimeStamp = csCurrentTimeStamp + csPaddingTimeMinute * 60000;
                            }else if(csaAllowStoreWorkTime  == 1 && csNextDay == dateText1 && csCurrentTimeStamp >= csCurrentEndtime){
                                csCurrentTimeStamp12 = new Date(csNextDay + " " + csStartWorkTime).getTime();
                                csCurrentTimeStamp = csHideSlotsTime == 1 ? csCurrentTimeStamp12 + 60  + csPaddingTimeMinute  * 60000 : csCurrentTimeStamp12 - 60  + csPaddingTimeMinute  * 60000;
                            }else{
                                csCurrentTimeStamp12 = new Date(csCurrentDateMDY + " " + csCurrentTime);
                                csCurrentTimeStamp = csCurrentTimeStamp12.setHours(csCurrentTimeStamp12.getHours() + csPaddingTimeMinute/60);
                            }
                        }
                        if (csHideSlotsTime == 1) {
                            if (csCurrentTimeStamp <= valueStampNext || valueStamp > csCurrentTimeStamp) {
                                timeHtmlCode += '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-value="' + value+ '"> ' + value + " </label>";
                            }
                        }else{
                            if (valueStamp > csCurrentTimeStamp) {
                                timeHtmlCode += '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-hour="' + value + '" data-value="' + value + '"> ' + value + " </label>";
                            }
                        }
                    }else if (csCurrentTimeStamp <= valueStampNext || valueStamp > csCurrentTimeStamp)  {
                        timeHtmlCode += '<label for="t' + index + '" class="t cs-time-picker ' + csFirstTimeSelected + '" data-value="' + value + '"> ' + value + " </label>";
                    }
            });
        }
    }
    if (timeHtmlCode != "") {
        csJq(csTimePickerVal).html(timeHtmlCode);
    } else {
        timeHtmlCode += '<span class="timeslot">Time slot not available</span>';
        csJq(csTimePickerVal).html(timeHtmlCode);
    }
    if(csJq(csTimePickerVal +' .cs-time-picker').length == 1 && csDeliverySetting.is_number_of_orders == false) csJq('.time-body ' +csTimePickerVal+ ' .t[for="t0"]').trigger('click');
    return timeHtmlCode;
}
function onlyUnique(value, index, self) { return self.indexOf(value) === index; }
function range(start, end) { var j = []; var i = start; for (i = start; i <= end; i++) { if(start.charAt(0) == 0 && i != start){ j.push('0'+i); }else{ j.push(i); } } return j; }
function moreInformationText(_this) {
    var csMoreInformation = csJq(_this).data("more_information");
    var csLocationNameText = "<h2>" + csJq(_this).parents("label").find("h6").html() + "</h2>";
    var csLocationAddressText = "<p>" + csJq(_this).parents("label").find("p:first").html() + "</p><p>" + csJq(_this).parents("label").find("p:first").next().html() + "</p>";
    csJq(".cs-more-information-popup .csp-content").html(csMoreInformation);
    csJq(".cs-more-information-popup .csp-title-text").html(csLocationNameText);
    csJq(".cs-more-information-popup .csp-info-text").html(csLocationAddressText);
    csJq(".cs-more-information-popup").show();
    csJq("body").css("overflow", "hidden");
}
function removeMoreInformationText() { csJq("body").css("overflow", ""); csJq(".cs-more-information-popup").hide(); }
function strip(html){ let doc = new DOMParser().parseFromString(html, 'text/html'); return doc.body.textContent || "";}
function htmlDataWidget(result_data){
    if(result_data == '' || result_data == null || result_data == undefined) return false;
    var generalData  = result_data.generalSettingData;    
    var kmOrMi = generalData && generalData.gen_search_measurement_type != 0 ? 'mi' : 'km';
    var csShippingDeliveryCombine = result_data.generalSettingData.gen_combine_ship_delivery;
    var htmlData = `<style>
    ${typeof csShippingDeliveryCombine != 'undefined' && csShippingDeliveryCombine == 1 ? `
    .cs-tab_last[rel="cs-tab1"] {
      display: none !important;
    }
    .cs-tab_container {
      display: flex;
      flex-direction: column;
    }
    div#cs-tab1 {
      order: 2;
    }
    div#cs-tab2 {
      order: 1;
    }
    div#cs-tab3 {
      order: 3;
    }` : ``}
    #cs-location-list .cs-radio-card h6{
        color:  ${generalData != '' && generalData.gen_default_text_color != '' ? generalData.gen_default_text_color :'#000000'};
    }
    #cs-location-list .cs-radio-card.csactive h6{
        color:${generalData != '' && generalData.gen_active_text_color != '' ? generalData.gen_active_text_color :'#000000'};
    }
    .CS-custom-tab-section .cs-tab_container .tab_drawer_heading, .CS-custom-tab-section .cs-crawler-tabs li,#cs-location-list .cs-radio-card {
        background-color: ${generalData != '' && generalData.gen_default_background_color != '' ? generalData.gen_default_background_color :'#d9d9d9'};
        color:  ${generalData != '' && generalData.gen_default_text_color != '' ? generalData.gen_default_text_color :'#000000'};
    }
    .CS-custom-tab-section .tab_drawer_heading.d_active, 
    .CS-custom-tab-section .cs-crawler-tabs li.active,
    #cs-location-list .cs-radio-card.csactive{
        background-color: ${generalData != '' && generalData.gen_active_background_color != '' ? generalData.gen_active_background_color :'#ffffff'};
        color:${generalData != '' && generalData.gen_active_text_color != '' ? generalData.gen_active_text_color :'#000000'};
    }
    #cs-location-list .cs-radio-card.csactive svg,#cs-location-list .cs-radio-card:hover svg{
        stroke:${generalData != '' && generalData.gen_active_text_color != '' ? generalData.gen_active_text_color :'#000000'}
    }
    .CS-custom-tab-section .cs-crawler-tabs li:hover,
    #cs-location-list .cs-radio-card:hover {
        background-color: ${generalData != '' && generalData.gen_hover_background_color != '' ? generalData.gen_hover_background_color :'#faeeee'};
        color: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }
    #cs-location-list .cs-radio-card:hover h6 {
        color: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }
    .CS-custom-tab-section .cs-tab_container .cs-tab_last svg path, .CS-custom-tab-section .cs-crawler-tabs svg path,.cs-map-content svg,.cs-map-content svg path {
        fill: ${generalData != '' && generalData.gen_default_text_color != '' ? generalData.gen_default_text_color :'#000000'};
    }
    .CS-custom-tab-section .tab_drawer_heading.d_active svg path, .CS-custom-tab-section .cs-crawler-tabs li.active svg path {
        fill: ${generalData != '' && generalData.gen_active_text_color != '' ? generalData.gen_active_text_color :'#000000'};
    }
    .CS-custom-tab-section .cs-crawler-tabs li:hover svg path,.cs-map-content button.csIgnoreCngEvent:hover svg ,.cs-map-content button.csIgnoreCngEvent:hover svg path {
        fill: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }

    .CS-custom-tab-section .cs-tab_container .cs-check-icon svg , .CS-custom-tab-section .cs-crawler-tabs .cs-check-icon svg  {
        stroke: ${generalData != '' && generalData.gen_default_text_color != '' ? generalData.gen_default_text_color :'#000000'};
    }
    .CS-custom-tab-section .tab_drawer_heading.d_active .cs-check-icon svg, .CS-custom-tab-section .cs-crawler-tabs li.active .cs-check-icon svg{
        stroke: ${generalData != '' && generalData.gen_active_text_color != '' ? generalData.gen_active_text_color :'#000000'};
    }
    .CS-custom-tab-section .cs-crawler-tabs li:hover .cs-check-icon svg {
        stroke: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }
    
    .postal-code button,.cs-map-content button.csIgnoreCngEvent {
        background-color:  ${generalData != '' && generalData.gen_default_background_color != '' ? generalData.gen_default_background_color :'#d9d9d9'};
        color: ${generalData != '' && generalData.gen_default_text_color != '' ? generalData.gen_default_text_color :'#000000'};
    }
    .postal-code button:hover,.cs-map-content button.csIgnoreCngEvent:hover {
        background-color: ${generalData != '' && generalData.gen_hover_background_color != '' ? generalData.gen_hover_background_color :'#faeeee'};
        color: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }
    .sbzdiscount button {
        background-color: ${generalData != '' && generalData.gen_hover_background_color != '' ? generalData.gen_hover_background_color :'#faeeee'};
        color: ${generalData != '' && generalData.gen_hover_text_color != '' ? generalData.gen_hover_text_color :'#000000'};
    }
    .cs-tab_last[rel="cs-tab1"]{
        order:${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1}
    }
    .cs-tab_last[rel="cs-tab2"]{
        order:${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l')+1}
    }
    .cs-tab_last[rel="cs-tab3"]{
        order:${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('p')+1}
    }
</style>
<div class="CS-custom-tab-section tab-view quality-sticker-tab ${generalData.layout_style_selection != '' ? 'cs-layout-tab-'+generalData.layout_style_selection : 'cs-layout-tab-0'}">
    <ul class="cs-tabs cs-crawler-tabs cs-text-center">
        <li class="cs-tab_last ${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('s')+1 == 1 && csShippingDeliveryCombine != 1 ? 'active' : ''}" rel="cs-tab1" style="display: none;">
            <div class="cs-check-icon">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="circleOkIconTitle" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">  <polyline points="7 13 10 16 17 9"/> <circle cx="12" cy="12" r="10"/> </svg>
             </div>
            <svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M397.832 378.785L493.547 283.074C441.957 231.484 414.781 204.312 372.102 161.625H350.363V176.625H365.887L376.902 187.641L302.402 262.141L291.387 251.129V190.867L305.625 176.625H310.227V161.625H299.41L276.387 184.652V257.34L397.832 378.785ZM387.508 198.25L472.332 283.074L397.832 357.574L313.008 272.75L387.508 198.25Z"
                    fill="black"
                ></path>
                <path
                    d="M413.922 228.789L379.035 229.574L380.105 277.406L357.738 275.008L354.023 309.707L415.883 316.332L413.922 228.789ZM370.535 296.387L371.059 291.52L395.484 294.137L394.367 244.234L399.262 244.125L400.504 299.598L370.535 296.387Z"
                    fill="black"
                ></path>
                <path
                    d="M447.395 375.344L248.199 490.348V260.188L267.633 248.98L260.141 235.984L240.699 247.195L181.949 213.32L220.445 191.094C231.754 202.621 245.777 212.395 261.285 218.129L266.488 204.059C254.973 199.801 243.762 192.656 233.922 183.312L312.25 138.09C323.535 157.406 328.84 183.949 313.738 199.051C311.031 201.762 307.793 203.914 304.121 205.453L309.922 219.289C315.398 216.992 320.254 213.754 324.348 209.66C344.812 189.195 340.055 156.016 325.23 130.594L381.059 98.3672L439.891 132.336L391.273 160.371L398.766 173.363L447.395 145.32V230.027H462.398V128.012L240.699 0L19 128.012V384.004L240.695 512L462.395 384.004V336.121H447.391V375.344H447.395ZM107.844 187.902C117.711 193.594 145.977 209.891 159.355 217.605V261.645L107.844 232.297V187.902ZM166.938 204.664C154.105 197.262 128.934 182.75 115.398 174.941L257.262 93.0391C275.367 98.5586 291.879 111.113 303.68 125.715L166.938 204.664ZM211.973 101.863C216.727 95.9258 223.344 92.3398 230.969 90.8945L211.973 101.863ZM316.805 118.137C305.664 103.766 290.688 91.2109 273.918 83.418L314.539 59.9688L366.051 89.707L316.805 118.137ZM299.547 51.3008L255.094 76.9688C219.672 69.125 195.5 87.3203 190.742 114.121L100.391 166.289C72.8789 150.426 46.9688 135.484 41.5078 132.336L240.699 17.3203L299.547 51.3008ZM34 145.324C39.3906 148.43 65.4219 163.441 92.8438 179.254V241.012L174.355 287.453V226.254L233.195 260.188V490.348L34 375.344V145.324Z"
                    fill="black"
                ></path>
                <path
                    d="M151.098 434.918L125.117 419.918L132.617 406.93L158.598 421.93L151.098 434.918ZM116.457 414.918L103.465 407.418L110.965 394.43L123.957 401.93L116.457 414.918ZM94.8047 402.418L81.8125 394.918L89.3125 381.926L102.305 389.43L94.8047 402.418Z"
                    fill="black"
                ></path>
            </svg> <span>${generalData != '' && generalData.gen_shipping_heading != '' ? generalData.gen_shipping_heading :'Shipping'}</span>
        </li>
        <li rel="cs-tab2" class="cs-tab_last ${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('l')+1 == 1 ? 'active' : ''}" style="display: none;">
            <div class="cs-check-icon">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="circleOkIconTitle" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">  <polyline points="7 13 10 16 17 9"/> <circle cx="12" cy="12" r="10"/> </svg>
             </div>
            <svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M476.158 231.363L462.899 178.328C466.524 177.558 469.244 174.342 469.244 170.489V161.938C469.244 143.372 454.139 128.268 435.574 128.268H375.182V110.63C375.182 101.494 367.75 94.062 358.614 94.062H50.772C41.636 94.062 34.204 101.494 34.204 110.63V256C34.204 260.427 37.793 264.017 42.221 264.017C46.648 264.017 50.238 260.428 50.238 256V110.63C50.238 110.335 50.477 110.096 50.772 110.096H358.613C358.908 110.096 359.147 110.335 359.147 110.63V256.002C359.147 260.429 362.736 264.019 367.164 264.019C371.591 264.019 375.181 260.43 375.181 256.002V246.914H469.75C469.758 246.914 469.764 246.916 469.771 246.916C469.779 246.916 469.786 246.915 469.793 246.915C481.43 246.923 491.311 254.561 494.705 265.086H469.777C465.35 265.086 461.76 268.675 461.76 273.103V290.205C461.76 304.056 473.028 315.324 486.879 315.324H495.965V350.597H475.003C468.117 330.714 449.216 316.392 427.021 316.392C404.826 316.392 385.924 330.714 379.039 350.597H375.179V290.204C375.179 285.777 371.59 282.187 367.162 282.187C362.735 282.187 359.145 285.776 359.145 290.204V350.595H192.817C185.931 330.712 167.03 316.39 144.835 316.39C122.64 316.39 103.738 330.712 96.853 350.595H50.772C50.477 350.595 50.238 350.356 50.238 350.061V332.424H84.977C89.404 332.424 92.994 328.835 92.994 324.407C92.994 319.979 89.405 316.39 84.977 316.39H8.017C3.59 316.39 0 319.979 0 324.407C0 328.835 3.589 332.424 8.017 332.424H34.205V350.061C34.205 359.197 41.637 366.629 50.773 366.629H94.077C94.075 366.807 94.063 366.984 94.063 367.163C94.063 395.159 116.84 417.935 144.835 417.935C172.83 417.935 195.607 395.159 195.607 367.163C195.607 366.983 195.595 366.807 195.593 366.629H376.263C376.261 366.807 376.249 366.984 376.249 367.163C376.249 395.159 399.026 417.935 427.021 417.935C455.016 417.935 477.793 395.159 477.793 367.163C477.793 366.983 477.781 366.807 477.779 366.629H503.982C508.409 366.629 511.999 363.04 511.999 358.612V273.101C512 251.989 496.423 234.448 476.158 231.363ZM375.182 144.301H435.574C445.299 144.301 453.211 152.213 453.211 161.938V162.472H375.182V144.301ZM375.182 230.881V178.505H446.417L459.511 230.881H375.182ZM144.835 401.904C125.68 401.904 110.096 386.321 110.096 367.165C110.096 348.009 125.68 332.426 144.835 332.426C163.99 332.426 179.574 348.009 179.574 367.165C179.574 386.321 163.99 401.904 144.835 401.904ZM427.023 401.904C407.868 401.904 392.284 386.321 392.284 367.165C392.284 348.009 407.868 332.426 427.023 332.426C446.178 332.426 461.762 348.009 461.762 367.165C461.762 386.321 446.178 401.904 427.023 401.904ZM495.967 299.29H486.881C481.871 299.29 477.795 295.214 477.795 290.204V281.118H495.966V299.29H495.967Z"
                    fill="black"
                ></path>
                <path
                    d="M144.835 350.597C135.699 350.597 128.267 358.029 128.267 367.165C128.267 376.301 135.699 383.733 144.835 383.733C153.971 383.733 161.403 376.301 161.403 367.165C161.403 358.029 153.971 350.597 144.835 350.597Z"
                    fill="black"
                ></path>
                <path
                    d="M427.023 350.597C417.887 350.597 410.455 358.029 410.455 367.165C410.455 376.301 417.887 383.733 427.023 383.733C436.159 383.733 443.591 376.301 443.591 367.165C443.591 358.029 436.159 350.597 427.023 350.597Z"
                    fill="black"
                ></path>
                <path
                    d="M332.96 316.393H213.244C208.817 316.393 205.227 319.982 205.227 324.41C205.227 328.838 208.816 332.427 213.244 332.427H332.96C337.387 332.427 340.977 328.838 340.977 324.41C340.977 319.982 337.388 316.393 332.96 316.393Z"
                    fill="black"
                ></path>
                <path
                    d="M127.733 282.188H25.1191C20.6921 282.188 17.1021 285.777 17.1021 290.205C17.1021 294.633 20.6911 298.222 25.1191 298.222H127.733C132.16 298.222 135.75 294.633 135.75 290.205C135.75 285.777 132.16 282.188 127.733 282.188Z"
                    fill="black"
                ></path>
                <path
                    d="M278.771 173.37C275.641 170.24 270.564 170.24 267.434 173.371L196.142 244.662L159.055 207.575C155.924 204.444 150.848 204.444 147.718 207.575C144.587 210.706 144.587 215.781 147.718 218.912L190.474 261.668C192.039 263.234 194.091 264.016 196.142 264.016C198.193 264.016 200.246 263.234 201.81 261.668L278.77 184.708C281.901 181.576 281.901 176.501 278.771 173.37Z"
                    fill="black"
                ></path>
            </svg><span> ${generalData != '' && generalData.gen_local_delivery_heading != '' ? generalData.gen_local_delivery_heading :'Local Delivery'}</span>
        </li>
        <li rel="cs-tab3" class="cs-tab_last ${result_data.generalSettingData.arrange_layout_order.split(',').indexOf('p')+1 == 1 ? 'active' : ''}" style="display: none;">
            <div class="cs-check-icon">
                <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="circleOkIconTitle" stroke="#000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">  <polyline points="7 13 10 16 17 9"/> <circle cx="12" cy="12" r="10"/> </svg>
            </div>
            <svg width="30" height="30" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M502.417 492.834H463.045V240.169C476.666 237.768 489.01 230.657 497.919 220.077C506.827 209.498 511.734 196.123 511.781 182.292C511.781 182.084 511.737 181.893 511.721 181.69C511.707 181.42 511.679 181.152 511.639 180.885C511.566 180.401 511.456 179.923 511.31 179.456C511.261 179.308 511.255 179.149 511.201 179.001L447.992 6.2865C447.317 4.4433 446.092 2.85193 444.482 1.7276C442.873 0.603271 440.958 0.000220853 438.995 0H73.0052C71.0418 0.00144666 69.1261 0.6049 67.5164 1.72899C65.9067 2.85308 64.6803 4.44374 64.0027 6.2865L0.821388 179.001C0.766629 179.149 0.76115 179.302 0.711867 179.456C0.56648 179.924 0.454855 180.401 0.377841 180.885C0.339509 181.153 0.317606 181.433 0.301178 181.69C0.28475 181.947 0.235461 182.084 0.235461 182.292C0.26117 196.479 5.40989 210.179 14.734 220.87C24.0581 231.562 36.9301 238.526 50.981 240.481V492.834H9.58289C7.04135 492.834 4.60391 493.843 2.80677 495.641C1.00963 497.438 0 499.875 0 502.417C0 504.958 1.00963 507.396 2.80677 509.193C4.60391 510.99 7.04135 512 9.58289 512H502.417C504.959 512 507.396 510.99 509.193 509.193C510.99 507.396 512 504.958 512 502.417C512 499.875 510.99 497.438 509.193 495.641C507.396 493.843 504.959 492.834 502.417 492.834V492.834ZM452.975 221.933C444.124 221.926 435.528 218.965 428.549 213.521C421.57 208.076 416.607 200.459 414.446 191.875H491.432C489.248 200.433 484.288 208.025 477.33 213.464C470.371 218.902 461.806 221.881 452.975 221.933V221.933ZM295.301 172.709H216.699L222.109 19.1552H289.885L295.301 172.709ZM294.474 191.875C292.334 200.463 287.383 208.088 280.409 213.537C273.435 218.986 264.839 221.946 255.989 221.946C247.139 221.946 238.543 218.986 231.569 213.537C224.595 208.088 219.644 200.463 217.504 191.875H294.474ZM432.325 19.1552L488.514 172.709H411.873L402.563 115.063L387.05 19.1552H432.325ZM367.665 19.1552L376.974 76.8016L392.477 172.709H314.483L309.593 34.1651L309.045 19.1662L367.665 19.1552ZM392.986 191.875C390.848 200.466 385.897 208.093 378.923 213.545C371.948 218.996 363.351 221.957 354.498 221.957C345.646 221.957 337.049 218.996 330.074 213.545C323.1 208.093 318.149 200.466 316.011 191.875H392.986ZM202.423 34.1651L197.539 172.709H119.545L135.048 76.8016L144.357 19.1552H202.949L202.423 34.1651ZM196.017 191.875C193.878 200.466 188.928 208.093 181.953 213.545C174.979 218.996 166.381 221.957 157.529 221.957C148.677 221.957 140.079 218.996 133.105 213.545C126.13 208.093 121.18 200.466 119.041 191.875H196.017ZM79.7022 19.1552H124.95L109.448 115.063L100.138 172.709H23.5137L79.7022 19.1552ZM20.5348 191.875H97.4717C95.3486 200.223 90.5775 207.659 83.8732 213.067C77.169 218.475 68.8927 221.565 60.2846 221.873C59.9725 221.873 59.3318 221.873 59.0251 221.933C50.1779 221.927 41.5864 218.966 34.6134 213.521C27.6405 208.075 22.6856 200.457 20.5348 191.875V191.875ZM109.113 492.834V291.408H208.54V492.834H109.113ZM227.706 492.834V281.825C227.704 279.284 226.694 276.847 224.897 275.05C223.101 273.254 220.664 272.243 218.123 272.242H99.5306C96.9895 272.243 94.5529 273.254 92.7561 275.05C90.9593 276.847 89.9492 279.284 89.9477 281.825V492.834H70.1303V239.977C77.8952 238.549 85.2883 235.555 91.8594 231.179C98.4304 226.802 104.042 221.134 108.352 214.519C113.698 222.699 121.001 229.415 129.599 234.059C138.197 238.704 147.818 241.128 157.589 241.114C167.361 241.1 176.975 238.647 185.559 233.979C194.144 229.31 201.427 222.572 206.749 214.377C212.078 222.584 219.374 229.33 227.974 233.999C236.573 238.669 246.203 241.115 255.989 241.115C265.775 241.115 275.405 238.669 284.005 233.999C292.604 229.33 299.9 222.584 305.229 214.377C310.557 222.584 317.853 229.33 326.453 233.999C335.052 238.669 344.683 241.115 354.468 241.115C364.254 241.115 373.884 238.669 382.484 233.999C391.083 229.33 398.379 222.584 403.708 214.377C408.218 221.269 414.123 227.139 421.043 231.607C427.962 236.075 435.742 239.042 443.879 240.317V492.834H227.706Z"
                    fill="black"
                ></path>
                <path
                    d="M412.551 272.242H258.831C256.289 272.242 253.852 273.252 252.055 275.049C250.258 276.846 249.248 279.284 249.248 281.825V395.486C249.247 396.745 249.495 397.991 249.976 399.154C250.457 400.317 251.163 401.374 252.053 402.264C252.943 403.154 254 403.86 255.163 404.341C256.326 404.823 257.572 405.07 258.831 405.069H412.551C413.81 405.07 415.056 404.823 416.219 404.341C417.382 403.86 418.439 403.154 419.329 402.264C420.219 401.374 420.925 400.317 421.406 399.154C421.888 397.991 422.135 396.745 422.134 395.486V281.825C422.134 279.284 421.125 276.846 419.328 275.049C417.53 273.252 415.093 272.242 412.551 272.242ZM402.969 385.903H268.414V291.408H402.969V385.903Z"
                    fill="black"
                ></path>
            </svg> <span>${generalData != '' && generalData.gen_store_pickup_heading != '' ? generalData.gen_store_pickup_heading :'Store Pickup' }</span>
        </li>
    </ul>
    <div class="cs-tab_container">
        <div id="cs-tab1" class="cs-tab_content" ${csShippingDeliveryCombine == 1 ? `style="display: none;"` : ``}>
            <div class="tab-inner-content">
                <p>${generalData != '' && generalData.gen_shipping_instruction != '' ? generalData.gen_shipping_instruction :'Please click checkout button and continue.'}</p>`
                                if(generalData != '' && generalData.calendar_display_style == 1){
                                    htmlData +=   ` <div class="input-block datePicker csIgnoreCngEvent" id="csShippingpicker">
                                    <div class="date-picker-heading">
                                        <span>${generalData.gen_loc_calendar_heading != '' ? generalData.gen_loc_calendar_heading : 'Select Delivery Date'}</span>
                                    </div>
                                    </div>`
                                } else {  
                                    htmlData +=  `<input type="text" class="input-block datePicker needsclick csIgnoreCngEvent" id="csShippingpicker" placeholder="${generalData.gen_shipping_calendar_heading  != '' ? generalData.gen_shipping_calendar_heading : 'Select Shipping Delivery Date'}" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/calender.svg') "/>`
                                }
                                htmlData += ` <div class="select-block" style="display: none;">
                        <input type="text" class="timePicker csIgnoreCngEvent" id="csTimeShippingPicker" value="" placeholder="${generalData.gen_shipping_timer_heading != '' ? generalData.gen_shipping_timer_heading : 'Select Shipping Delivery Time'}" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/down-arrow.svg')"/>
                        <div class="time-block" style="display: none;">
                        <div class="time-header">
                        <a class="close-time-slot">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </a>
                        </div>
                        <div class="time-body">
                        <div class="multiple-input" id="csTimeShippingVal">
                        </div>
                        </div>
                        </div>
                        </div>
                    <div class="error-cls" style="display: none;">
                            <span id="shippingpostal-code-error">${generalData.gen_loc_zip_error_message_text != ''  ? generalData.gen_loc_zip_error_message_text : 'Entered postal/zip code is not available for Local delivery'}</span>
                        </div>
                <div class="error-cls" style="display: none;">
                    <span class="shipping-time-error"></span>
                </div>
            </div>
        </div>
        <div id="cs-tab2" class="cs-tab_content" style="display: none;">
            <div class="local-delivery-block">
                <div class="tab-inner-content">
                    <p>${generalData != '' && generalData.gen_local_delivery_instruction != '' ? generalData.gen_local_delivery_instruction :'Enter your postal code into the field below to check if you are eligible for local delivery.'}</p>                        
                    <div class="shipping-option">
                        <div class="postal-code">
                            <input type="text" id="postal_code" value="" class="csIgnoreCngEvent" placeholder="${generalData.gen_loc_zip_textbox_placeholder_title != ''  ? generalData.gen_loc_zip_textbox_placeholder_title : 'Enter your postal/zip code'}" autocomplete="off"/>
                            <button type="button" name="zip_search" id="zip_search">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search">
                                    <circle cx="11" cy="11" r="8"></circle>
                                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                                </svg>
                            </button>
                        </div>`
                        if(result_data.generalSettingData.gen_location_type == 2){
                            htmlData +=  `<div class="autoupdatecity"></div>`
                        }
                        htmlData += `<div class="error-cls" style="display: none;">
                            <span id="postal-code-error">${generalData.gen_loc_zip_error_message_text != '' ? generalData.gen_loc_zip_error_message_text : 'Entered postal/zip code is not available for Local delivery'}</span>
                        </div>
                        <div class="search-content-wrap">
                            <div class="input-content-block datepicker-block" style="display: none;">`
                              if( generalData != '' &&  generalData.calendar_display_style == 1) {  
                                    htmlData +=  `<div class="date-picker-heading">
                                        <span>${generalData.gen_loc_calendar_heading != '' ? generalData.gen_loc_calendar_heading : 'Select Delivery Date'}</span>
                                    </div>
                                    <div class="input-block datePicker csIgnoreCngEvent" id="csDatepicker"></div>`
                                } else {  
                                    htmlData +=   `<input type="text" class="input-block datePicker needsclick csIgnoreCngEvent" id="csDatepicker" placeholder="${generalData.gen_loc_calendar_heading != '' ? generalData.gen_loc_calendar_heading : 'Select Delivery Date'}" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/calender.svg');"/>`
                                 }                                
                                htmlData += `</div>
                            <div class="error-cls" style="display: none;">
                                <span class="delivery-date-error"></span>
                            </div>
                            <div class="select-block" style="display: none;">
                                <input type="text" class="timePicker csIgnoreCngEvent" id="csTimePicker" value="" placeholder="${generalData.gen_loc_timer_heading != '' ? generalData.gen_loc_timer_heading : 'Select Pickup Time' }" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/down-arrow.svg');"/>
                                <div class="time-block" style="display: none;">
                                    <div class="time-header">
                                        <a class="close-time-slot">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                        </a>
                                    </div>
                                    <div class="time-body">
                                         <div class="multiple-input" id="csTimePickerVal">
                                         </div>
                                    </div>
                                </div>
                            </div>
                            <div class="error-cls" style="display: none;">
                                <span class="delivery-time-error"></span>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </div>
        <div id="cs-tab3" class="cs-tab_content" style="display: none;">
            <div class="tab-inner-content">
                <p>${generalData != '' && generalData.gen_store_pickup_instruction != '' ? generalData.gen_store_pickup_instruction :'Find your nearest pickup location.' }</p>
                <div class="cs-map-content" style="display: none;">
                    <div id="cs-map" style="height: 250px;"></div>
                    <div style="display: flex; margin-bottom: 10px;">
                        <input type="text" class="csIgnoreCngEvent" id="map-zipcode" placeholder="${generalData != '' && generalData.gen_zipcode_search_text != '' ? generalData.gen_zipcode_search_text : 'Enter postal/zip code'}">
                    <input type="hidden" id="cs-measurement_type" value="${kmOrMi}" class="csIgnoreCngEvent">
                        <select id="map-search-radius" class="csIgnoreCngEvent">
                            <option value="5">5 ${kmOrMi}</option>
                            <option value="10">10 ${kmOrMi}</option>
                            <option value="50">50 ${kmOrMi}</option>
                            <option value="100">100 ${kmOrMi}</option>
                        </select>
                        <button type="button" class="csIgnoreCngEvent" value="Search" onclick="zipCodeSearch()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="width: 17px;"><path d="M2 8c0-3.309 2.691-6 6-6s6 2.691 6 6-2.691 6-6 6-6-2.691-6-6zm17.707 10.293l-5.395-5.396A7.946 7.946 0 0016 8c0-4.411-3.589-8-8-8S0 3.589 0 8s3.589 8 8 8a7.954 7.954 0 004.897-1.688l5.396 5.395A.998.998 0 0020 19a1 1 0 00-.293-.707z" fill="#5C5F62"/></svg>
                        </button>
                        <button type="button" class="csIgnoreCngEvent" value="Reset" onclick="zipCodeClear()">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" style="width: 17px;"><path d="M17 9a1 1 0 01-1-1c0-.551-.448-1-1-1H5.414l1.293 1.293a.999.999 0 11-1.414 1.414l-3-3a.999.999 0 010-1.414l3-3a.997.997 0 011.414 0 .999.999 0 010 1.414L5.414 5H15c1.654 0 3 1.346 3 3a1 1 0 01-1 1zM3 11a1 1 0 011 1c0 .551.448 1 1 1h9.586l-1.293-1.293a.999.999 0 111.414-1.414l3 3a.999.999 0 010 1.414l-3 3a.999.999 0 11-1.414-1.414L14.586 15H5c-1.654 0-3-1.346-3-3a1 1 0 011-1z" fill="#5C5F62"/></svg>
                        </button>
                    </div>
                </div>
                <div class="cs-radio-card-block" id="cs-location-list"></div>
                <div class="search-content-wrap">
                    <div class="input-content-block datepicker-block" style="display: none;">`
                         if(generalData != '' && generalData.calendar_display_style == 1) {
                            htmlData +=  `<div class="date-picker-heading"><span>${ generalData.gen_pickup_calendar_heading != '' ? generalData.gen_pickup_calendar_heading : 'Select Delivery Date'}</span></div>
                            <div class="input-block datePicker csIgnoreCngEvent" id="csDatepicker1"></div>`
                         } else { 
                            htmlData +=  `<input type="text" class="input-block datePicker needsclick csIgnoreCngEvent" id="csDatepicker1" placeholder="${generalData.gen_pickup_calendar_heading != ''  ? generalData.gen_pickup_calendar_heading : 'Select Pickup Date'}" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/calender.svg');"/>`
                         } 
                         htmlData += `</div>
                    <div class="error-cls" style="display: none;">
                        <span class="delivery-date-error"></span>
                    </div>
                    <div class="select-block" style="display: none;">
                        <input type="text" class="timePicker csIgnoreCngEvent" id="csTimePicker1" value="" placeholder="${generalData.gen_pickup_timer_heading != ''  ? generalData.gen_pickup_timer_heading : 'Select Pickup Time' }" readonly style="background-image:url('${csShippingAppBaseUrl}assets/images/down-arrow.svg');"/>
                        <div class="time-block" style="display: none;">
                            <div class="time-header">
                                <a class="close-time-slot">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </a>
                            </div>
                            <div class="time-body">
                                    <div class="multiple-input" id="csTimePickerVal1">
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="error-cls" style="display: none;">
                        <span class="delivery-time-error"></span>
                    </div>`
                    htmlData += `<div id="customer-information" style="display:none">`
                    if(generalData.gen_pickup_first_name_text != null && generalData.gen_pickup_first_name_text.trim() != ''){
                        htmlData += `<div class="info-outer"><input type="text" class="customerinfo"  name="pickup-first-name" placeholder="${generalData.gen_pickup_first_name_text}"></div>`
                    }
                    if(generalData.gen_pickup_last_name_text != null && generalData.gen_pickup_last_name_text.trim() != ''){
                        htmlData += `<div class="info-outer"><input type="text" class="customerinfo" name="pickup-last-name" placeholder="${generalData.gen_pickup_last_name_text}"></div>`
                    }
                    if(generalData.gen_pickup_phone_text != null && generalData.gen_pickup_phone_text.trim() != ''){
                        htmlData += `<div class="info-outer"><input type="text" class="customerinfo" name="pickup-number" placeholder="${generalData.gen_pickup_phone_text}"></div>`
                    }
                    if(generalData.gen_pickup_email_text != null && generalData.gen_pickup_email_text.trim() != ''){
                        htmlData += `<div class="info-outer"><input type="email" class="customerinfo" name="pickup-email" placeholder="${generalData.gen_pickup_email_text}"></div>`
                    }
                    if(generalData.gen_pickup_discount_textbox_text != null && generalData.gen_pickup_discount_textbox_text.trim() != '' && generalData.gen_pickup_discount_button_text != null && generalData.gen_pickup_discount_button_text.trim() != ''){
                        htmlData += `<div class="info-outer"><div class="sbzdiscount"><input type="text" class="customerinfo" name="pickup-discount" placeholder="${generalData.gen_pickup_discount_textbox_text}"><button type="button">${generalData.gen_pickup_discount_button_text}</button></div><div class="sucess-error"></div></div>`
                    }
                    htmlData += `</div>
                </div>
            </div>
        </div>
    </div>
    <div id="required-error"></div>
    <input type="hidden" name="attributes[Type Of Order]" data-name="Type Of Order" class="csIgnoreCngEvent" id="csOrderTypeValue" value="Shipping">
    <input type="hidden" name="attributes[${generalData.gen_loc_day_text}]" data-name="${generalData.gen_loc_day_text}"   class="csIgnoreCngEvent" id="csDeliveryDayValue">
    <input type="hidden" name="attributes[${generalData.gen_loc_date_text}]" data-name="${generalData.gen_loc_date_text}"   class="csIgnoreCngEvent" id="csDeliveryDateValue">
    <input type="hidden" name="attributes[${generalData.gen_loc_time_text}]" data-name="${generalData.gen_loc_time_text}"  class="csIgnoreCngEvent" id="csDeliveryTimeValue">
    <input type="hidden" name="attributes[${generalData.gen_pickup_day_text}]" data-name="${generalData.gen_pickup_day_text}"  class="csIgnoreCngEvent" id="csPickupDayValue">
    <input type="hidden" name="attributes[${generalData.gen_pickup_date_text}]" data-name="${generalData.gen_pickup_date_text}"  class="csIgnoreCngEvent" id="csPickupDateValue">
    <input type="hidden" name="attributes[${generalData.gen_pickup_time_text}]" data-name="${generalData.gen_pickup_time_text}"  class="csIgnoreCngEvent" id="csPickupTimeValue">
    <input type="hidden" name="attributes[${generalData.gen_shipping_day_text}]" data-name="${generalData.gen_shipping_day_text}"  class="csIgnoreCngEvent" id="csShippingDayValue">
    <input type="hidden" name="attributes[${generalData.gen_shipping_date_text}]" data-name="${generalData.gen_shipping_date_text}"  class="csIgnoreCngEvent" id="csShippingDateValue">
    <input type="hidden" name="attributes[${generalData.gen_shipping_time_text}]" data-name="${generalData.gen_shipping_time_text}"  class="csIgnoreCngEvent" id="csShippingTimeValue">
    <input type="hidden" name="attributes[Pickup Address]" data-name="Pickup Address" class="csIgnoreCngEvent" id="csLocationAddress1">
    <input type="hidden" name="checkout[shipping_address][address1]" class="csIgnoreCngEvent" id="csShippingAddress1">
    <input type="hidden" name="checkout[shipping_address][address2]" class="csIgnoreCngEvent" id="csShippingAddress2">
    <input type="hidden" name="checkout[shipping_address][city]" class="csIgnoreCngEvent" id="csShippingCity">
    <input type="hidden" name="checkout[shipping_address][country]" class="csIgnoreCngEvent" id="csShippingCountry">
    <input type="hidden" name="checkout[shipping_address][province]" class="csIgnoreCngEvent" id="csShippingProvince">
    <input type="hidden" name="checkout[shipping_address][zip]" class="csIgnoreCngEvent" id="csShippingZip">
    <input type="hidden" class="csIgnoreCngEvent" name="attributes[LocationId]"  data-name="LocationId" id="csLocationId">
    <input type="hidden" name="attributes[zip]" data-name="zip"  class="csIgnoreCngEvent" id="csDeliveryZipValue">
    <input type="hidden" name="attributes[Pickup Location]" data-name="Pickup Location" class="csIgnoreCngEvent" id="csDeliveryLocationValue" value="">
    <div class="cs-more-information-popup" style="display:none;">
        <div class="cs-bg">&nbsp;</div> 
        <div class="cs-pop-up">
            <div class="cs-pop-up-wrp">
                <div class="cs-title-wrap">
                    <div class="csp-title">
                    <div class="csp-title-text"></div>
                    <div class="csp-close-btn" onclick="removeMoreInformationText();">
                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11.414 10l6.293-6.293a1 1 0 10-1.414-1.414L10 8.586 3.707 2.293a1 1 0 00-1.414 1.414L8.586 10l-6.293 6.293a1 1 0 101.414 1.414L10 11.414l6.293 6.293A.998.998 0 0018 17a.999.999 0 00-.293-.707L11.414 10z" fill="#5C5F62"/></svg>
                    </div>
                    </div>
                    <div class="csp-info-text"></div>
                </div>
                <div class="csp-content"></div>
            </div>
        </div>
    </div>
</div>`;
return htmlData;
}
function dateBetweenWorkingDays(weekDayArr, gen_disable_holidays, currentDate, currentTime, minimum_interval_day, cut_off_time,cutoffdate) {
    var currentDateTime = currentDate + ' ' + currentTime;
    currentTime = result_data.generalSettingData.gen_time_format == 0 ? convertTime12to24(currentTime) : currentTime;
    var holidayArr = gen_disable_holidays != '' ? gen_disable_holidays : [];
    var cutOffTime = result_data.generalSettingData.gen_time_format == 0 && cut_off_time != '' ? convertTime12to24(cut_off_time) : result_data.generalSettingData.gen_time_format == 1 && cut_off_time != '' ? cut_off_time + ":00" : currentTime;
    var oldCurrentDate = new Date(currentDateTime);
    cutOffTime = cutOffTime != '' ? new Date(oldCurrentDate.getFullYear() + '-' + (("0" + (oldCurrentDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (oldCurrentDate.getDate())).slice(-2)) + 'T' + cutOffTime) : '';
    currentDateTime =  oldCurrentDate;
    var d1 = (cut_off_time != '' &&  cutOffTime.getTime() <= oldCurrentDate.getTime() && minimum_interval_day == 0) || (cut_off_time != '' &&  cutOffTime.getTime() <= oldCurrentDate.getTime()  &&  result_data.generalSettingData.gen_cut_off_time_setting == 1 && minimum_interval_day != 0) ? parseFloat(minimum_interval_day) + 1 : parseFloat(minimum_interval_day);
    var startDate = new Date(currentDateTime);
    var endDate = new Date(currentDateTime);
    var weekDay1 = startDate.getDay();
    var weekDate1 = startDate.getFullYear() + '-' + (("0" + (startDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (startDate.getDate())).slice(-2));
        weekDate1 = csDateFormatter(result_data.generalSettingData.gen_date_format, startDate)
    if ((weekDayArr.includes(weekDay1.toString()) === false && result_data.generalSettingData.gen_working_day_setting == 2) || (holidayArr.includes(weekDate1.toString()) !== false && result_data.generalSettingData.gen_working_day_setting == 2)) {
      var d1 =  parseFloat(minimum_interval_day);
    }
    endDate.setDate(endDate.getDate() + d1);
    if (result_data.generalSettingData.gen_non_working_day != null) {
      var nonWorkingDays = result_data.generalSettingData.gen_non_working_day.split(',');
      var skippedDays = {};
      var bothMatchArr = nonWorkingDays.filter(item => !weekDayArr.includes(item));
    }
    if ((result_data.generalSettingData.gen_working_day_setting == 0 && typeof nonWorkingDays != 'undefined' && nonWorkingDays.length > 0) || (typeof nonWorkingDays != 'undefined' && nonWorkingDays.length > 0) && (result_data.generalSettingData.gen_working_day_setting == 1 || result_data.generalSettingData.gen_working_day_setting == 2) && (csDisableDateArray.length == 0 && weekDayArr.length == 7)) {
        WorkDateCheck: while (true) { 
          var weekDay = startDate.getDay();
          var weekDate = startDate.getFullYear() + '-' + (("0" + (startDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (startDate.getDate())).slice(-2));
          weekDate = csDateFormatter(result_data.generalSettingData.gen_date_format, startDate)
          if (nonWorkingDays.includes(startDate.getDay().toString()) !== false) {
            if (!skippedDays[weekDay]) {
              startDate.setDate(startDate.getDate() + 1);
              endDate = new Date(endDate.setDate(endDate.getDate() + 1));
              skippedDays[weekDay] = true;
              continue WorkDateCheck;
            }
          } else {
            if (startDate < endDate) {
              startDate.setDate(startDate.getDate() + 1);
              continue WorkDateCheck;
            }
          } 
          break WorkDateCheck;
        }
    }
    var nonWork = 0;
    if ((result_data.generalSettingData.gen_working_day_setting == 1 || result_data.generalSettingData.gen_working_day_setting == 2) && (csDisableDateArray.length != 0 || weekDayArr.length < 7)) {
        WorkDateCheck: while (true) { 
          var weekDay = startDate.getDay();
          var weekDate = startDate.getFullYear() + '-' + (("0" + (startDate.getMonth() + 1)).slice(-2)) + '-' + (("0" + (startDate.getDate())).slice(-2));
          weekDate = csDateFormatter(result_data.generalSettingData.gen_date_format, startDate)
          if (weekDayArr.includes(weekDay.toString()) === false || holidayArr.includes(weekDate.toString()) !== false) {
            if (typeof nonWorkingDays != 'undefined' && nonWorkingDays.length > 0 && nonWorkingDays.includes(startDate.getDay().toString()) !== false) {
             if (!skippedDays[weekDay] && !bothMatchArr.includes(startDate.getDay().toString())) {
                skippedDays[weekDay] = true;
              }
            }
            startDate.setDate(startDate.getDate() + 1);
            endDate = new Date(endDate.setDate(endDate.getDate() + 1));
            continue WorkDateCheck;
          } else {
            if (startDate < endDate) {
              if (typeof nonWorkingDays != 'undefined' && nonWorkingDays.length > 0 && nonWorkingDays.includes(startDate.getDay().toString()) !== false) {
               if (!skippedDays[weekDay]) {
                  skippedDays[weekDay] = true;
                }
              }
              startDate.setDate(startDate.getDate() + 1);
              continue WorkDateCheck;
            }
          } 
          if (typeof nonWorkingDays != 'undefined' && nonWorkingDays.length > 0) {
            if (Object.keys(skippedDays).length > nonWork) {
              for (var i = 0; i < Object.keys(skippedDays).length; i++) {
                startDate.setDate(startDate.getDate() + 1);
                endDate = new Date(endDate.setDate(endDate.getDate() + 1));
                nonWork++;
                break;
              }
              continue WorkDateCheck;
            }
          }
          break WorkDateCheck;
        }
      
    }
    return endDate;
}
}