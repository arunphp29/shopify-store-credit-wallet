# Shopify Wallet / Store Credit System

A modular Shopify theme frontend that simulates applying a customer's store credit to a cart. It reads the logged-in customer's `custom.wallet_balance` metafield, saves the choice in cart attributes and local storage, and updates the cart summary without changing checkout prices.

## Install into an existing theme

This repository is a wallet feature package, not a complete storefront theme. Do not upload it as a replacement theme. Copy the contents of `assets` and `snippets` into an existing Shopify Online Store 2.0 theme, then merge the wallet asset tags and render call from the supplied integration files. Load the six JavaScript files in the order shown in `layout/theme.liquid`. Render `{% render 'wallet-balance' %}` where the customer balance should appear.

Create a customer metafield with namespace/key `custom.wallet_balance`. Store it as a `number_integer` in cents: `5000` represents $50.00.


> **Note: This repository demonstrates frontend architecture and Shopify theme development. A production-ready implementation requires a custom Shopify app, Shopify Functions, and backend services, which are planned for future releases.**




## 🏗 Production Implementation Guide

To convert this project into a real production-ready Wallet System, additional backend components are required.

### Phase 1 — Theme (Current Repository)
Status: ✅ Completed

---

### Phase 2 — Shopify Custom App
Create a custom Shopify App responsible for: 

- Wallet Management  - Wallet Transactions  - Wallet History
- Admin Dashboard    - Customer Wallet API  - Merchant Settings

Recommended stack:
- Node.js - React   - Shopify Admin GraphQL API  - PostgreSQL

---

### Phase 3 — Shopify Functions
Implement Shopify Functions to enable:

- Real Wallet Deduction  - Checkout Validation  - Store Credit Logic
- Discount Application  - Balance Verification

This is where the actual checkout amount is modified.

---

### Phase 4 — Webhooks

Use Shopify Webhooks to synchronize wallet balances.

Recommended webhooks:

- orders/paid  - orders/create  - refunds/create
- orders/cancelled  - customers/create

These events keep wallet balances accurate and automatically process credits, debits, refunds, and cashback.

---

### Phase 5 — Wallet Database

 Move wallet data from Local Storage to a secure backend. 

---

### Phase 6 — Customer Dashboard
Allow customers to:

- View Wallet Balance  - View Wallet History  - Track Credits  - Track Debits

- Redeem Wallet Balance  - View Cashback Rewards

---

### Phase 7 — Merchant Dashboard

Provide an admin interface for merchants

> ## Other simple way we can use Store Credit and Shopify Flow:-
For a real non-Plus implementation, use Shopify's native Store Credit as the source of truth. Enable Customer accounts and Store credit in Shopify Admin, then display the signed-in customer's real balance with `customer.store_credit_account.balance`. Shopify securely applies and debits the credit at checkout. 
To award credit automatically, create a Shopify Flow workflow using the **Order paid** trigger. Add a condition for the reward rule, such as an order total of $500 or more, then use **Send Admin API request** to call Shopify's `storeCreditAccountCredit` mutation and issue $50 credit to the customer. Store each processed order ID to avoid duplicate rewards from webhook retries, and define how refunds reverse earned credit.

## License

MIT. See `LICENSE`.
