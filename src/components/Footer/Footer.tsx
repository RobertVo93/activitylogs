import React from 'react';
export class Footer extends React.Component {
    render() {
        return (
            <section className="cid-s05i0OO9sN" id="footer">
                <div className="container">
                    <div className="media-container-row content text-white">
                        <div className="col-12 col-md-3">
                            <div className="media-wrap">
                                <a href="/">
                                    <img src={`${process.env.PUBLIC_URL}/assets/images/mbr-192x108.jpg`} alt="GrownUp" title="" />
                                </a>
                            </div>
                        </div>
                        <div className="col-12 col-md-3 mbr-fonts-style display-7">
                            <h5 className="pb-3">
                                Address
                            </h5>
                            <p className="mbr-text">36 Bo Bao Tan Thang,<br />Tan Phu, Ho Chi Minh, VN</p>
                        </div>
                        <div className="col-12 col-md-6 mbr-fonts-style display-7">
                            <h5 className="pb-3">
                                Contacts
                            </h5>
                            <p className="mbr-text">
                                Email: robertvo.developer.93@gmail.com &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;<br />Phone: +84 (0) 33 870 5850
                            </p>
                        </div>
                    </div>
                    <div className="footer-lower">
                        <div className="media-container-row">
                            <div className="col-sm-12">
                                <hr />
                            </div>
                        </div>
                        <div className="media-container-row mbr-white">
                            <div className="col-sm-6 copyright">
                                <p className="mbr-text mbr-fonts-style display-7">
                                    © Copyright 2020 GrownUp - All Rights Reserved
                                </p>
                            </div>
                            <div className="col-md-6">
                                <div className="social-list align-right">
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://twitter.com/mobirise" target="_blank">
                                            <span className="socicon-twitter socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://www.facebook.com/pages/Mobirise/1616226671953247" target="_blank">
                                            <span className="socicon-facebook socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://www.youtube.com/c/mobirise" target="_blank">
                                            <span className="socicon-youtube socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://instagram.com/mobirise" target="_blank">
                                            <span className="socicon-instagram socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://plus.google.com/u/0/+Mobirise" target="_blank">
                                            <span className="socicon-googleplus socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                    <div className="soc-item">
                                        <a rel="noopener noreferrer" href="https://www.behance.net/Mobirise" target="_blank">
                                            <span className="socicon-behance socicon mbr-iconfont mbr-iconfont-social"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}