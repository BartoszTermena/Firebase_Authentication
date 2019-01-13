//get data from database
db.collection('guides').get()
.then(data => {
    setupGuides(data.docs);
})
.catch(err => {
    throw err;
});

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if(!user) {
        console.log('user logged out')
    } else if (user) {
        console.log('user logged in', user)
    }
});

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
    auth.signOut();
});

//login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    //get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    //login user
    auth.signInWithEmailAndPassword(email, password)
    .then(res => {

        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
    .catch(err => {
        throw err;
    })
});