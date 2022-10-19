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
    vacancyContainer.innerHTML = `<a href="./../NewProject/NewProject.html">
    <article class="projectCard new" "><img
            class=" projectCard__thumbnail" src="./resources/newProject icon.png">
        <p class="projectCard__owner">Crear un nuevo proyecto</p>
    </article>
</a>
`;

    const projects = await API.GetProjects('pokemon');

    const OnProjectClicked = (id) => {
        window.location.href = `./../../Projects/overview.html?projectId=${id}`;

    }

    if (!projects) return;

    projects.forEach((project, index) => {
        const card = ProjectCard.Create(project,
            () => OnProjectClicked(index + 1),
            'Revisar');


        if (!card) return;
        vacancyContainer.appendChild(card);

    });

}//Closes LoadVacancies method




const SignOut = () => {

    API.SignOutRecruiter();

}


LoadVacancies();
