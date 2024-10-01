import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

export const LoginRegisterSkeleton = () => {
  return (
    <Stack alignItems="center" justifyContent="center" height="100vh">
      <CircularProgress size="5rem" />
    </Stack>
  );
};
