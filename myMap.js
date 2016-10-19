var map;
function loadMapScenario() {
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AsQJ3D5rGa6UH6OYtvSRw0ShEB1X0cjSY6Ax61cmOdHWddTSTs6h3lQcLZirOCxi'
    });
    add_pokemon_layer();
}
// 1. Define pokemon data format, create mock pokemon data
var map_items = [
    {
        "pokemon_id": 12,
        "expire": 1476903897,
        "latitude": 40.7482844,
        "longitude": -73.9910477
    }
]

function get_count_down_from_expire(epoch) {
    var now_time = new Date().getTime() / 1000;
    var time_left = epoch - now_time;
    var second = Math.floor(time_left % 60);
    var minute = Math.floor(time_left / 60);
    if (second < 10) {
        second = "0" + second.toString();
    }
    return minute + ":" + second;
}
// 2. Create pokemon image on map
function get_layer_from_map_items(map_items) {
    var layer = new Microsoft.Maps.Layer();
    var pushpins = [];
    for (var i in map_items) {
        var map_item = map_items[i];
        var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(map_item["latitude"], map_item["longitude"]), 
                                                 { icon: 'images/pushpin_images/pokemon/' + map_item["pokemon_id"] + '.png',
                                                   title: get_count_down_from_expire(map_item["expire"]) });
        pushpins.push(pushpin);
    }
    layer.add(pushpins);
    return layer;
}
function add_pokemon_layer() {
    var pokemon_layer = get_layer_from_map_items(map_items);
    map.layers.insert(pokemon_layer);
}
// 3. Add pokemon count-down refresh

// 4. Connect with REST API
