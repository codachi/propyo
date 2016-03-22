//#pragma strict
#pragma downcast


/*
力を加える方法

行きたい座標をワールドポイントに変換

目的座標 - オブジェクト位置でベクトルの長さを求めて、Vector3.Normalize()で長さを正規化します
それを代入
*/


static var attackAn = function(futX,futY){//攻撃あにめーしょん
var futureAr:Array = (grid.tileListAr[futX] as Array) [futY];
var futureArinfo:Array = futureAr[6];


var myPos:Vector3 = (futureArinfo[0] as GameObject).transform.position;

var distance:Vector3 = Vector3.Normalize(bossJamp.bossPos - myPos);
(futureArinfo[0] as GameObject).transform.GetComponent.<Rigidbody2D>().AddForce(distance.up * 200 + distance.right * 200);


//print("なにこ" + futureArinfo[0]);
//(futureArinfo[0] as GameObject).transform.rigidbody2D.AddForce(Vector3.up * 200 + Vector3.right * 200);


};






static var cellwallk = function(pos:Vector3 , tgob:GameObject , flag, refAr:Array){//パズルセルの移動
var arrow = diffPass.NSEW();

var zRote:float;
switch(arrow){
case (0)://下
zRote = 0;
break;

case (1)://上
zRote = 0;
break;

case (2)://右
zRote = -20;
break;

case (3)://左
zRote = 20;
break;

};




	iTween.RotateTo(tgob,{//回転
	"time":0.1,
	"z":zRote,
	"easetype":iTween.EaseType.easeOutBounce,
	"onComplete":'comphandler',
	"onCompletetarget":tgob,
	"oncompleteparams":refAr
	});//


	//Time.timeScale=0.1;スロー
//	print("これからグ動くフラグ" + flag);
	iTween.MoveTo(tgob,{
	"time":0.3,
	"position":pos,
	"easetype":iTween.EaseType.easeOutBounce,
	"onComplete":'comphandler',
	"onCompletetarget":tgob,
	"oncompleteparams":refAr
	});//
}; 



static var cellBig = function (tgob:GameObject,refAr:Array){//合体した時一瞬大きくなるアニメーション
//[0]//合体地
//[1]//オブジェクト
//[2]Flg//合体したよのフラグ

print("セルビッグまできた" + refAr[2] + tgob);



if(refAr[2]){
print("トゥルー");
var pos:Vector3 = refAr[1].transform.position;


imgChange.relodeImg(refAr[1],refAr[0]);

	var DelOB:Function = motion.DestroyOb;
	var comAr:Array = new Array(null,null,false,DelOB);
	print("こいつの中身" + comAr);
	iTween.ScaleTo(tgob,{
	"time":0.3,
	"y":2,
	"x":2,
	"easetype":iTween.EaseType.easeOutBounce,
	"onComplete":'comphandler',
	"onCompletetarget":tgob,
	"oncompleteparams":comAr
	});//
	
}//if

//Destroy(tgob);
};


static var DestroyOb = function(tgob){
print("よばれてる？");
Destroy(tgob);
};






static var gravityCont = function(){

	for (var i:int=0; i<grid.grdMaxNumX; i++){//グリッドテーブル
		for (var m:int=0; m<grid.grdMaxNumY; m++){
		var tgAr:Array = (grid.tileListAr[i] as Array)[m];//タイルリスト呼び出し
		
		(tgAr[4] as GameObject ).GetComponent(Rigidbody2D).isKinematic = false;//重力ON
		
		}
	}


};


