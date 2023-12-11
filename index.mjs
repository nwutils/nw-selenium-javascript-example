import { equal } from 'node:assert';
import { after, before, describe, test } from 'node:test';
import process from 'node:process';

import { findpath } from 'nw';
import selenium from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';

describe('NW.js Selenium test suite example', async () => {
    let driver = undefined;

    /**
     * Setup Selenium driver.
     */
    before(async () => {
        // Initialise Chrome options
        const options = new chrome.Options();

        const seleniumArguments = [
            // File path to NW.js project (requires a
            // package.json for an NW.js project).
            // In this example, we assume the current
            // working directory (cwd) to be the project root.
            'nwapp=' + process.cwd()
        ];

        // Run in headless mode when in CI environment.
        if (process.env.CI) {
            seleniumArguments.push('headless=new');
        }

        options.addArguments(seleniumArguments);

        // Pass file path of NW.js ChromeDriver to ServiceBuilder
        const service = new chrome.ServiceBuilder(findpath('chromedriver')).build();

        // Create a new session using the Chromium options
        // and DriverService defined above.
        driver = chrome.Driver.createSession(options, service);
    });

    /**
     * Get text via element's ID and assert it is equal.
     */
    test('Hello, World text by ID', async () => {
        const textElement = await driver.findElement(selenium.By.id('test'));

        const text = await textElement.getText();

        equal(text, 'Hello, World!');
    });

    test('NW.js flavor is printed in the DOM', async () => {
        const textElement = await driver.findElement(selenium.By.id('flavor'));

        const text = await textElement.getText();

        equal(text, 'sdk');
    });

    /**
     * Quit Selenium driver.
     */
    after(() => {
        driver.quit();
    });
});
