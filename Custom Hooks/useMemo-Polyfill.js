/**
 *  Actual Usage
 */

const cachedValue = useMemo(
  () => {
    // do somthing
    return null; // return calculated value
  },
  [
    /* dependency array */
  ]
);

// POLYFILL

const useMemoCustom = (calculateValue, deps) => {
  const value = useRef(null);
  const prevDeps = useRef(null);

  // Better version: !deps.every((dep, i) => Object.is(dep, prevDeps.current[i]))
  const haveDepsChanged = deps
    ? JSON.stringify(prevDeps) === JSON.stringify(deps)
    : true;

  if (!value || haveDepsChanged) {
    value.current = calculateValue();
  }
  prevDeps.current = deps;

  // cleanup logic => Unused refs to be clear on unmounting
  useEffect(() => {
    return () => {
      value.current = null;
      prevDeps.current = null;
    };
  }, []);

  return value.current;
};
