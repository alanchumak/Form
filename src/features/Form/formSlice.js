import { createSlice } from '@reduxjs/toolkit'


const initialState = { 
    userName: '', 
    userPhone: '', 
    email: '', 
    profile: '', 
    orgName: '', 
    city: '', 
    recipient: '', 
    source: '' 
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        printFormData(state, action) {
            for (let field in state)
                console.log(field, ':', state[field])
        },
        fieldChanged(state, action){ // {userName: Vasya}
            // console.log('was', state['city'])
            // console.log(action.payload)
            return {...state, ...action.payload}

        },
        formCleaned(state, action) {
            // console.log('was', state['city'])
            for (let field in state)
                state[field]=''
            // console.log(state['city'])

            // return state
        }
    }
})

export const selectField = (state, field) => state.form[field];

export const { printFormData, fieldChanged, formCleaned } = formSlice.actions

export default formSlice.reducer
