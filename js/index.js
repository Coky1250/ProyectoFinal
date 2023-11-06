
document.addEventListener("DOMContentLoaded", function() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const checkoutBtn = document.getElementById("checkout-btn");
    const nameInput = document.getElementById("name");
    const lastnameInput = document.getElementById("lastname");
    const addressInput = document.getElementById("address");
    const phoneInput = document.getElementById("phone");

    const products = document.querySelectorAll(".product");
    const cart = [];

    products.forEach(product => {
        const addToCartButton = product.querySelector(".add-to-cart");


        addToCartButton.addEventListener("click", () => {
            const productName = product.querySelector(".product-name").textContent;
            const productPrice = parseFloat(product.querySelector(".product-price").textContent.replace("$", ""));

            cart.push({ name: productName, price: productPrice });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
            cartItems.appendChild(li);
            total += item.price;
        });

        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    checkoutBtn.addEventListener("click", () => {
        const nameValue = nameInput.value.trim();
        const lastnameValue = lastnameInput.value.trim();
        const addressValue = addressInput.value.trim();
        const phoneValue = phoneInput.value.trim();
        

        if (nameValue === "" || lastnameValue === "" || addressValue === "" || phoneValue === "") {
            alert("Por favor, complete todos los campos de información personal.");
        } else {
            alert("¡Gracias por su compra en efectivo!");
        }
    });
});


document.querySelectorAll('.dropdown-content a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const navbarToggle = document.getElementById("navbarToggle");
    const navbarDropdown = document.getElementById("navbarDropdown");

    navbarToggle.addEventListener("click", function() {
        if (navbarDropdown.style.display === "block") {
            navbarDropdown.style.display = "none";
        } else {
            navbarDropdown.style.display = "block";
        }
    });
});

document.addEventListener("click", function(event) {
    const navbarDropdown = document.getElementById("navbarDropdown");
    const navbarToggle = document.getElementById("navbarToggle");

    if (event.target !== navbarDropdown && event.target !== navbarToggle) {
        navbarDropdown.style.display = "none";
    }
});
