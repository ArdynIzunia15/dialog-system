import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import useSound from "use-sound";

// Global Variables
var isDialogCompleted = false;
var totalBGM = 2;

export default function App() {
  const dialogs = [
    "Loading...",
    "Click start to begin...",
    "Ah udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udahAh udah",
    "Sekarang ini dialog 2",
    "Selanjutnya ini dialog 3",
    "Dah beres bang",
  ];
  const noVariants = [
    "GAK",
    "Yakin engga?",
    "Beneran nihhh?",
    "Nanges nih :(",
    "GABOLE PENCET >:(",
  ];
  const [dialogIndex, setDialogIndex] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [btnNoDisabled, setBtnNoDisabled] = useState(false);
  const [chatBubbleVisible, setChatBubbleVisible] = useState("");
  const [mainBtnText, setMainBtnText] = useState("Loading...");
  const [mainBtnType, setMainBtnType] = useState(
    "btn btn-secondary m-2 justify-content-end"
  );

  const [noBtnType, setNoBtnType] = useState("btn btn-danger invisible");

  // Sounds and Media
  const [playClick] = useSound("/sounds/Click2.WAV");
  const [bgmIndex, setBgmIndex] = useState(0);
  const [playBGM] = useSound("/sounds/bgm/bgm" + bgmIndex + ".mp3", {
    volume: 0.1,
    onend: () => {
      playNextBGM();
    },
  });
  const [playAmbience] = useSound("/sounds/Ambience.mp3", {
    loop: true,
    volume: 0.2,
  });
  const [playDialog] = useSound(
    "/sounds/dialogs/dialog" + dialogIndex + ".wav",
    {
      onend: () => {
        isDialogCompleted = true;
        handleAnimationCompleted();
      },
    }
  );

  const [noCounter, setNoCounter] = useState(0);

  const handleClickNext = () => {
    // Play Sound
    playClick();
    // Condition for starting the dialog
    if (dialogIndex == 1) {
      setMainBtnText("NEXT");
      setMainBtnType("btn btn-primary m-2 justify-content-end");
      setDialogIndex(dialogIndex + 1);
      playDialog();
      playAmbience();
    }

    // Condition for appearing NO button in last dialog
    if (dialogIndex == dialogs.length + 1) {
      setNoBtnType("btn btn-danger");
    }

    // Condition for next dialog if not in the last index
    if (dialogIndex != dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
      console.log(dialogIndex);
      playDialog();
    }
  };

  const playNextBGM = () => {
    if (bgmIndex == totalBGM - 1) {
      setBgmIndex(0);
    } else {
      setBgmIndex(bgmIndex + 1);
    }
    console.log("Beres bang");
    console.log("bgmIndex : " + bgmIndex);
    playBGM();
  };

  const handleAnimationBegin = () => {
    setBtnDisabled(true);
    setChatBubbleVisible("visible");
  };

  const handleAnimationCompleted = () => {
    if (dialogIndex == 1) {
      setBtnDisabled(false);
    }
    if (dialogIndex == dialogs.length - 1) {
      if (isDialogCompleted) {
        setBtnDisabled(true);
        setChatBubbleVisible("invisible");
        isDialogCompleted = false;
      }
      setNoBtnType("btn btn-danger");
    } else {
      if (isDialogCompleted) {
        setBtnDisabled(false);
        setChatBubbleVisible("invisible");
        isDialogCompleted = false;
      }
    }
  };

  const handleBackgroundOnLoad = () => {
    // Beres load background
    setMainBtnText("START");
    setMainBtnType("btn btn-success m-2 justify-content-end");
    setDialogIndex(dialogIndex + 1);
    setBtnDisabled(false);
  };

  function handleNoButton() {
    console.log("noCounter : " + noCounter);
    if (noCounter != noVariants.length - 1) {
      setNoCounter(noCounter + 1);
    } else {
      setBtnNoDisabled(true);
    }
  }

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
        {/* End of Animated Text Components */}
        {/* Button Section */}
        <div
          className="animated-text-background cs-container-dialog dialog-custom-margin"
          id="button-section">
          <button
            className={mainBtnType}
            disabled={btnDisabled}
            onClick={handleClickNext}>
            {mainBtnText}
          </button>
          <button
            className={noBtnType}
            onClick={() => handleNoButton()}
            disabled={btnNoDisabled}>
            {noVariants[noCounter]}
          </button>
        </div>
        {/* End of Button Section */}
        <div className="row">
          <img className="img-fluid" src="/media/speech_bubble_bottom.png" />
        </div>
      </div>
    </>
  );
}
