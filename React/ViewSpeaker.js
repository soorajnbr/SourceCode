import React, { Component } from 'react';
import { topics, langs } from './constants';
import fAvatar from '../assets/images/f-avatar.jpg';
import mAvatar from '../assets/images/m-avatar.jpg';

class ViewSpeaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.speaker? props.speaker.id :'',
            name: props.speaker? props.speaker.name :'',
            surname: props.speaker && props.speaker.surname ? props.speaker.surname :'',
            gender: props.speaker && props.speaker.gender? props.speaker.gender :'male',
            description: props.speaker && props.speaker.description ? props.speaker.description :'',
            publisher: props.speaker && props.speaker.publisher ? props.speaker.publisher :'',
            langs: props.speaker && props.speaker.languages[0]? props.speaker.languages[0] :{},
            topic: props.speaker && props.speaker.topic[0]? props.speaker.topic[0] :{},
            publications: props.speaker && props.speaker.publicationses? props.speaker.publicationses : [],
            audios: props.speaker && props.speaker.audios? props.speaker.audios : [],
            videos: props.speaker && props.speaker.videos? props.speaker.videos : [],
            imageUrl: props.speaker && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
        }
    }

    componentWillReceiveProps(nextProps) {
        // ####### Updating state of speaker data based on props change ######
        if(this.props.speaker !== nextProps.speaker){
            console.log('nextProps', nextProps);
            const props = nextProps;
            this.setState({
                id: props.speaker? props.speaker.id :'',
                name: props.speaker? props.speaker.name :'',
                surname: props.speaker && props.speaker.surname ? props.speaker.surname :'',
                gender: props.speaker && props.speaker.gender? props.speaker.gender :'male',
                description: props.speaker && props.speaker.description ? props.speaker.description :'',
                publisher: props.speaker && props.speaker.publisher ? props.speaker.publisher :'',
                langs: props.speaker && props.speaker.languages[0]? props.speaker.languages[0] :{},
                topic: props.speaker && props.speaker.topic[0]? props.speaker.topic[0] :{},
                publications: props.speaker && props.speaker.publicationses? props.speaker.publicationses : [],
                audios: props.speaker && props.speaker.audios? props.speaker.audios : [],
                videos: props.speaker && props.speaker.videos? props.speaker.videos : [],
                imageUrl: props.speaker && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
            })

        }
    }

    render() {

        let topicsSelected = [];
        let langSelected = [];
        this.state.topic && Object.keys(this.state.topic).map((topic) => {
            let sel = false;
            if(this.state.topic[topic] === true){
                sel = topics.find(genre => genre.id == topic);
                topicsSelected.push(sel.text);
            }
        });
        this.state.langs && Object.keys(this.state.langs).map((lang) => {
            let langSel = false;
            if(this.state.langs[lang] === true){
                langSel = langs.find(language => language.id == lang);
                langSelected.push(langSel.text);
            }
        });
        topicsSelected = topicsSelected.join(', ');
        langSelected = langSelected.join(', ');

        let avatar = fAvatar;
        if(this.state.imageUrl){
            avatar = this.state.imageUrl;
        }else if (this.state.imageUrl == '' && this.state.gender === 'male') {
            avatar = mAvatar;
        }

        return (
            <div className="form add-speaker view-sp">
                <fieldset className="form-group">
                    <legend>Speaker Details</legend>
                    <div className="form-group dp col-xs-4">
                        <img src={avatar} alt="" />
                    </div>
                    <div className="form-group text-capitalize col-xs-8">
                        <label htmlFor="name">Vorname</label>: {this.state.name} <br />
                        <label htmlFor="name">Nachname</label>: {this.state.surname} <br />
                        <label htmlFor="name">Geschlecht</label>: {this.state.gender === `male`? `Männlich` : `Weiblich`} <br />
                        <label htmlFor="name">Verlag</label>: {this.state.publisher}
                    </div>

                    <div className="form-group col-xs-10">
                        <label htmlFor="name">Beschreibung: </label> <div>{this.state.description}</div>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="name">Topics:</label> <div>{topicsSelected}</div>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="name">Sprachen:</label> <div>{langSelected}</div>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="name">Publikationen: </label>
                        <ul className="list-group">
                            <li className="list-group-item header">
                                <span className="firstClmn">Name</span>
                                <span className="secondClmn">Quelle</span>
                                <span className="thirdClmn">URL</span>
                            </li>
                            {this.state.publications && this.state.publications.map((publication, index) =>
                            <li key={index} className="list-group-item">
                                <span className="firstClmn">{publication.name}</span>
                                <span className="secondClmn">{publication.source}</span>
                                <span className="thirdClmn">{publication.url}</span>
                            </li>
                            )}
                        </ul>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="name">Audios: </label>
                        <ul className="list-group">
                            <li className="list-group-item header">
                                <span className="firstClmn">Name</span>
                                <span className="secondClmn">Quelle</span>
                                <span className="thirdClmn">URL</span>
                            </li>
                            {this.state.audios && this.state.audios.map((audio, index) =>
                                <li key={index} className="list-group-item">
                                    <span className="firstClmn">{audio.name}</span>
                                    <span className="secondClmn">{audio.source}</span>
                                    <span className="thirdClmn">{audio.url}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="name">Videos: </label>
                        <ul className="list-group">
                            <li className="list-group-item header">
                                <span className="firstClmn">Name</span>
                                <span className="secondClmn">Quelle</span>
                                <span className="thirdClmn">URL</span>
                            </li>
                            {this.state.videos && this.state.videos.map((video, index) =>
                                <li key={index} className="list-group-item">
                                    <span className="firstClmn">{video.name}</span>
                                    <span className="secondClmn">{video.source}</span>
                                    <span className="thirdClmn">{video.url}</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </fieldset>
            </div>
        );
    }
}
export default ViewSpeaker;
