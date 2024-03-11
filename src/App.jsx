import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import useSound from "use-sound";

// Harus coba imagenya jadiin cloud

export default function App() {
  const randomNumberInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const dialogs = [
    "Loading...",
    "Click start to begin...",
    "Ah udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udah",
    "Sekarang ini dialog 2",
    "Selanjutnya ini dialog 3",
    "Dah beres bang",
  ];
  let imgs = [
    "https://github.com/ArdynIzunia15/dialog-system/blob/main/src/assets/Terrain.gif?raw=true",
    "https://github.com/ArdynIzunia15/dialog-system/blob/main/src/assets/slime-11.gif?raw=true",
    "https://github.com/ArdynIzunia15/dialog-system/blob/main/src/assets/speech_bubble_top.png?raw=true",
    "https://github.com/ArdynIzunia15/dialog-system/blob/main/src/assets/speech_bubble_bottom.png?raw=true",
    "https://github.com/ArdynIzunia15/dialog-system/blob/main/src/assets/ChatEmote.gif?raw=true",
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
    // /sounds/Click1.WAV
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
          src={imgs[0]}
          className="background-image"
          onLoad={handleBackgroundOnLoad}
        />
        <img src={imgs[1]} className="slime img-fluid" />
        <img src={imgs[4]} className={chatBubbleVisible} id="chat-bubble" />
      </div>

      {/* End of Background Components*/}
      <div className="container-fluid overlay-content">
        {/* Animated Text Components */}
        <div className="row">
          <img className="img-fluid" src={imgs[2]} />
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
          <img className="img-fluid" src={imgs[3]} />
        </div>
      </div>
    </>
  );
}
