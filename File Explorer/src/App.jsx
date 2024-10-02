import { useState } from "react";
import "./styles.css";
import Folder from "./components/Folder.jsx";
import data from "./data/folderData";
import useTraverseTree from "./hooks/use-traverse-tree";

function App() {
  const [explorerData, setExplorerData] = useState(data);

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (...args) => {
    const finalTree = insertNode(explorerData, ...args);
    setExplorerData(finalTree);
  };

  return (
    <div className="App">
      <Folder explorer={explorerData} handleInsertNode={handleInsertNode} />
    </div>
  );
}

export default App;
