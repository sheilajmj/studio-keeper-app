import React, { Component } from 'react';
import Context from '../../Context'


class LandingPage extends Component {
  static contextType = Context;

  render() {
    return (
      <section className="landing">
        <div>
            LandingPage: <br />
            App Summary...<br />
            Get Started ->
        </div>
        <button onClick={() => {this.context.history.push('/')}}>Get Started</button>
      </section>
    );
  }
}

export default LandingPage;