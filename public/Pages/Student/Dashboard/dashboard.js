import ListCard from "../../../Components/ListCard/ListCard.js";
import ProjectCard from "../../../Components/ProjectCard/ProjectCard.js";
import API from "./../../../src/TimcoApi.js"


document.getElementById("signOutButton").addEventListener('click', () => {
    SignOut()

})

const vacancyContainer = document.querySelector("#dashboard__vacancies");
const myProjectsContainer = document.querySelector("#dashboard_me__projects__container");


const LoadVacancies = async () => {


    if (!vacancyContainer) return;
    vacancyContainer.innerHTML = null;

    const projects = await API.GetProjects('pokemon');

    const OnVacancyClicked = (id) => {
        alert(id);
    }

    if (!projects) return;

    projects.forEach((project, index) => {
        const card = ProjectCard.Create(project, () => OnVacancyClicked(index));
        if (!card) return;
        vacancyContainer.appendChild(card);

    });

}//Closes LoadVacancies method

const LoadMyProjects = async () => {


    if (!myProjectsContainer) return;
    myProjectsContainer.innerHTML = null;

    const projects = await API.GetProjects('pokemon');

    if (!projects) return;

    projects.forEach((project, index) => {
        const card = ListCard.CreateProjectCard(project);
        if (!card) return;
        myProjectsContainer.appendChild(card);

    });

}//Closes LoadVacancies method





const SignOut = () => {

    API.SignOutStudent();

}


LoadVacancies();
LoadMyProjects();