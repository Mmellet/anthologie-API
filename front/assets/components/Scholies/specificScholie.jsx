import React, { Component } from 'react';
import Router, { Link, RouteHandler } from 'react-router';
import { browserHistory } from 'react-router';

import {store} from '../../Redux/store'
import _ from 'lodash'

import {displayLang} from 'helpers/displayLang.jsx'
import {nl2br} from 'helpers/nl2br.jsx';
// components

export default class specificScholie extends Component {


  constructor(props) {
    super(props);
    this.state = {loaded : false};
    this.fetchAPI = this.fetchAPI.bind(this);
    this.fetchAPI();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteScholie = this.deleteScholie.bind(this);
  }

  fetchAPI(){
      let that = this;
      fetch('/api/v1/scholies/'+that.props.params.id,{
        method:'GET',
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        that.scholie = json;
        //that.refs.city_born = json.city_born;
        document.title = json.title+" | anthologie";
        store.dispatch({type:'ADD_SCHOLIE',payload:json});
        that.setState({loaded: true});
        that.forceUpdate();
        return null;
      });
  }
  deleteScholie = function(e){
    e.preventDefault();
    let that = this;
    if(this.refs.confirmDelete.value == "DELETE"){
      fetch('/api/v1/scholies/'+that.props.params.id,{
        method:'DELETE',
        credentials: 'same-origin'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(json){
        browserHistory.push('/scholies');
        return null;
      });
    }
    else{
      alert('Type "DELETE" if you want to delete this scholie');
    }
  }
  handleSubmit = function (e) {
    e.preventDefault();
    let that = this;
    //get name and family
    let corps = {title:this.refs.title.value}
    fetch("/api/v1/scholies/"+that.props.params.id,
    {
        method: "POST",
        body: JSON.stringify(corps),
        credentials: 'same-origin'
    })
    .then(function(res){
      if(!res.ok){throw res.json();}
      return res.json()})
    .then(function(data){
      that.scholie = data;
      that.forceUpdate();
      return null})
    .catch(function(error){return error})
    .then(function(error){if(error != null){alert(error.message)};}.bind(this));
  }

  deleteVersion = function(version){
    //console.log('clicked',this,version);
    let that = this;
    fetch('/api/v1/scholies/'+that.props.params.id+'/versions/'+version.id_scholie_version,    {
            method: "DELETE",
            credentials: 'same-origin'
        })
        .then(function(data){
          browserHistory.push('/scholies');
          browserHistory.push('/scholies/'+that.props.params.id);
        });
  }
  deleteEntities = function(entity){
    //console.log('clicked',this,version);
    let that = this;
    fetch('/api/v1/scholies/'+that.props.params.id+'/entity/'+entity.id_entity,    {
            method: "DELETE",
            credentials: 'same-origin'
        })
        .then(function(data){
          browserHistory.push('/scholies');
          browserHistory.push('/scholies/'+that.props.params.id);
        });
  }
  moveToEntity = function(entity){
    browserHistory.push('/entities/'+entity);
  }
  accordeon = function(e){
    let that = this;
    this.refs[e].classList.toggle("limited");
  }


  render() {
    let update = <p className="legend">You can't update this record.</p>
    let readOnly = true;
    if(this.state.loaded && (this.scholie.id_user && store.getState().user && this.scholie.id_user.id_user == store.getState().user.id_user) || (store.getState().user && store.getState().user.admin)){
      update = <input type="submit" value="Update"/>;
      readOnly = false;
    }
    let content;
    if(this.state.loaded){
      content =  (
        <div>
          <h1>{this.scholie.title}</h1>
          <h6>anthologia.ecrituresnumeriques.ca/api/v1/scholies/{this.scholie.id_scholie}</h6>

            <form onSubmit={this.handleSubmit}>
              <div className="inputContainerLanguage">
                <label>ID scholie : </label>
                <input type="text" value={this.scholie.id_scholie} disabled="true"/>
              </div>

              <div className="inputContainerLanguage">
                <label>title : </label>
                <input placeholder="ex. : A.P. 5.1" type="text" ref="title" defaultValue={this.scholie.title} disabled={readOnly} />
              </div>

              {_.get(this.scholie,'entities',[]).map((entity,i)=>(
                <div className="inputContainerLanguage" key={'entityScholie'+entity.id_entity}>
                  <label>{i?'':'Entities : '}</label>
                  <p onClick={()=>this.moveToEntity(entity.id_entity)}>{entity.title}</p>
                  {!readOnly && <button type="button" onClick={()=>(this.deleteEntities(entity))} >X</button>}
                </div>
              ))}

              {!readOnly && <div className="inputContainerLanguage">
                <Link className="addToCollection" to={'/scholies/newEntity/'+this.props.params.id}>Add a linked entity</Link>
              </div>}


              <div className="inputContainerLanguage">
                <label>Images :</label>
                <div className="collection">

                  {_.get(this.scholie,'images',[]).map((image)=>(<a href={image.URL} key={"imageScholie"+image.id_image} target="_blank" className="collectionItem"><img src={image.URL} alt={image.title}/></a>))}
                  {!readOnly && <Link className="addToCollectionSide" to={'/scholies/newImage/'+this.props.params.id}>Add an image </Link>}
                </div>
              </div>

              {_.get(this.scholie,'versions',[]).map((version,i)=>(
                <div className="inputContainerLanguage" key={'versionScholie'+version.    id_scholie_version}>
                  <label>{i?'':'Versions : '}</label>
                  <p ref={'versionParagraphScholie'+version.id_scholie_version} onDoubleClick={()=>this.accordeon('versionParagraphScholie'+version.id_scholie_version)} className="limited"><Link to={"/scholies/editversion/"+version.id_scholie_version}>Edit this text</Link><br/>
                  [{displayLang(store.getState().languagesLookup[version.id_language])}] by {store.getState().usersLookup[version.id_user].displayName} {nl2br(version.text)}</p>
                  {!readOnly && <button type="button" onClick={()=>(this.deleteVersion(version))} >X</button>}
                </div>
              ))}

              {!readOnly && <div className="inputContainerLanguage">
                <Link className="addToCollection" to={'/scholies/newVersion/'+this.props.params.id}>Add a version</Link>
              </div>}



              <div className="inputContainerLanguage"><label>created at : </label><input type="text" value={this.scholie.createdAt} disabled="true"/></div>
              <div className="inputContainerLanguage"><label>updated at : </label><input type="text" value={this.scholie.updatedAt} disabled="true"/></div>
              {this.scholie.id_user && <div className="inputContainerLanguage"><label>Owner : </label><input type="text" value={'['+this.scholie.id_user.institution+'] ' + this.scholie.id_user.displayName} disabled="true"/></div>}
              {update}
            </form>
            {store.getState().user && store.getState().user.admin &&
              <div className="alertBlock">
                <p>Deleting this scholie is an operation that cannot be recovered, are you sure you want to delete it?</p>
                <input placeholder="Write 'DELETE' here to confirm you want to delete this scholie" ref="confirmDelete"/>
              <button onClick={this.deleteScholie}>Delete</button>
            </div>}
          </div>
      )
    }
    else{content = (
      <div><h1>Loading</h1></div>
    )}

    return (
      <main>
        {content}
      </main>
    )
  }
}
