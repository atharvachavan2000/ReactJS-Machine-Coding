const Pill = ({ image, text, handleClick }) => {
  return (
    <span className="pill" onClick={handleClick}>
      <img src={image} alt={text} />
      <span> {text} </span>
    </span>
  );
};

export default Pill;
