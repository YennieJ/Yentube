import { atom, RecoilEnv } from "recoil";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;
export const pageState = atom({
  key: "pageState", // 전역적으로 고유한 값
  default: 0, // 초깃값
});

export const searchModalState = atom({
  key: "searchModalState", // 전역적으로 고유한 값
  default: false, // 초깃값
});
