#pragma downcast
/*
#pragma static だとwarningでる
解説
http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/

static var xLineCheckAr:Array = new Array();  // 一列全部埋まってるかの配列
static var yLineCheckAr:Array = new Array();  // 一列全部埋まってるかの配列
static var fullFlag:boolean;                  // セルが一杯になったかどうか

// セルが空いてるかどうかをチェックする X Y　方向 移動量 
static var checkEmpty = function(X, Y, arrow, num:int) {
    // grid.tileListArが状態管理用
    // print(arrow + "num"+ num);

    var x:int = X;
    var y:int = Y;
    var nottile = null;
    
    switch (arrow) {
        case 0:  // 下
            // print("下セルが恥か" + (difEdge(0,y)) );
            if (difEdge(0, y) == true) return null;
            y = num + y;  // もし端じゃなかったら移動先を指定
            break;
        case 1:  // 上
            // print("上セルが恥か" + difEdge(1,y));
            if (difEdge(1, y) == true) return null;
            y = num + y;
            break;
        case 2:  // 右
            // print("右セルが恥か" + (difEdge(2,x)));
            if (difEdge(2, x) == true) return null;
            x = num + x;
            break;
        case 3:  // 左
            if (difEdge(3, x) == true) return null;
            x = num + x;
            break;
    }
    // print("移動先のXY" + "x" + x + "y" + y);
    // グリッドリストから状態を返す
    var tgCellAr:Array = (grid.tileListAr[x] as Array)[y];

    // グリッドNum, ポジション, 今上のいるかどうか, 合体用カウント
    /*
    [0]name
    [1]vector3
    [2]boolean
    */
    // フリックした方向とポジション今上のいるかどうか合体用カウント
    return [x, y, tgCellAr[1], tgCellAr[2]];
};


// ＋軸かマイナス軸かをチェック
static var oneOr = function() {
    var arrow = diffPass.NSEW();  // フリック上下左右判定
    // print("方向 oneOr" + arrow);
    // 0: 下
    // 1: 上
    // 2: 右
    // 3: 左
    var num;
    switch (arrow) {
        case 0: num =  1; break;  // 下
        case 1: num = -1; break;  // 上
        case 2: num =  1; break;  // 右
        case 3: num = -1; break;  // 左
        default:
            print("方向ｓなし");
            num = null;
            break;
    }
    return [arrow, num];
};


// TODO(takishita): 引数を dir(xy), x(num), y(num) にする
// セルからはみ出してないか xだとtrue
static var difEdge = function(xy, num) {
    // print("列" + num + "フリック方向" + xy);
    // print("最大グリッド数" + grid.grdMaxNumX);

    if (xy == 0 && num == grid.grdMaxNumY - 1) return true;  // 下端
    if (xy == 1 && num == 0)                   return true;  // 上端
    if (xy == 2 && num == grid.grdMaxNumX - 1) return true;  // 左端
    if (xy == 3 && num == 0)                   return true;  // 右端
    return false;
};


// セルの空きじょうきょう
static var checkmate = function(){
    // print("空き" + (cellspawn.EmpTileAr.length - 1));
    // print("長さ" + cellspawn.EmpTileAr.length);

    // 空き無し
    if (cellspawn.EmpTileAr.length - 1 <= 0) {
        print(grid.gridAllNum);
        print("一杯です");
        fullFlag = true;  // とりあえずセルは一杯です
        checkAround();    // ゲームオーバーかどうか
        return;           // 終わり
    }
    else if (cellspawn.EmpTileAr.length - 1 >= 0) {
        // 空きあり
        // print(grid.gridAllNum);
        // print("一杯を初期化");
        fullFlag = false;  // 初期化
    }
};


// 自分の周りの空きをチェック
static var checkAround = function () {
    var checkCount:int = 0;//セルが合体できるかカウント
    /*
    [0]指定したグリッドのナンバリング名
    [1]Vector3
    [2]boolean
    [3]合体数値
    [4]あればGameObject
    [5]すでに合体したかどうかフラグ
    */
    // 全方位チェク
    for (var x:int = 0; x < grid.grdMaxNumX; x++) {
        for (var y:int = 0; y < grid.grdMaxNumY; y++) {
            var nosumFlg = checkar(x, y);
            if (nosumFlg == true) {
                // 合体できないセルだったらカウント
                checkCount += 1;
            }
        }
    }
    print("チェックカウント" + checkCount);

    if (checkCount >= grid.gridAllNum) {
        print("ゲームオーバー");
        saveLoad.save();        // ハイスコアセーブ
        motion.gravityCont();   // 重りょく
        return true;
    }
};


// 全方位チェック
static var checkar = function(x:int , y:int){
    // print("x" +x + "y"+ y);
    // 今の位置
    var nowgrid:Array = (grid.tileListAr[x] as Array)[y];
    var gridover:Array = (y == 0 )? null : (grid.tileListAr[x] as Array)[y - 1];  // ue
    var gridunder:Array = (y == grid.grdMaxNumY - 1 )? null : (grid.tileListAr[x] as Array)[y + 1];  // shita

    var gridleft:Array = (x == 0 )? null : (grid.tileListAr[x - 1] as Array)[y];  // hidari
    var gridrigth:Array = (x == grid.grdMaxNumX - 1 )? null : (grid.tileListAr[x + 1] as Array)[y];  // migi

    // print("xの位置" + x + "yの位置" + y + "合体地" + nowgrid[3]);
    // print("x左の位置" + gridleft);
    // print("Y下の位置" + gridunder);
    // print("x右の位置" + gridrigth);
    // print("Y上の位置" + gridover);

    // 上チェック まだ合体できる
    if (gridover != null && nowgrid[3] == gridover[3]) {
        // print("上終わってる？");
        return false;
    }
    // 下チェック まだ合体できる
    if (gridunder != null && nowgrid[3] == gridunder[3]) {
        // print("下終わってる？");
        return false;
    }
    // 左チェック まだ合体できる
    if (gridleft != null && nowgrid[3] == gridleft[3]) {
        // print("左終わってる？");
        return false;
    }
    // 右チェック まだ合体できる
    if (gridrigth != null && nowgrid[3] == gridrigth[3]) {
        // print("右終わってる？");
        return false;
    }
    // print("どこでよばれた？" + x + y);
    return true;  // こいつは合体できない
};
