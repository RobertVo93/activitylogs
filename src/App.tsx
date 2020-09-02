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
import { Config } from './configuration/config';
import UserContainer from './redux/containers/Users/UserContainer';
import ActivityContainer from './redux/containers/Activities/ActivityContainer';
import { connect } from 'react-redux';
import { AppState } from './redux/store';
import { loginUser } from './redux/store/user/actions';
import { LoginState } from './components/Auth/Login/LoginPropsStates';
import { Credentials } from './interface/Credentials';
import Login from './components/Auth/Login/Login';
import KnowledgeBaseContainer from './redux/containers/KnowledgeBases/KnowledgeBaseContainer';
import KnowledgeArticleContainer from './redux/containers/KnowledgeArticles/KnowledgeArticleContainer';
import ProjectContainer from './redux/containers/Projects/ProjectContainer';
import { updateAlert } from './redux/store/request/actions';
import { SecureRoute } from './share-components/SecureRoute';
import { Page401 } from './share-components/Page401';

type AppStates = {
	redirectLogin: boolean,
	redirectHome: boolean
}
type AppProps = {
	user: any,
	loginUser: typeof loginUser,
	updateAlert: typeof updateAlert
}
class App extends React.Component<AppProps, AppStates> {
	userService: UserServiceApi;	//user service
	config: Config;
	constructor(props: AppProps) {
		super(props);
		//initial variables
		this.state = {
			redirectLogin: false,
			redirectHome: false
		}
		this.userService = new UserServiceApi(apiConfig.apiConfig);
		this.config = new Config();

		this.handleOnSubmitLoginForm = this.handleOnSubmitLoginForm.bind(this);
		this.handleOnSubmitRegisterForm = this.handleOnSubmitRegisterForm.bind(this);
		this.handleRenderRedirectRouter = this.handleRenderRedirectRouter.bind(this);
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
					this.props.updateAlert({
						show: true,
						value: this.config.commonMessage.userNotFound,
						variant: this.config.alertVariants.danger
					});
				}
			}).catch((err) => {
				this.props.updateAlert({
					show: true,
					value: this.config.commonMessage.loginError,
					variant: this.config.alertVariants.danger
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
					this.props.updateAlert({
						show: true,
						value: this.config.commonMessage.signUpError,
						variant: this.config.alertVariants.danger
					});
				}
			})
			.catch((err) => {
				this.props.updateAlert({
					show: true,
					value: this.config.commonMessage.signUpError,
					variant: this.config.alertVariants.danger
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

	render() {
		return (
			<Router>
				<Toolbar />
				{
					this.handleRenderRedirectRouter()
				}
				<div className="container">
					<Switch>
						<SecureRoute path="/management/projects"
							component={ProjectContainer}
							user={this.props.user.currentUser}
						/>
						<SecureRoute path="/management/activities"
							component={ActivityContainer}
							user={this.props.user.currentUser}
						/>
						<SecureRoute path="/management/knowledgebases"
							component={KnowledgeBaseContainer}
							user={this.props.user.currentUser}
						/>
						<SecureRoute path="/management/knowledgearticles"
							component={KnowledgeArticleContainer}
							user={this.props.user.currentUser}
						/>
						<SecureRoute path="/users"
							component={UserContainer}
							user={this.props.user.currentUser}
						/>
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

						<Route path="/about">
							<About />
						</Route>
						<Route path="/contact">
							<Contact />
						</Route>
						<Route path="/page401">
							<Page401 />
						</Route>
						<Route path="/home">
							<Home />
						</Route>
						<Route component={Page401} />
					</Switch>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = (state: AppState) => ({
	user: state.user
});
const mapDispatchToProps = {
	updateAlert,
	loginUser
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App);