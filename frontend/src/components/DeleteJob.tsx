import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';
import axios from 'axios';
import {useParams} from "react-router-dom";

const DeleteJob = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const [confirmationOpen, setConfirmationOpen] = useState(true);

  const handleConfirmationOpen = () => {
    setConfirmationOpen(true);
  };

  const handleConfirmationClose = () => {
    setConfirmationOpen(false);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/jobs/${id}`);
      setConfirmationOpen(false);
      setOpen(true);
      setAlertSeverity('success');
      setAlertMessage('Job Deleted successfully!');
    } catch (error) {
      setOpen(true);
      setAlertSeverity('error');
      setAlertMessage('Error deleting job. Please try again.');;
      console.error('Error deleting job:', error);
    }
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={confirmationOpen} onClose={handleConfirmationClose}>
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this job?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DeleteJob;
