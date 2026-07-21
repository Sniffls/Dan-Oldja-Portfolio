// Auto-stamp today's date into the title block, drawing-style (DD MMM YYYY)
const dateEl = document.getElementById('tb-date');
if (dateEl) {
  const d = new Date();
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  dateEl.textContent = `${String(d.getDate()).padStart(2,'0')} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// Reveal sections as they enter the viewport
const sections = document.querySelectorAll('.section');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  sections.forEach(s => io.observe(s));
} else {
  sections.forEach(s => s.classList.add('visible'));
}
