import React, { useState } from 'react'
import { Button, Input, Typography, notification } from 'antd'
import { UserOutlined, SlackOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { addStudentAction } from '../store/studentSlice';
import { nanoid } from '@reduxjs/toolkit';
import history from '../utils/history';

import './AddStudent.css'
const { Text } = Typography;
const getNotificationStyle = type => {
	return {
		success: {
			color: 'rgba(0, 0, 0, 0.65)',
			border: '1px solid #b7eb8f',
			backgroundColor: '#f6ffed'
		},
		error: {
			color: 'rgba(0, 0, 0, 0.65)',
			border: '1px solid #ffa39e',
			backgroundColor: '#fff1f0'
		}
	}[type]
}
const openCustomNotificationWithIcon = type => {
	notification[type]({
		message: "Thêm sinh viên thành công",
		style: getNotificationStyle(type),
		duration: 2
	})
}
function AddStudent() {
	const dispatch = useDispatch()
	const [valueFormAdd, setValueFormAdd] = useState({
		name: '',
		school: ''
	})

	const [errorValueFormAdd, setErrorValueFormAdd] = useState({
		name: '',
		school: ''
	})

	function handleChangeForm(e) {
		const { name, value } = e.target
		setValueFormAdd({
			...valueFormAdd,
			[name]: value
		})
	}

	function handleSubmitAdd() {
		let isValue = true;

		const errValueForm = {
			name: '',
			school: ''
		}

		if (valueFormAdd.name.length === 0) {
			isValue = false;
			errValueForm.name = "Vui lòng nhập tên của bạn";
		} else {
			errValueForm.name = ""
		}

		if (valueFormAdd.school.length === 0) {
			isValue = false;
			errValueForm.school = "Vui chọn trường học của bạn";
		} else {
			errValueForm.school = "";
		}

		if (isValue) {
			setErrorValueFormAdd({ ...errValueForm })
			dispatch(addStudentAction({
				id: nanoid(),
				value: valueFormAdd,
			}))
			openCustomNotificationWithIcon('success')
		} else {
			setErrorValueFormAdd({ ...errValueForm })
		}
	}

	function handleClick() {
		history.push('/')
	}

	return (
		<div className="wrapper-add">
			<div className="content-add">
				<div className="wrapper-btn-back">
					<Button onClick={handleClick}>Trở lại</Button>
				</div>
				<div className="form-groups">
					<Input
						size="large"
						placeholder="Tên"
						name="name"
						value={valueFormAdd.name}
						onChange={handleChangeForm}
						prefix={<UserOutlined />}
					/>
					{errorValueFormAdd.name.length > 0 && (
						<Text type="danger"> {errorValueFormAdd.name} </Text>
					)}
				</div>
				<div className="form-groups">
					<Input
						size="large"
						placeholder="Tên trường học"
						name="school"
						value={valueFormAdd.school}
						onChange={handleChangeForm}
						prefix={<SlackOutlined />}
					/>
					{errorValueFormAdd.school.length > 0 && (
						<Text type="danger"> {errorValueFormAdd.school} </Text>
					)}
				</div>

				<div className="wrapper-btn-add-submit">
					<Button onClick={handleSubmitAdd}>Thêm thông tin	</Button>
				</div>

			</div>
		</div>
	)
}

export default AddStudent
