/* Shopify Wallet System configuration. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.Config = Object.freeze({
  storageKey: 'shopify-wallet-system',
  cartApi: Object.freeze({
    root: window.Shopify && window.Shopify.routes ? window.Shopify.routes.root : '/',
    cart: 'cart.js',
    update: 'cart/update.js'
  }),
  cartAttributes: Object.freeze({
    applied: 'wallet_applied',
    credit: 'wallet_applied_credit'
  }),
  selectors: Object.freeze({
    walletBox: '.wallet-cart-box',
    checkbox: '#apply-wallet-credit',
    cartTotal: '#wallet-cart-total',
    discountRow: '#wallet-discount-row',
    discountAmount: '#wallet-discount-amount',
    finalTotal: '#wallet-final-total',
    preview: '#wallet-discount-preview',
    message: '#wallet-savings-message'
  }),
  classes: Object.freeze({
    hidden: 'hidden',
    applied: 'wallet-credit-applied',
    loading: 'wallet-loading'
  }),
  messages: Object.freeze({
    applied: 'Wallet credit has been applied to this cart.',
    removed: 'Wallet credit has been removed from this cart.',
    failed: 'We could not update wallet credit. Please try again.'
  })
});
