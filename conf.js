const useLastUrlsFile = false;
const query = 'mail immobiliare milano';
const endpoint = 'https://www.google.com/search';
const queryParam = 'q';
const startParam = 'start';
const googleResultSelector = '.LC20lb';
const urlsOutputFile = 'scraped-urls.json';
const emailsOutputFile = 'scraped-emails.txt';
const resultsStart = 500;
const resultsEnd = 1000;
const resultsPerPage = 10;

module.exports = {useLastUrlsFile, query, endpoint, queryParam, startParam, googleResultSelector, urlsOutputFile, emailsOutputFile, resultsStart, resultsEnd, resultsPerPage};