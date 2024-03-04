import { useState, useEffect } from "react";
import { PropTypes } from "prop-types";

function Typewriter({ text, delay = 75 }) {
  Typewriter.propTypes = {
    text: PropTypes.string.isRequired,
    delay: PropTypes.isRequired,
  };
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setCurrentText(text.substring(0, i + 1));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, delay);

    return () => clearInterval(typingInterval);
  }, [text, delay]);

  return (
    <div className="typewriter">
      {isTyping && <span className="cursor">|</span>}
      {currentText}
    </div>
  );
}

export default Typewriter;
