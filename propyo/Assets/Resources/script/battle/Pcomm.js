#pragma strict


static var WorldWatcher:GameObject;
static var stage:GameObject;//ステージ
static var AdCueobject:GameObject;//キュー追加用オブジェクト
static var cellgroup:GameObject;//セルの親オブジェクト
static var btgroup:GameObject;//バトルセルセルの親オブジェクト

static var cellObAr:Array = new Array();//全てのセルのオブジェクトが入った配列 オブジェクト,X,Y

static var cellSpriteHs:Object[];//セルのスプライト画像配列


static var FFindOb = function(){//ヒエラルキーオブジェクトの読み込み
AdCueobject = GameObject.Find("cueObject");//キュー格納用クラス
stage = GameObject.Find("Stage");//クラスを格納する用OBJECT
cellgroup = GameObject.Find("cellGroup");//cellの親
btgroup = GameObject.Find("Btgroup");//バトルcellの親

cellSpriteHs = Resources.LoadAll("sprite/poyo",typeof(Sprite));//スプライトを一度に格納

para.scoretext = Instantiate(Resources.Load("prehab/score", GUIText));//プレハブから呼び出し
//以下セーブとロード用ハイスコア
para.bestScoretxt = Instantiate(Resources.Load("prehab/Hiscore", GUIText));//プレハブから呼び出し

para.drawscore();//スコア描画

};


