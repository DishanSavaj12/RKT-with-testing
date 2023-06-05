import { findByLabelText, fireEvent, getAllByRole, getByLabelText, getByPlaceholderText, getByTestId, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import UsersData from "../component/UsersData";
import { Provider } from "react-redux";
import store from "../store";
import { deleteUserData, fetchUserData, updetUserData } from '../redux/apiUerSlice';
import userEvent from "@testing-library/user-event";
import { getUserData } from "../redux/apiUerSlice";

describe(`UserData Component render`, () => {
	it(`dialog is renderd`, () => {
		const { getByTestId } = render(
			<Provider store={store} >
				<UsersData />
			</Provider>
		);
		const addBtn = getByTestId("addUser");
		fireEvent.click(addBtn);
		const dialog = getByTestId("dialog");
		const firstName = getByTestId('First-Name');
		const lastName = getByTestId('Last-Name');
		const email = getByTestId('email');
		const password = getByTestId('password');
		fireEvent.change(firstName, { target: { value: "name" } });
		fireEvent.change(lastName, { target: { value: "surname" } });
		fireEvent.change(email, { target: { value: "e-mail" } });
		fireEvent.change(password, { target: { value: "pwd" } });

		const submitBtn = getByTestId("submitUser");
		userEvent.click(submitBtn);

		const cancelBtn = getByTestId("cancel");
		userEvent.click(cancelBtn);

		expect(addBtn).toBeInTheDocument();
		expect(dialog).toBeInTheDocument();
		expect(firstName).toBeInTheDocument();
		expect(lastName).toBeInTheDocument();
		expect(email).toBeInTheDocument();
		expect(password).toBeInTheDocument();
		expect(submitBtn).toBeInTheDocument();
		expect(cancelBtn).toBeInTheDocument();
	});
});

describe(`table data of component`, () => {

	it(`Data Table `, async () => {
		const { container, getByTestId } = render(
			<Provider store={store} >
				<UsersData />
			</Provider>
		);
		await waitFor(() => store.dispatch(fetchUserData()));
		const firstName = getByTestId('0firstname');
		// expect(firstName).toHaveTextContent("Dishan");
		expect(firstName).toEqual(firstName);
	});

	it(`Data Table Edit Button `, async () => {
		const { getByTestId } = render(
			<Provider store={store} >
				<UsersData />
			</Provider>
		);
		await waitFor(() => store.dispatch(fetchUserData()));
		const editBtn = getByTestId('0editUser');
		userEvent.click(editBtn);


		await waitFor(() => store.dispatch(getUserData()));
		expect(editBtn).toBeInTheDocument("Update User");

		const update = getByTestId('updateUser');
		userEvent.click(update);
		const cancelBtn = getByTestId("cancel");
		userEvent.click(cancelBtn);
		expect(update).toBeInTheDocument('Data Table');
		expect(cancelBtn).toBeInTheDocument();

		await waitFor(() => store.dispatch(updetUserData()));


	});

	// it(`Data Table Delete Button`, async () => {
	// 	const { getByTestId } = render(
	// 		<Provider store={store}>
	// 			<UsersData />
	// 		</Provider>
	// 	)
	// 	await waitFor( () => store.dispatch(fetchUserData()));
	// 	const deleteUser = getByTestId('0deleteUser');
	// 	userEvent.click(deleteUser);
	// 	expect(deleteUser).toBeInTheDocument();
	// 	await waitFor( () => store.dispatch(deleteUserData(deleteUser)));
	// });
});



