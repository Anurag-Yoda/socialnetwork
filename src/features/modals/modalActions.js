
export const openModal = (modalType, modalProps) => {
    console.log(modalType, modalProps, 'modaltypes receveind in actions')
    return {
        type: 'OPEN_MODAL',
        payload:{
            modalType,
            modalProps
        }
       
    }
}
export const closeModal = (modalType, modalProps) => {
    return {
       type: 'HIDE_MODAL'
       
    }
       
    }
