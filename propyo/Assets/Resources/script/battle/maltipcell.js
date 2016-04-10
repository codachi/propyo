#pragma strict

// 合体
static var multip = function(now:int, future:int) {
    if (now == future) {
        // 数値だけ合体
        // おぶじぇくとはそのままで、移動時に削除
        return now * 2;  // 合体値を返す
    }
    return null;
};
