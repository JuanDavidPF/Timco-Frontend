




const ListCard = (() => {

    const CreateProjectCard = ({
        name = 'project name',
        description = 'project description',
        company = { name: 'company name' },
        logoUri = 'https://images.ctfassets.net/oggad6svuzkv/7znyJc3Y7SecEoKSYKWoaQ/4a24e9015c360799cfb072adcd92cc5e/P_G_Logo_RGB.svg', 
        priceTotal = 0,
        timelineDate = 3,
        projectTheme = '#F7863C' 
    }, OnDeliver = () => { }, OnBrief = () => { }) => {
        const card = document.createElement("article");

        card.classList.add('listCard');

        const projectLogo = document.createElement('img');
        projectLogo.classList.add('listCard__image');
        projectLogo.src = logoUri;
        card.appendChild(projectLogo);


        const informationSection = document.createElement('section');
        informationSection.classList.add('listCard__information');
        card.appendChild(informationSection);

        const projectTitle = document.createElement('h4');
        projectTitle.classList.add('listCard__information__title');
        projectTitle.textContent = name;
        informationSection.appendChild(projectTitle);


        const projectDetails = document.createElement('div');
        projectDetails.classList.add('listCard__information__information');
        informationSection.append(projectDetails);

        const companySpan = document.createElement('span');
        const companySpanIcon = document.createElement('img');
        companySpanIcon.src = './../../../Components/ListCard/resources/company.png';
        companySpan.append(companySpanIcon);
        projectDetails.append(companySpan);

        const companyName = document.createElement('small');
        // companyName.textContent = owner;
        companyName.textContent = company.name;
        companySpan.appendChild(document.createElement('p')).appendChild(companyName);



        const budgetSpan = document.createElement('span');
        const budgetSpanIcon = document.createElement('img');
        budgetSpanIcon.src = './../../../Components/ListCard/resources/budget.png';
        budgetSpan.append(budgetSpanIcon);
        projectDetails.append(budgetSpan);


        const budgetAmount = document.createElement('small');
        budgetAmount.textContent = priceTotal;
        // budgetAmount.textContent = budget;
        budgetSpan.appendChild(document.createElement('p')).appendChild(budgetAmount);



        const deadlineSpan = document.createElement('span');
        const deadlineSpanIcon = document.createElement('img');
        deadlineSpanIcon.src = './../../../Components/ListCard/resources/deadline.png';
        deadlineSpan.append(deadlineSpanIcon);
        projectDetails.append(deadlineSpan);


        const deadlineTime = document.createElement('small');
        // deadlineTime.textContent = deadline + ' Semanas';
        deadlineTime.textContent = timelineDate;
        deadlineSpan.appendChild(document.createElement('p')).appendChild(deadlineTime);


        const cardControls = document.createElement('section');
        cardControls.classList.add('listCard__controls');
        card.append(cardControls);


        const deliverBtn = document.createElement('button');

        deliverBtn.type = 'button'
        deliverBtn.classList.add('cta_button', '--accented');
        deliverBtn.textContent = 'Entregar';
        cardControls.append(deliverBtn);


        const briefBtn = document.createElement('button');

        briefBtn.type = 'button'
        briefBtn.classList.add('cta_button');
        briefBtn.textContent = 'Ver brief';
        cardControls.append(briefBtn);

        briefBtn.onclick = OnBrief;


        return card;
    }

    return {
        CreateProjectCard,
    }

})()



export default ListCard
