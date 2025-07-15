Scripts injected into the page using Playwright to manipulate the DOM, clean up, or extract data.
These scripts are intended for use exclusively in the browser context.
This is why we use globalThis to export all functions, making them accessible to the page loaded by Playwright.
