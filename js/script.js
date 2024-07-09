//load footer and nav bar from navbar.html for every hyml pages
$("#nav-placeholder").load("navbar.html");
$("#footer-placeholder").load("footer.html");
// Catalog Tabs Functionality.
$('ul.catalog_tabs').on('click', 'li:not(.catalog_tab_active)', function() {
    $(this)
      .addClass('catalog_tab_active').siblings().removeClass('catalog_tab_active')
      .closest('div.container').find('div.catalog_content').removeClass('catalog_content_active').eq($(this).index()).addClass('catalog_content_active');
});

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

  if (cartItems.length == 0) {
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