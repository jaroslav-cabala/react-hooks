// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import * as React from 'react'
import {useLocalStorageState} from '../utils'

const localStorageGameHistoryKey = 'gameHistory'
const localStorageGameTurnKey = 'gameTurn'

function Game() {
  console.log('Game render')

  const [history, setHistory] = useLocalStorageState(
    localStorageGameHistoryKey,
    [Array(9).fill(null)],
  )
  const [turn, setTurn] = useLocalStorageState(localStorageGameTurnKey, 0)

  const goToGameTurn = turnIndex => setTurn(turnIndex)

  const updateGameHistory = squares => {
    console.log('persisting game history and game turn in local storage')

    const historyCopy = history.slice(0, turn + 1)
    historyCopy.push(squares)
    setHistory(historyCopy)
    setTurn(turn => ++turn)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setTurn(0)
  }

  const gameTurns = history.map((_, index) => {
    const buttonDescription =
      index === 0 ? 'Go to game start' : `Go to move #${index}`
    const isCurrentStep = index === turn

    return (
      <li key={index}>
        <button disabled={isCurrentStep} onClick={() => goToGameTurn(index)}>
          {buttonDescription} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={history[turn]} updateGameHistory={updateGameHistory} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <ul>{gameTurns}</ul>
      </div>
    </div>
  )
}

function Board({squares, updateGameHistory}) {
  console.log('Board render')
  const winner = calculateWinner(squares)
  const nextValue = calculateNextValue(squares)

  function selectSquare(squareIndex) {
    if (winner || squares[squareIndex]) {
      return
    }

    const squaresUpdated = Array.from(squares)
    squaresUpdated[squareIndex] = nextValue
    updateGameHistory(squaresUpdated)
    console.log('updated squares')
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
      <div className="status">
        {calculateGameStatus(winner, squares, nextValue)}
      </div>
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
    </div>
  )
}

function calculateGameStatus(winner, squares, nextValue) {
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
  console.log('calculate winner')
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
