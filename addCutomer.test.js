
const puppeteer = require('puppeteer');
let browser;
let page;
let message;


let firstNmae = Math.floor(Math.random() * 150).toString()
let lastName =Math.floor(Math.random() * 150).toString()
let postCode =Math.floor(Math.random() * 150).toString()

describe('add customer', () => {
    beforeAll(async () => {

        browser =await  puppeteer.launch({ headless: false});
        page =await  browser.newPage();
        page.on('dialog', async (dialog) => {
            message = await dialog.message();
            dialog.accept(); 
        });

        await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/login')
        await page.screenshot({ path: 'homePage.png' });    
    })

    afterAll(async () => {
        await browser.close();
    })

    test('login with bank manger login', async () => {
    
        bankMangerLogin = 'div:nth-child(3) > button'
        addCustomer='body > div > div > div.ng-scope > div > div.center > button:nth-child(1)'
        await page.waitForSelector(bankMangerLogin);
        await page.click(bankMangerLogin);
        await page.screenshot({ path: 'managerLogin.png' });
        await page.waitForSelector(addCustomer);
        const currentUrl = await page.url();
        
        expect(currentUrl).toBe("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager");
        
    })

    test('add customer', async () => {
        addCustomer='body > div > div > div.ng-scope > div > div.center > button:nth-child(1)'
        await page.waitForSelector(addCustomer);
        await page.click(addCustomer);
        firstNameTitle ='form > div:nth-child(1) > label'
        firstNameInput ='form > div:nth-child(1) > input'
        lastNameInput ='form > div:nth-child(2) > input'
        postCodeInput="form > div:nth-child(3) > input"
        addCostomerButton="form > button"
        await page.waitForSelector(firstNameTitle);
        await page.type(firstNameInput, firstNmae);
        await page.type(lastNameInput, lastName);
        await page.type(postCodeInput, postCode);
        await page.screenshot({ path: 'input.png' });
        await page.click(addCostomerButton);
        expect(message).toContain('Customer added successfully with customer id ');
    })

    test('check customer added', async () => {

        customerList='body > div > div > div.ng-scope > div > div.center > button:nth-child(3)'
        search='body > div > div > div.ng-scope > div > div.ng-scope > div > form > div > div > input'
    
        await page.waitForSelector(customerList);
        await page.click(customerList);
        await page.waitForSelector(search);
        const currentUrl = await page.url();
        expect(currentUrl).toBe("https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list");
        

        const elementHandles = await page.evaluate(() => {
            const elements = document.querySelectorAll('tr');
            return elements.length;
        });
      
        firstNameC= `table > tbody > tr:nth-child(${elementHandles-1}) > td:nth-child(1)`
        lastNameC= `table > tbody > tr:nth-child(${elementHandles-1}) > td:nth-child(2)`
        postCodeC= `table > tbody > tr:nth-child(${elementHandles-1}) > td:nth-child(3)`
        const textfirstNameC = await page.$eval(firstNameC, (e) => e.textContent);
        const textlastNameC = await page.$eval(lastNameC, (e) => e.textContent);
        const textpostCodeC = await page.$eval(postCodeC, (e) => e.textContent);
        expect(textfirstNameC).toBe(firstNmae);
        expect(textlastNameC).toBe(lastName);
        expect(textpostCodeC).toBe(postCode);

        
    })


})