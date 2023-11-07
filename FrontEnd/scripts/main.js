//---GALLERY-VISUALISATION
const galleryElement = document.querySelector('.gallery');
const portfolioElement = document.querySelector('#portfolio');



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



//---GALLERY-VISUALISATION-END

const clearElements = async () => {
    let forRemove = document.querySelectorAll(".gallery");
    works = []
    galleryElement.innerHTML = '';
    
    await getWorks();
    createWorks(works)
    
}



//INITIALIZING FUNCTIONS 

const init = async () => {

    await getWorks()
    await getCategories()
    createWorks(works)
    createFilters(works)

}
//RUN ALL PRINCIPAL FUNCTIONS
init()


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



document.getElementsByClassName('filterBtn').classList.remove('classSelected');