document.addEventListener("DOMContentLoaded", function () {
    const productenContainer = document.getElementById("producten-container");
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");
    const cartCountElement = document.getElementById("cart-count");

    let winkelwagen = [];

    // Productgegevens
    const producten = [
        { id: 1, naam: "Appel", prijs: 0.50, korting: 0.10, afbeelding: "https://via.placeholder.com/150" },
        { id: 2, naam: "Brood", prijs: 1.20, korting: 0.00, afbeelding: "https://via.placeholder.com/150" },
        { id: 3, naam: "Melk", prijs: 0.90, korting: 0.15, afbeelding: "https://via.placeholder.com/150" },
        { id: 4, naam: "Kaas", prijs: 2.50, korting: 0.50, afbeelding: "https://via.placeholder.com/150" },
        { id: 5, naam: "Bananen", prijs: 1.80, korting: 0.30, afbeelding: "https://via.placeholder.com/150" }
    ];

    // Producten weergeven
    function toonProducten() {
        productenContainer.innerHTML = "";
        producten.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");

            const kortingPrijs = product.prijs - product.korting;

            productElement.innerHTML = `
                <img src="${product.afbeelding}" alt="${product.naam}">
                <h3>${product.naam}</h3>
                <p>Prijs: <del>€${product.prijs.toFixed(2)}</del> <strong>€${kortingPrijs.toFixed(2)}</strong></p>
                <button onclick="voegToeAanWinkelwagen(${product.id})">Toevoegen</button>
            `;

            productenContainer.appendChild(productElement);
        });
    }

    // Product toevoegen aan winkelwagen
    window.voegToeAanWinkelwagen = function (productId) {
        const gekozenProduct = producten.find(p => p.id === productId);
        winkelwagen.push(gekozenProduct);
        updateWinkelwagen();
    };

    // Winkelwagen bijwerken
    function updateWinkelwagen() {
        cartItemsContainer.innerHTML = "";
        let totaal = 0;

        winkelwagen.forEach((product, index) => {
            const kortingPrijs = product.prijs - product.korting;
            totaal += kortingPrijs;

            const item = document.createElement("li");
            item.textContent = `${product.naam} - €${kortingPrijs.toFixed(2)}`;
            cartItemsContainer.appendChild(item);
        });

        totalPriceElement.textContent = totaal.toFixed(2);
        cartCountElement.textContent = winkelwagen.length;
    }

    toonProducten();
});
