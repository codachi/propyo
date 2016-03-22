#pragma strict

class addQueue extends MonoBehaviour {//キューを追加するだけのクラス

function AddCue(cue:Function){
var Cue:Function = cue;
main.ActionCueAr.Push(Cue);

}

}