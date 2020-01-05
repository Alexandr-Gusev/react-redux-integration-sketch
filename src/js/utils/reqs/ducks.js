import {abortReq} from "./core"

export const abort = reqKey => () => {abortReq(reqKey, "aborted")}
