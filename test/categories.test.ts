import {Category} from "../src/api/categories/model";

import {getAllCategoriesDB, initialCategories, serverOut} from "./helpers";

beforeEach(async () => {
  await Category.deleteMany();
  initialCategories.forEach(async category => {
    const categoryObj = new Category(category);
    await categoryObj.save();
  });
});

describe("GET: /api/categories", () => {
  test("should return a response with status 200", async () => {
    const {response} = await getAllCategoriesDB();
    expect(response.status).toBe(200);
  });
  test("should contain a category 'Laptops' in the response.", async () => {
    const {contents} = await getAllCategoriesDB();
    expect(contents).toContain("Laptops");
  });
  test("should have a content-type: application/json in headers", async () => {
    const {response} = await getAllCategoriesDB();
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json"),
    );
  });
});

afterAll(done => {
  serverOut();
  done();
});
