const useTraverseTree = () => {
    // DFS Algorithm to Traverse Tree
    // TODO: Can be optimized using DP. How?
    function insertNode(tree, folderId, item, isFolder) {
      if (tree.id === folderId && tree.isFolder) {
        tree.items.unshift({
          id: new Date().getTime(),
          name: item,
          isFolder: isFolder,
          items: [],
        });
      }
  
      let latestNode = [];
      latestNode = tree.items.map((obj) => {
        return insertNode(obj, folderId, item, isFolder);
      });
  
      return { ...tree, items: latestNode };
    }
  
    // TODO: deleteNode
    // TODO: updateNode
    return { insertNode };
  };
  
  export default useTraverseTree;
  