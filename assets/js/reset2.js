const resetForm = document.querySelector(".resetForm");
const profile = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];

// const inputEmail = document.querySelector(".email").value;
// const inputPass = document.querySelector(".password").value;
// const inputInstitute = document.querySelector(".instituteName").value;

if (currentUser.length == 0) {
    location.replace("./index.html");
} else {
    // Password Toggling
    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');

    togglePassword.addEventListener('click', function(e) {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        if (this.classList.contains("fa-eye")) {
            this.className = "far fa-eye-slash";
        } else if (this.classList.contains("fa-eye-slash")) {
            this.className = "far fa-eye";
        }
    });

    const toggleNewPassword = document.querySelector('#toggleNewPassword');
    const newpassword = document.querySelector('#new-password');

    toggleNewPassword.addEventListener('click', function(e) {
        const type = newpassword.getAttribute('type') === 'password' ? 'text' : 'password';
        newpassword.setAttribute('type', type);
        if (this.classList.contains("fa-eye")) {
            this.className = "far fa-eye-slash";
        } else if (this.classList.contains("fa-eye-slash")) {
            this.className = "far fa-eye";
        }
    });


    //reseting Password
    resetForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const inputEmail = document.querySelector(".email").value;
        const inputPass = document.querySelector(".password").value;
        const inputInstitute = document.querySelector(".instituteName").value;
        const inputNewPassword = document.querySelector(".newPassword").value;
        for (let i = 0; i < profile.length; i++) {
            if (profile[i].email == inputEmail && profile[i].password == inputPass && profile[i].instituteName == inputInstitute) {
                profile[i].password = inputNewPassword;
                localStorage.setItem("users", JSON.stringify(profile));
                document.querySelector(".reset-success").style.transform = "translateY(45px)";
                setTimeout(function() {
                    localStorage.setItem("currentUser", JSON.stringify([]));
                    location.replace("./index.html");
                }, 2000)
                return;
            }
        }
        document.querySelector(".no-user").style.transform = "translateY(45px)";
        document.querySelector(".email").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".instituteName").value = "";
        document.querySelector(".newPassword").value = "";
        setTimeout(function() {
            document.querySelector(".no-user").style.transform = "translateY(-100px)";
            setTimeout(function() {
                location.replace("./resetPass.html");
            }, 2000)
        }, 2000)
    })
}

console.log(profile);