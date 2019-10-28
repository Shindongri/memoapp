import { createReducer, createStandardAction, ActionType } from 'typesafe-actions'

import { concat, filter } from 'lodash/fp'
import { ILabel } from '../components/Label/Label.spec'

export const FETCH_LABEL_REQUEST = 'label/FETCH_LABErfL_REQUEST' as const
export const CREATE_LABEL_REQUEST = 'label/CREATE_LABEL_REQUEST' as const
export const UPDATE_LABEL_REQUEST = 'label/UPDATE_LABEL_REQUEST' as const
export const SELECT_LABEL_REQUEST = 'label/SELECT_LABEL_REQUEST' as const
export const REMOVE_LABEL_REQUEST = 'label/REMOVE_LABEL_REQUEST' as const
export const ADD_MEMOS_REQUEST = 'label/ADD_MEMOS_REQUEST' as const
export const REMOVE_MEMOS_REQUEST = 'label/REMOVE_MEMOS_REQUEST' as const

export const SET_LABELS = 'label/SET_LABELS' as const
export const SET_LABEL = 'label/SET_LABEL' as const
export const ADD_LABELS = 'label/ADD_LABELS' as const

interface LabelState {
    labels: ILabel[];
    label: ILabel;
}

const initialState: LabelState = {
    labels: [],
    label: {} as ILabel
}

const actions = {
    fetchLabels: createStandardAction(FETCH_LABEL_REQUEST)(),
    createLabel: createStandardAction(CREATE_LABEL_REQUEST)<ILabel>(),
    updateLabel: createStandardAction(UPDATE_LABEL_REQUEST)<ILabel>(),
    removeLabel: createStandardAction(REMOVE_LABEL_REQUEST)<string>(),
    selectLabel: createStandardAction(SELECT_LABEL_REQUEST)<string>(),

    addMemos: createStandardAction(ADD_MEMOS_REQUEST)<{ _id: string, memoIds: string[] }>(),
    removeMemos: createStandardAction(REMOVE_MEMOS_REQUEST)<{ _id: string, memoIds: string[] }>(),

    setLabels: createStandardAction(SET_LABELS)<ILabel[]>(),
    setLabel: createStandardAction(SET_LABEL)<ILabel>(),
    addLabels: createStandardAction(ADD_LABELS)<ILabel>()
}

export const LabelActions = actions

export type RootAction = ActionType<typeof actions>

const label = createReducer<LabelState, RootAction>(initialState)
    .handleAction(actions.setLabels, (state, action) => ({ ...state, labels: action.payload }))
    .handleAction(actions.setLabel, (state, action) => ({ ...state, label: action.payload }))
    .handleAction(actions.addLabels, (state, action) => ({ ...state, labels: concat(state.labels)(action.payload) }))
    .handleAction(actions.removeLabel, (state, action) => ({ ...state, labels: filter(({ _id }: ILabel) => _id !== action.payload )(state.labels)}))

export default label
