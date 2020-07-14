export const lNull: null = null;

export const booleanTrue: true = true;
export const booleanFalse: false = false;

export const stringApples: "apples" = "apples";
export const stringTomatoes: "tomatoes" = "tomatoes";

export const number42: 42 = 42;
export const number42half: 42.5 = 42.5;
export const number43: 43 = 43;

export const arrayMixed1: [42, true, "string"] = [42, true, "string"];
export const arrayMixed2: [42, true, "string", { foo: "bar" }] = [
  42,
  true,
  "string",
  { foo: "bar" },
];

export const object1 = { name: "Garfield" };
export const object2 = {
  name: "Garfield",
  age: 13,
};
export const object3 = {
  name: "Dogo",
  age: 13,
  hobbies: ["barking", "urinating"],
};
export const object4 = {
  name: "Dogo",
  age: 13,
  hobbies: ["barking", "urinating"],
  other: [{ title: "Likes Pizza" }],
};
export const object5 = {
  name: "Dogo",
  age: 13,
  hobbies: ["barking", "urinating"],
  other: [
    { title: "Likes Pizza" },
    { title: "Address", description: "42, bark street" },
  ],
};

export const arrayString1: ["apples"] = ["apples"];
export const arrayString2: ["tomatoes"] = ["tomatoes"];

export const arrayObject1: { name: string; description?: string }[] = [
  { name: "apple" },
];
export const arrayObject2: { name: string; description?: string }[] = [
  { name: "apple" },
  { name: "tomato", description: "Delicious red fruit" },
];

export const arrayTuple1: [number, string, { description: string }] = [
  0,
  "pasta",
  { description: "Italian meal" },
];
export const arrayTuple2: [
  number,
  string,
  { description: string },
  string[]
] = [1, "pizza", { description: "A delicious pizza" }, ["tomatoes", "cheese"]];
export const arrayTuple3: [
  number,
  string,
  { description: string },
  string[],
  boolean
] = [
  2,
  "burger",
  { description: "A delicious burger" },
  ["bread", "meat", "lettuce"],
  true,
];
