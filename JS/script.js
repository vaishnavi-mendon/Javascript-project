let CartIcon = document.querySelector("#cart-icon");
let CartPopup = document.querySelector(".card-popup");
let CartCloseBtn = document.querySelector("#close-card");
// cart open
CartIcon.addEventListener("click", () => {
    CartPopup.style.right = 0;
});
// cart close
CartCloseBtn.addEventListener("click", () => {
    CartPopup.style.right = "-100%";
});

// cart functionality 
// (in this syntex when document onload stage then function ready is not runing stage... and in else ready fun run..)
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready())
}
else {
    let ak = () => {
        console.log("loadingend.")
    };
}
// cart functionality

function ready() {
    // remove cart items event call
    var RemoveProductBtn = document.getElementsByClassName("p-remove");
    for (var i = 0; i < RemoveProductBtn.length; i++) {
        var button = RemoveProductBtn[i];
        button.addEventListener('click', RemoveCartItems);
    }
    // Update Quantity event call
    let QuantityInput = document.getElementsByClassName("card-quantity");
    for (var i = 0; i < QuantityInput.length; i++) {
        let Input = QuantityInput[i];
        Input.addEventListener("change", UpdateQuantity)
    }
    // add cart event call
    var AddCartBtn = document.getElementsByClassName("ad-btn");
    for (var i = 0; i < AddCartBtn.length; i++) {
        
        var button = AddCartBtn[i];
        button.addEventListener('click', AddCartClicked);
        
    }
    // buy cart 
    var Buy = document.getElementsByClassName("buy")[0]
        .addEventListener("click", buyButtonClicked)
}



// buy cart on click function
function buyButtonClicked() {
    alert("You order placed...");
    let CartContent = document.getElementsByClassName("card-content")[0];
    while (CartContent.hasChildNodes()) {
        CartContent.removeChild(CartContent.firstChild);
    }
  
}
// remove cart items onclick fun
function RemoveCartItems(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.remove();
    updateTotal();
}
// Change Quantity onclick fun + call updatetotal fun
function UpdateQuantity(event) {
    let Input = event.target;
    if (isNaN(Input.value) || Input.value <= 0) {
        Input.value = 1;
    }
    updateTotal();

}
// add cart event shop product and send data on cart data and call onclick on add product on cart
function AddCartClicked(event) {
    alert("Your Product is added to cart!!!");
    let button = event.target;
    let ShopProduct = button.parentElement;
    let Title = ShopProduct.getElementsByClassName("p-name")[0].innerText;
    let Price = ShopProduct.getElementsByClassName("prize")[0].innerText;
    let ProductImage = ShopProduct.getElementsByClassName("product")[0].src;
    addProductToCart(Title, Price, ProductImage);
    updateTotal();
}
// create cart box and fetch data from shop product
function addProductToCart(Title, Price, ProductImage) {
    let CartItems = document.getElementsByClassName("card-content")[0];
    let ShopCartBox = document.createElement("div");
    ShopCartBox.classList.add("card-box")
    let CartItemsNames = CartItems.getElementsByClassName("card-name");
    for (let i = 0; i < CartItemsNames.length; i++) {
        if (CartItemsNames[i].innerText == Title) {
            alert("You have already add this in Cart...");
            return;
        }
    }
    let cartBoxContent = `    
 <img src="${ProductImage}" alt="" class="card-img">
<div class="card-data">
    <div class="card-name">${Title}</div>
    <div class="card-price">${Price}</div>
    <input type="number" value="1" class="card-quantity">
</div>
<i class="fa-solid fa-trash p-remove" ></i>`;

    ShopCartBox.innerHTML = cartBoxContent;
    CartItems.appendChild(ShopCartBox);
    ShopCartBox
        .getElementsByClassName("p-remove")[0]
        .addEventListener("click", RemoveCartItems);
    ShopCartBox
        .getElementsByClassName("card-quantity")[0]
        .addEventListener("change", UpdateQuantity);
}
// Update Total
function updateTotal() {
  let ProductContent = document.getElementsByClassName("card-content")[0];
  let ProductBoxes = ProductContent.getElementsByClassName("card-box");
  let Total = 0;

  for (let i = 0; i < ProductBoxes.length; i++) {
    let ProductBox = ProductBoxes[i];
    let ProductPrice = ProductBox.getElementsByClassName("card-price")[0]; // Fetch specific product price
    let ProductQuantity = ProductBox.getElementsByClassName("card-quantity")[0];
    let Price = parseFloat(ProductPrice.innerText.replace("₹", ""));
    let Quantity = ProductQuantity.value;
    Total = Total + (Price * Quantity);
  }

  // If product price is in cents
  Total = Math.round(Total * 100) / 100;
  
  // Update the value in total
  document.getElementsByClassName("total")[0].innerText = "₹" + Total;
}
// Search  Bar Functionality
const search = () =>{
    const searchbox = document.getElementById('searchbox').value.toUpperCase();
    const productcontainer = document.getElementById("shop-content");
    const product = document.querySelectorAll(".product-box");
    const pname = productcontainer.getElementsByTagName("h3");

    for(var i=0; i<pname.length; i++){
        let match = product[i].getElementsByTagName("h3")[0];
        if( match){
            let textvalue = match.textContent || match.innerHTML
            if(textvalue.toUpperCase().indexOf(searchbox)>-1){
                product[i].style.display ="";
            }
                else{
                    product[i].style.display ="none";
                }


            }
        }
    }
   
