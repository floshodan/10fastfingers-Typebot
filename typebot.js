const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    await page.goto('https://10fastfingers.com/typing-test/german');

     const login = await page.evaluate(() => {
         return Array.from(document.querySelectorAll('#row1 > span'));
     });


    const data = await page.evaluate(() => {
        const words = Array.from(document.querySelectorAll('#row1 > span'));
        console.log(words);
        return words.map(span => {
            let word = span.innerText;
            return word;
        });
    });

    const values = Object.values(data);
    console.log(values);

    for (const value of values){
        console.log(value);
        await page.type('#inputfield', value+ " ");
    }



    // for(let i=0; i>= words.length; i++){
    //     page.type('#inputfield', words[i]+" ");
    // }
})();
