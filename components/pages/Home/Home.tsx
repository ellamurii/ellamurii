import Main from "../../layouts/Main";
import randomWords from "random-words";
import TypingGame from "../../common/TypingGame";
import { useEffect, useState } from "react";

const RW_OPTIONS = { exactly: 25, join: " " };
const Home = () => {
  const [text, setText] = useState("");
  const onNewGameHandler = () => setText(randomWords(RW_OPTIONS));

  useEffect(() => {
    setText(randomWords(RW_OPTIONS));
  }, []);

  return (
    <Main title="Home">
      <div className="h-full bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        <div className="relative py-3 sm:max-w-3xl sm:mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="grid justify-items-end">
              <button
                onClick={onNewGameHandler}
                className="bg-purple-600 text-white text-base font-medium py-2 px-4 rounded-lg shadow-md hover:bg-primary-700"
              >
                New Game
              </button>
            </div>
            <div className="max-w-3xl mx-auto">
              <TypingGame text={text} />
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
};
export default Home;
