"use babel";

import {TextEditor} from 'atom';

const fs = require('fs'),
      path = require('path');

describe('LB Search Grammar', () => {
  let grammar = null;

  beforeEach( () => {
    //return waitsForPromise(atom.packages.activatePackage("atom-templatebuilder-tools"));
  });

  it('grammar should load', () => {
    // grammar = atom.grammars.grammarForScopeName("source.lbsearch");
    // console.log(grammar);
    // expect(grammar.scopeName).toBe("source.js");
  });

});
