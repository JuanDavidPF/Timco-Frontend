import { SignUpRecruiter } from "./../../src/UserCredentials.js"

const landingRegisterRecruiterForm = document.querySelector(".landingPage__registration__form");


if (landingRegisterRecruiterForm) landingRegisterRecruiterForm.addEventListener('submit', (e) => {
    console.log(e);
    e.preventDefault();
    if (SignUpRecruiter) SignUpRecruiter();
});