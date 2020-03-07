import React, { Component } from 'react';
import Context from '../../Context'
import ViewContact from './ViewContact';
import PageParentHeader from '../Nav/PageParentHeader';

class ViewContactParent extends Component {
  static contextType = Context;


  render(){
  return (
    <section className='contacts'>
        <PageParentHeader pageName={"Contacts"} />
        <ViewContact id={this.props.match.params.id} />
    </section>
  );
}
}

export default ViewContactParent;