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
 
 
export class ColorHelper {    

    constructor() {
        this.gray = "#787C7E";
        this.green = "#6AAA64";
        this.yellow = "#C9B458";
        this.hexDigits = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
    }   
 
    rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
    }

    hex(x) {
        return isNaN(x) ? "00" : this.hexDigits[(x - x % 16) / 16] + this.hexDigits[x % 16];
    }

    state(rgb) {
        let result = "WHITE";
        if ($(rgb).hasClass("gray")) {
            result = "GRAY";					
        } else if ($(rgb).hasClass("green")) {
            result = "GREEN";					
        } else if ($(rgb).hasClass("yellow")) {
            result = "YELLOW";					
        }       
        return result;
    }


    static changeBoxColor(currentBox) {
		if ($(currentBox).hasClass("gray")) {
			$(currentBox).removeClass("gray");
			$(currentBox).addClass("green");
		} else if ($(currentBox).hasClass("green")) {
			$(currentBox).removeClass("green");
			$(currentBox).addClass("yellow");
		} else if ($(currentBox).hasClass("yellow")) {
			$(currentBox).removeClass("yellow");
			$(currentBox).addClass("gray");
		}
	}

    static changeEmptyWhiteBoxColorFromWhiteToGray(currentBox) {
		if ($(currentBox).hasClass("white")) {
			$(currentBox).removeClass("white");
			$(currentBox).addClass("gray");
		}
	}

}

