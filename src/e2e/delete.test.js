/*
* @jest-environment node
*/

import puppeteer from 'puppeteer';

jest.setTimeout(30000);

describe('actions', () => {
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

    await page.type('input[name="name"]', 'phone');
    await page.type('input[name="price"]', '1000');

    await page.evaluate(() => document.querySelector('.save-btn').click());
  });

  afterEach(async () => {
    await browser.close();
  });

  test('should delete product', async () => {
    await page.evaluate(() => document.querySelector('.remove-btn').click());
    await page.evaluate(() => document.querySelector('.swal-button--danger').click());

    await page.waitForSelector('.swal-icon--success');
  });

  test('should cancel product deletion', async () => {
    await page.evaluate(() => document.querySelector('.remove-btn').click());
    await page.evaluate(() => document.querySelector('.swal-button--cancel').click());

    const swalText = await page.$('.swal-text');
    expect(await swalText.evaluate((node) => node.innerText)).toBe('Товар не был удален!');
  });
});
