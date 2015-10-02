#!/bin/bash
rm -rf gen-*/User*

thrift -r --gen cocoa UserAPI.thrift

thrift -r --gen java UserAPI.thrift

thrift -r --gen js:node UserAPI.thrift