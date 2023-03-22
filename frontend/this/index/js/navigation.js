/***********************************************************************
 * Copyright 2023 Turker Ozturk
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ***********************************************************************/

 
import {ColorHelper} from './color_helper.js'
import {Lang} from './lang.js'
import {Ajaks} from './ajaks.js'
"use strict";

export class Navigation {

	constructor() {
		this.lang = new Lang();
		this.resetCursorPositions();
	}

	resetCursorPositions() {
		this.currentRow = $('div#tile-board div.row').first();
		this.currentBox = $('div#tile-board div.row div.tile').first();
		this.currentRowIndex = $(this.currentRow).index();
		this.currentBoxIndex = $(this.currentBox).index();

		this.previousRow = $(this.currentRow);
		this.previousBox = $(this.currentBox);
		this.changeActiveRow(this.currentRowIndex);
		this.changeActiveBox(this.currentBoxIndex);
		this.sameClickCount = 0;
	}

	changeActiveBox(boxIndex) {
		$(this.previousBox).removeClass("blinkbox");
		this.currentBox = $(this.currentRow).children().get(boxIndex);
		$(this.currentBox).addClass("blinkbox");
	}

	changeActiveRow(rowIndex) {
		this.currentRow = $(this.currentRow).parent().children().get(rowIndex);
	}

	newWordleBoard(language) {
		this.lang.updateLanguage(language);
		this.resetCursorPositions();
	}

	gonder() {		
		let ajaks = new Ajaks(this.lang.language);
		ajaks.send();
		console.log("durum " + this.lang.language);
	}

	tusLeft() {
		var oldIndex = $(this.currentBox).index();
		this.newIndex = $(this.currentBox).prev('.tile').index();
		this.previousBox = this.currentBox;
		this.currentBox = $(this.currentBox).prev('.tile');
	}

	tusRight() {
		this.previousBox = this.currentBox;
		this.currentBox = $(this.currentBox).next('.tile');
		let newIndex = $(this.currentBox).index();
		this.changeActiveBox(newIndex);
	}

	tusUp() {
		let boxIndex = $(this.currentBox).index();
		this.changeActiveBox(boxIndex);
		this.previousBox = this.currentBox;
		this.previousRow = $(this.currentRow);
		this.currentRow = $(this.previousRow).prev('div');
		this.currentBox = $(this.currentRow).children().get(boxIndex);
		this.changeActiveBox(boxIndex);
	}

	tusDown() {
		let boxIndex = $(this.currentBox).index();
		this.changeActiveBox(boxIndex);
		this.previousBox = this.currentBox;
		this.previousRow = $(this.currentRow);
		this.currentRow = $(this.previousRow).next('div');
		this.currentBox = $(this.currentRow).children().get(boxIndex);
		this.changeActiveBox(boxIndex);
	}

	tusEnter() {
		let boxIndex = $(this.currentBox).index();
		this.changeActiveBox(boxIndex);
		boxIndex = 0;
		this.previousBox = this.currentBox;
		this.previousRow = $(this.currentRow);
		this.currentRow = $(this.previousRow).next('div');
		this.currentBox = $(this.currentRow).children().get(boxIndex);
		this.changeActiveBox(boxIndex);
	}

	carriageReturnNewLine() {
		this.changeActiveBox(0);
		this.tusDown();
		this.changeActiveBox(0);
	}

	tusBackspace() {
		var oldIndex = $(this.currentBox).index();
		var newIndex = $(this.currentBox).prev('.tile').index();
		$(this.currentBox).text("");
		$(this.currentBox).removeClass("green yellow gray blinkbox").addClass("white");
		this.previousBox = $(this.currentBox);
		if (newIndex != -1) {
			this.currentBox = $(this.currentBox).prev('.tile');
		} else {
		}
		$(this.currentBox).addClass("blinkbox");
	}

	tusDelete() {
		this.tusBackspace();
	}

	tusSpaceBar() {
		ColorHelper.changeBoxColor(this.currentBox);
	}

	getNewIndex() {
		return this.newIndex;
	}

	setKeydown(event) {
		this.currentRowIndex = $(this.currentRow).index();
		this.currentBoxIndex = $(this.currentBox).index();
		switch (event.keyCode) {
			case 46: // Delete
				this.tusDelete();
				break;
			case 8: // Backspace
				this.tusBackspace();
				break;
			case 13: // Enter
				if (this.currentRowIndex < 5 && this.currentRowIndex != -1 && this.isRowFull()) {
					this.gonder();
					this.tusEnter();
				}
				break;
			case 38: //Up
				if (this.currentRowIndex > 0 && this.currentRowIndex != -1) {
					this.tusUp();
				} else {
					event.preventDefault();
				}
				break;
			case 40: //Down
				if (this.currentRowIndex < 5 && this.currentRowIndex != -1 && this.isRowFull()) {
					this.tusDown();
				} else {
					event.preventDefault();
				}
				break;
			case 39: //Right
				if (this.currentBoxIndex < 4 && this.currentBoxIndex != -1) {
					this.tusRight();
				} else {
					event.preventDefault();
				}
				break;
			case 37: //Left			
				if (this.currentBoxIndex > 0 && this.currentBoxIndex != -1) {
					this.tusLeft();
					this.changeActiveBox(this.getNewIndex());
				} else {
					event.preventDefault();
				}
				break;
			case 32: //SPACEBAR
				this.tusSpaceBar();
				break;
			default:
				let rawHarf = event.key;
				if (this.harfBas(rawHarf)) {
					if (this.currentBoxIndex < 4 && this.currentBoxIndex != -1) {
						this.tusRight();
					}
				} else {
					event.preventDefault();
				};
		}
	}

	harfBas(rawHarf) {
		let isBasarili = false;
		let pressedPrintableKey = "";
		let language = window.localStorage.getItem("language");
	
		pressedPrintableKey = rawHarf.toLocaleUpperCase(this.lang.map.get(language));

		let alphabet = window.localStorage.getItem("alphabet");
		if (alphabet.indexOf(pressedPrintableKey) !== -1) {
			this.tusBasildi(pressedPrintableKey);
			this.currentRowIndex = $(this.currentRow).index();
			this.currentBoxIndex = $(this.currentBox).index();
			isBasarili = true;
		}
		return isBasarili;
	}

	setVirtualKeyClick(event) {

		let pressedButtonValue = $(event.target).attr("value");

		if (pressedButtonValue === "BACKSPACE") {
			this.tusBackspace();
		} else if (pressedButtonValue === "DELETE") {
			this.tusBackspace();
		} else if (pressedButtonValue === "ENTER") {
			if (this.currentRowIndex < 5 && this.currentRowIndex != -1 && this.isRowFull()) {
				this.gonder();
				this.tusEnter();
			}
		} else if (pressedButtonValue === "SPACEBAR") {
			ColorHelper.changeBoxColor(this.currentBox);
		} else if (pressedButtonValue === "UP") {
			if (rowIndex > 0 && rowIndex != -1) {
				this.tusUp();
			} else {
				event.preventDefault();
			}
		} else if (pressedButtonValue === "DOWN") {
			if (rowIndex < 5 && rowIndex != -1) {
				this.tusDown();
			} else {
				event.preventDefault();
			}
		} else if (pressedButtonValue === "LEFT") {
			if (boxIndex > 0 && boxIndex != -1) {
				this.tusLeft();
				this.changeActiveBox(this.getNewIndex());
			} else {
				event.preventDefault();
			}
		} else if (pressedButtonValue === "RIGHT") {
			if (boxIndex < 4 && boxIndex != -1) {
				this.tusRight();
			} else {
				event.preventDefault();
			}
		} else {
			let rawHarf = pressedButtonValue;
			if (this.harfBas(rawHarf)) {
				if (this.currentBoxIndex < 4 && this.currentBoxIndex != -1) {
					this.tusRight();
				}
			} else {
				event.preventDefault();
			};
		}
	}

	setTileOnClick(event) {
		$(this.previousBox).removeClass("blinkbox");
		this.previousRow = this.currentRow;
		this.previousBox = this.currentBox;
		let clickedBox = $(event.delegateTarget); 
		this.currentBox = clickedBox;
		this.currentRow = clickedBox.parent('div');
		if ($(this.previousRow).index() == $(this.currentRow).index() && $(this.previousBox).index() == $(this.currentBox).index()) {
			this.tusSpaceBar();
		}
		this.changeActiveBox($(this.currentBox).index());
	}

	tusBasildi(pressedPrintableKey) {
		ColorHelper.changeEmptyWhiteBoxColorFromWhiteToGray(this.currentBox);
		$(this.currentBox).text(pressedPrintableKey);
	}

	findRightMostFilledBoxIndex() {
		let counter = 0;
		$('.tile', this.currentRow).each(function () {
			if ($(this).text() == '') {

			} else {
				counter++;
			}
		});
		return counter;
	}

	isRowFull() {
		let status = true;
		let counter = 0;
		$('.tile', this.currentRow).each(function () {

			if ($(this).text() == '') {
				status = false;
			} else {
				counter++;
			}
		});
		return status;
	}

	showInfo() {
		toastr.info("active row" + $(this.currentRow).index() + ", box " + $(this.currentBox).index() + ", " +
			"previous row" + $(this.previousRow).index() + ", box " + $(this.previousBox).index()
		);
	}

	printStatus(description) {
		let message = `${description}: cr ${$(this.currentRow).index()} cb ${$(this.currentBox).index()} pr ${$(this.previousRow).index()} pb ${$(this.previousBox).index()}`;
		console.log(message);
	}

}