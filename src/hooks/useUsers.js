import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import api from "../lib/axios";

export const useUsers = (search = "") => {
  const { getToken } = useAuth();

  return useQuery({
    queryKey: ["users", search],
    queryFn: async () => {
      const token = await getToken();
      const res = await api.get("/users", {
        params: { search },
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    },
    enabled: true,
  });
};
