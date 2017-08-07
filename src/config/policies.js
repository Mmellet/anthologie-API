/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  '*': false,


  AppController:{
    '*':true
  },
  EntitiesController:{
    'find':true,
    'findOne':true,
    'create':['isLoggedIn','populateUserInfos'],
    'update':['isLoggedIn','ownsThis'],
    'RemoveAuthor':['isLoggedIn','ownsThis'],
    'destroyUri':['isLoggedIn','ownsThis'],
    'destroyTranslation':['isLoggedIn','ownsThis'],
  },
  AuthorsController:{
    'find':true,
    'findOne':true,
    'create':['isLoggedIn','populateUserInfos'],
    'update':['isLoggedIn','ownsThis'],
    //'deleteFromCollection':['isLoggedIn','ownsThis'],
  },
  CitiesController:{
    'find':true,
    'findOne':true,
    'create':['isLoggedIn','populateUserInfos'],
    'update':['isLoggedIn','ownsThis'],
    'deleteFromCollection':['isLoggedIn','ownsThis'],
  },
  LanguagesController:{
    'find':true,
    'findOne':true,
    'create':['isLoggedIn','populateUserInfos'],
    'update':['isLoggedIn','ownsThis']
  },
  Entity_translations_alignController:{
    'find':true,
    'findOne':true,
    'create':['isLoggedIn','populateUserInfos'],
    'update':['isLoggedIn','ownsThis']
  },
  User_RegisterController:{
    'newUser':true,
  },
  User_LoginController:{
    'validateLogin':true,
  },
  User_StatusController:{
    'status':true
  },
  Users:{
    'update':['isLoggedIn','ownsThis','protectAdmin']
  },
  User_CredentialsController:{
    'update':['isLoggedIn','ownsThis']
  },
  URI_sourceController:{
    find:true,
  }

};