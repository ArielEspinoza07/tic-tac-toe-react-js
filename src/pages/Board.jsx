import { useState } from 'react'
import confetti from 'canvas-confetti'

import { Square } from './components/Square.jsx'
import { WinnerModal } from './components/index.jsx'

import { StorageKeys, TURNS } from '../constants/index.js'
import {
  checkWinner,
  checkEndGame,
  NewBoard,
  SetValueInStorage,
  GetValueInStorage,
  HasValueInStorage, ClearValuesInStorage
} from './functions/index.js'

export default function Board () {
  const [board, setBoard] = useState(() => {
    if (HasValueInStorage(StorageKeys.board)) {
      return GetValueInStorage(StorageKeys.board)
    }
    return NewBoard()
  })
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)

  const updateBoard = (index) => {
    if (board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    SetValueInStorage(StorageKeys.board, newBoard)
    SetValueInStorage(StorageKeys.turn, newTurn)

    const newWinner = checkWinner(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    }
    if (checkEndGame(newBoard)) {
      setWinner(false)
    }
  }

  const resetGame = () => {
    ClearValuesInStorage()
    setBoard(NewBoard())
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <main className='board'>
      <h1>Tic Tac Toe</h1>
      <button type='button' onClick={resetGame}>
        Reset
      </button>
      <section className='game'>
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}
