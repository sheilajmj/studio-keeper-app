import React, { Component } from 'react';
import Context from '../../Context'
import { withRouter } from 'react-router-dom'
import ForwardButton from '../Button/ForwardButton';
import BackButton from '../Button/BackButton';

class Home extends Component {
    static contextType = Context;

    handleAddClick = (location) => {
       this.context.history.push(`/${location}/add`) 
     }


    render() {
        return (
            <section className='home'>
                <h1>MakerDash!</h1>
                <h2>This is the Home area of the App</h2>
                <div className="hm-btn-container">
                    <div className="contact-wrap hm-wrap">
                        <button className="contactBtn hm-btn" onClick={(() => { this.context.history.push('/contacts') })}>Contact</button>
                        <br /><button className="contactOptions add-btn" onClick={(() => { this.handleAddClick('contacts') })}> + </button>
                    </div>
                    <div className="catalog-wrap hm-wrap">
                        <button className="catalogBtn hm-btn" onClick={(() => { this.context.history.push('/catalog') })}>Catalog</button>
                        <br /><button className="catalogOptions add-btn" onClick={(() => { this.handleAddClick('catalog')})}> + </button>
                    </div>
                    <br />
                    <div className="event-wrap hm-wrap">
                        <button className="eventBtn hm-btn" onClick={(() => { this.context.history.push('/events') })}>Event</button>
                        <br /><button className="eventOptions add-btn" onClick={(() => { this.handleAddClick('events')}) }>+</button>
                    </div>
                    <div className="gallery-wrap hm-wrap">
                        <button className="galleryBtn hm-btn">Gallery</button>
                    </div>
                </div>
                <ForwardButton /> <BackButton />
            </section>
        );
    }
}


export default withRouter(Home);