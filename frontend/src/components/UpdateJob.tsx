import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
  Container,
  Alert, Snackbar
} from "@mui/material";

const UpdateJob = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: '',
    user: '',
    platform: '',
    extrude: false,
    add_jig: false,
    trim_line: false,
    do_segment: false,
    trim_percentage: '',
    smoothing_deviation: '',
    back_smoothing_deviation: '',
    offset: '',
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/jobs/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching job:', error);
      }
    };

    fetchJob();
  }, [id]);

  const handleSegmentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const [open, setOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'info' | 'warning' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/jobs/${id}`, formData);
      // handle success or navigation to another page
      setOpen(true);
      setAlertSeverity('success');
      setAlertMessage('Job Updated successfully!');
    } catch (error) {
      setOpen(true);
      setAlertSeverity('error');
      setAlertMessage('Error updating job. Please try again.');
      console.error('Error updating job:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name as string]: value  as string });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, checked } = event.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: checked,
  }));
};


  return (
    <div>
      <Container maxWidth="md" sx={{ marginTop: '20px' }}>
        <form onSubmit={handleUpdate}>
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
              <TextField
                fullWidth
                name="user"
                value={formData.user}
                onChange={handleChange}
              />
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
                    checked={formData.extrude}
                    onChange={handleCheckboxChange}
                    name="extrude"
                  />
                }
                label="Extrude"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.add_jig}
                    onChange={handleCheckboxChange}
                    name="add_jig"
                  />
                }
                label="Add Jig"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.trim_line}
                    onChange={handleCheckboxChange}
                    name="trim_line"
                  />
                }
                label="Trim Line"
              />
            </Grid>
            {formData.trim_line && (
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
                Update Job
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

export default UpdateJob;
