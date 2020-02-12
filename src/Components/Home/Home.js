import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'

class Home extends Component {
    static contextType = Context;

    handleAddClick = (location) => {
       this.context.history.push(`/${location}/add`) 
     }


    render() {
        return (
            <section className='home'>
              <Nav />
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
            </section>
        );
    }
}


export default Home;