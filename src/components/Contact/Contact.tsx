import React from 'react';
export class Contact extends React.Component {
    render() {
        const formContainer = {
            width: '50%',
            margin: 'auto'
        } as React.CSSProperties;
        return (
            <div className="contact-component">
                <section className="mbr-section form4 cid-s05iX5CkzH" id="form4-k">
                    <div className="container">
                        <div style={formContainer}>
                            <div>
                                <h2 className="pb-3 align-left mbr-fonts-style display-2">
                                    Drop a Line
                                </h2>
                                <div>
                                    <div className="icon-block pb-3 align-left">
                                        <span className="icon-block__icon">
                                            <span className="mbri-letter mbr-iconfont"></span>
                                        </span>
                                        <h4 className="icon-block__title align-left mbr-fonts-style display-5">
                                            Don't hesitate to contact us
                                        </h4>
                                    </div>
                                    <div className="icon-contacts pb-3">
                                        <h5 className="align-left mbr-fonts-style display-7">
                                            Ready for offers and cooperation
                                        </h5>
                                        <p className="mbr-text align-left mbr-fonts-style display-7">
                                            Phone: +84 (0) 33 870 5850 <br />
                                            Email: robertvo.developer.93@mail.com
                                        </p>
                                    </div>
                                </div>
                                <div data-form-type="formoid">
                                    <form action="https://mobirise.com/" method="POST" className="mbr-form form-with-styler" data-form-title="Mobirise Form">
                                        <input type="hidden" name="email" data-form-email="true" value="NHgs6oyl7goD/2aO9xww+qh9DyXQV7DlGeDDf/DT7dkPO7mgri3MdhyGoeU3Q+oRWWU12LOq8p80NGjERdbxIWvoy+fcupNDheS2fFJMm7aX6zD0pQ7swhjl+LGjC1UD" />
                                        <div className="row">
                                            <div hidden={true} data-form-alert="" className="alert alert-success col-12">
                                                Thanks for filling out the form!
                                            </div>
                                            <div hidden={true} data-form-alert-danger="" className="alert alert-danger col-12"></div>
                                        </div>
                                        <div className="dragArea row">
                                            <div className="col-md-6  form-group" data-for="name">
                                                <input type="text" name="name" placeholder="Your Name" data-form-field="Name" required={true} className="form-control input display-7" id="name-form4-k" />
                                            </div>
                                            <div className="col-md-6  form-group" data-for="phone">
                                                <input type="text" name="phone" placeholder="Phone" data-form-field="Phone" required={true} className="form-control input display-7" id="phone-form4-k" />
                                            </div>
                                            <div data-for="email" className="col-md-12  form-group">
                                                <input type="text" name="email" placeholder="Email" data-form-field="Email" className="form-control input display-7" required={true} id="email-form4-k" />
                                            </div>
                                            <div data-for="message" className="col-md-12  form-group">
                                                <textarea name="message" placeholder="Message" data-form-field="Message" className="form-control input display-7" id="message-form4-k"></textarea>
                                            </div>
                                            <div className="col-md-12 input-group-btn  mt-2 align-center">
                                                <button type="submit" className="btn btn-primary btn-form display-4">SEND MESSAGE</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}