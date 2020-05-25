'use strict';

const fs = require(`fs`);

const GenerateData = require(`../data/generate-data`);
const CommonUtils = require(`../../../utils/common-utils`);
const GenerateUtils = require(`../../../utils/generate-utils`);

const GeneratedObjectsCount = Object.freeze({
  DEFAULT: 1,
  MAX: 1000,
});

const ARGV_PARSE_NUMBER_SYSTEM = 10;

const ANNOUNCE_MIN_SENTENCES_AMOUNT = 1;
const ANNOUNCE_MAX_SENTENCES_AMOUNT = 5;

const MONTH_AVAILABLE_RANGE = 3;
const CURRENT_DATE_TIME = new Date().getTime();
const MAX_AVAILABLE_DATE_TIME = new Date().setMonth(new Date().getMonth() - MONTH_AVAILABLE_RANGE);
const MAX_AVAILABLE_DATE_TIME_RANGE = CURRENT_DATE_TIME - MAX_AVAILABLE_DATE_TIME;

const CATEGORY_MIN_ITEMS_AMOUNT = 1;
const FILE_NAME = `mocks.json`;

const generateOffers = (count) => (
  Array(count).fill({}).map(() => {
    const ANNOUNCE_AMOUNT_INDEX = CommonUtils.getRandomInt(ANNOUNCE_MIN_SENTENCES_AMOUNT, ANNOUNCE_MAX_SENTENCES_AMOUNT - 1);
    const FULLTEXT_AMOUNT_INDEX = CommonUtils.getRandomInt(1, GenerateData.SENTENCES.length - 1);
    const CATEGORY_AMOUNT_INDEX = CommonUtils.getRandomInt(CATEGORY_MIN_ITEMS_AMOUNT, GenerateData.CATEGORIES.length - 1);

    return (
      {
        title: GenerateData.TITLES[CommonUtils.getRandomInt(0, GenerateData.TITLES.length - 1)],
        announce: CommonUtils.shuffleArray(GenerateData.SENTENCES).slice(0, ANNOUNCE_AMOUNT_INDEX).join(` `),
        fullText: CommonUtils.shuffleArray(GenerateData.SENTENCES).slice(0, FULLTEXT_AMOUNT_INDEX).join(` `),
        createdDate: GenerateUtils.generateArticleDate(CURRENT_DATE_TIME, MAX_AVAILABLE_DATE_TIME_RANGE),
        category: CommonUtils.shuffleArray(GenerateData.CATEGORIES).slice(0, CATEGORY_AMOUNT_INDEX),
      }
    );
  })
);

module.exports = {
  name: `--generate`,
  run(args = GeneratedObjectsCount.DEFAULT) {
    let countOffer = Number.parseInt(args, ARGV_PARSE_NUMBER_SYSTEM);

    if (countOffer > GeneratedObjectsCount.MAX) {
      console.error(`Не больше ${GeneratedObjectsCount.MAX} публикаций`);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
      }

      console.info(`Operation success. File created.`);
    });
  }
};
