import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', e => {
    e.preventDefault();

    const recruiter = {
        email: e.target[0].value,
        password: e.target[1].value,
    }
    AttemptLogin(recruiter);
})


const AttemptLogin = (recruiter) => {
    API.LogInRecruiter(recruiter);
}