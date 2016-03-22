#pragma downcast

/*
#pragma static だとworningでる
解説

http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/


static var xLineCheckAr:Array = new Array();//一列全部埋まってるかの配列
static var yLineCheckAr:Array = new Array();//一列全部埋まってるかの配列

static var fullFlag:boolean;//セルが一杯になったかどうか


static var checkEmpty = function(X,Y,arrow,num:int){//セルが空いてるかどうかをチェックする X Y　方向　移動量 
//grid.tileListArが状態管理用
//print(arrow + "num"+ num);

	var XAr:Array;
	var tgCellAr:Array;
	var x:int = X;
	var y:int = Y;


	var nottile = null;
	
	switch(arrow){
	case(0)://下
	
//		print("下セルが恥か" + (difEdge(0,y)) );
		if ((difEdge(0,y) == false )){//端か判定
//		print("移動量" + num +"y" + y);
		y = num + y;//もし端じゃなかったら　移動先をしてい
		}else if ((difEdge(0,y) == true )){
//		print("null");
		
		return null;
		}
	break;
	
	case(1)://上
//		print("上セルが恥か" + difEdge(1,y) );
		if ((difEdge(1,y) == false )){//端か判定
//		print("移動量" + num +"y" + y);
		y = num + y;
		}else if((difEdge(1,y) == true )){
//		print("null");
		return null;	
		}
	break;
	
	case(2)://右
//		print("右セルが恥か" + (difEdge(2,x)));
		if ((difEdge(2,x) == false )){//端か判定
//		print("移動量" + num +"X" + x);
		x = num + x;
		}else if((difEdge(2,x) == true )){
//		print("null");
		
		return null;
		}
	break;
	
	case(3)://左
//		print("左セルが恥か" + (difEdge(3,x)));
		if ((difEdge(3,x) == false )){//端か判定
//		print("移動量" + num +"X" + x);
		x = num + x;
		}else if((difEdge(3,x) == true )){
//		print("null");
		
		return null;
		}
	break;
	}
	
//	print("移動先のXY" + "x" + x+"y" +y);
	XAr = grid.tileListAr[x];//グリッドリストから状態を返す
	tgCellAr = XAr[y];
	//グリッドNum　ポジション　今上のいるかどうか　合体用飼カウント
	/*
	[0]name
	[1]vector3
	[2]boolean
	*/

	
	return [x,y, (tgCellAr[1]),(tgCellAr[2])];//フリックした方向と　ポジション　今上のいるかどうか　合体用飼カウント
};






static var oneOr = function(){//＋軸かマイナス軸かをチェック
var arrow = diffPass.NSEW();//フリック上下左右判定
//print("方向 oneOr" + arrow);
//0下
//1上
//2右
//3左

var num;
	switch(arrow){
	case(0)://下
//	print("下");
	num = 1;		
	break;
	
	case(1)://上
//	print("上");
	num = -1;
	break;
	
	case(2)://右
//	print("右");
	num = 1;
	break;
	
	case(3)://左
//	print("左");
	num = -1;
	break;
	
	default:
	print("方向ｓなし");
	num = null;
    break;
	}
	
return [arrow,num];
};


static var difEdge = function(xy,num){//セルからはみ出してないか xだとtrue
var flag:boolean;

//print("列" + num + "フリック方向" + xy);

//print("最大グリッド数" + grid.grdMaxNumX);

if ((xy == 2) || (xy == 3) ){//x軸だったら
//print("X軸だよ");
	if( xy == 3 && num == 0 ){//一番右恥はじだったら
//	print("左端だよ");
	flag = true;
	}else if(xy == 2 && (num == (grid.grdMaxNumX) - 1)  ) {
//	print("左端だよ");
	flag = true;
	}
//	else{
//	flag = false;
//	}
}

else{//Y軸だったら
//print("Y軸だよ");
	if( (xy == 0) && (num == (grid.grdMaxNumY - 1)) ){//下
	flag = true;
	}
	else if( (xy == 1) && (num == (0))    ){//上
	flag = true;
	}
//	else{
//	flag = false;
//	}
}
return flag;
};



static var checkmate = function(){//セルの空きじょうきょう

//print("空き" + (cellspawn.EmpTileAr.length - 1));

//	print("長さ" + cellspawn.EmpTileAr.length);
	if(cellspawn.EmpTileAr.length - 1 <= 0){//空き無し
	print(grid.gridAllNum);
	print("一杯です");
	fullFlag = true;//とりあえずセルは一杯です
	
	checkAround();//ゲームオーバーかどうか
	return;//終わり
	}

	else if (cellspawn.EmpTileAr.length - 1 >= 0){//空きあり
//	print(grid.gridAllNum);
//	print("一杯を初期化");
	fullFlag = false;//初期化
	}
	

};




static var checkAround = function (){//自分の周りの空きをチェック
var checkCount:int = 0;//セルが合体できるかカウント
/*
[0]指定したグリッドのナンバリング名
[1]Vector3
[2]boolean
[3]合体数値
[4]あればGameObject
[5]すでに合体したかどうかフラグ
*/


		for (var i:int=0; i<grid.grdMaxNumX; i++){
			for (var m:int=0; m<grid.grdMaxNumY; m++){
			var nosumFlg = checkar(i,m);//全方位チェク
				if(nosumFlg == true){//合体できないセルだったら
				checkCount += 1;//カウント
				}
			}//for
		}//for
		
		print("チェックカウント" + checkCount);
		if(checkCount >= grid.gridAllNum){
		print("ゲームオーバー");
		
		
		//セーブテスト
		saveLoad.save();//ハイスコアセーブ
		
		motion.gravityCont();//重りょく
		return true;
		}

};




static var checkar = function(x:int , y:int){//全方位チェック

//print("x" +x + "y"+ y);
var nowgrid:Array = (grid.tileListAr[x] as Array)[y];//今の位置
var gridover:Array = (y == 0 )? null : (grid.tileListAr[x] as Array)[y - 1];//ue
var gridunder:Array = (y == grid.grdMaxNumY - 1 )? null : (grid.tileListAr[x] as Array)[y + 1];//shita

var gridleft:Array = (x == 0 )? null : (grid.tileListAr[x - 1] as Array)[y];//hidari
var gridrigth:Array = (x == grid.grdMaxNumX - 1 )? null : (grid.tileListAr[x + 1] as Array)[y];//migi

//print("xの位置" + x + "yの位置" + y + "合体地" + nowgrid[3]);
//print("x左の位置" + gridleft);
//print("Y下の位置" + gridunder);
//print("x右の位置" + gridrigth);
//print("Y上の位置" + gridover);


if(gridover != null){//空じゃなかったら
	if(nowgrid[3] == gridover[3]){//上チェック まだ合体できる
	print("上終わってる？");
	
	return false;//終わり
	}
}

if(gridunder != null){
	if(nowgrid[3] == gridunder[3]){//下チェック まだ合体できる
//	print("下終わってる？");
	
	return false;//終わり
	}
}

if(gridleft != null ){
	if(nowgrid[3] == gridleft[3]){//左チェック まだ合体できる
//	print("左終わってる？");
	return false;//終わり
	}
}

if(gridrigth != null){
	if(nowgrid[3] == gridrigth[3]){//右チェック まだ合体できる
//	print("右終わってる？");
	
	return false;//終わり
	}
}

//print("どこでよばれた？" + x + y);
return true;//こいつは合体できない

};




