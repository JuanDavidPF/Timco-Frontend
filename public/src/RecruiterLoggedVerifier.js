import API from "./TimcoApi.js"

(() => {


    if (!API.IsRecruiterLogged()) window.location.href = "./../Login/login.html"

})()