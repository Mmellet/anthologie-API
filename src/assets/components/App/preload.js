import {store} from 'Redux/store';

export let resolveFirst = [];
//check if user is already loggedIn
resolveFirst.push(fetch("/api/v1/status",
{
    method: "GET",
    credentials: 'same-origin'
})
.then(function(res){
  if(!res.ok){throw res.json();}
  return res.json()})
.then(function(data){
  store.dispatch({type:'LOG_ME_IN',payload:data});
  return null})
.catch(()=>(null)));

resolveFirst.push(fetch('/api/v1/Languages',{
  method:'GET',
  credentials: 'same-origin'
})
.then(function(response){
  return response.json();
})
.then(function(json){
  store.dispatch({type:'UPDATE_LANGUAGES',payload:json});
  return null;
}));
resolveFirst.push(fetch('/api/v1/cities',{
  method:'GET',
  credentials: 'same-origin'
})
.then(function(response){
  return response.json();
})
.then(function(json){
  store.dispatch({type:'UPDATE_CITIES',payload:json});
  return null;
}));
resolveFirst.push(fetch('/api/v1/authors',{
  method:'GET',
  credentials: 'same-origin'
})
.then(function(response){
  return response.json();
})
.then(function(json){
  store.dispatch({type:'UPDATE_AUTHORS',payload:json});
  return null;
}));
resolveFirst.push(fetch('/api/v1/entities',{
  method:'GET',
  credentials: 'same-origin'
})
.then(function(response){
  return response.json();
})
.then(function(json){
  store.dispatch({type:'UPDATE_ENTITIES',payload:json});
  return null;
}));
resolveFirst.push(fetch('/api/v1/authorities',{
  method:'GET',
  credentials: 'same-origin'
})
.then(function(response){
  return response.json();
})
.then(function(json){
  store.dispatch({type:'UPDATE_URI_SOURCE',payload:json});
  return null;
}));