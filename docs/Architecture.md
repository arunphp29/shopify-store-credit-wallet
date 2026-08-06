# Architecture

The feature uses a single `ShopifyWallet` namespace. `wallet-config.js` holds selectors and constants. `wallet-utils.js` formats money and normalizes values. `wallet-storage.js` persists only the customer's preference. `wallet-cart-api.js` owns calls to Shopify's AJAX Cart API. `wallet-ui.js` renders the wallet interface. `wallet-system.js` coordinates all modules.

Liquid provides the initial customer balance and cart total in cents through data attributes. The controller refreshes the cart from `/cart.js`, then writes the wallet preference to cart attributes through `/cart/update.js`.
