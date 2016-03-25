#pragma strict


// デバッグテキストの更新
static var reguiExt = function(sum, contentAr:Array){
    // オブジェクトから子を取り出し
    var go:GameObject = contentAr[4] as GameObject
    var ob:GUIText = go.transform.Find("debugText(Clone)").gameObject.GetComponent.<GUIText>();

    // 合体値
    var sumtxt = sum.ToString();

    // print("テキスト" + sumtxt);
    // print("オブ" + ob);
    ob.text = sumtxt;
};
