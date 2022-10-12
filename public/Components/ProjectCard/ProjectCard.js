




const ProjectCard = (() => {

    const Create = ({ name = 'project name', owner = "project owner", logoUri = 'https://images.ctfassets.net/oggad6svuzkv/7znyJc3Y7SecEoKSYKWoaQ/4a24e9015c360799cfb072adcd92cc5e/P_G_Logo_RGB.svg', budget = 0, deadline = 3, projectTheme = '#F7863C' }, onClick = () => { alert("click") }) => {
        const card = document.createElement("article");
        card.style.backgroundColor = projectTheme;
        card.classList.add('projectCard');

        const projectLogo = document.createElement('img');
        projectLogo.classList.add('projectCard__thumbnail');
        projectLogo.src = logoUri;
        card.appendChild(projectLogo);

        const projectOwner = document.createElement('p');
        projectOwner.classList.add('projectCard__owner');
        projectOwner.textContent = owner;
        card.append(projectOwner);

        const projectName = document.createElement('h5');
        projectName.classList.add('projectCard__title');
        projectName.textContent = name;
        card.append(projectName);

        const budgetSection = document.createElement('div');
        budgetSection.classList.add('projectCard__budget');
        card.append(budgetSection);

        const budgetIcon = document.createElement('img');
        budgetIcon.src = './../../../Components/ProjectCard/resources/budget.png'
        budgetSection.append(budgetIcon);

        const projectBudget = document.createElement('p');
        projectBudget.textContent = `$ ${budget}`
        budgetSection.append(projectBudget);

        const deadlineSection = document.createElement('div');
        deadlineSection.classList.add('projectCard__deadline');
        card.append(deadlineSection);

        const deadlineIcon = document.createElement('img');
        deadlineIcon.src = './../../../Components/ProjectCard/resources/deadline.png'
        deadlineSection.append(deadlineIcon);

        const projectDeadline = document.createElement('p');
        projectDeadline.textContent = `${deadline} Semanas`
        deadlineSection.append(projectDeadline);

        const ctaButton = document.createElement('button');
        ctaButton.onclick = onClick;
        ctaButton.type = 'button'
        ctaButton.classList.add('cta_button');
        ctaButton.textContent = 'Aplicar';
        card.append(ctaButton);

        return card;
    }

    return {
        Create,
    }

})()



export default ProjectCard
