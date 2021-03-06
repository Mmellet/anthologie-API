import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { browserHistory } from 'react-router';

import {store} from '../../Redux/store'
import {displayLang} from 'helpers/displayLang.jsx'
// components

export default class newKeywordVersion extends Component {


  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = function (e) {
    e.preventDefault();
    //get email and password
    let corps = {id_author:this.refs.keyword.value,title:this.refs.title.value,id_language:this.refs.language.value}
    fetch("/api/v1/keywords/"+corps.id_author+"/versions",
      {
          method: "POST",
          body: JSON.stringify(corps),
          credentials: 'same-origin'
      })
      .then(function(res){
        if(!res.ok){throw res.json();}
        return res.json()
      })
      .then(function(data){
        browserHistory.push('/keywords');
        browserHistory.push('/keywords/'+corps.id_author);
        return null;
      });
  }

  componentWillMount(){
    document.title = "Add new keyword title | anthologie";
  }


  render() {

    return (
      <main>
        <h1>Add keyword title version</h1>
        <form onSubmit={this.handleSubmit} id="languageForm">
          <select ref="keyword" defaultValue={this.props.params.id?this.props.params.id:null} disabled={!!this.props.params.id}>
            {store.getState().keywords.map((keyword)=>(<option key={'keywordSelect'+keyword.id_keyword} value={keyword.id_keyword}>[{keyword.id_keyword}] {keyword.versions.map((version,i)=>(version.title)).join(" / ")}</option>))}
          </select>
          <input type="text" placeholder="Title" name="title" ref="title"/>
          <select ref="language">
            {store.getState().languages.map((lang)=>(<option key={'languageVersion'+lang.id_language} value={lang.id_language}>{displayLang(lang)}</option>))}
          </select>
          <input type="submit" value="send"/>
        </form>
      </main>
    );
  }
}
