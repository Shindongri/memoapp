import styled from 'styled-components'
import { Icon } from 'antd'

export const Container = styled.div`
    background-color: #FFFFFF;
    width: 230px;
    height: 100%;
    border: solid 1px #cdcdcd;
    margin: 20px 5px 5px 5px;
`

export const Button = styled.div`
    padding: 8px;
    cursor: pointer;
`

export const InputWrapper = styled.div`
    padding: 8px;
    background-color: #ffffff;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Input = styled.input`
    border: 0;
    width: 80%;
`

export const List = styled.ul`
    margin: 0;
    list-style: none;
    padding-inline-start: 0;
`

export const ListItem = styled.li`
    cursor: pointer;
    height: 36px;
    padding: 8px;
    &:first-child {
        font-weight: 700;
    }
    &:hover {
        background-color: #e8e8e8;
    }
`

export const StyledIcon = styled(Icon)`
    cursor: pointer;
`
