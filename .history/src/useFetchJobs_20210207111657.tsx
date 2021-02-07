import {useReducer } from 'react'

interface JobsState {
    jobs: string[],
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

const reducer: React.Reducer<JobsState, Action> = (state: JobsState, action: Action) => {
    switch (action.type) {
        case ActionType.MAKE_REQUEST:
            return { loading: true, jobs: [] }
        case ActionType.GET_DATA:
            return { ...state, loading: false, jobs: action.payload.jobs }
        case ActionType.ERROR:
            return { ...state, loading: false, error: action.payload.error, jobs: [] }
        default:
            return state
    }
}

export default function useFetchJobs(params, page) {
    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true})
    return {
        jobs: [],
        loading: true,
        error: false,
    }
}