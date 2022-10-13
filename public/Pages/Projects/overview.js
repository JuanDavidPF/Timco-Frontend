import API from "../../src/TimcoApi.js";

const urlParams = new URLSearchParams(window.location.search);
const projectKey = urlParams.get('projectId');
const owned = !!urlParams.get('owned');


const ProjectLogo = document.querySelector('.overview__header__logo');
const ProjectName = document.querySelector('.overview__header__projectName');
const ProjectType = document.querySelector('.overview__header__projectType');
const ProjectDescription = document.querySelector('.overview__header__projectDescription');

const ProjectBudget = document.querySelector('.overview__header__budget');
const ProjectDeadline = document.querySelector('.overview__header__deadline');

const ProjectBrief = document.querySelector('.overview__body__projectBrief');
const ProjectRequirements = document.querySelector('.overview__body__projectsRequirements');
const ProjectSkills = document.querySelector('.overview__body__skills');

const WebsiteButton = document.querySelector('.overview_website');
const LinkedInButton = document.querySelector('.overview_linkedin');
const DeliverButton = document.querySelector('#DeliverBtn');

if (DeliverButton) DeliverButton.style.display = owned ? 'block' : 'none'
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

    if (ProjectBudget) ProjectBudget.textContent = projectData.base_experience;
    if (ProjectDeadline) ProjectDeadline.textContent = projectData.weight;

    if (ProjectBrief) ProjectBrief.textContent = projectData.pokedex;

    if (ProjectRequirements) {
        ProjectRequirements.innerHTML = null;
        ProjectSkills.innerHTML = null;
        for (let i = 0; i < 10; i++) {

            const requirement = document.createElement('p');
            requirement.textContent = projectData.moves[i].move.name;


            const requirementHolder = document.createElement('li');
            requirementHolder.append(requirement);

            ProjectRequirements.append(requirementHolder);

            if (!ProjectSkills) return;

            const skill = document.createElement('p');
            skill.classList.add('overview__body__skill');
            skill.textContent = projectData.moves[i].move.name;
            ProjectSkills.append(skill);

        }

    }

    if (WebsiteButton) WebsiteButton.href = projectData.species.url;
    if (LinkedInButton) LinkedInButton.href = projectData.location_area_encounters;

}

RenderProjectData(projectKey);