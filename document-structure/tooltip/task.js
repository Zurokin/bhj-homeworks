document.addEventListener("DOMContentLoaded", () => {
  const tooltips = document.querySelectorAll(".has-tooltip");

  tooltips.forEach((tooltip) => {
    tooltip.addEventListener("click", (event) => {
      event.preventDefault();

      document.querySelectorAll(".tooltip_active").forEach((activeTooltip) => {
        activeTooltip.classList.remove("tooltip_active");
        activeTooltip.remove();
      });

      const tooltipText = tooltip.getAttribute("title");
      const tooltipPosition = tooltip.getAttribute("data-position") || "bottom";
      const tooltipElement = document.createElement("div");
      tooltipElement.className = "tooltip";
      tooltipElement.textContent = tooltipText;

      document.body.appendChild(tooltipElement);

      const rect = tooltip.getBoundingClientRect();
      const tooltipWidth = tooltipElement.offsetWidth;
      const tooltipHeight = tooltipElement.offsetHeight;

      let top = rect.top + window.scrollY;
      let left = rect.left + window.scrollX;

      switch (tooltipPosition) {
        case "top":
          top -= tooltipHeight;
          left += rect.width / 2 - tooltipWidth / 2;
          break;
        case "bottom":
          top += rect.height;
          left += rect.width / 2 - tooltipWidth / 2;
          break;
        case "left":
          top += rect.height / 2 - tooltipHeight / 2;
          left -= tooltipWidth;
          break;
        case "right":
          top += rect.height / 2 - tooltipHeight / 2;
          left += rect.width;
          break;
        default:
          top += rect.height;
          left += rect.width / 2 - tooltipWidth / 2;
          break;
      }

      tooltipElement.style.top = `${top}px`;
      tooltipElement.style.left = `${left}px`;

      tooltipElement.classList.add("tooltip_active");

      tooltip.addEventListener("click", () => {
        tooltipElement.classList.remove("tooltip_active");
        tooltipElement.remove();
      });
    });
  });
});
