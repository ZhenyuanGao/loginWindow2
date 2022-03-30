import { generateAjaxConfig } from "../helper/index";

export const addUser = async ({ email, password }) => {
  const response = await fetch(
    "/addUser",
    generateAjaxConfig({ email, password })
  );
  const result = await response.json();
  console.log(result);
};
