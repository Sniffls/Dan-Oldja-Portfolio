// Contact form -> Formspree
//
// SETUP (one-time):
// 1. Go to https://formspree.io and create a free account with your main email.
// 2. Create a new form, then copy the endpoint it gives you
//    (looks like https://formspree.io/f/abcd1234).
// 3. In index.html, find the <form> tag's action="..." attribute and
//    replace "YOUR_FORM_ID" with your real endpoint.
// 4. Formspree will send a confirmation email the first time someone submits —
//    click the link in it once to activate the form.
// That's it — no server code required, submissions go straight to your inbox.

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    const endpoint = form.getAttribute("action");

    // If the endpoint hasn't been configured yet, let the user know instead
    // of silently failing.
    if (!endpoint || endpoint.includes("YOUR_FORM_ID")) {
      e.preventDefault();
      status.textContent = "Form isn't connected yet — see script.js for setup steps.";
      status.style.color = "#ed7445";
      return;
    }

    e.preventDefault();

    const data = new FormData(form);

    // Build a clean, readable subject line combining the sender's name
    // and the subject they typed, so it's easy to scan in an inbox.
    const first = data.get("First Name") || "";
    const last = data.get("Last Name") || "";
    const subjectField = data.get("Subject") || "";
    data.set("_subject", `Portfolio inquiry from ${first} ${last}: ${subjectField}`);

    status.textContent = "Sending...";
    status.style.color = "inherit";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        status.textContent = "Thanks — your message has been sent.";
        status.style.color = "#2a7a3e";
        form.reset();
      } else {
        status.textContent = "Something went wrong. Please try again, or email hello@danoldja.com directly.";
        status.style.color = "#c0392b";
      }
    } catch (err) {
      status.textContent = "Something went wrong. Please try again, or email hello@danoldja.com directly.";
      status.style.color = "#c0392b";
    }
  });
});
