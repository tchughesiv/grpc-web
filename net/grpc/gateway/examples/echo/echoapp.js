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

const feastapp = {};
const project = "remote_feast_registry"

/**
 * @param {Object} feastService
 * @param {Map} tags
 * @param {Object} ctors
 */
feastapp.FeastApp = function(feastService, tags, ctors) {
  this.feastService = feastService;
  this.tags = tags
  this.ctors = ctors;
};

feastapp.FeastApp.INTERVAL = 1000; // ms

/**
 * @param {string} message
 * @param {string} cssClass
 */
feastapp.FeastApp.addMessage = function(message, cssClass) {
  $("#first").after(
    $("<div/>").addClass("row").append(
      $("<h3/>").append(
        $("<span/>").addClass("label " + cssClass).text(message))));
};

/**
 * @param {string} message
 */
feastapp.FeastApp.addLeftMessage = function(message) {
  this.addMessage(message, "label-primary pull-left");
};

/**
 * @param {string} message
 */
feastapp.FeastApp.addRightMessage = function(message) {
  this.addMessage(message, "label-default pull-right");
};

/**
 * @param {{}[]} objList
 */
feastapp.FeastApp.getObjectNames = function(objList) {
  var objNames = [""];
  objNames = [];
  for (var obj of objList) {
    objNames.push(obj.getSpec().getName())
    //var featureViewMeta = featureView.getMeta()
  }
  return objNames.sort()
};

feastapp.FeastApp.prototype.listEntities = function() {
  var request = new this.ctors.ListEntitiesRequest();
  request.setProject(project);
  if (this.tags) {
    for (let [key, value] of this.tags) {
      request.getTagsMap().set(key, value);
    };
  };
  var call = this.feastService.listEntities(request, {}, function(err, response) {
    if (err) {
      feastapp.FeastApp.addLeftMessage('Error code: '+err.code+' "'+err.message+'"');
    } else {
      setTimeout(function () {
        var objNames = feastapp.FeastApp.getObjectNames(response.getEntitiesList())
        const dIndex = objNames.indexOf('__dummy');
        objNames.splice(dIndex, 1);
        feastapp.FeastApp.addLeftMessage(objNames.length + ' - ' + objNames.join(' , '));
      }, feastapp.FeastApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

feastapp.FeastApp.prototype.listFV = function() {
  var request = new this.ctors.ListFeatureViewsRequest();
  request.setProject(project);
  if (this.tags) {
    for (let [key, value] of this.tags) {
      request.getTagsMap().set(key, value);
    };
  };
  var call = this.feastService.listFeatureViews(request, {}, function(err, response) {
    if (err) {
      feastapp.FeastApp.addLeftMessage('Error code: '+err.code+' "'+err.message+'"');
      console.log(response);
    } else {
      setTimeout(function () {
        var objNames = feastapp.FeastApp.getObjectNames(response.getFeatureViewsList())
        feastapp.FeastApp.addLeftMessage(objNames.length + ' - ' + objNames.join(' , '));
      }, feastapp.FeastApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

feastapp.FeastApp.prototype.listODFV = function() {
  var request = new this.ctors.ListOnDemandFeatureViewsRequest();
  request.setProject(project);
  if (this.tags) {
    for (let [key, value] of this.tags) {
      request.getTagsMap().set(key, value);
    };
  };
  var call = this.feastService.listOnDemandFeatureViews(request, {}, function(err, response) {
    if (err) {
      feastapp.FeastApp.addLeftMessage('Error code: '+err.code+' "'+err.message+'"');
    } else {
      setTimeout(function () {
        var objNames = feastapp.FeastApp.getObjectNames(response.getOnDemandFeatureViewsList())
        feastapp.FeastApp.addLeftMessage(objNames.length + ' - ' + objNames.join(' , '));
      }, feastapp.FeastApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

feastapp.FeastApp.prototype.listFS = function() {
  var request = new this.ctors.ListFeatureServicesRequest();
  request.setProject(project);
  if (this.tags) {
    for (let [key, value] of this.tags) {
      request.getTagsMap().set(key, value);
    };
  };
  var call = this.feastService.listFeatureServices(request, {}, function(err, response) {
    if (err) {
      feastapp.FeastApp.addLeftMessage('Error code: '+err.code+' "'+err.message+'"');
    } else {
      setTimeout(function () {
        var objNames = feastapp.FeastApp.getObjectNames(response.getFeatureServicesList())
        feastapp.FeastApp.addLeftMessage(objNames.length + ' - ' + objNames.join(' , '));
      }, feastapp.FeastApp.INTERVAL);
    }
  });
  call.on('status', function(status) {
    if (status.metadata) {
      console.log("Received metadata");
      console.log(status.metadata);
    }
  });
};

feastapp.FeastApp.prototype.send1 = function() {
  changeTags(this);
  feastapp.FeastApp.addRightMessage("List Entities");
  this.listEntities();
};

feastapp.FeastApp.prototype.send2 = function() {
  changeTags(this);
  feastapp.FeastApp.addRightMessage("List Feature Views");
  this.listFV();
};

feastapp.FeastApp.prototype.send3 = function() {
  changeTags(this);
  feastapp.FeastApp.addRightMessage("List On Demand Feature Views");
  this.listODFV();
};

feastapp.FeastApp.prototype.send4 = function() {
  changeTags(this);
  feastapp.FeastApp.addRightMessage("List Feature Services");
  this.listFS();
};

/**
 * Load the app
 */
feastapp.FeastApp.prototype.load = function() {
  var self = this;
  $(document).ready(function() {
    // event handlers
    $("#send1").click(self.send1.bind(self));
    $("#send2").click(self.send2.bind(self));
    $("#send3").click(self.send3.bind(self));
    $("#send4").click(self.send4.bind(self));
  });
};

/**
 * @param {feastapp.FeastApp} self
 */
function changeTags(self) {
  var tagInputs = document.getElementsByTagName('input');
  var tagKey = tagInputs.namedItem("tagKey");
  var tagValue = tagInputs.namedItem("tagValue");
  self.tags = null
  if (tagKey.value || tagValue.value) {
    var result = new Map();
    result.set(tagKey.value, tagValue.value);
    self.tags = result;
  }
}

module.exports = feastapp;
