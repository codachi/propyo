#pragma strict

static var FsPoint:Vector2;
static var EnPoint:Vector2;


// ポジションがマイナスだった場合＋にするだけ
static var excPM = function(pos:Vector2) {
    var x:float = (pos.x < 0) ? (pos.x * -1) : pos.x;
    var y:float = (pos.y < 0) ? (pos.y * -1) : pos.y;
    return Vector2(x, y);
};


// XYどちらの移動量が多いか
static var xOry = function() {
    // 移動後の方にマイナスかけてたす
    // 結果がマイナスだったら ＋ にして比較

    var fsposx = FsPoint.x - EnPoint.x;
    var fsposy = FsPoint.y - EnPoint.y;
    var distance:Vector2 = Vector2(fsposx, fsposy);
    // print("ディスタンス" + distance);

    var jgPos:Vector2 = excPM(distance);  // プラマイをなくす
    // print("ポジション" + jgPos);

    if (jgPos.x > jgPos.y) return false;
    if (jgPos.x < jgPos.y) return true;
    return null;
};


static var NSEW = function() {
    // print("視点" + FsPoint);
    // print("終点" + EnPoint);
    var XPM:boolean = (FsPoint.x > EnPoint.x);  // マイナスだったらtrue
    var YPM:boolean = (FsPoint.y > EnPoint.y);
    // print("どっち？" + XPM +YPM);

    if (FsPoint == EnPoint) return;

    // TODO(takishita): xOry() は分ける必要が無い
    // TODO(takishita): XYが同量のフリックがキャンセルされる
    var XY = xOry();  // falseならX

    // 上下左右を0123で判定
    if (XY == true && YPM == true)    return 0;  // 下
    if (XY == true && YPM == false)   return 1;  // 上
    if (XY == false && XPM == false)  return 2;  // 右
    if (XY == false && XPM == true)   return 3;  // 左
    // print("あれ？");
    return null;
};
