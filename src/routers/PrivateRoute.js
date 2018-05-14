import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import Header from '../components/Header';

export const PrivateRoute = (props) => {
  const { isAuthenticated, component: Component, ...restProps } = props;
  return (
    <Route
      {...restProps}
      component={(props) => (
        isAuthenticated ? (
          <Fragment>
            <Header />
            <Component {...props} />
          </Fragment>
        ) : (
          <Redirect to="/" />
        )
      )}
    />
  )
};

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid,
});

export default connect(mapStateToProps)(PrivateRoute);
