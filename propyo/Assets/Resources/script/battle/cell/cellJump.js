// #pragma strict
#pragma downcast

var groundlayer:LayerMask;
var grounded:boolean;
var forOrBackFlg:boolean;  // 切り替えで行ったり来たり


function Update() {
    // 衝突判定
    // http://blog.cshool.jp/2013/12/5217.html
    // http://blog.cshool.jp/2013/12/5219.html
    grounded = Physics2D.Linecast(
        transform.position + transform.up * 1,
        transform.position - transform.up * 1,
        groundlayer);

    // print("状態" + grounded);
    // print("ポジ" + transform.localPosition +
    //       "始点" + (transform.position - transform.up * 1) +
    //       "終点" + (transform.position - transform.up * 0.1));
}


// なんかのコリジョンに当たると勝手に呼ばれる
function OnCollisionEnter2D(col:Collision2D) {
    // print("名前" + col.gameObject.name);
    if (grounded == true) {
        jump();
    }
}


function jump() {
    // print("ジャンプ");
    var vector : Vector3 = Vector3.up * 200
    if (forOrBackFlg) {
        vector += Vector3.left * 50;
    } else {
        vector += Vector3.right * 50;
    }
    GetComponent.<Rigidbody2D>().AddForce(vector);
    forOrBackFlg = !forOrBackFlg;
}
