import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Function to split text while preserving spaces
const splitTextWithSpaces = (text) => {
  return text.split('').map(char => char === ' ' ? '\u00A0' : char);
};

export const TypewriterEffect = ({ text, className }) => {
  const textRef = useRef(null);

  // Animation effect to simulate typing
  useEffect(() => {
    let index = 0;
    const typingInterval = 100; // Adjust typing speed here

    const type = () => {
      if (index <= text.length) {
        setTimeout(() => {
          if (textRef.current) {
            const spanElements = textRef.current.children;
            for (let i = 0; i < index; i++) {
              if (spanElements[i]) {
                spanElements[i].style.opacity = '1';
              }
            }
            index++;
            type(); // Continue typing
          }
        }, typingInterval); // Maintain typing speed
      }
    };

    type();
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      <p
        className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center inline-block whitespace-nowrap overflow-hidden"
        ref={textRef}
      >
        {splitTextWithSpaces(text).map((char, index) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }} // Sync delay with typing speed
            key={index}
            className="dark:text-white text-black inline-block"
          >
            {char}
          </motion.span>
        ))}
      </p>
    </div>
  );
};
