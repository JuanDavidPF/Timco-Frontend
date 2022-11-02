import ListCard from "../../../Components/ListCard/ListCard.js";
import ProjectCard from "../../../Components/ProjectCard/ProjectCard.js";
import API from "./../../../src/TimcoApi.js"
import codedecJwt from "./../../../src/utils/parseJWT.js";


document.getElementById("signOutButton").addEventListener('click', () => {
    SignOut()

})

const vacancyContainer = document.querySelector("#dashboard__vacancies");
const myProjectsContainer = document.querySelector("#dashboard_me__projects__container");

const getUserData = () => {
    const token = localStorage.getItem('token');
    const userData = codedecJwt(token);
    let userName = userData.data.name;
    let userDetail;

    if(API.IsRecruiterLogged){

       userDetail = userData.data.companyName;
    }else{
        userDetail = userData.data.area.name;
    }
    //projectKey.value = userName;
    

    const userNameSideBar = document.getElementById("userName");
    const userDetailSideBar= document.getElementById("userDetail");
    const helloUserNameTitle = document.getElementById("helloUserName");

    console.log(userNameSideBar.innerHTML);
    console.log(userDetailSideBar);

    userNameSideBar.innerHTML = userName;
    helloUserNameTitle.innerHTML = userName;
    userDetailSideBar.innerHTML=userDetail;

}

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
getUserData();