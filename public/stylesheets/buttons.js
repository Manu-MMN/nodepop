document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector(".login-logout-btn");
    console.log("login button:", loginButton)
    
    const userToken = localStorage.getItem("userToken"); // Obtener token del almacenamiento local

    if (userToken) {
        // Usuario logueado: Mostrar "Logout"
        loginButton.textContent = "Logout";
        loginButton.href = "/logout";

        loginButton.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir la acción por defecto
            localStorage.removeItem("userToken"); // Eliminar el token del almacenamiento local
            window.location.reload(); // Recargar la página para reflejar el cambio
        });
    } else {
        // Usuario no logueado: Mostrar "Login"
        loginButton.textContent = "Login";
        loginButton.href = "/login";
    }

});
