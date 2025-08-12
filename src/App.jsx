import { useState, useMemo } from "react";

export default function App() {
  const [text, setText] = useState("");
  const [tokens, setTokens] = useState([]);
  const [decodedText, setDecodedText] = useState("");

  // Store mappings in useMemo so they're preserved across tokenizations
  const [charToToken, setCharToToken] = useState({});
  const [tokenToChar, setTokenToChar] = useState({});

  const memoizedMappings = useMemo(() => {
    return { charToToken, tokenToChar };
  }, [charToToken, tokenToChar]);

  // Regex-based tokenizer
  const tokenize = (input) => {
    const parts = input.match(/\w+|\d+|[^\w\s]|\s+/g) || [];
    let c2t = { ...memoizedMappings.charToToken };
    let t2c = { ...memoizedMappings.tokenToChar };
    let currentId = Object.keys(c2t).length;

    const tokenized = parts.map((part) => {
      if (!(part in c2t)) {
        c2t[part] = currentId;
        t2c[currentId] = part;
        currentId++;
      }
      return c2t[part];
    });

    setCharToToken(c2t);
    setTokenToChar(t2c);
    setTokens(tokenized);
  };

  const decode = (tokenArray) => {
    const parts = tokenArray.map((t) => memoizedMappings.tokenToChar[t]);
    setDecodedText(parts.join(""));
  };

  return (
    <div className="p-6 min-h-screen bg-slate-100 text-slate-800 font-serif">
      <div className="max-w-2xl mx-auto rounded-sm shadow-lg p-6 border-2 border-slate-800">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Assignment-01 GenAI <br /> Tokenizer
        </h1>
        <p className="text-sm italic text-center mb-4 font-extralight">
          This is a very basic tokenizer project that splits text into words,
          numbers, symbols, and spaces.
        </p>

        <textarea
          className="w-full p-3 rounded-sm bg-slate-200 border border-slate-900/90 text-[#3b2f2f] focus:outline-none focus:ring focus:ring-slate-800"
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text here..."
        />

        <div className="flex gap-3 mt-4 justify-center">
          <button
            className="bg-slate-700/80 text-white px-5 py-2 rounded-sm hover:bg-slate-700 transition"
            onClick={() => tokenize(text)}
          >
            Tokenize
          </button>
          <button
            className="bg-slate-900/80 text-white px-5 py-2 rounded-sm hover:bg-slate-900 transition"
            onClick={() => decode(tokens)}
          >
            Decode
          </button>
        </div>

        <div className="mt-6">
          <h2 className="font-bold text-lg mb-1">Tokens:</h2>
          <p className="bg-slate-200 p-3 rounded-sm border border-slate-800 min-h-[50px]">
            {tokens.length ? tokens.join(" ") : "No tokens yet"}
          </p>
        </div>

        <div className="mt-4">
          <h2 className="font-bold text-lg mb-1">Decoded Text:</h2>
          <p className="bg-slate-200 p-3 rounded-sm border border-slate-800 min-h-[50px]">
            {decodedText || "No decoded text yet"}
          </p>
        </div>
      </div>
    </div>
  );
}
