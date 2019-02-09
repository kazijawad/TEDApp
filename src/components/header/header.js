import React, { Component } from 'react';
import '../../App.css';
import HeaderBG from '../../header-bg.svg';
import logo from '../../logo.png';
import back from '../../back.png';
import bottle from '../../questionbottle.svg';
import { Link } from 'react-router-dom';
import './header.css';
import { SocialIcon } from 'react-social-icons';
import Popup from "reactjs-popup";

export class Header extends Component {
    constructor (props) {
        super(props)
        this.state = {
          confirmationOpen: false,
          open: false
        }
    }

    closeConfirmation = () => {
        // this.setState({confirmationOpen: false}, () => this.props.askQuestion())
        this.props.askQuestion();
    }

    openConfirmation = (e) => {
        e.preventDefault()
        this.setState({confirmationOpen: true}, () => console.log("shalom we opening"))
    }

    openModal = () => {
        this.setState({ open: true })
    }

    closeModal = () => {
        this.setState({ open: false })
    }

    closeModalandOpenConfirmation = () => {
        console.log("closing modal and opening confirmation")
        this.setState({
            confirmationOpen: true,
            open: false
        })
    }

    sendQuestion = (e) => {
        e.preventDefault()
        if (this.props.question.length > 0 && this.props.name.length > 0) {
            this.closeModalandOpenConfirmation();
        }
        else {
            return;
        }
    }

    render() {
        let that = this;
        console.log(this.props)
        let nameBlank = true;
        let questionBlank = true;
        const style = {
            display: 'flex',
            justifyText: 'center',
            flexDirection: 'column',
            alignItems: 'space-between',
            padding: '30px 40px',
            width: '70%',
            border: 'none',
            borderRadius: '10px'
          }

        let headerStyle = "sticky";
        if (this.props.headerStyle === "fixed") {
            headerStyle = "sticky-header";
        } else {
            headerStyle = "sticky";
        }


        if (this.props.errors !== undefined) {
            nameBlank = this.props.errors.name
            questionBlank = this.props.errors.question
        }
        return (
            <header className={headerStyle}>
                {/* The header should be collapsed, so make the description small */}
                {this.props.link !== undefined && this.props.link === false ?
                <div>
                    <h6 className="description-small">{this.props.description}</h6>
                </div>
                :
                    <Link key={'home'} to={{
                        pathname: '/',
                        state: {  
                        }
                        }}>
                    <img src={this.props.image === undefined ? logo : back} className={this.props.image === undefined ? "logo" : "arrow"} alt="TEDxCMU"></img>
                    </Link>
                }
                {/* <div className="header-bg">
                    <img src={HeaderBG} alt="header background"></img>
                </div> */}
                <div className="header-content">
                    {this.props.speaker === true ?
                        <div className="speaker-header">
                            { this.props.image !== undefined ?
                                <div className="image-container">
                                    <div className="image-border">
                                        <img className="image" alt="speaker" src={this.props.image}></img>
                                    </div>
                                </div>
                            :
                                <div></div>
                            }
                            <br />
                            <h1>{this.props.title}</h1>
                            { this.props.tag !== undefined ?
                                <div>
                                    <h6 className="description">{this.props.tag}</h6>
                                </div>
                            :
                                <div></div>
                            }
                            { this.props.twitter !== undefined ?
                                <div className="twitter-icon">
                                    <SocialIcon network="twitter" rel="noopener noreferrer" url={this.props.twitter} taget="_blank" fgColor="#ffffff" bgColor="rgba(0,0,0,0)" />
                                </div>
                            :
                                <div></div>
                            }
                            { this.props.asked === true ?
                                <div className="question-btn-container">
                                    <h6><button className="question-btn question-pos-asked">Asked</button></h6>
                                </div>
                            :
                                <div className="question-btn-container">
                                    <h6><button onClick={() => this.openModal()} className="question-btn question-pos">Ask Question</button></h6>
                                    <Popup
                                    open={this.state.open}
                                    closeOnDocumentClick
                                    onClose={this.closeModal}
                                    contentStyle={style}
                                    >
                                    <div className="modal">
                                        <div>
                                            <h4>Dear {this.props.title},</h4>
                                            <textarea type="text" id="iOS" required className="popup-input" name="question" placeholder={ questionBlank ? "Please write a question before submitting." : "Write your question here..."} onChange={that.props.handleChange}/>
                                            <h4>Sincerely, </h4>
                                            <input type="text" style={{height: '20px'}} className="popup-input-small" required minLength="4" siz="10" name="name" placeholder={ nameBlank ? "Please add your name." : "Jane Doe..."} onChange={that.props.handleChange}/>
                                            <div className="popup-btns">
                                                <button className="popup-btn-cancel" onClick={this.closeModal}>Cancel</button>
                                                <button className="popup-btn-success button-primary" onClick={e => this.sendQuestion(e)}>Submit</button>
                                            </div>
                                        </div>
                                    </div>
                                    </Popup>
                                    <Popup
                                    open={this.state.confirmationOpen}
                                    closeOnDocumentClick
                                    onClose={this.closeConfirmation}
                                    contentStyle={style}
                                    >
                                    <div className="modal">
                                        <div className="popup-response">
                                            <img src={bottle} className="bottle" alt="Bottle" />
                                            <p>Thank you for asking a question! Please check back on the Q&amp;A page later.</p>
                                            <button className="popup-button-success button-primary" style={{width: '100%', borderRadius: '24px'}} onClick={this.closeConfirmation}>Ok</button>
                                        </div>
                                    </div>
                                    </Popup>
                                </div>
                            }

                        </div>
                        :
                        <div>
                            {this.props.link === false ?
                            <div>
                                {/* The header is collapsed, so don't add a title or description */}
                                {/* <h1 className="title">{this.props.title}</h1>
                                <h6 className="description">{this.props.description}</h6> */}
                            </div>
                            :
                            <div>
                                {/* This is a normal header, so put the title and description in where they should be */}
                                <h1 className="title">{this.props.title}</h1>
                                <h6 className="description">{this.props.description}</h6>
                            </div>
                            }
                        </div>
                    }
                </div>
                <div className="bottom-space"></div>
            </header>
        );        
    }
};

export default Header;