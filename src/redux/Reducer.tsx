/* eslint-disable @typescript-eslint/no-explicit-any */
import { SET_PIN_MATCHED } from "./Actions";

// export type pinMatchedType = {
//     pinMatched: boolean;
// };

export const initState = {
    pinMatched: false
}

const reducer = (state = initState, action: any) => {
    switch (action.type) {
        case SET_PIN_MATCHED:
            return {
                ...state,
                pinMatched: action.payload
            }
        default:
            return state

    }
    
}

export default reducer

