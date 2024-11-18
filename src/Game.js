import React, { useState } from "react";
import GameGrid from "./GameGrid.js";

function Game() {
   const [moves, setMoves] = useState(new Array(9).fill(""));
   const [turn, setTurn] = useState("X");
   const [winner, setWinner] = useState(null);
   const [isTie, setIsTie] = useState(false);

   // Winning combinations
   const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
   ];

   // Check for a winner
   function checkWinner(updatedMoves) {
      for (let combination of winningCombinations) {
         const [a, b, c] = combination;
         if (updatedMoves[a] && updatedMoves[a] === updatedMoves[b] && updatedMoves[a] === updatedMoves[c]) {
            return updatedMoves[a]; // Return the winning player ("X" or "O")
         }
      }
      return null; // No winner yet
   }

   // Check for a tie
   function checkTie(updatedMoves) {
      return updatedMoves.every(move => move !== ""); // All squares filled
   }

   // Handle square clicks
   function gridClick(whichSquare) {
      if (moves[whichSquare] === "" && !winner) { // Only allow clicks if square is empty and there's no winner
         const movesCopy = [...moves];
         movesCopy[whichSquare] = turn;
         setMoves(movesCopy);

         const result = checkWinner(movesCopy);
         if (result) {
            setWinner(result); // Set the winner if found
         } else if (checkTie(movesCopy)) {
            setIsTie(true); // Set tie if all squares are filled
         } else {
            setTurn(turn === "X" ? "O" : "X"); // Switch turn
         }
      }
   }

   // Reset the game
   function newGame() {
      setMoves(new Array(9).fill(""));
      setTurn("X");
      setWinner(null);
      setIsTie(false);
   }

   return (
      <>
         <h1>Tic-Tac-Toe</h1>
         <GameGrid moves={moves} click={gridClick} />
         <p>
            {winner ? (
               <strong className={winner}>{winner} Wins!</strong>
            ) : isTie ? (
               <strong>It's a Tie!</strong>
            ) : (
               <>
                  Turn: <strong className={turn}>{turn}</strong>
               </>
            )}
         </p>
         <p>
            <button onClick={newGame}>New Game</button>
         </p>
      </>
   );
}

export default Game;
