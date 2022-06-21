const conf = require('./conf');
const fs = require('fs');
const puppeteer = require('puppeteer');
const extractEmails = require('extract-emails');

(async function main() {
    const urls = [];
    if(useLastUrlsFile){
        urls = JSON.parse(fs.readFileSync(conf.urlsOutputFile));
    } else {
        urls = await getUrls();
        fs.writeFileSync(conf.urlsOutputFile, JSON.stringify(urls));
    }
    await getEmails(urls);
})();

async function getUrls() {
    let urls = [];
    const browser = await puppeteer.launch();
    const totalPages = conf.resultsEnd / conf.resultsPerPage;
    
    for(let i = 0; i < totalPages; i++){
        const page = await browser.newPage();
        const query = conf.endpoint 
        + '?' + conf.queryParam + '=' + conf.query.replaceAll(' ', '+')
        + '&' + conf.startParam + '=' + String(i * conf.resultsPerPage + conf.resultsStart);
        
        await page.goto(query, {waitUntil: 'networkidle2'})
        .then(() => {
            console.log(`parsed page: ${i}`);
        })
        .catch((res) => {
            console.log(`failed page: ${i}\nresponse: ${res}`);
        });

        const hrefs = await page.evaluate( () => {
            console.log('test');
            let hrefs = [];
            const nodeList = document.querySelectorAll('.LC20lb');
            for(const key in nodeList){
                const parent = nodeList[key].parentNode;
                if(typeof(parent) !== 'undefined' && typeof(parent.href) !== 'undefined'){
                    const href = parent.href;
                    hrefs.push(href);
                }
            }
            return hrefs;
        });

        for(const url of hrefs) {
            urls.push(url)
        }
    }

    await browser.close();
    return urls;
}

async function getEmails(urls){
    const stream = fs.createWriteStream(conf.emailsOutputFile, {flags:'a'});
    const browser = await puppeteer.launch();
    for(const url of urls){
        let page = await browser.newPage();
        
        await page.goto(url, {waitUntil: 'networkidle2'}).then(() => {
            console.log(`parsed url: ${url}`)
        }).catch((res) => {
            console.log(`failed url: ${url}\nresponse: ${res}`)
        });

        const emails = await page.evaluate( () => {
            let hrefs = [];
            const nodeList = document.querySelectorAll('a[href^="mailto:"]');
            for(const key in nodeList){
                let href = nodeList[key].href;
                if(typeof(href) !== 'undefined'){
                    hrefs.push(href);
                }
            }
            return hrefs;
        });

        for(const mail of emails) {
            if(typeof(mail) === 'string'){
                let extracted = String(extractEmails(mail));
                if(extracted !== ''){
                    let string = extracted + ', ';
                    stream.write(string);
                }
            }
        }

        await page.close();
    }

    stream.end();
    await browser.close();
}