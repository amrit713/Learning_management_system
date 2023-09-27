import { create } from "zustand";

export type ModalType = "login" | "register" | "logout";

interface ModalStore {
  isOpen: boolean;
  type: ModalType | null;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  isOpen: false,
  type: null,
  onOpen: (type: ModalType) =>
    set({
      isOpen: true,
      type,
    }),

  onClose: () => set({ isOpen: false }),
}));
