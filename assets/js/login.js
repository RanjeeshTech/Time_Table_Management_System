const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
console.log(currentUser);
if (currentUser.length != 0) {
    location.replace("./dashboard.html");
} else {
    const loginForm = document.querySelector(".loginForm");
    const profile = JSON.parse(localStorage.getItem("users")) || [];
    let user = JSON.parse(localStorage.getItem("currentUser")) || [];

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    // toggling password icon

    togglePassword.addEventListener('click', function(e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        if (this.classList.contains("fa-eye")) {
            this.className = "far fa-eye-slash";
        } else if (this.classList.contains("fa-eye-slash")) {
            this.className = "far fa-eye";
        }
    });


    //Logging In
    let userFound = 0;
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const inputEmail = document.querySelector(".email").value;
        const inputPass = document.querySelector(".password").value;
        const inputInstitute = document.querySelector(".instituteName").value;
        for (let i = 0; i < profile.length; i++) {
            if (profile[i].email == inputEmail && profile[i].password == inputPass) {
                user = {
                    currentUserName: profile[i].username,
                    currentPassword: profile[i].password,
                    currentEmail: profile[i].email,
                    currentInstitute: profile[i].instituteName
                };
                localStorage.setItem("currentUser", JSON.stringify(user));
                document.querySelector(".login-success").style.transform = "translateY(45px)";
                document.querySelector(".email").disabled = true;
                document.querySelector(".password").disabled = true;
                document.querySelector(".instituteName").disabled = true;
                setTimeout(function() {
                    location.replace("./dashboard.html");
                }, 2000);
                return;
            }
        }
        document.querySelector(".no-user").style.transform = "translateY(45px)";
        document.querySelector(".email").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".instituteName").value = "";
        setTimeout(function() {
            document.querySelector(".no-user").style.transform = "translateY(-100px)";
            setTimeout(function() {
                location.replace("./index.html");
            }, 2000)
        }, 2000)
    })
}