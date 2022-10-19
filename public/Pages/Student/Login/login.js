import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', async e => {
    e.preventDefault();

    const student = {
        email: e.target[0].value,
        password: e.target[1].value,
    }
console.log(student);
    const res = await AttemptLogin(student);;
    if(res.status === 'error') {
        console.error(res.message);
        let inputEmail = document.getElementById('studentEmail');
        let inputPassword = document.getElementById('studentPassword');

        let labelEmail = document.getElementById('login-student-email-label');
        let labelPassword = document.getElementById('login-student-password-label');
        switch (res.message) {
            case 'auth/user-not-found' || 'auth/invalid-password':
                
                let errEmailWrong = document.getElementById('email-password-error');
                errEmailWrong.style.display = 'block';
                errEmailWrong.style.color = 'red'; 
                labelEmail.style.color = 'red'; 
                inputEmail.style.borderColor = 'red';
                labelPassword.style.color = 'red'; 
                inputPassword.style.borderColor = 'red';
                break;
            default:
                break;
        }
    }

    

})



const AttemptLogin = (student) => {
    return API.LoginStudent(student);
}