// #pragma strict
#pragma downcast

// セルイメージスプライトの更新
static var relodeImg = function(tgob:GameObject,num:int){
	var uniSprite:Sprite;

	// スプライトシートから指定ナンバー取り出し、画像更新する
	switch (num) {
		case 4:
			uniSprite = Pcomm.cellSpriteHs[0]; 
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 6:
			uniSprite = Pcomm.cellSpriteHs[1];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 8:
			uniSprite = Pcomm.cellSpriteHs[2];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 16:
			uniSprite = Pcomm.cellSpriteHs[3];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 32:
			uniSprite = Pcomm.cellSpriteHs[4];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 64:
			uniSprite = Pcomm.cellSpriteHs[5];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 128:
			uniSprite = Pcomm.cellSpriteHs[6];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 256:
			uniSprite = Pcomm.cellSpriteHs[7];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 512:
			uniSprite = Pcomm.cellSpriteHs[8];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
		case 1024:
			uniSprite = Pcomm.cellSpriteHs[9];
			tgob.GetComponent(SpriteRenderer).sprite = uniSprite;
			break;
	}
};
