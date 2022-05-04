$(document).ready(function() {

    //XML as a string
    var saveText, file, xmlDoc, $xml, $item;
    var bundles = [];

    //when file is uploaded, do XYZ
    $("#saveFile").change(function() {
        file = document.getElementById("saveFile").files[0];
        const reader = new FileReader();

        if (file) {
            reader.readAsText(file);
            console.log("reading save file");
        }

        reader.addEventListener("load", () => {
            // this will then display a text file
            $("#isUploaded").text("XML Uploaded");
            saveText = reader.result;
            console.log("loading save file");

            //prepares jquery XML doc
            xmlDoc = $.parseXML(saveText);
            $xml = $(xmlDoc);

            fillArray();
            showResult();
          }, false);

      });

      //cuts down XML to only important info and then saves it to array
      function fillArray() {
        //saves bundle info into 2D array
            var i = 1;
            while (i <= 31) {
                //finds first child of the bundle/item pair (includes key and boolean array)
                var temp1 = "bundles>item:nth-child(" + i + ")";
                $item = $xml.find(temp1);

                //saves what was found as a string
                var temp2 = $item.text().trim();

                //saves the boolean array to bundle array at key#
                var num1 = parseInt(temp2.slice(0, 2).trim());
                temp2 = temp2.slice(2).trim();
                bundles[num1] = temp2;

                //print
                //console.log(num1);
                //console.log(bundles[num1]);
                i++;
            }
        }

        //fills out the HTML elements (currently hidden) with progress info for a section
        function checkCompletion(i) {
            //creates the necessary ids based on number passed in
            var ids = ["#" + i, "#" + i + "img", "#" + i + "com", "#" + i + "items"];

            //if the bundle is not complete, false will be somewhere in the string
            if (bundles[i].includes("false")) {
                console.log("contains false");

                //counts how many trues are in the string of falses
                var lastItem = (bundles[i].replace(/[^t]/g, "").length);
                
                //changes to bundle incomplete for the message
                $(ids[2]).text("Bundle Incomplete");

                //hides already collected items (from counting the trues)
                if (lastItem > 0) {
                    for (var x = 0; x <= lastItem; x++) {
                        var tempid = ids[3] + ">a:nth-child(" + x + ")";
                        $(tempid).css("display", "none");
                    }
                }

            //if there are no falses    
            } else {
                console.log("contains true");

                //changes to bunclde complete for the message
                $(ids[2]).text("Complete");
                $(ids[3]).css("display", "none");
            }

        }

        function showResult() {
            for (var x = 0; x <= 36; x++) {
                if (bundles[x] == undefined) {
                    continue;
                } else {
                    checkCompletion(x);
                }
            }
            $("#result").css("display", "block");
        }


    
})