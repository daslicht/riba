"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./img-url.formatter"));
__export(require("./money.formatter"));
__export(require("./money-with-currency.formatter"));
// Add Shopify-specific formatters for Rivets.js.
// export const money = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyFormat, 'money_format', currency);
// };
// export const moneyWithCurrency = (value, currency) => {
//   return Utils.formatMoney(value, ProductJS.settings.moneyWithCurrencyFormat, 'money_with_currency_format', currency);
// };
// export const weight = (grams) => {
//   switch (CartJS.settings.weightUnit) {
//     case 'kg':
//       return (grams / 1000).toFixed(CartJS.settings.weightPrecision);
//     case 'oz':
//       return (grams * 0.035274).toFixed(CartJS.settings.weightPrecision);
//     case 'lb':
//       return (grams * 0.00220462).toFixed(CartJS.settings.weightPrecision);
//     default:
//       return grams.toFixed(CartJS.settings.weightPrecision);
//   }
// };
/**
 * Formats the product variant's weight. The weight unit is set in General Settings.
 * @see https://help.shopify.com/themes/liquid/filters/additional-filters#weightWithUnit
 */
// export const weightWithUnit = (grams) => {
//   return export const weight(grams) + CartJS.settings.weightUnit;
// };
// export const productImageSize = (src, size) => {
//   return CartJS.Utils.getSizedImageUrl(src, size);
// };