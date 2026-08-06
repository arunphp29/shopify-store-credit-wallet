/* Wallet DOM rendering only. */
window.ShopifyWallet = window.ShopifyWallet || {};

window.ShopifyWallet.UI = (() => {
  'use strict';

  const config = window.ShopifyWallet.Config;
  const utils = window.ShopifyWallet.Utils;
  let elements = {};

  const initialize = () => {
    const selectors = config.selectors;

    elements = {
      walletBox: document.querySelector(selectors.walletBox),
      checkbox: document.querySelector(selectors.checkbox),
      cartTotal: document.querySelector(selectors.cartTotal),
      discountRow: document.querySelector(selectors.discountRow),
      discountAmount: document.querySelector(selectors.discountAmount),
      finalTotal: document.querySelector(selectors.finalTotal),
      preview: document.querySelector(selectors.preview),
      message: document.querySelector(selectors.message)
    };

    return Boolean(elements.walletBox && elements.checkbox);
  };

  const render = ({ cartTotal, credit, isApplied }) => {
    const appliedCredit = isApplied ? credit : 0;
    const finalTotal = Math.max(0, cartTotal - appliedCredit);

    elements.checkbox.checked = isApplied;
    elements.cartTotal.textContent = utils.formatMoney(cartTotal);
    elements.discountAmount.textContent = `-${utils.formatMoney(appliedCredit)}`;
    elements.finalTotal.textContent = utils.formatMoney(finalTotal);
    elements.discountRow.classList.toggle(config.classes.hidden, !isApplied);
    elements.walletBox.classList.toggle(config.classes.applied, isApplied);
    elements.preview.textContent = isApplied
      ? `Wallet credit applied: ${utils.formatMoney(appliedCredit)}`
      : '';
  };

  const setLoading = (isLoading) => {
    elements.checkbox.disabled = isLoading;
    elements.walletBox.classList.toggle(config.classes.loading, isLoading);
  };

  const setDisabled = (isDisabled) => {
    elements.checkbox.disabled = isDisabled;
  };

  const showMessage = (message) => {
    elements.message.textContent = message;
    elements.message.classList.remove(config.classes.hidden);
  };

  const hideMessage = () => {
    elements.message.textContent = '';
    elements.message.classList.add(config.classes.hidden);
  };

  const onChange = (callback) => {
    elements.checkbox.addEventListener('change', (event) => callback(event.target.checked));
  };

  return Object.freeze({ hideMessage, initialize, onChange, render, setDisabled, setLoading, showMessage });
})();
