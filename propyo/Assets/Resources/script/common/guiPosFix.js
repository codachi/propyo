#pragma strict


function Awake () {
}

function Update () {
    // 親を指定
    var Pos:Vector3 = this.transform.parent.gameObject.transform.position;
    // GUItextのポジションを変換
    var viewportPoint:Vector3 = Camera.main.WorldToViewportPoint(Pos);
    this.transform.position = viewportPoint;
}