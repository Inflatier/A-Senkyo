// ===== 本システムのホームディレクトリの絶対URLを得る ===============
// [入力]
// ・なし
// [出力]
// ・本システムのホームディレクトリーの絶対URL文字列
//   - 文字列の最後には "/" が付いている。従ってこのURLを元に、別のファ
//     イルやディレクトリーの絶対URLを作る時、付け足す文字列の先頭に "/"
//     は不要である。
//   - 失敗時はnull
// [備考]
// ・JavaScriptにとって、自分のプログラムファイルが置かれている絶対URL
//   を自力で知るのは難しい。理由は、呼び出し側HTMLのカレントURL(絶対
//   URL)が与えられるからだ。
// ・そこで呼び出し側HTMLの中にある、呼び出し元の<script src="...">を探
//   し出し、そのURL情報を使ってカレントURL(絶対URL)に位置補正を行い、
//   自身の絶対URLを検出する。
function get_homedir() {

  // --- 自分自身に関する情報の設定(自分の位置を検出するために必要) --
  var sThis_filename    = 'Home.js'; // 自分が置かれているファイルの名前(*1)
  var sPath_to_the_home = '..';             // ↑自身からホームdirへの相対パス
     // (*1) 同名ファイルが他に存在するなどして、ファイル名だけでは一意
     //      に絞り込めない場合、「<script src="~">で必ず含めると保証さ
     //      れている」のであれば、親ディレクトリーなどを含めてもよい。
     //      例えば、1つのサイトの中の
     //        あるHTMLでは<script src="myjs/script.js">
     //        またあるHTMLでは<script src="../myjs/script.js">
     //      というように、全てのHTMLで "myjs/script.js" 部分を必ず指定
     //      しているなら、他の "otherjs/script.js" と間違わないように、
     //        sThis_filename = 'myjs/script.js' としてもよい。
     //      ただしこの時 sLocation_from_home は、"myjs" の場所から見た
     //      ホームディレクトリーへの相対パスを意味するので注意。

  // --- その他変数定義 ----------------------------------------------
  var i, s, le; // 汎用変数
  var sUrl = null; // 戻り文字列格納用

  // --- 自JavaScriptを読んでいるタグを探し、homedir(相対の場合あり)を生成
  le = document.getElementsByTagName('script');
  for (i=0; i<le.length; i++) {
    s = le[i].getAttribute('src');
    if (s.length < sThis_filename.length) {continue;}
    if (s.substr(s.length-sThis_filename.length) !== sThis_filename) {continue;}
    s = s.substr(0,s.length-sThis_filename.length);
    if ((s.length>0) && s.match(/[^\/]$/)) {continue;}
    sUrl = s + sPath_to_the_home;
    sUrl = (sUrl.match(/\/$/)) ? sUrl : sUrl+'/';
    break;
  }
  if (i >= le.length) {
    return null;             // タグが見つからなかったらnullを返して終了
  }

  // --- 絶対パス化(.や..は含む) -------------------------------------
  if (     sUrl.match(/^http/i)) {
    // httpから始まるURLになっていたらそのままでよい
  }
  else if (sUrl.match(/^\//)   ) {
    // httpから始まらないが絶対パスになっている場合はhttp～ドメイン名までを先頭に付ける
    if (! location.href.match(/^(https?:\/\/[a-z0-9.-]+)/i)) {return null;}
    sUrl = RegExp.$1 + sUrl;
  }
  else                           {
    // 相対パスになっている場合は呼び出し元URLのディレクトリまでの部分を先頭に付ける
    sUrl = location.href.replace(/\/[^\/]*$/, '/') + sUrl;
  }

  // --- カレントディレクトリ表記(.)を除去 ---------------------------
  while (sUrl.match(/\/\.\//)) {
    sUrl = sUrl.replace(/\/\.\//g, '/');
  }

  // --- 親ディレクトリ表記(..)を除去 --------------------------------
  sUrl.match(/^(https?:\/\/[A-Za-z0-9.-]+)(\/.*)$/);
  s    = RegExp.$1;
  sUrl = RegExp.$2;
  while (sUrl.match(/\/\.\.\//)) {
    while (sUrl.match(/^\/\.\.\//)) {
      sUrl = sUrl.replace(/^\/\.\.\//, '/');
    }
    sUrl = sUrl.replace(/^\/\.\.$/, '/');
    while (sUrl.match(/\/[^\/]+\/\.\.\//)) {
      sUrl = sUrl.replace(/\/[^\/]+\/\.\.\//, '/');
    }
  }
  sUrl = s + sUrl;

  // --- 正常終了 ----------------------------------------------------
  return sUrl;
}