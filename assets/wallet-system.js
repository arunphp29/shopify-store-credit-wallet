/* Main Shopify Wallet System coordinator. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.System = (() => {
  'use strict';

  const config = window.ShopifyWallet.Config;
  const utils = window.ShopifyWallet.Utils;
  const storage = window.ShopifyWallet.Storage;
  const cartApi = window.ShopifyWallet.CartApi;
  const ui = window.ShopifyWallet.UI;

  let state = {
    balance: 0,
    cartTotal: 0,
    isApplied: false
  };

  const getCredit = () => Math.min(state.balance, state.cartTotal);

  const render = () => {
    const canApply = state.balance > 0 && state.cartTotal > 0;

    if (!canApply) {
      state.isApplied = false;
    }

    ui.render({
      cartTotal: state.cartTotal,
      credit: getCredit(),
      isApplied: state.isApplied
    });
    ui.setDisabled(!canApply);
  };

  const updateWallet = async (isApplied) => {
    const previousState = state.isApplied;

    state.isApplied = isApplied;
    ui.hideMessage();
    ui.setLoading(true);
    render();

    try {
      await cartApi.saveWalletPreference(isApplied, getCredit());
      storage.save({ isApplied });
      ui.showMessage(isApplied ? config.messages.applied : config.messages.removed);
    } catch (error) {
      state.isApplied = previousState;
      render();
      ui.showMessage(config.messages.failed);
      console.error('Wallet update failed.', error);
    } finally {
      ui.setLoading(false);
      ui.setDisabled(state.balance <= 0 || state.cartTotal <= 0);
    }
  };

  const initialize = async () => {
    if (!ui.initialize()) {
      return;
    }

    const walletBox = document.querySelector(config.selectors.walletBox);
    const savedState = storage.load();

    state.balance = utils.toCents(walletBox.dataset.walletBalance);
    state.cartTotal = utils.toCents(walletBox.dataset.cartTotal);
    state.isApplied = savedState.isApplied;

    try {
      const cart = await cartApi.getCart();

      state.cartTotal = utils.toCents(cart.total_price);
      state.isApplied = cart.attributes && cart.attributes[config.cartAttributes.applied] === 'true'
        ? true
        : state.isApplied;
    } catch (error) {
      console.warn('Wallet is using cart data rendered by Liquid.', error);
    }

    render();
    ui.onChange(updateWallet);
  };

  return Object.freeze({ initialize });
})();

document.addEventListener('DOMContentLoaded', () => {
  window.ShopifyWallet.System.initialize();
});
