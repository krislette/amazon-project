let productsHTML = '';

products.forEach((product) => {
    productsHTML += `
        <div class="product-container">
            <div class="product-image-container">
                <img class="product-image" src="${product.image}">
            </div>
            <div class="product-name limit-text-to-2-lines">
                ${product.name}
            </div>
            <div class="product-rating-container">
                <img class="product-rating-stars" src="images/ratings/rating-${product.rating.stars * 10}.png">
                <div class="product-rating-count link-primary">${product.rating.count}</div>
            </div>
            <div class="product-price">
                $${(product.priceCents / 100).toFixed(2)}
            </div>
            <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                    <option selected value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
            </div>
            <div class="product-spacer"></div>
            <div class="added-to-cart js-added-message-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
            </div>
            <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
                Add to Cart
            </button>
        </div>
    `;
});

document.querySelector('.js-products-grid').innerHTML = productsHTML;

const addedMessageTimeouts = {}; // object that will contain the timeout ids of diff products

document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            // dataset retrieves all the data attribute that we put on the html
            // "data-" is another html attribute which sets an "id" to something on html
            // data-product-name turned into productName
            const productID = button.dataset.productId;
            // const {productID} = button.dataset; --> destructuring if my variable name is the same as the data attribute 
            
            let matchingItem;

            cart.forEach((item) => {
                if (productID === item.productID) {
                    matchingItem = item;
                }
            });

            const quantityElement = document.querySelector(`.js-quantity-selector-${productID}`);
            const quantity = Number(quantityElement.value);

            if (matchingItem) {
                matchingItem.quantity += quantity;
            } else {
                cart.push({
                    productID,
                    quantity
                });
            }

            let cartQuantity = 0;

            cart.forEach((item) => {
                cartQuantity += item.quantity;
            });

            document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

            const addedElement = document.querySelector(`.js-added-message-${productID}`);
            addedElement.classList.add('show-added-to-cart');
            const previousTimeoutId = addedMessageTimeouts[productID];

            // checks if there is a timeout id for this product
            // if so, clear the timeout
            if (previousTimeoutId) {
                clearTimeout(previousTimeoutId);
            }

            const timeoutID = setTimeout(() => {
                addedElement.classList.remove('show-added-to-cart');
            }, 2000);

            // adds the timeout id to the object
            // so that we can clear it later
            addedMessageTimeouts[productID] = timeoutID;
        });
    });