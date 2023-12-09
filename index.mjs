import { equal } from "node:assert";
import { after, before, describe, it } from "node:test";
import process from "node:process";

import { findpath } from "nw";
import selenium from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome.js";

describe("NW.js Selenium test suite example", async () => {
    let driver = undefined;

    /**
     * Setup Selenium driver.
     */
    before(async () => {
        // Initialise Chrome options
        const options = new chrome.Options();

        options.addArguments([
            // File path to NW.js project.
            // Requires a package.json and index.html.
            // In this example, we assume the present
            // working directory to be the project root. 
            `nwapp=${process.cwd()}`,
            // Good if you want to run automated tests
            // in a CI environment. Unset if running locally.
            "headless=new",
        ]);

        // Pass file path of NW.js ChromeDriver to ServiceBuilder
        const service = new chrome.ServiceBuilder(findpath("chromedriver")).build();

        // Create a new session using the Chromium options
        // and DriverService defined above.
        driver = chrome.Driver.createSession(options, service);
    });

    /**
     * Get text via element's id and assert it is equal.
     */
    it("finds 'Hello, World!' text by ID ", async () => {
        const textElement = await driver.findElement(selenium.By.id("test"));

        const text = await textElement.getText();

        equal(text, "Hello, World!");
    });

    /**
     * Quit Selenium driver.
     */
    after(() => {
        driver.quit();
    });

});