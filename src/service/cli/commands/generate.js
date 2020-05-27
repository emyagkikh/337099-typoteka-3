'use strict';

const fs = require(`fs`);

const {ExitCode} = require(`../../../constant`);
const {TITLES, SENTENCES, CATEGORIES} = require(`../data/generate-data`);
const {getRandomInt, shuffleArray} = require(`../../../utils/common-utils`);
const generateArticleDate = require(`../../../utils/generate-utils`);

const GeneratedObjectsCount = Object.freeze({
  MIN: 0,
  MAX: 1000,
  DEFAULT: 1,
});

const ARGV_PARSE_NUMBER_SYSTEM = 10;

const MONTH_AVAILABLE_RANGE = 3;
const currentDateTime = new Date().getTime();
const maxAvailableDayTime = new Date().setMonth(new Date().getMonth() - MONTH_AVAILABLE_RANGE);
const maxAvailableDayTimeRange = currentDateTime - maxAvailableDayTime;

const ANNOUNCE_MIN_SENTENCES_AMOUNT = 1;
const ANNOUNCE_MAX_SENTENCES_AMOUNT = 5;

const FULLTEXT_MIN_SENTENCES_AMOUNT = 1;

const CATEGORY_MIN_ITEMS_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const announceAmountIndex = getRandomInt(ANNOUNCE_MIN_SENTENCES_AMOUNT, ANNOUNCE_MAX_SENTENCES_AMOUNT - 1);
    const fulltextAmountIndex = getRandomInt(FULLTEXT_MIN_SENTENCES_AMOUNT, SENTENCES.length - 1);
    const categoryAmountIndex = getRandomInt(CATEGORY_MIN_ITEMS_AMOUNT, CATEGORIES.length - 1);

    return (
      {
        title: TITLES[getRandomInt(0, TITLES.length - 1)],
        createdDate: generateArticleDate(currentDateTime, maxAvailableDayTimeRange),
        announce: shuffleArray(SENTENCES).slice(0, announceAmountIndex).join(` `),
        fullText: shuffleArray(SENTENCES).slice(0, fulltextAmountIndex).join(` `),
        category: shuffleArray(CATEGORIES).slice(0, categoryAmountIndex),
      }
    );
  })
);

module.exports = {
  name: `--generate`,
  run(args = GeneratedObjectsCount.DEFAULT) {
    const countOffer = Number.parseInt(args, ARGV_PARSE_NUMBER_SYSTEM) || GeneratedObjectsCount.DEFAULT;

    if (countOffer < GeneratedObjectsCount.MIN) {
      console.error(`Нельзя вводить отрицательное число`);
      process.exit(ExitCode.ERROR);
    }

    if (countOffer > GeneratedObjectsCount.MAX) {
      console.error(`Не больше ${GeneratedObjectsCount.MAX} публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.ERROR);
      }

      console.info(`Operation success. File created.`);
    });
  }
};
