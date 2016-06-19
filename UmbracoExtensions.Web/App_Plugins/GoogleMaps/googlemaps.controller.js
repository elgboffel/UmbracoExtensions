angular.module("umbraco").controller("Datagraf.GoogleMapsController",
  function ($rootScope, $scope, notificationsService, dialogService, assetsService) {

    assetsService.loadJs('http://www.google.com/jsapi')
        .then(function () {
          google.load("maps", "3",
                      {
                        callback: initialize,
                        other_params: "sensor=true&libraries=places"
                      });
        });

    //TODO:: Add support for json format
    //var scopeType = $scope.model.config.format;
    //if ($scope.model.config.type != null && $scope.model.config.type == 'json') {
    //  $scope.model.value = {
    //    LatLng: { Lat: 0.0, Lng: 0.0 },
    //    Address: {
    //      StreetNumber: 0,
    //      Route: '',
    //      Locality: '',
    //      Country: '',
    //      PostalCode: '',
    //    },
    //  };
    //} else if($scope.model.value === null || !$scope.model.value) {
    //  $scope.model.value = "";
    //  $scope.isDisabled = true;
    //}

    // Initialize();
    function initialize() {
      initializeMap();
      //notificationsService.success("Google Maps:", "Was loaded succesfully");
    }

    function initializeMap() {
      // Get Config LatLng
      $scope.configLatLng = function () {
        var configValue = $scope.model.config.location.split(',');
        if (configValue !== null) {
          return new google.maps.LatLng(parseFloat(configValue[0]), parseFloat(configValue[1]));
        } 
      }
      // Get Model LatLng
      $scope.modelLatLng = function () {
        // Has value, set model value location
        var modelValue = $scope.model.value.split(',');
        if(modelValue !== null){
          return new google.maps.LatLng(parseFloat(modelValue[0]), parseFloat(modelValue[1]));
        }
      };

      // Variables
      var geocoder = new google.maps.Geocoder();
      var latLng = null;
      var marker = new google.maps.Marker({draggable: true});
      var infowindow = new google.maps.InfoWindow({ content: "", maxWidth: 300 });
      var mapOptions = {};
      var map = null;

      // Apply latLng
      if ($scope.model.value != null && $scope.model.value.length > 0) {
        latLng = $scope.modelLatLng();
        $scope.enabled = true;
      } else {
        latLng = $scope.configLatLng();
        $scope.enabled = false;
      };

      // init map
      var mapElement = document.getElementById($scope.model.alias + '_canvas');
      mapOptions = {
        zoom: 12,
        center: latLng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(mapElement, mapOptions);

      // Create marker
      marker = new google.maps.Marker({
        map: map,
        position: latLng,
        draggable: true,
      });

      $scope.content = function (newValue) {
        if (newValue !== null && newValue.length) {
          infowindow.setContent(newValue);
          infowindow.open(map, marker);
        }
          // New value is null
        else {
          infowindow.setContent("Drag or search to search location.");
          infowindow.open(map, marker);
        }
      };
      
      $scope.setValue = function (latLng) {
        if($scope.enabled && latLng !== null){
          var newLat = latLng.lat();
          var newLng = latLng.lng();

          //set the model value
          $scope.model.value = newLat + "," + newLng;
        } else {
          $scope.model.value = "";
        }
      };

      // Get address
      var getAddress = function () {
        $scope.content("Geocoding location...");
        geocoder.geocode({ 'latLng': latLng },
          function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              $scope.content(results[0].formatted_address);
              map.panTo(results[0].geometry.location);
            } else {
              $scope.content("");
              notificationsService.error("Google Maps:", "Unable to retrieve marker location");
            }
          });
      };

      // watch enabled
      $scope.$watch(function () {
        return $scope.enabled;
        }, function (newValue, oldValue) {
          if (newValue === true) {
            // Enabled 
            marker.setPosition(latLng);
            getAddress();
            $scope.content("");
        } else {
            // not enabled 
            marker.setPosition($scope.configLatLng());
            $scope.content("");
            map.panTo($scope.configLatLng());

            // Clear value
            $scope.setValue(null);
        }
      });

      // Set center when tab opened
      var firstTime = true;
      $('a[data-toggle="tab"]').on('shown', function (e) {
        google.maps.event.trigger(map, 'resize');
        //notificationsService.success("Google Maps:", "Resize triggered");
        map.panTo(latLng);
      });

      // when marker is dragged
      google.maps.event.addListener(marker, "dragend", function (e) {
        latLng = e.latLng;
        $scope.setValue(e.latLng);
        getAddress();
      });

      // when window is closed
      google.maps.event.addListener(infowindow, 'closeclick', function (e) {
        
        // Toogle marker state
        if ($scope.enabled) {
          $scope.enabled = false;
        } else {
          $scope.enabled = true;
        }
        return false;
      });

      // Create the search box and link it to the UI element.
      var input = /** @type {HTMLInputElement} */(
          document.getElementById('pac-input'));
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var searchBox = new google.maps.places.SearchBox(
        /** @type {HTMLInputElement} */(input));

      // Listen for the event fired when the user selects an item from the
      // pick list. Retrieve the matching places for that item.
      google.maps.event.addListener(searchBox, 'places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        var place = places[0];
        // For each place, get the icon, place name, and location.
        markers = [];
        
        var image = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25)
        };

        // Create a marker for each place.
        var mcOptions = {
          title: place.name,
          position: place.geometry.location,
        };

        $scope.enabled = true;
        marker.setOptions(mcOptions);
        $scope.setValue(place.geometry.location);
        $scope.content(place.formatted_address);

        //var infoWindow = google.maps.InfoWindow();

        //// Marker on click
        //google.maps.event.addListener(marker, 'click', function () {
        //  map.fitBounds(place.geometry.viewport);
        //});

        // Fit result bounds
        //console.log(place.geometry.viewport);
        if(place.geometry.viewport){
          map.panToBounds(place.geometry.viewport);
          if (place.geometry.location) {
            map.panTo(place.geometry.location);
          }
        } else if (place.geometry.location) {
          map.panTo(place.geometry.location);
        }
      });

      // Bias the SearchBox results towards places that are within the bounds of the
      // current map's viewport.
      google.maps.event.addListener(map, 'bounds_changed', function () {
        var bounds = map.getBounds();
        searchBox.setBounds(bounds);
      });
    }
  });