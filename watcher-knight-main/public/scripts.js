document.addEventListener('DOMContentLoaded', function() {
    
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const responseData = await response.json();
                alert('Registration successful');
                console.log(responseData);
            } catch (error) {
                console.error('Error:', error.message);
                alert('Registration failed');
            }
        });
    }

    // Login 
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message);
                }

                const responseData = await response.json();
                localStorage.setItem('token', responseData.token);
                alert('Login successful');
                console.log(responseData);
            } catch (error) {
                console.error('Error:', error.message);
                alert('Login failed');
            }
        });
    }
});
