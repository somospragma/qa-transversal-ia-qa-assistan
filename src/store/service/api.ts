import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery = fetchBaseQuery(
    {
        baseUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent',
        prepareHeaders: (headers) => {
            headers.set('Accept','application/json')
        }
    }
)