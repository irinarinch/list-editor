export default function validate(form, msg, tooltip) {
  const errors = {
    name: {
      valueMissing: 'Введите название товара!',
    },
    price: {
      valueMissing: 'Введите стоимость товара!',
      rangeUnderflow: 'Стоимость должна быть больше 0',
    },
  };

  const elements = form.querySelectorAll('input');

  return [...elements].some((input) => Object.keys(ValidityState.prototype).some((key) => {
    if (input.validity[key]) {
      if (key === 'valid') return false;
      if (errors[input.name][key]) {
        msg.push(tooltip.showTooltip(errors[input.name][key], input));
      }
      return true;
    }

    return false;
  }));
}
