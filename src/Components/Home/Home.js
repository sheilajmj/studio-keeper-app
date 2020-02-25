import React, { Component } from 'react';
import Context from '../../Context'

class Home extends Component {
    static contextType = Context;

    handleAddClick = (location) => {
       this.context.history.push(`/${location}/add`) 
     }


    render() {
        return (
            <section className='home'>
                <div className="hm-btn-container">
                    <div className="contact-wrap hm-wrap">
                        <button className="contactBtn hm-btn" onClick={(() => { this.context.history.push('/contacts') })}>Contact</button>
                    </div>
                    <div className="catalog-wrap hm-wrap">
                        <button className="catalogBtn hm-btn" onClick={(() => { this.context.history.push('/catalog') })}>Catalog</button>
                    </div>
                    <br />
                    <div className="event-wrap hm-wrap">
                        <button className="eventBtn hm-btn" onClick={(() => { this.context.history.push('/events') })}>Event</button>
                    </div>
                    <div className="gallery-wrap hm-wrap">
                        <button className="galleryBtn hm-btn">Gallery (Coming Soon ;) )</button>
                    </div>
                </div>
            </section>
        );
    }
}


export default Home;