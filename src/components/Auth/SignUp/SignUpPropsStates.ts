export interface SignUpProp {
	OnRegister: (form:SignUpState) => void,
	LoginRedirectLink: string
}

export type SignUpState = {
	firstName: string,
	lastName: string,
	email: string,
	password: string,
	repassword: string,
	address: string,
	phone: string,
	redirectLoginPage: boolean,
	disableSubmitButton: boolean,
	errors: any,
	mandatoryFields: any
}

export const initialSignUpState: SignUpState = {
	firstName: '',
	lastName: '',
	email: '',
	password: '',
	repassword: '',
	address: '',
	phone: '',
	redirectLoginPage: false,
	disableSubmitButton: true,
	errors: {
		firstName: 'First Name is required',
		lastName: 'Last Name is required',
		email: 'Email is required',
		password: 'Password is required',
		repassword: 'Re-Password is required'
	},
	mandatoryFields: {
		firstName: true,
		lastName: true,
		email: true,
		password: true,
		repassword: true,
	}
}