import { generateAjaxConfig } from "../helper/index";
export const addUser = async ({ email, password }) => {
  const response = await fetch(
    "/addUser",
    generateAjaxConfig({ email: email, password: password })
  );
  const result = await response.json();
  console.log(result);
};
export const logInUser = async ({ email, password }) => {
  const response = await fetch(
    "/logInUser",
    generateAjaxConfig({ email: email, password: password })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};
export const findUser = async ({ email }) => {
  const response = await fetch(
    "/findUser",
    generateAjaxConfig({ email: email })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result.status);
  return result.status;
};
export const addStock = async ({
  name,
  quantity,
  price,
  image,
  description,
}) => {
  const response = await fetch(
    "/addStock",
    generateAjaxConfig({
      name: name,
      quantity: quantity,
      price: price,
      image: image,
      description: description,
    })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};
export const modifyStock = async ({
  name,
  quantity,
  price,
  image,
  description,
}) => {
  const response = await fetch(
    "/modifyStock",
    generateAjaxConfig({
      name: name,
      quantity: quantity,
      price: price,
      image: image,
      description: description,
    })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};

export const modifyUser = async ({ email, name, quantity, price, image }) => {
  const response = await fetch(
    "/modifyUser",
    generateAjaxConfig({
      email: email,
      name: name,
      quantity: quantity,
      price: price,
      image: image,
    })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};
export const modifyCartQ = async ({ email, index, valueQ }) => {
  const response = await fetch(
    "/modifyCartQ",
    generateAjaxConfig({
      email: email,
      index: index,
      valueQ: valueQ,
    })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};
export const deleteCart = async ({ email, index }) => {
  const response = await fetch(
    "/deleteCart",
    generateAjaxConfig({
      email: email,
      index: index,
    })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};
export const delUser = async ({ id }) => {
  const response = await fetch("/delUser", generateAjaxConfig({ id: id }));
  const result = await response.json();
  //console.log(result);
  //console.log(result);
  return result.status;
};
export const modUser1 = async ({ id }) => {
  const response = await fetch("/modUser1", generateAjaxConfig({ _id: id }));
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result.status;
};

export const getCart = async ({ email }) => {
  const response = await fetch(
    "/getCart",
    generateAjaxConfig({ email: email })
  );
  const result = await response.json();
  //console.log(result);
  console.log(result);
  return result;
};

export const getProduct = async () => {
  const response = await fetch("/allProduct", { method: "GET" });
  const result = await response.json();
  //console.log(result);
  // console.log(result);
  return result;
};
export const getUser = async () => {
  const response = await fetch("/allToget", { method: "GET" });
  const result = await response.json();
  console.log(result);
  return result;
};
