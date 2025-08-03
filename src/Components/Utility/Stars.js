import React, { useEffect, useState } from "react";

const Stars = ({ count }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starArray = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      delay: Math.random() * 2,
      size: Math.random() * 3 + 6,
    }));

    setStars(starArray);
  }, [count]);

  return (
    <div className="stars">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            animationDelay: `${star.delay}s`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default Stars;
