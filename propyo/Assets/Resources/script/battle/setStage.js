#pragma strict

static var BossOb:GameObject;


static var setBoss = function() {
    BossOb = Instantiate(Resources.Load("prehab/boss", GameObject));
};