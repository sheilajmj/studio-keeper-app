import React, { Component } from 'react';
import Context from '../../Context'
import Nav from '../Nav/Nav'
import EventsHome from '../Events/EventsHome'
import CatalogHome from '../Catalog/CatalogHome'

class Home extends Component {
    static contextType = Context;

    handleAddClick = (location) => {
       this.context.history.push(`/${location}/add`) 
     }


    render() {
        return (
            <section className='home'>
                <Nav />
                <div className="flex-hm-container">
                    <h1 className="color-pk">Upcoming Events</h1>
                    <EventsHome />
                    <h1 className="color-pk">Catalog Favorites</h1>
                    <CatalogHome />   
                    
                </div>
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