async function createNewAccountHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#newusername').value.trim();
    const email = document.querySelector('#newemail').value.trim();
    const password = document.querySelector('#newpassword').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.ok) {
            document.location.replace('/projects');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.new_form').addEventListener('submit', createNewAccountHandler);