console.log("Basic frontend javascript file");

const pattern = document.getElementById("techforgePattern");

const colors = [
  "#38BDF8",
  "#0EA5E9",
  "#2563EB",
  "#1D4ED8",
  "#60A5FA",
  "#7DD3FC",
];

const columns = 20;
const segmentHeight = 50;

for (let i = 0; i < columns; i++) {
  const x = i * 50;

  for (let j = 0; j < 8; j++) {
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

    rect.setAttribute("x", x);
    rect.setAttribute("y", j * segmentHeight);

    rect.setAttribute("width", 50);
    rect.setAttribute("height", segmentHeight);

    rect.setAttribute(
      "fill",
      colors[Math.floor(Math.random() * colors.length)]
    );

    pattern.appendChild(rect);

    anime({
      targets: rect,

      translateY: [
        {
          value: -20 + Math.random() * 40,

          duration: 100 + Math.random() * 100,
        },

        {
          value: 0,

          duration: 1000 + Math.random() * 100,
        },
      ],

      easing: "easeInOutSine",

      loop: true,

      direction: "alternate",

      delay: Math.random() * 1000,
    });
  }
}

const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach((button) => {
  if (button.dataset.path === window.location.pathname) {
    button.classList.add("active");
  }
});
