import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import useSound from "use-sound";

// Global Variables

export default function App() {
  const dialogs = [
    "Loading...",
    "Click start to begin...",
    "Ah udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udah",
    "Sekarang ini dialog 2",
    "Selanjutnya ini dialog 3",
    "Dah beres bang",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [chatBubbleVisible, setChatBubbleVisible] = useState("");
  const [mainBtnText, setMainBtnText] = useState("Loading...");
  const [mainBtnType, setMainBtnType] = useState(
    "btn btn-secondary m-2 justify-content-end"
  );
  const [playClick] = useSound("/sounds/Click2.WAV");

  const handleClickNext = () => {
    // Play Sound
    playClick();
    if (dialogIndex == 1) {
      setMainBtnText("NEXT");
      setMainBtnType("btn btn-primary m-2 justify-content-end");
      setDialogIndex(dialogIndex + 1);
    }
    if (dialogIndex != dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
    }
  };

  const handleAnimationBegin = () => {
    setBtnDisabled(true);
    setChatBubbleVisible("visible");
  };

  const handleAnimationCompleted = () => {
    if (dialogIndex == dialogs.length - 1) {
      setBtnDisabled(true);
      setChatBubbleVisible("invisible");
    } else {
      setBtnDisabled(false);
      setChatBubbleVisible("invisible");
    }
  };

  const handleBackgroundOnLoad = () => {
    // Beres load background
    setMainBtnText("START");
    setMainBtnType("btn btn-success m-2 justify-content-end");
    setDialogIndex(dialogIndex + 1);
    setBtnDisabled(false);
  };

  return (
    <>
      {/* Background Components */}
      <div className="altar-container">
        <img
          src="/media/Terrain.gif"
          className="background-image"
          onLoad={handleBackgroundOnLoad}
        />
        <img src="/media/slime-11.gif" className="slime img-fluid" />
        <img
          src="/media/ChatEmote.gif"
          className={chatBubbleVisible}
          id="chat-bubble"
        />
      </div>

      {/* End of Background Components*/}
      <div className="container-fluid overlay-content">
        {/* Animated Text Components */}
        <div className="row">
          <img className="img-fluid" src="/media/speech_bubble_top.png" />
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
            className={mainBtnType}
            disabled={btnDisabled}
            onClick={handleClickNext}>
            {mainBtnText}
          </button>
        </div>
        <div className="row">
          <img className="img-fluid" src="/media/speech_bubble_bottom.png" />
        </div>
      </div>
    </>
  );
}
