import React, { useState } from "react";

const Map = () => {
  const [map, setMap] = useState();

  const getMapAPI = () => {};

  return <div className="flex justify-center items-center mt-10"></div>;
};

export default Map;

<script>
    var map;
    var service;
    var infowindow;

    function initialize()
    {
        var latlng = new google.maps.LatLng(0,0);
        map = new google.maps.Map(document.getElementById('map'),{
            center: latlng, zoom: 15
        })

        var search = document.getElementById('mapSearchField');
        var autocomplete = new google.maps.places.Autocomplete(search);
        autocomplete.bindTo('bounds', )
    }

    google.maps.event.addDomListener(window, 'load', initialize)
</script>
