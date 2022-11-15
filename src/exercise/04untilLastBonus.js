// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

const localStorageStateKey = 'gameState'

function Board() {
  console.log('Board render')

  const [squares, setSquares] = React.useState(() => {
    return getPersistedState() || Array(9).fill(null)
  })

  // const [squares, setSquares] = useLocalStorageState(
  //   localStorageStateKey,
  //   Array(9).fill(null),
  // )

  React.useEffect(() => persistState(squares), [squares])

  const nextValue = calculateNextValue(squares)

  function selectSquare(squareIndex) {
    if (!calculateWinner(squares)) {
      const squaresUpdated = Array.from(squares)

      if (!squaresUpdated[squareIndex]) {
        squaresUpdated[squareIndex] = nextValue

        console.log('updated squares')
        setSquares(squaresUpdated)
      }
    }
  }

  function restart() {
    setSquares(Array(9).fill(null))
  }

  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    )
  }

  return (
    <div>
      <div className="status">{calculateStatus(squares, nextValue)}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

const getPersistedState = () => {
  console.log('getting persisted state from local storage')
  return JSON.parse(localStorage.getItem(localStorageStateKey))
}

const persistState = state => {
  console.log('persisting state')
  localStorage.setItem(localStorageStateKey, JSON.stringify(state))
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  )
}

function calculateStatus(squares, nextValue) {
  const winner = calculateWinner(squares)
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
