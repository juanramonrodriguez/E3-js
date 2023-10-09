const pizzas = [
  {
    id: 1,
    nombre: "pizza de Muzzarella",
    precio: 500,
    ingredientes: ["Muzzarella", "Tomate", "Aceitunas"],
    imagen: "./img/muzzarella.png",
  },

  {
    id: 2,
    nombre: "pizza de Cebolla",
    precio: 1500,
    ingredientes: ["Muzzarella", "Tomate", "Cebolla"],
    imagen: "./img/cebolla.png",
  },

  {
    id: 3,
    nombre: "pizza 4 Quesos",
    precio: 1380,
    ingredientes: [
      "Muzzarella",
      "Tomate",
      "Queso Azul",
      "Parmesano",
      "Roquefort",
    ],
    imagen: "./img/4quesos.png",
  },

  {
    id: 4,
    nombre: "pizza Especial",
    precio: 1000,
    ingredientes: ["Muzzarella", "Tomate", "Rucula", "Jamón"],
    imagen: "./img/especial.png",
  },

  {
    id: 5,
    nombre: "pizza con Anana",
    precio: 600,
    ingredientes: ["Muzzarella", "Tomate", "Anana"],
    imagen: "./img/anana.png",
  },
];

const inputNumber = document.querySelector(".input-number");
const buscar = document.querySelector(".btn-buscar");
const form = document.querySelector(".form");
const card = document.querySelector(".card");
const error = document.querySelector(".error");

//array
let pizzaSelect = JSON.parse(localStorage.getItem("pizza")) || [];

//localstrorage
const saveLocalStorage = () => {
  localStorage.setItem("pizza", JSON.stringify(pizzaSelect));
};
//validar
const validarPizza = (pizza) => {
  let validar = true;
  if (!pizza.length) {
    error.textContent = "Ingresa un número por favor";
    validar = false;
    form.reset();
  } else if (pizza >= 6) {
    error.textContent = " No se encontro resultado";
    validar = false;
    form.reset();
  } else if (pizza <= 0) {
    error.textContent = " No se encontro resultado";
    validar = false;
    form.reset();
  } else {
    error.textContent = "";
  }

  return validar;
};

const buscarPizaPorId = (id) => {
  return pizzas.find((pizza) => pizza.id == id);
};

const buscarPizza = (e) => {
  e.preventDefault();
  const pizza = inputNumber.value.trim();
  if (validarPizza(pizza)) {
    const pizzaEncontrada = buscarPizaPorId(pizza);
    if (pizzaEncontrada) {
      pizzaSelect = [pizzaEncontrada];
    }
    console.log(pizzaSelect);
    form.reset();
    renderPizzaSelect();
    saveLocalStorage();
  }
};

//renderizar en htm
const createPizza = (pizza) => {
  const ingredientesList = pizza.ingredientes
    .map((ingrediente) => `<li>${ingrediente}</li>`)
    .join("");
  return `<img src="${pizza.imagen}" alt="">
        <h2 class="name">${pizza.nombre}</h2>
        <p class="price">Precio: $ ${pizza.precio}</p>
        <div class="ingred">
        <ul> Ingredientes: ${ingredientesList}</ul>
        
        </div>`;
};

const renderPizzaSelect = () => {
  card.innerHTML = pizzaSelect.map((pizza) => createPizza(pizza)).join("");
};
const init = () => {
  form.addEventListener("submit", buscarPizza);
  document.addEventListener("DOMContentLoaded", renderPizzaSelect);
};
init();
