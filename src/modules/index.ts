import { combineReducers } from 'redux'

import memo from './memo'
import label from './label'

const rootReducer = combineReducers({
    memo,
    label
})

export default rootReducer
