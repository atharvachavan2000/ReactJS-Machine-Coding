import Autocomplete from "./components/Autocomplete";
import "./styles.css";

export default function App() {
  const fetchSuggestions = async (query) => {
    const response = await fetch(
      `https://dummyjson.com/recipes/search?q=${query}`
    );
    if (!response.ok) {
      throw new Error("Network Response was not ok");
    }
    const result = await response.json();
    return result.recipes;
  };

  return (
    <div className="App">
      <h1>Autosuggestion Component</h1>
      <Autocomplete
        placeholder="Enter Recipe"
        fetchSuggestions={fetchSuggestions}
        itemKey="name"
        customLoading={<>Loading...</>}
        onSelect={() => {}}
        customStyles={{}}
        caching={true}
      />
    </div>
  );
}
