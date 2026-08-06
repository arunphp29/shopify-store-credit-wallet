# FAQ

## Does this change checkout pricing?

No. It updates only the storefront summary and saves cart attributes.

## Is it safe for real store credit?

No. Browser values and cart attributes can be changed by shoppers. Production credit must be validated and debited by server-side systems.

## Why are amounts in cents?

Shopify cart prices use cents. Keeping wallet amounts in the same unit avoids rounding and formatting inconsistencies.

## What is required for production?

A Custom App for balance records, Shopify Functions for checkout discounts, and webhooks for order reconciliation.
