const request = require("supertest");
const app = require("../app");
const mongoDb = require('../db_modules/dbProperties');
const redisClient = require('../db_modules/dbRedis');

describe("Test the rest api without token", () => {
  test("It should response the GET method", () => {
    return request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
      });
  });

  test("It should response the GET profile without sign in", () => {
    return request(app)
      .get("/profile/1")
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  test("It should response the post profile update without sign in", () => {
    let body = {
      email: "random@hotmail.com"
    }
    return request(app)
      .post("/profile/1")
      .set('Accept', 'application/json')
      .send(body)
      .then((response) => {
        expect(response.statusCode).toBe(401);
      });
  });

  afterAll(async () => {
    await mongoDb.disconnect();
    await redisClient.disconnect();
  });
});
