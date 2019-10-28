import { call, put, takeEvery, all } from 'redux-saga/effects'

import { fetchLabelAPI, detailLabelAPI, createLabelAPI, updateLabelAPI, removeLabelAPI, addMemosAPI, removeMemosAPI } from '../api/label'
import {
    LabelActions,

    SELECT_LABEL_REQUEST,
    REMOVE_LABEL_REQUEST,
    CREATE_LABEL_REQUEST,
    UPDATE_LABEL_REQUEST,
    FETCH_LABEL_REQUEST, ADD_MEMOS_REQUEST, REMOVE_MEMOS_REQUEST,
} from '../modules/label'
import {REMOVE_MEMO_REQUEST, UPDATE_MEMO_REQUEST} from '../modules/memo'

const fetchLabel = function* () {
    try {
        const { status, statusText, data } = yield call(fetchLabelAPI)

        if (status === 200 && statusText === 'OK') {
            yield put(LabelActions.setLabels(data))
        }
    } catch (e) {
        console.error(e)
    }
}

const detailLabel = function* ({ payload }: any) {
    try {
        const { status, statusText, data } = yield call(detailLabelAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield put(LabelActions.setLabel(data))
        }
    } catch (e) {
        console.error(e)
    }
}

function* createLabel({ payload }: any) {
    try {
        const { status, statusText, data } = yield call(createLabelAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield put(LabelActions.addLabels(data))
        }
    } catch (e) {
        console.error(e)
    }
}

function* updateLabel({ payload }: any) {
    try {
        const { status, statusText } = yield call(updateLabelAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield fetchLabel()
        }
    } catch (e) {
        console.error(e)
    }
}

const removeLabel = function* ({ payload }: any) {
    try {
        const { status, statusText, data: { _id } } = yield call(removeLabelAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield put(LabelActions.removeLabel(_id))
        }
    } catch (e) {
        console.error(e)
    }
}

const addMemos = function* ({ payload: { _id, memoIds } }: any) {
    try {
        const { status, statusText } = yield call(addMemosAPI, { _id, memoIds })

        if (status === 200 && statusText === 'OK') {
            yield fetchLabel()
        }
    } catch (e) {
        console.error(e)
    }
}

const removeMemos = function* ({ payload: { _id, memoIds } }: any) {
    try {
        const { status, statusText } = yield call(removeMemosAPI, { _id, memoIds })

        if (status === 200 && statusText === 'OK') {
            yield fetchLabel()
        }
    } catch (e) {
        console.error(e)
    }
}

export default function* labelSaga() {
    yield all([
        takeEvery([FETCH_LABEL_REQUEST], fetchLabel),
        takeEvery([CREATE_LABEL_REQUEST], createLabel),
        takeEvery([UPDATE_LABEL_REQUEST], updateLabel),

        takeEvery([SELECT_LABEL_REQUEST, REMOVE_MEMO_REQUEST], detailLabel),
        takeEvery([REMOVE_LABEL_REQUEST], removeLabel),
        takeEvery([ADD_MEMOS_REQUEST], addMemos),
        takeEvery([REMOVE_MEMOS_REQUEST], removeMemos)
    ])
}
