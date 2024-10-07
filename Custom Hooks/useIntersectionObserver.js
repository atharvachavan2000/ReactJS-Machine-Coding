// A Custom Hook that observes when an element comes into the viewport
const options = {
  root: document.querySelector("#scrollArea"), // Element that should be considered as the view port => if "null" => Browser viewport is considered
  rootMargin: "0px", // Serves to grow or shrink the root element's bounding box - Can be given as CSS - Default is 0px all
  threshold: 1.0, // When to run? 1.0 = 100%, [0, 0.25, 0.5, 0.75, 1] = After every 25%, 0 = 1px
};

const observer = new IntersectionObserver(callback, options);

// ref = useRef of DOM element
const useIntersectionObserver = (ref, options) => {
  const [intersectionObserverEntry, setIntersectionObserverEntry] =
    useState(null);

  useEffect(() => {
    if (ref.current && typeof IntersectionObserver === "function") {
      const handler = (entries) => {
        setIntersectionObserverEntry(entries[0]);
      };

      const observer = new IntersectionObserver(handler, options);
      observer.observe(ref.current);

      return () => {
        setIntersectionObserverEntry(null);
        observer.disconnect();
      };
    }
  }, [ref, options]);

  return intersectionObserverEntry;
};

export default useIntersectionObserver;

// const intersectionEntry = useIntersectionObserver(ref, options);
// intersectionEntry?.isIntersecting
// intersectionEntry?.intersectionRatio
