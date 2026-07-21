// Basic client-side handling for the contact form.
// NOTE: This is a static site — there is no backend here to actually send email.
// To make this form work, wire the fetch call below to a form backend such as
// Formspree, Getform, or a small serverless function, and put its endpoint URL
// in FORM_ENDPOINT below.

const FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/your-id"

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!FORM_ENDPOINT) {
      status.textContent = "Form isn't connected to a backend yet — see script.js for setup instructions.";
      status.style.color = "#ed7445";
      return;
    }

    const data = new FormData(form);
    status.textContent = "Sending...";
    status.style.color = "inherit";

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        status.textContent = "Thanks — your message has been sent.";
        status.style.color = "#2a7a3e";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again.";
        status.style.color = "#c0392b";
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please try again.";
      status.style.color = "#c0392b";
    }
  });
});
