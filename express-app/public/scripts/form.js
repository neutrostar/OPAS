$(function() {

    // Switch to Register
    $('.needAccount, .backLogin').click(function() {
        $('#login, #register, #formContainer').toggleClass('switch');
    });

    // Open Forgot Password
    $('.forgotBtn, .backLoginF').click(function() {
        $('#forgot').toggleClass('forgot');
    });


});
const openButton = document.querySelector(".button");
const header = document.querySelector("header");
const closeButton = document.querySelector(".closeButton");

openButton.addEventListener("click", () => {
    header.style.transform = "translateY(0%)";
    openButton.style.display = "none";
});

closeButton.addEventListener("click", () => {
    header.style.transform = "translateY(-100%)";
    setTimeout(() => {
        openButton.style.display = "flex";
    }, 400);
});
