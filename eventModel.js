// Insert user data (email and password)
export async function insertUser(formData){
    let data = {};

    // Loop through FormData entries and build an object
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    try {
        const response = await fetch('http://localhost:5500/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    
        const result = await response.json();
        alert(result.message)
    } catch (error) {
        alert('Error submitting form:', error)
    }
}