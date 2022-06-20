import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

const mobile = atom({
    key: "mobile", // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

export default mobile;
