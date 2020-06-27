import React from 'react';
import './Home.scss';
export class Home extends React.Component {
    render() {
        const myStyle = {
            opacity: '0.5',
            backgroundColor: 'rgb(35, 35, 35)'
        } as React.CSSProperties;
        const myStyleWidth100 = {
            width: '100%'
        } as React.CSSProperties;
        return (
            <div>
                <section className="cid-s05dw7YB4t mbr-fullscreen mbr-parallax-background" id="header2-1">
                    <div className="mbr-overlay" style={myStyle}></div>
                    <div className="container align-center">
                        <div className="justify-content-md-center">
                            <div className="mbr-white">
                                <h1 className="mbr-section-title mbr-bold pb-3 mbr-fonts-style display-1">
                                    GrownUp
                                </h1>
                                <p className="mbr-text pb-3 mbr-fonts-style display-5">
                                    Build the future together
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="mbr-arrow hidden-sm-down" aria-hidden="true">
                        <a href="#footer">
                            <i className="mbri-down mbr-iconfont"></i>
                        </a>
                    </div>
                </section>
                <section className="header7 cid-s05dxD9ioe" id="header7-2">
                    <div className="container">
                        <div className="media-container-row">
                            <div className="media-content align-right">
                                <h1 className="mbr-section-title mbr-white pb-3 mbr-fonts-style display-1">
                                    Intro with Video
                                </h1>
                                <div className="mbr-section-text mbr-white pb-3">
                                    <p className="mbr-text mbr-fonts-style display-5">
                                        Intro with background color, paddings and a video on the right. Mobirise helps you cut down development time by providing you with a flexible website editor with a drag and drop interface.
                                    </p>
                                </div>
                            </div>
                            <div className="mbr-figure" style={myStyleWidth100}>
                                <iframe title="introduce-video" className="mbr-embedded-video" src="https://www.youtube.com/embed/uNCr7NdOJgw?rel=0&amp;amp;showinfo=0&amp;autoplay=0&amp;loop=0" width="1280" height="720" frameBorder="0" allowFullScreen></iframe>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="testimonials1 cid-s05iIc8MxP" id="testimonials1-h">
                    <div className="container">
                        <div className="media-container-row">
                            <div className="title col-12 align-center">
                                <h2 className="pb-3 mbr-fonts-style display-2">
                                    WHAT OUR FANTASTIC USERS SAY
                                </h2>
                                <h3 className="mbr-section-subtitle mbr-light pb-3 mbr-fonts-style display-5">
                                    This theme is based on Bootstrap 4 - most powerful mobile first framework
                                </h3>
                            </div>
                        </div>
                    </div>
                    <div className="container pt-3 mt-2">
                        <div className="media-container-row">
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="1" src="assets/images/face1.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="2" src="assets/images/face2.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="3" src="assets/images/face3.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="4" src="assets/images/face2.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="5" src="assets/images/face2.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div className="mbr-testimonial p-3 align-center col-12 col-md-6 col-lg-4">
                                <div className="panel-item p-3">
                                    <div className="card-block">
                                        <div className="testimonial-photo">
                                            <img alt="6" src="assets/images/face2.jpg" />
                                        </div>
                                        <p className="mbr-text mbr-fonts-style display-7">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi, aspernatur, voluptatibus, atque, tempore molestiae.
                                        </p>
                                    </div>
                                    <div className="card-footer">
                                        <div className="mbr-author-name mbr-bold mbr-fonts-style display-7">
                                            John Smith
                                        </div>
                                        <small className="mbr-author-desc mbr-italic mbr-light mbr-fonts-style display-7">
                                            Developer
                                        </small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}