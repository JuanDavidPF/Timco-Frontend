import API from "./../../../src/TimcoApi.js"


document.getElementById("signOutButton").addEventListener('click', () => {
    SignOut()

})

const SignOut = () => {

    API.SignOutStudent();

}