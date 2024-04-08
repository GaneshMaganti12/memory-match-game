import { useEffect, useState } from "react";
import "./App.css";
import Cards from "./components/Cards/Cards";
import pikachu from "./assets/pikachu.png";
import blastoise from "./assets/blastoise.png";
import bulbasaur from "./assets/bulbasaur.png";
import caterpie from "./assets/caterpie.png";
import sandshrew from "./assets/sandshrew.png";
import slowbro from "./assets/slowbro.png";
import squirtle from "./assets/squirtle.png";
import chikorita from "./assets/chikorita.png";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

function App() {
  const data = [
    { name: "PIKACHU", imageUrl: pikachu, isMatched: false },
    { name: "BLASTOISE", imageUrl: blastoise, isMatched: false },
    { name: "BULBASAUR", imageUrl: bulbasaur, isMatched: false },
    { name: "CATERPIE", imageUrl: caterpie, isMatched: false },
    { name: "SANDSHREW", imageUrl: sandshrew, isMatched: false },
    { name: "SLOWBRO", imageUrl: slowbro, isMatched: false },
    { name: "SQUIRTLE", imageUrl: squirtle, isMatched: false },
    { name: "CHIKORITA", imageUrl: chikorita, isMatched: false },
  ];

  const [imagesList, setImagesList] = useState([]);
  const [choiceOne, setchoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [open, setOpen] = useState(false);
  const [moves, setMoves] = useState(0);

  const handleClose = () => setOpen(false);

  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (choiceOne.name === choiceTwo.name && choiceOne.id !== choiceTwo.id) {
        setImagesList(
          imagesList.map((ele) =>
            choiceOne.name === ele.name && choiceTwo.name === ele.name
              ? { ...ele, isMatched: true }
              : ele
          )
        );
        setChoiceTwo(null);
        setchoiceOne(null);
      } else {
        setTimeout(() => {
          setChoiceTwo(null);
          setchoiceOne(null);
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    setOpen(
      imagesList.length
        ? imagesList.every((item) => item.isMatched === true)
        : false
    );
  }, [choiceTwo]);

  const handleClick = (card) => {
    choiceOne ? setChoiceTwo(card) : setchoiceOne(card);
    setMoves((moves) => moves + 1);
  };

  const shuffleCards = () => {
    setImagesList(
      [...data, ...data]
        .sort(() => Math.random() - 0.5)
        .map((ele) => ({ ...ele, id: uuidv4() }))
    );
  };

  const resetGame = () => {
    shuffleCards();
    setChoiceTwo(null);
    setchoiceOne(null);
    setMoves(0);
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>Memory Game</h1>
        <button className="retry-button top" onClick={resetGame}>
          New Game
        </button>
      </div>
      <div className="bottom-container">
        <div className="card-container">
          {imagesList.map((ele) => (
            <Cards
              key={ele.id}
              data={ele}
              handleClick={handleClick}
              isFlip={ele === choiceOne || ele === choiceTwo || ele.isMatched}
            />
          ))}
        </div>
      </div>
      <button className="retry-button buttom" onClick={resetGame}>
        New Game
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-box">
          <h1 className="modal-title">Congratulations!!!</h1>
          <p className="modal-description">You won</p>
          <p className="modal-para">No of Moves : {moves / 2}</p>
          <button
            onClick={() => {
              resetGame();
              setOpen(false);
            }}
            className="modal-button"
          >
            Play Again?
          </button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
