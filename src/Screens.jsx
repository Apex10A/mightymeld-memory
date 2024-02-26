import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import * as icons from "react-icons/gi";
import { Tile } from "./Tile";
import Dark from "./moon 1.png";
import Light from "./brightness 1.png";

export const possibleTileContents = [
  icons.GiHearts,
  icons.GiWaterDrop,
  icons.GiDiceSixFacesFive,
  icons.GiUmbrella,
  icons.GiCube,
  icons.GiBeachBall,
  icons.GiDragonfly,
  icons.GiHummingbird,
  icons.GiFlowerEmblem,
  icons.GiOpenBook,
];

export function StartScreen({ start }) {
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // You can also save the current theme mode to local storage for persistence
  };

  useEffect(() => {
    // Update CSS variables or apply dark mode styles based on the selected theme mode
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <div className="">
      <div className="absolute ">
        <div className="flex items-center gap-5">
          <button className="flex items-center">
            <button
              className={`text-lg px-3 py-1 rounded-full transform translate-y-7 translate-x-7 ${
                darkMode
                  ? "bg-[#fff] text-[#000] rounded-full"
                  : "bg-[#1a202c] text-[#fff] px-5 py-2"
              }`}
              onClick={toggleDarkMode}
            >
              {darkMode ? (
                <img src={Dark} alt="" />
              ) : (
                <img src={Light} alt="" className="w-5 h-5" />
              )}
            </button>
          </button>
        </div>
      </div>
      <div className="flex h-[100vh] items-center lg:bg-transparent justify-center">
        <div className="block bg-[#FDF3F8] w-[360px] px-16 mx-3 sm:mx-0 rounded-xl py-20">
          <div className="pb-10 ">
            <h1 className="text-[#EC4899] lg:text-3xl text-3xl font-bold text-center pb-3">
              Memory
            </h1>
            <p className="text-[#EC4899] text-center">
              flip tiles over looking for pairs
            </p>
          </div>
          <button
            onClick={start}
            className=" bg-gradient-to-b from-[#e496bd] animate-pulse to-[#e73c91] rounded-3xl text-xl font-medium duration-300 ease-in-out w-[56%] mx-auto block text-white px-3 py-2"
          >
            Play
          </button>
        </div>
      </div>
    </div>
  );
}

export function PlayScreen({ end }) {
  const [tiles, setTiles] = useState(null);
  const [tryCount, setTryCount] = useState(0);
  const [shuffleCount, setShuffleCount] = useState(0);

  const getTiles = (tileCount) => {
    // Throw error if count is not even.
    if (tileCount % 2 !== 0) {
      throw new Error("The number of tiles must be even.");
    }

    // Use the existing list if it exists.
    if (tiles) return tiles;

    const pairCount = tileCount / 2;

    // Take only the items we need from the list of possibilities.
    const usedTileContents = possibleTileContents.slice(0, pairCount);

    // Double the array and shuffle it.
    const shuffledContents = usedTileContents
      .concat(usedTileContents)
      .sort(() => Math.random() - 0.5)
      .map((content) => ({ content, state: "start" }));

    setTiles(shuffledContents);
    return shuffledContents;
  };

  const flip = (i) => {
    // Is the tile already flipped? We don’t allow flipping it back.
    if (tiles[i].state === "flipped") return;

    // How many tiles are currently flipped?
    const flippedTiles = tiles.filter((tile) => tile.state === "flipped");
    const flippedCount = flippedTiles.length;

    // Don't allow more than 2 tiles to be flipped at once.
    if (flippedCount === 2) return;

    // On the second flip, check if the tiles match.
    if (flippedCount === 1) {
      setTryCount((c) => c + 1);

      const alreadyFlippedTile = flippedTiles[0];
      const justFlippedTile = tiles[i];

      let newState = "start";

      if (alreadyFlippedTile.content === justFlippedTile.content) {
        confetti({
          ticks: 100,
        });
        newState = "matched";
      }

      // After a delay, either flip the tiles back or mark them as matched.
      setTimeout(() => {
        setTiles((prevTiles) => {
          const newTiles = prevTiles.map((tile) => ({
            ...tile,
            state: tile.state === "flipped" ? newState : tile.state,
          }));

          // If all tiles are matched, the game is over.
          if (newTiles.every((tile) => tile.state === "matched")) {
            setTimeout(end, 0);
          }

          return newTiles;
        });
      }, 1000);
    }

    setTiles((prevTiles) => {
      return prevTiles.map((tile, index) => ({
        ...tile,
        state: i === index ? "flipped" : tile.state,
      }));
    });
  };
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    // You can also save the current theme mode to local storage for persistence
  };

  useEffect(() => {
    // Update CSS variables or apply dark mode styles based on the selected theme mode
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);
  return (
    <>
      <div className="flex items-center gap-5">
        <button className="flex items-center">
          <button
            className={`text-lg px-3 py-1 rounded-full transform translate-y-7 translate-x-7 ${
              darkMode
                ? "bg-[#fff] text-[#000] rounded-full"
                : "bg-[#1a202c] text-[#fff] px-5 py-2"
            }`}
            onClick={toggleDarkMode}
          >
            {darkMode ? (
              <img src={Dark} alt="" />
            ) : (
              <img src={Light} alt="" className="w-5 h-5" />
            )}
          </button>
        </button>
      </div>
      <div className=" mx-auto">
        <div className="flex h-[100vh] items-center justify-center ">
          <div className="">
            <div className="transform translate-y-[-30px]">
              <div className="flex gap-3 justify-between items-center mx-5">
              <div>
                <a
              className="text-xl bg-[#8c8ef7] text-[#fff] px-3 py-1 rounded-xl cursor-pointer"
              href="/"
            >
              Back
            </a>
                </div>
                <div className="flex gap-3 ">
                  <p className="text-xl font-semibold text-[#6466F1] pb-2">
                    Tries
                  </p>
                  <span className="bg-[#C7D2FF] font-semibold px-3 rounded-lg text-2xl text-[#4f52f4]">
                    {tryCount}
                  </span>
                </div>
                
              </div>
            </div>

            <div
              className={`grid grid-rows-4 grid-cols-4 gap-3  ${
                darkMode
                  ? "bg-[#47576f] px-5 mx-5 rounded-xl py-4"
                  : " bg-[#EEF2FF] mx-5 px-5 py-4 rounded-xl"
              }`}
            >
              {getTiles(16).map((tile, i) => (
                <Tile key={i} flip={() => flip(i)} {...tile} className="" />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mx-6 transform translate-y-[-120px]">
            
           
          </div>
        </div>
      </div>
    </>
  );
}
