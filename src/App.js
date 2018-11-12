import React, { Component } from 'react';

import AuthPage from 'pages/AuthPage';
import SchoolPage from 'pages/SchoolPage';
import { EmptyLayout, LayoutRoute,MainLayout } from 'components/Layout';

import componentQueries from 'react-component-queries';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom';
import './styles/reduction.css';
const getBasename = () => {
    return `/${process.env.PUBLIC_URL.split('/').pop()}`;
};
class App extends Component {
  render() {
    return (
        <BrowserRouter basename={getBasename()}>
            <Switch>
                <LayoutRoute
                    exact
                    path="/"
                    layout={EmptyLayout}
                    component={props => (
                        <AuthPage {...props}  />
                    )}
                />
                <LayoutRoute
                    exact
                    path="/school"
                    layout={MainLayout}
                    component={SchoolPage}
                />
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
  }
}

const query = ({ width }) => {
    if (width < 575) {
        return { breakpoint: 'xs' };
    }

    if (576 < width && width < 767) {
        return { breakpoint: 'sm' };
    }

    if (768 < width && width < 991) {
        return { breakpoint: 'md' };
    }

    if (992 < width && width < 1199) {
        return { breakpoint: 'lg' };
    }

    if (width > 1200) {
        return { breakpoint: 'xl' };
    }

    return { breakpoint: 'xs' };
};

export default componentQueries(query)(App);
