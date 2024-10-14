import { DependencyList, EffectCallback, useEffect } from "react";

export const useDebouncedEffect = (effect: EffectCallback, delay: number, deps?: DependencyList) => {
  useEffect(() => {
    const handler = setTimeout(() => effect(), delay);

    return () => clearTimeout(handler);
    // usin || because ts complains about deps, if its optional it can be undefined
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...(deps || []), delay]);
};
