const request = require("supertest");
const app = require("../app");
const mongoDb = require('../db_modules/dbProperties');
const redisClient = require('../db_modules/dbRedis');

describe("Test the rest api with token", () => {
    let token = "";
    let userId = "";
  
  
    beforeAll(() => {
      let registerBody = {
        email: "sss",
        password: "sss",
        firstName: "sss",
        lastName: "sss"
      };
      let body = {
        email: "sss",
        password: "sss"
      };
      return request(app)
        .post("/register")
        .set('Accept', 'application/json')
        .send(registerBody)
        .then(() => {
          return request(app)
            .post("/signin")
            .set('Accept', 'application/json')
            .send(body)
            .then((response) => {
              token = response._body.token;
              userId = response._body.userId;
            });
        });
    });
  
    test("It should response the GET profile with sign in", () => {
      return request(app)
        .get("/profile/1")
        .set('authorization', `Bearer ${token}`)
        .then((response) => {
          expect(response.statusCode).toBe(200);
        });
    });
  
    // test("It should response the post profile update without sign in", () => {
    //   let body = {
    //     email: "random@hotmail.com"
    //   }
    //   return request(app)
    //     .post("/profile/1")
    //     .set('Accept', 'application/json')
    //     .send(body)
    //     .then((response) => {
    //       expect(response.statusCode).toBe(401);
    //     });
    // });
  
    afterAll(async () => {
      await mongoDb.disconnect();
      await redisClient.disconnect();
    });
  });