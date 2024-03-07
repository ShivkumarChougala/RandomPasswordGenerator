import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [char, setChar] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook

  const passRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number) str += "0123456789";
    if (char) str += "~`!@#$%^&*(){}[]";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // 1 bcoz it should not be started from 0
      pass += str.charAt(char); // when loop stop,char added in pass
    }

    setPassword(pass);
  }, [length, number, char, setPassword]);

  const copybtn = useCallback(() => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,9) if person wants to select min number of char
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, char, number, passwordGenerator]);

  return (
    <>
      <div
        className="    mt-56 w-full  max-w-lg mx-auto shadow-md rounded-lg  px-4  my-8 text-orange-500
       bg-gray-700"
      >
        <h1 className="text-white  text-center my-3">
          RandomPasswordGenerator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className=" outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passRef}
          />

          <button
            onClick={copybtn}
            className=" outline-none bg-blue-500 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className=" flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className=" cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>
          <div className=" flex  items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={number}
              id="numberInput"
              onChange={() => {
                setNumber((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                setChar((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
