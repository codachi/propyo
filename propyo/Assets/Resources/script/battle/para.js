#pragma strict

static var score:int;
static var bestScore:int;
static var scoretext:GUIText;       // スコア描画用
static var bestScoretxt:GUIText;    // ベストスコア描画用
static var comboNum:int;            // コンボ数


// コンボ
static var addcomb = function() {
    if (comboNum == 1) {
        return 1;
    }
    if (comboNum >= 1) {
        var B:float = comboNum;
        var C:float = B / 10;
        // print("Cは" + C);
        return C + 1;
    }
};


// スコアの更新
static var addscore = function(point:int, x:int, y:int) {
    // print("コンボ数" + comboNum);
    // print("コンボバイリツ" + addcomb());

    var p:float = point;                    // キャスト
    var s:float = score + p * addcomb();  // 合体した数値を加算

    // tokuten you
    var efPoint:int = s; 
    var futureGridinfo:Array = (grid.tileListAr[x] as Array)[y] as Array;
    futureGridinfo[8] = efPoint;

    score = s;

    if (bestScore < score) {
        bestScore = score;  // ベストスコアの更新
        saveLoad.save();    // ハイスコアセー
    }
    drawscore();
};


static var drawscore = function() {
    scoretext.text = score.ToString();
    bestScoretxt.text = bestScore.ToString();
};
