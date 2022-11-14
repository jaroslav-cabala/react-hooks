// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

const useLocalStorageState = (key, defaultValue) => {
  const [data, setData] = React.useState(() => {
    // const persistedData = window.localStorage.getItem(key)
    // return persistedData ? JSON.parse(persistedData) : {[key]: defaultValue}
    return window.localStorage.getItem(key) || defaultValue
  })

  React.useEffect(() => {
    // window.localStorage.setItem('data', JSON.stringify(data))
    window.localStorage.setItem(key, data)
    console.log('useEffect')
  }, [data, key])

  return {
    data,
    // saveItem: (key, value) => {
    //   const newData = {[key]: value}
    //   setData(newData)
    // },
    setData,
    clearStorage: () => window.localStorage.clear(),
  }
}

function Greeting() {
  const {data, setData, clearStorage} = useLocalStorageState('name', 'Jaro')

  function handleChange(event) {
    // setData('name', event.target.value)
    setData(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={data} onChange={handleChange} id="name" />
      </form>
      {data ? <strong>Hello {data}</strong> : 'Please type your name'}
      <p>
        <button onClick={clearStorage}>Clear storage</button>
      </p>
    </div>
  )
}

function App() {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <button onClick={() => setCount(count => count + 1)}>{count}</button>
      <Greeting />
    </>
  )
}

export default App
