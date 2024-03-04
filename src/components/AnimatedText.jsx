import { PropTypes } from "prop-types";
import { TypeAnimation } from "react-type-animation";

export default function AnimatedText({ string }) {
  // Prop validation using PropTypes
  AnimatedText.propTypes = {
    string: PropTypes.string.isRequired,
  };

  return (
    <TypeAnimation
      sequence={[{ string }, 1000]}
      wrapper="span"
      cursor={true}
      repeat={0}
      style={{ fontSize: "2em", display: "inline-block" }}
    />
  );
}
