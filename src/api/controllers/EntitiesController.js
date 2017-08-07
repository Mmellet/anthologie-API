/**
 * EntitiesController.js
 *
 * @description :: Server-side logic for managing subscriptions
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  RemoveAuthor: function (req, res) {
    Entities.findOne({id_entity:req.param('parentid')}).populate('authors').exec(function(e,r){
      if(e){return res.badRequest({message:"bad request"})}
      r.authors.remove(req.param('id'))
      r.save()
      res.ok(r);
    });
  },
  destroyUri : function (req,res){
    URId.destroy({id_urid:req.param('id'),id_entity:req.param('parentid')}).exec(function(err){
      if(err){return res.badRequest({success:false});}
      return res.ok({success:true});
    })
  },
  destroyTranslation : function (req,res){
    Entity_translations.destroy({id_entity_translation:req.param('id'),id_entity:req.param('parentid')}).exec(function(err){
      if(err){return res.badRequest({success:false});}
      return res.ok({success:true});
    })
  }

};