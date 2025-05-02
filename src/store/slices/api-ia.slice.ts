import { createSlice } from '@reduxjs/toolkit';
import { apiService } from 'store/service';

const initialState:{
    isLoading: boolean;
    isAuthenticated: boolean;
    apiKey: string;
    status: {
        code: null;
        message: null;
    };
    response: {
        id: string,
        description: string,
        expected_result: string,
        gherking: string,
        name: string,
        preconditions: string[],
        priority: string,
        recommendations: string[],
        type: string
    }[];
    request: {
        description: string;
        criteriaList: string[];
    };
} = {
    isLoading: false,
    isAuthenticated: false,
    apiKey: '',
    status: { code: null, message: null },
    response: [],
    request: {
        description: '',
        criteriaList: []
    }
}

export const apiSlice = createSlice({
    name: 'apiIA',
    initialState,
    reducers: {
        clearState() {
            return initialState
        },
        setLoading(state, action) {
            state.isLoading = action.payload;
        },
        setResponse(state, action) {
            state.response = action.payload;
        },
        setAuthenticated(state, action) {
            state.isAuthenticated = action.payload.isAuthenticated;
            state.apiKey = action.payload.key
        },
        clearMessageStatus(state) {
            state.status = { code: null, message: null }
        },
        addCriteria(state, action) {
            state.request.criteriaList = [...state.request.criteriaList, action.payload];
        },
        removeCriteria(state, action) {
            state.request.criteriaList = state.request.criteriaList.filter((_, index) => index !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                apiService.endpoints.getData.matchPending,
                (state) => {
                    state.isLoading = true;
                    state.response = []
                }
            )
            .addMatcher(
                apiService.endpoints.getData.matchFulfilled,
                (state, action) => {
                    state.isLoading = false;
                    state.response = action.payload.data || []
                }
            )
            .addMatcher(
                apiService.endpoints.getIsValidApiKey.matchPending,
                (state) => {
                    state.isLoading = true;
                }
            )
            .addMatcher(
                apiService.endpoints.getIsValidApiKey.matchFulfilled,
                (state, action) => {
                    const key = action.meta.arg.originalArgs.key;
                    state.isLoading = false;
                    state.isAuthenticated = true;
                    state.apiKey = key;
                    localStorage.setItem('apiKey', key)
                }
            )
            .addMatcher(
                apiService.endpoints.getIsValidApiKey.matchRejected,
                (state, action: any) => {
                    const error = action.payload?.data.error;
                    state.isLoading = false;
                    state.status = {
                        code: error.code,
                        message: error.details[0].reason
                    }
                }
            )
    }
});
export const {
    setLoading,
    setResponse,
    clearMessageStatus,
    setAuthenticated,
    clearState,
    addCriteria,
    removeCriteria
} = apiSlice.actions;
export const {
    useLazyGetDataQuery,
    useLazyGetIsValidApiKeyQuery
} = apiService;
export default apiSlice.reducer;