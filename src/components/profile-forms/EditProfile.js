import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaRegSmile,
  FaTwitter,
  FaYoutube
} from 'react-icons/fa';

import { createProfile, getCurrentProfile } from '../../actions/profile';
import './ProfileForm.css';

const EditProfile = ({
  createProfile,
  getCurrentProfile,
  Profile: { profile, loading },
  history
}) => {
  const [showSocialNetwork, setShowSocialNetwork] = useState(false);
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    bio: '',
    githubusername: '',
    youtube: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    image: ''
  });

  //the url to show as a preview
  const [imagePreview, setImagePreview] = useState();

  //Picking and showing image

  //generate a preview of the image and forward the pick file
  const pickedFileHandler = (event) => {
    let pickedFile;

    //if exactly 1 file was picked
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];

      //generating an image preview url
      const fileReader = new FileReader();
      //this fuction will execute once the reading of the file is done
      fileReader.onload = () => {
        setImagePreview(fileReader.result);
        setFormData({
          ...formData,
          image: fileReader.result
        });
      };
      //creating a url to output
      fileReader.readAsDataURL(pickedFile);
    } else {
    }
  };

  useEffect(() => {
    getCurrentProfile();
    if (loading) {
      setFormData({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        bio: '',
        githubusername: '',
        youtube: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        instagram: '',
        image: ''
      });
    } else if (profile) {
      setFormData({
        company: profile.company ? profile.company : '',
        website: profile.website ? profile.website : '',
        location: profile.location ? profile.location : '',
        status: profile.status ? profile.status : '',
        skills: profile.skills ? profile.skills.join(',') : '',
        bio: profile.bio ? profile.bio : '',
        githubusername: profile.githubusername ? profile.githubusername : '',
        youtube:
          profile.social && profile.social.youtube
            ? profile.social.youtube
            : '',
        twitter:
          profile.social && profile.social.twitter
            ? profile.social.twitter
            : '',
        facebook:
          profile.social && profile.social.facebook
            ? profile.social.facebook
            : '',
        linkedin:
          profile.social && profile.social.linkedin
            ? profile.social.linkedin
            : '',
        instagram:
          profile.social && profile.social.instagram
            ? profile.social.instagram
            : '',
        image: ''
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getCurrentProfile, loading]);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    githubusername,
    youtube,
    twitter,
    facebook,
    linkedin,
    instagram
  } = formData;

  const ToggleSocial = () => {
    setShowSocialNetwork((prev) => !prev);
  };

  const changeInput = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <h1>All Developers</h1>
      <div className='center-icon'>
        <FaRegSmile size='1.4rem' />
        <p>&nbsp; Find and connect with other developers</p>
      </div>
      <small className='instruction'>* = required</small>
      <form onSubmit={SubmitHandler}>
        <div className='form-group'>
          <select name='status' value={status} onChange={changeInput}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junio Developer'>Junio Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Developer</option>
            <option value='Instructor'>Instructor</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small>Give us an idea of where you are at in your career</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={changeInput}
          />
          <small>Could be your own company or one you work for</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={changeInput}
          />
          <small>Could be your own or a company website</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={changeInput}
          />
          <small>City suggested (eg. Be'er Sheva)</small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={changeInput}
          />
          <small>
            Please use comma separated values (eg. HTML,CSS,JavaScript)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={changeInput}
          />
          <small>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={changeInput}
          ></textarea>
          <small>Tell us a little about yourself</small>
        </div>

        <div>
          <button type='button' className='button' onClick={ToggleSocial}>
            {showSocialNetwork
              ? 'Close Social Network Links'
              : 'Add Social Network Links'}
          </button>
          <span>&nbsp; (optional)</span>
        </div>
        {showSocialNetwork && (
          <Fragment>
            <div className='form-group twitter center-icon'>
              <FaTwitter size='2rem' />
              &nbsp;
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={changeInput}
              />
            </div>

            <div className='form-group facebook center-icon'>
              <FaFacebook size='2rem' />
              &nbsp;
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={changeInput}
              />
            </div>

            <div className='form-group youTube center-icon'>
              <FaYoutube size='2rem' />
              &nbsp;
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={changeInput}
              />
            </div>

            <div className='form-group linkedin center-icon'>
              <FaLinkedin size='2rem' />
              &nbsp;
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={changeInput}
              />
            </div>

            <div className='form-group instagram center-icon'>
              <FaInstagram size='2rem' />
              &nbsp;
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={changeInput}
              />
            </div>
          </Fragment>
        )}
        <div className='photo'>
          <input
            type='file'
            onChange={pickedFileHandler}
            accept='.jpeg,.jpg,.png'
          />
          {imagePreview && <img src={imagePreview} alt='preview' />}
          {!imagePreview && <p>please pick an image.</p>}
        </div>
        <input type='submit' className='button' />
        <Link to='/dashboard'>Go Back</Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  Profile: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  Profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
