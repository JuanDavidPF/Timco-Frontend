import API from "./../../../src/TimcoApi.js"

document.querySelector('.login__form').addEventListener('submit', async e => {
    e.preventDefault();

    const recruiter = {
        email: e.target[0].value,
        password: e.target[1].value,
    }
    const res = await AttemptLogin(recruiter);
    console.log(recruiter);
    if(res.status === 'error') {
        console.error(res.message);
        let inputEmail = document.getElementById('recruiterEmail');
        let inputPassword = document.getElementById('recruiterPassword');

        let labelEmail = document.getElementById('login-recruiter-email-label');
        let labelPassword = document.getElementById('login-recruiter-password-label');
        switch (res.message) {
            case 'auth/company-not-found' || 'auth/invalid-password':
                
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


const AttemptLogin = (recruiter) => {
    return API.LogInRecruiter(recruiter);
}