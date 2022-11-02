import ListCard from "../../../Components/ListCard/ListCard.js";
import ProjectCard from "../../../Components/ProjectCard/ProjectCard.js";
import API from "./../../../src/TimcoApi.js";
import codedecJwt from "./../../../src/utils/parseJWT.js";

let projects = [];

document.getElementById("signOutButton").addEventListener("click", () => {
  SignOut();
});

const vacancyContainer = document.querySelector("#dashboard__vacancies");
let myProjectsContainer = document.querySelector(
  "#dashboard_me__projects__container"
);

const activeTabEle = document.getElementById("active-tab");
const finishedTabEle = document.getElementById("finished-tab");
const waitingTabEle = document.getElementById("waiting-tab");

const getUserData = () => {
  //
  //   const token = localStorage.getItem("token");
  //   const userData = codedecJwt(token);
  //   debugger;
  let userData = localStorage.getItem("user");

  if (userData !== null) {
    userData = JSON.parse(userData);
    // let userName = userData.data.name;
    let userName = userData.name;
    let userDetail = userData.area.name;

    // if (API.IsRecruiterLogged) {
    //   userDetail = userData.data.companyName;
    // } else {
    //   userDetail = userData.data.area.name;
    // }
    //projectKey.value = userName;

    const userNameSideBar = document.getElementById("userName");
    const userDetailSideBar = document.getElementById("userDetail");
    const helloUserNameTitle = document.getElementById("helloUserName");

    //   console.log(userNameSideBar.innerHTML);
    //   console.log(userDetailSideBar);

    userNameSideBar.innerHTML = userName;
    helloUserNameTitle.innerHTML = userName;
    userDetailSideBar.innerHTML = userDetail;
  }
};

const LoadVacancies = async () => {
  if (!vacancyContainer) return;
  vacancyContainer.innerHTML = null;

  const projects = await API.GetProjects("pokemon");

  const OnProjectClicked = (id) => {
    window.location.href = `./../../Projects/overview.html?projectId=${id}`;
  };

  if (!projects) return;

  projects.forEach((project, index) => {
    const card = ProjectCard.Create(project, () => OnProjectClicked(index + 1));
    if (!card) return;
    vacancyContainer.appendChild(card);
  });
}; //Closes LoadVacancies method

const LoadMyProjects = async () => {
  if (!myProjectsContainer) return;
  myProjectsContainer.innerHTML = null;

  let userData = localStorage.getItem("user");
  if (userData !== null) {
    userData = JSON.parse(userData);

    projects = await API.GetActiveProjectsByStudent(userData.studentId);
    if (projects.data.length === 0) return;
    projects = projects.data;
    console.group("ORIGINAL PROJECTS");
    console.log(projects);
    console.groupEnd();
    drawProjectsByState(1);
  }
}; //Closes LoadVacancies method

const drawProjectsByState = (state) => {
  let projectsFilter = projects.filter(
    (project) => project.state.stateId === state
  );
  console.group("SELECTED STATUS", state);
  console.log(projectsFilter);
  console.groupEnd();
  drawProjects({ projects: projectsFilter });
};

const drawProjects = ({ projects = [] }) => {
  myProjectsContainer.innerHTML = null;

  projects.forEach((project, index) => {
    // debugger;
    // const id = project.projectId;
    // debugger;
    // console.log('Go to detail project with id =', id);
    console.log(project);

    const card = ListCard.CreateProjectCard(
      project,
      () => OnProjectClicked(project.projectId),
      () => OnProjectClicked(project.projectId)
    );
    if (!card) return;
    myProjectsContainer.appendChild(card);
  });
};

const OnProjectClicked = (id) => {
  debugger;
  window.location.href = `./../../Projects/overview.html?projectId=${id}&owned=true`;
};

const SignOut = () => {
  API.SignOutStudent();
};

activeTabEle.addEventListener("click", function () {
  drawProjectsByState(1);
});
finishedTabEle.addEventListener("click", function () {
  drawProjectsByState(3);
});
waitingTabEle.addEventListener("click", function () {
  drawProjectsByState(2);
});

LoadVacancies();
LoadMyProjects();
getUserData();
