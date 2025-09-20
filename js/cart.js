// Cart functionality
document.addEventListener('DOMContentLoaded', () => {
    // Handle quantity changes
    const handleQuantityChange = (input, change) => {
        let currentValue = parseInt(input.value) || 1;
        const newValue = Math.max(1, currentValue + change);
        input.value = newValue;
        updateCartTotals();
    };

    // Update cart totals based on quantities
    const updateCartTotals = () => {
        const items = document.querySelectorAll('[data-cart-item]');
        let totalQuantity = 0;
        let totalPrice = 0;

        items.forEach(item => {
            const quantity = parseInt(item.querySelector('input[type="number"]').value) || 0;
            const price = parseFloat(item.getAttribute('data-price')) || 0;
            totalQuantity += quantity;
            totalPrice += quantity * price;
        });

        // Update cart summary
        const cartCounter = document.querySelector('#cart-icon .min-w-\\[20px\\]');
        if (cartCounter) {
            cartCounter.textContent = totalQuantity;
        }

        // Update total price
        const totalPriceElement = document.querySelector('.text-muted-foreground');
        if (totalPriceElement) {
            totalPriceElement.textContent = `Ви замовляєте ${totalQuantity} товарів на суму ${totalPrice.toLocaleString()} грн`;
        }
    };

    // Initialize quantity buttons
    document.querySelectorAll('[data-cart-item]').forEach(item => {
        const quantityInput = item.querySelector('input[type="number"]');
        const minusButton = item.querySelector('button:first-of-type');
        const plusButton = item.querySelector('button:last-of-type');
        const deleteButton = item.querySelector('button.text-red-500');

        if (minusButton) {
            minusButton.addEventListener('click', () => handleQuantityChange(quantityInput, -1));
        }

        if (plusButton) {
            plusButton.addEventListener('click', () => handleQuantityChange(quantityInput, 1));
        }

        if (quantityInput) {
            quantityInput.addEventListener('change', () => {
                quantityInput.value = Math.max(1, parseInt(quantityInput.value) || 1);
                updateCartTotals();
            });
        }

        if (deleteButton) {
            deleteButton.addEventListener('click', () => {
                item.remove();
                updateCartTotals();
            });
        }
    });

    // Initial totals calculation
    updateCartTotals();
});