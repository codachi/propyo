#pragma strict

var ActionNum:int;//キューの配列の長さ
static var ActionCueAr:Array = new Array();//アクションキューリスト
static var cueFlag:boolean;//実行可能であればtrue




function Awake(){
cueFlag = true;
//addEx();
Pcomm.FFindOb();//オブジェクトの登録
saveLoad.load();//スコアロード
para.drawscore();//スコア描画
}


function Start () {
addEx(grid.getStageSize);
addEx(grid.gridspawn);
addEx(setStage.setBoss);//ボス画像
addEx(cellspawn.cellSpawn);


//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);
//addEx(cellspawn.cellSpawn);



}


function Update () {

	ActionNum = ActionCueAr.length;//キューの長さ
	//キューに実行するものがあれば実行
	if((ActionNum > 0) && (cueFlag == true)){
	excute();
	}
	else{}
	



	//タッチ判定系
	if(0 < Input.touchCount){
		if(Input.GetTouch(0).phase == TouchPhase.Began){
		touch();
		}
		
		if(Input.GetTouch(0).phase == TouchPhase.Moved){
		drag();
		}
		
		if(Input.GetTouch(0).phase == TouchPhase.Ended){
		moveup();
		}
	}
	else{}


	if( (Input.GetMouseButtonDown(0)) ){
	touch();
	}
	
	if( (Input.GetMouseButton(0)) ){
	drag();
	}
	
	if( (Input.GetMouseButtonUp(0)) ){
	moveup();
	}
	else{}

}





function touch(){
diffPass.FsPoint  = Sray.getTpPos();//タップポジション格納
//print("タッチ位置" + diffPass.FsPoint);
}

function drag(){

}

function moveup(){
diffPass.EnPoint =  Sray.getTpPos();//タップポジション格納
//print("タッチアップ位置" + diffPass.EnPoint);

addEx(cellCont.cellcont);//きゅーの追加でせるの動き

addEx(cellcont);//判定してセルを追加

//addEx(check.checkAround);

}//moveup




var cellcont = function(){//チェックしてセルを生成
var flickCheck = diffPass.NSEW();

	if(flickCheck != null){//フリック方向があれば
		if(cellCont.countFirstflg == false){//何か移動後であれば
//		print("セルとチュエックコレkラ");
			addEx(cellspawn.cellSpawn);
			addEx(check.checkmate);
		}
		defpara();//初期化
	}
};




var defpara = function(){
cellCont.tweenCompflag = false;//tweenフラウグ
cellCont.countFirstflg = false;//オブジェクトが何も動けなかったらtur
};
















static var addEx = function (CUE:Function){//追加するだけ Ar は引数があれば引数が入る
var cueObject:addQueue = Pcomm.AdCueobject.AddComponent(addQueue) as addQueue;//一旦空のオブジェクトにコンポーネント追加
cueObject.AddCue(CUE);//追加
Destroy(Pcomm.AdCueobject.GetComponent(addQueue));//コンポネントの削除
};

function excute(){//キューの実行
//print("きた？");
cueFlag = false;
yield StartCoroutine("excu");//実行
ActionCueAr.splice(0,1);
cueFlag = true;
//print("うんち終了");
};
function  excu(){
//print("実行したい");
var cu:Function = ActionCueAr[0] as Function;
cu();

}




//テスト用うんち
var unchi = function(){
//	for(var p:int = 0; p<100; p++){
//	print("うんち" + p);
//	}
};


