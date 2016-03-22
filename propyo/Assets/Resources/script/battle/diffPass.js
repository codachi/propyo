#pragma strict


static var FsPoint:Vector2;
static var EnPoint:Vector2;

static var excPM = function(pos:Vector2){//ポジションがマイナスだった場合＋にするだけ


//print("X" + pos.x+"Y" + pos.y);

var X:float = ((pos.x < 0) ? (pos.x*-1) : pos.x);
var Y:float = ((pos.y < 0) ? (pos.y*-1) : pos.y);
var posi:Vector2 = Vector2(X,Y);

//print("X" + X+"Y" +Y);

return posi;
};


static var xOry = function(){//XYどちらの移動量が多いか

/*移動後の方にマイナスかけてたす
結果がマイナスだったら　＋にして
比較
*/

var fsposx = FsPoint.x + (EnPoint.x *(-1));
var fsposy = FsPoint.y + (EnPoint.y *(-1));

var distance:Vector2 = Vector2(fsposx,fsposy);

//print("ディスタンス" + distance);

var jgPos:Vector2 = excPM(distance);//プラマイをなくす

//print("ポジション" + jgPos);


//Xだとfalse

	if(jgPos.x > jgPos.y){
	return false;
	}
	if(jgPos.x < jgPos.y){
	return true;
	}
	else{
	return null;
	}



};


static var NSEW = function(){

//print("視点" + FsPoint);
//print("終点" + EnPoint);


var XPM:boolean = ( (FsPoint.x > EnPoint.x)  ? true : false);//マイナスだったらtreu
var YPM:boolean = ((FsPoint.y > EnPoint.y) ? true : false);

//print("どっち？" + XPM +YPM);

var XY = xOry();//falseならX
var num:int;//上下左右を0123で判定用

if( FsPoint != EnPoint ){

	if(XY == true && YPM == true){
//	print("下");
	num = 0;
	return num;
	}
	else if(XY == true && YPM == false){//+X
//	print("上");
	num = 1;
	return num;
	}
	else if(XY == false && XPM == false){
//	print("右");
	num = 2;
	return num;
	}
	else if(XY == false && XPM == true){
//	print("左");
	num = 3;
	return num;
	}
	else{
	//print("あれ？");
	return null;
	}


}else{}

};