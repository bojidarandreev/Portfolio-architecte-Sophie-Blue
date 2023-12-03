 const loginForm = document.querySelector('#login');

const login = async (data) => {
    const user = {
        email : data.get('email'),
        password : data.get('password'),
    }
    //console.log('test')
    return await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
}

 
loginForm.addEventListener('submit', async (event) => {
    clearError();
    event.preventDefault()
    const data = new FormData(loginForm)

    const response = await login(data)
    const user = await response.json()
    //console.log(user)

    if (response.status === 200) {
        sessionStorage.setItem('token', user.token)
        window.location.assign('/index.html')
        document.querySelector("#loginBtn").innerHTML = "log out";
        } else if (response.status !== 200) {
        //console.log(response.status);
        loginError();
    }

})


//Login error message function
const error = document.createElement('div');
const formSelector = document.querySelector('#login');
error.classList.add('error-container');
formSelector.appendChild(error);

const loginError = () => {
    
    const errorTitle = document.createElement('h3');
    const errorMessage = document.createElement('p');

    error.appendChild(errorTitle);
    error.appendChild(errorMessage);
    
    errorTitle.innerText = "Une erreur s'est produite";
    errorMessage.innerText = "Veuillez vérifier les informations avec lesquelles vous essayez de vous connecter, puis réessayer."
}
//clear error message
const clearError = () => {
    let forRemove = document.querySelector(".error-container");
    forRemove.innerHTML = "";
}

