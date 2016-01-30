'use strict';
$(document).ready(init);
var $email, $password;

function init(){
    $('form').on('submit', loginUser);
}

function loginUser(e) {
    e.preventDefault();

    $email = $('#email');
    $password = $('#password');

    var email = $email.val();
    var password = $password.val();

    $.post('/users/login', {email: email, password: password})
    .success(function(data) {
      console.log('successful login');
      location.href = '/profile';
      
    })
    .fail(function(err) {
      console.log(err); 
    });
}