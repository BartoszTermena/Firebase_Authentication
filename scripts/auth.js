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
        console.log(res.user);
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    })
    .catch(err => {
        throw err;
    });
})