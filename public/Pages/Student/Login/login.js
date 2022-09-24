import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', e => {
    e.preventDefault();

    const student = {
        email: e.target[0].value,
        password: e.target[1].value,
    }
    AttemptLogin(student);

})


const AttemptLogin = (student) => {
    API.LoginStudent(student);
}