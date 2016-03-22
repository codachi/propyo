#pragma strict


function Awake () {


}

function Update () {

	var Pos:Vector3 = this.transform.parent.gameObject.transform.position;//親をしてい
	var viewportPoint:Vector3 = Camera.main.WorldToViewportPoint(Pos);//GUItextのポジションを変換
	this.transform.position = viewportPoint;

}