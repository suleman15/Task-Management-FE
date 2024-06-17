import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
interface UserState {
  user: any | null;
  login: (data: any) => void;
}

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (data: any) => set({ user: data }),
      }),
      {
        name: "user", // name of the item in the storage (must be unique)
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
