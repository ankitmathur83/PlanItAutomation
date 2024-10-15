import {test, page, expect} from '@playwright/test'
import { assert, clear } from 'console';
import { title } from 'process';

test.beforeEach('Open Browser and reach to the search jobs Page', async ({page}) => {
    await page.goto('https://www.planit.com/au/careers')
    await expect(page).toHaveTitle("Planit - Careers")
    await page.locator("#p_lt_ctl03_pageplaceholder_p_lt_ctl00_BannerTall_btn_bookNow").click();
    await page.getByRole("link", {name: "Search Jobs", exact: true}).click();
    await expect(page).toHaveTitle("Planit Careers");
})

test('Search Open positions using Location Text Field', async({page}) => {
    await page.waitForTimeout(500);
    await page.getByPlaceholder('City, state, country').pressSequentially("Perth",{ delay: 75 });
    await page.getByPlaceholder('City, state, country').press("ArrowDown");
    await page.getByPlaceholder('City, state, country').press("Enter");
    await page.getByLabel('Search for Jobs').click();
    await page.waitForTimeout(1000);
    const howManyPositions = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    expect(howManyPositions.split(" ")[0]).toBe("3");
})

test('Apply for job Quality Engineering Manager from the list of jobs', async({page}) => {
    await page.getByPlaceholder('City, state, country').pressSequentially("Perth",{ delay: 50 });
    await page.waitForTimeout(500);
    await page.getByPlaceholder('City, state, country').press("ArrowDown");
    await page.getByPlaceholder('City, state, country').press("Enter");
    await page.getByLabel('Search for Jobs').click();
    await page.waitForTimeout(500);
    // const listOfJobs = console.log(await page.$$('.job-tile__title'))
    // console.log(listOfJobs)
    const locatorJobtitle = await page.locator('.job-tile__title') //.job-tile__header-container
    const locatorlistJobitems = await page.locator(".search-results.job-tile.job-list-item");
    //console.log(locatorJobsList)
    const jobTitle = await page.locator('.job-tile__title').allTextContents();
    console.log(jobTitle);
    await expect(jobTitle).toContain("Quality Engineering Manager - Perth");
    //await page.getByLabel('Quality Engineering Manager - Perth Locations Perth, Australia Posting Dates02/10/2024 We are seeking a Test Manager to join our team in Perth on a permanent full role.', { exact: true }).click();

})


test('Search using role in the Search field', async({page}) => {
    await page.locator("#keyword").fill("Manager");
    await page.getByTitle("Search for Jobs").click();
    await page.waitForTimeout(1000);
    const howManyPositions = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    await expect(howManyPositions.split(" ")[0]).toBe("18");
})

test('Search Dropdown for the location of the test case', async({page})=> {
    await page.locator(".search-filters__pill-title").getByText("Locations").click();
    await page.waitForTimeout(500)
    await page.locator(".search-facet-dropdown__list-input").pressSequentially("Australia", {delay: 500});
    await page.locator(".search-facet-dropdown__list-input").press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(2000)
    const howManyPositions = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    await expect(howManyPositions.split(" ")[0]).toBe("5");
})

test('Search using dropdown JobFunction and select role Consulting', async({page}) => {
    await page.locator(".search-filters__pill-title").getByText("Job Functions").click();
    await page.waitForSelector(".search-filters__pill-title")
    await page.getByRole("button", {name: "Consulting filter"}).click();
    await page.waitForTimeout(1000)
    const howManyPositions = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    await expect(howManyPositions.split(" ")[0]).toBe("19");
})

test('Validate Clear Filter link', async({page}) => {
    await page.locator(".search-filters__pill-title").getByText("Job Functions").click();
    await page.waitForSelector(".search-filters__pill-title")
    await page.getByRole("button", {name: "Consulting filter"}).click();
    await page.waitForTimeout(1000)
    const howManyPositions = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    await expect(howManyPositions.split(" ")[0]).toBe("19");
    await page.getByRole("button", {name: "Clear Filters", exact: true}).click();
    await page.waitForTimeout(1000)
    const howManyPositionsAfterReset = await page.locator('.search-filters--horizontal').getByText('Open Jobs').textContent();
    await expect(howManyPositionsAfterReset.split(" ")[0]).toBe("22");
}) 

test('Search jobs by Posting Date', async({page}) => {
    await page.locator(".search-filters__pill-title").getByText("Posting Dates").click();
    await page.waitForSelector(".search-filters__pill-title")
    await page.getByRole("button", {name: "Less than 7 days filter"}).click();
    await page.waitForTimeout(500)
    const howManyPositions = await page.locator('.search-filters__counter').textContent();
    await expect(howManyPositions.split(" ")[0]).toBe("1");
}) 

test('Upload Resume on the website', async({page})=> {
    await page.getByRole("textbox", {name: "Upload or drag and drop your resume"}).setInputFiles('sql-injection-scan-sample-report.pdf');
    await page.waitForSelector(".recommended-jobs-widget-success-banner");
    const textAfterUpload = await page.locator('.recommended-jobs-widget-success-banner').textContent();
    const textToMatch = "Congratulations, . The following jobs have been recommended based on the uploaded file."
    expect(textAfterUpload).toContain(textToMatch);
})

