import React, {useState, useEffect, SyntheticEvent} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Container,
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Grid, Select, MenuItem, SelectChangeEvent, Alert, Snackbar, SnackbarCloseReason, PropTypes,
} from '@mui/material';
import axios from 'axios';
import Color from "@mui/material/Alert";

const CreateJob = () => {
  const [jobs, setJobs] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    user: '',
    platform: '',
    activity: {
      extrude: false,
      add_jig: false,
      trim_line: false,
    },
    do_segment: false,
    trim_percentage: '',
    smoothing_deviation: '',
    back_smoothing_deviation: '',
    offset: '',
  });

  const users = ['MM', 'LM', 'AL', 'JL', 'KS', 'LP', 'RC', 'VK'];

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name as string]: value as string });
};

  const handleUserChange = (e: SelectChangeEvent) => {
  const { name, value } = e.target;
  setFormData({ ...formData, [name as string]: value as string });
};

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      activity: {
        ...formData.activity,
        [event.target.name]: event.target.checked,
      },
    });
  };

  const handleSegmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData.date)
    console.log(formData.date.length)
    if (formData.date.length === 0) {
        setOpen(true);
        setAlertSeverity('error');
        setAlertMessage('Please fill in date field.');
    }
    else if (formData.user.length === 0) {
        setOpen(true);
        setAlertSeverity('error');
        setAlertMessage('Please Select User.');
    }
    else if (formData.platform.length === 0) {
        setOpen(true);
        setAlertSeverity('error');
        setAlertMessage('Please fill in platform field.');
    }
    else if (!(formData.activity.extrude || formData.activity.add_jig || formData.activity.trim_line)) {
        setOpen(true);
        setAlertSeverity('error');
        setAlertMessage('Please select at least one activity.');
    }
    else {
      try {
          const response = await axios.post('http://localhost:8000/jobs', formData);
          console.log(response.data);
          setFormData({
              date: '',
              user: '',
              platform: '',
              activity: {
                extrude: false,
                add_jig: false,
                trim_line: false,
              },
              do_segment: false,
              trim_percentage: '',
              smoothing_deviation: '',
              back_smoothing_deviation: '',
              offset: '',
          });
          // alert('Job added successfully');
          setOpen(true);
          setAlertSeverity('success');
          setAlertMessage('Job added successfully!');
        } catch (error) {
              console.error('Error adding job:', error);
              setOpen(true);
              setAlertSeverity('error');
              setAlertMessage('Error adding job. Please try again.');
        }
    }
  };

  const fetchJobs = async () => {
    try {
      const response = await axios.get('http://localhost:8000/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: '20px' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Date</Typography>
              <TextField
                fullWidth
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">User</Typography>
              <Select
                value={formData.user}
                onChange={handleUserChange}
                fullWidth
                name="user"
              >
                {users.map((user, index) => (
                  <MenuItem key={index} value={user}>
                    {user}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Platform</Typography>
              <TextField
                fullWidth
                name="platform"
                value={formData.platform}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Activity</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.activity.extrude}
                    onChange={handleCheckboxChange}
                    name="extrude"
                  />
                }
                label="Extrude"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.activity.add_jig}
                    onChange={handleCheckboxChange}
                    name="add_jig"
                  />
                }
                label="Add Jig"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.activity.trim_line}
                    onChange={handleCheckboxChange}
                    name="trim_line"
                  />
                }
                label="Trim Line"
              />
            </Grid>
            {formData.activity.trim_line && (
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.do_segment}
                    onChange={handleSegmentChange}
                    name="do_segment"
                  />
                }
                label="Do Segment"
              />
              {!formData.do_segment && (
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="trim_percentage"
                      value={formData.trim_percentage}
                      onChange={handleChange}
                      placeholder="Trim Percentage"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="smoothing_deviation"
                      value={formData.smoothing_deviation}
                      onChange={handleChange}
                      placeholder="Smoothing Deviation"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="back_smoothing_deviation"
                      value={formData.back_smoothing_deviation}
                      onChange={handleChange}
                      placeholder="Back Smoothing Deviation"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      name="offset"
                      value={formData.offset}
                      onChange={handleChange}
                      placeholder="Offset"
                    />
                  </Grid>
                </Grid>
              )}
            </Grid>
          )}
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Add Job
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertSeverity} sx={{ width: '100%' }}>
            {alertMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateJob;
