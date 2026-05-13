// Mobile menu toggle keeps navigation usable on smaller screens.
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.getElementById("nav-links");

if (mobileMenu && navLinks) {
  mobileMenu.addEventListener("click", () => {
    const isExpanded = mobileMenu.getAttribute("aria-expanded") === "true";
    mobileMenu.setAttribute("aria-expanded", String(!isExpanded));
    navLinks.classList.toggle("active");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      mobileMenu.setAttribute("aria-expanded", "false");
    });
  });

  // Close the mobile navigation when the user taps outside the navbar area.
  document.addEventListener("click", (event) => {
    const clickedInsideNav =
      event.target instanceof Node &&
      (mobileMenu.contains(event.target) || navLinks.contains(event.target));

    if (!clickedInsideNav) {
      navLinks.classList.remove("active");
      mobileMenu.setAttribute("aria-expanded", "false");
    }
  });
}

// Back-to-top button is created in JS so the HTML stays focused on page content.
const backToTopButton = document.createElement("button");
backToTopButton.className = "back-to-top";
backToTopButton.type = "button";
backToTopButton.setAttribute("aria-label", "Back to top");
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

backToTopButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", () => {
  backToTopButton.classList.toggle("is-visible", window.scrollY > 420);
});

// IntersectionObserver drives the scroll reveal animation for major sections.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.18 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// The contact form drafts an email in the visitor's mail app instead of posting nowhere.
const contactForm = document.getElementById("contact-form");
const formNote = document.getElementById("form-note");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    if (!name || !email || !message) {
      if (formNote) {
        formNote.textContent = "Please complete your name, email, and message.";
      }
      return;
    }

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject details:\n${message}`
    );

    if (formNote) {
      formNote.textContent = "Opening your email app so you can send the message.";
    }

    window.location.href = `mailto:chikwenduekene8@gmail.com?subject=${subject}&body=${body}`;
    contactForm.reset();
  });
}
