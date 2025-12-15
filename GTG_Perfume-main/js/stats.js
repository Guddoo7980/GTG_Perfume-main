function initStats() {
  console.log("Initializing Stats Animation...");

  const section = document.getElementById("stats");

  if (!section) return;

  const numbers = section.querySelectorAll(".stat-number");
  let started = false;

  const startAnimation = () => {
    numbers.forEach((num) => {
      const target = parseInt(num.getAttribute("data-target"));
      const suffix = num.getAttribute("data-suffix") || "";

      if (isNaN(target)) return;

      const duration = 2000; // 2 sec
      const increment = target / (duration / 16);
      let current = 0;

      const update = () => {
        current += increment;
        if (current < target) {
          num.innerText = Math.ceil(current) + suffix;
          requestAnimationFrame(update);
        } else {
          num.innerText = target + suffix;
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !started) {
          started = true;
          startAnimation();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(section);
}
