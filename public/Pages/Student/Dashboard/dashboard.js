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

    const OnProjectClicked = (id) => {
        API.GoTo(`Pages/Projects/overview.html?projectId=${id}`)
    }

    if (!projects) return;

    projects.forEach((project, index) => {
        const card = ProjectCard.Create(
            {
                project: project,
                primaryBtn: {
                    label: 'Revisar',
                    onclick: () => OnProjectClicked(index + 1)
                }
            });

        if (!card) return;
        vacancyContainer.appendChild(card);

    });

}//Closes LoadVacancies method

const LoadMyProjects = async () => {


    if (!myProjectsContainer) return;
    myProjectsContainer.innerHTML = null;

    const projects = await API.GetProjects('pokemon');

    const OnProjectClicked = (id) => {
        API.GoTo(`Projects/overview.html?projectId=${id}&owned=true&user=student`)
    }


    if (!projects) return;

    projects.forEach((project, index) => {
        const card = ListCard.CreateProjectCard(project, () => OnProjectClicked(index + 1), () => OnProjectClicked(index + 1));
        if (!card) return;
        myProjectsContainer.appendChild(card);

    });

}//Closes LoadVacancies method





const SignOut = () => {

    API.SignOutStudent();

}


LoadVacancies();
LoadMyProjects();