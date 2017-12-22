import { createStore, combineReducers, applyMiddleware } from 'redux'

/* reducer */
import * as reducers from 'app/src/reducers'

export function configureStore() {
  const reducer = combineReducers({
    ...reducers
  })

  const store = createStore(
    reducer
  )

  return store
}