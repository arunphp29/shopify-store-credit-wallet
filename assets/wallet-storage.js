/* Local storage adapter for the wallet application preference. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.Storage = (() => {
  'use strict';

  const config = window.ShopifyWallet.Config;
  const utils = window.ShopifyWallet.Utils;

  const supported = () => {
    try {
      const testKey = `${config.storageKey}:test`;

      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);

      return true;
    } catch (error) {
      return false;
    }
  };

  const load = () => {
    if (!supported()) {
      return { isApplied: false };
    }

    const storedValue = utils.parseJSON(window.localStorage.getItem(config.storageKey), {});

    return {
      isApplied: Boolean(storedValue && storedValue.isApplied)
    };
  };

  const save = (state) => {
    const nextState = {
      isApplied: Boolean(state && state.isApplied),
      updatedAt: new Date().toISOString()
    };

    if (!supported()) {
      return nextState;
    }

    try {
      window.localStorage.setItem(config.storageKey, JSON.stringify(nextState));
    } catch (error) {
      console.warn('Wallet state could not be saved locally.', error);
    }

    return nextState;
  };

  const clear = () => {
    if (!supported()) {
      return;
    }

    try {
      window.localStorage.removeItem(config.storageKey);
    } catch (error) {
      console.warn('Wallet state could not be cleared locally.', error);
    }
  };

  return Object.freeze({ clear, load, save, supported });
})();
