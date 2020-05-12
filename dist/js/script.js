
$.getJSON(
    "https://pomber.github.io/covid19/timeseries.json",
    function (data) {
        //console.log(data.Ethiopia);
        //console.log(data.Ethiopia[data.Ethiopia.length - 1].confirmed);
        //var conf = data.Ethiopia[data.Ethiopia.length - 1].confirmed;
        //});
        var ethdate =
            data.Ethiopia[data.Ethiopia.length - 1].date;

        var ethcon =
            data.Ethiopia[data.Ethiopia.length - 1].confirmed;
        var ethdths =
            data.Ethiopia[data.Ethiopia.length - 1].deaths;
        var ethrec =
            data.Ethiopia[data.Ethiopia.length - 1].recovered;
        var ethnew = data.Ethiopia[data.Ethiopia.length - 1].confirmed - data.Ethiopia[data.Ethiopia.length - 2].confirmed;

    
        //$(".text-tot").append(ethcon);
        //$(".text-dths").append(ethdths);
        //$(".text-rec").append(ethrec);
        //$(".text-new").append(ethnew);
        //$(".date").append("Last updated on " + ethdate);
        //var tot = document.getElementById("text-tot");
        //console.log(tot.getAttribute('data-target'));

        function update_users_count() {
            $('#text-tot b').animate({
                counter: ethcon
            }, {
                duration: 2000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                },
                complete: update_users_count
            });
            
            $('#text-dths b').animate({
                counter: ethdths
            }, {
                duration: 1000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                },
                complete: update_users_count
            });

            $('#text-rec b').animate({
                counter: ethrec
            }, {
                duration: 2000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                },
                complete: update_users_count
            });

            $('#text-new b').animate({
                counter: ethnew
            }, {
                duration: 1000,
                easing: 'swing',
                step: function(now) {
                    $(this).text(Math.ceil(now));
                },
                complete: update_users_count
            });
        };
        
        update_users_count();
        
        mapboxgl.accessToken =
            "pk.eyJ1IjoieWVsYXlvdSIsImEiOiJjazhxNGducmUwMDQzM3VvMGNoM2l2bXo3In0.wZnR71XLF3BuZckn9FWm8g";
        var map = new mapboxgl.Map({
            container: "map",
            style:
                "mapbox://styles/yelayou/ck9tyu7fc0trh1ipf5fo0c654",
            center: [25.315, 8],
            zoom: 3.2,
        });


        map.on("load", function () {
            map.addSource("places", {
                type: "geojson",
                data: {
                    type: "FeatureCollection",
                    features: [
                        {
                            type: "Feature",
                            properties: {
                                description:
                                    "<strong>Ethiopia</strong><p> Confirmed: " +
                                    data.Ethiopia[
                                        data.Ethiopia.length - 1
                                    ].confirmed +
                                    "</p><p> Death: " +
                                    data.Ethiopia[
                                        data.Ethiopia.length - 1
                                    ].deaths +
                                    "</p><p> Recovered: " +
                                    data.Ethiopia[
                                        data.Ethiopia.length - 1
                                    ].recovered +
                                    "</p>",
                                icon: "information",
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [38.7578, 8.9806],
                            },
                        },
                        {
                            type: "Feature",
                            properties: {
                                description:
                                    "<strong>Kenya</strong><p> Confirmed: " +
                                    data.Kenya[
                                        data.Kenya.length - 1
                                    ].confirmed +
                                    "</p><p> Death: " +
                                    data.Kenya[
                                        data.Kenya.length - 1
                                    ].deaths +
                                    "</p><p> Recovered: " +
                                    data.Kenya[
                                        data.Kenya.length - 1
                                    ].recovered +
                                    "</p>",
                                icon: "information",
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [36.9062, -1.0236],
                            },
                        },
                        {
                            type: "Feature",
                            properties: {
                                description:
                                    "<strong>Sudan</strong><p> Confirmed: " +
                                    data.Sudan[
                                        data.Sudan.length - 1
                                    ].confirmed +
                                    "</p><p> Death: " +
                                    data.Sudan[
                                        data.Sudan.length - 1
                                    ].deaths +
                                    "</p><p> Recovered: " +
                                    data.Sudan[
                                        data.Sudan.length - 1
                                    ].recovered +
                                    "</p>",
                                icon: "information",
                            },
                            geometry: {
                                type: "Point",
                                coordinates: [30.2176, 12.8628],
                            },
                        },
                    ],
                },
            });

            // Add a layer showing the places.
            map.addLayer({
                id: "places",
                type: "circle",
                source: "places",
                paint: {
                    'circle-color': '#f0f0f0',
                    //'circle-radius':(ethcon/10)
                  },
                
            });

            // Create a popup, but don't add it to the map yet.
            var popup = new mapboxgl.Popup({
                closeButton: false,
                closeOnClick: false,
                
            });
            map.getCanvas().style.cursor = 'default';
            map.on("mouseenter", "places", function (e) {
                // Change the cursor style as a UI indicator.
                map.getCanvas().style.cursor = "pointer";

                var coordinates = e.features[0].geometry.coordinates.slice();
                var description =
                    e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (
                    Math.abs(e.lngLat.lng - coordinates[0]) > 180
                ) {
                    coordinates[0] +=
                        e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                // Populate the popup and set its coordinates
                // based on the feature found.
                popup
                    .setLngLat(coordinates)
                    .setHTML(description)
                    .addTo(map);
            });

            map.on("mouseleave", "places", function () {
                map.getCanvas().style.cursor = "default";
                popup.remove();
            });
        });
    }
);

