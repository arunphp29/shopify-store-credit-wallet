/* Shared, dependency-free wallet helpers. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.Utils = (() => {
  'use strict';

  const toNumber = (value, fallback = 0) => {
    const number = Number(value);

    return Number.isFinite(number) ? number : fallback;
  };

  const toCents = (value, fallback = 0) => Math.max(0, Math.round(toNumber(value, fallback)));

  const formatMoney = (cents) => {
    const safeCents = toCents(cents);

    return new Intl.NumberFormat(document.documentElement.lang || 'en-US', {
      style: 'currency',
      currency: document.documentElement.dataset.currencyCode || 'USD'
    }).format(safeCents / 100);
  };

  const parseJSON = (value, fallback = null) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      return fallback;
    }
  };

  const clamp = (value, minimum, maximum) => Math.min(
    Math.max(toNumber(value), minimum),
    maximum
  );

  return Object.freeze({
    clamp,
    formatMoney,
    parseJSON,
    toCents,
    toNumber
  });
})();
