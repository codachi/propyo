//#pragma strict
#pragma downcast

static var relodeImg = function(tgob:GameObject,num:int){//セルイメージスプライトの更新
	var uniSprite:Sprite;
		
		switch(num){
		
		case(4):
		uniSprite = Pcomm.cellSpriteHs[0]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(6):
		uniSprite = Pcomm.cellSpriteHs[1]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(8):
		uniSprite = Pcomm.cellSpriteHs[2]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(16):
		uniSprite = Pcomm.cellSpriteHs[3]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(32):
		uniSprite = Pcomm.cellSpriteHs[4]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(64):
		uniSprite = Pcomm.cellSpriteHs[5]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(128):
		uniSprite = Pcomm.cellSpriteHs[6]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(256):
		uniSprite = Pcomm.cellSpriteHs[7]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(512):
		uniSprite = Pcomm.cellSpriteHs[8]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		case(1024):
		uniSprite = Pcomm.cellSpriteHs[9]; //スプライトシートから指定ナンバー取り出し
		tgob.GetComponent(SpriteRenderer).sprite = uniSprite;//画像更新
		break;
		
		}
};
