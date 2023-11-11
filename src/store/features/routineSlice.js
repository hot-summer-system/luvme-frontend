import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    description: '',
    dateReminder: '08:00 AM',
    routingProductRequests: [],
}
const routineSlice = createSlice({
    name: 'routine',
    initialState: initialState,
    reducers: {
        setDescription: (state, action) => {
            state.description = action.payload;
        },
        setDateReminder: (state, action) => {
            state.dateReminder = action.payload;
        },
        addProductToRequests: (state, action) => {
            state.routingProductRequests.push(action.payload);
        },
        removeProductFromRequests: (state, action) => {
            const productIdToRemove = action.payload;
            state.routingProductRequests = state.routingProductRequests.filter(
                (product) => product.productId !== productIdToRemove
            );
        },
        addArrayToRequests: (state, action) => {
            const newArray = action.payload;
            state.routingProductRequests = state.routingProductRequests.concat(newArray);
        },
        clearRoutine: (state) => {
            state.description = '';
            state.dateReminder = '08:00 AM';
            state.routingProductRequests = [];
        },
    },
});

export const { setDescription, setDateReminder, addProductToRequests, clearRoutine, removeProductFromRequests, addArrayToRequests } = routineSlice.actions;

export default routineSlice;