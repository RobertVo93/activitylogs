import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect
} from "react-router-dom";
import './App.css';
import { About } from './components/About/About';
import { Home } from './components/Home/Home';
import Toolbar from './components/UI/Toolbar/Toolbar';
import { Contact } from './components/Contact/Contact';
import SignUp from './components/Auth/SignUp/SignUp';
import { SignUpState } from './components/Auth/SignUp/SignUpPropsStates';
import { UserServiceApi } from './components/Management/Users/User.service';
import * as apiConfig from './configuration/api.config';
import { User } from './class/user';
import { AlertDiv } from './share-components/Alert/AlertComponent';
import { Config } from './configuration/config';
import UserContainer from './redux/containers/Users/UserContainer';
import ActivityContainer from './redux/containers/Activities/ActivityContainer';
import { connect } from 'react-redux';
import { AppState } from './redux/store';
import { loginUser } from './redux/store/user/actions';
import { LoginState } from './components/Auth/Login/LoginPropsStates';
import { Credentials } from './interface/Credentials';
import Login from './components/Auth/Login/Login';

type AppStates = {
	redirectLogin: boolean,
	redirectHome: boolean,
	alertConfig: any
}
type AppProps = {
	user: any,
	loginUser: typeof loginUser;
}
class App extends React.Component<AppProps, AppStates> {
	userService: UserServiceApi;	//user service
	config: Config;
	constructor(props: AppProps) {
		super(props);
		//initial variables
		this.state = {
			redirectLogin: false,
			redirectHome: false,
			alertConfig: {}
		}
		this.userService = new UserServiceApi(apiConfig.apiConfig);
		this.config = new Config();

		//binding functions
		//login component
		this.handleOnSubmitLoginForm = this.handleOnSubmitLoginForm.bind(this);
		//Sign up component
		this.handleOnSubmitRegisterForm = this.handleOnSubmitRegisterForm.bind(this);

		//Router
		this.handleRenderRedirectRouter = this.handleRenderRedirectRouter.bind(this);

		//Alert component
		this.handleRenderAlert = this.handleRenderAlert.bind(this);
		this.handleOnCloseAlert = this.handleOnCloseAlert.bind(this);
	}

	//------------------------------------------LOG IN COMPONENT-----------------------------
	/**
	 * handle login form submit
	 * @param form login state
	 */
	async handleOnSubmitLoginForm(form: LoginState) {
		let credentials: Credentials = {
			username: form.email,
			password: form.password,
			rememberMe: form.rememberMe
		}
		this.userService.userLogin(credentials)
			.then((result) => {
				if (result && result.email === form.email) {
					let user = new User(result);
					this.props.loginUser(user);
					this.setState({
						redirectHome: true
					});
				}
				else {
					this.setState({
						alertConfig: {
							show: true,
							value: this.config.commonMessage.userNotFound,
							variant: this.config.alertVariants.danger
						}
					});
				}
			}).catch((err) => {
				this.setState({
					alertConfig: {
						show: true,
						value: this.config.commonMessage.loginError,
						variant: this.config.alertVariants.danger
					}
				});
			});
	}

	//------------------------------------------SIGN UP COMPONENT----------------------------
	/**
	 * handle sign up form submit
	 * @param form sign up state
	 */
	handleOnSubmitRegisterForm(form: SignUpState) {
		let newUser = new User({
			firstName: form.firstName,
			lastName: form.lastName,
			email: form.email,
			password: form.password,
			phone: form.phone,
			address: form.address
		});
		this.userService.userRegister(newUser)
			.then((result) => {
				if (result && result.email === form.email) {
					this.setState({
						redirectLogin: true
					});
				}
				else {
					this.setState({
						alertConfig: {
							show: true,
							value: this.config.commonMessage.signUpError,
							variant: this.config.alertVariants.danger
						}
					});
				}
			})
			.catch((err) => {
				this.setState({
					alertConfig: {
						show: true,
						value: this.config.commonMessage.signUpError,
						variant: this.config.alertVariants.danger
					}
				});
			});
	}

	/**
	 * Handle the case system want to redirect new page
	 */
	handleRenderRedirectRouter() {
		if (this.state.redirectLogin) {
			return (
				<Redirect push={true} to="/login"></Redirect>
			)
		}
		else if (this.state.redirectHome) {
			return (
				<Redirect push={true} to="/"></Redirect>
			)
		}
	}

	//------------------------------------------ALERT COMPONENT------------------------------
	/**
	 * Handle on close alert component
	 */
	handleOnCloseAlert() {
		this.setState({
			alertConfig: {}
		});
	}
	/**
	 * Handle render alert component
	 */
	handleRenderAlert() {
		if (this.state.alertConfig.show) {
			return (
				<AlertDiv variant={this.state.alertConfig.variant}
					show={true}
					value={this.state.alertConfig.value}
					onClose={this.handleOnCloseAlert}
				>
				</AlertDiv>
			);
		}
	}

	// // Before the component mounts, we initialise our state
	// componentWillMount() {
	// }

	// After the component did mount
	componentDidMount() {
	}

	componentDidUpdate() {
		if (this.state.redirectHome) {
			this.setState({
				redirectHome: false
			});
		}
		else if (this.state.redirectLogin) {
			this.setState({
				redirectLogin: false
			});
		}
	}

	render() {
		return (
			<Router>
				<Toolbar />
				{
					this.handleRenderAlert()
				}
				{
					this.handleRenderRedirectRouter()
				}
				<div className="container">
					<Switch>
						<Route path="/about">
							<About />
						</Route>
						<Route path="/contact">
							<Contact />
						</Route>
						<Route path="/management/activities">
							<ActivityContainer />
						</Route>
						<Route path="/users">
							<UserContainer />
						</Route>
						{
							this.props.user.currentUser._id === undefined ?
								(
									<Route exact path="/login">
										<Login OnLogin={this.handleOnSubmitLoginForm}
											RegisterPageRedirectLink="/signup"
											ForgotPasswordRedirectLink="/forgotpassword"
										/>
									</Route>
								)
								:
								('')
						}
						<Route exact path="/signup">
							<SignUp OnRegister={this.handleOnSubmitRegisterForm}
								LoginRedirectLink="/login" />
						</Route>
						<Route path="/">
							<Home />
						</Route>
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	user: state.user
});

export default connect(
	mapStateToProps,
	{ loginUser }
)(App);