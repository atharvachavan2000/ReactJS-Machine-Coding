/**
 *  Actual Usage
 */

useEffect(
  () => {
    // do somthing

    return () => {
      // return a cleanup function
    };
  },
  [
    /* dependency array */
  ]
);

// POLYFILL

const useEffectCustom = (effect, deps) => {
  if (
    typeof effect !== "function" ||
    !(Array.isArray(deps) || deps === "undefined")
  ) {
    throw new Error("Invalid Arguements");
  }

  const isFirstRender = useRef(true);
  const prevDeps = useRef([]);

  if (isFirstRender.current) {
    effect(); // will return clean up function => To be executed on unMounting
    isFirstRender.current = false;
    prevDeps.current = deps;
    return;
  }

  // Better way to compare deps => !deps.every((dep, i) => Object.is(dep, prevDeps.current[i]))
  const haveDepsChanged = deps
    ? JSON.stringify(prevDeps) === JSON.stringify(deps)
    : true;

  if (haveDepsChanged) {
    effect(); // will return clean up function => To be executed on unMounting
    prevDeps.current = deps;
  }
};
