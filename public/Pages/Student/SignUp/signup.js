import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', e => {
    e.preventDefault();

    const newStudent = {
        name: e.target[0].value,
        email: e.target[2].value,
        password: e.target[3].value,
    }
    AttemptRegistration(newStudent);
})


const AttemptRegistration = (student) => {
    API.SignUpStudent(student);
}