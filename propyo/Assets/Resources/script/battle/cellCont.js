﻿#pragma downcast
/*
#pragma static だとworningでる
http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/

static var dellObAr:Array = new Array();  // 削除用アレー
static var Ar:Array;                      // オブジェクト
static var ArX:int;
static var ArY:int;
static var countFirstflg:boolean;         // オブジェクトが何も動けなかったらture
static var tweenCompflag:boolean;
static var FirstFlg;                      // モーション用の最初の配列格納用


static var cellcont = function() {
    // フリック方向によって舐める方向変える
    // もし列が一杯だったら其の列をスキップして
    // 合体後のセルのチェックして移動後に削除
    var flick_direction = diffPass.NSEW();
    if (flick_direction == null) {
        // フリック方向がなければ抜ける
       return;
    }

    var firstCount:int = 0;
    while (true) {
        var x:int;
        var y:int;
        var moved_count:int = 0;

        // フリック方向によって舐める方向を変える
        if (flick_direction == 1 || flick_direction == 3) {
            // over left
            for (y = 0; y < grid.grdMaxNumY; y++) {
                for (x = 0; x < grid.grdMaxNumX; x++) {
                    moved_count += moveTick(x, y);
                }
            }
        } else {
            // under right
            for (x = grid.grdMaxNumX - 1; x >= 0; x--) {
                for (y = grid.grdMaxNumY - 1; y >= 0; y--) {
                    moved_count += moveTick(x, y);
                }
            }
        }
        // 何も移動しなかったら（カウントがセル分）
        if (moved_count == 0) {
            // 一度も何も移動しなかったら
            if (firstCount == 0) {
                countFirstflg = true;           // 初回で
                para.comboNum = 0;              // コンボカウント初期化
                refleshSumFlag();               // 一度合体したかどうかのフラグを初期化
                return;
            }
            break;
        }
        firstCount += 1;
    }
    moveCell();                     // 描画移動
    refleshSumFlag();               // 一度合体したかどうかのフラグを初期化
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
};


static var moveTick = function(x, y) : int {
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
        return 0;
    }
    // print("今の位置" + x + y);
    if (moveTgCelInfoAr == null) {
        // 自分がいたらが行き止まりだった（端だとnullになる）
        return 0;
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
        return 1;
    }
    if (futureGridinfo[5] == true) {
        // 移動先にいて、合体していたら
        return 0;
    }
    // 移動先が合体してなかったら合体を試みる
    // 今の座標と移動量 合体値が帰ってクルだけ
    var MixNum = maltipcell.multip(nowGridinfo[3], futureGridinfo[3]);
    if (MixNum == null) {
        // 数値が一致して無かったら
        return 0;
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

    return 1;
};


// 移動先へのオブジェクトの代入
static var rePlaceCell = function(x:int, y:int, Fx:int, Fy:int) {
    var nowGridinfo:Array = (grid.tileListAr[x] as Array)[y];       // 現在位置
    var futureGridinfo:Array = (grid.tileListAr[Fx] as Array)[Fy];  // 移動先

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

