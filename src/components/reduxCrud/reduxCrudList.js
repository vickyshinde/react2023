import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUsers } from '../../redux/actions';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0
  }
}));

const ReduxCrudList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.data);

  console.log(users);
  useEffect(() => {
    dispatch(loadUsers());
  }, []);
  return (
    <div>
      <h2 className="my-4">User List</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Password</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users &&
              users.map((row) => {
                const { id, name, email, contact, password } = row;
                return (
                  <StyledTableRow key={name}>
                    <StyledTableCell component="th" scope="row">
                      {id.toString().padStart(2, '0')}
                    </StyledTableCell>
                    <StyledTableCell align="center">{name}</StyledTableCell>
                    <StyledTableCell align="center">{email}</StyledTableCell>
                    <StyledTableCell align="center">{contact}</StyledTableCell>
                    <StyledTableCell align="center">{password}</StyledTableCell>
                    <StyledTableCell align="center">btn</StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ReduxCrudList;
