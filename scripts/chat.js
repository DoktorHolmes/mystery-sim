function(){
var pubnub = PUBNUB.init({
    publish_key: 'pub-c-123f7ee1-d4d4-4247-96b9-409dbbf5a9c2',
    subscribe_key: 'sub-c-fb1b66dc-027f-11e6-8180-0619f8945a4f',
    error: function (error) {
        console.log('Error:', error);
    }
})
var box = pubnub.$('box'), input = pubnub.$('input'), channel = 'zincnet';
pubnub.subscribe({
    channel  : 'zincnet',
    callback : function(text) { box.innerHTML = (''+text).replace( /[<>]/g, '' ) + '<br>' + box.innerHTML }
});
pubnub.bind( 'keyup', input, function(e) {
    (e.keyCode || e.charCode) === 13 && pubnub.publish({
        channel : 'zincnet', message : input.value, x : (input.value='')
    })
} )
pubnub.history({
     channel: 'history_channel',
     callback: function(m){console.log(JSON.stringify(m))},
     count: 100, // 100 is the default
     reverse: false // false is the default
	 
 });
});