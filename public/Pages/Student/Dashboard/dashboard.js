import ProjectCard from "../../../Components/ProjectCard/ProjectCard.js";
import API from "./../../../src/TimcoApi.js"


document.getElementById("signOutButton").addEventListener('click', () => {
    SignOut()

})

const vacancyContainer = document.querySelector("#dashboard__vacancies");

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





const SignOut = () => {

    API.SignOutStudent();

}


LoadVacancies();