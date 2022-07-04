import {v4} from "uuid";
import request from "supertest";

import {Product} from "../src/api/products/model";

import app from "../src/app";
import {getAllProductsDB, initialProducts, serverOut} from "./helpers";

const api = request(app);
beforeEach(async () => {
  await Product.deleteMany();
  initialProducts.forEach(async product => {
    const productObj = new Product(product);
    productObj.product_id = v4();
    await productObj.save();
  });
});

describe("GET: /api/products", () => {
  test("should return a status 200", async () => {
    const {response} = await getAllProductsDB();
    expect(response.status).toBe(200);
  });
  test("should contain a product 'IRB 1600' in the response.", async () => {
    const {contents} = await getAllProductsDB();
    expect(contents).toContain("IRB 1600");
  });
  test("should have a content-type: application/json in headers", async () => {
    const response = await api.get("/api/products");
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json"),
    );
  });
});

afterAll(done => {
  serverOut();
  done();
});
