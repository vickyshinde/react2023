import { Box, TextField, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../Shared/AlertMessage/AlertMessage';
import { getSingleUsers, userAdd } from '../../redux/actions';

const ReduxCrudEdit = () => {
  const { id } = useParams();
  console.log(id);
  const { user } = useSelector((state) => state.data);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFromData] = useState({
    name: '',
    email: '',
    contact: '',
    password: ''
  });
  const [displayUserMsg, setDisplayUserMsg] = useState({
    clsName: '',
    msg: ''
  });

  // validation
  const [fromError, setFromError] = useState({});
  const validateFrom = () => {
    const err = {};

    if (formData.name === '') {
      err.name = 'name required!';
    }

    if (formData.email === '') {
      err.email = 'email required!';
    } else {
      // eslint-disable-next-line no-useless-escape
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(formData.email)) {
        err.email = 'Email not valid!';
      }
    }

    if (formData.contact === '') {
      err.contact = 'contact required!';
    }

    if (formData.password === '') {
      err.password = 'password required!';
    }

    if (formData.occupation === 'Select') {
      err.occupation = 'Occupation required!';
    }

    setFromError({ ...err });

    // console.log({ ...err });
    // console.log(Object.keys(err));

    return Object.keys(err).length < 1;
  };

  const handleInputChange = (event) => {
    const {
      target: { name, value }
    } = event;
    setFromData(() => ({
      ...formData,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateFrom();
    if (isValid) {
      setDisplayUserMsg({
        clsName: 'alert-success',
        msg: 'User added successfully (submitted)'
      });
      dispatch(userAdd(formData));
      navigate('/redux-crud-list');
      setFromError({});
      console.log(formData);
    } else {
      setDisplayUserMsg({
        clsName: 'alert-danger',
        msg: 'Please fill all the required fields (inValid form)'
      });
    }
  };

  useEffect(() => {
    dispatch(getSingleUsers(id));
  }, [id]);

  useEffect(() => {
    if (user) {
      setFromData(() => ({
        ...user
      }));
    }
  }, []);

  return (
    <div>
      <h2 className="my-4">User Edit</h2>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Button variant="contained" color="secondary" size="small" onClick={() => navigate('/redux-crud-list')}>
          GO to List page
        </Button>
      </Box>
      {displayUserMsg && <AlertMessage clsName={displayUserMsg.clsName} msg={displayUserMsg.msg} />}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          textAlign: 'center',
          '& > :not(style)': { m: 1, width: '45ch' }
        }}
        noValidate
        autoComplete="off">
        <TextField
          error={!!fromError.name}
          helperText={fromError.name}
          id="filled-basic"
          label="Name"
          variant="filled"
          size="small"
          name="name"
          value={formData.name || ''}
          type="text"
          onChange={handleInputChange}
        />
        <br />
        <TextField
          error={!!fromError.email}
          helperText={fromError.email}
          id="filled-basic"
          label="Email"
          variant="filled"
          size="small"
          name="email"
          value={formData.email || ''}
          type="email"
          onChange={handleInputChange}
        />
        {fromError.email && <small className="invalid-feedback">{fromError.email}</small>}

        <br />
        <TextField
          error={!!fromError.contact}
          helperText={fromError.contact}
          id="filled-basic"
          label="Contact"
          variant="filled"
          size="small"
          name="contact"
          value={formData.contact || ''}
          type="text"
          onChange={handleInputChange}
        />
        {fromError.contact && <small className="invalid-feedback">{fromError.contact}</small>}

        <br />
        <TextField
          error={!!fromError.password}
          helperText={fromError.password}
          id="filled-basic"
          label="Password"
          variant="filled"
          size="small"
          name="password"
          value={formData.password || ''}
          type="text"
          onChange={handleInputChange}
        />
        {fromError.password && <small className="invalid-feedback">{fromError.password}</small>}

        <br />
        <Button variant="contained" color="primary" type="submit">
          Update User
        </Button>
      </Box>
    </div>
  );
};

export default ReduxCrudEdit;
