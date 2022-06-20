import { selector } from "recoil";
import { countState, inputState } from "../../recoil/atom";

const countStateSelector = selector({
    key: "CountState",

    get: ({ get }) => {
        const inputVal = get(inputState);
        const count = get(countState);

        return `추가된 카운트는 ${inputVal}이고, 현재 카운트는 ${count}입니다.`;
    },
});

export default countStateSelector;
