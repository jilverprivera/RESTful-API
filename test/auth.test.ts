import request from "supertest";
import bcrypt from "bcrypt";

import app from "../src/app";

import {serverOut, signinData, initialSignupData, signupData} from "./helpers";
import {User} from "../src/api/users/model";

const api = request(app);

beforeEach(async () => {
  await User.deleteMany();
  const newUser = new User(initialSignupData);
  newUser.password = await bcrypt.hash(initialSignupData.password, 10);
  await newUser.save();
});

describe("POST /auth/signin", () => {
  test("should return a status 200 if user data is correct.", async () => {
    const response = await api.post("/auth/signin").send(signinData);
    expect(response.status).toBe(200);
  });
  test("should return a token in the body response.", async () => {
    const response = await api.post("/auth/signin").send(signinData);
    expect(response.body.token).toBeDefined();
  });

  test("should return a status 400 if email is not valid.", async () => {
    const response = await api
      .post("/auth/signin")
      .send({email: "test3@gmail.com", password: "123456789"});
    expect(response.status).toBe(400);
  });
  test("should return a status 400 if password is not valid.", async () => {
    const response = await api
      .post("/auth/signin")
      .send({email: "test1@gmail.com", password: "1234567890"});
    expect(response.status).toBe(400);
  });
});

describe("POST /auth/signup", () => {
  test("Should return a status 201.", async () => {
    const response = await api.post("/auth/signup").send(signupData);
    expect(response.status).toBe(201);
  });
  test("Should return a user data with name and email in the body response.", async () => {
    const response = await api.post("/auth/signup").send(signupData);
    expect(response.body.user).toBeDefined();
    expect(response.body.user.name).toContain(signupData.name);
    expect(response.body.user.email).toContain(signupData.email);
  });

  test("Should return a user token in the body response.", async () => {
    const response = await api.post("/auth/signup").send(signupData);
    expect(response.body.token).toBeDefined();
  });
});

afterAll(done => {
  serverOut();
  done();
});
