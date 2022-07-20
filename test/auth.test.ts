import request from "supertest";
import bcrypt from "bcrypt";

import app from "../src/app";

import {
  closeServer,
  signinData,
  initialSignIn,
  signupData,
  signupWithoutEmail,
} from "./helpers";
import {User} from "../src/api/users/model";

const api = request(app);

beforeEach(async () => {
  await User.deleteMany();
  const newUser = new User(initialSignIn);
  newUser.password = await bcrypt.hash(initialSignIn.password, 10);
  await newUser.save();
});

// test("should have a content-type: application/json in headers", async () => {
//   const {response} = await getAllCategoriesDB();
//   expect(response.headers["content-type"]).toEqual(
//     expect.stringContaining("json"),
//   );
// });
// test("should contain a category 'Laptops' in the response.", async () => {
//   const {contents} = await getAllCategoriesDB();
//   expect(contents).toContain(["Laptops"]);
// });
describe("AUTH", () => {
  describe("POST /auth/signup", () => {
    test("should return a status 400 if email is not at the request.", async () => {
      const response = await api
        .post("/auth/signup")
        .send({...signupWithoutEmail});
      expect(response.status).toBe(400);
    });

    test("should return a status 201 if user has been created succesfully.", async () => {
      const response = await api.post("/auth/signup").send({...signupData});
      expect(response.status).toBe(201);
    });

    test("should return a token in the body response.", async () => {
      const response = await api.post("/auth/signup").send({...signupData});
      expect(response.body.token).toBeDefined();
    });
  });

  describe("POST /auth/signin", () => {
    test("should return a status 400 and error message if email does not exist on the DB.", async () => {
      const wrongEmail = "test2@gmail.com";
      const response = await api
        .post("/auth/signin")
        .send({email: wrongEmail, password: signinData.password});
      expect(response.status).toBe(400);
      expect(response.body.message).toBeDefined();
      expect(response.body.message).toEqual(
        `The user with email: ${wrongEmail} does not exist at the DB.`,
      );
    });

    // test("should return a status 400 and error message if password is not correct.", async () => {
    //   const wrongPassword = "1234567890";
    //   const response = await api
    //     .post("/auth/signin")
    //     .send({email: signinData.email, passoword: wrongPassword});
    //   expect(response.status).toBe(400);
    //   expect(response.body.message).toEqual(
    //     "Email or password are not correct.",
    //   );
    //   expect(response.body.message).toBeDefined();
    // });

    // test("should return a status 400 and error message if password is not correct.", async () => {
    //   const response = await api.post("/auth/signin").send({...signinData});
    //   expect(response.body.token).toBeDefined();
    // });
  });
});

afterAll(async () => {
  await closeServer();
});
