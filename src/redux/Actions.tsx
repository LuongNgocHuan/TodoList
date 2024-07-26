

export const SET_PIN_MATCHED = 'set_pin_matched'

export const setPinMatched = (pinMatched:boolean) => ({
    type: SET_PIN_MATCHED,
    payload: pinMatched
})