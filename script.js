// Modal preview functionality for certificate images (runs on page load)
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('caption');
const close = document.getElementsByClassName('close')[0];

document.querySelectorAll('.certificate-image').forEach(function(img) {
  img.addEventListener('click', function() {
    modal.style.display = 'block';
    modalImg.src = this.src;
    captionText.textContent = this.alt;
  });
});

document.querySelectorAll('.view-certificate').forEach(function(button) {
  button.addEventListener('click', function() {
    const imgSrc = this.getAttribute('data-img');
    modal.style.display = 'block';
    modalImg.src = imgSrc;
    const certTitle = this.parentElement.querySelector('h3').textContent;
    captionText.textContent = certTitle;
  });
});

close.addEventListener('click', function() {
  modal.style.display = 'none';
});

// Contact form submit event remains separate
document.getElementById('contact-form').addEventListener('submit', async function (e) {
  e.preventDefault(); // Prevent the default form submission
  const status = document.getElementById('form-status');

  // Collect form data
  const formData = {
    name: document.getElementById('name').value,
    message: document.getElementById('message').value,
    email: document.getElementById('email').value,
  };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: 'service_54n0yal',
        template_id: 'template_vmad4j1',
        user_id: '4Xb_Dzq0q4Knazi_K',
        template_params: {
          from_name: formData.name,
          message: formData.message,
          reply_to: formData.email,
        },
      }),
    });

    if (response.ok) {
      status.textContent = 'Message sent successfully!';
      status.style.color = 'green';
    } else {
      throw new Error('Failed to send message');
    }
  } catch (error) {
    status.textContent = 'There was an error sending your message. Please try again later.';
    status.style.color = 'red';
  }
});