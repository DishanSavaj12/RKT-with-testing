
import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import { useDispatch, useSelector } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from "formik";
import { createUserData, deleteUserData, fetchUserData, getUserData, updetUserData } from '../redux/apiUerSlice';


const UsersData = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [editId, setEditId] = useState(null)
  const dispatch = useDispatch();
  const { users, createUser, updateUser, getUser, deleteUser, } = useSelector((state) => ({
    users: state.allUsersData.users,
    createUser: state.allUsersData.createUser,
    updateUser: state.allUsersData.updateUser,
    getUser: state.allUsersData.getUser,
    deleteUser: state.allUsersData.deleteUser,
  }));
  useEffect(() => {
    dispatch(fetchUserData())
  }, [deleteUser, createUser, updateUser, getUser])

  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  };

  const formik = useFormik({
    initialValues: formData,
    onSubmit: (values, { resetForm }) => {
      editId ? dispatch(updetUserData(values)) : dispatch(createUserData(values));
      resetForm({ values: '' })
    },
  });

  const fillData = (user) => {
    setIsOpen(true);
    dispatch(getUserData(user))
    formik.setValues(user);
    setEditId(user._id);
  }

  return (
    <>
      <Button variant="contained" data-testid="addUser" color="secondary" type="button" onClick={() => { setIsOpen(true); setEditId(null); }} sx={{ m: 4 }}>
        ADD USER
      </Button>

      <Typography variant="h4" align="center" sx={{ my: 2 }} >Data Table</Typography>
      <Box sx={{ px: 4 }} >
        <TableContainer sx={{ boxShadow: 3 }} data-testid="table">
          <Table sx={{ backgroundColor: 'snow', width: '100%' }}>
            <TableHead>
              <TableRow >
                <TableCell align='center'> Sr.No. </TableCell>
                <TableCell align='center'> First Name</TableCell>
                <TableCell align='center'> Last Name</TableCell>
                <TableCell align='center'> Email </TableCell>
                <TableCell align='center'> Password </TableCell>
                <TableCell align='center'> Action </TableCell>
              </TableRow>
            </TableHead>
            <TableBody data-testid="rows">
              {
                users?.map((user, i) => (
                  <TableRow key={user.i}>
                    <TableCell align='center'> {i + 1} </TableCell>
                    <TableCell align='center' data-testid={i + 'firstname'}> {user.firstName} </TableCell>
                    <TableCell align='center'> {user.lastName} </TableCell>
                    <TableCell align='center'> {user.email} </TableCell>
                    <TableCell align='center'> {user.password} </TableCell>
                    <TableCell align='center'>
                      <EditIcon align='center' sx={{ mx: 1 }} color="primary" onClick={() => { fillData(user) }} data-testid={i + "editUser"} />
                      <DeleteIcon align='center' sx={{ mx: 1 }} color="error" onClick={() => dispatch(deleteUserData(user._id))} data-testid={i + "deleteUser"} />
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Dialog open={isOpen} onClose={() => { setIsOpen(false); setEditId(null) }} data-testid="dialog">
        {editId ? <DialogTitle>Update User</DialogTitle> : <DialogTitle>Add User</DialogTitle>}
        <DialogContent>
          {/* <FormControl sx={{ m: 4, px: 4, backgroundColor: 'snow', width: '400px', boxShadow: 3 }}> */}
          <form onSubmit={formik.handleSubmit}>
            <DialogContentText>
              Please fill all Field Properly.
            </DialogContentText> <br />
            <TextField
              inputProps={{ "data-testid": "First-Name" }}
              type="text"
              size='small'
              color='secondary'
              name='firstName'
              label="First Name"
              variant="outlined"
              value={formik.values.firstName}
              onChange={formik.handleChange}
            />
            <br /><br />
            <TextField
              inputProps={{ "data-testid": "Last-Name" }}
              type="text"
              size='small'
              color='secondary'
              name='lastName'
              label="Last Name"
              variant="outlined"
              value={formik.values.lastName}
              onChange={formik.handleChange}
            /> <br /><br />
            <TextField
              inputProps={{ "data-testid": "email" }}
              type="email"
              size='small'
              color='secondary'
              name='email'
              label="User E-Mail"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
            /> <br /><br />
            <TextField
              inputProps={{ "data-testid": "password" }}
              type="password"
              size='small'
              color='secondary'
              name='password'
              label="Password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
            /> <br /><br />
            {
              editId ?
                <Button sx={{ m: 1 }} color="success" type="submit" variant="contained" onClick={() => { setIsOpen(false) }} data-testid="updateUser"> Update </Button> :
                <Button sx={{ m: 1 }} color="success" type="submit" variant="contained" onClick={() => { setIsOpen(false) }} data-testid="submitUser"> Submit </Button>
            }
            <Button sx={{ m: 1 }} color="error" type="button" variant="outlined" onClick={() => setIsOpen(false)} data-testid="cancel" > Cancel </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default UsersData