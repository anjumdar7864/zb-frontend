import { useEffect, useRef } from "react";

function useEffectWithDependency(effect, dependency = []) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Check if it's not the first render
    if (!isFirstRender.current) {
      effect();
    } else {
      isFirstRender.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependency]);
}

export default useEffectWithDependency;
