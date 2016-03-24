#pragma strict


static var reguiExt = function(num, contentAr:Array) { // デバッグテキストの更新
    // オブジェクトから子を取り出し
    var ob:GUIText = (contentAr[4] as GameObject).transform.Find("debugText(Clone)").gameObject.GetComponent.<GUIText>();

    var sumtxt = num.ToString();  // 合体地

    // print("テキスト" + sumtxt);
    // print("オブ" + ob);
    ob.text = sumtxt;
};