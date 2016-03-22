#pragma strict


static var reguiExt = function(num,contentAr:Array){//デバッグテキストの更新
var ob:GUIText = (contentAr[4] as GameObject).transform.Find("debugText(Clone)").gameObject.GetComponent.<GUIText>();//オブジェクトから子を取り出し

var sumtxt = num.ToString();//合体地


//print("テキスト" + sumtxt);

//print("オブ" + ob);
ob.text = sumtxt;

};