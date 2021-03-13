import { createStore,combineReducers, applyMiddleware} from "redux";
import { Reducers } from "./Reducers";
import thunk from "redux-thunk";
import React from 'react';

export const store = createStore(
    Reducers,applyMiddleware(thunk)
)