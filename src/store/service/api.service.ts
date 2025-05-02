import {createApi} from '@reduxjs/toolkit/query/react';
import {baseQuery} from 'store/service/api'; 

export const apiService = createApi({
    reducerPath: 'api_service',
    baseQuery,
    endpoints: (builder) => ({
        getData: builder.query<any, {key:string, body:any}>({
            query: ({body, key}) => ({
                url:`?key=${key}`,
                method: 'POST',
                body
            }),
            transformResponse: (response: any) => {
                const resp = response.candidates[0].content.parts[0].text;
                return {data: JSON.parse(resp.replace(/```json|```/g, '').trim())}
            }
        }),
        getIsValidApiKey: builder.query<any, {key:string}>({
            query: ({key}) => ({
                url:`?key=${key}`,
                method: 'POST',
                body:{
                    "contents": [
                        {
                            "parts": [
                                {
                                    "text": "Te mande está petición unicamente para ver si el apikey está valido."
                                }
                            ]
                        }
                    ]
                }
            }),
            transformResponse: (response: any, _, arg) => {
                return {response, arg};
            },
        })
    })
})