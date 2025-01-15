async function handleRegister(event) {
    event.preventDefault();
    const studentid = document.getElementById('studentid').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const account_type = 'user';  // or whichever account type you're setting

    try {
        const response = await fetch('http://localhost:3000/src/Server/api/register.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ studentid, firstname, lastname, email, password, account_type })
        });

      
        const data = await response.json();

        console.log('Response Data:', data);

        if (response.status === 200) {
            alert('Registration successful!');
            window.location.href = 'C:\laragon\www\OrgSync-Website\src\Client\scripts\login.html';
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
        console.error(error);
    }
}

document.querySelector('form').addEventListener('submit', handleRegister);
