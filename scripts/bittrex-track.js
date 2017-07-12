// Polyfill Promise with Bluebird Promise
global.Promise = require("bluebird");

const forEach = require("lodash/forEach");
const Deque = require("double-ended-queue");
const winston = require("winston");
const minimist = require("minimist");

const { getMarketSummaries } = require("../src/bittrex/ApiPublic");
const { sleep } = require("../src/utils");

const argv = minimist(process.argv.slice(2));
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp() {
        return new Date().toLocaleString();
      },
      colorize: true,
    }),
    new winston.transports.File({
      filename: `logs/bittrex-track-${new Date().toLocaleString()}.log`,
      json: false,
      timestamp() {
        return new Date().toLocaleString();
      },
    }),
  ],
  exitOnError: false,
});

async function track(isSingleFind = false, rate = 1.15, dequeMaxLength = 7) {
  logger.info(
    `Start tracking with rate ${rate} and deque length at ${dequeMaxLength}`,
  );

  let iteration = 0;
  const deque = new Deque();
  const potentialMarkets = {};
  let potentialMarketSummaries;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // Create map of summaries
    const summaries = await getMarketSummaries();
    const summariesMap = summaries.reduce((map, summary) => {
      const { MarketName: market } = summary;
      if (market.startsWith("BTC")) {
        map[market] = summary;
      }
      return map;
    }, {});

    // Condition checking
    const length = deque.length;
    forEach(summariesMap, (summary, market) => {
      if (potentialMarkets[market] == null) {
        for (let i = 0; i < length; i++) {
          const oldSummary = deque.get(i)[market];
          if (oldSummary != null) {
            if (
              summary.Last > oldSummary.LastWithRate ||
              summary.Bid > oldSummary.BidWithRate ||
              summary.Ask > oldSummary.AskWithRate
            ) {
              logger.info(
                `Iteration ${iteration} - Index: ${i}\n` +
                  JSON.stringify(summary, null, 2) +
                  "\n" +
                  JSON.stringify(oldSummary, null, 2),
              );
              logger.info(`POTENTIAL MARKET: ${market}`);
              potentialMarkets[market] = dequeMaxLength + 1;
              if (isSingleFind) {
                potentialMarketSummaries = { summary, oldSummary };
                return false;
              }
              break;
            }
          }
        }
      } else {
        potentialMarkets[market]--;
        if (potentialMarkets[market] === 0) {
          delete potentialMarkets[market];
        }
      }

      summary.LastWithRate = summary.Last * rate;
      summary.BidWithRate = summary.Bid * rate;
      summary.AskWithRate = summary.Ask * rate;
    });

    if (isSingleFind) {
      if (potentialMarketSummaries != null) {
        return potentialMarketSummaries;
      }
    }

    // Update Deque
    deque.push(summariesMap);
    if (length === dequeMaxLength) {
      deque.shift();
    }

    // Mark Iteration
    if (++iteration % 500 === 0) {
      logger.info(`Iteration ${iteration}`);
    }
    await sleep(1000);
  }
}

// Run program
if (argv.track) {
  track();
}

module.exports = track;
