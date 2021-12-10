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

        profile.push({
            username: document.querySelector(".username").value,
            email: document.querySelector(".email").value,
            password: document.querySelector(".password").value,
            instituteName: document.querySelector(".instituteName").value,
            tables: [],
            classTime: []
        });

        localStorage.setItem("users", JSON.stringify(profile));
        document.querySelector(".username").value = "";
        document.querySelector(".email").value = "";
        document.querySelector(".password").value = "";
        document.querySelector(".instituteName").value = "";

        location.replace("./index.html");

    });
}