//allways set to true when new query
const refreshUrls = false;
//the standard format is q=mail+some+business
const query = 'as_epq=immobiliare+milano&as_oq=mail+email+e-mail&filter=0';
const endpoint = 'https://www.google.com/search?';
const googleResultSelector = '.LC20lb';
const outputFolder = 'data';
const urlsOutputFile = 'urls.json';
const emailsOutputFile = 'emails.txt';
const resultsStart = 0;
const resultsEnd = 500;
const resultsPerPage = 100;

module.exports = {
    refreshUrls, 
    query, endpoint,
    googleResultSelector,
    urlsOutputFile, 
    emailsOutputFile, 
    outputFolder, 
    resultsStart, 
    resultsEnd, 
    resultsPerPage
};