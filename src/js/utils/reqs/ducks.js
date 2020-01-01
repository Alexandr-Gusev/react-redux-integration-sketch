import {abortReq} from "./core"

export const abort = reqKey => dispatch => {abortReq(reqKey, "aborted")}
