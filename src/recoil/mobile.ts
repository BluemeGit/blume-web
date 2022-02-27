import { atom } from "recoil";

const mobile = atom({
    key: 'mobile', // unique ID (with respect to other atoms/selectors)
    default: true, // default value (aka initial value)
});

export default mobile;