function(){
var pubnub = PUBNUB.init({
    publish_key: 'TODO',
    subscribe_key: 'TODO',
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
