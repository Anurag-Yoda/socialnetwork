export const asyncActionStart = () => {
    return {
        type: 'ASYNC_START'
    }
}
export const asyncActionFinish = () => {
    return {
        type: 'ASYNC_FINISH'
    }
}
export const asyncActionError = () => {
    return {
        type: 'ASYNC_ERROR'
    }
}