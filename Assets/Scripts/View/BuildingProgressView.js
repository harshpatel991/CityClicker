#pragma strict

var textTitle : SpriteText;
var progressBar : UIProgressBar;
var percentageText: SpriteText;

function setTextTitle(title: String) {
	textTitle.Text = title;
}

function setProgressBar(money: float, capacity: int) {
	progressBar.Value = money/capacity;
	percentageText.Text = Mathf.Floor(money) + "/" + capacity;
}

function hideProgressBar() {
	progressBar.gameObject.SetActive(false);
	percentageText.gameObject.SetActive(false);
}