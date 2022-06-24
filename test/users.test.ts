import request from "supertest";

import { app } from "../src/index";

describe("Get", () => {
  test("get all users from DB", () => {
    request(app)
      .get("/api/users")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });
});
