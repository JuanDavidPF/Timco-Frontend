



//API TO COMUNICATE FRONT WITH BACK
const API = (() => {
    //Keys to store logged data in cache
    const loggedStudentKey = 'loggedStudent';
    const loggedRecruiterKey = 'loggedRecruiter';

    // Api to test post and get requests ->
    // read how it works at: http://ptsv2.com/

    const toiletApi = "https://ptsv2.com/";
    const toiletID = "o6jno-1663906012";
    const postURL = `${toiletApi}/t/${toiletID}/post`
    const getURL = `https://pokeapi.co/api/v2`
    const GoToDashboard = () => window.location.href = "./../Dashboard/dashboard.html";
    const GoToDetailsForm = () => window.location.href = "./../Details/details.html";
    const GoToLogin = () => window.location.href = "./../Login/login.html";


    const GetProjects = async (key) => {
        try {
            const request = await fetch(`${getURL}/${key}`);

            switch (request.status) {

                case 200:
                    const data = await request.json();
                    return data.results;


                default:
                    alert("Hubo un problema, intentalo de nuevo en unos minutos");
                    break;
            }


        } catch (error) {
            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }
    }

    const GetProjectByID = async (projectID) => {
        try {
            const request = await fetch(`${getURL}/pokemon/${projectID}`);


            switch (request.status) {

                case 200:
                    const data = await request.json();
                    data.pokedex = await fetch(`${getURL}/pokemon-species/${projectID}`);
                    data.pokedex = await data.pokedex.json();
                    data.pokedex = data.pokedex.flavor_text_entries[20].flavor_text;

                    return data;


                default:
                    alert("Hubo un problema, intentalo de nuevo en unos minutos");
                    break;
            }


        } catch (error) {
            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }
    }



    /////////////////////////////////////////////
    /////////Student methods
    /////////////////////////////////////////////

    const LoginStudent = async (student) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(student)
                });
            console.log(request)
            switch (request.status) {

                case 200:

                    // Instead of storing student You should store whatever the server
                    // responds to a succesful login - it should contain user credentials
                    localStorage.setItem(loggedStudentKey, JSON.stringify(student));
                    GoToDashboard();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method

    const SignUpStudent = async (student) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(student)
                });
            console.log(request)
            switch (request.status) {

                case 200:

                    // Instead of storing student You should store whatever the server
                    // responds to a succesful login - it should contain user credentials

                    localStorage.setItem(loggedStudentKey, JSON.stringify(student));
                    GoToDetailsForm();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method

    const UploadStudentDetails = async (details) => {

        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(details)
                });
            console.log(request)
            switch (request.status) {

                case 200:

                    // Instead of storing student You should store whatever the server
                    // responds to a succesful login - it should contain user credentials

                    GoToDashboard();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }


    }//Closes UploadStudentDetails method

    const SignOutStudent = () => {
        localStorage.setItem(loggedStudentKey, "");
        GoToLogin();
        return
    }//Closes SignOutStudent method

    const IsStudentLogged = () => {
        return !!localStorage.getItem(loggedStudentKey);
    }//Closes IsStudentLogged method

    /////////////////////////////////////////////
    /////////Recruiter methods
    /////////////////////////////////////////////

    const LogInRecruiter = async (recruiter) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(recruiter)
                });
            console.log(request)
            switch (request.status) {

                case 200:
                    // Instead of storing recruiter You should store whatever the server
                    // responds to a succesful login - it should contain user credentials

                    localStorage.setItem(loggedRecruiterKey, JSON.stringify(recruiter));
                    GoToDashboard();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method

    const SignUpRecruiter = async (recruiter) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(recruiter)
                });
            console.log(request)
            switch (request.status) {

                case 200:

                    // Instead of storing recruiter You should store whatever the server
                    // responds to a succesful login - it should contain user credentials

                    localStorage.setItem(loggedRecruiterKey, JSON.stringify(recruiter));
                    GoToDetailsForm();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {
            console.log(error);
            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes SignUpRecruiter method

    const SignOutRecruiter = () => {
        localStorage.setItem(loggedRecruiterKey, "");
        GoToLogin();

    }//Closes SignOutStudent method

    const UploadRecruiterDetails = async (details) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(details)
                });
            console.log(request)
            switch (request.status) {

                case 200:

                    // Instead of storing student You should store whatever the server
                    // responds to a succesful login - it should contain user credentials

                    GoToDashboard();
                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }

    }//Closes UploadStudentDetails method

    const UploadProject = async (project) => {
        try {

            const request = await
                fetch(postURL, {
                    method: 'POST',
                    body: JSON.stringify(project)
                });
            console.log(request)
            switch (request.status) {

                case 200:


                    break;

                case 404:
                    console.log(request)
                    alert("La petición no dió resultado");
                    break;
            }
        } catch (error) {

            alert("Hubo un problema, intentalo de nuevo en unos minutos");
        }
    }//Closes UploadStudentDetails method


    const IsRecruiterLogged = () => {
        return !!localStorage.getItem(loggedRecruiterKey);
    }//Closes IsStudentLogged method


    //Add all methods to make them public to other scripts

    return {
        GetProjects,
        GetProjectByID,

        LoginStudent,
        SignUpStudent,
        UploadStudentDetails,
        SignOutStudent,
        IsStudentLogged,

        LogInRecruiter,
        SignUpRecruiter,
        UploadRecruiterDetails,
        SignOutRecruiter,
        UploadProject,
        IsRecruiterLogged,
    }

})()



export default API
//API TO COMUNICATE FRONT WITH BACK