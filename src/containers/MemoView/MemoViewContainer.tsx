import React, { useCallback, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOr } from 'lodash/fp'

import { Container } from '../Index/IndexContainer.style'
import { LabelActions, FETCH_LABEL_REQUEST } from '../../modules/label'
import { FETCH_MEMO_REQUEST, MemoActions } from '../../modules/memo'

import LabelList from '../../components/Label/LabelList'
import MemoList from '../../components/Memo/MemoList'
import MemoView from '../../components/Memo/MemoView'

const MemoViewContainer: React.FC<{}> = memo(({ match }: any) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const { labelId, memoId } = match.params

    useEffect(() => {
        dispatch({ type: FETCH_LABEL_REQUEST })
        dispatch({ type: FETCH_MEMO_REQUEST })

        if (labelId) {
            dispatch(LabelActions.selectLabel(labelId))
        }

        if (memoId) {
            dispatch(MemoActions.selectMemo(memoId))
        }
    }, [match.params])

    const labels = useSelector((state: any) => getOr([], 'label.labels')(state))
    const memos = useSelector((state: any) => getOr([], 'memo.memos')(state))
    const label: any = useSelector((state: any) => getOr({}, 'label.label')(state))
    const memo: any = useSelector((state: any) => getOr({}, 'memo.memo')(state))
    const memoIds: any = useSelector((state: any) => getOr({}, 'memo.checkedMemoIds')(state))

    const handleCreateLabel = useCallback(payload => dispatch(LabelActions.createLabel(payload)), [])

    const handleSelectLabel = useCallback((id: string) => history.push(`/label/${ id }`), [])
    const handleSelectMemo = useCallback((memoId: string) => history.push(`/memo/${ labelId }/${ memoId }`), [])

    const handleRemoveLabel = useCallback((id: string) => dispatch(LabelActions.removeLabel(id)), [])
    const handleRemoveMemo = useCallback((id: any) => dispatch(MemoActions.removeMemo(id)), [])

    const handleUpdateLabel = useCallback((payload: any) => dispatch(LabelActions.updateLabel(payload)), [])
    const handleUpdateMemo = useCallback((payload: any) => dispatch(MemoActions.updateMemo(payload)), [])

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
            <MemoList
                _id={ label._id }
                items={ labelId ? label.memos : memos }
                label={ label.title }
                onSetting={ handleSettingMemo }
                onUnSetting={ handleUnSettingMemo }
                onCheck={ ({ id, checked }: any) => checked ? dispatch(MemoActions.checkMemo(id)) : dispatch(MemoActions.uncheckMemo(id)) }
                onRemove={ handleRemoveLabel }
                onUpdate={ handleUpdateLabel }
                onSelect={ handleSelectMemo }
            />
            {
                memo ? (
                    <MemoView
                        _id={ memo._id }
                        updatedAt={ memo.updatedAt }
                        title={ memo.title }
                        content={ memo.content }
                        onRemove={ handleRemoveMemo }
                        onUpdate={ handleUpdateMemo }
                    />
                ) : null
            }
        </Container>
    )
})

export default MemoViewContainer
