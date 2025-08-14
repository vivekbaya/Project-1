// uspolo.js

// Make sure DOM is loaded before selecting buttons
document.addEventListener('DOMContentLoaded', () => {
    const addToBagButtons = document.querySelectorAll('.add-to-bag');
  
    addToBagButtons.forEach(button => {
      button.addEventListener('click', () => {
        const productCard = button.closest('.product');
  
        const productId = productCard.getAttribute('data-id'); 
        // Get product ID from data-id attribute
  
        if (productId) {
          addToBag(productId); // use addToBag function from index.js
          alert('Item added to your bag!');
        } else {
          alert('Product ID not found!');
        }
      });
    });
  });
  