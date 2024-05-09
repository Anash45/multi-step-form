let step0 = false;
let step1 = false;
let step2 = false;
let step3 = false;
let step4 = false;
let step5 = false;
let step6 = false;
$(document).ready(function () {
    let main_zip = document.getElementById('main-zip-input');
    let street_inp = document.getElementById('street-input');
    let place_inp = document.getElementById('place');
    initPlaces(main_zip);
    initPlaces(street_inp);
    initPlaces(place_inp);
});

function initPlaces(elem) {
    // Initialize Google Places Autocomplete with componentRestrictions


    var autocompleteOptions = {
        componentRestrictions: { country: 'US' } // Restrict to the United States
    };

    if (elem.getAttribute('data-inp') == "main-zip") {
        autocompleteOptions.types = ['postal_code']; // Restrict to postal codes
    }

    var autocompleteService = new google.maps.places.AutocompleteService();
    var autocomplete = new google.maps.places.Autocomplete(elem, autocompleteOptions);

    if (elem.getAttribute('data-inp') == 'place') {
        elem.addEventListener('input', function () {
            var input = this.value;

            // Make a request to the AutocompleteService
            autocompleteService.getPlacePredictions({
                input: input,
                types: ['(regions)', '(cities)'], // Include regions (states) and cities
                componentRestrictions: { country: 'US' } // Restrict to the United States
            }, function (predictions, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    // Clear existing predictions from the Autocomplete dropdown
                    autocomplete.innerHTML = '';

                    // Create a new list of predictions containing only the place name
                    predictions.forEach(function (prediction) {
                        var placeName = prediction.description;
                        var option = document.createElement('option');
                        option.value = placeName;
                        autocomplete.element.appendChild(option); // Use autocomplete.element instead of autocomplete
                    });
                }
            });
        });
    }

    // When a place is selected from the dropdown
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        if (!place.geometry) {
            console.log("Place details not available for this place");
            return;
        }

        // Extract address components
        var addressComponents = place.address_components;
        var streetAddress = '';
        var city = '';
        var state = '';
        var zipCode = '';

        for (var i = 0; i < addressComponents.length; i++) {
            var component = addressComponents[i];
            if (component.types.includes('street_number') || component.types.includes('route')) {
                streetAddress += component.long_name + ' ';
            } else if (component.types.includes('locality')) {
                city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
                // Get full name of the state
                state = component.short_name;
            } else if (component.types.includes('postal_code')) {
                zipCode = component.long_name;
            }
        }

        let elem_type = elem.getAttribute('data-inp');

        if (elem_type == 'main-zip') {
            $('#passzip').click();
        } else if (elem_type == 'street') {
            $('#addressbtn').click();
        }

        $('#street-input').val(streetAddress);
        $('#main-zip-input').val(zipCode);
        $('#zip').val(zipCode);
        $('#city').val(city);
        $('#state').val(state);


        console.log("Street Address: ", streetAddress.trim());
        console.log("City: ", city);
        console.log("State: ", state);
        console.log("Zip Code: ", zipCode);
    });
}

function checkMainZip() {
    let zip = $('#main-zip-input').val();
    // Regular expression pattern for validating US ZIP codes
    var zipPattern = /^\d{5}(?:-\d{4})?$/;

    // Test the zip against the pattern
    if (zipPattern.test(zip)) {
        console.log('not valid');
        $('#main-zip-input').closest('.form-group').removeClass('errorgroup');
    } else {
        console.log('valid');
        $('#main-zip-input').closest('.form-group').addClass('errorgroup');
    }
    return zipPattern.test(zip);
}

function propertyAddressForm() {
    let zip = $('#zip').val();
    let street_input = $('#street-input').val();
    let city = $('#city').val();
    let state = $('#state').val();
    let place = $('#place').val();
    // Regular expression pattern for validating US ZIP codes
    var zipPattern = /^\d{5}(?:-\d{4})?$/;

    console.log(zip);
    // Test the zip against the pattern
    if (sell_or_buy == "Selling" && (!zipPattern.test(zip) || street_input == '' || city == '' || state == '')) {
        $('#street-input').closest('.form-group').addClass('errorgroup');
        return false;
    } else if (sell_or_buy == "Buying" && (place == '')) {
        $('#place').closest('.form-group').addClass('errorgroup');
        return false;
    } else {
        $('#street-input').closest('.form-group').removeClass('errorgroup');
        return true;
    }
}

function nameEmailForm() {
    let err = 0;
    let first_name = $('#first_name').val();
    let last_name = $('#last_name').val();
    let email = $('#email').val();
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    console.log(email);
    // Test the email against the pattern
    if (!emailPattern.test(email)) {
        $('#email').closest('.form-group').addClass('errorgroup');
        err = 1;
    } else {
        $('#email').closest('.form-group').removeClass('errorgroup');
    }
    if (first_name == '' || last_name == '') {
        $('#first_name').closest('.form-group').addClass('errorgroup');
        err = 1;
    } else {
        $('#first_name').closest('.form-group').removeClass('errorgroup');
    }
    if (err == 1) {
        return false;
    } else {
        return true;
    }
}

function phoneForm() {
    let err = 0;
    let phone = $('#phone').val();
    var phonePattern = /^\d{10}$/;

    console.log(phone);
    // Test the phone against the pattern
    if (!phonePattern.test(phone)) {
        $('#phone').closest('.form-group').addClass('errorgroup');
        err = 1;
    } else {
        $('#phone').closest('.form-group').removeClass('errorgroup');
    }
    if (err == 1) {
        return false;
    } else {
        return true;
    }
}

$('#passzip').on('click', function () {
    $(this).addClass('loading');
    setTimeout(() => {
        if (checkMainZip()) {
            $('.sec-0').hide();
            $('.sec-1').fadeIn();
        }
        $(this).removeClass('loading');
    }, 1000);
})

$('#addressbtn').on('click', function () {
    if (propertyAddressForm()) {
        $('.nav-tabs #tab5-tab').tab('show');
        step4 = true;
    } else {
        step4 = false;
    }
})

$('#nameEmailBtn').on('click', function () {
    if (nameEmailForm()) {
        $('.nav-tabs #tab6-tab').tab('show');
        step5 = true;
    } else {
        step5 = false;
    }
})
$('#phoneBtn').on('click', function () {
    if (phoneForm()) {
        $('.nav-tabs #tab7-tab').tab('show');
        step6 = true;
    } else {
        step6 = false;
    }
    console.log(step0, step1, step2, step3, step4, step5, step6);
    if (step0 && step1 && step2 && step3 && step4 && step5 && step6) {
        $('form').submit();
    }

})

let sell_or_buy;
$('.select input').on('change click', function () {
    // let value = $(this).val();
    let tabPane = $(this).closest('.tab-pane').attr('id');
    let checkedLength = $(this).closest('.tab-pane').find('.select input:checked').length;
    console.log(checkedLength);
    if (tabPane == 'tab0' && checkedLength > 0) {
        step0 = true;
        sell_or_buy = $('.selling_or_buying:checked').val();
        console.log(sell_or_buy);
        $('.tab-content').removeClass('selling');
        $('.tab-content').removeClass('buying');
        $('.tab-content').addClass(sell_or_buy.toLowerCase());

        $('.nav-tabs #tab1-tab').tab('show');
    } else if (tabPane == 'tab1' && checkedLength > 0) {
        step1 = true;
        $('.nav-tabs #tab2-tab').tab('show');
    } else if (tabPane == 'tab2' && checkedLength > 0) {
        step2 = true;
        $('.nav-tabs #tab3-tab').tab('show');
    } else if (tabPane == 'tab3' && checkedLength > 0) {
        step3 = true;
        $('.nav-tabs #tab4-tab').tab('show');
    }
    $(this).closest('.tab-pane').find('.select').removeClass('checked');
    makeSelectsChecked();
})

function makeSelectsChecked() {
    $('.select input').each(function () {
        if ($(this).prop('checked')) {
            $(this).closest('.select').addClass('checked');
        }
    })
}

$('form').on('submit', function (e) {
    if (step0 && step1 && step2 && step3 && step4 && step5 && step6) {
    } else {
        e.preventDefault();
        alert('One of more steps are left, go back and check!');
    }
});