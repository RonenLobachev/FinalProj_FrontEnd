function submitOrder()
{
    submit_order();
}

async function submit_order() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (!cartItems || cartItems.length === 0) {
        console.error('No items in cart or cart data has expired.');
        return;
    }

    // Prepare WatchIds as a colon-separated string in the format WATCH_ID|COUNT_IN_ORDER
    const watchIds = cartItems.map(item => `${item.id}|${item.quantity}`).join(':');

    const orderData = {
        watchIds: watchIds,
        supplied: false // By default, orders are not supplied
    };

    try {
        const response = await fetch('http://localhost:5251/api/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            alert('Order submitted successfully!');
            // Clear cart data after successful submission
            cartItems.forEach(item => {
                removeItem(item.id);
            });
        } else {
            alert('Failed to submit order.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function removeItem(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let newTotalPrice = 0;

    let updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    cartItems.map( item => {
    if (item.id == itemId){
        newTotalPrice = parseInt(localStorage.getItem('totalPrice')) - item.quantity*item.currentPrice;;
        document.getElementById('totalPrice').textContent ='$'+ newTotalPrice.toFixed(2);
        localStorage.setItem('totalPrice', newTotalPrice);
    }
    });
    
    document.getElementById(itemId).remove();
    isEmptyCart();
}