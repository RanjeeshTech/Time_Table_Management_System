const signupForm = document.getElementById("signupForm");
const profile = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = JSON.parse(localStorage.getItem("currentUser")) || [];
if (currentUser.length != 0) {
    location.replace("./dashboard.html");
} else {

    console.log(JSON.stringify(profile));
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
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();

        for (let i = 0; i < profile.length; i++) {
            if (document.querySelector(".email").value == profile[i].email) {
                document.querySelector(".yes-user").style.transform = "translateY(45px)";
                document.querySelector(".username").value = "";
                document.querySelector(".email").value = "";
                document.querySelector(".password").value = "";
                document.querySelector(".instituteName").value = "";
                setTimeout(() => {
                    document.querySelector(".yes-user").style.transform = "translateY(-100px)";
                }, 2000);
                return;
            }
        }

        profile.push({
            username: document.querySelector(".username").value,
            email: document.querySelector(".email").value,
            password: document.querySelector(".password").value,
            instituteName: document.querySelector(".instituteName").value,
            tables: [],
            classTime: []
        });

        localStorage.setItem("users", JSON.stringify(profile));
        document.querySelector(".create-success").style.transform = "translateY(45px)";
        document.querySelector(".username").value = "";
        document.querySelector(".email").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".instituteName").value = "";
        document.querySelector(".username").disabled = true;
        document.querySelector(".email").disabled = true;
        document.querySelector(".password").disabled = true;
        document.querySelector(".instituteName").disabled = true;
        setTimeout(() => {
            document.querySelector(".create-success").style.transform = "translateY(-100px)";
            location.replace("./index.html");
        }, 2000);


    });
}