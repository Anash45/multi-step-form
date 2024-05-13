let step0 = false;
let step1 = false;
let step2 = false;
let step3 = false;
let step4 = false;
let step5 = false;
let step6 = false;
let country = '';
let main_zip = document.getElementById('main-zip-input');
let street_inp = document.getElementById('street-input');
let place_inp = document.getElementById('place');
let countries = ['US', 'CA'];
$(document).ready(function () {
    initPlaces(main_zip, countries);
});

function initPlaces(elem, countries) {
    // Initialize Google Places Autocomplete with componentRestrictions


    var autocompleteOptions = {
        componentRestrictions: { country: countries } // Restrict to the Countries
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
        var countryLong = '';


        for (var i = 0; i < addressComponents.length; i++) {
            var component = addressComponents[i];

            console.log(component);

            if (component.types.includes('street_number') || component.types.includes('route')) {
                streetAddress += component.long_name + ' ';
            } else if (component.types.includes('locality')) {
                city = component.long_name;
            } else if (component.types.includes('administrative_area_level_1')) {
                // Get full name of the state
                state = component.short_name;
            } else if (component.types.includes('postal_code')) {
                zipCode = component.long_name;
            } else if (component.types.includes('country')) {
                countryLong = component.long_name;
            }
        }
        $('#main-zip-input').val(zipCode);

        let elem_type = elem.getAttribute('data-inp');

        if (elem_type == 'main-zip') {
            $('#passzip').click();
        } else if (elem_type == 'street') {
            $('#addressbtn').click();
        }

        setValues(streetAddress, city, state, zipCode, countryLong, country);

        // $('#place').val(city + ', ' + state + ', ', zipCode);

        console.log("Street Address: ", streetAddress.trim());
        console.log("City: ", city);
        console.log("State: ", state);
        console.log("Zip Code: ", zipCode);
    });
}
function setValues(streetAddress, city, state, zipCode, countryLong, country) {
    $('#street-input').val(streetAddress);
    $('#main-zip-input').val(zipCode);
    $('#zip').val(zipCode);
    $('#city').val(city);
    $('#country').val(countryLong);

    setTimeout(() => {
        if (country.toLowerCase() == 'us') {
            $('#state').val(state);
            $('.ca-flag').hide();
            $('.us-flag').show();
            console.log('us state', state);
        } else if (country.toLowerCase() == 'ca') {
            $('#ca_state').val(state);
            $('.ca-flag').show();
            $('.us-flag').hide();
            console.log('ca state', state);
        }
    }, 1500);
}
function checkMainZip() {
    let zip = $('#main-zip-input').val();
    // Regular expression pattern for validating US ZIP codes
    var zipPattern = /^\d{5}(?:-\d{4})?$/; // Pattern for US zip codes

    var canadianZipPattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] ?\d[A-Z]\d$/i; // Updated pattern for Canadian zip codes


    // Test the zip against the pattern
    if (zipPattern.test(zip)) {
        console.log('valid US');
        country = 'us';
        $('#main-zip-input').closest('.form-group').removeClass('errorgroup');
    } else if (canadianZipPattern.test(zip)) {
        console.log('valid CA');
        country = 'ca';
        $('#main-zip-input').closest('.form-group').removeClass('errorgroup');
    } else {
        console.log('not valid');
        $('#main-zip-input').closest('.form-group').addClass('errorgroup');
    }
    return (zipPattern.test(zip) || canadianZipPattern.test(zip));
}

function propertyAddressForm() {
    let zip = $('#zip').val();
    let street_input = $('#street-input').val();
    let city = $('#city').val();
    let state = $('#state').val();
    let place = $('#place').val();
    // Regular expression pattern for validating US ZIP codes
    var zipPattern = /^\d{5}(?:-\d{4})?$/;
    var canadianZipPattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] ?\d[A-Z]\d$/i;

    console.log(zip);
    // Test the zip against the pattern
    if (sell_or_buy == "Selling" && ((!zipPattern.test(zip) && !canadianZipPattern.test(zip)) || street_input == '' || city == '' || state == '')) {
        $('#street-input').closest('.form-group').addClass('errorgroup');
        return false;
    } else if (sell_or_buy == "Buying" && (place == '')) {
        $('#place').closest('.form-group').addClass('errorgroup');
        return false;
    } else {
        $('#street-input').closest('.form-group').removeClass('errorgroup');
        $('#place').closest('.form-group').removeClass('errorgroup');
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
    var phonePattern = /^\d{10}$|^\(\d{3}\)\d{3}-\d{4}$|^\(\d{3}\)\s?\d{3}-\d{4}$/;

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
    console.log(checkMainZip());
    let main_zip_code = $('#main-zip-input').val();

    setTimeout(() => {
        if (checkMainZip()) {
            let formattedPostal = formatPostalCode(main_zip_code);
            validatePostalCode(formattedPostal)
                .then(result => {
                    console.log(result);
                    if (result.isValid) {
                        setValues(result.streetAddress, result.city, result.state, formattedPostal, result.countryLong, result.country);
                        $('.tab-content').removeClass('us');
                        $('.tab-content').removeClass('ca');
                        $('.tab-content').addClass((result.country).toLowerCase());
                        countries = [result.country.toUpperCase()];
                        initPlaces(street_inp, countries);
                        initPlaces(place_inp, countries);

                        $('#landing_entry_zip').val($('#main-zip-input').val());
                        $('.sec-0').hide();
                        $('.sec-1').fadeIn();
                        $('#main-zip-input').closest('.form-group').removeClass('errorgroup');
                    } else {
                        console.log(`${formattedPostal} is not a valid postal code.`);
                        $('#main-zip-input').closest('.form-group').addClass('errorgroup');
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, 1000);
    $(this).removeClass('loading');
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

async function validatePostalCode(postalCode) {
    const apiKey = 'AIzaSyBQmiW5DJHsA7lrOo6DvCv4lIufRHXLVj4';
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postalCode)}&key=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.status === 'OK') {
            // Filter out results from countries other than US and Canada
            const usCanadaResults = data.results.filter(result => {
                return result.address_components.some(component => component.types.includes('country') && (component.short_name === 'US' || component.short_name === 'CA'));
            });

            if (usCanadaResults.length > 0) {
                const results = usCanadaResults[0];
                let streetAddress, city, state, countryLong, country;
                for (let component of results.address_components) {
                    if (component.types.includes('street_number') || component.types.includes('route')) {
                        streetAddress = component.long_name;
                    } else if (component.types.includes('locality')) {
                        city = component.long_name;
                    } else if (component.types.includes('administrative_area_level_1')) {
                        state = component.short_name;
                    } else if (component.types.includes('country')) {
                        countryLong = component.long_name;
                        country = component.short_name;
                    }
                }
                // Return the address components
                return {
                    streetAddress: streetAddress,
                    city: city,
                    state: state,
                    countryLong: countryLong,
                    country: country,
                    isValid: true
                };
            }
        }
        return { isValid: false }; // Postal code is invalid or not from US/Canada
    } catch (error) {
        console.error('Error:', error);
        return { isValid: false }; // Error occurred, consider postal code as invalid
    }
}
function formatPostalCode(postalCode) {
    if (postalCode.length === 5 || postalCode.length === 7) {
        // If the postal code is already 5 or 7 characters, return it as it is
        return postalCode;
    } else if (postalCode.length === 6) {
        // If the postal code is 6 characters, add a space in between
        return postalCode.substring(0, 3) + ' ' + postalCode.substring(3);
    } else {
        // If the postal code is of an unsupported length, return null or throw an error
        return null; // or throw new Error('Invalid postal code');
    }
}