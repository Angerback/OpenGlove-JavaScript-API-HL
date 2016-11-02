baseAddress = 'http://localhost:8733/Design_Time_Addresses/OpenGloveWCF/OGService/rest/';

/**
* Gets all the current gloves known by the system whether in range or not.
*/
function GetGloves() {
    promise = $.ajax({
      url: baseAddress
       + 'GetGloves',
      type: 'GET'
    });
    return promise;
};

/**
  Activates a region based on a glove current mappings.
* @param {Glove} glove - Glove object. Use the ones returned from GetGloves.
* @param {integer} region - One of the regions defined by the SDK (0 to 57)
* @param {integer} intensity - Intensity of the activation (0 to 255)
*/
function Activate(glove, region, intensity) {
    glove.GloveConfiguration.GloveProfile.Mappings.forEach(function(mapping) {
      if (mapping.Key == String(region)) {
        $.ajax({
          url: baseAddress
           + 'Activate?gloveAddress=' + glove.BluetoothAddress
           + '&actuator=' + mapping.Value
           + '&intensity=' + String(intensity),
          type: 'POST'
        });
        return;
      }
    });
};

/**
  Activates regions based on a glove current mappings.
* @param {Glove} glove - Glove object. Use the ones returned from GetGloves.
* @param {integer} regions - List of regions defined by the SDK (0 to 57)
* @param {integer} intensityList - Intensity list of the activation for each region (0 to 255)
*/
function ActivateMany(glove, regions, intensityList) {
    actuators = [];

    regions.forEach(
      function(region){
        glove.GloveConfiguration.GloveProfile.Mappings.forEach(function(mapping) {
          if (mapping.Key == String(region)) {
            actuators.push(parseInt(mapping.Value));
            return false;
          }
        });

      }
    );

    var jsonObject = JSON.stringify(
        {
        actuators: actuators,
        intensityList: intensityList
      }
    );

    //console.log(jsonObject);
    $.ajax({
      url: baseAddress
       + 'ActivateMany?gloveAddress=' + glove.BluetoothAddress,
      type: 'POST',
      contentType: 'application/json',
      data:
          jsonObject
        ,
      dataType: 'json'
    });
    return;
};

/**

  Contains the regions defined by the SDK. Refer to these constants to activate
  a glove.
**/
var HandRegion = {
  PalmarFingerSmallDistal: 0,
  PalmarFingerRingDistal: 1,
  PalmarFingerMiddleDistal: 2,
  PalmarFingerIndexDistal: 3,
  PalmarFingerSmallMiddle: 4,
  PalmarFingerRingMiddle: 5,
  PalmarFingerMiddleMiddle: 6,
  PalmarFingerIndexMiddle: 7,
  PalmarFingerSmallProximal: 8,
  PalmarFingerRingProximal: 9,
  PalmarFingerMiddleProximal: 10,
  PalmarFingerIndexProximal: 11,
  PalmarPalmSmallDistal: 12,
  PalmarPalmRingDistal: 13,
  PalmarPalmMiddleDistal: 14,
  PalmarPalmIndexDistal: 15,
  PalmarPalmSmallProximal: 16,
  PalmarPalmRingProximal: 17,
  PalmarPalmMiddleProximal: 18,
  PalmarPalmIndexProximal: 19,
  PalmarHypoThenarSmall: 20,
  PalmarHypoThenarRing: 21,
  PalmarThenarMiddle: 22,
  PalmarThenarIndex: 23,
  PalmarFingerThumbProximal: 24,
  PalmarFingerThumbDistal: 25,
  PalmarHypoThenarDistal: 26,
  PalmarThenar: 27,
  PalmarHypoThenarProximal: 28,
  DorsalFingerSmallDistal: 29,
  DorsalFingerRingDistal: 30,
  DorsalFingerMiddleDistal: 31,
  DorsalFingerIndexDistal: 32,
  DorsalFingerSmallMiddle: 33,
  DorsalFingerRingMiddle: 34,
  DorsalFingerMiddleMiddle: 35,
  DorsalFingerIndexMiddle: 36,
  DorsalFingerSmallProximal: 37,
  DorsalFingerRingProximal: 38,
  DorsalFingerMiddleProximal: 39,
  DorsalFingerIndexProximal: 40,
  DorsalPalmSmallDistal: 41,
  DorsalPalmRingDistal: 42,
  DorsalPalmMiddleDistal: 43,
  DorsalPalmIndexDistal: 44,
  DorsalPalmSmallProximal: 45,
  DorsalPalmRingProximal: 46,
  DorsalPalmMiddleProximal: 47,
  DorsalPalmIndexProximal: 48,
  DorsalHypoThenarSmall: 49,
  DorsalHypoThenarRing: 50,
  DorsalThenarMiddle: 51,
  DorsalThenarIndex: 52,
  DorsalFingerThumbProximal: 53,
  DorsalFingerThumbDistal: 54,
  DorsalHypoThenarDistal: 55,
  DorsalThenar: 56,
  DorsalHypoThenarProximal: 57
};
