$(function () {


    var checkValid = function () {
        var checkFirstName = true;
        var checkLastName = true;
        var checkEmail = true;
        var check = true;
        var parrtern = /\d/;
        var string = $('.firstName').val();
        if (string.match(parrtern) || string.localeCompare('') == 0) {
            checkFirstName = false;
            check = false;
        }
        string = $('.lastName').val();
        if (string.match(parrtern) || string.localeCompare('') == 0) {
            check = false;
            checkLastName = false;
        }
        string = $('.email-field').val();
        parrtern = /[\w]{3,15}@[A-Za-z]{3,10}[.]([A-Za-z]{3,5}[.])?([A-Za-z]{2,5})$/;
        if (parrtern.exec(string) == null) {
            check = false;
            checkEmail = false;
        }
        if (!checkFirstName) alert('First name is not valid');
        if (!checkLastName) alert('Last name is not valid');
        if (!checkEmail) alert('Email is not valid');
        return check;
    };


    $('.button-sign-up').click(function () {
        if (checkValid()) {
            alert('This function is not done please waiting...');
            alert('Thanks for your sign up. But our site is buiding your name and email cannot be saved')
        } else {
            alert('Please input first name and last name are string without number and correct format email');
        }

    });
});
