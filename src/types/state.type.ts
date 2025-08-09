import { store } from "../rtk/api.store";

type State = ReturnType<typeof store.getState>;
export type {State}
