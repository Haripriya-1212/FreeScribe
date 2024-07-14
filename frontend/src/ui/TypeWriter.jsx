import React, { useEffect, useRef, useState } from 'react';
import { motion, stagger, useAnimate, useInView } from 'framer-motion';

// Function to split text while preserving spaces
const splitTextWithSpaces = (text) => {
  return text.split('').map(char => char === ' ' ? '\u00A0' : char);
};

export const TypewriterEffect = ({ text, className, cursorClassName }) => {
  // Split text into array of characters, preserving spaces
  const textArray = splitTextWithSpaces(text);

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.offsetWidth;
      setCursorPosition(textWidth);
    }
  }, [text]);

  useEffect(() => {
    if (isInView) {
      animate(
        'span',
        {
          display: 'inline-block',
          opacity: 1,
          width: 'fit-content',
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: 'easeInOut',
        }
      );
    }
  }, [isInView]);

  // Update cursor position on each frame
  useEffect(() => {
    const updateCursorPosition = () => {
      if (cursorRef.current && textRef.current) {
        const textWidth = textRef.current.offsetWidth;
        const cursorWidth = cursorRef.current.offsetWidth;
        const cursorOffset = textWidth - cursorWidth;
        setCursorPosition(cursorOffset);
      }
    };

    updateCursorPosition();
    window.addEventListener('resize', updateCursorPosition);

    return () => {
      window.removeEventListener('resize', updateCursorPosition);
    };
  }, [text]);

  return (
    <div className={`relative ${className}`}>
      <p
        className="text-base sm:text-xl md:text-3xl lg:text-5xl font-bold text-center inline-block"
        ref={textRef}
      >
        {textArray.map((char, index) => (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            key={index}
            className="dark:text-white text-black inline-block"
          >
            {char}
          </motion.span>
        ))}
      </p>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
        className={`absolute bottom-0 rounded-sm w-[4px] h-4 md:h-6 lg:h-10 bg-blue-600 ${cursorClassName}`}
        style={{ 
          left: cursorPosition, 
          transform: 'translateX(0)', 
          transition: 'left 0.1s ease-in-out'
        }}
        ref={cursorRef}
      ></motion.span>
    </div>
  );
};
