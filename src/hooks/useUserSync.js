import { useAuth } from "@clerk/clerk-react";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import api from "../lib/axios";

function useUserSync() {
  const { isSignedIn, getToken } = useAuth();

  const {
    mutate: syncUser,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async () => {
      console.log("Starting user sync...");
      const token = await getToken();
      const res = await api.post(
        "/auth/callback",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return res.data;
    },
    onSuccess: (data) => console.log("User sync successful:", data),
    onError: (error) => console.error("User sync failed:", error),
  });

  useEffect(() => {
    // Only attempt sync if signed in, not already syncing, not already succeeded, and not in an error state
    if (isSignedIn && !isPending && !isSuccess && !isError) {
      syncUser();
    }
  }, [isSignedIn, syncUser, isPending, isSuccess, isError]);

  return { isSynced: isSuccess, isSyncing: isPending, error: isError };
}
export default useUserSync;
