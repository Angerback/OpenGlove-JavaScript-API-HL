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
* @param {integer} author - One of the regions defined by the SDK (0 to 57)
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
}
