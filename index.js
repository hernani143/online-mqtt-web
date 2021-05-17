    // Connecting to broker
$("#Cbroker").on('click', function() {
    $('#status').val("Connecting....")
    client = mqtt.connect($('#address').val())

    client.on("connect", function() {
        $('#status').val("Connected!")
    })

    topic = $("#pub-topic").val()
    message = $('#pub-payload').val()

    client.on('message', function(topic, message) {
        var date = new Date()
        var time = (date.toDateString() + " " + date.toLocaleTimeString())
        if (topic == $('#sub-topic').val()) {
            $("#IncomingData").prepend(
                "<tr><td>" +
                topic +
                "</td><td>" +
                message.toString() +
                "</td><td>" +
                time +
                "</td><td>"
            );
        }
    });
});
// Connecting to Publish
$("#Pbutton").on('click', function() {
    var pubTopic = $("#pub-topic").val()
    var payload = $('#pub-payload').val()
    var pubDate = new Date()
    var pubTime = (pubDate.toDateString() + " " + pubDate.toLocaleTimeString())
    client.publish(pubTopic, payload)
    $("#PublishData").prepend(
        "<tr><td>" +
        pubTopic +
        "</td><td>" +
        payload +
        "</td><td>" +
        pubTime +
        "</td><td>"
    );
});
// Connecting to Subscribe
$("#Sbutton").on('click', function() {
    var subTopic = $("#sub-topic").val()
    var subDate = new Date()
    var subTime = (subDate.toDateString() + " " + subDate.toLocaleTimeString())
    client.subscribe(subTopic)
    $("#SubscribedData").prepend(
        "<tr><td>" +
        subTopic +
        "</td><td>" +
        subTime +
        "</td><td>"
    );
});