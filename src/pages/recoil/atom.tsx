// atom.js
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

let countState = atom({
    key: "counter", // unique ID (with respect to other atoms/selectors)
    default: 0, // default value (aka initial value)
    effects_UNSTABLE: [persistAtom],
});

let inputState = atom({
    // 기존에서 추가된 아톰.
    key: "input",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});

let userState = atom({
    key: "user",
    default: {},
    effects_UNSTABLE: [persistAtom],
});

export { countState, inputState, userState };
