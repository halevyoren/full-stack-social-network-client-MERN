import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router';

const PrivateRoute = ({
  component: Component,
  auth: { isAutheticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      !isAutheticated && !loading ? (
        <Redirect to='login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
