async function login() {
        const welcomeMessage = document.getElementById("Welcome-Message");
    
        // Hide the welcome message
        welcomeMessage.style.display = "none";
        content.style.display = "flex"
    
        // Fetch the login form HTML from the external file
        try {
            const response = await fetch("login.html");
            if (!response.ok) {
                throw new Error(`Failed to load login form: ${response.statusText}`);
            }
            const loginFormHtml = await response.text();
            content.innerHTML = loginFormHtml;
    
            // Attach event listener for the login form submission
            document.getElementById("login-form").addEventListener("submit", function (event) {
                event.preventDefault();
                const username = document.getElementById("username").value;
                const password = document.getElementById("password").value;
    
                // Example login validation (Replace with actual validation logic)
                if (username === "admin" && password === "password") {
                    alert("Login successful!");
                    welcomeMessage.style.display = "flex";
                    content.style.display = "none";
                    document.cookie = "authorized=true;";
                    window.location.reload();
                } else {
                    alert("Invalid credentials, please try again.");
                    return;
                }
            });
        } catch (error) {
            console.error(error);
            content.innerHTML = `<p style="color: red;">Failed to load login form. Please try again later.</p>`;
        }
    }

