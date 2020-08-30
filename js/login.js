//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {
    document.getElementById("login").addEventListener("click", function() {
        let email = document.getElementById("inputemail");
        let pass = document.getElementById("inputpass");
        let campoOk = true;

        if (email.value === "") {
            email.classList.add("invalid");
            campoOk = false;
        }

        if (pass.value === "") {
            pass.classList.add("invalid");
            campoOk = false;
        }
        if (campoOk) {
            localStorage.setItem("user", JSON.stringify({ mail: email.value }));
            window.location = "inicio.html";

        } else {
            alert("No debe haber espacios en blanco papu. XD");
        }

    });



});