#pragma strict


static var WorldWatcher:GameObject;
static var stage:GameObject;        // ステージ
static var AdCueobject:GameObject;  // キュー追加用オブジェクト
static var cellgroup:GameObject;    // セルの親オブジェクト
static var btgroup:GameObject;      // バトルセルセルの親オブジェクト

static var cellSpriteHs:Object[];         // セルのスプライト画像配列


// ヒエラルキーオブジェクトの読み込み
static var FFindOb = function() {
    AdCueobject = GameObject.Find("cueObject");  //キュー格納用クラス
    stage       = GameObject.Find("Stage");      //クラスを格納する用OBJECT
    cellgroup   = GameObject.Find("cellGroup");  //cellの親
    btgroup     = GameObject.Find("Btgroup");    //バトルcellの親

    // スプライトを一度に格納
    cellSpriteHs = Resources.LoadAll("Sprite/poyo",typeof(Sprite));

    para.scoretext = Instantiate(Resources.Load("Prefab/score", GUIText));
    para.bestScoretxt = Instantiate(Resources.Load("Prefab/Hiscore", GUIText));
    para.drawscore();
};


