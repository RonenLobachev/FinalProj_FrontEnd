
  // Catalog Tabs Functionality.
  $('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
      $(this)
        .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
        .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
  });

 
   // Function to add item to cart by ID
function addToCart(itemId) {
  let item = getItemDetails(itemId);
  if (item) {
      let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
      let existingItem = cartItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
          existingItem.quantity++;
      } else {
          item.quantity = 1;
          cartItems.push(item);
      }
      localStorage.setItem('cartItems', JSON.stringify(cartItems));

      let totalPrice = parseInt(localStorage.getItem('totalPrice')) || [];
      if(totalPrice){
        totalPrice += item.price;
        localStorage.setItem('totalPrice', totalPrice);
      }
      
      alert('Item added to cart!');
  } else {
      console.error('Item not found with ID: ' + itemId);
  }
}

// Function to get item details based on ID (dummy function, replace with actual implementation)
function getItemDetails(itemId) {
  switch (itemId) {
      case 'item1':
          return { id: 'item1', name: 'Heart Rate Monitor FD1000', price: 500, image: 'handwatch_1.png' };
      case 'item2':
          return { id: 'item2', name: 'Heart Rate Monitor FD2000', price: 700, image: 'handwatch_2.png' };
      default:
          return null; 
  }
}



// Function to update the cart dropdown menu
function updateCartDropdown() {
  let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

  let cartDropdown = document.getElementById('cartDropdown');
  cartDropdown.innerHTML = ''; 

  cartItems.forEach(item => {
      let cartItemLink = document.createElement('a');
      cartItemLink.classList.add('dropdown-item');
      cartItemLink.textContent = item.name;
      cartDropdown.appendChild(cartItemLink);
  });

  if (cartItems.length === 0) {
      let emptyCartMessage = document.createElement('div');
      emptyCartMessage.classList.add('dropdown-item', 'text-muted');
      emptyCartMessage.textContent = 'Your cart is empty';
      cartDropdown.appendChild(emptyCartMessage);
  }

  let divider = document.createElement('div');
  divider.classList.add('dropdown-divider');
  cartDropdown.appendChild(divider);

  let goToCartButton = document.createElement('button');
  goToCartButton.classList.add('button', 'button_dropdown');
  goToCartButton.type = 'button';
  goToCartButton.textContent = 'to Cart';
  goToCartButton.onclick = function() {
      window.location.href = 'shopping-cart.html';
  };
  cartDropdown.appendChild(goToCartButton);
}

updateCartDropdown();


