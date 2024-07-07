// Function to load cart items from localStorage
function loadCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItemsContainer = document.getElementById('cartItems');
    let totalPrice = 0;
    if (!isEmptyCart()){
        cartItems.forEach(item => {
            // Create card wrapper
            let cardWrapper = document.createElement('div');
            cardWrapper.classList.add('card', 'mb-4');
            cardWrapper.id = item.id;
            
  
            // Create card body
            let cardBody = document.createElement('div');
            cardBody.classList.add('card-body', 'p-4');
  
            // Create row
            let row = document.createElement('div');
            row.classList.add('row', 'd-flex', 'justify-content-between', 'align-items-center');
  
            // Column for image
            let colImg = document.createElement('div');
            colImg.classList.add('col-md-2', 'col-lg-2', 'col-xl-2');
  
            // Image element
            let img = document.createElement('img');
            img.src = 'css/images/' + item.image;
            img.classList.add('img-fluid');
            img.alt = item.name;
  
            // Append image to column
            colImg.appendChild(img);
  
            // Column for title
            let colTitle = document.createElement('div');
            colTitle.classList.add('col-md-3', 'col-lg-3', 'col-xl-3');
  
            // Title element
            let title = document.createElement('p');
            title.classList.add('lead', 'fw-normal', 'mb-2');
            title.textContent = item.name;
  
            // Append title to column
            colTitle.appendChild(title);
  
            // Column for quantity controls
            let colQty = document.createElement('div');
            colQty.classList.add('col-md-3', 'col-lg-3', 'col-xl-2', 'd-flex');
  
            // Decrease button
            let decreaseBtn = document.createElement('button');
            decreaseBtn.classList.add('btn', 'btn-danger', 'px-2');
            decreaseBtn.textContent = '-';
            decreaseBtn.onclick = function() {
                adjustQuantity(item.id, -1);
            };
  
            // Quantity input
            let qtyInput = document.createElement('input');
            qtyInput.type = 'number';
            qtyInput.classList.add('form-control', 'form-control-sm');
            qtyInput.value = item.quantity;
            qtyInput.id = 'qty'+item.id;
            qtyInput.setAttribute('min', '1');
            qtyInput.oninput = function() {
                adjustQuantity(item.id, parseInt(this.value) - item.quantity);
            };
  
            // Increase button
            let increaseBtn = document.createElement('button');
            increaseBtn.classList.add('btn', 'btn-success', 'px-2');
            increaseBtn.textContent = '+';
            increaseBtn.onclick = function() {
                adjustQuantity(item.id, 1);
            };
  
            // Append buttons and input to column
            colQty.appendChild(decreaseBtn);
            colQty.appendChild(qtyInput);
            colQty.appendChild(increaseBtn);
  
            // Column for price
            let colPrice = document.createElement('div');
            colPrice.classList.add('col-md-3', 'col-lg-2', 'col-xl-2', 'offset-lg-1');
  
            // Price element
            let price = document.createElement('h5');
            price.classList.add('mb-0');
            price.id = 'price'+item.id;
            price.textContent = '$' + (item.price * item.quantity).toFixed(2);
  
            // Append price to column
            colPrice.appendChild(price);
  
            // Column for remove button
            let colRemove = document.createElement('div');
            colRemove.classList.add('col-md-1', 'col-lg-1', 'col-xl-1', 'text-end');
  
            // Remove button
            let removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.classList.add('btn', 'btn-outline-danger');
            removeBtn.textContent = 'X';
            removeBtn.onclick = function() {
                removeFromCart(item.id);
            };
  
            // Append remove button to column
            colRemove.appendChild(removeBtn);
  
            // Append columns to row
            row.appendChild(colImg);
            row.appendChild(colTitle);
            row.appendChild(colQty);
            row.appendChild(colPrice);
            row.appendChild(colRemove);
  
            // Append row to card body
            cardBody.appendChild(row);
  
            // Append card body to card wrapper
            cardWrapper.appendChild(cardBody);
  
            // Append card wrapper to cart items container
            cartItemsContainer.appendChild(cardWrapper);

        });
        document.getElementById('totalPrice').textContent ='$'+ parseInt(localStorage.getItem('totalPrice')).toFixed(2);
    


    }
    
  }


  //Fuction to check if a cart is empty. Create alert if it is empty.
  function isEmptyCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItemsContainer = document.getElementById('cartItems');
    if (cartItems.length == 0) {
        let emptyCartMessage = document.createElement('div');
        emptyCartMessage.classList.add('alert', 'alert-warning');
        emptyCartMessage.textContent = 'Your cart is empty';
        cartItemsContainer.appendChild(emptyCartMessage);
        return true;
    }else{
        return false;
    }
  }
  // Function to adjust quantity of an item in the cart
  function adjustQuantity(itemId, amount) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let updatedCartItems = cartItems.map(item => {
        if (item.id == itemId) {
            item.quantity += amount;
            document.getElementById('qty'+item.id).value = item.quantity;
            if (item.quantity <= 0) {
                removeFromCart(itemId); 
                return null; 
            }

            let newPrice = item.quantity*item.price;
            document.getElementById('price'+item.id).textContent ='$'+newPrice.toFixed(2);

            let newTotalPrice = parseInt(localStorage.getItem('totalPrice'))+item.price*amount;
            document.getElementById('totalPrice').textContent ='$'+ newTotalPrice.toFixed(2);
            localStorage.setItem('totalPrice', newTotalPrice);

        }
        return item;
    }).filter(Boolean);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  }
  
  // Function to remove item from cart
  function removeFromCart(itemId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let newTotalPrice = 0;
    
    let updatedCartItems = cartItems.filter(item => item.id !== itemId);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));

    cartItems.map( item => {
        if (item.id == itemId){
            newTotalPrice = parseInt(localStorage.getItem('totalPrice')) - item.quantity*item.price;;
            document.getElementById('totalPrice').textContent ='$'+ newTotalPrice.toFixed(2);
            localStorage.setItem('totalPrice', newTotalPrice);
        }
    });
    

    document.getElementById(itemId).remove();
    isEmptyCart();
    
  }
  
  // Function to clear all items from cart
  function clearCart() {
    localStorage.removeItem('cartItems');
    loadCartItems(); 
    isEmptyCart();
    location.reload();
  }

  loadCartItems();