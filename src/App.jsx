import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { ReactTyped } from "react-typed";

export default function App() {
  const dialogs = [
    "Ah udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udah",
    "Sekarang ini dialog 2",
    "Selanjutnya ini dialog 3",
    "Dah beres bang",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [chatBubbleVisible, setChatBubbleVisible] = useState("");

  const handleClickNext = () => {
    if (dialogIndex != dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    }
  };

  const handleAnimationBegin = () => {
    setBtnDisabled(true);
    setChatBubbleVisible("visible");
  };

  const handleAnimationCompleted = () => {
    setBtnDisabled(false);
    setChatBubbleVisible("invisible");
  };

  return (
    <>
      {/* Background Components */}
      <div className="altar-container">
        <img src="src/assets/Terrain.gif" className="background-image" />
        <img src="src/assets/slime-11.gif" className="slime img-fluid" />
        <img
          src="src/assets/ChatEmote.gif"
          className={chatBubbleVisible}
          id="chat-bubble"
        />
      </div>

      {/* End of Background Components*/}
      <div className="container-fluid overlay-content">
        {/* Animated Text Components */}
        <div className="row">
          <img className="img-fluid" src="/src/assets/speech_bubble_top.png" />
        </div>
        <div className="row cs-container-dialog dialog-custom-margin animated-text-background">
          <ReactTyped
            strings={[dialogs[dialogIndex]]}
            typeSpeed={40}
            className="overflow-auto"
            onBegin={handleAnimationBegin}
            onComplete={handleAnimationCompleted}
          />
        </div>
        <div
          className="animated-text-background cs-container-dialog dialog-custom-margin"
          id="button-section">
          <button
            className="btn btn-primary m-2 justify-content-end"
            disabled={btnDisabled}
            onClick={handleClickNext}>
            NEXT
          </button>
        </div>
        <div className="row">
          <img
            className="img-fluid"
            src="/src/assets/speech_bubble_bottom.png"
          />
        </div>
      </div>
    </>
  );
}
