export const reducer = (state = [], { type, payload }) => {
  switch (type) {
    case "ADD":
      return [...state, { ...payload }];
    case "MOD":
      const newStateAfterMod = [...state];
      newStateAfterMod[payload.index].image = payload.image;
      console.log(newStateAfterMod);
      // console.log(payload);
      // console.log(payload.index);
      return newStateAfterMod;
    case "DEL":
      const newStateAfterDel = [...state];
      newStateAfterDel.splice(payload.index, 1);
      //console.log("this is payload" + payload.index);
      console.log(newStateAfterDel);
      return newStateAfterDel;
    case "SHO":
      return [...state, { ...payload }];
    case "MODQ":
      const newStateAfterModQ = [...state];
      newStateAfterModQ[payload.index].quantity = payload.quantity;
      console.log(newStateAfterModQ);
    default:
      return state;
  }
};
