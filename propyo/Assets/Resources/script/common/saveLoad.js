#pragma strict


static var save = function() {
    PlayerPrefs.SetInt("BestScore",para.bestScore);     // ベストスコア登録
};


static var load = function() {
    para.bestScore = PlayerPrefs.GetInt("BestScore");   // ベストスコア読み込み
};
