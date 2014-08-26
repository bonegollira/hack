jQuery(function ($) {

  // input[type=text]へkeyupイベントのセット
  kamo.Stream.fromEventHandlerFunction($('#input'), 'keyup')

    // keyup後1000秒間keyupがなければmapへ
    .debounce(1000)
    // eventストリームをフォームのvalueストリームへ
    .map(function (event) {
      return event.target.value;
    })
    // valueが3文字未満で終了
    .filter(function (message) {
      return message.length >= 3;
    })
    // 直近の入力と最新の入力の配列ストリームへ変換
    .scan([], function (result, message) {
      return [result[1], message];
    })
    // 直近の入力と最新の入力が同じであれば終了
    .filter(function (message) {
      return message[0] != message[1];
    })
    // 最新の入力valueストリームへ変換
    .map(function (message) {
      return message[1];
    })
    // 新しいストリームへ変換
    // wikipediaのapiを叩いて、候補を取得する
    // $.ajaxのdoneが呼ばれるとpublishされる
    .flatMapLatest(function (message) {
      return kamo.Stream.fromEventHandlerFunction(
        $.ajax({
          url: 'http://en.wikipedia.org/w/api.php',
          dataType: 'jsonp',
          data: {
            action: 'opensearch',
            format: 'json',
            search: window.encodeURI(message)
          }
        }),
        'done'
      );
    })
    // 候補を受け取るとviewへ反映させて終了
    .subscribe(
      (function ($candidates) {
        return function (data) {
          $candidates.empty();
          $.each(data[1], function (_, message) {
            $('<li>').append(document.createTextNode(message)).appendTo($candidates);
          });
        };
      })($('#candidates'))
    );
});
