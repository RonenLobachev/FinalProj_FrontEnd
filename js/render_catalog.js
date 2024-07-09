document.addEventListener('DOMContentLoaded', async function() {
    await loadCatalog();
});

async function loadCatalog() {
    try {
        const data = await fetch('data/watches.json');
        if (!data.ok) {
            throw new Error(`HTTP error!`);
        }
        const watches = await data.json();
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
                        <img src="${watch.image}" alt="handwatch" class="catalog-item_img">
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
        // Add also to section of smart watch or classic
        const catalogSortedItemsElement = document.getElementById('catalogItems_'+watch.type);
        catalogSortedItemsElement.innerHTML += itemHtml;
        // Simulate 2-second rendering delay for each item
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}

// Function to add item to cart by ID
async function addToCart(itemId) {
    let item = await getItemDetails(itemId);
    if (item) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let existingItem = cartItems.find(cartItem => cartItem.id == item.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            item.quantity = 1;
            cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        let totalPrice = parseInt(localStorage.getItem('totalPrice')) || [];
        if(totalPrice){
        totalPrice += item.currentPrice;
        localStorage.setItem('totalPrice', totalPrice);
        }
        
        alert('Item added to cart!');
    } else {
        console.error('Item not found with ID: ' + itemId);
    }
}
  
// Function to get item details based on ID
async function getItemDetails(itemId) {
    try {
        const data = await fetch('data/watches.json');
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
        }
        const watches = await data.json();
        let item = watches.find(watch => watch.id == itemId);
        return item;
    } catch (error) {
        console.error('Failed to fetch item details:', error);
        return null;
    }
}

