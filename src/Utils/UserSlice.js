import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
    name: 'user',
    initialState: null,

    reducers: {
        addUserData: (state, action) => {
            return action.payload
        },

        addPost: (state, action) => {
            if (state?.posts) {
                state.posts.push(action.payload)
            }
        },

        removePost: (state, action) => {
            if (state?.posts) {
                state.posts = state.posts.filter(
                    post => post._id !== action.payload
                )
            }
        },

        updateProfile: (state, action) => {
            return { ...state, ...action.payload }
        },

        clearData: () => {
            return null
        }
    }
})

export const {
    addUserData,
    addPost,
    removePost,
    updateProfile,
    clearData
} = userSlice.actions

export default userSlice.reducer