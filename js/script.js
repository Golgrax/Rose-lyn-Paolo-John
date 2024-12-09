(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var countdownTimer = function() {
      function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        return {
          total,
          days,
          hours,
          minutes,
          seconds
        };
      }
  
      function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const daysSpan = clock.querySelector('.days');
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');
  
        function updateClock() {
          const t = getTimeRemaining(endtime);
          daysSpan.innerHTML = t.days;
          hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
          minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
          secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);
          if (t.total <= 0) {
            clearInterval(timeinterval);
          }
        }
        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
      }
  
      $('#countdown-clock').each(function(){
        const deadline = new Date(Date.parse(new Date()) + 28 * 24 * 60 * 60 * 1000);
        initializeClock('countdown-clock', deadline);
      });
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();
      countdownTimer();

      /* Video */
      var $videoSrc;  
        $('.play-btn').click(function() {
          $videoSrc = $(this).data( "src" );
        });

        $('#myModal').on('shown.bs.modal', function (e) {

        $("#video").attr('src',$videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0" ); 
      })

      $('#myModal').on('hide.bs.modal', function (e) {
        $("#video").attr('src',$videoSrc); 
      })

      var mainSwiper = new Swiper(".main-swiper", {
        speed: 500,
        navigation: {
          nextEl: ".main-slider-button-next",
          prevEl: ".main-slider-button-prev",
        },
      });

      var productSwiper = new Swiper(".product-swiper", {
        spaceBetween: 20,        
        navigation: {
          nextEl: ".product-slider-button-next",
          prevEl: ".product-slider-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          270: {
            slidesPerView: 2,
          },
          660: {
            slidesPerView: 3,
          },
          980: {
            slidesPerView: 4,
          },
          1500: {
            slidesPerView: 5,
          }
        },
      });      

      var testimonialSwiper = new Swiper(".testimonial-swiper", {
        spaceBetween: 20,
        navigation: {
          nextEl: ".testimonial-button-next",
          prevEl: ".testimonial-button-prev",
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
          },
          800: {
            slidesPerView: 2,
          },
          1400: {
            slidesPerView: 3,
          }
        },
      });

      var thumb_slider = new Swiper(".thumb-swiper", {
        slidesPerView: 1,
      });
      var large_slider = new Swiper(".large-swiper", {
        spaceBetween: 10,
        effect: 'fade',
        thumbs: {
          swiper: thumb_slider,
        },
      });

    }); // End of a document ready

    window.onload = function() {
      setTimeout(function() {
        var loader = document.querySelector('.preloader-container');
        loader.classList.add("active_new");
      }, 4000);

      const spans = document.querySelectorAll('.preloader-text span');
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.style.opacity = '1';
          span.style.animation = ' expandWidth 10s forwards, fadeOut 5s forwards';
        }, index * 200);
      });
    };

})(jQuery);



document.addEventListener("DOMContentLoaded", () => {
  // Retrieve saved counts from localStorage or initialize to 0
  let wishlistCount = parseInt(localStorage.getItem("wishlistCount")) || 0;
  let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

  // Get elements for updating counts
  const wishlistAmountElements = document.querySelectorAll(".wishlistAmmout");
  const cartAmountElements = document.querySelectorAll(".CartAmmout");

  // Function to update the displayed count
  function updateCount(elements, count) {
    elements.forEach((element) => {
      element.textContent = count;
    });
  }

  // Function to save counts to localStorage
  function saveCounts() {
    localStorage.setItem("wishlistCount", wishlistCount);
    localStorage.setItem("cartCount", cartCount);
  }

  // Initialize counts on page load
  updateCount(wishlistAmountElements, wishlistCount);
  updateCount(cartAmountElements, cartCount);

  // Add event listeners for "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      cartCount++;
      updateCount(cartAmountElements, cartCount);
      saveCounts(); // Save updated counts
    });
  });

  // Add event listeners for "Add to Wishlist" buttons
  document.querySelectorAll(".add-to-wishlist").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      wishlistCount++;
      updateCount(wishlistAmountElements, wishlistCount);
      saveCounts(); // Save updated counts
    });
  });

  // Add event listener for "Add All to Cart" button
  document.querySelector(".add-all-to-cart").addEventListener("click", (event) => {
    event.preventDefault();

    if (wishlistCount > 0) {
      cartCount += wishlistCount; // Move all items from wishlist to cart
      wishlistCount = 0; // Reset wishlist count

      // Update both amounts
      updateCount(cartAmountElements, cartCount);
      updateCount(wishlistAmountElements, wishlistCount);

      saveCounts(); // Save updated counts

      alert(`Moved all items from Wishlist to Cart.`);
    } else {
      alert("Your Wishlist is empty.");
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Function to update cart items display
    function updateCartDisplay() {
      const cartContainer = document.querySelector(".cart-items-container");
      const cartTotalsContainer = document.querySelector(".cart-totals .total-price .price-amount"); 
      cartContainer.innerHTML = ''; // Clear current items
      let totalAmount = 0; // To accumulate the total price
  
      cart.forEach(item => {
        // Calculate the subtotal for each item
        const itemSubtotal = item.price * item.quantity;
  
        // Create a new cart item element for each product
        const cartItemHTML = `
          <div class="cart-item border-bottom padding-small" data-product-id="${item.id}">
            <div class="row align-items-center">
              <div class="col-lg-4 col-md-3">
                <div class="cart-info d-flex gap-2 flex-wrap align-items-center">
                  <div class="col-lg-5">
                    <div class="card-image">
                      <img src="${item.image}" class="img-fluid" alt="product item">
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card-detail">
                      <h5 class="mt-2"><a href="single-product.html">${item.name}</a></h5>
                      <div class="card-price">
                        <span class="price text-primary fw-light">${item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-7">
                <div class="row d-flex">
                  <div class="col-md-6">
                    <div class="product-quantity my-2">
                      <div class="input-group product-qty align-items-center" style="max-width: 150px;">
                        <span class="input-group-btn">
                          <button type="button" class="bg-white shadow border rounded-3 fw-light quantity-left-minus" data-product-id="${item.id}" data-type="minus">
                            <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                          </button>
                        </span>
                        <input type="number" class="form-control bg-white shadow border rounded-3 py-2 mx-2 input-number text-center" value="${item.quantity}" min="1" max="100" data-product-id="${item.id}" required="">
                        <span class="input-group-btn">
                          <button type="button" class="bg-white shadow border rounded-3 fw-light quantity-right-plus" data-product-id="${item.id}" data-type="plus">
                            <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="total-price">
                      <span class="money fs-2 fw-light text-primary subtotalprice" data-product-id="${item.id}">₱${itemSubtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>             
              </div>
              <div class="col-lg-1 col-md-2">
                <div class="cart-cross-outline">
                  <a href="#" class="remove-from-cart" data-product-id="${item.id}">
                    <svg class="cart-cross-outline" width="38" height="38">
                      <use xlink:href="#cart-cross-outline"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        cartContainer.insertAdjacentHTML("beforeend", cartItemHTML);
        
        // Add to total amount
        totalAmount += itemSubtotal;
      });
  
      // Update the total price at the bottom
      cartTotalsContainer.innerHTML = `
        <bdi><span class="price-currency-symbol">₱</span>${totalAmount.toFixed(2)}</bdi>
      `;
    }
  
    // Event listeners for quantity change
    document.querySelectorAll(".quantity-left-minus").forEach(button => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.productId;
        const product = cart.find(item => item.id == productId);
        if (product && product.quantity > 1) {
          product.quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });
  
    document.querySelectorAll(".quantity-right-plus").forEach(button => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.productId;
        const product = cart.find(item => item.id == productId);
        if (product) {
          product.quantity++;
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });
  
    // Event listener for removing products from the cart
    document.querySelectorAll(".remove-from-cart").forEach(button => {
      button.addEventListener("click", (e) => {
        const productId = e.target.dataset.productId;
        const index = cart.findIndex(item => item.id == productId);
        if (index > -1) {
          cart.splice(index, 1);
          localStorage.setItem("cart", JSON.stringify(cart));
          updateCartDisplay();
        }
      });
    });
  
    // Initialize cart display
    updateCartDisplay();
  });


  document.addEventListener("DOMContentLoaded", () => {
    // Load cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
    // Function to update cart display and totals
    function updateCartDisplay() {
      const cartContainer = document.querySelector(".cart-items-container");
      const cartTotalsContainer = document.querySelector(".cart-totals .total-price .price-amount"); 
      const cartSubtotal = document.getElementById("cart-subtotal");
      const cartTotal = document.getElementById("cart-total");
  
      cartContainer.innerHTML = ''; // Clear current items
      let totalAmount = 0; // To accumulate the total price
  
      cart.forEach(item => {
        // Calculate the subtotal for each item
        const itemSubtotal = item.price * item.quantity;
  
        // Create a new cart item element for each product
        const cartItemHTML = `
          <div class="cart-item border-bottom padding-small" data-product-id="${item.id}">
            <div class="row align-items-center">
              <div class="col-lg-4 col-md-3">
                <div class="cart-info d-flex gap-2 flex-wrap align-items-center">
                  <div class="col-lg-5">
                    <div class="card-image">
                      <img src="${item.image}" class="img-fluid" alt="product item">
                    </div>
                  </div>
                  <div class="col-lg-4">
                    <div class="card-detail">
                      <h5 class="mt-2"><a href="single-product.html">${item.name}</a></h5>
                      <div class="card-price">
                        <span class="price text-primary fw-light">${item.price}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-lg-6 col-md-7">
                <div class="row d-flex">
                  <div class="col-md-6">
                    <div class="product-quantity my-2">
                      <div class="input-group product-qty align-items-center" style="max-width: 150px;">
                        <span class="input-group-btn">
                          <button type="button" class="bg-white shadow border rounded-3 fw-light quantity-left-minus" data-product-id="${item.id}" data-type="minus">
                            <svg width="16" height="16"><use xlink:href="#minus"></use></svg>
                          </button>
                        </span>
                        <input type="number" class="form-control bg-white shadow border rounded-3 py-2 mx-2 input-number text-center" value="${item.quantity}" min="1" max="100" data-product-id="${item.id}" required="">
                        <span class="input-group-btn">
                          <button type="button" class="bg-white shadow border rounded-3 fw-light quantity-right-plus" data-product-id="${item.id}" data-type="plus">
                            <svg width="16" height="16"><use xlink:href="#plus"></use></svg>
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-4">
                    <div class="total-price">
                      <span class="money fs-2 fw-light text-primary subtotalprice" data-product-id="${item.id}">₱${itemSubtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>             
              </div>
              <div class="col-lg-1 col-md-2">
                <div class="cart-cross-outline">
                  <a href="#" class="remove-from-cart" data-product-id="${item.id}">
                    <svg class="cart-cross-outline" width="38" height="38">
                      <use xlink:href="#cart-cross-outline"></use>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        `;
        cartContainer.insertAdjacentHTML("beforeend", cartItemHTML);
        
        // Add to total amount
        totalAmount += itemSubtotal;
      });
  
      // Update the subtotal and total prices
      cartSubtotal.innerHTML = totalAmount.toFixed(2);
      cartTotal.innerHTML = totalAmount.toFixed(2);
    }
  
    // Event listener for "Proceed to Checkout" button
    document.getElementById("proceed-to-checkout").addEventListener("click", () => {
      // Clear the cart from localStorage
      localStorage.removeItem("cart");
  
      // Optionally, redirect to checkout page or update UI
      alert("Proceeding to checkout. Your cart has been cleared.");
      updateCartDisplay(); // Update UI to reflect the cleared cart
    });
  
    // Initialize cart display
    updateCartDisplay();
  });
  
});