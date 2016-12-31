/*
 * This file is part of the ember-cli-all-in-one npm package. Copyright (C) 2016 and above Shogun <shogun@cowtech.it>.
 * Licensed under the MIT license, which can be found at http://www.opensource.org/licenses/mit-license.php.
 */

"use strict";

const assetsInliner = require("./lib/assetsInliner");
const fileRemover = require("broccoli-file-remover");

module.exports = {
  name: "ember-cli-all-in-one",
  outputDir: "assets",

  included: function(app){
    // Get the options
    this.options = app.options.allInOne || {};

    // Normalize the options
    if(typeof this.options.js !== "object")
      this.options.js = {enabled: true, trackReplacements: !app.isProduction};
    if(typeof this.options.css !== "object")
      this.options.css = {enabled: true, trackReplacements: !app.isProduction};

    this.outputPaths = app.options.outputPaths;
  },

  // Sanitizes a relative path
  cleanPath: function(path){
    return path.replace(/^\//, "").replace(/\/$/, "");
  },

  // Returns the relative path for an app file
  appPath: function(ext){
    var path = this.outputPaths.app[ext];

    if(ext === "css")
      path = path.app;

    return this.cleanPath(path);
  },

  // Returns the relative path for a vendor file
  vendorPath: function(ext){
    return this.cleanPath(this.outputPaths.vendor[ext]);
  },

  postprocessTree: function(type, tree){
    if(type !== "all")
      return tree;

    // Initialize files that will be replace and removed
    var filesToReplace = [];
    var filesToRemove = [];

    // For each category
    for(var category of ["css", "js"]){
      if(this.options[category].enabled){ // Replacement is enabled
        // Mark vendor and path for replacement
        var categoryFiles = [this.vendorPath(category), this.appPath(category)];
        filesToReplace = filesToReplace.concat(categoryFiles);

        // Mark vendor and path for removal
        if(!this.options[category].preserveOriginal)
          filesToRemove = filesToRemove.concat(categoryFiles);
      }
    }

    // Perform additional filters
    if(filesToReplace.length)
      tree = assetsInliner(tree, filesToReplace, this.options);

    if(filesToRemove.length)
      tree = fileRemover(tree, {files: filesToRemove});

    return tree;
  }
};
