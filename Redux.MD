### Create react app with redux and typescript
```shell script
npx create-react-app my-app --template redux-typescript
```

### Persisted state @ subscribe

https://stackoverflow.com/questions/35305661/where-to-write-to-localstorage-in-a-redux-app
```javascript
//on subscribe
store.subscribe(()=>{
  localStorage.setItem('reduxState', JSON.stringify(store.getState()))
});

//before creating the store, check local storage
const persistedState = localStorage.getItem('reduxState') 
                       ? JSON.parse(localStorage.getItem('reduxState'))
                       : {}

//Pass persisted state to store
const store = createStore(
  reducer, 
  persistedState,
  /* any middleware... */
)

```

