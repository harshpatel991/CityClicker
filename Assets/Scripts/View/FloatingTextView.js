#pragma strict

var text: SpriteText;

function setValue (value: int) {
	text.Text = "+" + value;
}

function OnSpawned() {
	this.gameObject.transform.rotation.eulerAngles = Vector3(45, 45, 0);
	iTween.MoveBy(this.gameObject, iTween.Hash("y", 4,
												"time", .5,
												"oncomplete", "despawnFloatingText"));
	iTween.ColorTo(this.gameObject, iTween.Hash("name", "fadeColor", 
												"Color",  Color(255, 255, 255, 0), 
												"time", .5));
}

function despawnFloatingText() {
	iTween.StopByName(this.gameObject, "fadeColor");     

	this.gameObject.renderer.material.color = Color.white;
	PoolManager.Pools["AIPool"].Despawn(this.gameObject.transform);
}