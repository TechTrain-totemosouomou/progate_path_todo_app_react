import { useRouteError } from "react-router-dom";

export function ErrorFallback() {
  const error = useRouteError();
  console.error(error);
  return (
    <div role="alert">
      <h2>Ooops, something went wrong!</h2>
      <button onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
}
