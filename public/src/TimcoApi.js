import parseJwt from "./utils/parseJWT.js";

//API TO COMUNICATE FRONT WITH BACK
const API = (() => {
  //Keys to store logged data in cache
  const loggedStudentKey = "loggedStudent";
  const loggedRecruiterKey = "loggedRecruiter";

  // read how it works at: http://ptsv2.com/

  const toiletApi = "http://localhost:3000";
  const StaticHost = "http://127.0.0.1:5500";

  // const toiletApi = "https://timco-api.herokuapp.com";
  //const toiletID = "o6jno-1663906012";
  const postURL = `${toiletApi}/api/v1`;
  const getURL = `https://pokeapi.co/api/v2`;

  const GoToRecruiterDashboard = () => {
    GoTo("Pages/Recruiter/Dashboard/dashboard.html");
  };
  const GoToStudentDashboard = () => {
    GoTo("Pages/Student/Dashboard/dashboard.html");
  };

  const GoToRecruiterDetails = () => {
    GoTo("Pages/Recruiter/Details/details.html");
  };
  const GoToStudentDetails = () => {
    GoTo("Pages/Student/Details/details.html");
  };

  const GoToRecruiterLogin = () => {
    GoTo("Pages/Recruiter/Login/login.html");
  };
  const GoToStudentLogin = () => {
    GoTo("Pages/Student/Login/login.html");
  };

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

    if (response.error) {
      return response.error;
    }
    const currentUserId = parseJwt(response.access).data.studentId;
    const user = parseJwt(response.access).data;
    // debugger
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", response.access);
    localStorage.setItem(loggedStudentKey, currentUserId);
    GoToStudentDashboard();
  };

  //Closes SignUpStudent method
  const SignUpStudent = async (student) => {
    const request = await fetch(`${postURL}/student`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    const response = await request.json();

    if (response.error) return response.error;
    let currentUserId = parseJwt(response.accessToken).data;
    localStorage.setItem(loggedStudentKey, currentUserId);
    localStorage.setItem("token", response.access);
    GoToStudentDetails();
  };
  //Closes SignUpRecruiter method

  const UploadStudentDetails = async (details) => {
    try {
      const request = await fetch(postURL, {
        method: "POST",
        body: JSON.stringify(details),
      });
      switch (request.status) {
        case 200:
          GoToStudentDashboard();
          break;
        case 404:
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method

  const currentStudentId = () => {
    return localStorage.getItem(loggedStudentKey);
  };

  const IsStudentLogged = () => {
    return !!localStorage.getItem(loggedStudentKey);
  }; //Closes IsStudentLogged method

  const SignOutStudent = () => {
    localStorage.removeItem(loggedStudentKey);
    localStorage.removeItem("token");
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

    const currentUserId = parseJwt(response.access).data;
    localStorage.setItem(loggedRecruiterKey, currentUserId);
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

    const currentUserId = parseJwt(response.access).data;
    localStorage.setItem(loggedRecruiterKey, currentUserId);
    localStorage.setItem("token", response.access);

    GoToRecruiterDashboard();
  };
  //Closes LoginRecruiter Method

  const UploadRecruiterDetails = async (details) => {
    try {
      const request = await fetch(`${postURL}/company`, {
        method: "POST",
        body: JSON.stringify(details),
      });
      switch (request.status) {
        case 200:
          // Instead of storing student You should store whatever the server
          // responds to a succesful login - it should contain user credentials
          GoToRecruiterDashboard();
          break;

        case 404:
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method

  const SignOutRecruiter = () => {
    localStorage.removeItem(loggedRecruiterKey);
    localStorage.removeItem("token");
    GoToRecruiterLogin();
  }; //Closes SignOutStudent method

  const currentRecruiterId = () => {
    return localStorage.getItem(loggedRecruiterKey);
  };

  const IsRecruiterLogged = () => {
    return !!localStorage.getItem(loggedRecruiterKey);
  }; //Closes IsRecruiterLogged method

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

  const GetCandidatesByStudentId = async (studentKey) => {
    try {
      const request = await fetch(`${postURL}/candidate/student/${studentKey}`);
      switch (request.status) {
        case 200:
          const res = await request.json();
          return res.data;
        default:
          alert("Hubo un problema, intentalo de nuevo en unos minutos");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };

  const GetCandidatesByProjectId = async (projectKey) => {
    try {
      const request = await fetch(`${postURL}/candidate/project/${projectKey}`);
      switch (request.status) {
        case 200:
          const res = await request.json();
          return res.data;
        default:
          alert("Hubo un problema, intentalo de nuevo en unos minutos");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };

  const PutCandidateProject = async (candidateData) => {
    try {
      const request = await fetch(`${postURL}/candidate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });
      switch (request.status) {
        case 200:
          const res = await request.json();
          return res.data;
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
      const request = await fetch(`${postURL}/project/${projectID}`);
      switch (request.status) {
        case 200:
          const project = await request.json();
          return project.data || {};
        default:
          alert("Hubo un problema, intentalo de nuevo en unos minutos");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };

  const GetProfileByID = async (profileID) => {
    try {
      const request = await fetch(`${getURL}/pokemon/${profileID}`);

      switch (request.status) {
        case 200:
          const data = await request.json();
          data.pokedex = await fetch(`${getURL}/pokemon-species/${profileID}`);
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

  const GetActiveProjects = async ({
    entityId = 0,
    entityType = "student",
  }) => {
    try {
      const request = await fetch(
        `${postURL}/project/${entityType}/active/${entityId}`
      );
      switch (request.status) {
        case 200:
          const data = await request.json();
          return data;
        default:
          alert("Hubo un problema, intentalo de nuevo en unos minutos");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };

  const GetActiveProjectsByStudent = async (studentId) => {
    try {
      const request = await fetch(`${getURL}/pokemon/${profileID}`);

      switch (request.status) {
        case 200:
          const data = await request.json();
          return data;
        default:
          alert("Hubo un problema, intentalo de nuevo en unos minutos");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };



  const JoinProjectRequest = async (candidateData) => {
    try {
      const request = await fetch(`${postURL}/candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidateData),
      });

      switch (request.status) {
        case 201:
          return true;
        case 404:
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  };

  const UploadProject = async (project, token) => {
    token = localStorage.getItem("token");
    try {
      const request = await fetch(`${postURL}/project`, {
        method: "PUT",
        body: JSON.stringify(project),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      switch (request.status) {
        case 200:
          console.log(request.json())
          break;
        case 404:
          alert("La petición no dió resultado");
          break;
      }
    } catch (error) {
      alert("Hubo un problema, intentalo de nuevo en unos minutos");
    }
  }; //Closes UploadStudentDetails method

  //Method for load data for current user logged
  const loadCurrentUserData = async () => {
    if (IsRecruiterLogged()) {
      let recruiterId = localStorage.getItem(loggedRecruiterKey);

      try {
        const request = await fetch(`${postURL}/company/${recruiterId}`);

        switch (request.status) {
          case 200:
            const data = await request.json();

            return data;

          default:
            alert("Hubo un problema, intentalo de nuevo en unos minutos");
            break;
        }
      } catch (error) {
        alert("Hubo un problema, intentalo de nuevo en unos minutos");
      }
    } else {
      let studentId = localStorage.getItem(loggedStudentKey);
      try {
        const request = await fetch(`${postURL}/student/${studentId}`);

        switch (request.status) {
          case 200:
            const data = await request.json();

            return data;

          default:
            alert("Hubo un problema, intentalo de nuevo en unos minutos");
            break;
        }
      } catch (error) {
        alert("Hubo un problema, intentalo de nuevo en unos minutos");
      }
    }
  };
  //Add all methods to make them public to other scripts

  const GetStaticRoute = (route) => {
    return `${StaticHost}/public/${route}`;
  };
  const GoTo = (route) => {
    window.location.href = GetStaticRoute(route);
  };

  return {
    GetProjects,
    GetProjectByID,

    LoginStudent,
    SignUpStudent,
    UploadStudentDetails,
    SignOutStudent,
    IsStudentLogged,
    currentStudentId,
    GoToStudentDashboard,
    GoToStudentDetails,
    GoToStudentLogin,
    SubmitProject,
    JoinProjectRequest,
    GetActiveProjectsByStudent,
    GetActiveProjects,
    GetCandidatesByProjectId,
    GetCandidatesByStudentId,
    PutCandidateProject,

    LogInRecruiter,
    SignUpRecruiter,
    UploadRecruiterDetails,
    SignOutRecruiter,
    UploadProject,
    IsRecruiterLogged,
    currentRecruiterId,
    GoToRecruiterDashboard,
    GoToRecruiterDetails,
    GoToRecruiterLogin,
    GetStaticRoute,
    GoTo,
    GetProfileByID,

    loadCurrentUserData,
  };
})();

export default API;
