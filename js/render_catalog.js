document.addEventListener('DOMContentLoaded', async function() {
    await loadCatalog();
});

async function loadCatalog() {
    try {
        const data = await fetch('data/watches.json');
        if (!data.ok) {
            throw new Error(`HTTP error! Status: ${data.status}`);
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
        
        const catalogSortedItemsElement = document.getElementById('catalogItems_'+watch.type);
        catalogSortedItemsElement.innerHTML += itemHtml;
        // Simulate 2-second rendering delay for each item
        await new Promise(resolve => setTimeout(resolve, 2000));
    }
}
