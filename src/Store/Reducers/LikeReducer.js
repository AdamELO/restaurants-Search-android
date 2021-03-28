const initialState = { likeRestaurant: [], hateRestaurant: [] }

function likeRestaurante(state = initialState, action) {
  let nextState
  switch (action.type) {
    case "heart":
      const likeRestaurantIndex = state.likeRestaurant.findIndex(item => item.id === action.value.id)
      if (likeRestaurantIndex !== -1) {
        nextState = {
          ...state,
          likeRestaurant: state.likeRestaurant.filter((item, index) => index !== likeRestaurantIndex)
        }
      }
      else {
        nextState = {
          ...state,
          likeRestaurant: [...state.likeRestaurant, action.value]
        }
      }
      return nextState || state
    case "poop":
      const hateRestaurantIndex = state.hateRestaurant.findIndex(item => item.id === action.value.id)

      if (hateRestaurantIndex !== -1) {
        nextState = {
          ...state,
          hateRestaurant: state.hateRestaurant.filter((item, index) => index !== hateRestaurantIndex)
        }
      }
      else {
        nextState = {
          ...state,
          hateRestaurant: [...state.hateRestaurant, action.value]
        }
      }
      return nextState || state

    default:
      return state
  }
}

export default likeRestaurante