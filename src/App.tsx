import React from 'react'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import { createGlobalStyle } from 'styled-components'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './modules'
import rootSaga from './sagas'


import IndexPage from './containers/Index'
import MemoListPage from './containers/MemoList'
import MemoViewPage from './containers/MemoView'

import 'antd/dist/antd.css'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

const GlobalStyle = createGlobalStyle`
    body {
        background-color: #eeeeee !important;
    }
    .ant-checkbox-checked .ant-checkbox-inner {
        background-color: #757575;
        border-color: #757575;
    }
`

const App = () => (
    <Provider store={ store }>
        <Router>
            <Route exact path="/" component={ IndexPage } />
            <Route path="/label/:labelId?" component={ MemoListPage } />
            <Route path="/memo/:labelId?/:memoId" component={ MemoViewPage } />
        </Router>
        <GlobalStyle />
    </Provider>
)

export default App
