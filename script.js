function checkPasswordMatch(password, confirmPassword){
    return password == confirmPassword ? true : false;
}

function changeDisplay(element, isVisible){
    isVisible ? element.style.maxHeight = "0px" : element.style.maxHeight = "200px";
}

function changeErrorVisibility(isValid){
    const errorElement = this.parentElement.nextElementSibling;
    changeDisplay(errorElement, isValid);
}

const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#c-password");

confirmPassword.addEventListener("input", function(){
    const password = document.querySelector("#password");
    const isValid = checkPasswordMatch(password.value, this.value);
    changeErrorVisibility.call(this, isValid);

});
password.addEventListener("input", function() {
    changeErrorVisibility.call(this, this.validity.valid);
    const event = new Event("input");
    confirmPassword.dispatchEvent(event);
});