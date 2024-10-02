import { useState } from "react";

function Folder({ explorer, handleInsertNode }) {
  const [expand, setExpand] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false,
  });

  function handleAddNew(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
    // Handle Folder Addition Logic
  }

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
      setShowInput({
        ...showInput,
        visible: false,
      });
    }
  };

  // TODO: Add icon to show expanded / collapsed state
  if (explorer.isFolder) {
    return (
      <>
        <div className="folder" onClick={() => setExpand(!expand)}>
          📁 {explorer.name}
          <div className="action-btns">
            <button onClick={(e) => handleAddNew(e, true)}>Add Folder</button>
            <button onClick={(e) => handleAddNew(e, false)}>Add File</button>
          </div>
        </div>
        <div
          className="folder-content"
          style={{ display: expand ? "block" : "none" }}
        >
          {showInput.visible && (
            <div className="input-container">
              <span>{showInput.isFolder ? "📁" : "📄"}</span>
              <input
                autoFocus
                type="text"
                onBlur={() =>
                  setShowInput({
                    ...showInput,
                    visible: false,
                  })
                }
                onKeyDown={onAddFolder}
              ></input>
            </div>
          )}
          {explorer.items.map((item) => {
            return (
              <Folder
                explorer={item}
                key={item.id}
                handleInsertNode={handleInsertNode}
              />
            );
          })}
        </div>
      </>
    );
  } else {
    return <div className="file">📄 {explorer.name}</div>;
  }
}

export default Folder;
