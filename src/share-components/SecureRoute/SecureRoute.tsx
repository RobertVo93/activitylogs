import * as React from 'react';
import {
    Route,
    Redirect,
    RouteProps,
    RouteComponentProps
} from "react-router-dom";

interface SecureRouteProps extends RouteProps {
    user: any,
    isUnauthorize?: boolean
}

export class SecureRoute extends Route<SecureRouteProps> {
    render() {
        return (
            <Route render={
                (props: RouteComponentProps) => {
                    if (!this.props.user._id) {
                        //user haven't login yet => redirect to login page
                        return <Redirect to='/login' />
                    }
                    else if (this.props.isUnauthorize) {
                        //user is not authorize
                        return <Redirect to="/page401" />
                    }
                    else {
                        //user could access the page
                        if (this.props.component) {
                            return React.createElement(this.props.component);
                        }
                        else if (this.props.render) {
                            return this.props.render(props);
                        }
                    }
                }
            } />
        );
    }
}