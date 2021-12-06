'use strict';

const path = require('path');
const resolve = require('resolve');
const Funnel = require('broccoli-funnel');
const mergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: require('./package').name,

  included(app) {
    this._super.included(app);

    app.import('vendor/ember-pell/src/pell.css');
    app.import('vendor/ember-pell/dist/pell.min.js', {
      using: [
        { transformation: 'amd', as: 'pell' }
      ]
    });
  },

  pellPath() {
    return path.dirname(resolve.sync('pell', { basedir: __dirname }))
  },

  treeForVendor(tree) {
    let trees = [];

    if (tree) {
      trees.push(tree);
    }

    trees.push(new Funnel(this.pellPath(), {
      destDir: 'ember-pell',
      files: ['dist/pell.min.js', 'src/pell.css']
    }));

    return mergeTrees(trees);
  },
};
