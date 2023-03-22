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
 
 
"use strict";

export class Lang {    

	keyboardsFolder = "frontend/this/index/html/";

    static alphabetTR = "ABCÇDEFGĞHIİJKLMNOÖPRSŞTUÜVYZ";
	static alphabetEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	static alphabetDE = "ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß";
	static alphabetIT = "AÀBCDEÉÈFGHIÌJKLMNOÓÒPQRSTUÙVWXYZ";
	static alphabetES = "AÁBCDEÉFGHIÍJKLMNÑOÓPQRSTUÚÜVWXYZ";

	static map; 

	loadMap() {
		this.map = new Map();
		this.map.set("TR", "tr-TR");
		this.map.set("EN", "en-EN");
		this.map.set("DE", "de-De");
		this.map.set("ES", "es-ES");
		this.map.set("IT", "it-IT");
	}

    constructor() {
		this.loadMap();
        this.language = window.localStorage.getItem("language");
        if (this.language == null) {
            this.language = "EN";    
			this.updateLanguage(this.language);
        } else {
        	this.updateLanguage(this.language);
		}
    }

	updateLanguage(language) {
		this.cleanWordleBoard();
        this.language = language;
		
		if (this.language == "TR") {
			this.alphabet = Lang.alphabetTR;
			$('#language').text("Türkçe");
		} else if (this.language == "DE") {
			this.alphabet = Lang.alphabetDE;
			$('#language').text("Deutsch");
		} else if (this.language == "ES") {
			this.alphabet = Lang.alphabetES;
			$('#language').text("Spanish");
		} else if (this.language == "IT") {
			this.alphabet = Lang.alphabetIT;
			$('#language').text("Italian");
		} else {
			this.alphabet = Lang.alphabetEN;
			$('#language').text("English");
		}

        window.localStorage.setItem("language", this.language);
        window.localStorage.setItem("alphabet", this.alphabet);
        this.loadKeyboard(`${this.keyboardsFolder}_virtual_keyboard_${this.language.toLowerCase()}.html`);
		$('input[name=radioName]:checked', '#myForm').removeAttr('checked');
		$("input[name=radioName][value=" + this.language + "]").prop('checked', true);
	}
    
	cleanWordleBoard() {
		$('.tile').each(function (letterIndex, letterElement) {
			$(letterElement).attr('class', 'tile white');
			$(letterElement).text('');
		});
	}

    loadKeyboard(virtualKeyboardUrl) {
		$.ajax({
			url: virtualKeyboardUrl,
			dataType: "html",
			success: function (data) {
				$("#visualkeyboard").html(data);
			}
		});
	}

}