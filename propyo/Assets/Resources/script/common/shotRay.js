
/*
参考
http://d.hatena.ne.jp/nakamura001/20120816/1345135695
*/
//スプライト名をクリックして判定するクラス

static var shotray = function(){
 	var target:String;
 	
 	
// 	if (Input.touchCount > 0)
//    {
//    // Get position of the first finger
//    var fingerPos : Vector2 = Input.GetTouch(0).position;
//    }
// 	
// 	
// 	print("今" + fingerPos);
	
	
//	2D用
    var tapPoint : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);//タップポイントをワールド座標に PCs
    //var tapPoint : Vector2 = Camera.main.ScreenToWorldPoint(fingerPos);//タップポイントをワールド座標に sumaho
    
    var collition2d : Collider2D = Physics2D.OverlapPoint(tapPoint);//タップしてコリジョンに触れた位置
    var hitObject : RaycastHit2D = Physics2D.Raycast(tapPoint,-Vector2.up);
    if (collition2d) {
    target = hitObject.collider.gameObject.name;
       return target;
    }



    //3D
        var ray : Ray;
        var hit : RaycastHit;
      
        // マウスの位置を調べる
        ray = Camera.main.ScreenPointToRay(Input.mousePosition);
        // マウスの位置が、カメラに写っていて、且つ、カメラから1000以内にいるかチェック
        if (Physics.Raycast(ray, hit, 1000)) {
            // 該当する箇所に、GameObjectがあれば返却
            target = hit.collider.gameObject.name;
            print("ターゲット" + target);
            return target;
        }
        else {
        //print("null");
            return null;
        }
    //3D

};




static var shotray2D = function(){
 	var target:String;


	//2D用
    var tapPoint : Vector2 = Camera.main.ScreenToWorldPoint(Input.mousePosition);//タップポイントをワールド座標に PCs
    
    var collition2d : Collider2D = Physics2D.OverlapPoint(tapPoint);//タップしてコリジョンに触れた位置
    var hitObject : RaycastHit2D = Physics2D.Raycast(tapPoint,-Vector2.up);
    if (collition2d) {
    target = hitObject.collider.gameObject.name;
       return target;
    }
    //2D用



};




static var difOb = function(){
	var hitTarget = shotray();//スプライト名取得
	
	if(hitTarget == null){
	print("null");
		return GameObject.Find("Empty"); 
	}
	if(hitTarget == "battleGuide"){//はいけいを掴んでしまうから
	return GameObject.Find("Empty");
	}
	else {
		return GameObject.Find(hitTarget);
	}
};



static var difOb2D = function(){
	var hitTarget = shotray2D();//スプライト名取得
	//print("ヒットターゲット" + hitTarget);
	if(hitTarget == null){
	//print("null");
		return GameObject.Find("Empty"); 
	}
	if(hitTarget == "battleGuide"){//はいけいを掴んでしまうから
	return GameObject.Find("Empty");
	}
	else {
		return GameObject.Find(hitTarget);
	}
};



