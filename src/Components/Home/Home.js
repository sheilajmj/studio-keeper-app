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
                <div>Upcoming Events</div>
                {/* < */}
                {/* <div className="hm-btn-container">
                    <div className="contact-wrap hm-wrap">
                        <button className="contactBtn hm-btn" onClick={(() => { this.context.history.push('/contacts') })}> </button>
                        <div className="hm-btn-label">Contact</div>
                    </div>
                    <div className="catalog-wrap hm-wrap">
                        <button className="catalogBtn hm-btn" onClick={(() => { this.context.history.push('/catalog') })}> </button>
                        <div className="hm-btn-label">Catalog</div>
                    </div>
                    <br />
                    <div className="event-wrap hm-wrap">
                        <button className="eventBtn hm-btn" onClick={(() => { this.context.history.push('/events') })}> </button>
                        <div className="hm-btn-label">Event</div>
                    </div>
                    <div className="gallery-wrap hm-wrap">
                        <button className="galleryBtn hm-btn" onClick={(() => { this.context.history.push('/gallery')})}> </button>
                        <div className="hm-btn-label">Gallery</div>
                    </div>
                </div> */}
            </section>
        );
    }
}


export default Home;