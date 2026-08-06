/* Shopify AJAX Cart API wrapper. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.CartApi = (() => {
  'use strict';

  const config = window.ShopifyWallet.Config;

  const request = async (url, options = {}) => {
    const response = await fetch(url, {
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        ...options.headers
      },
      ...options
    });

    if (!response.ok) {
      throw new Error(`Cart request failed with status ${response.status}.`);
    }

    return response.json();
  };

  const getCart = () => request(`${config.cartApi.root}${config.cartApi.cart}`);

  const updateAttributes = (attributes) => request(`${config.cartApi.root}${config.cartApi.update}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ attributes })
  });

  const saveWalletPreference = (isApplied, credit) => updateAttributes({
    [config.cartAttributes.applied]: isApplied ? 'true' : '',
    [config.cartAttributes.credit]: isApplied ? String(credit) : ''
  });

  return Object.freeze({ getCart, saveWalletPreference, updateAttributes });
})();
