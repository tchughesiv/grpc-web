/**
 *
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

const {RegistryServerClient} = require('./feast/registry/RegistryServer_grpc_web_pb.js');
const {FeastApp} = require('../echoapp.js');
var feast = proto.feast.registry;
//var feastCore = proto.feast.core;
var tags = new Map();
var feastService = new RegistryServerClient('http://'+window.location.hostname+':8080', null, null);
var feastApp = new FeastApp(
  feastService,
  tags,
  {
    ListEntitiesRequest: feast.ListEntitiesRequest,
    ListFeatureViewsRequest: feast.ListFeatureViewsRequest,
    ListOnDemandFeatureViewsRequest: feast.ListOnDemandFeatureViewsRequest,
    ListFeatureServicesRequest: feast.ListFeatureServicesRequest,
  }
);
feastApp.load();
