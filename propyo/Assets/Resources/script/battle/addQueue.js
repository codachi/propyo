#pragma strict

// キューを追加するだけのクラス
class addQueue extends MonoBehaviour {
    function AddCue(cue:Function) {
        var Cue:Function = cue;
        main.ActionCueAr.Push(Cue);
    }
}
