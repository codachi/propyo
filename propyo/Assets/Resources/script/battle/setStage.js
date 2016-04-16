#pragma strict

static var boss:GameObject;


static var setBoss = function() {
    boss = Instantiate(Resources.Load("prehab/boss", GameObject));
};