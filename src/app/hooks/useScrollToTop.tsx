import React from "react";
import { useHistory, useLocation } from "react-router-dom";

export function useScrollToTop() {
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    return history.listen(() => {
      if (
        history.location.pathname.indexOf("/project") === -1 &&
        location.hash === ""
      ) {
        setTimeout(() => {
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        }, 5);
      }
    });
  }, [history]);

  return null;
}
