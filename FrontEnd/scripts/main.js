//---GALLERY-VISUALISATION
const galleryElement = document.querySelector('.gallery');
const portfolioElement = document.querySelector('#portfolio');
const modifWindowSelector = document.querySelector('#modifying-window');
const windowGalleryElement = document.querySelector('.window-gallery');


// single source of truth
let works = [];
let category = 0;
let secondCategories = []


const getWorks = async () => {
    const response = await fetch('http://localhost:5678/api/works')
    const data = await response.json()
    works = [...data]
}


const getCategories = async () => {
    const response = await fetch('http://localhost:5678/api/categories')
    const data = await response.json()
    secondCategories = [...data]
}


const createWorks = (works) => {

    works.forEach(work => {

        if (work.categoryId === category) {


            createWork(work);     

        } else if (category === 0) {

            createWork(work);

        }

    })
}


const createWork = (work) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = work.imageUrl
    img.alt = work.title
    figcaption.textContent = work.title
    figure.appendChild(img)
    figure.appendChild(figcaption)
    figure.classList.add('single-project');

    galleryElement.appendChild(figure)

}


//create modifying window works
//AND CREATE DELETE BUTTON
const createModWindowSingleWork = (work) => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const deleteBtn = document.createElement('button');

    deleteBtn.addEventListener('click', () => {
        //console.log(`dellBtn nomber: ${work.id} is Pressed`)

        const deletedImage = document.getElementById(work.id);
        deletedImage.parentElement.remove();
        delWork(work.id)
        clearElements();




    });

    deleteBtn.classList.add('deleteBtn');
    deleteBtn.setAttribute('id', work.id);
    // deleteBtn.innerText = 'DEL';


    // idImg = work.id;
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);
    figure.appendChild(deleteBtn);
    figure.classList.add('single-project-tiny');

    windowGalleryElement.appendChild(figure);
}

const createModWindowWorks = (works) => {

    works.forEach(work => {

        createModWindowSingleWork(work);

    })
}


//---GALLERY-VISUALISATION-END

const clearElements = async () => {
    let forRemove = document.querySelectorAll(".window-gallery, .gallery");
    works = []
    galleryElement.innerHTML = '';
    windowGalleryElement.innerHTML = '';
    await getWorks();
    createWorks(works)
    createModWindowWorks(works)
}



//INITIALIZING FUNCTIONS 

const init = async () => {

    await getWorks()
    await getCategories()
    createWorks(works)
    createFilters(works)
    tokenCheckFunction()

}
//RUN ALL PRINCIPAL FUNCTIONS
init()

//TOKEN CHECKER 
let tokenCheck = sessionStorage.getItem('token');
const tokenCheckFunction = () => {

    if (tokenCheck) {
        document.querySelector("#loginBtn").innerHTML = "log out";
        document.getElementById("edit-mode").classList.remove("editMode-not-visible");
        console.log("The Token is Here!");
        modifyProjectsBtn();
        //Clear filtersContainer(filter buttons)
        const forRemoveParent = document.querySelector('.filtersContainer');
        forRemoveParent.remove();


        const logOut = () => {
            const logOutBtn = document.getElementById("loginBtn");
            logOutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                sessionStorage.clear();
                logOutBtn.innerHTML = "login";
                document.getElementById("edit-mode").classList.add("editMode-not-visible");
                //window.location.assign('/index.html')
                location.reload()
            })
        }
        logOut();


    }
}


// CREATE FILTERS
const createFilters = (works) => {
    let categoriesArr = [];

    works.forEach(work => {
        
        if (!categoriesArr.includes(work.category.name)) {

            let currentCategory = String(work.category.name);
            categoriesArr.push(currentCategory);

        }

    });

    const filterBtnAll = document.createElement("button");
    filterBtnAll.classList.add('filterBtn');
    filterBtnAll.classList.add('btn');
    filterBtnAll.classList.add('classSelected');
    filterBtnAll.innerText = "Show All";
    filtersContainer.appendChild(filterBtnAll);
    filterBtnAll.addEventListener('click', () => {
        category = 0;
        const allButtons  = document.querySelectorAll('.filterBtn')
        allButtons.forEach(btn => btn.classList.remove('classSelected'))
        filterBtnAll.classList.add('classSelected');
        
        clearElements();

    });
    

    categoriesArr.forEach((categoryName, i) => {
        const filterBtn = document.createElement("button");
        filterBtn.classList.add('filterBtn');
        filterBtn.classList.add('btn');
        filterBtn.innerText = categoriesArr[i];
        filtersContainer.appendChild(filterBtn);

        filterBtn.addEventListener('click', () => {
            category = i + 1;

            if (filterBtn.innerText === categoriesArr[i]) {
                
                const allButtons  = document.querySelectorAll('.filterBtn')
                allButtons.forEach(btn => btn.classList.remove('classSelected'))
                filterBtn.classList.add('classSelected');
                
            }
            clearElements();
            
        });


    });
}

const filtersContainer = document.createElement('div');
filtersContainer.classList.add('filtersContainer');
portfolioElement.insertBefore(filtersContainer, galleryElement);

const filterChoice = () => {

    const selectedFilter = document.getElementByClassName("filterBtn").innerText;
    
}



//document.getElementsByClassName('filterBtn').classList.remove('classSelected');