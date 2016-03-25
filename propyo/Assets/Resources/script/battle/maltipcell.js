#pragma strict

static var oneceMixFlg:boolean;//一回合体したかどうか

//static var mixCell = function(){
//var flickCheck = diffPass.NSEW();
//
//print("フリックチェック" + flickCheck);
//
////var Obnum = Pcomm.cellObAr.length;//生成されたオブジェクトの配列
//
//var arrNum:Array = check.oneOr();//フリック上下左右判定して　方向と移動数数を返す
//
//print("オブジェクト一覧" + Pcomm.cellObAr);
//
//	if(flickCheck != null){//フリック方向があれば
//
//		if( (flickCheck == 1) || (flickCheck == 3)){//左か上 0,0からなめる
//		print("はじめからなめるよ");
//			for(var oli:int =0; oli<grid.grdMaxNumX; oli++){//X
//				for(var oln:int =0; oln<grid.grdMaxNumY; oln++){////Y
//
//				if(oneceMixFlg == true){//前のセルで一度合体してたらスキップ 
//				print("よばれてる？");
//				oneceMixFlg = false;//初期化
//				continue;//ループを一度だけぬける
//				}		
//				else if(oneceMixFlg == false){//falseなら実行
//				multip(oli,oln,arrNum);
//				}
//
//
//				/*
//				[0]指定したグリッドのナンバリング名
//				[1]Vector3
//				[2]boolean
//				[3]合体数値
//				[4]あればGameObject
//				*/
//				}//for end
//			}//for end
//		}//左右ENDORSE
//		
//		else if( (flickCheck == 0) || (flickCheck == 2)){//右か下 最後からなめる
//		print("さいごからなめるよ");
//			for(var uri:int = (grid.grdMaxNumX - 1); uri>=0; uri--){//X
//			
//				for(var urn:int = (grid.grdMaxNumY - 1); urn>=0; urn--){//X;
//					if(oneceMixFlg == true){//前のセルで一度合体してたらスキップ 
//					oneceMixFlg = false;//初期化
//					continue;//ループを一度だけぬける
//					}				
//					else if(oneceMixFlg == false){//falseなら実行
//					multip(uri,urn,arrNum);
//					}
//				
//				/*
//				[0]指定したグリッドのナンバリング名
//				[1]Vector3
//				[2]boolean
//				[3]合体数値
//				[4]あればGameObject
//				*/
//				}//for end
//			}//for end
//		}//左右ENDORSE
//	}
//	
//	check.checkLine();//セルの埋まり状況チェク格納用
//};


//
//static var multip = function(i,n,arrNum:Array){//合体
//var nowGridinfo:Array = (grid.tileListAr[i] as Array)[n];
////print("インフォ" + nowGridinfo);
//
//	if(nowGridinfo[2] == true){//自分がいたら
//	var moveTgCelInfoAr = check.checkEmpty(i,n,arrNum[0],arrNum[1]); //X Y フリック方向 移動数値
//	/*
//	[0]x
//	[1]y
//	[2]Vector3
//	[3]boolean
//	*/
//		if(moveTgCelInfoAr != null){//端じゃなかったら
//		var tempAr:Array = moveTgCelInfoAr;//キャスト
//		var futureGridinfo:Array = (grid.tileListAr[tempAr[0]] as Array)[tempAr[1]];
//		print("行き先" + futureGridinfo);
//		
//			if(futureGridinfo[2] == true && ( nowGridinfo[3] == futureGridinfo[3]) ){//行き先にいて数字が同じなら
//			//オグジェクト数値を更新して
//			var nowCellNum:int = nowGridinfo[3];
//			var futureCellNum:int = futureGridinfo[3];
//			
//			futureGridinfo[3] =  nowCellNum * futureCellNum ;//数値だけ合体　//おぶじぇくとはそのままで、移動時に削除
//			
//			nowGridinfo[3] = 0;//初期化
//			nowGridinfo[2]= false;//初期化
//			
//			oneceMixFlg = true;//一度合体したフラグ　次のセルチェックをスキップ用
//			
//			//print("合体した がったい元" + i + n + "合体先" + moveTgCelInfoAr[0] + moveTgCelInfoAr[1]);
//			}
//		}
//	
//	}
//
//};

// 合体
static var multip = function(now:int, future:int) {
    if (now == future) {
        // 数値だけ合体
        // おぶじぇくとはそのままで、移動時に削除
        return now * 2;  // 合体値を返す
    }
    return null;
};
