import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDeboune";
import SuggestionList from "./SuggestionList";
import useCache from "../hooks/useCache";

const Autocomplete = ({
  placeholder = "Enter Recipe",
  staticData,
  fetchSuggestions,
  itemKey = "name",
  customLoading = () => <>Loading...</>,
  onSelect = () => {},
  onBlur,
  onFocus,
  customStyles = {},
  caching = true,
}) => {
  const [inputValue, setInputValue] = useState("");
  const debouncedInputVal = useDebounce(inputValue, 400);

  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setCache, getCache } = useCache("autoComplete", 3600);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const getSuggestions = async (query) => {
    setError(null);

    const cachedSuggestions = getCache(query);

    if (cachedSuggestions && caching) {
      setSuggestions(cachedSuggestions);
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      let result;
      if (staticData) {
        result = staticData.filter((item) =>
          item.toLowerCase().includes(query.toLowerCase())
        );
      } else if (fetchSuggestions) {
        result = await fetchSuggestions(query);
      }
      setSuggestions(result);
      setCache(query, result);
    } catch (error) {
      setError("Failed to fetch suggestions");
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedIndex(-1);
    getSuggestions(debouncedInputVal);
  }, [debouncedInputVal]);

  handleSuggestionClick = (suggestion) => {
    setInputValue(itemKey ? suggestion[itemKey] : suggestion);
    onSelect(suggestion);
    setSuggestions([]);
  };

  // TODO: Handle scroll into view whichever is aria-selected
  const handlekeyDown = (event) => {
    switch (event.key) {
      case "ArrowDown":
        setSelectedIndex((cur) => (cur + 1) % suggestions.length);
        break;
      case "ArrowUp":
        setSelectedIndex(
          (cur) => (cur - 1 + suggestions.length) % suggestions.length
        );
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length)
          handleSuggestionClick(suggestions[selectedIndex]);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder={placeholder}
        onBlur={onBlur}
        onFocus={onFocus}
        style={customStyles}
        aria-autocomplete="list"
        aria-controls="suggestions-list"
        aria-activedescendant={`suggestion-${selectedIndex}`}
        onKeyDown={handlekeyDown}
      />

      {(suggestions.length > 0 || error || loading) && (
        <ul className="suggestions-list" role="listbox">
          {error && <div className="error">{error}</div>}
          {loading && <div className="loading">{customLoading}</div>}
          <SuggestionList
            itemKey={itemKey}
            suggestions={suggestions}
            onSuggestionClick={handleSuggestionClick}
            selectedIndex={selectedIndex}
          />
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
