import ListCard from "../../Components/ListCard/ListCard.js";
import API from "../../src/TimcoApi.js";
// import codedecJwt from "../../src/utils/parseJWT";

const urlParams = new URLSearchParams(window.location.search);
const IsRecruiterLogged = API.IsRecruiterLogged();

const projectKey = urlParams.get("projectId");
const owned = !!urlParams.get("owned");
const usertype = !!urlParams.get("user");

<<<<<<< HEAD
const ProjectLogo = document.querySelector(".overview__header__logo");
const ProjectName = document.querySelector(".overview__header__projectName");
const ProjectType = document.querySelector(".overview__header__projectType");
const ProjectDescription = document.querySelector(
  ".overview__header__projectDescription"
);
=======
const projectKey = urlParams.get('projectId');
const owned = !!urlParams.get('owned');
const usertype = urlParams.get('user');
>>>>>>> ChangeRoutes

const ProjectBudget = document.querySelector(".overview__header__budget");
const ProjectDeadline = document.querySelector(".overview__header__deadline");

const ProjectBrief = document.querySelector(".overview__body__projectBrief");
const ProjectRequirements = document.querySelector(
  ".overview__body__projectsRequirements"
);
const ProjectSkills = document.querySelector(".overview__body__skills");

const WebsiteButton = document.querySelector(".overview_website");
const LinkedInButton = document.querySelector(".overview_linkedin");

const DeliverButton = document.querySelector("#DeliverBtn");
const ApplyButton = document.querySelector("#ApplyBtn");

const DeliverModal = document.querySelector("#DeliverModal");
const ApplyModal = document.querySelector("#ApplyModal");

const btnReturnToDashBoard = document.getElementById("btnReturnToDashboard");

btnReturnToDashBoard.addEventListener("click", () => {
  if (IsRecruiterLogged) {
    API.GoToRecruiterDashboard();
  } else {
    API.GoToStudentDashboard();
  }
});

const candidatesTitle = document.querySelector("#overview__candidates__title");
const candidatesContainer = document.querySelector("#overview__candidates__container");


if (usertype != "recruiter") {
    if (candidatesTitle) candidatesTitle.remove();
    if (candidatesContainer) candidatesContainer.remove();


} else {
    if (DeliverButton) DeliverButton.remove();
    if (ApplyButton) ApplyButton.remove();
}



if (DeliverButton) {
  if (!owned) {
    DeliverButton.remove();
    if (DeliverModal) DeliverModal.remove();
  } else {
    DeliverButton.addEventListener("click", () => {
      DeliverModal.classList.remove("hidden");
    });
  }
}

if (ApplyButton) {
  if (owned) {
    ApplyButton.remove();
    if (ApplyModal) ApplyModal.remove();
  } else {
    ApplyButton.addEventListener("click", () => {
      ApplyModal.classList.remove("hidden");
    });
  }
}

if (DeliverModal) {
  DeliverModal.querySelector(".cancelBtn").addEventListener("click", () => {
    DeliverModal.classList.add("hidden");
  });

  DeliverModal.querySelector(".closeModal__btn").addEventListener(
    "click",
    () => {
      DeliverModal.classList.add("hidden");
    }
  );

  DeliverModal.addEventListener("click", (event) => {
    if (event.target != DeliverModal) return;

    DeliverModal.classList.add("hidden");
  });

  DeliverModal.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const Submission = {};

    [...e.target.elements].forEach(
      (element, index) => (Submission[element.name] = element.value)
    );
    if (await API.SubmitProject(Submission)) {
      alert("Proyecto entregado exitosamente");
      window.location.reload();
    }
  });
}
if (ApplyModal) {
  ApplyModal.querySelector(".cancelBtn").addEventListener("click", () => {
    ApplyModal.classList.add("hidden");
  });

  ApplyModal.querySelector(".closeModal__btn").addEventListener("click", () => {
    ApplyModal.classList.add("hidden");
  });

  ApplyModal.addEventListener("click", (event) => {
    if (event.target != ApplyModal) return;
    ApplyModal.classList.add("hidden");
  });

  ApplyModal.querySelector("form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const Request = {};

    [...e.target.elements].forEach(
      (element, index) => (Request[element.name] = element.value)
    );
    if (await API.JoinProjectRequest(Request)) {
      alert("Petición enviada exitosamente");
      window.location.reload();
    }
  });
}

const RenderProjectData = async (key) => {
  if (!key) return;
  console.log('KEY:', key)
  const projectData = await API.GetProjectByID(key);
  FillInformation(projectData);
};

const FillInformation = (projectData) => {
  debugger;
  if (!projectData) return;

  //   if (ProjectLogo) ProjectLogo.src = projectData.sprites.front_default;
  if (ProjectName) ProjectName.textContent = projectData.name;
  if (ProjectType) ProjectType.textContent = projectData.service.name;
  if (ProjectDescription)
    ProjectDescription.textContent = projectData.description;

  if (ProjectBudget) ProjectBudget.textContent = projectData.priceTotal;
  if (ProjectDeadline) ProjectDeadline.textContent = projectData.timelineDate;

  if (ProjectBrief) ProjectBrief.textContent = projectData.description;

  if (ProjectRequirements) {
    ProjectRequirements.innerHTML = null;
    ProjectSkills.innerHTML = null;

    const {skills} = projectData.service;
    debugger;

    skills.map((skill) => {
        // const requirement = document.createElement("p");
        // requirement.textContent = 'dhdhdh';

        // const requirementHolder = document.createElement("li");
        // requirementHolder.append(requirement);

        // ProjectRequirements.append(requirementHolder);

        if (!ProjectSkills) return;

        const skillName = document.createElement("p");
        skillName.classList.add("overview__body__skill");
        skillName.textContent = skill.name;
        ProjectSkills.append(skillName);
    });
    // for (let i = 0; i < 10; i++) {
    //   const requirement = document.createElement("p");
    //   requirement.textContent = projectData.moves[i].move.name;

    //   const requirementHolder = document.createElement("li");
    //   requirementHolder.append(requirement);

    //   ProjectRequirements.append(requirementHolder);

    //   if (!ProjectSkills) return;

<<<<<<< HEAD
    //   const skill = document.createElement("p");
    //   skill.classList.add("overview__body__skill");
    //   skill.textContent = projectData.moves[i].move.name;
    //   ProjectSkills.append(skill);
    // }
  }
=======

    if (candidatesContainer) {

        for (let i = 0; i < projectData.moves.length; i++) {

            const card = ListCard.CreateProjectCard({
                project: {
                    name: projectData.moves[i].move.name,
                    logoUri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${i + 1}.png`
                }, primaryBtn: {
                    label: 'Aceptar',
                    onclick: () => { }
                },
                secondaryBtn: {
                    label: 'Rechazar',
                    onclick: () => { }
                }
            });

            candidatesContainer.appendChild(card);
        }
    }


    if (WebsiteButton) WebsiteButton.href = projectData.species.url;
    if (LinkedInButton) LinkedInButton.href = projectData.location_area_encounters;
>>>>>>> ChangeRoutes

  if (WebsiteButton) WebsiteButton.href = projectData.species.url;
  if (LinkedInButton)
    LinkedInButton.href = projectData.location_area_encounters;
};

RenderProjectData(projectKey);
