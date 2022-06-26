import { atom } from "recoil";

export const imageState = atom({
  key: "imageState",
  default: true,
});
export const searchState = atom({
  key: "searchState",
  default: null,
});
