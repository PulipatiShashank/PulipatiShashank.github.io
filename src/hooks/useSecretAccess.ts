import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SECRET_WORD = "shashank";

export function useSecretAccess(path = "/edit") {
  const navigate = useNavigate();

  useEffect(() => {
    let buffer = "";
    let resetTimer: number | undefined;

    const onKeyDown = (e: KeyboardEvent) => {
      // Ctrl + Shift + E (or Cmd + Shift + E on Mac)
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === "e") {
        e.preventDefault();
        navigate(path);
        return;
      }

      // Don't capture when typing in inputs
      const tag = (e.target as HTMLElement | null)?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea") return;

      if (e.key.length === 1 && /[a-z]/i.test(e.key)) {
        buffer = (buffer + e.key.toLowerCase()).slice(-SECRET_WORD.length);
        window.clearTimeout(resetTimer);
        resetTimer = window.setTimeout(() => (buffer = ""), 1500);
        if (buffer === SECRET_WORD) {
          buffer = "";
          navigate(path);
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(resetTimer);
    };
  }, [navigate, path]);
}
