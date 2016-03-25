#pragma strict


static var getTpPos = function() {
    // カメラがパースペクティブだとずれるよい！
    // タップポイントをワールド座標に PCs
    var tapPoint:Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);

    // print("タッチX" + tapPoint.x +
    //       "タッチY" + tapPoint.y);
    return tapPoint;
};
