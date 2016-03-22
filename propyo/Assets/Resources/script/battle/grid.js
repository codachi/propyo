#pragma strict


static var StageX:float;
static var StageY:float;
static var pixel:float = 1;//原寸用にするなら100×

static var grdMaxNumX:float = 5;//グリッド数を指定
static var grdMaxNumY:float = 5;//グリッド数を指定
static var gridAllNum:int;//グリッド総数


static var tileSizeX:float;//一個のタイルサイズX
static var tileSizeY:float;//一個のタイルサイズY

static var stageDefPos:Vector3;//ステージの初期位置
//static var tilDefPosHS:Hashtable;//グリッドの初期情報

static var tileListAr:Array = new Array();//これで状態管理



static var getStageSize = function(){//ステージサイズを画像から取得
var size = Pcomm.stage.GetComponent(BoxCollider2D);//サイズ取得
StageX = size.size.x * pixel;
StageY = size.size.y * pixel;
};

static var gridspawn = function(){//ステージサイズからグリッドの生成

gridAllNum = grdMaxNumX*grdMaxNumX; //グリッド総数

var stageNowPos = Pcomm.stage.transform.position;
stageDefPos = Vector3( stageNowPos.x - (StageX/2)  , stageNowPos.y + (StageY/2) , 0 );


tileSizeX = StageX / grdMaxNumX;//一個のタイルサイズX
tileSizeY = StageY / grdMaxNumY;//一個のタイルサイズY


//tilDefPosHS = new Hashtable();//実体化
//cellspawn.restTileHs = new Hashtable();//実体化



var cou:int = 0;
//cellspawn.tilTmfPosAr = new Array();

//print("ステージポジション" +  stageDefPos.x);

	for (var i:int=0; i<grdMaxNumX; i++){//グリッドテーブル
		
		var tileListYAr:Array = new Array();
		tileListAr.push(tileListYAr);//X軸に相当する
		
		for (var m:int=0; m<grdMaxNumY; m++){
		var pos:Vector3 = Vector3(stageDefPos.x + (tileSizeX*i), stageDefPos.y - (tileSizeX*m) , 0);
		
		var name:String = (cou).ToString();

		var gridAr:Array = new Array(
		cou,
		pos,
		false,
		0,
		null,
		false,
		null,
		null,
		null
		);//グリッドNum　ポジション　今上のいるかどうか 合体数値
		/*
		[0]指定したグリッドのナンバリング名
		[1]Vector3
		[2]boolean グリッドにオブジェクトが載ってるか否か
		[3]合体数値
		[4]あればGameObject
		[5]一度合体したかどうかboolean
		[6]上画面バトル用の配列
		[7]合体した場合のオブジェクト合体元のオブジェクト格納 
		[8] point   hyouji you
		*/
		
		tileListYAr.push(gridAr);//Y軸に相当する
		
//		tilDefPosHS.Add(name,gridAr);//IDと各グリッド情報をかくのう
//		cellspawn.tilTmfPosAr.push(gridAr);//更新用の配列に（配列ナンバー,ポジション,カウント格納）


		cou += 1;
		
		}
	
		
	}
//	print("タイルリスト" + (tileListAr[2] as Array) [2] );
	
//var n = tileListAr[0];
////print(n);

};