// productReducer.js
const initialState = {
  products: [],
  product: null,
  isLoading: false,
  isError: false
};

export function productReducer(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_PRODUCTS':
      return {
        ...state,
        products: action.payload,
        isLoading: false,
        isError: false
      };
    case 'FETCH_PRODUCT':
      return {
        ...state,
        product: action.payload,
        isLoading: false,
        isError: false
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    default:
      return state;
  }
}
export { initialState };
export default productReducer;