document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const products = document.querySelectorAll(".product");
  
    const categoryCheckboxes = document.querySelectorAll(".categories input[type='checkbox']");
    const brandCheckboxes = document.querySelectorAll(".brand input[type='checkbox']");
    const minRange = document.getElementById("min-range");
    const maxRange = document.getElementById("max-range");
    const priceLabel = document.getElementById("price-label");
  
    function getCheckedValues(checkboxes) {
      return Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.labels[0].innerText.toLowerCase());
    }
  
    function filterProducts() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedCategories = getCheckedValues(categoryCheckboxes);
      const selectedBrands = getCheckedValues(brandCheckboxes);
      const minPrice = parseInt(minRange.value, 10);
      const maxPrice = parseInt(maxRange.value, 10);
  
      priceLabel.textContent = `₹${minPrice} - ₹${maxPrice}+`;
  
      products.forEach(product => {
        const name = product.querySelector("h3").innerText.toLowerCase();
        const description = product.querySelectorAll("p")[0].innerText.toLowerCase();
        const category = product.getAttribute("data-category").toLowerCase();
        const brand = product.getAttribute("data-brand").toLowerCase();
        const price = parseInt(product.getAttribute("data-price"), 10);
  
        const matchesSearch = name.includes(searchTerm) || description.includes(searchTerm);
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(brand);
        const matchesPrice = price >= minPrice && price <= maxPrice;
  
        if (matchesSearch && matchesCategory && matchesBrand && matchesPrice) {
          product.style.display = "block";
        } else {
          product.style.display = "none";
        }
      });
    }
  
    searchInput.addEventListener("input", filterProducts);
    categoryCheckboxes.forEach(cb => cb.addEventListener("change", filterProducts));
    brandCheckboxes.forEach(cb => cb.addEventListener("change", filterProducts));
    minRange.addEventListener("input", filterProducts);
    maxRange.addEventListener("input", filterProducts);
  });
  