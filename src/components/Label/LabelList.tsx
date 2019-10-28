import React, { useState, useCallback, memo } from 'react'

import { Container, Button, InputWrapper, Input, List, ListItem, StyledIcon } from './LabelList.style'
import { ILabel, IProps } from './Label.spec'

const LabelList = memo(({ totalCount, items, onInsert, onSelect }: IProps) => {
    const [open, setOpen] = useState<boolean>(false)
    const [title, setTitle] = useState<string | null>(null)

    const handleOpen = useCallback(() => setOpen(true), [])
    const handleClose = useCallback(() => setOpen(false), [])
    const handleInput = useCallback((v: string) => setTitle(v), [])

    const handleInsert = (e: any) => {
        if (e.key === 'Enter') {
            onInsert({ title, content: '' })
            handleClose()
        }
    }

    return (
        <Container>
            <Button onClick={ handleOpen }>
                추가하기&nbsp;
                <StyledIcon type="plus" />
            </Button>
            {
                open ? (
                    <InputWrapper>
                        <Input placeholder="라벨명 입력" onChange={ (e: any)  => handleInput(e.target.value) } onKeyDown={ handleInsert } />
                        <StyledIcon type="close" onClick={ handleClose } />
                    </InputWrapper>
                ) : null
            }
            <List>
                <ListItem onClick={ () => onSelect('')}>{ `전체 메모 (${ totalCount })` }</ListItem>
                {
                    items.map(({ _id, title, memos }: ILabel) => (
                        <ListItem key={ _id } onClick={ () => onSelect(_id) }>{ `${ title } (${ memos.length })` }</ListItem>
                    ))
                }
            </List>
        </Container>
    )
})

export default LabelList
