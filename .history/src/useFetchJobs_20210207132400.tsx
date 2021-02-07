import {useReducer, useEffect } from 'react'
import axios from 'axios';

interface JobsState {
    jobs: any[],
    loading: boolean,
    error: boolean
}

interface Action {
    type: ActionType,
    payload: JobsState,
}

enum ActionType {
    MAKE_REQUEST =  'make-request',
    GET_DATA = 'get-data',
    ERROR = 'error'
}

const BASE_URL = 'https://jobs.github.com/positions.json'

const reducer: React.Reducer<JobsState, Action> = (state: JobsState, action: Action) => {
    switch (action.type) {
        case ActionType.MAKE_REQUEST:
            return { ...state, loading: true, jobs: [] }
        case ActionType.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ActionType.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        default:
            return state
    }
}

export default function useFetchJobs(params: any, page: number) {
    const param = { markdown: true, page: page, ...params }
    const query = new URLSearchParams(param);

    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: false})

    useEffect(() => {
        const cancelToken = axios.CancelToken.source()
        dispatch({ type: ActionType.MAKE_REQUEST, payload: { ...state } })
        fetch(BASE_URL + '?' + query, {
            mode: 'no-cors',
            credentials: 'include',
        }).then(res => res.json())
        .then(data => {
            dispatch({ type: ActionType.GET_DATA, payload: { ...state, jobs: data }})
        }).catch(e => {
            if (axios.isCancel(e)) return
            dispatch({ type: ActionType.ERROR, payload: { ...state, error: e}})
        })

        return () => {
            cancelToken.cancel()
        }
    }, [params, page])
    console.log(state)
    return state
}