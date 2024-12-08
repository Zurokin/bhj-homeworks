document.addEventListener("DOMContentLoaded", () => {
  const products = document.querySelectorAll(".product");
  const cartContainer = document.querySelector(".cart__products");

  const addToCart = (productId, quantity, imageUrl) => {
    const existingProduct = cartContainer.querySelector(
      `.cart__product[data-id="${productId}"]`
    );

    if (existingProduct) {
      const countElement = existingProduct.querySelector(
        ".cart__product-count"
      );
      countElement.textContent = parseInt(countElement.textContent) + quantity;
    } else {
      const newProduct = document.createElement("div");
      newProduct.className = "cart__product";
      newProduct.dataset.id = productId;
      newProduct.innerHTML = `
                <img class="cart__product-image" src="${imageUrl}" alt="Товар">
                <div class="cart__product-count">${quantity}</div>
            `;
      cartContainer.appendChild(newProduct);
    }
  };

  products.forEach((product) => {
    const decreaseButton = product.querySelector(
      ".product__quantity-control_dec"
    );
    const increaseButton = product.querySelector(
      ".product__quantity-control_inc"
    );
    const addButton = product.querySelector(".product__add");
    const quantityElement = product.querySelector(".product__quantity-value");
    const productId = product.dataset.id;
    const productImage = product.querySelector(".product__image").src;

    decreaseButton.addEventListener("click", () => {
      let quantity = parseInt(quantityElement.textContent);
      if (quantity > 1) {
        quantityElement.textContent = quantity - 1;
      }
    });

    increaseButton.addEventListener("click", () => {
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;
    });

    addButton.addEventListener("click", () => {
      const quantity = parseInt(quantityElement.textContent);
      addToCart(productId, quantity, productImage);
    });
  });
});
