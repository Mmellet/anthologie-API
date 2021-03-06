/**
 * Keywords_categories.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'keywords_categories',
  autoPK: false,
  attributes: {
    id_keyword_category: {
      type: 'integer',
      autoIncrement: true,
      primaryKey: true,
      size: 11
    },
    id_user: {
      model:'Users'
    },
    id_group: {
      model:'User_Groups'
    },
    title:{
      type:'string',
      size:45,
      unique:true
    },
    versions:{
      collection: 'Keyword_category_versions',
      via:'id_keyword_category'
    },
    keywords:{
      collection:'Keywords',
      via:'category'
    }
  }
};
