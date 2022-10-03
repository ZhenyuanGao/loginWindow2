//target make todos.
//in my case is make users.
export const addproduct = (dispatch) => ({
  name,
  quantity,
  price,
  image,
  description,
}) => {
  dispatch({
    type: "ADD",
    payload: {
      name: name,
      quantity: quantity,
      price: price,
      image: image,
      description: description,
    },
  });
};

export const modProduct = (dispatch) => ({ index, image }) => {
  dispatch({
    type: "MOD",
    payload: { index: index, image: image },
  });
};

export const delProduct = (dispatch) => (index) => {
  dispatch({
    type: "DEL",
    payload: index,
  });
};
export const showDetails = (dispatch) => ({ boolToShow, index }) => {
  dispatch({
    type: "SHO",
    payload: { boolToShow: boolToShow, index: index },
  });
};
export const modProductQ = (dispatch) => ({ index, quantity }) => {
  dispatch({
    type: "MODQ",
    payload: { index: index, quantity: quantity },
  });
};
