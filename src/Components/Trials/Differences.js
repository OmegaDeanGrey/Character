// import React, { useState, useEffect } from "react";

// // Define positions of differences
// const differences = [
//   { x: 100, y: 150, radius: 30 },
//   { x: 250, y: 200, radius: 30 },
//   { x: 400, y: 100, radius: 30 },
// ];

// // Duration for timer in seconds
// const TIMER_DURATION = 30;

// function Differences({ onWin }) {
//   const [found, setFound] = useState([]);

//   // 2nd: timer state
//   const [timeLeft, setTimeLeft] = useState(TIMER_DURATION);
//   const [gameOver, setGameOver] = useState(false);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);

//   useEffect(() => {
//     if (timeLeft <= 0 && !gameOver) {
//       setGameOver(true);
//     }
//     if (gameOver) return;

//     const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timerId);
//   }, [timeLeft, gameOver]);

//   const handleClick = (e) => {
//     if (gameOver) return;

//     const rect = e.target.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     for (let i = 0; i < differences.length; i++) {
//       const diff = differences[i];
//       const distance = Math.sqrt((x - diff.x) ** 2 + (y - diff.y) ** 2);
//       if (distance < diff.radius && !found.includes(i)) {
//         setFound((prev) => [...prev, i]);
//         break;
//       }
//     }
//   };

//   React.useEffect(() => {
//     if (found.length === differences.length && !gameOver) {
//       setScore(Math.floor(Math.random() * 20) + 1);
//       setShowScore(true);
//       setGameOver(true);
//       onWin?.(score);
//     }
//   }, [found]);

//   return (
//     <div style={{ display: "flex", gap: "20px" }}>
//       <div>
//         <h2>Time left: {timeLeft} seconds</h2>
//         {gameOver && showScore && (
//           <div
//             style={{
//               padding: "20px",
//               background: "rgba(0,0,0,0.7)",
//               color: "yellow",
//             }}
//           >
//             <h3>Congratulations! You scored {score} points</h3>
//           </div>
//         )}

//         <div style={{ position: "relative" }}>
//           <img
//             src="/images/changed.jpg"
//             alt="changed"
//             onClick={handleClick}
//             style={{ cursor: "crosshair" }}
//           />
//           {found.map((idx) => (
//             <div
//               key={idx}
//               style={{
//                 position: "absolute",
//                 left: differences[idx].x - differences[idx].radius,
//                 top: differences[idx].y - differences[idx].radius,
//                 width: differences[idx].radius * 2,
//                 height: differences[idx].radius * 2,
//                 border: "3px solid red",
//                 borderRadius: "50%",
//                 pointerEvents: "none",
//               }}
//             ></div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Differences;
