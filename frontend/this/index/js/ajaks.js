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
export class Ajaks {

	constructor(language) {
		this.basari = false;
		this.language = language;
	}

	send() {
		var objWordleBoard = {
			language,
			words: []
		};

		objWordleBoard.language = this.language;

		$("#tile-board .row").each(function (rowIndex, rowElement) {

			var s = "";
			var c = "";
			var objRow = {
				letters: []
			};

			$('.tile', this).each(function (letterIndex, letterElement) {
				var tileLetter = $(letterElement).text();
				let colorHelper = new ColorHelper;
				var tileColor = colorHelper.state($(letterElement));
				var objLetter = {
					value: tileLetter,
					renk: tileColor
				};
				objRow.letters.push(objLetter);
			});			

			objWordleBoard.words.push(objRow);
		});
		var clientData = JSON.stringify(objWordleBoard, null, 2);
		this.sendJSONToPHPonSameDomain(clientData);
	}

	sendJSONToPHPonSameDomain(clientData) {
		var serverUrl = 'backend/agent.php';
		return $.ajax({
			url: serverUrl,
			type: "POST",
			data: clientData,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			crossDomain: true,
			error: {
				function() {
					toastr.info('AJAX metodunda Hata olustu!');
				}
			},
		}).done(function (data, statusText, xhr) {
			var status = xhr.status;                //200
			var head = xhr.getAllResponseHeaders();
			var obj = JSON.parse(data);
			$('.resultPlaceHolder .result').text(obj.statusMessage);
			if (status == 200) {
			}
		});
	}

	isBasarili() {
		return this.basari;
	}

}