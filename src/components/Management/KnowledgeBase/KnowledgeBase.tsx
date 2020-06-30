import React from 'react';
import { KnowledgeBaseProps, KnowledgeBaseStates, initialKnowledgeBaseStates } from './KnowledgeBasePropsState';
import styled from 'styled-components';
import { KnowledgeBaseService } from './KnowledgeBase.service';
import { withRouter } from 'react-router-dom';
import {
    DynamicForm, FormConfig, Validator, QuestionBase, TextboxQuestion
    , DynamicFormStates, ReferenceQuestion
} from '../../../share-components/DynamicForm';
import { KnowledgeBase } from '../../../class/knowledgeBase';
import { Config } from '../../../configuration/config';
import { BreakLine } from '../../../share-components/Variables'
import { CommentLog } from '../../../share-components/CommentLog/CommentLog';
import { CommentStates } from '../../../share-components/CommentLog/CommentLogPropsStates';
import { CommonService } from '../../../service/common.service';
import { Comment } from '../../../class/common/comment';

import ReactDOMServer from "react-dom/server";

const ContainerDiv = styled.div`
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 100px;
    font-size: small;
    font-weight: 400;
`;
const CommentLeftStyle: React.CSSProperties = {
    width: "50%",
    display: "inline-block",
    textAlign: "right",
    paddingRight: "10px"
}
const CommentRightStyle: React.CSSProperties = {
    width: "50%",
    display: "inline-block",
    textAlign: "left",
    paddingLeft: "10px"
}
const CommentHeaderStyle: React.CSSProperties = {
    textAlign: "left",
    paddingLeft: "20px"
}
const CommentBreakLineStyle: React.CSSProperties = {
    margin: "auto",
    paddingTop: "15px",
    borderBottom: "0.2px dashed #b0b0b0",
    width: "50%"
}
const TextCenterStyle: React.CSSProperties = {
    textAlign: "center",
    paddingLeft: "30px"
}
class KnowledgeBaseComponent extends React.Component<KnowledgeBaseProps, KnowledgeBaseStates> {
    config: Config;
    knowledgeBaseService: KnowledgeBaseService;
    formConfig: FormConfig;
    commonService: CommonService;
    constructor(props: KnowledgeBaseProps) {
        super(props);

        this.state = initialKnowledgeBaseStates;
        this.formConfig = new FormConfig();
        this.config = new Config();
        this.knowledgeBaseService = new KnowledgeBaseService();
        this.commonService = new CommonService();

        this.getQuestion = this.getQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.renderCommentLog = this.renderCommentLog.bind(this);
        this.convertFormToObject = this.convertFormToObject.bind(this);
        this.getKnowledgeBaseUpdated = this.getKnowledgeBaseUpdated.bind(this);
    }

    async componentDidMount() {
        let knowledgeBaseId = this.props.match.params['knowledgeBaseId'];
        if (knowledgeBaseId !== "createnew") {
            let knowledgeBase = await this.knowledgeBaseService.getById(this.props.match.params['knowledgeBaseId']);
            this.setState({
                knowledgeBase: knowledgeBase,
                isEditRecord: true
            });
        }
    }

    /**
     * Handle submit KnowledgeBase
     * @param form Dynamic form state
     */
    async handleSubmit(form: DynamicFormStates) {
        //get KnowledgeBase object from dynamic form
        let knowledgeBase = this.convertFormToObject(form);
        let res;
        if (this.state.isEditRecord) {
            res = await this.knowledgeBaseService.update(knowledgeBase);
        }
        else {
            res = await this.knowledgeBaseService.createNew(knowledgeBase);
        }
        //find out which part is updated
        let knowledgeBaseChanged = this.getKnowledgeBaseUpdated(knowledgeBase);
        if (knowledgeBaseChanged !== "") {
            let knowledgeBaseId = this.state.isEditRecord ? knowledgeBase._id : res;
            //store changed as a comment
            let nComment = new Comment({
                target: knowledgeBaseId,
                comment: knowledgeBaseChanged,
                userComment: this.props.loginUser,
                commentDate: new Date().toUTCString()
            });
            knowledgeBase.comments.push(nComment);
            //update comment
            this.knowledgeBaseService.updateComment(knowledgeBase.comments)
                .then((result) => {
                    if(this.state.isEditRecord){
                        this.setState({
                            knowledgeBase: knowledgeBase
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
     * Compare new submitted knowledgeBase with current knowledgeBase to find out which parts are updated
     * use to show in knowledgeBase log
     * @param knowledgeBase new knowledgeBase
     */
    getKnowledgeBaseUpdated(knowledgeBase: KnowledgeBase) {
        let result = [];
        //only find out updated when there are some differences
        if (JSON.stringify(this.state.knowledgeBase) !== JSON.stringify(knowledgeBase)) {
            if (JSON.stringify(this.state.knowledgeBase.name) !== JSON.stringify(knowledgeBase.name)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Name:</div>
                            </div>
                            <div style={TextCenterStyle}>
                                {
                                    knowledgeBase.name
                                }
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.knowledgeBase.owner) !== JSON.stringify(knowledgeBase.owner)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Owner:</div>
                                <div>Owner</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {(knowledgeBase.owner && knowledgeBase.owner._id) ?
                                        `${knowledgeBase.owner.firstName} ${knowledgeBase.owner.lastName}`
                                        : ''
                                    }
                                </div>
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }
        }
        return result.join('');
    }

    /**
     * Convert object from dynamic form to knowledgeBase
     * @param form Dynamic form state
     */
    convertFormToObject(form: DynamicFormStates): KnowledgeBase {
        let currentAct = this.state.knowledgeBase;
        let formAct = new KnowledgeBase(form.listFields);
        formAct._id = currentAct._id;
        formAct.comments = currentAct.comments;
        formAct.createdBy = currentAct.createdBy;
        formAct.createdDate = currentAct.createdDate;
        formAct.updatedBy = currentAct.updatedBy;
        formAct.updatedDate = currentAct.updatedDate;
        return formAct;
    }

    /**
     * Handle when user submit comment
     * @param form Comment state
     */
    handleSubmitComment(form: CommentStates) {
        let knowledgeBase = this.state.knowledgeBase;
        knowledgeBase.comments = form.comments;
        knowledgeBase.comments.forEach((val) => {
            val.target = knowledgeBase._id
        });
        if (this.state.isEditRecord) {
            this.knowledgeBaseService.updateComment(knowledgeBase.comments)
                .then((result) => {
                    this.setState({
                        knowledgeBase: knowledgeBase
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    /**
     * Generate knowledgeBase questions
     * @param knowledgeBase knowledgeBase object
     */
    getQuestion(knowledgeBase: KnowledgeBase) {
        let questions: QuestionBase<any>[] = [];
        let validators: { [s: string]: Validator<any>; } = {};
        //Add Name text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Name is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'name',
            label: 'Name',
            value: knowledgeBase.name,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 100
        }));

        //Add assigned to text
        questions.push(new ReferenceQuestion({
            key: 'owner',
            label: 'Owner',
            value: knowledgeBase.owner,
            serverUrl: this.config.apiServiceURL.users,
            displayField: 'email',
            listFields: ['email', 'firstName', 'lastName'],
            searchBar: true,
            order: 200
        }));

        return questions;
    }

    /**
     * Render comment log DOM
     */
    renderCommentLog() {
        let result;
        if (this.state.isEditRecord) {
            result = (
                <div>
                    <BreakLine></BreakLine>
                    <CommentLog loginUser={this.props.loginUser}
                        comments={this.state.knowledgeBase.comments}
                        onSubmitComment={this.handleSubmitComment}></CommentLog>
                </div>
            );
        }
        return result;
    }

    render() {
        let questions = this.getQuestion(this.state.knowledgeBase);
        return (
            <ContainerDiv>
                <DynamicForm ListFields={questions} OnSubmitCallback={this.handleSubmit} />
                {
                    this.renderCommentLog()
                }
            </ContainerDiv>
        );
    }
}

export default withRouter(KnowledgeBaseComponent);