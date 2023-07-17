export default class Tooltip {
  constructor() {
    this.tooltips = [];
  }

  showTooltip(message, element) {
    const tooltipElement = document.createElement('DIV');

    tooltipElement.classList.add('form-error');
    tooltipElement.textContent = message;

    const id = performance.now();

    this.tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { bottom, left } = element.getBoundingClientRect();

    tooltipElement.style.top = `${bottom}px`;
    tooltipElement.style.left = `${left}px`;

    return id;
  }

  removeTooltip(id) {
    const tooltip = this.tooltips.find((t) => t.id === id);

    tooltip.element.remove();

    this.tooltips = this.tooltips.filter((t) => t.id !== id);
  }
}
