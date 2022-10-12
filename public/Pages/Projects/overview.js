import API from "../../src/TimcoApi.js";

const urlParams = new URLSearchParams(window.location.search);
const projectKey = urlParams.get('projectId');


const ProjectLogo = document.querySelector('.overview__header__logo');
const ProjectName = document.querySelector('.overview__header__projectName');
const ProjectType = document.querySelector('.overview__header__projectType');
const ProjectDescription = document.querySelector('.overview__header__projectDescription');

const RenderProjectData = async (key) => {

    if (!key) return;
    const projectData = await API.GetProjectByID(key);
    FillInformation(projectData);
}

const FillInformation = (projectData) => {
    console.log(projectData);
    if (!projectData) return;

    if (ProjectLogo) ProjectLogo.src = projectData.sprites.front_default;
    if (ProjectName) ProjectName.textContent = projectData.name;
    if (ProjectType) ProjectType.textContent = projectData.types[0].type.name;
    if (ProjectDescription) ProjectDescription.textContent = projectData.pokedex;
}

RenderProjectData(projectKey);