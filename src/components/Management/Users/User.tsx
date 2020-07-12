import React from 'react';
import { withRouter } from "react-router";
import { UserServiceApi } from './User.service';
import * as apiConfig from '../../../configuration/api.config';
import { User } from '../../../class/user';
import { UserProps, UserStates, initialUserState } from './UserPropsStates';
import styled from 'styled-components';
import { 
    DynamicForm, FormConfig, Validator, QuestionBase, TextboxQuestion, DynamicFormStates 
} from '../../../share-components/DynamicForm';

const ContainerDiv = styled.div`
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 100px;
`;

class UserComponent extends React.Component<UserProps, UserStates> {
    userService: UserServiceApi;
    formConfig: FormConfig;
    constructor(props: UserProps) {
        super(props);

        this.state = initialUserState;
        this.userService = new UserServiceApi(apiConfig.apiConfig);
        this.formConfig = new FormConfig();

        this.getQuestion = this.getQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        let user = await this.userService.getById(this.props.match.params['userId']);
        this.setState({
            user: user
        });
    }
    
    handleSubmit(form: DynamicFormStates) {
        let user = new User(form.listFields);
        console.log(user);
        this.userService.updateUser(user).then((result)=>{
            console.log(result);
        })
        .catch((err)=>{
            console.log(err);
        })
    }

    getQuestion(user: User) {
        let questions: QuestionBase<string>[] = [];
        let validators: { [s: string]: Validator<any>; } = {};

        //Add last name text
        questions.push(new TextboxQuestion({
            key: 'email',
            label: 'Email',
            value: user.email,
            type: this.formConfig.inputTypeDef.email,
            readonly: true,
            order: 10
        }));
        
        //Add first name text
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'First name is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'firstName',
            label: 'First name',
            value: user.firstName,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 20
        }));

        //Add last name text
        validators = {};
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Last name is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'lastName',
            label: 'Last name',
            value: user.lastName,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 30
        }));

        //Add last name text
        questions.push(new TextboxQuestion({
            key: 'address',
            label: 'Address',
            value: user.address,
            type: this.formConfig.inputTypeDef.text,
            order: 40
        }));

        //Add last name text
        questions.push(new TextboxQuestion({
            key: 'phone',
            label: 'Phone',
            value: user.phone,
            type: this.formConfig.inputTypeDef.text,
            order: 50
        }));
        return questions.sort((a,b)=> a.order - b.order);
    }

    render() {
        let questions = this.getQuestion(this.state.user);
        return (
            <ContainerDiv>
                <DynamicForm ListFields={questions} OnSubmitCallback={this.handleSubmit} />
            </ContainerDiv>
        );
    }
}

export default withRouter(UserComponent);