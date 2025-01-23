// Create a scroll-to-top button
const backToTopButton = document.createElement('button');
backToTopButton.innerText = 'Top';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});


const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Tab functionality
document.querySelectorAll(".tab-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    const tab = e.target.dataset.tab;

    // Remove active class from all buttons
    document.querySelectorAll(".tab-button").forEach((btn) => {
      btn.classList.remove("active");
    });

    // Add active class to the clicked button
    e.target.classList.add("active");

    // Hide all tab contents
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    // Show the corresponding tab content
    document.getElementById(tab).classList.add("active");
  });
});

// Basic form validation
document.querySelector("form").addEventListener("submit", function (e) {
  const name = document.querySelector("input[name='name']").value;
  const email = document.querySelector("input[name='email']").value;
  const message = document.querySelector("textarea[name='message']").value;

  if (!name || !email || !message) {
    e.preventDefault(); // Stop form submission
    alert("All fields are required!");
  }
});
