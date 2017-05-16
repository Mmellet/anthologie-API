/**
 * Manuscripts_images_assoc.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  tableName: 'manuscripts_images_assoc',
  autoPK: false,
  attributes: {
    manuscript_id: {
      type: 'integer',
      required: true,
      primaryKey: true,
      size: 11
    },
    image_id: {
      type: 'integer',
      required: true,
      primaryKey: true,
      size: 11
    }
  }
};