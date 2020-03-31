import React, { Component } from 'react';
import Context from '../../Context'


class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <section className="landing">
        <div className="flex-container bkg-color-wt landing">
        <div className="landing-text tx-a-l landing-wrap">
          <h2 className="welcome color-te">Welcome!</h2>
        Studio Keeper is a web application designed to support artists, makers, and designers with managing their inventory catalog, contacts, and events.  The application also features a gallery section for showcasing the images from the catalog. 
        <br /><br />
        Whether you are looking for an email, an event application due date, or the date your piece of artwork sold, Studio Keeper can help. The appealing visual design and intuitive user interface makes this app easy to use and a go to for users looking to manage and track these aspects of their business and creative work.  
        </div>
        </div>
        <button className="start-btn" onClick={() => {this.context.history.push('/home')}}>Get Started</button>
      </section>
    );
  }
}

export default LandingPage;