import React, { Component } from 'react';

class Contact extends Component {
    state = {
        email: '',
        name: '',
        message: '',
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render(){
        const { name, email, message } = this.state;
        return (
            <div className="content">
                <h1>Contact us</h1>
                <form
                    action="https://formspree.io/f/mzbyzall"
                    method="POST"
                    className="form-container"
                >
                    <div className={`form-container__form-row ${name ? "active" : ''}`}>
                        <input 
                            type="text"
                            name="name"
                            className="form-container__form-textbox"
                            required
                            value={name}
                            onChange={this.onChange}
                        />
                        <label className="form-container__form-label" htmlFor="name">Your name</label>
                    </div>
                    <div className={`form-container__form-row ${email ? "active" : ''}`}>
                        <input 
                            type="email"
                            name="email"
                            className="form-container__form-textbox"
                            required
                            value={email}
                            onChange={this.onChange}
                        />
                        <label className="form-container__form-label" htmlFor="email">Your Email</label>
                    </div>
                    <div className={`form-container__form-row ${message ? "active" : ''}`}>
                        <textarea 
                            name="message"
                            className="form-container__form-textbox"
                            required
                            value={message}
                            onChange={this.onChange}
                        />
                        <label className="form-container__form-label" htmlFor="email">Message</label>
                    </div>
                    <div className="form-container__form-row">
                        <input
                            type="submit"
                            value="Send"
                            className="form-container__form-submit"
                        />
                    </div>
                </form>
            </div>
        );
    }
};

export default Contact