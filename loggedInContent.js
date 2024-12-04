document.addEventListener("DOMContentLoaded", async function () 
{
    function isLoggedIn() {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('authorized='))
            ?.split('=')[1];
        return token !== undefined && token !== null && token != "false";
    }

    const welcomeMessage = document.getElementById("Welcome-Message");

    if(isLoggedIn()){
        welcomeMessage.innerHTML = "<h1>Welcome to Thinks Admin!</h1>"
    }
})