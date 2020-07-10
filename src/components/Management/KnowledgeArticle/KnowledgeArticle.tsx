import React from 'react';
import { KnowledgeArticleProps, KnowledgeArticleStates, initialKnowledgeArticleStates } from './KnowledgeArticlePropsState';
import styled from 'styled-components';
import { KnowledgeArticleService } from './KnowledgeArticle.service';
import { withRouter } from 'react-router-dom';
import {
    DynamicForm, FormConfig, Validator, QuestionBase, TextboxQuestion
    , DynamicFormStates, ReferenceQuestion, TextAreaQuestion
} from '../../../share-components/DynamicForm';
import { KnowledgeArticle } from '../../../class/knowledgeArticle';
import { Config } from '../../../configuration/config';
import { CommonService } from '../../../service/common.service';

const ContainerDiv = styled.div`
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 100px;
    font-size: small;
    font-weight: 400;
`;
class KnowledgeArticleComponent extends React.Component<KnowledgeArticleProps, KnowledgeArticleStates> {
    config: Config;
    knowledgeArticleService: KnowledgeArticleService;
    formConfig: FormConfig;
    commonService: CommonService;
    constructor(props: KnowledgeArticleProps) {
        super(props);

        this.state = initialKnowledgeArticleStates;
        this.formConfig = new FormConfig();
        this.config = new Config();
        this.knowledgeArticleService = new KnowledgeArticleService();
        this.commonService = new CommonService();

        this.getQuestion = this.getQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.convertFormToObject = this.convertFormToObject.bind(this);
    }

    async componentDidMount() {
        let knowledgeArticleId = this.props.match.params['knowledgeArticleId'];
        if (knowledgeArticleId !== "createnew") {
            let knowledgeArticle = await this.knowledgeArticleService.getById(this.props.match.params['knowledgeArticleId']);
            this.setState({
                knowledgeArticle: knowledgeArticle,
                isEditRecord: true
            });
        }
    }

    /**
     * Handle submit KnowledgeArticle
     * @param form Dynamic form state
     */
    handleSubmit(form: DynamicFormStates) {
        //get KnowledgeArticle object from dynamic form
        let knowledgeArticle = this.convertFormToObject(form);
        if (this.state.isEditRecord) {
            this.knowledgeArticleService.update(knowledgeArticle)
            .then((result) => {
                //TODO: show message
            })
            .catch((err) => {
                //TODO: handle error
                console.log(err);
            });
        }
        else {
            this.knowledgeArticleService.createNew(knowledgeArticle)
            .then((result) => {
                if(this.state.isEditRecord){
                    this.setState({
                        knowledgeArticle: knowledgeArticle
                    });
                }
                else{
                    window.location.reload(false);
                }
                
            })
            .catch((err) => {
                //TODO: handle error
                console.log(err);
            });
        }
    }

    /**
     * Convert object from dynamic form to knowledgeArticle
     * @param form Dynamic form state
     */
    convertFormToObject(form: DynamicFormStates): KnowledgeArticle {
        let currentAct = this.state.knowledgeArticle;
        let formAct = new KnowledgeArticle(form.listFields);
        formAct._id = currentAct._id;
        formAct.createdBy = currentAct.createdBy;
        formAct.createdDate = currentAct.createdDate;
        formAct.updatedBy = currentAct.updatedBy;
        formAct.updatedDate = currentAct.updatedDate;
        return formAct;
    }

    /**
     * Generate knowledgeArticle questions
     * @param knowledgeArticle knowledgeArticle object
     */
    getQuestion(knowledgeArticle: KnowledgeArticle) {
        let questions: QuestionBase<any>[] = [];
        let validators: { [s: string]: Validator<any>; } = {};
        //Add Short description text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Short Description is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'shortDescription',
            label: 'Short Description',
            value: knowledgeArticle.shortDescription,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 100
        }));

        //add contents
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Contents is required.'
        };
        questions.push(new TextAreaQuestion({
            key: 'contents',
            label: 'Contents',
            value: knowledgeArticle.contents,
            validators: validators,
            rows: 8,
            order: 200
        }));

        //Add reviewer
        questions.push(new ReferenceQuestion({
            key: 'reviewer',
            label: 'Reviewer',
            value: knowledgeArticle.reviewer,
            serverUrl: this.config.apiServiceURL.users,
            displayField: 'email',
            listFields: ['email', 'firstName', 'lastName'],
            searchBar: true,
            order: 300
        }));

        return questions;
    }

    render() {
        let questions = this.getQuestion(this.state.knowledgeArticle);
        return (
            <ContainerDiv>
                <DynamicForm ListFields={questions} OnSubmitCallback={this.handleSubmit} />
            </ContainerDiv>
        );
    }
}

export default withRouter(KnowledgeArticleComponent);