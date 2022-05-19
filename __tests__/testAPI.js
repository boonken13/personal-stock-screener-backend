const request = require("supertest");
const app = require("../app");
const mongoDb = require('../db_modules/dbProperties');

describe("Test the root path", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  afterAll(async() => {
    await mongoDb.disconnect();
  });
});
