import React from 'react';
import './Activity.scss';
import { ActivityProps, ActivityStates, initialActivityStates } from './ActivityPropsState';
import styled from 'styled-components';
import { ActivityService } from './Activity.service';
import { withRouter } from 'react-router-dom';
import {
    DynamicForm, FormConfig, Validator, QuestionBase, TextboxQuestion
    , DynamicFormStates, DropdownQuestion, DateRangeQuestion, ReferenceQuestion, TextAreaQuestion
} from '../../../share-components/DynamicForm';
import { Activity } from '../../../class/activity';
import { KeyValue } from '../../../class/common/keyValue';
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
class ActivityComponent extends React.Component<ActivityProps, ActivityStates> {
    config: Config;
    activityService: ActivityService;
    formConfig: FormConfig;
    commonService: CommonService;
    constructor(props: ActivityProps) {
        super(props);

        this.state = initialActivityStates;
        this.formConfig = new FormConfig();
        this.config = new Config();
        this.activityService = new ActivityService();
        this.commonService = new CommonService();

        this.getQuestion = this.getQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.renderCommentLog = this.renderCommentLog.bind(this);
        this.convertFormToObject = this.convertFormToObject.bind(this);
        this.getActivityUpdated = this.getActivityUpdated.bind(this);
    }

    async componentDidMount() {
        let activityId = this.props.match.params['activityId'];
        if (activityId !== "createnew") {
            let activity = await this.activityService.getById(this.props.match.params['activityId']);
            this.setState({
                activity: activity,
                isEditRecord: true
            });
        }
    }

    /**
     * Handle submit activity
     * @param form Dynamic form state
     */
    async handleSubmit(form: DynamicFormStates) {
        //get activity object from dynamic form
        let activity = this.convertFormToObject(form);
        if(activity.project){
            delete activity.project.comments;
            delete activity.project.members;
        }
        let res;
        if (this.state.isEditRecord) {
            res = await this.activityService.update(activity);
        }
        else {
            res = await this.activityService.createNew(activity);
        }
        //find out which part is updated
        let activityChanged = this.getActivityUpdated(activity);
        if (activityChanged !== "") {
            let activityId = this.state.isEditRecord ? activity._id : res;
            //store changed as a comment
            let nComment = new Comment({
                target: activityId,
                comment: activityChanged,
                userComment: this.props.loginUser,
                commentDate: new Date().toUTCString()
            });
            activity.comments.push(nComment);
            //update comment
            this.activityService.updateComment(activity.comments)
                .then((result) => {
                    if(this.state.isEditRecord){
                        this.setState({
                            activity: activity
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
     * Compare new submitted activity with current activity to find out which parts are updated
     * use to show in activity log
     * @param activity new activity
     */
    getActivityUpdated(activity: Activity) {
        let result = [];
        //only find out updated when there are some differences
        if (JSON.stringify(this.state.activity) !== JSON.stringify(activity)) {
            if (JSON.stringify(this.state.activity.description) !== JSON.stringify(activity.description)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Description:</div>
                            </div>
                            <div style={TextCenterStyle}>
                                {
                                    activity.description
                                }
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.implemetationPlan) !== JSON.stringify(activity.implemetationPlan)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Implemetation Plan:</div>
                            </div>
                            <div style={TextCenterStyle}>
                                {
                                    activity.implemetationPlan
                                }
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.project) !== JSON.stringify(activity.project)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Project:</div>
                                <div>Project</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {(activity.project && activity.project._id) ?
                                        `${activity.project.name}`
                                        : ''
                                    }
                                </div>
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.status) !== JSON.stringify(activity.status)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Status:</div>
                                <div>Status</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {activity.status ?
                                        `${activity.status.value}`
                                        : ''
                                    }
                                </div>
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.assignedTo) !== JSON.stringify(activity.assignedTo)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Assigned to:</div>
                                <div>Assigned To</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {(activity.assignedTo && activity.assignedTo._id) ?
                                        `${activity.assignedTo.firstName} ${activity.assignedTo.lastName}`
                                        : ''
                                    }
                                </div>
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.planDate) !== JSON.stringify(activity.planDate)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Plan date:</div>
                                <div>Start date</div>
                                <div>End date</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {activity.planDate.startDate ?
                                        this.commonService.convertDateToStringByFormat(activity.planDate.startDate, this.config.datetimeFormat.yyyyMMdd)
                                        : ''
                                    }
                                </div>
                                <div>
                                    {activity.planDate.endDate ?
                                        this.commonService.convertDateToStringByFormat(activity.planDate.endDate, this.config.datetimeFormat.yyyyMMdd)
                                        : ''
                                    }
                                </div>
                            </div>
                            <BreakLine cssProperties={CommentBreakLineStyle}></BreakLine>
                        </div>
                    )
                )
            }

            if (JSON.stringify(this.state.activity.actualDate) !== JSON.stringify(activity.actualDate)) {
                result.push(
                    ReactDOMServer.renderToString(
                        <div>
                            <div style={CommentLeftStyle}>
                                <div style={CommentHeaderStyle}>Actual date:</div>
                                <div>Start date</div>
                                <div>End date</div>
                            </div>
                            <div style={CommentRightStyle}>
                                <div></div>
                                <div>
                                    {activity.actualDate.startDate ?
                                        this.commonService.convertDateToStringByFormat(activity.actualDate.startDate, this.config.datetimeFormat.yyyyMMdd)
                                        : ''
                                    }
                                </div>
                                <div>
                                    {activity.actualDate.endDate ?
                                        this.commonService.convertDateToStringByFormat(activity.actualDate.endDate, this.config.datetimeFormat.yyyyMMdd)
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
     * Convert object from dynamic form to activity
     * @param form Dynamic form state
     */
    convertFormToObject(form: DynamicFormStates): Activity {
        let currentAct = this.state.activity;
        let formAct = new Activity(form.listFields);
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
        let activity = this.state.activity;
        activity.comments = form.comments;
        activity.comments.forEach((val) => {
            val.target = activity._id
        });
        if (this.state.isEditRecord) {
            this.activityService.updateComment(activity.comments)
                .then((result) => {
                    this.setState({
                        activity: activity
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    /**
     * Generate activity questions
     * @param activity activity object
     */
    getQuestion(activity: Activity) {
        let questions: QuestionBase<any>[] = [];
        let validators: { [s: string]: Validator<any>; } = {};
        //Add description text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Description is required.'
        };
        questions.push(new TextboxQuestion({
            key: 'description',
            label: 'Description',
            value: activity.description,
            validators: validators,
            type: this.formConfig.inputTypeDef.text,
            order: 10
        }));

        //Add implementation plan text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Implementation plan is required.'
        };
        questions.push(new TextAreaQuestion({
            key: 'implemetationPlan',
            label: 'Implemetation Plan',
            value: activity.implemetationPlan,
            validators: validators,
            rows: 5,
            order: 20
        }));

        //Add project to text
        questions.push(new ReferenceQuestion({
            key: 'project',
            label: 'Project',
            value: activity.project,
            serverUrl: this.config.apiServiceURL.projects,
            displayField: 'name',
            listFields: ['name'],
            searchBar: true,
            order: 30
        }));

        let options: KeyValue[] = [];
        Object.keys(this.config.activityStatus).forEach((opt, ind) => {
            options.push(this.config.activityStatus[opt]);
        });
        options = options.sort((a, b) => a.key - b.key);
        options.unshift(this.config.defaultDropDownOptions.none);   //default value
        //Add Status text
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Status is required.'
        };
        questions.push(new DropdownQuestion({
            key: 'status',
            label: 'Status',
            value: activity.status,
            validators: validators,
            options: options,
            searchBar: true,
            order: 50
        }));

        //Add assigned to text
        questions.push(new ReferenceQuestion({
            key: 'assignedTo',
            label: 'Assigned to',
            value: activity.assignedTo,
            serverUrl: this.config.apiServiceURL.users,
            displayField: 'email',
            listFields: ['email', 'firstName', 'lastName'],
            searchBar: true,
            order: 60
        }));


        //Add plan date
        let dateRange = activity.planDate;
        dateRange.startDate = dateRange.startDate ? new Date(dateRange.startDate) : undefined;
        dateRange.endDate = dateRange.endDate ? new Date(dateRange.endDate) : undefined;
        validators = {}
        validators[this.formConfig.formValidators.require] = {
            value: true,
            errorMessage: 'Plan date is required.'
        };
        questions.push(new DateRangeQuestion({
            key: 'planDate',
            label: 'Plan',
            value: dateRange,
            validators: validators,
            order: 70
        }));

        //Add actual date
        dateRange = activity.actualDate;
        dateRange.startDate = dateRange.startDate ? new Date(dateRange.startDate) : undefined;
        dateRange.endDate = dateRange.endDate ? new Date(dateRange.endDate) : undefined;
        questions.push(new DateRangeQuestion({
            key: 'actualDate',
            label: 'Actual',
            value: dateRange,
            order: 80
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
                    <CommentLog loginUser={this.props.loginUser}
                        comments={this.state.activity.comments}
                        onSubmitComment={this.handleSubmitComment}></CommentLog>
                </div>
            );
        }
        return result;
    }

    render() {
        let questions = this.getQuestion(this.state.activity);
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

export default withRouter(ActivityComponent);