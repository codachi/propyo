//#pragma strict
#pragma downcast



static var setDefState= function(x:int,y:int){//初期の状態をセット
//var tgBtCelAr:Array = (grid.tileListAr[x] as Array) [y];
/*
[0] オブジェクト
*/

	btcelSetDefstate(x,y);//初期位置とサイズ
};


static var btcelSetDefstate = function(x,y){//初期配置
var testPos:Vector3 = Vector3(-3.004706,2.801687,0);
var testscl:Vector3 = Vector3(0.4f,0.4f,0.4f);


var tgBtCelAr:Array = (grid.tileListAr[x] as Array) [y];
var tgOb:GameObject = (tgBtCelAr[6]as Array)[0];
//print(tgBtCelAr[0]);

tgOb.transform.position = testPos;//ポジション
tgOb.transform.localScale = testscl;//スケール

tgOb.GetComponent('cellJump').enabled = true;//ジャンプ

tgOb.GetComponent(Rigidbody2D).isKinematic = false;//重力ON

};


static var fuseBtcell = function(nowX:int,nowY:int,futX:int,futY:int,mixnum){//バトルセルの合体
var nowAr:Array = (grid.tileListAr[nowX] as Array) [nowY];
var futureAr:Array = (grid.tileListAr[futX] as Array) [futY];
var nowArinfo:Array = nowAr[6];
var futureArinfo:Array = futureAr[6];

/*
[0]指定したグリッドのナンバリング名
[1]Vector3
[2]boolean
[3]合体数値
[4]あればGameObject
[5]一度合体したかどうかboolean
[6]上画面バトル用の配列
*/

Destroy(nowArinfo[0] as GameObject);//ゲームオブジェクトの削除	
nowAr[6] = null;//初期化



imgChange.relodeImg(futureArinfo[0],mixnum);//イメージのチェンジ

};