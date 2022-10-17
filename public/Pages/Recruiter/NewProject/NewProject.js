import API from "../../../src/TimcoApi.js";
document.querySelectorAll('input[type="date"]').forEach(input => input.min = new Date().toISOString().split("T")[0]);

const project = {};

const form = {}

const screens = [];



const projectNameHTML = document.querySelector("#summary_projectName");
const projectBudgetHTML = document.querySelector("#summary_projectBudget");
const projectDeadlineHTML = document.querySelector("#summary_projectDeadline");


document.querySelectorAll(".top__tab__navbar>button").forEach((button, key) => {
    button.addEventListener('click', () => {
        SetCurrentScreen(key);
    })
})



document.querySelectorAll(".details").forEach((screen, key) => {
    screens.push(screen)
    form[key] = [];


    screen.querySelectorAll(".details__forms").forEach(section => {
        form[key].push(section);

        const formInSection = section.querySelector(".details__forms__form");
        if (formInSection) formInSection.addEventListener('submit', e => {
            e.preventDefault();


            [...e.target.elements].forEach(element => {
                if (element.name && element.value) {


                    project[element.name] = element.value;

                }
            })
            FillProjectSummary();
            NextSection();
        })
    })
})




let currentScreen = 0;
let currentSection = 0





const SetCurrentScreen = (value) => {

    screens[currentScreen].classList.add('hidden');





    currentScreen = value;
    if (form[currentScreen]) currentSection = form[currentScreen].findIndex(section => !section.classList.contains("hidden"));


    let nextScreen = screens[currentScreen];

    if (nextScreen) {

        screens[currentScreen].classList.remove('hidden')

    } else FinishForm();

}

const NextSection = () => {

    form[currentScreen][currentSection].classList.add('hidden');
    currentSection++;

    let nextSection = form[currentScreen][currentSection];

    if (nextSection) nextSection.classList.remove('hidden');
    else {
        form[currentScreen][currentSection - 1].classList.remove('hidden')
        SetCurrentScreen(currentScreen + 1);
    }
}


window.PreviousSection = () => {
    form[currentScreen][currentSection].classList.add('hidden');
    currentSection--;

    let nextSection = form[currentScreen][currentSection];

    if (nextSection) nextSection.classList.remove('hidden');
    else {
        form[currentScreen][currentSection + 1].classList.remove('hidden')
        SetCurrentScreen(currentScreen - 1);
    }

}

const FinishForm = async () => {
    await API.UploadProject(project);
    window.location.href = './../Dashboard/dashboard.html'
}

const FillProjectSummary = () => {
    if (project.projectName && projectNameHTML) projectNameHTML.textContent = project.projectName;
    if (project.projectBudget && projectBudgetHTML) projectBudgetHTML.textContent = project.projectBudget;
    if (project.projectDeadline && projectDeadlineHTML) projectDeadlineHTML.textContent = project.projectDeadline;


}//Closes FillProjecSummary method








