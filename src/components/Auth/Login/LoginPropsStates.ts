export interface LoginProps {
	OnLogin: (form:LoginState) => void,
	ForgotPasswordRedirectLink: string,
	RegisterPageRedirectLink: string
}

export type LoginState = {
	email: string,
	password: string,
	rememberMe: boolean,
	disableSubmitButton: boolean,
	redirectForgotPassword: boolean,
	redirectRegisterPage: boolean
}

export const initialLoginState: LoginState = {
	email: '',
	password: '',
	rememberMe: false,
	disableSubmitButton: true,
	redirectForgotPassword: false,
	redirectRegisterPage: false
}