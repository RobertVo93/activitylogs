import React from 'react';
import { CommentProps, CommentStates, initialCommentStates } from './CommentLogPropsStates';
import styled from 'styled-components';
import { Comment } from '../../class/common/comment';

const LeftDiv = styled.div`
    float: left;
`;
const RightDiv = styled.div`
    float: right;
`;
const ContainerDiv = styled.div`

`;
const ButtonCustom = styled.button`
    float: right;
    margin-top: 10px;
    border-radius: .25rem;
    border: 0.5px solid #c9c9c9;
    width: 50px;
    height: 28px;
    cursor: pointer;
`;
const ContainerInlineBlock = styled.div`
    display: inline-block;
    width: 100%;
    border-bottom: 0.5px solid gray;
    padding-bottom: 5px;
`;
const CommentDiv = styled.div`
    border: 0.5px solid gray;
    border-radius: .25rem;
    padding: 15px;
    margin-top: 10px;
`;
export class CommentLog extends React.Component<CommentProps, CommentStates> {
    constructor(props: CommentProps) {
        super(props);

        this.state = initialCommentStates;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
        this.renderCommentTitle = this.renderCommentTitle.bind(this);
    }
    
    componentDidMount() {
        if(this.props.comments){
            this.setState({
                comments: this.props.comments
            });
        }
    }

    /**
     * Handle event textarea change data
     * @param e textarea changed
     */
    handleChange(e: any) {
        this.setState({
            newComment: e.target.value
        });
    }

    /**
     * Handle submit comment
     */
    handleSubmitComment() {
        let current = new Date();
        let comments = this.state.comments;
        let newComment = new Comment({
            userComment: this.props.loginUser,
            comment: this.state.newComment,
            commentDate: current.toUTCString()
        });
        comments.push(newComment);
        this.setState({
            comments: comments,
            newComment: ''
        }, () => {
            this.props.onSubmitComment(this.state); //callback
        });
    }

    /**
     * Render Comment title
     */
    renderCommentTitle(){
        let result;
        if(this.state.comments.length > 0){
            result = (
                <div>Activities ({this.state.comments.length}):</div>
            );
        }
        return result;
    }

    /**
     * in case of html string => need this function to convert to html dom
     * @param comment comment
     */
    renderCommentRawHTML(comment: string){
        return (
            <div dangerouslySetInnerHTML={{__html: comment}}></div>
        )
    }

    render() {
        return (
            <ContainerDiv>
                <div className="comment-new">
                    <div>Note <textarea value={this.state.newComment} onChange={this.handleChange} className="form-control" rows={2}></textarea></div>
                    <ContainerInlineBlock>
                        <ButtonCustom onClick={this.handleSubmitComment}>Post</ButtonCustom>
                    </ContainerInlineBlock>
                </div>
                <div className="comment-list">
                    {
                        this.renderCommentTitle()
                    }
                    {
                        this.state.comments.map((com, ind) => (
                            <CommentDiv className="comment" key={ind}>
                                <ContainerInlineBlock className="comment-header">
                                    <LeftDiv className="comment-user">
                                        {
                                        `${com.userComment.firstName} ${com.userComment.lastName}`
                                        }
                                    </LeftDiv>
                                    <RightDiv className="comment-date">
                                        {
                                            com.commentDate
                                        }
                                    </RightDiv>
                                </ContainerInlineBlock>
                                <div className="comment-content">
                                    {
                                        this.renderCommentRawHTML(com.comment)
                                    }
                                </div>
                            </CommentDiv>
                        ))
                    }
                </div>
            </ContainerDiv>
        );
    }
}