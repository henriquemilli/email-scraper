const useLastUrlsFile = false;
const query = 'as_q=immobiliare+&as_epq=milano&as_oq=mail+email+e-mail&num100';
const endpoint = 'https://www.google.com/search?';
const queryParam = 'q';
const startParam = 'start';
const googleResultSelector = '.LC20lb';
const urlsOutputFile = 'scraped-urls.json';
const emailsOutputFile = 'scraped-emails.txt';
const resultsStart = 0;
const resultsEnd = 500;
const resultsPerPage = 100;

module.exports = {useLastUrlsFile, query, endpoint, queryParam, startParam, googleResultSelector, urlsOutputFile, emailsOutputFile, resultsStart, resultsEnd, resultsPerPage};