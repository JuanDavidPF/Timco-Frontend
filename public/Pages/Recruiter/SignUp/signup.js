import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', e => {
    e.preventDefault();

    const newRecruiter = {
        name: e.target[0].value,
        orgName: e.target[1].value,
        email: e.target[2].value,
        password: e.target[3].value,
    }
    AttemptRegistration(newRecruiter);
})


const AttemptRegistration = (recruiter) => {
    API.SignUpRecruiter(recruiter);
}