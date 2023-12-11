document.addEventListener("DOMContentLoaded", function () {
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
            const dataId = addToCartButton.getAttribute("data-id");

            cart.push({ name: productName, price: productPrice, dataId: dataId });
            updateCart();
        });
    });

    function updateCart() {
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.name} (${item.dataId}) - $${item.price.toFixed(2)}`;
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
            // Enviar la información del carrito al servidor (Django) mediante una solicitud AJAX con fetch()
            fetch('/guardar_pedido/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: JSON.stringify({
                    name: nameValue,
                    lastname: lastnameValue,
                    address: addressValue,
                    phone: phoneValue,
                    items: cart
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al procesar el pedido: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                alert(data.message);  // Considera reemplazar con mensajes en el DOM
                cart.length = 0;
                updateCart();
            })
            .catch(error => {
                console.error('Error al procesar el pedido:', error);
                // Manejo de errores, por ejemplo, mostrar un mensaje en el DOM
            });
        }
    });

    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", function () {
            const pizzaId = this.dataset.id;
            const pizzaPrice = parseFloat(this.dataset.price);

            fetch("/procesar_pedido/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                    "X-CSRFToken": getCookie("csrftoken")
                },
                body: `tipo_pizza=${pizzaId}&precio=${pizzaPrice}`,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al procesar el pedido: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data.mensaje);
            })
            .catch(error => {
                console.error("Error al procesar el pedido:", error);
            });
        });
    });

    // Función para obtener el valor del token CSRF de las cookies
    function getCookie(name) {
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Buscar la cookie que comienza con el nombre proporcionado
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    document.querySelectorAll('.dropdown-content a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    const navbarToggle = document.getElementById("navbarToggle");
    const navbarDropdown = document.getElementById("navbarDropdown");

    navbarToggle.addEventListener("click", function () {
        if (navbarDropdown.style.display === "block") {
            navbarDropdown.style.display = "none";
        } else {
            navbarDropdown.style.display = "block";
        }
    });

    document.addEventListener("click", function (event) {
        if (event.target !== navbarDropdown && event.target !== navbarToggle) {
            navbarDropdown.style.display = "none";
        }
        return false;
    });
});

