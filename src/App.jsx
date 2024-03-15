import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import useSound from "use-sound";

// Global Variables
var isDialogCompleted = false;

export default function App() {
  const dialogs = [
    "Loading...",
    "Click start to begin...",
    "Hai Lilin :>",
    "Ini aku, seseorang yang akhir-akhir ini selalu kamu panggil dengan sebutan 'koko'",
    "Tapi sekarang aku beda bentuk aja... Aku di tengah sini. See ? Sebagai slime",
    "Oke mungkin ini terlalu dramatis buatmu ya...",
    "Tapi inilah yang gabisa aku sampein dengan kata-kata secara langsung.",
    "Berawal dari interaksi kita di acara Ambassnya BINUS...",
    "Yang dimana hanya sekedar seorang ambass..",
    "yang bertanya ke panitia karena dia bingung kenapa internet BINUS lemot..",
    "Ahirnya panitia tersebut meninggalkan hape miliknya untuk membagikan internet sebagai alternatif internet BINUS yang lemot...",
    "Kalau dipikir-pikir..",
    "Awal dari sebuah cerita panjang itu susah ditebak ya ?",
    "Aku sendiri ga nyangka..", // Disini play. Index #13
    "Bisa sampai di titik ini hubunganku dengan kamu..",
    "Yang awalnya aku cuman nunjukin ke mamah...",
    "Mah.. Cantik ga ?",
    "Sambil nunjukin foto kita berdua di PVJ",
    "Cantik katanya.. Sambil nanya, 'Katolik ga ?'",
    "Aku bilang 'Iya dongse. Mau ma ?'",
    "Boleeeehhh katanya.",
    "Awalnya memang hanya sebuah awang-awang...",
    "Sampai di titik ini yang dimana aku bisa dapetin kamu.",
    "Aku ga tau apakah kamu orang yang tepat atau bukan...",
    "Tapi cinta bukan tentang menemukan orang yang tepat...",
    "tetapi bagaimana kita bisa menjadi orang yang tepat untuk satu sama lain.",
    "So. Kamu siap jaga komitmen dan jaga hati ?",
    "Makasih ya Lin.",
    "Mungkin pesenku lainnya aku sampein nanti sebelum aku pulang",
    "Makasih loh udah mau dengerin",
    "Dah itu aja :>",
    "*Villain Laugh*",
    "Nih bonus lagu ♪♪♪\n---Silakan cermati liriknya--\nWhen I look into your eyes\nIt's like watching the night sky\nOr a beautiful sunrise\nWell there's so much they hold\nAnd just like them old stars\nI see that you've come so far\nTo be right where you are\nHow old is your soul?\nWell, I won't give up on us\nEven if the skies get rough\nI'm giving you all my love\nI'm still looking up\nAnd when you're needing your space\nTo do some navigating\nI'll be here patiently waiting\nTo see what you find\n'Cause even the stars they burn\nSome even fall to the earth\nWe've got a lot to learn\nGod knows we're worth it\nNo, I won't give up\nI don't wanna be someone who walks away so easily\nI'm here to stay and make the difference that I can make\nOur differences they do a lot to teach us how to use the tools and gifts\nWe got yeah we got a lot at stake\nAnd in the end you're still my friend at least we did intend\nFor us to work we didn't break, we didn't burn\nWe had to learn, how to bend without the world caving in\nI had to learn what I got, and what I'm not\nAnd who I am\nI won't give up on us\nEven if the skies get rough\nI'm giving you all my love\nI'm still looking up\nI'm still looking up\nWell, I won't give up on us (no I'm not giving up)\nGod knows I'm tough (I am tough) he knows (I am loved)\nWe got a lot to learn (we're alive, we are loved)\nGod knows we're worth it (and we're worth it)\nI won't give up on us\nEven if the skies get rough\nI'm giving you all my love\nI'm still looking up",
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
  const [playBGM] = useSound("/sounds/bgm/Jason Mraz - I Won't Give Up.mp3", {
    volume: 1,
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
  const [playMidBGM] = useSound(
    "/sounds/bgm/Yu-Peng Chen, HOYO-MiX - Hanachirusato.mp3",
    {
      volume: 0.2,
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

    // Play Bonus Music
    if (dialogIndex == 31) {
      playBGM();
    }
    if (dialogIndex == 13) {
      playMidBGM();
    }

    // Condition for appearing NO button in last dialog
    if (dialogIndex == 25) {
      setNoBtnType("btn btn-danger");
    } else {
      setNoBtnType("btn btn-danger invisible");
    }

    // Condition for next dialog if not in the last index
    if (dialogIndex != dialogs.length - 1) {
      setDialogIndex(dialogIndex + 1);
      console.log(dialogIndex);
      playDialog();
    }
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
