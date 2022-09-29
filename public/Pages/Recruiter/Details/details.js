import API from "../../../src/TimcoApi.js";
document.querySelectorAll('input[type="date"]').forEach(input => input.min = new Date().toISOString().split("T")[0]);
const details = {};

const tabs = document.querySelectorAll(".top__tab__navbar>button");
const form = {}

const screens = [];

document.querySelectorAll(".details").forEach((screen, key) => {
    screens.push(screen)
    form[key] = [];


    screen.querySelectorAll(".details__forms").forEach(section => {
        form[key].push(section);

        const formInSection = section.querySelector(".details__forms__form");
        if (formInSection) formInSection.addEventListener('submit', e => {
            e.preventDefault();

            [...e.target.elements].forEach(element => {
                if (element.name && element.value) details[element.name] = element.value;
            })
            console.log(details);
            NextSection();
        })
    })
})




let currentScreen = 0;
let currentSection = 0





const SetCurrentScreen = (value) => {

    screens[currentScreen].classList.add('hidden');
    tabs[currentScreen].disabled = false;
    tabs[currentScreen].classList.remove('selected')




    currentScreen = value;
    if (form[currentScreen]) currentSection = form[currentScreen].findIndex(section => !section.classList.contains("hidden"));


    let nextScreen = screens[currentScreen];

    if (nextScreen) {
        tabs[currentScreen].disabled = false;
        screens[currentScreen].classList.remove('hidden')
        tabs[currentScreen].classList.add('selected')
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

const FinishForm = () => {
    API.UploadRecruiterDetails(details);
}

SetCurrentScreen(0);





