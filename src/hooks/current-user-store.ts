import getCurrentUser from "@/lib/getCurrentUser";

import { create } from "zustand";

export const useUserStore = create((set) => {
  return {
    queryUser: async () => {
      await getCurrentUser().then((user) => {
        set({ user });
      });
    },
  };
});
