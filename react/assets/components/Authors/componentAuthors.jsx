import React, { Component } from 'react';

// components
import AsideAuthors from 'components/Authors/asideAuthors';
import MainAuthors from 'components/Authors/mainAuthors';



export default class ComponentAuthors extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    document.title = "Authors | anthologie";
  }

  render() {

    return (
      <main id="authorsView">
        <AsideAuthors />
        <MainAuthors />
      </main>
    );
  }
}
