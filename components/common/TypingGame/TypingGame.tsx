import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import useTypingGame from "react-typing-game-hook";

type TypingGameProps = {
  text: string;
};

const TypingGame = (props: TypingGameProps) => {
  const mainRef = useRef(null);
  const text = useMemo(() => props.text, [props.text]);
  const [duration, setDuration] = useState(0);
  const [currWordPos, setCurrWordPos] = useState([-1, -1]);
  const [estimatedWpm, setEstimatedWpm] = useState<number>();

  const {
    states: { charsState, phase, currIndex, correctChar, startTime, endTime },
    actions: { insertTyping, resetTyping, deleteTyping, getDuration },
  } = useTypingGame(text);

  const handleKey = useCallback((key: string) => {
    if (key === "Escape") {
      resetTyping();
    } else if (key === "Backspace") {
      deleteTyping(false);
    } else if (key.length === 1) {
      insertTyping(key);
    }
  }, []);

  useEffect(() => {
    mainRef.current.focus();
  }, [mainRef]); // focus div typing

  //set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      setDuration(Math.floor((endTime - startTime) / 1000));
      setCurrWordPos([-1, -1]);
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime]);

  useEffect(() => {
    const estimated = Math.round(
      ((60 / (getDuration() / 1000)) * correctChar) / 5
    );
    setEstimatedWpm(estimated);
  }, [currIndex]);

  //Set the start and end index of the next word
  useEffect(() => {
    const tempCurrIndex = text[currIndex] === " " ? currIndex + 1 : currIndex;
    let startIndex = text.lastIndexOf(" ", tempCurrIndex);
    startIndex = startIndex < 0 ? 0 : startIndex + 1;
    let endIndex = text.indexOf(" ", tempCurrIndex);
    endIndex = endIndex < 0 ? text.length - 1 : endIndex - 1;

    setCurrWordPos((oldcurrWordPos) => {
      if (startIndex !== oldcurrWordPos[0] || endIndex !== oldcurrWordPos[1]) {
        return [startIndex, endIndex];
      }
      return oldcurrWordPos;
    });
  }, [currIndex, text]);

  return (
    <div className="divide-y divide-gray-200">
      <div className="select-none py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7 text-center">
        <div
          ref={mainRef}
          className="p-8 rounded-xl focus:bg-primary-50 tracking-tighter focus:bg-gradient-to-r from-green-400 to-blue-500"
          onKeyDown={(e) => {
            handleKey(e.key);
            e.preventDefault();
          }}
          tabIndex={0}
          onBlur={(e) => {
            if (!e.currentTarget.contains((e as any).relatedTarget)) {
              mainRef.current.focus();
            }
          }}
        >
          {text.split("").map((char: string, index: number) => {
            let state = charsState[index];
            let colorClass =
              state === 0
                ? "black"
                : state === 1
                ? "text-primary-600"
                : "text-secondary-700";
            return (
              <span
                key={char + index}
                className={`${
                  currIndex === index
                    ? "border-blink border-primary-600"
                    : "border-transparent"
                } ${colorClass} border-r-2`}
              >
                {char}
              </span>
            );
          })}
        </div>
      </div>
      <div className="pt-6 text-center font-medium tracking-wider">
        {phase === 2 && startTime && endTime ? (
          <>
            <span className="text-green-500 mr-4">
              WPM: {Math.round(((60 / duration) * correctChar) / 5)}
            </span>
            <span className="text-blue-500 mr-4">
              Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
            </span>
            <span className="text-yellow-500 mr-4">Duration: {duration}s</span>
          </>
        ) : (
          <span className="text-green-500 mr-4">
            Estimated WPM: {estimatedWpm || 0}
          </span>
        )}
      </div>
    </div>
  );
};
export default TypingGame;
