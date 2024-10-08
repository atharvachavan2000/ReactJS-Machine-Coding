import { useEffect, useState } from "react";
import "./styles.css";
import ShimmerCard from "./components/ShimmerCard";
import MemeCard from "./components/MemeCard";

export default function App() {
  const [memes, setMemes] = useState(null);

  const fetchMemes = async () => {
    const res = await fetch(`https://meme-api.com/gimme/20`);
    const data = await res.json();
    setMemes(data.memes);
  };

  useEffect(() => {
    console.log("rendered")
    fetchMemes();
  }, []);

  return (
    <div className="App">
      <h4>The Land of Memes</h4>
      <div className="container">
        {!memes
          ? Array(15)
              .fill(0)
              .map((_, idx) => {
                return <ShimmerCard key={idx} />;
              })
          : memes.map((meme, i) => {
              return <MemeCard key={i} meme={meme} />;
            })}
      </div>
    </div>
  );
}
