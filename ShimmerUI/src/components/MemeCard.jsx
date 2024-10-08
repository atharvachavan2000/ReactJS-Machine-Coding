const MemeCard = ({ meme }) => {
  return (
    <div className="meme">
      <img className="meme__image" src={meme.url} alt={meme.title} />
      <div className="meme__title">{meme.title}</div>
    </div>
  );
};

export default MemeCard;
