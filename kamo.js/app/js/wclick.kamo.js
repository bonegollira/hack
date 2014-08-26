(function () {

  var click = kamo.Stream.fromEventHandlerSetter(window, 'onclick');

  click.subscribe(function () {
    $('.message').text('click');
  });

  click.buffer(click.debounce(250)).filter(function (buffer) {
    return buffer.length >= 2;
  })
  .subscribe(function () {
    $('.message').text('double click');
  });

// var a = new kamo.Stream();
// setInterval(function () {
//   console.log('a');
//   return a.publish(1);
// }, 100);
// a.debounce(1500).subscribe(function (message) {
//   console.log(message);
// });

// var a = kamo.Stream.fromEventHandlerFunction(window, 'setInterval', 1000).map(function () {
//   console.log('a');
//   return 1;
// });
// a.throttle(1500).subscribe(function (message) {
//   console.log('b');
//   console.log(message);
// });


//   var clickStream = kamo.Stream.fromEventHandlerSetter(window, 'onclick');
//   clickStream.buffer(clickStream.debounce(250)).filter(function (buffer) {
//     return buffer.length >= 2;
//   }).subscribe(function () {
//     alert('Conguratulation!');
//   });

}());
