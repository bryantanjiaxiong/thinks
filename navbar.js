document.addEventListener("DOMContentLoaded", async function () {
    const navItems = document.getElementById("nav-items");

    // Function to check login status (example with cookies)
    function isLoggedIn() {
        const token = document.cookie
            .split('; ')
            .find((row) => row.startsWith('authorized='))
            ?.split('=')[1];
        return token !== undefined && token !== null && token !== "false";
    }

    // Function to log out the user
    function logout() {
        // Remove the token cookie
        document.cookie = "authorized=false;";
        // Reload the page to update the navigation bar
        window.location.reload();
    }

    // Populate the navigation bar based on login status
    if (isLoggedIn()) {
        const response = await fetch("loggedInNavBar.html");
        if (!response.ok) {
            throw new Error(`Failed to load login form: ${response.statusText}`);
        }
        const navBarHtml = await response.text();
        navItems.innerHTML = navBarHtml;

        // Add logout functionality
        document.getElementById("logout-link").addEventListener("click", logout);
    } else {
        const response = await fetch("loggedOutNavBar.html");
        if (!response.ok) {
            throw new Error(`Failed to load login form: ${response.statusText}`);
        }
        const navBarHtml = await response.text();
        navItems.innerHTML = navBarHtml;

        document.getElementById("login-link").addEventListener("click", login);
    }
});
