document.addEventListener('DOMContentLoaded', async function() {
    await loadCatalog();
});

const apiUrl = "http://localhost:5251/api/watches";

async function loadCatalog() {
    try {
        const response = await fetch(apiUrl);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON data from the response
        const watches = await response.json();
        await renderCatalog(watches);
    } catch (error) {
        console.error('Failed to load catalog:', error);
    }
}

async function renderCatalog(watches) {
    const catalogItemsElement = document.getElementById('catalogItems');
    for (const watch of watches) {
        const itemHtml = `
            <div class="catalog-item" id="${watch.id}">
                <div class="catalog-item_wrapper">
                    <div class="catalog-item_content">
                        <img src="${watch.imagePath}" alt="handwatch" class="catalog-item_img">
                        <div class="catalog-item_subtitle">${watch.name}</div>
                        <div class="catalog-item_descr">${watch.description}</div>
                        <a href="#" class="catalog-item_link">MORE DETAILS</a>
                    </div>
                </div>
                <hr>
                <div class="catalog-item_footer">
                    <div class="catalog-item_prices">
                        <div class="catalog-item_old-price">${watch.oldPrice} $</div>
                        <div class="catalog-item_current-price">${watch.currentPrice} $</div>
                    </div>
                    <button class="button button_mini" type="button" onclick="addToCart('${watch.id}')">BUY</button>
                </div>
            </div>
        `;
        catalogItemsElement.innerHTML += itemHtml;
        const catalogSortedItemsElement = document.getElementById('catalogItems_'+watch.type);
        if (catalogSortedItemsElement) {
            catalogSortedItemsElement.innerHTML += itemHtml;
        }
    }
}

async function addToCart(itemId) {
    let item = await getItemDetails(itemId);
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let existingItem = cartItems.find(cartItem => cartItem.id == item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        item.quantity = 1;
        cartItems.push(item);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    let totalPrice = parseInt(localStorage.getItem('totalPrice')) || 0;
    totalPrice += item.currentPrice;
    localStorage.setItem('totalPrice', totalPrice);

    updateCartDropdown();
    alert('Item added to cart!');
}

async function getItemDetails(itemId) {
    try {
        const response = await fetch(apiUrl);  // Fetch from the same API
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const watches = await response.json();
        let item = watches.find(watch => watch.id == itemId);
        return item;
    } catch (error) {
        console.error('Failed to fetch item details:', error);
        return null;
    }
}
