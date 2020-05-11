import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    decrement,
    increment,
    incrementByAmount,
    incrementAsync,
    selectCount,
} from '../counter/counterSlice';


export function AnotherCounter() {
    const count = useSelector(selectCount);
    return (
        <div>
            The counter value: {count}
        </div>
    )

}
