import React from 'react';
import PropTypes from 'prop-types';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import './Ckeditor.scss';

const ContainerDiv = styled.div`

`;

export class ReactCkeditor extends React.Component {

    render() {
        return (
            <ContainerDiv>
                <CKEditor
                    editor={ClassicEditor}
                    data={this.props.data}
                    onInit={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                        this.props.dataChange(data, this.props.ckeditorKey);
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
            </ContainerDiv>
        )
    }
}

ReactCkeditor.propTypes = {
    data: PropTypes.string.isRequired,
    dataChange: PropTypes.func.isRequired,
    ckeditorKey: PropTypes.string.isRequired
}