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
    vacancyContainer.innerHTML = `<a href="${API.GetStaticRoute('Pages/Recruiter/NewProject/NewProject.html')}">
    <article class="projectCard new" "><img
            class=" projectCard__thumbnail" src="./resources/newProject icon.png">
        <p class="projectCard__owner">Crear un nuevo proyecto</p>
    </article>
</a>
`;

    const projects = await API.GetProjects('pokemon');

    const OnProjectClicked = (id) => {
        API.GoTo(`Pages/Projects/overview.html?projectId=${id}&user=recruiter`)

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




const SignOut = () => {

    API.SignOutRecruiter();

}


LoadVacancies();
