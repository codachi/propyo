// #pragma strict
#pragma downcast

static var bossPos:Vector3;
var groundlayer:LayerMask;
var grounded:boolean;


function Update() {
    // 自分のポジション
    bossPos = this.gameObject.transform.position;

    // 衝突判定
    // http://blog.cshool.jp/2013/12/5217.html
    // http://blog.cshool.jp/2013/12/5219.html
    grounded = Physics2D.Linecast(
        transform.position + transform.up * 1,
        transform.position - transform.up * 2,
        groundlayer);

    // print("状態" + grounded);
    // print("ポジ" + transform.localPosition +
    //       "始点" + (transform.position + transform.up * 1) +
    //       "終点" + (transform.position - transform.up * 100));

    // poscont();  // ポジション修正
}


// なんかのコリジョンに当たると勝手に呼ばれる
function OnCollisionEnter2D(col:Collision2D) {
    // print("名前" + col.gameObject.name);
    if (grounded == true) {
        jump();
    }
    // if (col.gameObject.name != "floa") {
    //     // ぶつかったら切ってみる
    //     rigidbody2D.isKinematic = true;
    // }
}


function jump() {
    // print("ジャンプ");
    GetComponent.<Rigidbody2D>().AddForce(Vector3.up * 200);  // 重さを20倍にする
}


// itween用こんぷりト
function tgob(param) {
}


// function poscont() {
//     if(bossPos.x > 2) {
//         iTween.MoveTo(this.gameObject, {
//             "time": 0.3,
//             "x": 1.928791,
//             "easetype": iTween.EaseType.easeOutBounce,
//             "onComplete": 'comphandler',
//             "onCompletetarget": this.gameObject,
//             "oncompleteparams": 'param'
//         });
//     }
// }
