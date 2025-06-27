const menuToggle = document.getElementById("menuToggle");
const sideMenu = document.getElementById("sideMenu");
const closeSideMenu = document.getElementById("closeSideMenu");

const cartToggle = document.getElementById("cartToggle");
const cartMenu = document.getElementById("cartMenu");
const closeCartMenu = document.getElementById("closeCartMenu");
const cartBadge = document.getElementById("cartBadge");
const cartItemsContainer = document.getElementById("cartItemsContainer");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.querySelectorAll(".add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.closest(".products__item");
    const id = product.dataset.id;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const img = product.dataset.img;

    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.quantity++;
    } else {
      cart.push({ id, name, price, img, quantity: 1 });
    }

    saveCart();
    updateBadge();
    renderCartItems();
  });
});

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateBadge() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (count > 0) {
    cartBadge.style.display = "block";
    cartBadge.textContent = count;
  } else {
    cartBadge.style.display = "none";
  }
}

function renderCartTotal() {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.createElement("div");
  totalDiv.className = "cart-total";
  totalDiv.innerHTML = `<strong>Total: $${total.toFixed(2)}</strong>`;
  cartItemsContainer.appendChild(totalDiv);
}

function renderCartItems() {
  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `<p class="empty-cart">Tu carrito está vacío.</p>`;
    return;
  }

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img class="cart-item__image" src="${item.img}" alt="${item.name}" />
      <div class="cart-item__details">
        <h4>${item.name}</h4>
        <p>$${item.price} x ${item.quantity}</p>
      </div>
      <button class="remove-one" data-index="${index}" aria-label="Eliminar">🗑️</button>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  renderCartTotal();

  document.querySelectorAll(".remove-one").forEach((button) => {
    button.addEventListener("click", (e) => {
      const index = parseInt(e.target.dataset.index);
      cart.splice(index, 1);
      saveCart();
      updateBadge();
      renderCartItems();
    });
  });
}

// Toggle Menús
menuToggle.addEventListener("click", () => {
  sideMenu.classList.toggle("show");
});
closeSideMenu.addEventListener("click", () => {
  sideMenu.classList.remove("show");
});

cartToggle.addEventListener("click", () => {
  cartMenu.classList.toggle("show");
});
closeCartMenu.addEventListener("click", () => {
  cartMenu.classList.remove("show");
});

// Inicialización
updateBadge();
renderCartItems();
