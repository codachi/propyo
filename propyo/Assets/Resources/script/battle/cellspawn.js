#pragma downcast

/*
#pragma static だとwarningでる
http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/

static var EmpTileAr:Array = new Array();  // 完全抽選用

//中身(cou,pos,false);  // 場所番号とポジション格納

// ランダムで抽選
static var cellloto = function() {
    var count:int = countEmp();       // 空きマスカウント
    return Random.Range(0, count);    // 抽選番号[0, count)を返す
};


// セルの生成
static var cellSpawn = function(){
    var num:int = cellloto();  // 場所の抽選

    if (EmpTileAr.length <= 0) {
        // 空きがない（更に動かせない）ならフラグを入れる
        print("ゲームオーバー");
        cellCont.gravityCont();  // 重力ON
        return;  // 終わり
    }
    var tgPosAr:Array = EmpTileAr[num];
    var tgX:int = tgPosAr[0];
    var tgY:int = tgPosAr[1];

    // print("番号" + num + "抽選された場所"+ tgPosAr);
    // print("座標" + tgX + tgY);

    var tgCellAr:Array = (grid.tileListAr[tgX] as Array) [tgY];
    var pos:Vector3 = tgCellAr[1];
    var gameNum:int;            // 合体用数値
    var cellOb:GameObject;
    var btcellOb:GameObject;

    var sumNum = Random.Range(0, 2); // 0か1を抽選
    if (sumNum == 0) {
        gameNum = 2;  // 合体用初期値
        cellOb = Instantiate(Resources.Load("prehab/poyo", GameObject));
        btcellOb = Instantiate(Resources.Load("prehab/poyo", GameObject));  
    }
    else {
        gameNum = 4;  // 合体用初期値
        cellOb = Instantiate(Resources.Load("prehab/poyo4", GameObject));
        btcellOb = Instantiate(Resources.Load("prehab/poyo4", GameObject)); 
    }
    cellOb.name = (tgCellAr[0]).ToString();
    cellOb.transform.parent = Pcomm.cellgroup.transform;
    cellOb.transform.position = pos;

    // バトルセル
    btcellOb.name = (tgCellAr[0]).ToString();
    btcellOb.transform.parent = Pcomm.btgroup.transform;

    // print("タイルの状態" + grid.tileListAr[X]);
    // print("場所の取り出し" + YAr);

    tgCellAr[2] = true;      // いるよ！
    tgCellAr[3] = gameNum;   // 合体用初期値をタイルリストに代入
    tgCellAr[4] = (cellOb);  // オブジェクトを追加

    // バトル用
    var btcellAr = new Array(btcellOb);  // 上画面バトル用ArD
    tgCellAr[6] = btcellAr;
    btcell.setDefState(tgX,tgY);         // ポジションとか
    // print("状態" + grid.tileListAr);

    // デバッグ
    var text:GUIText = Instantiate(Resources.Load("prehab/debugText", GUIText));
    text.transform.parent = cellOb.transform.transform;  // 親子
    debugGuireflesh.reguiExt(gameNum,tgCellAr);          // デバッグ用　てきすと描画
    // GUItextのポジションを変換
    var viewportPoint:Vector3 = Camera.main.WorldToViewportPoint(cellOb.transform.position);
    text.transform.position = viewportPoint;//
    // デバッグ
};


// 空いている所を確認する
static var countEmp = function() {
    var count:int = 0;
    var temp:Array = grid.tileListAr[0];
    var Xnum:int = grid.tileListAr.length;
    var Ynum:int = temp.length;

    EmpTileAr.Clear();

    for (var x:int = 0; x < Xnum; x++) {
        for (var y:int = 0; y < Ynum; y++) {
            var XAr:Array = grid.tileListAr[x];
            var YAr:Array = XAr[y];
            var num:boolean = YAr[2];
            if(num == false){
                count += 1;
                var tem:Array = new Array(x, y);
                EmpTileAr.push(tem);  // 抽選用
            }
        }
    }
    // print("空" + EmpTileAr);
    return count;
};