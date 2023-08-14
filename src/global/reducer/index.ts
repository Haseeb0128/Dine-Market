function checkerAndReturner(originalData: any, newData: any) {
  for (let index = 0; index < originalData.length; index++) {
    const element = originalData[index];
    if (element.productID == newData.productID) {
      return element;
    }
  }
}

export function cartReducer(state: any, action: any) {
  if (action.payload === "addToCart") {
    let response = checkerAndReturner(state.cart, action.data);
    if (!response) {
      return {
        cart: [...state.cart, action.data],
      };
    } else {
      let dataToStoreAgain = state.cart.filter(
        (item: any) => item.productID !== response.productID
      );
      return {
        cart: [...dataToStoreAgain, action.data],
      };
    }
  } else if (action.payload === "removeToCart") {
    return "";
  } else if (action.payload === "updateToCart") {
    return state;
  }
  return state;
}
