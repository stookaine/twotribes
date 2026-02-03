// Accordion behavior for story pages
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".accordion-btn");
  if (!btn) return;

  const item = btn.closest("li");
  const detail = item.querySelector(".detail");
  const group = btn.closest(".panel");

  const open = detail.classList.contains("open");

  // close others in same panel
  group.querySelectorAll(".detail").forEach(d => d.classList.remove("open"));
  group.querySelectorAll(".accordion-btn").forEach(b => b.setAttribute("aria-expanded", "false"));

  if (!open) {
    detail.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
});

// Simple index search (client-side)
document.addEventListener("DOMContentLoaded", () => {
  const input =
  document.querySelector("#storySearch") ||
  document.querySelector("#siteSearch");

  const cards = Array.from(document.querySelectorAll("[data-story]"));
  if (!input || cards.length === 0) return;

  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    cards.forEach(card => {
      const hay = (card.getAttribute("data-story") || "").toLowerCase();
      card.style.display = hay.includes(q) ? "" : "none";
    });
  });
});

function copyStoryLink() {
  const url = window.location.href;

  navigator.clipboard.writeText(url).then(() => {
    const feedback = document.getElementById("share-feedback");
    if (!feedback) return;

    feedback.textContent = "Link copied!";
    setTimeout(() => {
      feedback.textContent = "";
    }, 2000);
  });
}
