const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
const { execAsync, delay } = require("./helpers");
const data = require("./server/data.json");

describe("Fetcher library tests", () => {
  beforeAll(async () => {
    console.log("installing dependencies and starting servers for web (5173) & api (3000)...");
    process.chdir("tests");

    process.chdir("web");
    await execAsync("yarn install");
    execAsync("yarn dev");
    process.chdir("..");

    process.chdir("server");
    await execAsync("yarn install");
    execAsync("node server.js");
    process.chdir("..");
  }, 30000);

  afterAll(async () => {
    console.log("killing ports 3000 & 5173...");
    await execAsync("npx kill-port 3000 5173");
  }, 30000);

  it("renders and compares raw JSON data", async () => {
    await delay(1000);

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.goto("http://localhost:5173");

    await delay(500);

    const content = await page.content();

    let $ = cheerio.load(content);

    const allDinosText = $("#allDinos").text();
    JSON.parse(allDinosText);
    expect(allDinosText).toEqual(JSON.stringify(data));

    const singleDinoText = $("#singleDino").text();
    JSON.parse(singleDinoText);
    expect(singleDinoText).toEqual(JSON.stringify(data[0]));

    const paginatedDinosText = $("#paginatedDinos").text();
    JSON.parse(paginatedDinosText);
    expect(paginatedDinosText).toEqual(JSON.stringify(data.slice(0, 10)));

    await page.click("#createDinoBtn");
    await delay(500);
    const createdDinoData = {
      name: "Aardonyx",
      description: "New dino description",
    };
    data.push(createdDinoData);

    $ = cheerio.load(await page.content());

    const createDinoText = $("#createdDino").text();
    JSON.parse(createDinoText);
    expect(createDinoText).toEqual(JSON.stringify(createdDinoData));

    await page.click("#deleteDinoBtn");
    await delay(500);

    let deletedDinoData;

    const dinoName = "aardonyx";
    const dinoIndex = data.findIndex((dino) => dino.name.toLowerCase() === dinoName.toLowerCase());
    if (dinoIndex !== -1) {
      deletedDinoData = data.splice(dinoIndex, 1)[0];
    }

    $ = cheerio.load(await page.content());

    const deleteDinoText = $("#deletedDino").text();
    JSON.parse(deleteDinoText);
    expect(deleteDinoText).toEqual(JSON.stringify(deletedDinoData));
  }, 50000);
});
