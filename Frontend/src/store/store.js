import {compose,createStore,applyMiddleware} from "redux"
import { rootReducer } from "./root-reducer";

export const Store=createStore(rootReducer)