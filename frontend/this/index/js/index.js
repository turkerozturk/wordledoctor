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
 
 
import {Navigation} from './navigation.js'
"use strict";

$(document).ready(function () {

	toastr.options.closeButton = true;
	toastr.options.positionClass = "toast-bottom-full-width";

	var navigation = new Navigation();

	$('#myForm input').on('change', function () {
		let language = $('input[name=radioName]:checked', '#myForm').val();
		navigation.newWordleBoard(language);
	});

	$(document).keydown(function (event) {
		navigation.setKeydown(event);
	});

	$(document).on("click", '.tus', function (event) {
		navigation.setVirtualKeyClick(event);
	});

	$('.tile').on("click", function (event) {
		navigation.setTileOnClick(event);
	});

});


