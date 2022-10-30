import ListCard from "../../Components/ListCard/ListCard.js";
import API from "../../src/TimcoApi.js";

const urlParams = new URLSearchParams(window.location.search);


const profileId = urlParams.get('profileId');
const owned = !!urlParams.get('owned');
const usertype = urlParams.get('user');

const ProfileImage = document.querySelector('.overview__header__logo');
const ProfileName = document.querySelector('.overview__header__projectName');
const ProfileType = document.querySelector('.overview__header__projectType');
const ProfileDescription = document.querySelector('.overview__header__projectDescription');

const ProfileBudget = document.querySelector('.overview__header__budget');
const ProfileDeadline = document.querySelector('.overview__header__deadline');

const ProfileBrief = document.querySelector('.overview__body__projectBrief');
const ProfileRequirements = document.querySelector('.overview__body__projectsRequirements');
const ProfileSkills = document.querySelector('.overview__body__skills');

const WebsiteButton = document.querySelector('.overview_website');
const LinkedInButton = document.querySelector('.overview_linkedin');

const DeliverButton = document.querySelector('#DeliverBtn');
const ApplyButton = document.querySelector('#ApplyBtn');

const DeliverModal = document.querySelector('#DeliverModal');
const ApplyModal = document.querySelector('#ApplyModal');

const candidatesTitle = document.querySelector("#overview__candidates__title");
const candidatesContainer = document.querySelector("#overview__candidates__container");

const navButtons = document.querySelectorAll('.navButton');
const mainSections = document.querySelectorAll('.mainSection');


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

        DeliverButton.addEventListener('click', () => {
            DeliverModal.classList.remove('hidden');
        })
    }
}

if (ApplyButton) {
    if (owned) {
        ApplyButton.remove();
        if (ApplyModal) ApplyModal.remove();

    } else {

        ApplyButton.addEventListener('click', () => {
            ApplyModal.classList.remove('hidden');

        })

    }
}

if (DeliverModal) {

    DeliverModal.querySelector('.cancelBtn').addEventListener('click', () => {
        DeliverModal.classList.add('hidden');
    })

    DeliverModal.querySelector('.closeModal__btn').addEventListener('click', () => {
        DeliverModal.classList.add('hidden');
    })

    DeliverModal.addEventListener('click', (event) => {
        if (event.target != DeliverModal) return;

        DeliverModal.classList.add('hidden');
    })


    DeliverModal.querySelector('form').addEventListener('submit', async e => {
        e.preventDefault();

        const Submission = {};

        [...e.target.elements].forEach((element, index) => Submission[element.name] = element.value)
        if (await API.SubmitProfile(Submission)) {
            alert("Proyecto entregado exitosamente");
            window.location.reload();
        }
    })

}

if (ApplyModal) {


    ApplyModal.querySelector('.cancelBtn').addEventListener('click', () => {
        ApplyModal.classList.add('hidden');
    })


    ApplyModal.querySelector('.closeModal__btn').addEventListener('click', () => {
        ApplyModal.classList.add('hidden');
    })

    ApplyModal.addEventListener('click', (event) => {
        if (event.target != ApplyModal) return;
        ApplyModal.classList.add('hidden');

    })

    ApplyModal.querySelector('form').addEventListener('submit', async e => {
        e.preventDefault();

        const Request = {};

        [...e.target.elements].forEach((element, index) => Request[element.name] = element.value)
        if (await API.JoinProfileRequest(Request)) {
            alert("Petición enviada exitosamente");
            window.location.reload();
        }
    })

}

const RenderProfileData = async (key) => {

    if (!key) return;
    const profileData = await API.GetProfileByID(key);
    FillInformation(profileData);
}

const FillInformation = (profileData) => {

    if (!profileData) return;

    if (ProfileImage) ProfileImage.src = profileData.sprites.front_default;
    if (ProfileName) ProfileName.textContent = profileData.name;
    if (ProfileType) ProfileType.textContent = profileData.types[0].type.name;
    if (ProfileDescription) ProfileDescription.textContent = profileData.pokedex;

    if (ProfileBudget) ProfileBudget.textContent = profileData.base_experience;
    if (ProfileDeadline) ProfileDeadline.textContent = profileData.weight;

    if (ProfileBrief) ProfileBrief.textContent = profileData.pokedex;

    if (ProfileRequirements) {
        ProfileRequirements.innerHTML = null;
        if (ProfileSkills) ProfileSkills.innerHTML = null;
        for (let i = 0; i < 10; i++) {

            const requirement = document.createElement('p');
            requirement.textContent = profileData.moves[i].move.name;


            const requirementHolder = document.createElement('li');
            requirementHolder.append(requirement);

            ProfileRequirements.append(requirementHolder);

            if (ProfileSkills) {

                const skill = document.createElement('p');
                skill.classList.add('overview__body__skill');
                skill.textContent = profileData.moves[i].move.name;
                ProfileSkills.append(skill);

            }
        }

    }


    if (candidatesContainer) {

        for (let i = 0; i < profileData.moves.length; i++) {

            const card = ListCard.CreateProfileCard({
                project: {
                    name: profileData.moves[i].move.name,
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

    if (WebsiteButton) WebsiteButton.href = profileData.species.url;
    if (LinkedInButton) LinkedInButton.href = profileData.location_area_encounters;

}

RenderProfileData(profileId);


navButtons.forEach((btn, index) => {
    console.log(btn);
    btn.addEventListener('click', () => {

        SetMainSection(index);

    })
})


const SetMainSection = (index) => {

    navButtons.forEach(btn => {
        btn.classList.remove("selected");
    })

    mainSections.forEach(section => {
        section.classList.add("hidden");
    })

    navButtons[index].classList.add('selected');
    mainSections[index].classList.remove('hidden');
}