#pragma strict


static var getTpPos = function(){
	//カメラがパースペクティブだとずれるよい！
    var tapPoint:Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);//タップポイントをワールド座標に PCs
    
    
    //print("タッチX" + tapPoint.x + "タッチY" +tapPoint.y);
    	return tapPoint;
    };