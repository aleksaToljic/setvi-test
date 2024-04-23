import { Stack } from "@mui/material";
import { useAsyncError, useRouteError } from "react-router-dom";

/**
 * Error component that we show instead of breaking the page
 * TODO add some back to homepage button, and contact the support, etc.
 */
export function ErrorElement() {
  const asyncError = useAsyncError();
  const error = useRouteError();
  return (
    <Stack>
      <p>Lazy devs here! </p>
      <p>Here is the error, figure it out yourself:</p>
      <p>{JSON.stringify(error || asyncError)}</p>
    </Stack>
  );
}
