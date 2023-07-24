function addToCart(productName, imageName, price) {
    var item = {
      productName: productName,
      imageName: imageName,
      price: price,
      quantity: 1 
    };
  
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    updateTotal();
  }
  
  
  function updateCart() {
    var cartElement = document.getElementById("produt");
    cartElement.innerHTML = "";
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.forEach(function(item, index) {
      var card = document.createElement("div");
      card.classList.add("col-md-2", "mb-4");
  
      var innerHTML = `
        <div class="card product-1">
          <img src="../Images/${item.imageName}" alt="Loading">
          <div class="card-body text-center">
            <h5 class="card-title">${item.productName}</h5>
            <p class="card-text">Price: ₹${item.price}</p>
            <input type="number" min="1" placeholder="Quantity" class="quantity-input" data-index="${index}" value="${item.quantity}">
            <br>
            <button class="delete-button btn btn-danger" data-index="${index}">Delete</button>
          </div>
        </div>
      `;
  
      card.innerHTML = innerHTML;
      cartElement.appendChild(card);
    });
  
    attachListeners();
    updateTotal();
  }
  
  
 function attachListeners() {
    var quantityInputs = document.querySelectorAll(".quantity-input");
    quantityInputs.forEach(function(input) {
      input.addEventListener("change", handleQuantityChange);
    });
  
    var deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(function(button) {
      button.addEventListener("click", handleDelete);
    });
  }
  
  
  function handleQuantityChange(event) {
    var index = event.target.dataset.index;
    var newQuantity = parseInt(event.target.value);
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (index >= 0 && index < cart.length) {
      cart[index].quantity = newQuantity;
      
      localStorage.setItem("cart", JSON.stringify(cart));
      updateTotal();
    }
  }
  
  
  function handleDelete(event) {
    var index = event.target.dataset.index;
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    if (index >= 0 && index < cart.length) {
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCart();
      updateTotal();
    }
  }
  
  
  function updateTotal() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    var total = 0;
    cart.forEach(function(item) {
      total += item.price * item.quantity;
    });
    var totalElement = document.getElementById("total");
    totalElement.textContent = "Total: ₹" + total;
  
    var emptyCartMsg = document.getElementById("emptyCartMsg");
    if (cart.length === 0) {
      emptyCartMsg.style.display = "block";
    } else {
      emptyCartMsg.style.display = "none";
    }
  }
  
  window.addEventListener("load", function() {
    updateCart();
  });
  
  function Order() {
    var cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      alert("Thank you for your order!");
      localStorage.removeItem("cart");
      updateCart();
      updateTotal();
    } else {
      alert("Your cart is empty.");
    }
  }