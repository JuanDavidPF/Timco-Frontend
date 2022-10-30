//API TO COMUNICATE FRONT WITH BACK
const API = (() => {

  //In the production branch use the githuburl/reponame link.
  const StaticHost = 'http://127.0.0.1:5500';


  //Keys to store logged data in cache
  const loggedStudentKey = "loggedStudent";
  const loggedRecruiterKey = "loggedRecruiter";

  // Api to test post and get requests ->
  // read how it works at: http://ptsv2.com/

  const toiletApi = "http://localhost:3000";
  // const toiletApi = "https://timco-api.herokuapp.com";
  //const toiletID = "o6jno-1663906012";
  const postURL = `${toiletApi}/api/v1`;
  const getURL = `https://pokeapi.co/api/v2`;

  const GoToRecruiterDashboard = () => {
    GoTo('Pages/Recruiter/Dashboard/dashboard.html');
  }
  const GoToStudentDashboard = () => {
    GoTo('Pages/Student/Dashboard/dashboard.html');
  }

  const GoToRecruiterDetails = () => {
    GoTo('Pages/Recruiter/Details/details.html');
  }
  const GoToStudentDetails = () => {
    GoTo('Pages/Student/Details/details.html');
  }

  const GoToRecruiterLogin = () => {
    GoTo('Pages/Recruiter/Login/login.html');
  }
  const GoToStudentLogin = () => {
    GoTo('Pages/Student/Login/login.html');
  }
  /////////////////////////////////////////////
  /////////Student methods
  /////////////////////////////////////////////

  const LoginStudent = async (student) => {
    const request = await fetch(`${postURL}/auth/student`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    const response = await request.json();
    if (response.error) return response.error;
    localStorage.setItem(loggedStudentKey, JSON.stringify(student));
    GoToStudentDashboard();
  };

  //Closes SignUpStudent method
  const SignUpStudent = async (student) => {
    const request = await fetch(`${postURL}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    console.log(request);
    const response = await request.json();
    if (response.error) return response.error;

    localStorage.setItem(loggedStudentKey, JSON.stringify(student));
    GoToStudentDetails();
  };
  //Closes SignUpRecruiter method

  const UploadStudentDetails = async (details) => {
    try {
      const request = await fetch(postURL, {
        method: "POST",
        body: JSON.stringify(details),
      });
      console.log(request);
      switch (request.status) {
        case 200:
          // Instead of storing student You should store whatever the server
          // responds to a succesful login - it should contain user credentials

          GoToStudentDashboard();
          break;

        case 404:
          console.log(request);
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method

  const IsStudentLogged = () => {
    return !!localStorage.getItem(loggedStudentKey);
  }; //Closes IsStudentLogged method

  const SignOutStudent = () => {
    localStorage.setItem(loggedStudentKey, "");
    GoToStudentLogin();
    return;
  }; //Closes SignOutStudent method

  /////////////////////////////////////////////
  /////////Recruiter methods
  /////////////////////////////////////////////
  //Open SignUpRecruiter method

  const SignUpRecruiter = async (recruiter) => {
    const request = await fetch(`${postURL}/company`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recruiter),
    });
    const response = await request.json();
    if (response.error) return response.error;

    localStorage.setItem(loggedRecruiterKey, JSON.stringify(recruiter));
    GoToRecruiterDetails();
  }; //Closes SignUpRecruiter method

  //Open login recruiter
  const LogInRecruiter = async (recruiter) => {

    const request = await fetch(`${postURL}/auth/company`, {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recruiter),
    });

    const response = await request.json();
    if (response.error) return response.error;
    localStorage.setItem(loggedRecruiterKey, JSON.stringify(recruiter));
    GoToRecruiterDashboard();


  };
  //Closes LoginRecruiter Method

  const UploadRecruiterDetails = async (details) => {
    try {
      const request = await fetch(postURL, {
        method: "POST",
        body: JSON.stringify(details),
      });
      console.log(request);
      switch (request.status) {
        case 200:
          // Instead of storing student You should store whatever the server
          // responds to a succesful login - it should contain user credentials

          GoToRecruiterDashboard();
          break;

        case 404:
          console.log(request);
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method


  const SignOutRecruiter = () => {
    localStorage.setItem(loggedRecruiterKey, "");
    GoToRecruiterLogin();
  }; //Closes SignOutStudent method

  const IsRecruiterLogged = () => {
    return !!localStorage.getItem(loggedRecruiterKey);
  }; //Closes IsStudentLogged method

  /////////////////////////////////////////////
  /////////Projects methods
  /////////////////////////////////////////////

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
  };


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
  };

  const SubmitProject = async (project) => {
    try {

      const request = await
        fetch(postURL, {
          method: 'POST',
          body: JSON.stringify(project)
        });

      switch (request.status) {

        case 200:

          // Instead of storing student You should store whatever the server
          // responds to a succesful login - it should contain user credentials

          return true;
          break;

        case 404:
          console.log(request)
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {

      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }

  const JoinProjectRequest = async (student) => {
    try {

      const request = await
        fetch(postURL, {
          method: 'POST',
          body: JSON.stringify(student)
        });

      switch (request.status) {

        case 200:

          // Instead of storing student You should store whatever the server
          // responds to a succesful login - it should contain user credentials

          return true;
          break;

        case 404:
          console.log(request)
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {

      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }

  const UploadProject = async (project) => {
    try {
      const request = await fetch(postURL, {
        method: "POST",
        body: JSON.stringify(project),
      });
      console.log(request);
      switch (request.status) {
        case 200:
          break;

        case 404:
          console.log(request);
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method

  const GetStaticRoute = (route) => {
    return `${StaticHost}/public/${route}`;
  }
  const GoTo = (route) => {
    window.location.href = GetStaticRoute(route);;
  }
  //Add all methods to make them public to other scripts

  return {
    GetProjects,
    GetProjectByID,

    LoginStudent,
    SignUpStudent,
    UploadStudentDetails,
    SignOutStudent,
    IsStudentLogged,
    GoToStudentDashboard,
    GoToStudentDetails,
    GoToStudentLogin,
    SubmitProject,
    JoinProjectRequest,

    LogInRecruiter,
    SignUpRecruiter,
    UploadRecruiterDetails,
    SignOutRecruiter,
    UploadProject,
    IsRecruiterLogged,
    GoToRecruiterDashboard,
    GoToRecruiterDetails,
    GoToRecruiterLogin,

    GetStaticRoute,
    GoTo
  };
})();

export default API; //API TO COMUNICATE FRONT WITH BACK
