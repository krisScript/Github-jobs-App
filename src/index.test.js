import puppeteer from 'puppeteer';
describe('index', () => {
  let page;
  let testData;
  beforeAll(async () => {
    jest.setTimeout(30000);
    const browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
      args: ['--windows-size=1920,1080']
    });
    testData = [
      {
        title: 'front end dev',
        location: 'london',
        type: 'fulltime',
        url: 'https://fakeadress1223123123.com',
        created_at: '2018'
      }
    ];
    page = await browser.newPage();
    await page.goto('http://localhost:1234/');
    await page.setRequestInterception(true);
    await page.on('request', request => {
      request.respond({
        content: 'application/json',
        headers: { 'Access-Control-Allow-Origin': '*' },
        body: JSON.stringify(testData)
      });
    });
  });
  afterAll(() => {
    browser.close();
  });
  it('should have title "Fonoapi app"', async () => {
    const title = await page.title();
    expect(title).toMatch('Github jobs');
  });
  describe('searching for job', () => {
    const job = {
      description: 'front end dev',
      location: 'london'
    };
    let jobCard;
    beforeAll(async () => {
      await page.waitForSelector('#search-form');
      await page.type('input[name=description]', job.description);
      await page.type('input[name=location]', job.location);
      await page.click('input[name=fulltime]');
      await page.$eval('#submit-btn', btn => btn.click());
      jobCard = await page.waitForSelector('.card');
    });
    it('element with class jobCard should exist', () => {
      expect(jobCard).toBeTruthy();
    });
  });
});
