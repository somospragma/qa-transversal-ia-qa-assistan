import {configureStore} from '@reduxjs/toolkit';
import apiReducer from 'store/slices/api-ia.slice';
import {apiService} from 'store/service';

export const store = configureStore({
    reducer : {
        apiIA: apiReducer,
        [apiService.reducerPath]: apiService.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;