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

function updateTotal() {
  let totalPrice = 0;
  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      totalPrice += parseInt(selectElement.value, 10) || 0;
    }
  });
  document.getElementById("totalPrice").textContent = `€${totalPrice}`;
}

function resetForm() {
  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      selectElement.selectedIndex = 0;
    }
  });

  document.getElementById("totalPrice").textContent = "€0";
  document.getElementById("submitButton").textContent = "Submit Order";
  document.getElementById("submitButton").disabled = false;
  document.getElementById("newOrderButton").classList.add("hiddenButton");
}

function initializeForm() {
  Object.keys(components).forEach((componentType) => {
    const selectElement = document.getElementById(componentType);
    if (selectElement) {
      selectElement.innerHTML = createSelectOptions(components[componentType]);
      selectElement.addEventListener("change", updateTotal);
    }
  });

  document
    .getElementById("orderForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      updateTotal();

      document.getElementById("submitButton").textContent = "Order Submitted!";
      document.getElementById("submitButton").disabled = true;
      document.getElementById("newOrderButton").classList.remove("hiddenButton");
    });

  document
    .getElementById("newOrderButton")
    .addEventListener("click", resetForm);
}

document.addEventListener("DOMContentLoaded", initializeForm);
