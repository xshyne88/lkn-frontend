import React from "react";
import { useHistory, useLocation } from "react-router";

export const useNavigate = () => {
  const history = useHistory();
  const currentLocation = useLocation();

  return (getPathname) => {
    const pathname = getPathname(currentLocation);

    history.push(pathname);
  };
};

export function usePrevious(value) {
  const ref = React.useRef();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
