import React, { useEffect, useState } from 'react';
import { Table, Space, Button, Modal, Input, Typography } from 'antd';
import { UserOutlined, SlackOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { editStudentAction, deleteStudentAction } from "../store/studentSlice"
import history from '../utils/history';

import './Home.css';
import { nanoid } from '@reduxjs/toolkit';

const { Text } = Typography;

const columns = [
	{
		title: 'STT',
		dataIndex: 'id',
		key: 'id'
	},
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
	},
	{
		title: 'School',
		dataIndex: 'school',
		key: 'school',
	},
	{
		title: 'Action',
		dataIndex: 'action',
		key: 'action'
	}
]
function Home() {
	const dispatchDelete = useDispatch();
	const dispatchEdit = useDispatch();

	const listStd = useSelector((state) => {
		return state.StudentSlice;
	})

	const [listStudentState, setListStudentState] = useState(listStd);
	const [isModalEdit, setIsModalEdit] = useState({
		show: false,
		idStudent: 0
	})

	const [valueFormEdit, setValueFormEdit] = useState({
		name: '',
		school: ''
	})

	const [errorValueFormEdit, setErrorValueFormEdit] = useState({
		name: '',
		school: ''
	})

	function handleChangeForm(e) {
		const { name, value } = e.target
		setValueFormEdit({
			...valueFormEdit,
			[name]: value
		})
	}

	console.log("getEditState: ", isModalEdit)
	console.log("data: ", listStudentState);
	console.log("valueFormEdit: ", valueFormEdit)
	console.log("listStd: ", listStd)

	useEffect(() => {
		setListStudentState(listStd);
	}, [listStd])

	const handleOk = () => {
		let isValue = true;

		const errValueForm = {
			name: '',
			school: ''
		}

		if (valueFormEdit.name.length === 0) {
			isValue = false;
			errValueForm.name = "Vui lòng nhập tên của bạn";
		} else {
			errValueForm.name = ""
		}

		if (valueFormEdit.school.length === 0) {
			isValue = false;
			errValueForm.school = "Vui chọn trường học của bạn";
		} else {
			errValueForm.school = "";
		}

		if (isValue) {
			setErrorValueFormEdit({ ...errValueForm })
			dispatchEdit(editStudentAction({
				id: nanoid(),
				value: {
					idStudent: isModalEdit.idStudent,
					name: valueFormEdit.name,
					school: valueFormEdit.school
				}
			}))
			setIsModalEdit({
				show: false,
				idStudent: 0
			});

			setValueFormEdit({
				name: '',
				school: ''
			})
		} else {
			setErrorValueFormEdit({ ...errValueForm })
		}
	};

	const handleCancel = () => {
		setIsModalEdit({
			show: false,
			idStudent: 0
		});

		setValueFormEdit({
			name: '',
			school: ''
		})
	};

	function handleClickAddStudent() {
		history.push('/add-student')
	}

	const handleClickEditStudent = (item) => () => {

		setErrorValueFormEdit({
			name: '',
			school: ''
		})

		setIsModalEdit({
			...isModalEdit,
			show: true,
			idStudent: item.id
		});

		setValueFormEdit({
			name: item.name,
			school: item.school
		})
	}

	const handleClickModalDelete = (item) => () => {
		return dispatchDelete(
			deleteStudentAction({
				id: nanoid(),
				value: item.id,
			})
		)
	}

	function renderListStudent() {
		return listStudentState.map((item, index) => {
			return {
				key: index,
				id: index + 1,
				name: item.name,
				school: item.school,
				action: (
					<Space>
						<Button
							type="primary"
							shape="round"
							onClick={handleClickEditStudent(item)}
						>
							Edit
						</Button>
						<Button
							type="primary"
							shape="round"
							danger
							onClick={handleClickModalDelete(item)}
						>
							Xóa
						</Button>
					</Space>
				)
			}
		})
	}

	return (
		<>
			<Modal title="Cập nhật sinh viên" visible={isModalEdit.show} onOk={handleOk} onCancel={handleCancel}>
				<div className="form-groups">
					<Input
						size="large"
						placeholder="Tên"
						name="name"
						value={valueFormEdit.name}
						onChange={handleChangeForm}
						prefix={<UserOutlined />}
					/>
					{errorValueFormEdit.name.length > 0 && (
						<Text type="danger"> {errorValueFormEdit.name} </Text>
					)}
				</div>
				<div className="form-groups">
					<Input
						size="large"
						placeholder="Tên trường học"
						name="school"
						value={valueFormEdit.school}
						onChange={handleChangeForm}
						prefix={<SlackOutlined />}
					/>
					{errorValueFormEdit.school.length > 0 && (
						<Text type="danger"> {errorValueFormEdit.school} </Text>
					)}
				</div>
			</Modal>

			<h1 align="middle">Thông tin danh sách sinh viên</h1>

			<div className="width-table">
				<div className="wrapper-btn-add">
					<Button
						onClick={handleClickAddStudent}
					>
						Thêm sinh viên
					</Button>
				</div>
				<Table columns={columns} dataSource={renderListStudent()} />
			</div>
		</>
	)
}

export default Home
