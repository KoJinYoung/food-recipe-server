#!/bin/bash
rm -rf gen-*

thrift -r --gen cocoa RecipeAPI.thrift
thrift -r --gen cocoa UserAPI.thrift

thrift -r --gen java RecipeAPI.thrift
thrift -r --gen java UserAPI.thrift

thrift -r --gen js:node RecipeAPI.thrift
thrift -r --gen js:node UserAPI.thrift