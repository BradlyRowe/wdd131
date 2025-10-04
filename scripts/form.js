// Product array provided by the assignment
const products = [
  { id: "fc-1888", name: "Flux Capacitor" },
  { id: "jj-2020", name: "Jetpack" },
  { id: "ar-1995", name: "Arc Reactor" },
  { id: "dp-2000", name: "Doomsday Device" },
  { id: "tr-7070", name: "Time Turner" }
];

// Populate the select dropdown
const productSelect = document.querySelector("#product");

products.forEach(product => {
  const option = document.createElement("option");
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});
