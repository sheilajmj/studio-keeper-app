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
            </section>
        );
    }
}


export default Home;