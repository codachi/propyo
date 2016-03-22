#pragma strict

static var score:int;
static var bestScore:int;
static var scoretext:GUIText;//スコア描画用
static var bestScoretxt:GUIText;//ベストスコア描画用
static var comboNum:int;//コンボ数


static var addcomb = function(){//コンボ

if (comboNum == 1){
return 1;
}

else if(comboNum >= 1)  {
var B:float = comboNum;
var C:float = B/10;
//print("Cは" + C);
var bounasP = C + 1;
return bounasP;
}

};


static var addscore = function(point:int, x, y){//スコアの更新

//print("コンボ数" + comboNum);//
//print("コンボバイリツ" + addcomb());//

var p:float = point;//キャスト
var s:float = score + (p * addcomb() );//合体した数値を加算

//tokuten you
var efPoint:int = s; 
var futureGridinfo:Array = (grid.tileListAr[x] as Array)[y];//移動先
futureGridinfo[8] = efPoint;

score = s;

if (bestScore < score){
bestScore = score;//ベストスコアの更新

//セーブテスト
saveLoad.save();//ハイスコアセー
}

drawscore();//描画

};



static var drawscore = function(){//描画
scoretext.text = score.ToString();
bestScoretxt.text = bestScore.ToString();

};

