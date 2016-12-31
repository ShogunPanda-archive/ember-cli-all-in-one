/*
 * This file is part of the ember-cli-all-in-one npm package. Copyright (C) 2016 and above Shogun <shogun@cowtech.it>.
 * Licensed under the MIT license, which can be found at http://www.opensource.org/licenses/mit-license.php.
 */

var fs = require("fs");
var path = require("path");
var helpers = require("broccoli-kitchen-sink-helpers");

var Plugin = require("broccoli-plugin");

// Constructor
var AssetsInliner = function(tree, files, options){
  options = options || {};
  Plugin.call(this, [tree], {});

  this.files = files;
  this.options = options;
};

// Implement Broccoli API
AssetsInliner.prototype = Object.create(Plugin.prototype);
AssetsInliner.prototype.constructor = AssetsInliner;

AssetsInliner.prototype.build = function(){
  const options = this.options;
  const srcDir = this.inputPaths[0];

  // Read the original index file
  var indexFile = fs.readFileSync(path.resolve(srcDir, "index.html"), "utf8");

  // For each file to remove
  this.files.forEach(function(file){
    // Prepare the replacement
    const category = path.extname(file).replace(/^./, "");
    const config = AssetsInliner.replacements[category];
    const openingKey = options[category].trackReplacements ? "track" : "regular";

    // Replace the tag in the index file
    indexFile = indexFile.replace(new RegExp(config.matcher.replace("%s", file), "m"), function(all, indentation){
      return [
        indentation + config.opening[openingKey].replace("%s", file), // Opening tag
        fs.readFileSync(path.resolve(srcDir, file), "utf8").replace(/(^.)/mg, indentation + "  $1"), // Contents, indented
        indentation + config.closing // Closing tag
      ].join("\n");
    });
  });

  helpers.copyRecursivelySync(srcDir, this.outputPath);

  // Write the updated index file
  fs.writeFileSync(path.join(this.outputPath, "index.html"), indexFile);
};

// Replacement configuration
AssetsInliner.replacements = {
  js: {
    matcher: '(^ +)<script src="/(.+/)?%s"></script>',
    opening: {track: '<script type="text/javascript" data-original-source="%s">', regular: '<script type="text/javascript">'},
    closing: "</script>"
  },

  css: {
    matcher: '(^ +)<link rel="stylesheet" href="/(.+/)?%s">',
    opening: {track: '<style data-original-source="%s">', regular: "<style>"},
    closing: "</style>"
  }
};

// Main API for this replacer
module.exports = function(tree, files, options){
  return new AssetsInliner(tree, files, options);
};
