import axios from 'axios';
import { setAlert } from './alert';

import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_PROFILES,
  GET_REPOS
} from './types';

//Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const response = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  // Clear current profile
  dispatch({
    type: CLEAR_PROFILE
  });

  // Get all profiles
  try {
    const response = await axios.get('/api/profile');

    dispatch({
      type: GET_PROFILES,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get profile by user id
export const getProfileUserById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Get github repos
export const getGithubRepos = (githubUsername) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/profile/github/${githubUsername}`);

    dispatch({
      type: GET_REPOS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//Create or Update profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  const newFormData = new FormData();
  newFormData.append('company', formData.company);
  newFormData.append('website', formData.website);
  newFormData.append('location', formData.location);
  newFormData.append('status', formData.status);
  newFormData.append('skills', formData.skills);
  newFormData.append('bio', formData.bio);
  newFormData.append('githubusername', formData.githubusername);
  newFormData.append('youtube', formData.youtube);
  newFormData.append('twitter', formData.twitter);
  newFormData.append('facebook', formData.facebook);
  newFormData.append('linkedin', formData.linkedin);
  newFormData.append('instagram', formData.instagram);
  newFormData.append('image', formData.image);
  try {
    const response = await axios.post('/api/profile', newFormData);
    dispatch({
      type: GET_PROFILE,
      payload: response.data
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile created', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await axios.put(
      '/api/profile/experience',
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Experience added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Add education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await axios.put(
      '/api/profile/education',
      formData,
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Education added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete experience
export const deleteExperience = (exp_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/experience/${exp_id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Experience removed', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

// Delete education
export const deleteEducation = (edu_id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/profile/education/${edu_id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: response.data
    });

    dispatch(setAlert('Education removed', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((err) => {
        dispatch(setAlert(err.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status
      }
    });
  }
};

//Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? \nThis cannot be undone!')) {
    try {
      await axios.delete('api/profile');
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been deleted', 'gray'));
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((err) => {
          dispatch(setAlert(err.msg, 'danger'));
        });
      }
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: error.response.statusText,
          status: error.response.status
        }
      });
    }
  }
};
