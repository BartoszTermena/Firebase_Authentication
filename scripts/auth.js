//signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    //signup user
    auth.createUserWithEmailAndPassword(email, password)
    .then(res => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch(err => {
        throw err;
    });
});

//logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (event) => {
    event.preventDefault();
    auth.signOut()
    .then(() => {
        console.log('logout')
    })
    .catch(err => {
        throw err;
    });
});