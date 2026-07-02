import React, { useState, useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';

import {
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  Button,
  MenuItem,
} from '@mui/material';

import { useDispatch, useSelector } from 'react-redux';
import { updateContact, viewOneContact } from '../../../redux/slice/contactSlice';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ContactDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { oneContact, loading } = useSelector(
    (state) => state.contact
  );

  const [form, setForm] = useState({
    name: '',
    email: '',
    contact: '',
    subject: '',
    message: '',
    status: '',
  });

  useEffect(() => {
    if (id) {
      dispatch(viewOneContact(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (oneContact) {
      setForm({
        name: oneContact?.name || '',
        email: oneContact?.email || '',
        contact: oneContact?.contact || '',
        subject: oneContact?.subject || '',
        message: oneContact?.message || '',
        status: oneContact?.status || 'Pending',
      });
    }
  }, [oneContact]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      // dispatch(updateContactStatus({ id, data: form }))
      const response=await dispatch(updateContact({id,data:form})).unwrap()
      if(response.sucess){
        toast.success("Status Update !")
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <Box
        sx={{
          p: 2,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 3,
            maxWidth: '80%',
            mx: 'auto',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            textAlign="center"
            sx={{ pb: 3 }}
          >
            Contact Details
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            <Box component="form" onSubmit={handleSubmit}>
              <Grid  spacing={3}>
                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    value={form.name}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={form.email}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    value={form.contact}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    label="Subject"
                    value={form.subject}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    multiline
                    rows={5}
                    label="Message"
                    value={form.message}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    label="Created At"
                    value={
                      oneContact?.createdAt
                        ? new Date(
                            oneContact.createdAt
                          ).toLocaleString()
                        : ''
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>

                <Grid sx={{my:"20px"}}>
                  <TextField
                    fullWidth
                    select
                    label="Status"
                    name="status"
                    value={form.status}
                    onChange={handleChange}
                  >
                    <MenuItem value="Pending">
                      Pending
                    </MenuItem>

                    <MenuItem value="In Progress">
                      In Progress
                    </MenuItem>

                    <MenuItem value="Resolved">
                      Resolved
                    </MenuItem>
                  </TextField>
                </Grid>

                <Grid>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                      px: 4,
                      py: 1,
                    }}
                  >
                    Update Status
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    </MainLayout>
  );
}

export default ContactDetail;