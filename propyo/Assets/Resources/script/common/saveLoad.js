#pragma strict



static var save = function(){
PlayerPrefs.SetInt("BestScore",para.bestScore);//ハイスコア登録
};

//http://yun.cup.com/unity028.html

static var load = function(){
var bestscore:int;
bestscore = PlayerPrefs.GetInt("BestScore");

para.bestScore = bestscore;//ベストスコア読み込み
};