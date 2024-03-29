// Fetch private configurations
let config;
try {
  config = require("./config");
} catch (err) {
  console.log("ERROR: No config found");
  config = {};
}

const {
  BITTREX_API_KEY,
  BITTREX_API_SECRET,
  YOBIT_API_KEY,
  YOBIT_API_SECRET,
} = config;

// Bittrex URLs
const BITTREX_API_URL = "https://bittrex.com/api/v1.1";

const BITTREX_GET_MARKET_TICKER_URL = `${BITTREX_API_URL}/public/getticker/`;
const BITTREX_GET_ORDER_BOOK_URL = `${BITTREX_API_URL}/public/getorderbook/`;
const BITTREX_GET_MARKET_SUMMARY_URL = `${BITTREX_API_URL}/public/getmarketsummary/`;
const BITTREX_GET_MARKET_SUMMARIES_URL = `${BITTREX_API_URL}/public/getmarketsummaries/`;

const BITTREX_GET_BALANCE_URL = `${BITTREX_API_URL}/account/getbalance/`;
const BITTREX_GET_ORDER_URL = `${BITTREX_API_URL}/account/getorder/`;
const BITTREX_GET_ORDERS_HISTORY_URL = `${BITTREX_API_URL}/account/getorderhistory/`;

const BITTREX_BUY_LIMIT_ORDER_URL = `${BITTREX_API_URL}/market/buylimit/`;
const BITTREX_SELL_LIMIT_ORDER_URL = `${BITTREX_API_URL}/market/selllimit/`;
const BITTREX_CANCEL_ORDER_URL = `${BITTREX_API_URL}/market/cancel/`;
const BITTREX_GET_OPEN_ORDERS_URL = `${BITTREX_API_URL}/market/getopenorders/`;

// Yobit URLs
const YOBIT_PUBLIC_API_URL = "https://yobit.net/api";
const YOBIT_TRADE_API_URL = "https://yobit.net/tapi";

const YOBIT_GET_MARKET_DEPTH_URL = `${YOBIT_PUBLIC_API_URL}/3/depth/`;
const YOBIT_GET_MARKET_TICKER_URL = `${YOBIT_PUBLIC_API_URL}/3/ticker/`;
const YOBIT_GET_MARKET_TRADES_URL = `${YOBIT_PUBLIC_API_URL}/3/trades/`;
const YOBIT_GET_EXCHANGE_INFO = `${YOBIT_PUBLIC_API_URL}/3/info/`;

module.exports = {
  // Bittrex API Keys
  BITTREX_API_KEY,
  BITTREX_API_SECRET,

  // Yobit API Keys
  YOBIT_API_KEY,
  YOBIT_API_SECRET,

  // Bittrex URLs
  BITTREX_API_URL,

  BITTREX_GET_MARKET_TICKER_URL,
  BITTREX_GET_ORDER_BOOK_URL,
  BITTREX_GET_MARKET_SUMMARY_URL,
  BITTREX_GET_MARKET_SUMMARIES_URL,

  BITTREX_GET_BALANCE_URL,
  BITTREX_GET_ORDER_URL,
  BITTREX_GET_ORDERS_HISTORY_URL,

  BITTREX_BUY_LIMIT_ORDER_URL,
  BITTREX_SELL_LIMIT_ORDER_URL,
  BITTREX_CANCEL_ORDER_URL,
  BITTREX_GET_OPEN_ORDERS_URL,

  // Yobit URLs
  YOBIT_GET_MARKET_DEPTH_URL,
  YOBIT_GET_MARKET_TICKER_URL,
  YOBIT_GET_MARKET_TRADES_URL,
  YOBIT_GET_EXCHANGE_INFO,

  YOBIT_TRADE_API_URL,

  // Market Constants
  CURRENCY_BITCOIN: "BTC",
  CURRENCY_PRECISION: 8,
  BITTREX_COMMISSION_RATE: 0.0025,
  YOBIT_COMMISSION_RATE: 0.002,
  EPSILON: 0.0000000001,
};
