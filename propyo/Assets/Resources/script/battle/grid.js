#pragma strict


static var StageX:float;
static var StageY:float;
static var pixel:float = 1;         // 原寸用にするなら100×

static var grdMaxNumX:float = 5;    // グリッド数を指定
static var grdMaxNumY:float = 5;    // グリッド数を指定
static var gridAllNum:int;          // グリッド総数

static var tileSizeX:float;         // 一個のタイルサイズX
static var tileSizeY:float;         // 一個のタイルサイズY

static var stageDefPos:Vector3;     // ステージの初期位置
//static var tilDefPosHS:Hashtable; // グリッドの初期情報

static var tileListAr:Array = new Array();  // これで状態管理


// ステージサイズを画像から取得
static var getStageSize = function() {
    var size = Pcomm.stage.GetComponent(BoxCollider2D);
    StageX = size.size.x * pixel;
    StageY = size.size.y * pixel;
};

// ステージサイズからグリッドの生成
static var gridspawn = function() {
    var stageNowPos = Pcomm.stage.transform.position;
    stageDefPos = Vector3(stageNowPos.x - StageX / 2,
                          stageNowPos.y + StageY / 2,
                          0);
    gridAllNum = grdMaxNumX * grdMaxNumX;  // グリッド総数
    tileSizeX = StageX / grdMaxNumX;       // 一個のタイルサイズX
    tileSizeY = StageY / grdMaxNumY;       // 一個のタイルサイズY

    // tilDefPosHS = new Hashtable();
    // cellspawn.restTileHs = new Hashtable();
    // cellspawn.tilTmfPosAr = new Array();
    // print("ステージポジション" +  stageDefPos.x);

    var id:int = 0;
    for (var x:int = 0; x < grdMaxNumX; x++) {
        var tileListYAr:Array = new Array();
        tileListAr.push(tileListYAr);
        for (var y:int = 0; y < grdMaxNumY; y++) {
            var pos:Vector3 = Vector3(stageDefPos.x + tileSizeX * x,
                                      stageDefPos.y - tileSizeX * y,
                                      0);
            // グリッドNum ポジション 今上のいるかどうか 合体数値
            // [0]指定したグリッドのナンバリング名
            // [1]Vector3
            // [2]boolean グリッドにオブジェクトが載ってるか否か
            // [3]合体数値
            // [4]あればGameObject
            // [5]一度合体したかどうかboolean
            // [6]上画面バトル用の配列
            // [7]合体した場合のオブジェクト合体元のオブジェクト格納 
            // [8] point   hyouji you
            var gridAr:Array = new Array(
                id,
                pos,
                false,
                0,
                null,
                false,
                null,
                null,
                null
            );
            tileListYAr.push(gridAr);
            // // IDと各グリッド情報をかくのう
            // var name:String = (id).ToString();
            // tilDefPosHS.Add(name,gridAr);
            // // 更新用の配列に（配列ナンバー,ポジション,カウント格納）
            // cellspawn.tilTmfPosAr.push(gridAr);
            id += 1;
        }
    }
    // print("タイルリスト" + (tileListAr[2] as Array) [2] );
    // print(tileListAr[0]);
};