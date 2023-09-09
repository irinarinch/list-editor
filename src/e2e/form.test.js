/*
* @jest-environment node
*/

import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('form', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    page = await browser.newPage();
    await page.goto('http://localhost:9000');

    await page.evaluate(() => document.querySelector('.add-button').click());
  });

  afterEach(async () => {
    await browser.close();
  });

  test('should show error if name invalid', async () => {
    await page.type('input[name="name"]', '');

    await page.evaluate(() => document.querySelector('.save-btn').click());

    await page.waitForSelector('.form-error');
  });

  test('should show error if price invalid', async () => {
    await page.type('input[name="name"]', 'phone');
    await page.type('input[name="price"]', '0');

    await page.evaluate(() => document.querySelector('.save-btn').click());

    await page.waitForSelector('.form-error');
  });

  test('should add new product', async () => {
    await page.type('input[name="name"]', 'phone');
    await page.type('input[name="price"]', '10000');

    await page.evaluate(() => document.querySelector('.save-btn').click());

    await page.waitForSelector('.product');
  });

  test('must be completed', async () => {
    await page.type('input[name="name"]', 'phone');
    await page.type('input[name="price"]', '10000');

    await page.evaluate(() => document.querySelector('.save-btn').click());
    await page.evaluate(() => document.querySelector('.edit-btn').click());

    const name = await page.$('input[name="name"]');
    const price = await page.$('input[name="price"]');

    expect(await name.evaluate((node) => node.value)).toBe('phone');
    expect(await price.evaluate((node) => node.value)).toBe('10000');
  });

  test('should edit product', async () => {
    await page.type('input[name="name"]', 'phone');
    await page.type('input[name="price"]', '10000');

    await page.evaluate(() => document.querySelector('.save-btn').click());
    await page.evaluate(() => document.querySelector('.edit-btn').click());

    await page.type('input[name="name"]', ' new');

    await page.evaluate(() => document.querySelector('.save-btn').click());

    const productName = await page.$('.name');
    expect(await productName.evaluate((node) => node.innerText)).toBe('phone new');
  });
});
