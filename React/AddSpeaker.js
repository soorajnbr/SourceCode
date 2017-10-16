import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import { ClipLoader } from 'halogen';
import { topics, langs } from './constants';


class AddSpeaker extends Component {
    constructor(props){
        super(props);
        // ####### Setting up default state ############
        this.state={
            id: props.isEdit? props.speaker.id :'',
            name: props.isEdit? props.speaker.name :'',
            surname: props.isEdit && props.speaker.surname ? props.speaker.surname :'',
            gender: props.isEdit && props.speaker.gender? props.speaker.gender :'male',
            description: props.isEdit && props.speaker.description ? props.speaker.description :'',
            publisher: props.isEdit && props.speaker.publisher ? props.speaker.publisher :'',
            langs: props.isEdit && props.speaker.languages[0]? props.speaker.languages[0] :{},
            langsIds: props.isEdit && props.speaker.languages[0]? props.speaker.languages[0].id :false,
            topic: props.isEdit && props.speaker.topic[0]? props.speaker.topic[0] :{},
            topicIds: props.isEdit && props.speaker.topic[0]? props.speaker.topic[0].id :false,
            publicationIds: props.isEdit && props.speaker.publicationses? this._setPublicationIds(props.speaker.publicationses) : [],
            publications: props.isEdit && props.speaker.publicationses? props.speaker.publicationses : [],
            audioIds: props.isEdit && props.speaker.audios? this._setAudioIds(props.speaker.audios) : [],
            audios: props.isEdit && props.speaker.audios? props.speaker.audios : [],
            videoIds: props.isEdit && props.speaker.videos? this._setVideoIds(props.speaker.videos) : [],
            videos: props.isEdit && props.speaker.videos? props.speaker.videos : [],
            isEdit: props.isEdit? true : false,
            imageUrl: props.isEdit && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
            imageId: '',
            loader: props.loader ? true : false,
            nameError: false,
            imgLoader: false,
        };
    }

    componentWillReceiveProps(nextProps) {
		// ####### Updating state based on props ############
        if(this.props.speaker !== nextProps.speaker){
            const props = nextProps;
            this.setState({
                id: props.isEdit? props.speaker.id :'',
                name: props.isEdit? props.speaker.name :'',
                surname: props.isEdit && props.speaker.surname ? props.speaker.surname :'',
                gender: props.isEdit && props.speaker.gender? props.speaker.gender :'male',
                description: props.isEdit && props.speaker.description ? props.speaker.description :'',
                publisher: props.isEdit && props.speaker.publisher ? props.speaker.publisher :'',
                langs: props.isEdit && props.speaker.languages[0]? props.speaker.languages[0] :{},
                langsIds: props.isEdit && props.speaker.languages[0]? props.speaker.languages[0].id :false,
                topic: props.isEdit && props.speaker.topic[0]? props.speaker.topic[0] :{},
                topicIds: props.isEdit && props.speaker.topic[0]? props.speaker.topic[0].id :false,
                publicationIds: props.isEdit && props.speaker.publicationses? this._setPublicationIds(props.speaker.publicationses) : [],
                publications: props.isEdit && props.speaker.publicationses? props.speaker.publicationses : [],
                audioIds: props.isEdit && props.speaker.audios? this._setAudioIds(props.speaker.audios) : [],
                audios: props.isEdit && props.speaker.audios? props.speaker.audios : [],
                videoIds: props.isEdit && props.speaker.videos? this._setVideoIds(props.speaker.videos) : [],
                videos: props.isEdit && props.speaker.videos? props.speaker.videos : [],
                isEdit: props.isEdit? true : false,
                imageUrl: props.isEdit && props.speaker.imageurl1 ? props.speaker.imageurl1 :'',
                imageId: '',
                loader: props.loader ? true : false,
                nameError: false,
                imgLoader: false,
            })

        }
        this.setState({
            loader: nextProps.loader ? true : false,
        });
    }

    _setPublicationIds = (publications) => {
        const pubIds = [];
        publications.map((publication) => {
            pubIds.push(publication.id);
        });
        return pubIds;
    }

    _setAudioIds = (audios) => {
        const audioIds = [];
        audios.map((audio) => {
            audioIds.push(audio.id);
        });
        return audioIds;
    }

    _setVideoIds = (videos) => {
        const videoIds = [];
        videos.map((video) => {
            videoIds.push(video.id);
        });
        return videoIds;
    }

    // ####### Making the selected topics checked ############
    _setChecked = (topic) => {
        const checkboxVal = this.state.topic[topic]? true : false;
        return checkboxVal;
    }

    // ####### Making the selected languages checked ############
    _setLangChecked = (lang) => {
        const checkboxVal = this.state.langs[lang]? true : false;
        return checkboxVal;
    }

    render() {


        const formTitle = this.state.isEdit ? 'Edit Speaker' :'Neuen Speaker hinzufügen';
        const color = '#4DAF7C';
        const errorStyle = this.state.nameError ? 'error' : '';
        return (
            <div className="form add-speaker">
                <form>
                    <fieldset className="form-group">
                        <legend>{formTitle}</legend>
                    <fieldset className="form-group dp col-xs-6">
                        <legend>Bild</legend>
                        {this.state.imgLoader && <div className="img-spinner">
                            <ClipLoader color={color}/>
                        </div> }
                        {!this.state.imageUrl &&
                        <Dropzone
                            onDrop={this.onDrop}
                            accept='image/*'
                            multiple={false}
                        >
                            <div>Drop an image or click to choose</div>
                        </Dropzone>}
                        {this.state.imageUrl &&
                        <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
                        }
                        {this.state.imageUrl && <a href="javascript:void(0)" onClick={this._removePic}>Remove bild</a> }
                    </fieldset>
                    <div className="form-group col-xs-6">
                        <label htmlFor="name">Vorname</label>
                        <input type="text" value={this.state.name} onChange={(e) => this._onChangeField(e)} className={`form-control ${errorStyle}`} id="name" name="name" placeholder="Name" />
                        <br /><label htmlFor="surname">Nachname</label>
                        <input type="text" value={this.state.surname} onChange={(e) => this._onChangeField(e)} className="form-control" id="surname" name="surname" placeholder="Surname" />
                    </div>

                    <div className="form-group col-xs-6">
                    <legend>Geschlecht</legend>
                        <div style={{display:'block'}}>
                            <div className="form-check col-xs-5">
                                <label className="form-check-label">
                                    <input type="radio" onChange={(e) => this._onChangeField(e)}  className="form-check-input" name="gender" id="male" value="male" checked ={this.state.gender === 'male'} />
                                    Männlich
                                </label>
                            </div>
                            <div className="form-check col-xs-7">
                                <label className="form-check-label">
                                    <input type="radio" onChange={(e) => this._onChangeField(e)} className="form-check-input" name="gender" id="female" value="female" checked ={this.state.gender === 'female'}/>
                                    Weiblich
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="form-group col-xs-6">
                        <label htmlFor="publisher">Verlag</label>
                        <input type="text" value={this.state.publisher ? this.state.publisher : ''} onChange={(e) => this._onChangeField(e)} className="form-control" id="publisher" name="publisher" placeholder="Publisher" />
                    </div>
                    <div className="form-group col-xs-12">
                        <label htmlFor="description">Beschreibung</label>
                        <textarea onChange={(e) => this._onChangeField(e)} value={this.state.description? this.state.description: ''} className="form-control" id="description" name="description"> </textarea>
                    </div>
                    <fieldset className="form-group col-xs-12">
                        <legend>Topics</legend>
                    <div className="form-check">
                        { topics.map((topic, key) =>

                        <label className="form-check-label" key={key} htmlFor={topic.id}>
                            <input type="checkbox" checked={this._setChecked(topic.id)} value={topic.id} onChange={(e) => this._onChangeTopic(e,topic.id)} id={topic.id} className="form-check-input" name={topic.id}/>
                            {topic.text}
                        </label>
                        )}
                    </div>
                    </fieldset>
                    <fieldset className="form-group col-xs-12">
                        <legend>Sprachen</legend>
                        <div className="form-check">
                            { langs.map((lang, key) =>

                                <label className="form-check-label" key={key} htmlFor={lang.id}>
                                    <input type="checkbox" checked={this._setLangChecked(lang.id)} value={lang.id} onChange={(e) => this._onChangeLang(e,lang.id)} id={lang.id} className="form-check-input" name={lang.id}/>
                                    {lang.text}
                                </label>
                            )}
                        </div>
                    </fieldset>

                    <fieldset className="form-group col-xs-12">
                        <legend>Publikationen</legend>
                        <div className="form-check">
                            <div className="form-inline">
                                <input type="text"
                                       className="form-control text firstClmn"
                                       id="pubName"
                                       name="pubName"
                                       placeholder="Name" />
                                <input type="text"
                                       className="form-control text secondClmn"
                                       id="pubSource"
                                       name="pubSource"
                                       placeholder="Quelle" />
                                <input type="text"
                                       className="form-control text thirdClmn"
                                       id="pubUrl"
                                       name="pubUrl"
                                       placeholder="URL" />
                                <span className="add-new" title="Add">
                                    <i className="fa fa-plus" aria-hidden="true" onClick={this._addPublications}></i>
                                </span>
                            </div>
                            <div className="publications">
                                <ul>
                                    { this.state.publications && this.state.publications.map((publication, index) =>
                                    <li key={index}>
                                        <span className="firstClmn">{publication.name}</span>
                                        <span className="secondClmn">{publication.source}</span>
                                        <span className="thirdClmn">{publication.url}</span>
                                        <span className="delete-pub" onClick={() => this._deletePublication(index)} title="Delete">
                                            <i className="fa fa-times"></i></span>
                                    </li>
                                    )}
                                </ul>

                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="form-group col-xs-12">
                        <legend>Audios</legend>
                        <div className="form-check">
                            <div className="form-inline">
                                <input type="text"
                                       className="form-control text firstClmn"
                                       id="audioName"
                                       name="audioName"
                                       placeholder="Name" />
                                <input type="text"
                                       className="form-control text secondClmn"
                                       id="audioSource"
                                       name="audioSource"
                                       placeholder="Quelle" />
                                <input type="text"
                                       className="form-control text thirdClmn"
                                       id="audioUrl"
                                       name="audioUrl"
                                       placeholder="URL" />
                                <span className="add-new" title="Add">
                                <i className="fa fa-plus" aria-hidden="true" onClick={this._addAudios}></i>
                            </span>
                            </div>
                            <div className="publications">
                                <ul>
                                    { this.state.audios && this.state.audios.map((audio, index) =>
                                        <li key={index}>
                                            <span className="firstClmn">{audio.name}</span>
                                            <span className="secondClmn">{audio.source}</span>
                                            <span className="thirdClmn">{audio.url}</span>
                                            <span className="delete-pub" onClick={() => this._deleteAudio(index)} title="Delete">
                                                <i className="fa fa-times"></i></span>
                                        </li>
                                    )}
                                </ul>

                            </div>
                        </div>
                    </fieldset>
                    <fieldset className="form-group col-xs-12">
                        <legend>Videos</legend>
                        <div className="form-check">
                            <div className="form-inline">
                                <input type="text"
                                       className="form-control text firstClmn"
                                       id="videoName"
                                       name="videoName"
                                       placeholder="Name" />
                                <input type="text"
                                       className="form-control text secondClmn"
                                       id="videoSource"
                                       name="videoSource"
                                       placeholder="Quelle" />
                                <input type="text"
                                       className="form-control text thirdClmn"
                                       id="videoUrl"
                                       name="videoUrl"
                                       placeholder="URL" />
                            <span className="add-new" title="Add">
                            <i className="fa fa-plus" aria-hidden="true" onClick={this._addVideos}></i>
                            </span>
                            </div>
                            <div className="publications">
                                <ul>
                                    { this.state.videos && this.state.videos.map((video, index) =>
                                        <li key={index}>
                                            <span className="firstClmn">{video.name}</span>
                                            <span className="secondClmn">{video.source}</span>
                                            <span className="thirdClmn">{video.url}</span>
                                            <span className="delete-pub" onClick={() => this._deleteVideo(index)} title="Delete">
                                                <i className="fa fa-times"></i></span>
                                        </li>
                                    )}
                                </ul>

                            </div>
                        </div>
                    </fieldset>
                    {this.state.loader && <div className="form-group col-xs-12">
                        <ClipLoader color={color}/>
                    </div> }
                    {!this.state.loader && <div className="form-group col-xs-12">
                        <button type="button" onClick={this._saveSpeaker} className="btn btn-primary save">Speichern</button>
                        <button type="button" onClick={this._cancelForm} className="btn btn-primary">Abbrechen</button>
                    </div> }
                    </fieldset>
                </form>
            </div>
        );
    }

    // ####### This will trigger when the user drop an image on the placeholder ############
    onDrop = (files) => {
        // prepare form data, use data key!
        let data = new FormData()
        data.append('data', files[0])
        this.setState({imgLoader: true});
        // use the file endpoint
        fetch(process.env.REACT_APP_FILE_API_ENDPOINT, {
            method: 'POST',
            body: data
        }).then(response => {
            return response.json()
        }).then(image => {
            this.setState({
                imageId: image.id,
                imageUrl: image.url,
                imgLoader: false,
            })
        })
    }

    _removePic = () => {
        this.setState({ imageId: '', imageUrl: ''});
    }

    // ####### Function used to add topics ############
    _addPublications = () => {
        const pubName = document.getElementById('pubName').value;
        const pubSource = document.getElementById('pubSource').value;
        const pubUrl = document.getElementById('pubUrl').value;
        const publications = Object.assign([], this.state.publications);
        publications.push({
            'name': pubName,
            'source': pubSource,
            'url': pubUrl,
        });
        this.setState({'publications': publications});
        document.getElementById('pubName').value = '';
        document.getElementById('pubSource').value = '';
        document.getElementById('pubUrl').value = '';
    }

	// ####### Function used to delete topics ############
    _deletePublication = (index) =>{
        const publications = Object.assign([], this.state.publications);
        publications.splice(index,1);
        this.setState({'publications': publications});
    }

	// ####### Function used to add Audios ############
    _addAudios  = () => {
        const audioName = document.getElementById('audioName').value;
        const audioSource = document.getElementById('audioSource').value;
        const audioUrl = document.getElementById('audioUrl').value;
        const audios = Object.assign([], this.state.audios);
        // console.log('audios', audios);
        audios.push({
        'name': audioName,
        'source': audioSource,
        'url': audioUrl,
    });
        this.setState({'audios': audios});
        document.getElementById('audioName').value = '';
        document.getElementById('audioSource').value = '';
        document.getElementById('audioUrl').value = '';
    }

    _deleteAudio = (index) =>{
        const audios = Object.assign([], this.state.audios);
        audios.splice(index,1);
        this.setState({'audios': audios});
    }

	// ####### Function used to add videos ############
    _addVideos  = () => {
        const videoName = document.getElementById('videoName').value;
        const videoSource = document.getElementById('videoSource').value;
        const videoUrl = document.getElementById('videoUrl').value;
        const videos = Object.assign([], this.state.videos);
        // console.log('audios', audios);
        videos.push({
            'name': videoName,
            'source': videoSource,
            'url': videoUrl,
        });
        this.setState({'videos': videos});
        document.getElementById('videoName').value = '';
        document.getElementById('videoSource').value = '';
        document.getElementById('videoUrl').value = '';
    }

    _deleteVideo = (index) =>{
        const videos = Object.assign([], this.state.videos);
        videos.splice(index,1);
        this.setState({'videos': videos});
    }

    // ####### This will trigger when ever user make changes on the form field ############
    _onChangeField = (e) =>{
        this.setState({[e.target.name]: e.target.value});
        if(e.target.name === 'name' && e.target.value == ''){
            this.setState({nameError: true});
        }else if(e.target.name === 'name' && e.target.value != '') {
            this.setState({nameError: false});
        }
    }

    _cancelForm = (e) => {
        this.setState({'isEdit': false, 'name': '', 'surname': '', imageId: '', imageUrl: '', langs: {}, topic: {}, gender: 'male', 'description': '', publisher: '', publications: [], audios: [], videos: []});
        this.props.showForm(false);
    }

    _onChangeTopic = (e) =>{
        const topics = Object.assign({}, this.state.topic);
        const checked = e.target.checked;
        topics[e.target.name] = checked;
        this.setState({'topic': topics})
    }

    _onChangeLang = (e) =>{
        const langs = Object.assign({}, this.state.langs);
        const checked = e.target.checked;
        langs[e.target.name] = checked;
        this.setState({'langs': langs});
    }

	// ####### Function used to save new speakers ############
    _saveSpeaker =  async (e) =>{
        if(this.state.name == ''){
            this.setState({nameError: true, loader: false});
            return false;
        }else{
            this.setState({nameError: false, loader: true});
        }
        e.preventDefault();
        const topics = {};
        const langs = {};
        const publications = [];
        const audios = [];
        const videos = [];
        for (let key in this.state.topic) {
            if(key !== '__typename' && key !== 'id') {
                const topicVal = this.state.topic[key] ? this.state.topic[key] : false;
                topics[key] = topicVal;
            }
        }
        for (let LangKey in this.state.langs) {
            if(LangKey !== '__typename' && LangKey !== 'id') {
                const langVal = this.state.langs[LangKey] ? this.state.langs[LangKey] : false;
                langs[LangKey] = langVal;
            }
        }
        this.state.publications.map((publication) =>{
            const pubObj = {};
            for (let pubKey in publication) {
                if(pubKey !== '__typename' && pubKey !== 'id') {
                    const pubVal = publication[pubKey] ? publication[pubKey] : false;
                    pubObj[pubKey] = pubVal;
                }
            }
            publications.push(pubObj);
        });
        this.state.audios.map((audio) => {
            const audioObj = {};
            for (let audioKey in audio) {
                if(audioKey !== '__typename' && audioKey !== 'id') {
                    const audioVal = audio[audioKey] ? audio[audioKey] : false;
                    audioObj[audioKey] = audioVal;
                }
            }
            audios.push(audioObj);
        });
        this.state.videos.map((video) => {
            const videoObj = {};
            for (let videoKey in video) {
                if(videoKey !== '__typename' && videoKey !== 'id') {
                    const audioVal = video[videoKey] ? video[videoKey] : false;
                    videoObj[videoKey] = audioVal;
                }
            }
            videos.push(videoObj);
        });

        setTimeout(() =>{
            this.setState({ 'topic' : topics, 'langs' : langs, 'publications': publications, 'audios': audios, 'videos': videos});
            this.props.addNewSpeaker(this.state);
            if(!this.state.isEdit) {
                this.setState({
                    'isEdit': false,
                    'name': '',
                    'surname': '',
                    imageId: '',
                    imageUrl: '',
                    langs: {},
                    topic: {},
                    gender: 'male',
                    'description': '',
                    publisher: '',
                    publications: [],
                    audios: [],
                    videos: []
                });
            }
        }, 1000 );

    }
}
export default AddSpeaker
