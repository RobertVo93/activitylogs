import React from 'react';
import styled from 'styled-components';
import { Dropdown } from 'react-bootstrap';

const ContainerDiv = styled.div`
    width: 80%;
    margin: auto;
    padding-top: 50px;
    padding-bottom: 100px;
    font-size: small;
    font-weight: 400;
`;
const DownloadContainerDiv = styled.div`
    width: 100%;
    display: inline-block;
`;
const dropdownStyle: React.CSSProperties = {
    height: '38px',
    width: '100%',
    fontWeight: 400,
    fontSize: 'small',
    borderRadius: '.25rem',
    border: '1px solid #e8e8e8 !important',
    padding: '1.07em 1em'
};
export interface DocumentViewerProps {
    contents: string
}
export class DocumentViewer extends React.Component<DocumentViewerProps, {}> {
    handleOnclick(type: string) {
        switch (type) {
            case 'PDF':
                var printWindow = window.open('', '');
                if (printWindow) {
                    printWindow.document.write('<html><head><title></title>');
                    printWindow.document.write('</head><body >');
                    printWindow.document.write(this.props.contents);
                    printWindow.document.write('</body></html>');
                    printWindow.document.close();
                    printWindow.print();
                }
                break;
            case 'CSV':
                //TODO: Implement
                break;
            case 'JSON':
                //TODO: implement
                break;
            default:
                break;
        }
    }
    render() {
        return (
            <ContainerDiv>
                <DownloadContainerDiv>
                    <Dropdown className="float-right">
                        <Dropdown.Toggle variant="primary" id="dropdown-basic" style={dropdownStyle}>
                            Download
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.handleOnclick('PDF')}>PDF</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleOnclick('CSV')}>CSV</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.handleOnclick('JSON')}>JSON</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </DownloadContainerDiv>
                <div id="contents" style={{ fontFamily: 'times' }} dangerouslySetInnerHTML={{ __html: this.props.contents }} ></div>
            </ContainerDiv>
        );
    }
}