import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOr } from 'lodash/fp'

import { Container } from '../Index/IndexContainer.style'
import { LabelActions, FETCH_LABEL_REQUEST } from '../../modules/label'

import LabelList from '../../components/Label/LabelList'
import MemoList from '../../components/Memo/MemoList'
import {FETCH_MEMO_REQUEST, MemoActions} from '../../modules/memo'

const MemoListContainer: React.FC<{}> = ({ match }: any) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { labelId } = match.params

    useEffect(() => {
        dispatch({ type: FETCH_LABEL_REQUEST })
        dispatch({ type: FETCH_MEMO_REQUEST })

        if (labelId) {
            dispatch(LabelActions.selectLabel(labelId))
        }
    }, [match])

    const labels = useSelector((state: any) => getOr([], 'label.labels')(state))
    const memos = useSelector((state: any) => getOr([], 'memo.memos')(state))
    const label: any = useSelector((state: any) => getOr({}, 'label.label')(state))
    const memoIds: any = useSelector((state: any) => getOr([], 'memo.checkedMemoIds')(state))

    const handleCreateLabel = useCallback(payload => dispatch(LabelActions.createLabel(payload)), [])

    const handleSelectLabel = useCallback((id: string) => history.push(`/label/${ id }`), [])
    const handleSelectMemo = useCallback((memoId: string) => history.push(`/memo/${ labelId }/${ memoId }`), [])

    const handleRemoveLabel = useCallback((id: string) => {
        dispatch(LabelActions.removeLabel(id))
        history.push('/')
    }, [])
    const handleUpdateLabel = useCallback((payload: any) => dispatch(LabelActions.updateLabel(payload)), [])

    const handleSettingMemo = (_id: string) => dispatch(LabelActions.addMemos({ _id, memoIds }))
    const handleUnSettingMemo = (_id: string) => dispatch(LabelActions.removeMemos({ _id, memoIds }))

    return (
        <Container>
            <LabelList
                totalCount={ memos.length || 0 }
                items={ labels }
                onInsert={ handleCreateLabel }
                onSelect={ handleSelectLabel }
            />
            {
                label ? (
                    <MemoList
                        _id={ label._id }
                        items={ label.memos }
                        label={ label.title }
                        onSetting={ handleSettingMemo }
                        onUnSetting={ handleUnSettingMemo }
                        onCheck={ ({ id, checked }: any) => checked ? dispatch(MemoActions.checkMemo(id)) : dispatch(MemoActions.uncheckMemo(id)) }
                        onRemove={ handleRemoveLabel }
                        onUpdate={ handleUpdateLabel }
                        onSelect={ handleSelectMemo }
                    />
                ) : null
            }
        </Container>
    )
}

export default MemoListContainer
