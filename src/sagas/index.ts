import { all } from 'redux-saga/effects'

import memo from './memo'
import label from './label'

export default function* rootSaga() {
    yield all([
        memo(),
        label()
    ])
}
