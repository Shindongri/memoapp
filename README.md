# myBridge memoapp

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 이용 가능한 스크립트

### `yarn dev`

: 개발 모드로 React App 을 구동합니다. <br />
브라우저에서 [http://localhost:8080](http://localhost:8080) 해당 경로로 확인 할 수 있습니다.

### `yarn prod`

: 운영 모드로 React App 을 구동합니다. <br />
브라우저에서 [http://localhost:8080](http://localhost:8080) 해당 경로로 확인 할 수 있습니다.


### `yarn build`

: 해당 명령어로 프로젝트를 빌드하여, 최적화 합니다.


## 프로젝트 구조

### `yarn dev`

: 개발 모드로 React App 을 구동합니다. <br />
브라우저에서 [http://localhost:8080](http://localhost:8080) 해당 경로로 확인 할 수 있습니다.

### `yarn prod`

: 운영 모드로 React App 을 구동합니다. <br />
브라우저에서 [http://localhost:8080](http://localhost:8080) 해당 경로로 확인 할 수 있습니다.


### `yarn build`

: 해당 명령어로 프로젝트를 빌드하여, 최적화 합니다.

### 구동 순서

* 로컬 환경에서 memoapp-api (BE) 구동 됐다고, 가정한 후

```
yarn install
yarn dev
```

## 프로젝트 구조
```
src
├── components
│   ├── label
│   │   ├── Label.spec.ts
│   │   ├── LabelList.style.ts
│   │   └── LabelList.tsx
│   └── memo
│       ├── Memo.spec.ts
│       ├── MemoList.style.ts
│       ├── MemoList.tsx
│       ├── MemoView.style.ts
│       └── MemoView.tsx
├── api
│   ├── label.ts
│   └── memo.ts
├── containers
│   ├── Index
│   │   ├── IndexContainer.style.tsx
│   │   ├── IndexContainer.tsx
│   │   └── index.tsx
│   ├── MemoList
│   │   ├── MemoListContainer.style.tsx
│   │   ├── MemoListContainer.tsx
│   │   └── index.tsx
│   └── MemoView
│       ├── MemoViewContainer.style.tsx
│       ├── MemoViewContainer.tsx
│       └── index.tsx
├── modules
│   ├── label.ts
│   ├── memo.ts
│   └── index.ts
├── sagas
│   ├── label.ts
│   ├── memo.ts
│   └── index.ts
├── App.js
└── index.js
```
