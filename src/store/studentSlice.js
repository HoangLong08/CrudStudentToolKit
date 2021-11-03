import { createSlice } from '@reduxjs/toolkit'
import { data } from '../data'

// export const editAdapter = createEntityAdapter();
// export const editSelectors = editAdapter.getSelectors((state) => {
// 	console.log("state: ", state);
// });

// export const addAdapter = createEntityAdapter();
// export const addSelectors = addAdapter.getSelectors((state) => {
// 	console.log("state: ", state);
// });

export const studentSlice = createSlice({
	name: 'TODO_STUDENT',
	initialState: data,
	reducers: {
		addStudentAction: (state, action) => {
			const { value } = action.payload;
			state.push({
				id: Date.now(),
				name: value.name,
				school: value.school,
			})
		},

		editStudentAction: (state, action) => {
			console.log("data edit: ", data)
			console.log("state edit: ", state);
			console.log("action edit: ", action);
			const { value } = action.payload;
			console.log("value: ", value.name, value.school)
			return state.map((item) => {
				if (item.id === value.idStudent) {
					item = { ...item, name: value.name, school: value.school };
				}
				return item;
			})
		},

		deleteStudentAction: (state, action) => {
			const { value } = action.payload
			return state.filter((item) => {
				console.log("item.id !== value: ", item.id !== value)
				return item.id !== value;
			});
		},

	},
})

export const { editStudentAction, addStudentAction, deleteStudentAction } = studentSlice.actions

export default studentSlice.reducer;