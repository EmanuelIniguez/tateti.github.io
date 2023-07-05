import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState('X');
  const [winner, setWinner] = useState(null);
  const [score, setScore] = useState({ X: 0, O: 0 });

  useEffect(() => {
    if (winner) {
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setWinner(null);
        setPlayer('X');
      }, 2000);
    }
  }, [winner]);

  const handleClick = (index) => {
    if (!board[index] && !winner) {
      const newBoard = [...board];
      newBoard[index] = player;
      setBoard(newBoard);

      const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (
          newBoard[a] &&
          newBoard[a] === newBoard[b] &&
          newBoard[a] === newBoard[c]
        ) {
          setWinner(player);
          setScore((prevScore) => ({ ...prevScore, [player]: prevScore[player] + 1 }));
          return;
        }
      }

      setPlayer(player === 'X' ? 'O' : 'X');
    }
  };

  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setPlayer('X');
  };

  const isGameOver = score.X + score.O >= 10;

  return (
    <div className="App">
      <h1>TA TE TI</h1>
      <div className="board">
        {board.map((cell, index) => (
          <div
            key={index}
            className={`cell ${cell}`}
            onClick={() => handleClick(index)}
          >
            {cell}
          </div>
        ))}
      </div>
      {winner && <div className="message">¡{winner} Ganaste!!</div>}
      {isGameOver ?
        (
          <div className="message">Juego terminado!!</div>
        ) : (
          <div className="score" style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
              <br></br>
              <span className='X'>X : {score.X}</span>
            </div>

            <div style={{ flex: 1 }}>
              <br></br>
              <span className='O'>O : {score.O}</span>
            </div>
          </div>


        )}
      <button className="restart-button" onClick={handleRestart}>
        Reset
      </button>
    </div>
  );
};

export default App;
