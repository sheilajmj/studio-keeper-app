import React, { Component } from 'react';
import Context from '../../Context'
import PageNav from '../Nav/PageNav'
import AddButton from '../Button/AddButton'
import SearchBar from '../SearchBar/SearchBar'

class PageParentHeader extends Component {
  static contextType = Context;

  render(){
  return (
    <section className='page-parent-header'>
        <PageNav pageName={this.props.pageName} />
        <div className='search-add-wrap'>
        {/* <SearchBar /> */}
        <AddButton pageName={this.props.pageName} />
        </div>
    </section>
  );
}
}

export default PageParentHeader;