# 🍽️ html-recipee-to-markdown
[![CI](https://github.com/dorianrod/html-recipee-to-markdown/actions/workflows/ci.yml/badge.svg)](https://github.com/dorianrod/html-recipee-to-markdown/actions/workflows/ci.yml)
[![CD](https://github.com/dorianrod/html-recipee-to-markdown/actions/workflows/cd.yml/badge.svg)](https://github.com/dorianrod/html-recipee-to-markdown/actions/workflows/cd.yml)
[![Docker Image Size](https://img.shields.io/docker/image-size/dorianrod/html-recipee-to-markdown)](https://github.com/users/dorianrod/packages/container/package/html-recipee-to-markdown)

A lightweight API service that extracts structured **Markdown content** from any recipe webpage — removing ads, comments, menus, newsletter boxes, and keeping **only the essential recipe information**.

This project is part of a broader ecosystem designed to power a recipe bot (importing, organizing, and storing cooking recipes from various sources).

## 🔍 What it does

Given the URL of a recipe page, the service fetches and parses the HTML using [Playwright](https://playwright.dev/), cleans the page from non-essential elements using a set of custom DOM heuristics, and returns the **title**, **thumbnail**, and **main content** as clean Markdown.

✅ Works with virtually **any cooking website**.  
✅ Headless browser rendering via Chromium.  
✅ Ideal for clean storage or downstream processing.


## ⚡ Quickstart (API usage)

**Endpoint:**

`GET /url-to-markdown?url={RECIPE_URL}`

**Example:**

`http
GET http://localhost:3000/url-to-markdown?url=https://www.marmiton.org/recettes/recette_bo-bun-vietnam_26967.aspx`


**Response:**


```json
{   
"title": "Bo Bun (Vietnam)",   
"thumbnail": "https://assets.afcdn.com/recipe/20180504/79026_w1024h768c1cx3000cy2000.jpg",   
"content": "## Bo Bun (Vietnam)\n4.7/5\n+ 11\n35 min\n●\nfacile\n●\nbon marché\nIngré..."
}
```


## 🧠 How it works

This project uses [Playwright](https://playwright.dev/) to render the recipe page and run cleaning scripts inside the browser. DOM-based filters remove unneeded content.
For instance, the service loads the page in a headless browser and removes ads, comments, and other noise before converting to markdown.

## 🚀 Run with Docker

You can run the service directly using the latest Docker image:

`docker run --rm -p 3000:3000 ghcr.io/dorianrod/html-recipee-to-markdown:latest`

Then call the API at [http://localhost:3000/url-to-markdown?url={recipee_url}](http://localhost:3000/url-to-markdown?url={recipee_url}).


## 🧪 Local development

1. Install dependencies:
`yarn install`

2. Start the API:
`yarn start`


## 🏗 Build configuration without docker

1. Install dependencies:
`yarn install`

2. Build the project:
`yarn build`

3. Start the API (without Docker):
`yarn start:prod`

## 🐳 Run with docker locally

1. Build image:
`docker build -t html-recipee-to-markdown .`

2. Run image
`docker run -p 3000:3000 html-recipee-to-markdown`


## 📦 Available scripts

| Command           | Description                  |
| ----------------- | ---------------------------- |
| `yarn build`      | Build the TypeScript source  |
| `yarn start`      | Start the server in dev mode |
| `yarn start:prod` | Start built server (dist)    |
| `yarn test`       | Run all Jest tests           |
| `yarn lint`       | Run ESLint                   |
| `yarn format`     | Check Prettier formatting    |
| `yarn clean`      | Remove `dist/` folder        |


## 🛠 Tech Stack

-   **TypeScript**
-   **Node.js**
-   **Playwright**
-   **tsup** for bundling
-   **Jest** for testing
-   **ESLint & Prettier** for code quality
