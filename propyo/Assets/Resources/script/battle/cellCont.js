#pragma downcast

/*
#pragma static だとworningでる
解説

http://shise2unitymemo.blog.fc2.com/blog-entry-1.html
*/


static var dellObAr:Array = new Array();//削除用アレー

static var Ar:Array;//オブジェクト
static var ArX:int;
static var ArY:int;
			


static var notMuchcheckCount = 0;//隣が同じじゃなかった時の繰り返しカウント
static var notMuchcheckCountFlg:boolean;//隣が同じじゃなかった時の繰り返しカウント
static var countFirstflg:boolean;//オブジェクトが何も動けなかったらture

static var tweenCompflag:boolean;



static var FirstFlg;//モーション用の最初の配列格納用
static var motionfirstCheck = true;



static var cellcont = function(){

//movetgAr.Clear();//初期化
//movePointAr.Clear();
//print("moveはじめ");

//var testcount = 0;

//Pcomm.cellObAr
//[0] GameObject
//[1] X
//[2] Y
//[3] gameNum
//[4] pos

//print("オブジェクト" + Pcomm.cellObAr[0]);
//print("グリッドリスト" + grid.tileListAr);


/*
フリックチェックして
ふりっク方向によって舐める方向変えて
もし列が一杯だったら其の列をスキップして
合体後のセルのチェックして　移動後に削除
*/


var flickCheck = diffPass.NSEW();

//ラインチェッカー

var lineAr:Array;//XorY軸ラインのチェック配列が代入される
	if((flickCheck == 2) || (flickCheck == 3)){//左右なら
	lineAr = check.xLineCheckAr;//X
	}//ラインチェック
	else if((flickCheck == 0) || (flickCheck == 1)){//上下なら
	lineAr = check.yLineCheckAr;//Y
	}


if(flickCheck != null){//フリック方向があれば




	switch(flickCheck){//フリック方向によって舐める方向を変える
		
		case(0):
		underRight();
		break;
		
		case(1):
		overLeft();
		break;
		
		case(2):
		underRight();
		break;
		
		case(3):
		overLeft();
		break;
		
	}//switch end
	
		
	}//フリックチェック
	

//print("moveおわり");

};



static var overLeft = function(){//上左フリックの場合の読み
var firstCount = 0;
motionfirstCheck = true;//初期化

while (notMuchcheckCountFlg == false){




	for(var olv:int =0; olv<grid.grdMaxNumY; olv++){//Y
		for(var olm:int =0; olm<grid.grdMaxNumX; olm++){//x
			contrall(olm ,olv);//x,y
		}//for end
	}//for end
	
	
	refleshFmoveFlag();//一回でも動いたかフラグ初期化
	
	//print("ノットマッチ"  + notMuchcheckCount );
	if(notMuchcheckCount >= grid.gridAllNum){//何も移動しなかったら（カウントがセル分）
	notMuchcheckCountFlg = true;
		
		if(firstCount == 0){//一度も何も移動しなかったら
			bothclear();//共通処理
			firstCount = 0;//初期化
			return;//終わり
		}
	}
	firstCount += 1;//カウント
	notMuchcheckCount = 0;//初期化
	

}//while

//print("抜けました");

//初期化
notMuchcheckCountFlg = false;//初期化


//描画移動
moveCell();


refleshSumFlag();//一度合体したかどうかのフラグを初期化
};//overLeft End



static var underRight = function(){//下右フリックの場合の読み
var firstCount = 0;
motionfirstCheck = true;//初期化

while (notMuchcheckCountFlg == false){



	for(var urx:int = (grid.grdMaxNumX - 1); urx>=0; urx--){//X
		for(var ury:int = (grid.grdMaxNumY - 1); ury>=0; ury--){//Y;
			contrall(urx,ury);//x,y
		}//for end
	}//for end
	
	
		refleshFmoveFlag();//一回でも動いたかフラグ初期化
	
//print("ノットマッチ"  + notMuchcheckCount );
	if(notMuchcheckCount >= grid.gridAllNum){//何も移動しなかったら（カウントがセル分）
	notMuchcheckCountFlg = true;

	
			if(firstCount == 0){//一度も何も移動しなかったら
			bothclear();//共通処理
			firstCount = 0;//初期化
			return;//終わり
			}
			
	}
	firstCount += 1;//カウント
	notMuchcheckCount = 0;//初期化
	
	
	
}//while
//print("抜けました");

//初期化
notMuchcheckCountFlg = false;//初期化


//描画移動
moveCell();


//初期化
refleshSumFlag();//一度合体したかどうかのフラグを初期化
};//underRight end




static var bothclear = function(){//左右共通処理
//print("ここは？");
countFirstflg = true;//初回で

notMuchcheckCount = 0;//初期化
refleshSumFlag();//一度合体したかどうかのフラグを初期化

notMuchcheckCountFlg = false;//初期化
para.comboNum = 0;//コンボカウント初期化
//print("コンボカウント初期化");
};







static var refleshSumFlag = function(){//一旦合体したかどうかのパラメータとかの初期化
para.comboNum = 0;//コンボカウント初期化

for (var i:int=0; i<grid.grdMaxNumX; i++){
	for (var m:int=0; m<grid.grdMaxNumY; m++){
	var gridinfo:Array = (grid.tileListAr[i] as Array)[m];//タイルリスト呼び出し
	gridinfo[5] = false;//一度合体したかどうかのフラグを初期化
//	gridinfo[7] = false;//一度移動しましたよフラグ初期化！
	gridinfo[8] = null;// point

	}//for
}//for
//check.checkmate();//セルが一杯かどうか
};


static var refleshFmoveFlag = function(){//一度でも移動したかどうかのフラグ
for (var i:int=0; i<grid.grdMaxNumX; i++){
	for (var m:int=0; m<grid.grdMaxNumY; m++){
	var gridinfo:Array = (grid.tileListAr[i] as Array)[m];//タイルリスト呼び出し
//	gridinfo[7] = false;//一度移動しましたよフラグ初期化！
	}//for
}//for
};




static var contrall = function(x,y){
var arrNum:Array = check.oneOr();//フリック上下左右判定して　方向と移動数数を返す
var moveTgCelInfoAr = check.checkEmpty(x,y,arrNum[0],arrNum[1]); //X Y フリック方向 移動数値
/*
[0]x
[1]y
[2]Vector3
[3]boolean
*/

var nowGridinfo:Array = (grid.tileListAr[x] as Array)[y];//今いるところ
/*
[0]指定したグリッドのナンバリング名
[1]Vector3
[2]boolean //今上にいるかどうか
[3]合体数値
[4]あればGameObject
[5]一度合体したかどうかboolean
[6]上画面バトル用の配列
[7]合体した場合のオブジェクト合体元のオブジェクト格納
[8] point  hyoji  you
*/

if(nowGridinfo[2] == false){//自分がイなかったら
notMuchcheckCount += 1;
return;//終わり
}

else if(nowGridinfo[2] == true){//自分がいたら
//		print("今の位置" + x + y);
	if(moveTgCelInfoAr == null){//行き止まり
	notMuchcheckCount += 1;
	return;//終わり
	}
	else if(moveTgCelInfoAr != null){//端だとnullになる　端じゃなかったら
		var tempAr:Array = moveTgCelInfoAr;//キャスト
		var futureGridinfo:Array = (grid.tileListAr[tempAr[0]] as Array)[tempAr[1]];//移動先
		

			if((futureGridinfo[2]) == false){//移動先にイなかったら
			rePlaceCell(x,y,tempAr[0],tempAr[1]);//セルの更新用　   //今の位置座標,先の座標
//				print("移動元情報" + nowGridinfo);
//				print("移動先情報" + futureGridinfo);
			return;//終わり
			}
			
			
			
			else if((futureGridinfo[2]) == true){//移動先にいたら
				
				if(futureGridinfo[5] == true){//移動先が合体してたら
					notMuchcheckCount += 1;
					return;//終わり
					}
					
				else if(futureGridinfo[5] == false){//移動先が合体してなかったら
				var MixNum = maltipcell.multip(nowGridinfo[3],futureGridinfo[3]);//合体  今の座標と移動量 合体値が帰ってクルだけ
				
					if(MixNum == null){//数値が一致して無かったら
					notMuchcheckCount += 1; 
					return;//終わり
					}
					
					
					else if (MixNum != null){//数字が一致してたら   合体開始
					para.comboNum +=1 ;//こんぼ開始
					
//					print("合算値" + MixNum);
					futureGridinfo[3] = MixNum;//合体値を代入 
					nowGridinfo[3] = 0;////合体値初期化
					
					
					
					futureGridinfo[2] = true;//移動先フラグ更新
					nowGridinfo[2] = false;//移動元フラグ更新
					
					futureGridinfo[5] = true;//既合体フラグON


					
					
//					motion.cellwallk(futureGridinfo[1],nowGridinfo[4],true);// pos,object アニメーション ,モーション用フラグ, 
					//ここで移動先のオブジェクトのテクスチャを更新
//					imgChange.relodeImg(futureGridinfo[4],futureGridinfo[3]);//オブジェクト　イメージチェンジ

					futureGridinfo[7] = nowGridinfo[4];//合体元のオブジェクトをアニメーション用に格納


					
					//ここで一旦全てを格納する配列にいれて　
					//そこでまとめてアニメーションして　配列削除する処理を入れないとダメかも
					
					
					para.addscore(MixNum,tempAr[0],tempAr[1]);//スコアの更新

										
					
					//バトルセルの合体
					btcell.fuseBtcell(x,y,tempAr[0],tempAr[1],MixNum);//今の位置座標,先の座標,合体地
					motion.attackAn(tempAr[0],tempAr[1]);//攻撃アニメーション

					//デバッグ用
					debugGuireflesh.reguiExt(MixNum,futureGridinfo);//デバッグ用
					//デバッグ用
					
					return;//終わり
					
					
					
					
					
					}
				}
			}

		}
	}
};







static var rePlaceCell = function(x:int,y:int,Fx:int,Fy:int){//移動先へのオブジェクトの代入
//print("きてる？");
var nowGridinfo:Array = (grid.tileListAr[x] as Array)[y];//今いるとこ
var futureGridinfo:Array = (grid.tileListAr[Fx] as Array)[Fy];//先




futureGridinfo[2] = true;//移動先フラグ更新
nowGridinfo[2] = false;//移動元フラグ更新
futureGridinfo[3] = nowGridinfo[3];//合体地の更新
nowGridinfo[3] = 0;//移動元合体値更新


//motion.cellwallk(futureGridinfo[1],nowGridinfo[4],false);// pos,object アニメーション



futureGridinfo[4] = nowGridinfo[4];//オブジェクト情報移動
nowGridinfo[4] = null;//初期化

futureGridinfo[5] = nowGridinfo[5];//既合体フラグ移動
futureGridinfo[8] = nowGridinfo[8];//point
nowGridinfo[8] = null;


//以下バトルセル
futureGridinfo[6] = nowGridinfo[6];


};


static var moveCell = function(){//移動とオブジェクトの削除

	//overLeft
	for(var olv:int =0; olv<grid.grdMaxNumY; olv++){//Y
		for(var olm:int =0; olm<grid.grdMaxNumX; olm++){//x
		
		var Gridinfo:Array = (grid.tileListAr[olm] as Array)[olv];//今いるところ
		var Flg:boolean;//
		var refleshObAr:Array;
		
		
		if(Gridinfo[7] != null){//合体用cell
		Flg = true;//
		refleshObAr = new Array(
		Gridinfo[3],//合体地
		Gridinfo[4],//オブジェクト
		Flg,//合体したよのフラグ
		null
		);//合体した後のオブジェクト変更用配列
		motion.cellwallk(Gridinfo[1],Gridinfo[7],Flg,refleshObAr);// pos,object アニメーション
		}
		
		if(Gridinfo[2]){//移動用
		Flg = false;//
		refleshObAr = new Array(
		Gridinfo[3],//合体地
		Gridinfo[4],//オブジェクト
		Flg,//合体したよのフラグ
		null
		);//合体した後のオブジェクト変更用配列
		motion.cellwallk(Gridinfo[1],Gridinfo[4],Flg,refleshObAr);// pos,object アニメーション
		}
			
		}//for end
	}//for end

};




/*
static var trueOnlyFirstTime = function() {//最初の一度だけtreuを返して　あとはfalse を返す
var check = (function():boolean {
    if (motionfirstCheck) {
      motionfirstCheck = false;
      return true;
    }
    return false;
  })();
  
    return check;
};



/*

移動列が全部埋まってたら　うごけない


もしくは移動列の数が　MAX-1（今回４子）　で　全部つながっており　なおかつフリック方向側に空きがなければNG　　（MAX-1で　どっちか橋があいてルパターン）
逆にMAX-1　でつながってても　フリック方向に空きがあればOK
MAX-1　でも　まン中に空きがある場合は　OK（MAX-1で　両端が埋まってるパターン）


上記の条件を確認した後
自分の隣にセルがあれば　移動不可　　なければ可能の条件の元

一旦オブジェクトの配列側に、移動先のグリッド情報を格納


完了したら
オブジェクト側のグリッド情報を元に、　グリッド管理している配列のtrue falseを更新


ここまでが移動処理


その前に合体処理を入れた方がいいかも

合体処理
↓
移動の順番



自分のグリッドの確認
行きたい方向にいるかどうか
又、行きたい方向のやつがこれからうごくかどうか
行きたい方向のやつがいたら、そいつが自分と同じかどうか


*/
