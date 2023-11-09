const components = {
  cpu: [
    { name: "Intel i5", price: 230 },
    { name: "Intel i7", price: 330 },
    { name: "AMD Ryzen 5", price: 430 },
  ],
  gpu: [
    { name: "NVIDIA GTX 1650", price: 250 },
    { name: "NVIDIA RTX 3060", price: 350 },
    { name: "AMD Radeon RX 580", price: 450 },
  ],
  ram: [
    { name: "8GB DDR4", price: 80 },
    { name: "16GB DDR4", price: 150 },
    { name: "32GB DDR4", price: 280 },
  ],
  storage: [
    { name: "1TB HDD", price: 50 },
    { name: "500GB SSD", price: 100 },
    { name: "1TB SSD", price: 200 },
  ],
};

function createSelectOptions(items) {
  let options = '<option value="" disabled selected>-</option>';
  options += items
    .map(
      (item) =>
        `<option value="${item.price}">${item.name} - €${item.price}</option>`
    )
    .join("");
  return options;
}

function initializeForm() {
  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      selectElement.innerHTML = createSelectOptions(components[componentType]);
    }
  });

  document
    .getElementById("orderForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      let totalPrice = 0;
      Object.keys(components).forEach((componentType) => {
        const selectElement = document.getElementById(componentType);
        if (selectElement) {
          totalPrice += parseInt(selectElement.value, 10);
        }
      });

      document.getElementById("totalPrice").textContent = `€${totalPrice}`;
      console.log("Order submitted with total price: ", totalPrice);
    });

  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      selectElement.addEventListener("change", updateTotal);
    }
  });
}

function updateTotal() {
  let totalPrice = 0;
  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      const selectedValue = selectElement.value;
      if (selectedValue) {
        totalPrice += parseInt(selectedValue, 10);
      }
    }
  });

  document.getElementById("totalPrice").textContent = `€${totalPrice}`;
}

document.addEventListener("DOMContentLoaded", initializeForm);
