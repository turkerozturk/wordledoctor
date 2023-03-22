<?php
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


$backend_server_url_file = 'backend_server_url.php';
require_once $backend_server_url_file;

$skip_to_sample_json_data = false;

if (!file_exists($backend_server_url_file)) {
  $skip_to_sample_json_data = true;
}

$permisyon = true;
if (isset($_SERVER['REMOTE_ADDR']) and ($_SERVER['REMOTE_ADDR'] !== $_SERVER['SERVER_ADDR'])) {
} else {
  $permisyon = true;
}

if ($permisyon) {
  $jsonDataAsString = file_get_contents('php://input');
  if (!$skip_to_sample_json_data) {
    $ch = curl_init();
    $headers  = [
      'x-api-key: XXXXXX',
      'Content-Type: application/json'
    ];
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HEADER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonDataAsString);
    $result_json_with_headers     = curl_exec($ch);
    $header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
    $headerstring = substr($result_json_with_headers, 0, $header_size);
    $result_json_without_headers = substr($result_json_with_headers, $header_size);
    $result = json_encode($result_json_without_headers);
    $statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    echo $result;
  } else {
    $exampleDataForTest = '{
  "words": [
    {
      "letters": [
        {
          "value": "Y",
          "renk": "GRAY"
        },
        {
          "value": "A",
          "renk": "GRAY"
        },
        {
          "value": "Z",
          "renk": "GRAY"
        },
        {
          "value": "I",
          "renk": "GRAY"
        },
        {
          "value": "T",
          "renk": "YELLOW"
        }
      ],
      "isValid": true,
      "wordAsString": "YAZIT"
    },
    {
      "letters": [
        {
          "value": "L",
          "renk": "GRAY"
        },
        {
          "value": "İ",
          "renk": "YELLOW"
        },
        {
          "value": "T",
          "renk": "YELLOW"
        },
        {
          "value": "R",
          "renk": "GRAY"
        },
        {
          "value": "E",
          "renk": "YELLOW"
        }
      ],
      "isValid": true,
      "wordAsString": "LİTRE"
    },
    {
      "letters": [
        {
          "value": "Ö",
          "renk": "GRAY"
        },
        {
          "value": "T",
          "renk": "YELLOW"
        },
        {
          "value": "E",
          "renk": "YELLOW"
        },
        {
          "value": "K",
          "renk": "GRAY"
        },
        {
          "value": "İ",
          "renk": "YELLOW"
        }
      ],
      "isValid": true,
      "wordAsString": "ÖTEKİ"
    },
    {
      "letters": [
        {
          "value": "T",
          "renk": "GREEN"
        },
        {
          "value": "E",
          "renk": "GREEN"
        },
        {
          "value": "M",
          "renk": "GRAY"
        },
        {
          "value": "İ",
          "renk": "GREEN"
        },
        {
          "value": "N",
          "renk": "GRAY"
        }
      ],
      "isValid": true,
      "wordAsString": "TEMİN"
    },
    {
      "letters": [
        {
          "value": "T",
          "renk": "GREEN"
        },
        {
          "value": "E",
          "renk": "GREEN"
        },
        {
          "value": "P",
          "renk": "GRAY"
        },
        {
          "value": "İ",
          "renk": "GREEN"
        },
        {
          "value": "Ş",
          "renk": "GRAY"
        }
      ],
      "isValid": true,
      "wordAsString": "TEPİŞ"
    }
  ],
  "language": "TR",
  "statusMessage": "LİTRE, ÖTEKİ, TEMİN, TEPİŞ,"
}';
    echo json_encode($exampleDataForTest); // TEST yapmak istersen bunu uncomment edip diger kodlari comment et.

  }
} else {
  header("Location: 403.html");
}
