import React, { Component } from 'react';
import '../../App.css';
import '../speakers/speakers.css';
import fire from '../../fire.js';
import moment from 'moment';
import SpeakerComponent from '../speakers/speakerComponent.js';

export class EventDetails extends Component {
    constructor() {
      super();
      this.state = {
        question: '',
        asked: false
      }
      this.handleChange = this.handleChange.bind(this)
    }

    render() {
        console.log(this.state)
        let self = this.state;
            return (
                <div>
                { self.speaker !== undefined ?
                <div className="speakers">
                    <SpeakerComponent 
                        asked={this.state.asked}
                        speaker={this.state.speaker} 
                        name={self.speaker.first + ' ' + self.speaker.last} 
                        handleChange={this.handleChange} 
                        email={self.speaker.email}
                        question={this.state.question}
                        createQuestion={this.createQuestion}>
                    </SpeakerComponent> 
                </div>
                :
                <div></div>
                }
                </div>
              ); 
        }

    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value });
    }

    createQuestion = (email, text) => {
        let now = moment().format('hh:mm A');
        let db = fire.firestore();
        let that = this;
        db.collection("speakers").doc(email.email).collection("questions").doc(localStorage.getItem('fingerprint')).set({
            question: text.question,
            answer: "",
            timeAsked: now
        })
        .then(function() {
            console.log("Document successfully written!")
            that.setState({
                asked: true
            })
            // window.location.reload();
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    componentDidMount = () => {
        console.log(localStorage.getItem('fingerprint'))
        let props = this.props.location.state
        this.setState({props}, () => 
        this.checkSpeaker())
    }

    checkIfAsked = () => {
        console.log(this.state)
        const db = fire.firestore()
        db.collection('speakers')
        .doc(this.state.props.speaker)
        .collection('questions')
        .doc(localStorage.getItem('fingerprint'))
        .get()
        .then((doc) => {
          if (doc.exists) {
            /** Doc exists, so the username is not available */
            return this.setState({
                asked: true
            })
          }
          return
        })
    }

    checkSpeaker = () => {
        console.log(this.state.props.id)
        const db = fire.firestore();
        db.settings({
          timestampsInSnapshots: true
        });
        var wholeData = [];
        let questions = new Array(9);
        for (let q in questions) {
            q = " ";
        }
        var speakerRef = db.collection('speakers').doc(this.state.props.speaker)
        speakerRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log('Document data:', doc.data());
            this.setState({
                speaker: doc.data()
            }, () => this.checkIfAsked())
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }

  }
  
export default EventDetails;