import { list } from "../model";

it("works", () => {
  expect(typeof list()).toBe("object");
});

// it("all names are on resources list", () => {
//   const resources = list().resources.map(r => r.Name);
//   const craftables = list().craftables
// //   console.log(resources);
//   const ref = list().refiner;
//   ref.forEach(recipe => {
//     const resultName = recipe.result.name;
//     console.log(resultName)
//     expect(resources.includes(resultName)||craftables.includes(resultName)).toBe(true);
//   });
// });
