//#pragma strict
#pragma downcast

// 力を加える方法
// 行きたい座標をワールドポイントに変換
// 目的座標 - オブジェクト位置でベクトルの長さを求めて、Vector3.Normalize()で長さを正規化します
// それを代入

// 攻撃あにめーしょん
static var attackAn = function(futX, futY) {
    var futureAr:Array = (grid.tileListAr[futX] as Array) [futY];
    var futureArinfo:Array = futureAr[6];
    var transform:Transform = (futureArinfo[0] as GameObject).transform;

    var boss_position:Vector3 = setStage.boss.gameObject.transform.position;
    var distance:Vector3 = Vector3.Normalize(boss_position - transform.position);
    transform.GetComponent.<Rigidbody2D>().AddForce(distance.up * 200 + distance.right * 200);

    // print("なにこ" + futureArinfo[0]);
    // transform.rigidbody2D.AddForce(Vector3.up * 200 + Vector3.right * 200);
};


// パズルセルの移動
static var cellwallk = function(pos:Vector3, tgob:GameObject, flag, refAr:Array) {
    var zRote:float;
    var arrow = diffPass.NSEW();
    switch(arrow) {
        case 0: zRote = 0;   break;  // 下
        case 1: zRote = 0;   break;  // 上
        case 2: zRote = -20; break;  // 右
        case 3: zRote = 20;  break;  // 左
    };

    // 回転
    iTween.RotateTo(tgob, {
        "time": 0.1,
        "z": zRote,
        "easetype": iTween.EaseType.easeOutBounce,
        "onComplete": 'comphandler',
        "onCompletetarget": tgob,
        "oncompleteparams": refAr
    });

    // Time.timeScale=0.1;  // スロー
     // print("これからグ動くフラグ" + flag);
    iTween.MoveTo(tgob, {
        "time": 0.3,
        "position": pos,
        "easetype": iTween.EaseType.easeOutBounce,
        "onComplete": 'comphandler',
        "onCompletetarget": tgob,
        "oncompleteparams": refAr
    });
};


// 合体した時一瞬大きくなるアニメーション
static var cellBig = function (tgob:GameObject, refAr:Array) {
    // [0]      // 合体地
    // [1]      // オブジェクト
    // [2]Flg   // 合体したよのフラグ
    print("セルビッグまできた" + refAr[2] + tgob);

    if (refAr[2]) {
        var pos:Vector3 = refAr[1].transform.position;
        imgChange.relodeImg(refAr[1], refAr[0]);

        var DelOB:Function = motion.DestroyOb;
        var comAr:Array = new Array(null, null, false, DelOB);

        iTween.ScaleTo(tgob, {
            "time": 0.3,
            "y": 2,
            "x": 2,
            "easetype": iTween.EaseType.easeOutBounce,
            "onComplete": 'comphandler',
            "onCompletetarget": tgob,
            "oncompleteparams": comAr
        });
    }
};


static var DestroyOb = function(tgob) {
    print("よばれてる？");
    Destroy(tgob);
};


static var gravityCont = function() {
    for (var x:int = 0; x < grid.grdMaxNumX; x++) {
        for (var y:int = 0; y < grid.grdMaxNumY; y++) {
            var tgAr:Array = (grid.tileListAr[x] as Array)[y];
            var game_object:GameObject = tgAr[4] as GameObject;
            game_object.GetComponent(Rigidbody2D).isKinematic = false;  // 重力ON
        }
    }
};
