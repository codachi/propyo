#pragma downcast
/*
#pragma static だとworningでる
http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/

static var dellObAr:Array = new Array();  // 削除用アレー
static var Ar:Array;                      // オブジェクト
static var ArX:int;
static var ArY:int;
static var notMuchcheckCount = 0;         // 隣が同じじゃなかった時の繰り返しカウント
static var notMuchcheckCountFlg:boolean;  // 隣が同じじゃなかった時の繰り返しカウント
static var countFirstflg:boolean;         // オブジェクトが何も動けなかったらture
static var tweenCompflag:boolean;
static var FirstFlg;                      // モーション用の最初の配列格納用
static var motionfirstCheck = true;


static var cellcont = function() {
    // movetgAr.Clear();//初期化
    // movePointAr.Clear();
    // print("moveはじめ");
    // var testcount = 0;
    // // Pcomm.cellObAr
    // // [0] GameObject
    // // [1] X
    // // [2] Y
    // // [3] gameNum
    // // [4] pos
    // print("オブジェクト" + Pcomm.cellObAr[0]);
    // print("グリッドリスト" + grid.tileListAr);

    // フリックチェックして
    // ふりっク方向によって舐める方向変えて
    // もし列が一杯だったら其の列をスキップして
    // 合体後のセルのチェックして移動後に削除
    var lineAr:Array;  // XorY軸ラインのチェック配列が代入される
    var flickCheck = diffPass.NSEW();
    switch (flickCheck) {
        case 0: case 1: lineAr = check.yLineCheckAr; break;  // 上下ならY
        case 2: case 3: lineAr = check.xLineCheckAr; break;  // 左右ならX
    }

    // フリック方向があれば
    if (flickCheck != null) {
        // フリック方向によって舐める方向を変える
        switch (flickCheck) {
            case 0: case 2: underRight(); break;
            case 1: case 3: overLeft(); break;
        }
    }
};


// 上左フリックの場合の読み
static var overLeft = function() {
    var firstCount = 0;
    motionfirstCheck = true;

    while (notMuchcheckCountFlg == false) {
        for (var y:int = 0; y < grid.grdMaxNumY; y++) {
            for (var x:int = 0; x < grid.grdMaxNumX; x++) {
                contrall(x, y);
            }
        }
        refleshFmoveFlag();  // 一回でも動いたかフラグ初期化
        
        // print("ノットマッチ"  + notMuchcheckCount);
        if (notMuchcheckCount >= grid.gridAllNum) {
            // 何も移動しなかったら（カウントがセル分）
            notMuchcheckCountFlg = true;
            if (firstCount == 0) {
                // 一度も何も移動しなかったら
                bothclear();     // 共通処理
                firstCount = 0;  // 初期化
                return;          // 終わり
            }
        }
        firstCount += 1;        // カウント
        notMuchcheckCount = 0;  // 初期化
    }
    // print("抜けました");

    notMuchcheckCountFlg = false;   // 初期化
    moveCell();                     // 描画移動
    refleshSumFlag();               // 一度合体したかどうかのフラグを初期化
};


// TODO(takishita): overLeft()との共通化
// 下右フリックの場合の読み
static var underRight = function() {
    var firstCount = 0;
    motionfirstCheck = true;

    while (notMuchcheckCountFlg == false) {
        for (var x:int = (grid.grdMaxNumX - 1); x >= 0; x--) {
            for (var y:int = (grid.grdMaxNumY - 1); y >= 0; y--) {
                contrall(x, y);
            }
        }
        refleshFmoveFlag();  // 一回でも動いたかフラグ初期化

        // print("ノットマッチ"  + notMuchcheckCount);
        if (notMuchcheckCount >= grid.gridAllNum) {
            // 何も移動しなかったら（カウントがセル分）
            notMuchcheckCountFlg = true;
            if (firstCount == 0) {
                // 一度も何も移動しなかったら
                bothclear();     // 共通処理
                firstCount = 0;  // 初期化
                return;          // 終わり
            }
        }
        firstCount += 1;        // カウント
        notMuchcheckCount = 0;  // 初期化
    }
    // print("抜けました");

    notMuchcheckCountFlg = false;   // 初期化
    moveCell();                     // 描画移動
    refleshSumFlag();               // 一度合体したかどうかのフラグを初期化
};


// 左右共通処理
static var bothclear = function() {
    // print("ここは？");
    countFirstflg = true;           // 初回で
    notMuchcheckCount = 0;          // 初期化
    refleshSumFlag();               // 一度合体したかどうかのフラグを初期化
    notMuchcheckCountFlg = false;   // 初期化
    para.comboNum = 0;              // コンボカウント初期化
    // print("コンボカウント初期化");
};


// 一旦合体したかどうかのパラメータとかの初期化
static var refleshSumFlag = function() {
    // コンボカウント初期化
    para.comboNum = 0;

    for (var x:int = 0; x < grid.grdMaxNumX; x++) {
        for (var y:int = 0; y < grid.grdMaxNumY; y++) {
            var gridinfo:Array = (grid.tileListAr[x] as Array)[y];
            gridinfo[5] = false;    // 一度合体したかどうかのフラグを初期化
            // gridinfo[7] = false;    // 一度移動しましたよフラグ初期化！
            gridinfo[8] = null;     //  point
        }
    }
    // check.checkmate();  // セルが一杯かどうか
};


// 一度でも移動したかどうかのフラグ
static var refleshFmoveFlag = function() {
    // for (var x:int = 0; x < grid.grdMaxNumX; x++) {
    //     for (var y:int = 0; y < grid.grdMaxNumY; y++) {
    //         var gridinfo:Array = (grid.tileListAr[x] as Array)[y];
    //         // gridinfo[7] = false;  // 一度移動しましたよフラグ初期化！
    //     }
    // }
};


static var contrall = function(x, y) {
    // フリック上下左右判定して方向と移動数数を返す
    var arrNum:Array = check.oneOr();
    // X Y フリック方向 移動数値
    var moveTgCelInfoAr = check.checkEmpty(x, y, arrNum[0], arrNum[1]);
    // [0]x
    // [1]y
    // [2]Vector3
    // [3]boolean
    var nowGridinfo:Array = (grid.tileListAr[x] as Array)[y];  // 今いるところ

    // [0]指定したグリッドのナンバリング名
    // [1]Vector3
    // [2]boolean //今上にいるかどうか
    // [3]合体数値
    // [4]あればGameObject
    // [5]一度合体したかどうかboolean
    // [6]上画面バトル用の配列
    // [7]合体した場合のオブジェクト合体元のオブジェクト格納
    // [8] point  hyoji  you

    if (nowGridinfo[2] == false) {
        // 自分がイなかったら
        notMuchcheckCount += 1;
        return;
    }
    // print("今の位置" + x + y);
    if (moveTgCelInfoAr == null) {
        // 自分がいたらが行き止まりだった（端だとnullになる）
        notMuchcheckCount += 1;
        return;
    }
    // 端じゃなかったら
    var tempAr:Array = moveTgCelInfoAr;
    var futureGridinfo:Array = (grid.tileListAr[tempAr[0]] as Array)[tempAr[1]];

    if (futureGridinfo[2] == false) {
        // 移動先にイなかったら
        // セルの更新用 今の位置座標, 先の座標
        rePlaceCell(x, y, tempAr[0], tempAr[1]);
        // print("移動元情報" + nowGridinfo);
        // print("移動先情報" + futureGridinfo);
        return;
    }
    if (futureGridinfo[5] == true) {
        // 移動先にいて、合体していたら
        notMuchcheckCount += 1;
        return;
    }
    // 移動先が合体してなかったら合体を試みる
    // 今の座標と移動量 合体値が帰ってクルだけ
    var MixNum = maltipcell.multip(nowGridinfo[3], futureGridinfo[3]);
    if (MixNum == null) {
        // 数値が一致して無かったら
        notMuchcheckCount += 1; 
        return;
    }
    // 数字が一致してたら合体開始
    // print("合算値" + MixNum);
    para.comboNum += 1;  // こんぼ開始

    nowGridinfo[2] = false;         //移動元フラグ更新
    nowGridinfo[3] = 0;             // 合体値初期化

    futureGridinfo[2] = true;       //移動先フラグ更新
    futureGridinfo[3] = MixNum;     // 合体値を代入 
    futureGridinfo[5] = true;       //既合体フラグON

    // // pos,object アニメーション ,モーション用フラグ, 
    // motion.cellwallk(futureGridinfo[1], nowGridinfo[4], true);
    // // ここで移動先のオブジェクトのテクスチャを更新
    // // オブジェクト, イメージチェンジ
    // imgChange.relodeImg(futureGridinfo[4], futureGridinfo[3]);

    futureGridinfo[7] = nowGridinfo[4];  // 合体元のオブジェクトをアニメーション用に格納
    // ここで一旦全てを格納する配列にいれて
    // そこでまとめてアニメーションして配列削除する処理を入れないとダメかも

    // スコアの更新
    para.addscore(MixNum, tempAr[0], tempAr[1]);

    // バトルセルの合体
    // 今の位置座標, 先の座標, 合体地
    btcell.fuseBtcell(x, y, tempAr[0], tempAr[1], MixNum);
    motion.attackAn(tempAr[0], tempAr[1]);  // 攻撃アニメーション

    // デバッグ用
    debugGuireflesh.reguiExt(MixNum,futureGridinfo);  // デバッグ用
    // デバッグ用
};


// 移動先へのオブジェクトの代入
static var rePlaceCell = function(x:int, y:int, Fx:int, Fy:int) {
    // print("きてる？");
    var nowGridinfo:Array = (grid.tileListAr[x] as Array)[y];       // 現在位置
    var futureGridinfo:Array = (grid.tileListAr[Fx] as Array)[Fy];  // 移動先

    // pos,object アニメーション
    // motion.cellwallk(futureGridinfo[1], nowGridinfo[4], false);

    futureGridinfo[2] = true;            // 移動先フラグ更新
    futureGridinfo[3] = nowGridinfo[3];  // 合体値の更新
    futureGridinfo[4] = nowGridinfo[4];  // オブジェクト情報移動
    futureGridinfo[5] = nowGridinfo[5];  // 既合体フラグ移動
    futureGridinfo[6] = nowGridinfo[6];  // 以下バトルセル
    futureGridinfo[8] = nowGridinfo[8];  // point

    // 移動元フラグ更新
    nowGridinfo[2] = false;
    nowGridinfo[3] = 0;
    nowGridinfo[4] = null;
    nowGridinfo[8] = null;
};


// 移動とオブジェクトの削除
static var moveCell = function() {
    // overLeft
    for (var y:int = 0; y < grid.grdMaxNumY; y++) {
        for (var x:int = 0; x < grid.grdMaxNumX; x++) {
            var Gridinfo:Array = (grid.tileListAr[x] as Array)[y];
            var Flg:boolean;
            var refleshObAr:Array;

            if (Gridinfo[7] != null) {
                // 合体用cell
                Flg = true;
                // 合体した後のオブジェクト変更用配列
                refleshObAr = new Array(
                    Gridinfo[3],    // 合体値
                    Gridinfo[4],    // オブジェクト
                    Flg,            // 合体したよのフラグ
                    null);
                motion.cellwallk(Gridinfo[1], Gridinfo[7], Flg, refleshObAr);
            }
            if (Gridinfo[2]) {
                // 移動用
                // 合体した後のオブジェクト変更用配列
                Flg = false;
                refleshObAr = new Array(
                    Gridinfo[3],    // 合体値
                    Gridinfo[4],    // オブジェクト
                    Flg,            // 合体したよのフラグ
                    null);
                motion.cellwallk(Gridinfo[1], Gridinfo[4], Flg, refleshObAr);
            }
        }
    }
};


/*
static var trueOnlyFirstTime = function() {//最初の一度だけtreuを返して　あとはfalse を返す
var check = (function():boolean {
    if (motionfirstCheck) {
      motionfirstCheck = false;
      return true;
    }
    return false;
  })();
  
    return check;
};



/*

移動列が全部埋まってたら　うごけない


もしくは移動列の数が　MAX-1（今回４子）　で　全部つながっており　なおかつフリック方向側に空きがなければNG　　（MAX-1で　どっちか橋があいてルパターン）
逆にMAX-1　でつながってても　フリック方向に空きがあればOK
MAX-1　でも　まン中に空きがある場合は　OK（MAX-1で　両端が埋まってるパターン）


上記の条件を確認した後
自分の隣にセルがあれば　移動不可　　なければ可能の条件の元

一旦オブジェクトの配列側に、移動先のグリッド情報を格納


完了したら
オブジェクト側のグリッド情報を元に、　グリッド管理している配列のtrue falseを更新


ここまでが移動処理


その前に合体処理を入れた方がいいかも

合体処理
↓
移動の順番



自分のグリッドの確認
行きたい方向にいるかどうか
又、行きたい方向のやつがこれからうごくかどうか
行きたい方向のやつがいたら、そいつが自分と同じかどうか
*/
