#pragma downcast

/*
#pragma static だとworningでる
解説

http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/


static var EmpTileAr:Array = new Array();//完全抽選用

//中身　(cou,pos,false);//場所番号とポジション格納



static var cellloto = function(){//ランダムで抽選
var num:int = countEmp();//空きマスカウント
var i = Random.Range(0,num); //ランダムでナンバーを抽選
//print(restTilNum + "中" + "ナンバー" + i);
return i;//抽選番号を返す
};


static var cellSpawn = function(){//セルの生成
var num:int = cellloto();//場所の抽選

	if(EmpTileAr.length <= 0){//空きがなかったら
	//更に動かせなかったらのフラグを入れる
	print("ゲームオーバー");
	cellCont.gravityCont();//重力ON
	return; //終わり
	}

	else if(EmpTileAr.length != 0){//空きがアレば
	var tgPosAr:Array = EmpTileAr[num];

	//print( "番号" + num + "抽選された場所"+ tgPosAr);

	var tgX:int = tgPosAr[0];
	var tgY:int = tgPosAr[1];


	//print("座標" + tgX + tgY);

	var tgCellAr:Array = (grid.tileListAr[tgX] as Array) [tgY];
	var pos:Vector3 = tgCellAr[1];
	var gameNum:int;//合体用数値
	var cellOb:GameObject;
	var btcellOb:GameObject;

	var sumNum = Random.Range(0,2); //0か1を抽選


	if(sumNum == 0){//合体用数値２の場合
	cellOb = Instantiate(Resources.Load("prehab/poyo", GameObject));//プレハブから呼び出し
	btcellOb = Instantiate(Resources.Load("prehab/poyo", GameObject));//プレハブから呼び出し	
	gameNum = 2;//合体用初期値
	}
	else if(sumNum == 1){//合体用数値４の場合
	cellOb = Instantiate(Resources.Load("prehab/poyo4", GameObject));//プレハブから呼び出し
	btcellOb = Instantiate(Resources.Load("prehab/poyo4", GameObject));//プレハブから呼び出し	
	gameNum = 4;//合体用初期値
	}

	cellOb.transform.position = pos;
	cellOb.name = (tgCellAr[0]).ToString();//リネーム
	cellOb.transform.parent = Pcomm.cellgroup.transform;//子に設定
	
	
	//バトルセル
	btcellOb.name = (tgCellAr[0]).ToString();//リネーム
	btcellOb.transform.parent = Pcomm.btgroup.transform;//子に設定


	////print("タイルの状態" + grid.tileListAr[X]);
	//

	//print("場所の取り出し" + YAr);//



	tgCellAr[2] = true;//いるよ！
	tgCellAr[3] = gameNum;//合体用初期値をタイルリストに代入
	tgCellAr[4] = (cellOb);//オブジェクトを追加
	

	//バトル用
	var btcellAr = new Array(btcellOb);//上画面バトル用ArD
	tgCellAr[6] = btcellAr;
	btcell.setDefState(tgX,tgY);//ポジションとか
//	print("状態" + grid.tileListAr);


	}//if 空きがあれば






//	//デバッグ
	var text:GUIText = Instantiate(Resources.Load("prehab/debugText", GUIText));//プレハブから呼び出し
	text.transform.parent = cellOb.transform.transform;//親子
	debugGuireflesh.reguiExt(gameNum,tgCellAr);//デバッグ用　てきすと描画
	var viewportPoint:Vector3 = Camera.main.WorldToViewportPoint(cellOb.transform.position );//GUItextのポジションを変換
	text.transform.position = viewportPoint;//
//	//デバッグ

};



//空いている所を確認する
static var countEmp = function(){
var cou:int;
cou = 0;


var temp:Array = grid.tileListAr[0];//いったん
var Xnum:int = grid.tileListAr.length;
var Ynum:int = temp.length;

EmpTileAr.Clear();
	for(var i:int = 0; i<Xnum; i++){
		for(var m:int = 0; m<Ynum; m++){
		var XAr:Array = grid.tileListAr[i];
		var YAr:Array = XAr[m];
		var num:boolean = YAr[2];
			if(num == false){
				cou += 1;
				var tem:Array = new Array(i,m);
				EmpTileAr.push(tem);//抽選用
			}else{
			
			}
		}
	}
//print("空" + EmpTileAr);
	return cou;
};