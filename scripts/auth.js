//add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole');
    addAdminRole({ email: adminEmail}).then(res => {
        console.log(res)
    })
    .catch(err => {
        throw err;
    })
});

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user) {
        //check if user is admin
        user.getIdTokenResult().then(idToken => {
            user.admin = idToken.claims.admin;
        }).catch(err => {throw err;})
        //get data from database
        db.collection('guides').onSnapshot(data => {
            setupGuides(data.docs);
            setupUI(user);
        }, err=> {
            console.log(err.message)
        });
    } else  {
        setupUI();
        setupGuides([]);
    }
});

//create-form
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    db.collection('guides').add({
        title: createForm['title'].value,
        content: createForm['content'].value
    })
    .then(() => {
        //close modal
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    })
    .catch(err => {
        console.log(err)
    });
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
        return db.collection('users').doc(res.user.uid).set({
            bio: signupForm['signup-bio'].value
        });
    }).then(() => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    })
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
        loginForm.querySelector('.error').innerHTML = '';
    })
    .catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    })
});