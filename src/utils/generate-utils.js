'use strict';

const CommonUtils = require(`./common-utils`);

const DATE_MOUNT_CORRECTION_NUMBER = 1;
const DATE_FILLING_CORRECTION_CHARACTER = `0`;
const DATE_MIN_CHARACTER = 2;

const formatArticleDate = (date) => {
  const year = date.getFullYear();
  const month = (date.getMonth() + DATE_MOUNT_CORRECTION_NUMBER).toString().padStart(DATE_MIN_CHARACTER, DATE_FILLING_CORRECTION_CHARACTER);
  const day = date.getDate().toString().padStart(DATE_MIN_CHARACTER, DATE_FILLING_CORRECTION_CHARACTER);
  const hour = date.getHours().toString().padStart(DATE_MIN_CHARACTER, DATE_FILLING_CORRECTION_CHARACTER);
  const minutes = date.getMinutes().toString().padStart(DATE_MIN_CHARACTER, DATE_FILLING_CORRECTION_CHARACTER);
  const seconds = date.getSeconds().toString().padStart(DATE_MIN_CHARACTER, DATE_FILLING_CORRECTION_CHARACTER);

  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};

const generateArticleDate = (currentDateTime, maxDateRange) => {
  const dateRange = CommonUtils.getRandomInt(0, maxDateRange);
  const articleDate = new Date(currentDateTime - dateRange);

  return formatArticleDate(articleDate);
};

const GenerateUtils = {
  generateArticleDate,
};

module.exports = GenerateUtils;
