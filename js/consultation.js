// Function to handle consultation form submission
function submitConsultationForm(event) {
    event.preventDefault();
  
    const data = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };
  
    fetch('http://localhost:5251/api/consultation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.ok) {
            alert('Consultation request submitted successfully!');
            // Redirect to index.html after successful submission
            window.location.href = 'index.html';
        } else {
            alert('Failed to submit consultation request.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while submitting the form.');
    });
  }
  
  // Add event listener for form submission
  document.getElementById('consultation-form').addEventListener('submit', submitConsultationForm);
  