
import React from 'react'
import { Star } from 'lucide-react';

const RatingTestimonial = ({rating}) => {
    const stars = new Array(rating).fill(0)
    
  return (
    <>
      {stars.map((index, star) => (
        <Star key={star} size={20} color="gold" />
      ))}
    </>
  );
}

export default RatingTestimonial