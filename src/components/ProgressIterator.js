import { useState, useEffect } from 'react';

/* props

  seconds = Number, speed of animation from start to completion (Optional)

  paginateArr = Array, returns the currentIndex of the array. When the animation is completed, the currentIndex is updated and returned. Automatically cycles the array. (Optional)

*/

/* Available in Children

  percent = percentage of animation completed 
  currentIndex = current index of the array passed through props. 

*/
const ProgressIterator = ({ seconds, paginateArr, children }) => {
  const [percent, setPercent] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const iterate = () => {
    if (paginateArr && (typeof [] === 'object') && paginateArr.length >= 1) {
      if (percent >= 100) {
        if (currentIndex >= (paginateArr.length - 1)) {
          setCurrentIndex(0);
          setPercent(0);
        } else {
          setCurrentIndex(currentIndex + 1);
          setPercent(0);
        }
      } else {
        setPercent(percent + 1);
      }
    } else {
      if (percent >= 100) {
        setPercent(0);
      } else {
        setPercent(percent + 1);
      }
    }
  };

  const mSeconds = (seconds * 1000) / 100;
  useEffect(() => {
    const timer = setInterval(() => {
      iterate();
    }, mSeconds || 50);
    return () => {
      clearInterval(timer);
    };
  });

  if (paginateArr && (typeof [] === 'object') && paginateArr.length >= 1) {
    return children({ percent, currentIndex });
  }
  return children({ percent });
};

export default ProgressIterator;