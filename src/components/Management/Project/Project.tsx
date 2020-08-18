import React from 'react';
import { ProjectProps, ProjectStates, initialProjectStates } from './ProjectPropsState';
import styled from 'styled-components';
import { ProjectService } from './Project.service';
import { withRouter } from 'react-router-dom';
import {
    DynamicForm, FormConfig, Validator, QuestionBase, TextboxQuestion
    , DynamicFormStates, ReferenceQuestion
} from '../../../share-components/DynamicForm';
import { Project } from '../../../class/project';
import { Config } from '../../../configuration/config';
import { BreakLine } from '../../../share-components/Variables'
import { CommentStates, Comment, CommentLog } from '../../../share-components/CommentLog';
import { CommonService } from '../../../service/common.service';

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
class ProjectComponent extends React.Component<ProjectProps, ProjectStates> {
    config: Config;
    projectService: ProjectService;
    formConfig: FormConfig;
    commonService: CommonService;
    constructor(props: ProjectProps) {
        super(props);

        this.state = initialProjectStates;
        this.formConfig = new FormConfig();
        this.config = new Config();
        this.projectService = new ProjectService();
        this.commonService = new CommonService();

        this.getQuestion = this.getQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.renderCommentLog = this.renderCommentLog.bind(this);
        this.convertFormToObject = this.convertFormToObject.bind(this);
        this.getProjectUpdated = this.getProjectUpdated.bind(this);
    }

    async componentDidMount() {
        let projectId = this.props.match.params['projectId'];
        if (projectId !== "createnew") {
            let project = await this.projectService.getById(projectId);
            this.setState({
                project: project,
                isEditRecord: true
            });
        }
    }

    /**
     * Handle submit Project
     * @param form Dynamic form state
     */
    async handleSubmit(form: DynamicFormStates) {
        //get Project object from dynamic form
        let project = this.convertFormToObject(form);
        let res;
        if (this.state.isEditRecord) {
            res = await this.projectService.update(project);
        }
        else {
            res = await this.projectService.createNew(project);
        }
        //find out which part is updated
        let projectChanged = this.getProjectUpdated(project);
        if (projectChanged !== "") {
            let projectId = this.state.isEditRecord ? project._id : res;
            //store changed as a comment
            let nComment = new Comment({
                target: projectId,
                comment: projectChanged,
                userComment: this.props.loginUser,
                commentDate: new Date().toUTCString()
            });
            project.comments.push(nComment);
            //update comment
            this.projectService.updateComment(project.comments)
                .then((result) => {
                    if(this.state.isEditRecord){
                        this.setState({
                            project: project
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
     * Compare new submitted Project with current Project to find out which parts are updated
     * use to show in Project log
     * @param project new Project
     */
    getProjectUpdated(project: Project) {
        let result = [];
        //only find out updated when there are some differences
        if (JSON.stringify(this.state.project) !== JSON.stringify(project)) {
            if (JSON.stringify(this.state.project.name) !== JSON.stringify(project.name)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Name:</div>
                            </div>
                            <div style={TextCenterStyle}>
                                {
                                    project.name
                                }
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.project.manager) !== JSON.stringify(project.manager)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Manager:</div>
                                <div>Manager</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {(project.manager && project.manager._id) ?
                                        `${project.manager.firstName} ${project.manager.lastName}`
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
     * Convert object from dynamic form to Project
     * @param form Dynamic form state
     */
    convertFormToObject(form: DynamicFormStates): Project {
        let currentAct = this.state.project;
        let formAct = new Project(form.listFields);
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
        let project = this.state.project;
        project.comments = form.comments;
        project.comments.forEach((val) => {
            val.target = project._id
        });
        if (this.state.isEditRecord) {
            this.projectService.updateComment(project.comments)
                .then((result) => {
                    this.setState({
                        project: project
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    /**
     * Generate Project questions
     * @param record Project object
     */
    getQuestion(record: Project) {
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
            value: record.name,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 100
        }));

        //Add manager text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Manager is required.'
        };
        questions.push(new ReferenceQuestion({
            key: 'manager',
            label: 'Manager',
            value: record.manager,
            serverUrl: this.config.apiServiceURL.users,
            validators: validators,
            displayField: 'email',
            listFields: ['email', 'firstName', 'lastName'],
            searchBar: true,
            order: 200
        }));

        //Add member list
        questions.push(new ReferenceQuestion({
            key: 'members',
            label: 'Member',
            value: record.members,
            serverUrl: this.config.apiServiceURL.users,
            displayField: 'email',
            listFields: ['email', 'firstName', 'lastName'],
            searchBar: true,
            multiple: true,
            order: 300
        }));

        return questions.sort((a,b)=> a.order - b.order);
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
                    <CommentLog commentedUser={this.props.loginUser}
                        comments={this.state.project.comments}
                        onSubmitComment={this.handleSubmitComment}></CommentLog>
                </div>
            );
        }
        return result;
    }

    render() {
        let questions = this.getQuestion(this.state.project);
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

export default withRouter(ProjectComponent);