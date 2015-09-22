// Copyright 2015, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';


module.exports = {

  dev: false,

  host: 'dev.makcipe.com',
  port: 9090,

  // This is the id of your project in the Google Developers Console.
  gcloud: {
    projectId: 'makcipe-server'
  },

  mysql: {
    host: '173.194.248.173',
    user: 'app',
    password: 'akrTj=100',
    database: 'Makcipe'
  },

  mysql_db: 'Makcipe',

  mysql_localhost: {
    host: '127.0.0.1',
    user: 'root',
    password: 'ziny5601!',
    database: 'a'
  },

  mysql_db_localhost: 'a'
};
