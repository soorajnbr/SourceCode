import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { gql, graphql, compose } from 'react-apollo';
import { connect } from 'react-redux';
import cookie from 'react-cookies';
import {notify} from 'react-notify-toast';
import { ClipLoader } from 'halogen';
import { topics } from './constants';
import { setSpeakers, setSpeakerId, setTopic } from '../actions';
import { speakers, getTopic } from './selectors';
import fAvatar from '../assets/images/f-avatar.jpg';
import mAvatar from '../assets/images/m-avatar.jpg';

const AnimOnScroll = window.AnimOnScroll;

class ListSpeakers extends Component {

    constructor(props){
        super(props);
        this.state={
            count: 0,
        };
    }

    static propTypes = {
        data: PropTypes.object,
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.data.allSpeakers){
            this.props.setSpeakers(nextProps.data.allSpeakers);
        }

        if(nextProps.speakers.length > 0){
                setTimeout(() => {
                    new AnimOnScroll(document.getElementById('grid'), {
                        minDuration: 0.4,
                        maxDuration: 0.7,
                        viewportFactor: 0.2
                    });
                }, 300);
        }
    }

    render() {
        const color = '#4DAF7C';
        const { speakers, topicSelected} = this.props;
        return (
            <section className="content-container common-width home-cntr">
                { !topicSelected && <h1 className="text-center">Wir bringen Sie mit den starken Stimmen unserer Zeit zusammen</h1> }
                { topicSelected && <h1 className="text-center search-icon"><i className="sprite-magnifier"></i> {`#${this._showTopic(topicSelected)}`}</h1> }
                {speakers.length > 0 &&  <ul className='grid effect-1 speaker-card-wrapper' id="grid">
                    { speakers.map((speaker, key) =>
                    <li className="grid-li" key={key}>
                        <div  className="grid-item" >
                            <figure onClick={(e) => this._setSpeakerId(e,speaker)}><img src={this._setImg(speaker)} alt="" /></figure>
                            <div className="content cards">
                                <h2>{`${speaker.name} ${speaker.surname}`}
                                    { this._isFav(speaker) ? '' : <span className="pull-right" onClick={(e) => this._addToWishList(e, speaker)}>
                                        <strong>Wishlist</strong>
                                        <i className="sprite-plus"></i>
                                    </span> }
                                </h2>
                                <span className="info-txt">Topics</span>
                                <ul className="clearfix">
                                    { speaker.topic[0] && Object.keys(speaker.topic[0]).map((top, index) => (
                                        speaker.topic[0][top] === true ? <li key={index} onClick={(e) => this._setTopic(e, top)}># {this._showTopic(top)}</li>: ``) )}
                                </ul>
                            </div>
                        </div>
                    </li>
                    )}

                </ul> }
                {this.props.data.loading && <ClipLoader color={color} className="loader" /> }
                {!this.props.data.loading && speakers.length === 0 &&
                <div className="loader message">
                    Dieses Schlagwort wurde noch nicht vergeben. <br />
                    Wir würden aber gerne mit Ihnen gemeinsam den passenden
                    <br />Speaker/ die passende Speakerin zu diesem Thema finden:
                    <br />kontakt@holtzbrinck-speakers.com
                    <br />030/27 87 18 12
                </div> }
            </section>
        );
    }

    // ####### Setting up speaker profile image ######
    _setImg = (speaker) =>{
        let avatar = fAvatar;
        if(speaker.imageurl1){
            avatar = speaker.imageurl1;
        }else if (speaker.imageurl1 === '' && speaker.gender === 'male') {
            avatar = mAvatar;
        }
        return avatar;
    }

    // ####### Checking whether the speaker is added as favorite ######
    _isFav = (speaker) => {
        const wishList = cookie.load('myWishes') ? cookie.load('myWishes') : [];
        const item = wishList.find((fav) =>
            fav.id === speaker.id
        );
        if(item){
            return true;
        }else {
            return false;
        }
    }
    _setTopic = (e, topic) =>{
        e.preventDefault();
        this.props.setTopic(topic);
    }

    _showTopic = (topicId) => {
        const item = topics.find((topic) =>
            topic.id === topicId
        );
        return item.text;
    }

    _setSpeakerId = (e, speaker) => {
        e.preventDefault();
        this.props.setSpeakerId(speaker.id);
        this.props.history.push('/speakerDetails');
    }

    // ####### Adding a speaker to wishlist ######
    _addToWishList = (e, speaker) => {
        e.preventDefault();
        e.target.parentElement.style.display = "none";
        const spInfo = {
            id: speaker.id,
            name: speaker.name,
            surname: speaker.surname,
            imgUrl: speaker.imageurl1,
        };
        const wishList = cookie.load('myWishes') ? cookie.load('myWishes') : [];
        wishList.push(spInfo);
        cookie.save('myWishes', wishList, { path: '/' });
        notify.show('Speaker wurde zur Wunschliste hinzugefügt', 'success', 5000);
    }

}

// ####### graphql query to fetch all Speakers ######
const ALL_SPEAKERS = gql`query {
  allSpeakers(orderBy: gender_ASC) {
      id
      audios {
          id
          name
          source
          url
      }
      videos {
          id
          name
          source
          url
      }    
      createdAt    
      gender
      description
      imageurl1
      languages{
          id
          english
          french
          german
          spanish
      }
      name
      publisher
      surname
      topic{
          id
          acting
          adventure
          bestseller
          bigdata
          comedy
          culture
          digital
          economy
          entertainment
          environment
          feminism
          figures
          health
          history
          innovation
          internet
          journalism
          kids
          literature
          management
          migration
          millennials
          motivation
          movie
          music
          nature
          nomalepanel
          nonfiction
          outofthebox
          philosophy
          religion
          science
          socialmedia
          society
          sports
          startup
          surprise
          technology
          travel
          tv
          yoga
          publications
          fiction
          pleasure
          politics
      }
      publicationses{
          id
          name
          source
          url
      }
      updatedAt
  }
  _allSpeakersMeta {
      count
    }
}`


const graphCool = compose(graphql(ALL_SPEAKERS))(ListSpeakers);

const mapStateToProps = createStructuredSelector({
    speakers: speakers(),
    topicSelected: getTopic(),
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSpeakerId: (id) => dispatch(setSpeakerId(id)),
        setSpeakers: (speakers) => dispatch(setSpeakers(speakers)),
        setTopic: (topic) => dispatch(setTopic(topic)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(graphCool);