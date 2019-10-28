import { createReducer,  createStandardAction, ActionType } from 'typesafe-actions'

import { concat, filter } from 'lodash/fp'
import { IMemo } from '../components/Memo/Memo.spec'

export const FETCH_MEMO_REQUEST = 'memo/FETCH_MEMO_REQUEST' as const
export const CREATE_MEMO_REQUEST = 'label/CREATE_MEMO_REQUEST' as const
export const UPDATE_MEMO_REQUEST = 'label/UPDATE_MEMO_REQUEST' as const
export const SELECT_MEMO_REQUEST = 'memo/SELECT_MEMO_REQUEST' as const
export const REMOVE_MEMO_REQUEST = 'memo/REMOVE_MEMO_REQUEST' as const

export const SET_MEMOS = 'memo/SET_MEMOS' as const
export const SET_MEMO = 'memo/SET_MEMO' as const
export const ADD_MEMOS = 'memo/ADD_MEMOS' as const
export const CHECK_MEMO = 'memo/CHECK_MEMO' as const
export const UNCHECK_MEMO = 'memo/UNCHECK_MEMO' as const

interface MemoState {
    memos: IMemo[];
    memo: IMemo;
    checkedMemoIds: string[];
}

const initialState: MemoState = {
    memos: [],
    memo: {} as IMemo,
    checkedMemoIds: []
}

const actions = {
    fetchMemos: createStandardAction(FETCH_MEMO_REQUEST)(),
    createMemo: createStandardAction(CREATE_MEMO_REQUEST)<IMemo>(),
    updateMemo: createStandardAction(UPDATE_MEMO_REQUEST)<IMemo>(),

    setMemos: createStandardAction(SET_MEMOS)<IMemo[]>(),
    setMemo: createStandardAction(SET_MEMO)<IMemo>(),
    checkMemo: createStandardAction(CHECK_MEMO)<string>(),
    uncheckMemo: createStandardAction(UNCHECK_MEMO)<string>(),
    removeMemo: createStandardAction(REMOVE_MEMO_REQUEST)<string>(),
    selectMemo: createStandardAction(SELECT_MEMO_REQUEST)<string>(),
    addMemos: createStandardAction(ADD_MEMOS)<IMemo>()
}

export const MemoActions = actions

export type RootAction = ActionType<typeof actions>

const memo = createReducer<MemoState, RootAction>(initialState)
    .handleAction(actions.setMemos, (state, action) => ({ ...state, memos: action.payload}))
    .handleAction(actions.setMemo, (state, action) => ({ ...state, memo: action.payload }))
    .handleAction(actions.addMemos, (state, action) => ({ ...state, memos: concat(state.memos)(action.payload) }))
    .handleAction(actions.removeMemo, (state, action) => ({ ...state, memos: filter(({ _id }: IMemo) => _id !== action.payload)(state.memos)}))
    .handleAction(actions.checkMemo, (state, action) => ({ ...state, checkedMemoIds: [...state.checkedMemoIds, action.payload] }))
    .handleAction(actions.uncheckMemo, (state, action) => ({ ...state, checkedMemoIds: filter((id: string) => id !== action.payload)([...state.checkedMemoIds]) }))

export default memo
