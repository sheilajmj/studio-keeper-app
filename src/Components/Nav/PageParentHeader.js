import React, { Component } from 'react';
import Context from '../../Context'
import PageNav from '../Nav/PageNav'
import AddButton from '../Button/AddButton'
//import SearchBar from '../SearchBar/SearchBar'
import Nav from '../Nav/Nav'
class PageParentHeader extends Component {
  static contextType = Context;

  render(){
  return (
    <>
    <Nav />
    <section className='page-parent-header pd-l-md pd-r-md pd-t-sm pd-b-sm bkg-color-tra'>
        <PageNav pageName={this.props.pageName} />
        <div className='search-add-wrap'>
        {/* <SearchBar /> */}
        <AddButton pageName={this.props.pageName} />
        </div>
    </section>
    </>
  );
}
}

export default PageParentHeader;