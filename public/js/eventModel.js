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
        return { success: true, message: result.message };
    } catch (error) {
       return { success: false, message: error };
    }
}

export async function emailExistCheck(email) {
    try {
        const res = await fetch(`/api/check-email?email=${encodeURIComponent(email)}`);
        const data = await res.json();
        
        if (res.ok) {
            // Check for success or failure
            if (data.success) {
                // Return success status with message
                return { success: true, message: data.message };
            } else {
                // Return failure status with message
                return { success: false, message: data.message };
            }
        } else {
            // Handle server errors
            return { success: false, message: 'Server error: ' + (data.message || 'Unknown error') };
        }
    } catch (err) {
        // Handle any network or fetch errors
        return { success: false, message: 'Request failed: ' + err.message };
    }
}