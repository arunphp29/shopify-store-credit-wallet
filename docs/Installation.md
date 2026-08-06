# Installation

1. Create a customer metafield named `custom.wallet_balance` with type `number_integer`.
2. Store balances in cents. For example, `2500` represents $25.00.
3. Copy the project `assets` and `snippets` into an existing Online Store 2.0 theme. Do not replace an existing theme's complete layout or cart footer file.
4. Load the six scripts in the order shown in `layout/theme.liquid`.
5. Render `{% render 'wallet-cart' %}` immediately above the checkout button in the cart footer.
6. Render `{% render 'wallet-balance' %}` in a customer-facing theme location.

The customer must be signed in for wallet UI to display.
