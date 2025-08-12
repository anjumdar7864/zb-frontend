import React, { useState } from 'react';

const Star = ({ filled, onClick }) => (
  <span onClick={onClick} style={{ cursor: 'pointer', color: filled ? '#FFC000' : '#ccc',fontSize:'24px' }}>
    ★
  </span>
);

const StarRating = ({ totalStars = 5, rating = 0 }) => {
    return (
      <div>
        {[...Array(totalStars)].map((_, i) => (
          <Star
            key={i}
            filled={i < rating}
          />
        ))}
      </div>
    );
  };

export default StarRating;
