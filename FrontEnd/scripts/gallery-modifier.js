const imageForm = document.querySelector('#image-form')

const updateUI = async () => {
    works = []
    galleryElement.innerHTML = '';
    windowGalleryElement.innerHTML = '';

    await getWorks();
    createWorks(works)
    createModWindowWorks(works)

}
const closeUI = () => {
    windowGalleryElement.innerHTML = '';
}


const postWork = async (data) => {
    return await fetch('http://localhost:5678/api/works/', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${tokenCheck}`,
        },
        body: data,
})
}

imageForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const data = new FormData(imageForm)

    const response = await postWork(data)
    //console.log('response', response)
    if (response.ok) {
        const createdWork = await response.json()
        //console.log(createdWork)
        updateUI()
        document.querySelector('.closeBtn').click();
        
    }
    
})

document.querySelector('#photo').addEventListener('change', (event) => {
    //console.log(event.target.files[0])
    const url = URL.createObjectURL(event.target.files[0]);
    const uploadBtn = document.querySelector("#uploadPhotoText");
    const uploadText = document.querySelector("#upload-instructions");

    //uploadPrevueSelector.src = url;
    document.getElementById("upload-image-preview").src = url;
    uploadBtn.classList.add('uploadElement-not-visible');
    uploadText.classList.add('uploadElement-not-visible');
    formCompleted();
    
    // créer element img avec en src l'url temporaire
})


//---DELETE-IMAGE

const delWork = async (data) => {
    const workForDelete = 'http://localhost:5678/api/works/'+ data;
    return await fetch(workForDelete, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${tokenCheck}`,
        }
        
})
}


//modying-window
const modWindowVisibility = document.querySelector('#modifying-window');

const closeWindow = () => {

    const closeSelector = document.querySelector('.closeBtn');
    closeSelector.addEventListener('click', () => {
        closeWin();
    })

    const closeBgSelector = document.querySelector('.close-background');
    closeBgSelector.addEventListener('click', () => {
        closeWin();     
    })


    const closeWin = () => {
        //console.log('add class not-visible-modWindow function');
        modWindowVisibility.classList.add('not-visible-modWindow');
        uploadBtnVisible();
        //clearElements();
        closeUI();
        document.querySelector('.backBtn').click();
    }


    
}
closeWindow();

//back Button functionality
const backBtn = () => {
    const backBtnSelector = document.querySelector('.backBtn');
    backBtnSelector.addEventListener('click', () => {
        uploadBtnVisible();
        resetUploadWindow();
        document.querySelector('.backBtn').classList.add('backBtn-not-visible');
        document.getElementById("upload-formBTN").classList.remove("addPhotoBtn-not-visible")
    })
}
backBtn();

const resetUploadWindow = () => {
    miniGallerySelector.classList.remove("window-gallery-not-visible");
        uploadFormSelector.classList.add("not-visible-form");

        //form reset
        const element = document.getElementById('image-form');
        element.reset();

        document.getElementById("upload-image-preview").src = "assets/icons/empty-image.svg";
}
//open window with "modifier BTN"
const modifyProjectsBtn = () => {
    
    const projectModifyBtn = document.createElement("button");
    projectModifyBtn.classList.add('project-modify-btn');
    projectModifyBtn.innerText = 'modifier';
    portfolioElement.insertBefore(projectModifyBtn, galleryElement);


    
    projectModifyBtn.addEventListener('click', () => {
        
        //console.log('ModifierBTN Pressed');
        updateUI();
        modWindowVisibility.classList.remove('not-visible-modWindow')

    });
}

//addPhoto Botton functionality

const miniGallerySelector = document.querySelector(".window-gallery");
const uploadFormSelector = document.querySelector("#image-form");
const showUploadForm = () => {
    const addPhotoBtn = document.querySelector("#upload-formBTN");
    addPhotoBtn.addEventListener("click", () => {
        document.querySelector('.backBtn').classList.remove('backBtn-not-visible');
        miniGallerySelector.classList.add("window-gallery-not-visible");

        
        uploadFormSelector.classList.remove("not-visible-form");
        addPhotoBtn.classList.add("addPhotoBtn-not-visible");
        
    })
}
showUploadForm();
//create project modifying window

const modifWindow = () => {
    createModWindowWorks(works);
}


// Choose photo for upload Button Visible Function
const uploadBtnVisible = () => {
    const uploadBtn = document.querySelector("#uploadPhotoText");
    const uploadText = document.querySelector("#upload-instructions");

    //uploadPrevueSelector.src = url;
    
    uploadBtn.classList.remove('uploadElement-not-visible');
    uploadText.classList.remove('uploadElement-not-visible');
}

//upload form validator sctipt
const formCompleted = () => {
    const IF = document.getElementById("upload-image-preview").src;
    const T = document.getElementById("Titre").value;
    const CS = document.getElementById("category-select").value;
    const submitBtn = document.getElementById('uploadFormValidator');
    if (IF.includes('empty-image.svg') || T == '' || CS == '') {
        console.log('Form not complete')
        submitBtn.classList.add("buttonGray");
        
    } else {
        console.log('form is complete')
        console.log(IF)
        // submitBtn.classList.remove("buttonGray");
        submitBtn.classList.remove("buttonGray");
        // submitBtn.setAttribute(type, submit);
    }
}
document.getElementById("image-form").addEventListener("focusout", () =>{
    console.log('imageFormOutOfFocus');
    formCompleted();
})
document.getElementById("Titre").addEventListener("focusout", () =>{
    formCompleted();
})
document.getElementById("category-select").addEventListener("click", () =>{
    console.log('cetegorySelectOutOfFocus');
    formCompleted();
})



// function hideUploadBtn() {
//     if (document.readyState === "loading") {
//         // Loading hasn't finished yet
//         document.addEventListener("DOMContentLoaded", doSomething);
//       } 
// }

// if (document.readyState === "loading") {
//   // Loading hasn't finished yet
//   document.addEventListener("DOMContentLoaded", doSomething);
// } 

// uploadPressed();

// if (!#upload-imageForm.src === assets/icons/empty-imageForm.svg) {
//     HIDE uploadButton    
// }