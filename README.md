# Shopify Wallet / Store Credit System

A modular Shopify theme frontend that simulates applying a customer's store credit to a cart. It reads the logged-in customer's `custom.wallet_balance` metafield, saves the choice in cart attributes and local storage, and updates the cart summary without changing checkout prices.

## Install into an existing theme

This repository is a wallet feature package, not a complete storefront theme. Do not upload it as a replacement theme. Copy the contents of `assets` and `snippets` into an existing Shopify Online Store 2.0 theme, then merge the wallet asset tags and render call from the supplied integration files. Load the six JavaScript files in the order shown in `layout/theme.liquid`. Render `{% render 'wallet-balance' %}` where the customer balance should appear.

Create a customer metafield with namespace/key `custom.wallet_balance`. Store it as a `number_integer` in cents: `5000` represents $50.00.

## Important limitation

This is a visual frontend simulation. Cart attributes and local storage are browser-controlled and do not affect Shopify checkout. A production wallet requires a Custom App, Shopify Functions, server-side balance validation, and webhooks to reconcile successful orders.

## Structure

`wallet-config.js` defines constants; utilities, storage, AJAX cart access, UI rendering, and controller logic are isolated into their own modules.

## License

MIT. See `LICENSE`.
