import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects'

import {
    MemoActions,
    SELECT_MEMO_REQUEST,
    REMOVE_MEMO_REQUEST,
    UPDATE_MEMO_REQUEST,
    FETCH_MEMO_REQUEST,
} from '../modules/memo'

import { FETCH_LABEL_REQUEST } from '../modules/label'
import { detailMemoAPI, fetchMemoAPI, removeMemoAPI, updateMemoAPI } from '../api/memo'

const fetchMemo = function* () {
    try {
        const { status, statusText, data } = yield call(fetchMemoAPI)

        if (status === 200 && statusText === 'OK') {
            yield put(MemoActions.setMemos(data))
        }
    } catch (e) {
        console.error(e)
    }
}

const detailMemo = function* ({ payload }: any) {
    try {
        const { status, statusText, data } = yield call(detailMemoAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield put(MemoActions.setMemo(data))
        }
    } catch (e) {
        console.error(e)
    }
}

const removeMemo = function* ({ payload }: any) {
    try {
        const { status, statusText, data: { _id } } = yield call(removeMemoAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield put({ type: FETCH_LABEL_REQUEST })
        }
    } catch (e) {
        console.error(e)
    }
}

const updateMemo = function* ({ payload }: any) {
    try {
        const { status, statusText, data } = yield call(updateMemoAPI, payload)

        if (status === 200 && statusText === 'OK') {
            yield fetchMemo()
        }
    } catch (e) {
        console.error(e)
    }
}

export default function* memoSaga() {
    yield all([
        takeEvery([FETCH_MEMO_REQUEST], fetchMemo),
        takeEvery([SELECT_MEMO_REQUEST], detailMemo),
        takeEvery([REMOVE_MEMO_REQUEST], removeMemo),
        takeLatest([UPDATE_MEMO_REQUEST], updateMemo)
    ])
}
