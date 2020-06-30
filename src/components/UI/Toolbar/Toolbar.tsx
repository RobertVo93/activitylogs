import React from 'react';
import { Link } from "react-router-dom";
import { logoutUser } from '../../../redux/store/user/actions';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/store';
import { User } from '../../../class/user';
type ToolbarProps = {
    logoutUser: typeof logoutUser,
    user: User
}
type ToolbarStates = {
}
class Toolbar extends React.Component<ToolbarProps, ToolbarStates> {
    constructor(props: ToolbarProps) {
        super(props);

        this.logout = this.logout.bind(this);
        this.renderManagementLink = this.renderManagementLink.bind(this);
        this.renderProfileLink = this.renderProfileLink.bind(this);
        this.renderServiceLink = this.renderServiceLink.bind(this);
    }

    /**
     * Handle logout action
     */
    logout() {
        this.props.logoutUser();
    }

    renderProfileLink() {
        let result;
        if (this.props.user._id != null && this.props.user._id !== '') {
            result = (
                <li className="nav-item dropdown">
                    <a href="#blank-tslink" className="nav-link link text-white dropdown-toggle display-4" data-toggle="dropdown-submenu" aria-expanded="false">
                        <span className="mbri-user mbr-iconfont mbr-iconfont-btn"></span>{this.props.user.firstName} {this.props.user.lastName}
                    </a>
                    <div className="dropdown-menu">
                        <Link className="text-white dropdown-item display-4" to={`/users/${this.props.user._id}`}>Profile</Link>
                        <Link className="nav-link link text-white display-4" to="/login" onClick={this.logout}>
                            Logout
                        </Link>
                    </div>
                </li>
            );
        }
        else {
            result = (
                <li className="nav-item">
                    <Link className="nav-link link text-white display-4" to="/login">
                        Login
                    </Link>
                </li>
            );
        }
        return result;
    }

    /**
     * Handle render Management Link
     */
    renderManagementLink(){
        let result;
        if (this.props.user._id != null && this.props.user._id !== '') {
            result = (
                <li className="nav-item dropdown">
                    <a href="#blank-tslink" className="nav-link link text-white dropdown-toggle display-4" data-toggle="dropdown-submenu" aria-expanded="false">
                        Management
                    </a>
                    <div className="dropdown-menu">
                        <Link className="text-white dropdown-item display-4" to="/management/projects">Projects</Link>
                        <Link className="text-white dropdown-item display-4" to="/management/activities">Activities</Link>
                        <Link className="text-white dropdown-item display-4" to="/management/knowledgebases">Knowledge Bases</Link>
                        <Link className="text-white dropdown-item display-4" to="/management/knowledgearticles">Knowledge Articles</Link>
                        <Link className="text-white dropdown-item display-4" to="/users">Users</Link>
                    </div>
                </li>
            );
        }
        return result;
    }

    /**
     * Handle render service link
     */
    renderServiceLink(){
        let result;
        if (this.props.user._id != null && this.props.user._id !== '') {
            result = (
                <li className="nav-item">
                    <Link className="nav-link link text-white display-4" to="/service">Services</Link>
                </li>
            );
        }
        return result;
    }
    // After the component did mount
    componentDidMount() {

    }

    render() {
        const mystyles = {
            height: '3.8rem'
        } as React.CSSProperties;
        return (
            <section className="menu cid-s05eVtUnGb" id="menu1-7">
                <nav className="navbar navbar-expand beta-menu navbar-dropdown align-items-center navbar-fixed-top navbar-toggleable-sm">
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <div className="hamburger">
                            <span></span>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </button>
                    <div className="menu-logo">
                        <div className="navbar-brand">
                            <span className="navbar-logo">
                                <a href="/">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/mbr-122x68.jpg`} alt="GrownUp" title="" style={mystyles} />
                                </a>
                            </span>
                            <span className="navbar-caption-wrap">
                                <a className="navbar-caption text-white display-4" href="/">
                                    GrownUp
                                </a>
                            </span>
                        </div>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav nav-dropdown" data-app-modern-menu="true">
                            <li className="nav-item">
                                <Link className="nav-link link text-white display-4" to="/">Home</Link>
                            </li>
                            {
                                this.renderManagementLink()
                            }
                            {
                                this.renderServiceLink()
                            }
                            <li className="nav-item">
                                <Link className="nav-link link text-white display-4" to="/about">About Us</Link>
                            </li>
                            {
                                this.renderProfileLink()
                            }
                        </ul>
                        <div className="navbar-buttons mbr-section-btn">
                            <Link className="text-white btn btn-sm btn-primary display-4" to="/contact">Contact Us</Link>
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}

const MapStatesToProps = (store: AppState) => {
    return {
        user: store.user.currentUser
    }
}
const MapDispatchToProps = {
    logoutUser
}

export default connect(MapStatesToProps, MapDispatchToProps)(Toolbar);