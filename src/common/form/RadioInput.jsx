import React from 'react'

const RadioInput = ({input, width, type, label}) => {
    return (
        <div className = 'ui radio'>
            <input {...input} type ={type} />{''}
            <label>{label}</label>
        </div>
    )
}

export default RadioInput;
