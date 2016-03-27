#pragma strict


function comphandler (refAr: Array) {
    // [0]      合体地
    // [1]      オブジェクト
    // [2]Flg   合体したよのフラグ

    // print("こんぷりートハンドラ" + refAr[2] );

    if (refAr[2]) {
        motion.cellBig(this.gameObject , refAr);
        // Destroy(this.gameObject);
    }
    // print("中身" + refAr[3]);
    if (refAr[3] != null) {
        print("ぬるじゃない");
        var meth:Function = refAr[3] as Function;
        meth(this.gameObject);
    }
}
