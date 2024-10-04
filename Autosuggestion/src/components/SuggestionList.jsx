const SuggestionList = ({
  suggestions = [],
  highlight,
  itemKey,
  onSuggestionClick,
  selectedIndex,
}) => {
    //TODO: Add highlight
  return (
    <>
      {suggestions.map((suggestion, index) => {
        const currSuggestion = itemKey ? suggestion[itemKey] : suggestion;
        return (
          <li
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="suggestion"
            onMouseDown={(e) => e.preventDefault()}
            id={`suggestion-${index}`}
            role="option"
            aria-selected={selectedIndex === index}
          >
            {currSuggestion}
          </li>
        );
      })}
    </>
  );
};

export default SuggestionList;
