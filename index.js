        /*
         * Initialize project list and push default project templates
         */
            resized();
        var projectList = [];
        var savedProjects = JSON.parse(localStorage.getItem("savedProjects") || "[]");

        projectList.push({'name':"vvvvempty", 'html':"<!--Enter code here-->\r", 'css': "/*Enter code here*/\r", 'js':"//Enter code here\r"});
        projectList.push({'name':"vvvvshell", 'html':"<!DOCTYPE html>\r<html>\r\
    <head>\r\
        <link rel='stylesheet' type='text/css' href='styles.css'>\r\
        <script src='index.js'></scr" + "ipt>\r\
    </head>\r\
    <body>\r\
        \r\
    </body>\r</html>", 'css': "/*Enter code here*/\r", 'js':"//Enter code here\r"});

        for (var i = 0; i < savedProjects.length; i++) {
            projectList.push(savedProjects[i]);
        }

        document.getElementById("saved-projects").innerHTML = localStorage.getItem("savedArea") || "";

        window.onbeforeunload = function(){
            localStorage.setItem("savedProjects", JSON.stringify(savedProjects));
            document.getElementsByClassName("cur")[0].classList.remove("cur");
            localStorage.setItem("savedArea", document.getElementById("saved-projects").innerHTML);
        };


        /*
         * Set multi file display as default and resize code areas
         */

        onedisp();
        resized();


        /*
         * Initialize ace editors
         */

        var aceEditor = window.ace.edit(htmleditor);

        aceEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
            wrap: true,
            maxLines: 47,
            fontSize: "12px"
        });

        aceEditor.setTheme("ace/theme/idle_fingers");
        aceEditor.getSession().setMode("ace/mode/html");

        aceEditor = window.ace.edit(csseditor);

        aceEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
            wrap: true,
            maxLines: 47,
            fontSize: "12px"
        });

        aceEditor.setTheme("ace/theme/idle_fingers");
        aceEditor.getSession().setMode("ace/mode/css");

        aceEditor = window.ace.edit(jseditor);

        aceEditor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
            wrap: true,
            maxLines: 47,
            fontSize: "12px"
        });

        aceEditor.setTheme("ace/theme/idle_fingers");
        aceEditor.getSession().setMode("ace/mode/javascript");


        /*
         * Show initial output dimensions
         */

        document.getElementById("height").innerHTML = document.getElementById("output1").scrollHeight;
        document.getElementById("width").innerHTML = document.getElementById("output1").scrollWidth;


        /*
         * Compile the three files and displays the result in the
         * output iframe on every keyup instance if autocompile is on.
         */

        function compile() {
            if (document.getElementById("auto-comp").value === "On") {
                var ed_html = ace.edit("htmleditor");
                var ed_css = ace.edit("csseditor");
                var ed_js = ace.edit("jseditor");
                var frame = document.getElementById("output1");
                var code = document.getElementById("output1").contentWindow.document;

                code.open();
                code.writeln(ed_html.getValue() + "<style>" + ed_css.getValue() + "</style>" + "<script>" + ed_js.getValue() + "</scrip" + "t>");
                code.close();
            }
        }


        /*
         * Compile when autocompile is off and the Compile button is
         * clicked.
         */

        function compileBut() {
            var ed_html = ace.edit("htmleditor");
            var ed_css = ace.edit("csseditor");
            var ed_js = ace.edit("jseditor");
            var frame = document.getElementById("output1");
            var code = document.getElementById("output1").contentWindow.document;

            code.open();
            code.writeln(ed_html.getValue() + "<style>" + ed_css.getValue() + "</style>" + "<script>" + ed_js.getValue() + "</scrip" + "t>");
            code.close();
        }


        /*
         * Clear the contents of the 3 editors.
         */

        function clearall(){
            var ans = confirm("Are you sure you want to clear all files? All unsaved changes will be lost.");

            if (ans == true) {
                ace.edit("htmleditor").setValue("");
                ace.edit("csseditor").setValue("");
                ace.edit("jseditor").setValue("");
                compile();
            }
            else {
            }
        }


        /*
         * Open the New/Load Project menu.
         */

        function openLoad() {
            document.getElementById("load-wrapper").style.display = "block";
        }


        /*
         * Open the field to input the name of the saved project.
         */

        function saveProject() {
            document.getElementById("save-title").value = document.getElementsByClassName("proj-title")[0].innerHTML;
            document.getElementById("save-wrapper").style.display = "block";
        }


        /*
         * Toggle whether or not invisibles are displayed.
         */

        var invisibles = false;

        function toggleInvisibles() {
            if (invisibles === false) {
                ace.edit(htmleditor).setShowInvisibles(true);
                ace.edit(csseditor).setShowInvisibles(true);
                ace.edit(jseditor).setShowInvisibles(true);
                window.invisibles = true;
            }
            else {
                ace.edit(htmleditor).setShowInvisibles(false);
                ace.edit(csseditor).setShowInvisibles(false);
                ace.edit(jseditor).setShowInvisibles(false);
                window.invisibles = false;
            }
        }


        /*
         * Toggle whether or not indent guides are displayed.
         */

        var indentGuide = true;

        function toggleIndentGuides() {
            if (indentGuide === true) {
                ace.edit(htmleditor).setOption("displayIndentGuides", false);
                ace.edit(csseditor).setOption("displayIndentGuides", false);
                ace.edit(jseditor).setOption("displayIndentGuides", false);
                window.indentGuide = false;
            }
            else {
                ace.edit(htmleditor).setOption("displayIndentGuides", true);
                ace.edit(csseditor).setOption("displayIndentGuides", true);
                ace.edit(jseditor).setOption("displayIndentGuides", true);
                window.indentGuide = true;
            }
        }


        /*
         * Copies a table of inputted size to clipboard.
         */

        function copytable() {
            var copyText = document.getElementById("copytoclip");
            var rows = document.getElementById("tbrows").value;
            var cols = document.getElementById("tbcols").value;
            var tab = "<table>";
            var ten = "</table>";
            var row = "    <tr>";
            var ren = "    </tr>";
            var col = "        <td>";
            var cen = "        </td>";

            copyText.value = "";
            copyText.value += tab+'\r';

            for (var i = 0; i < rows; i++) {
                copyText.value += row+'\r';

                for (var j = 0; j < cols; j++) {
                    copyText.value += col+'\r';
                    copyText.value += cen+'\r';
                }

                copyText.value += ren+'\r';
            }

            copyText.value += ten;

            alert("An empty "+i+" x "+j+" table was copied to your clipboard.");
            copyText.select();
            document.execCommand("copy");
        }


        /*
         * Change editor layout to show all 3 editors and adjust the
         * resize the ace editors to fit within the new height.
         */

        var codedisplay = 1;

        function multdisp() {
            window.codedisplay = 0;

            document.getElementById("dispone").style.opacity = "1";
            document.getElementById("dispmult").style.opacity = "0.3";
            document.getElementById("html-editor-wrapper").style.height = "calc(33.33333% - 25px)";
            document.getElementById("css-editor-wrapper").style.height = "calc(33.33333% - 25px)";
            document.getElementById("js-editor-wrapper").style.height = "calc(33.33333% - 25px)";
            document.getElementById("css-label").style.display = "block";
            document.getElementById("js-label").style.display = "block";
            document.getElementById("tabbut1").className = "nocurtab";
            document.getElementById("tabbut1").style.borderRight = "none";
            document.getElementById("tabbut2").style.display = "none";
            document.getElementById("tabbut3").style.display = "none";
            document.getElementById("html-editor-wrapper").className = "vis";
            document.getElementById("css-editor-wrapper").className = "vis";
            document.getElementById("js-editor-wrapper").className = "vis";

            resized();
        }


        /*
         * Change editor layout to show one editor, show tabs and
         * resize the ace editors to fit within the new height
         */

        function onedisp() {
            window.codedisplay = 1;

            document.getElementById("dispone").style.opacity = "0.3";
            document.getElementById("dispmult").style.opacity = "1";
            document.getElementById("html-editor-wrapper").style.height = "100%";
            document.getElementById("css-editor-wrapper").style.height = "100%";
            document.getElementById("js-editor-wrapper").style.height = "100%";
            document.getElementById("css-label").style.display = "none";
            document.getElementById("js-label").style.display = "none";
            document.getElementById("tabbut1").className = "curtab";
            document.getElementById("tabbut2").className = "nocurtab";
            document.getElementById("tabbut3").className = "nocurtab";
            document.getElementById("tabbut1").style.borderRight = "1px solid #383838";
            document.getElementById("tabbut2").style.display = "table-cell";
            document.getElementById("tabbut3").style.display = "table-cell";
            document.getElementById("html-editor-wrapper").className = "vis";
            document.getElementById("css-editor-wrapper").className = "invis";
            document.getElementById("js-editor-wrapper").className = "invis";

            resized();
        }


        /*
         * Display the html editor when the html tab is clicked.
         */

        function showhtmltab() {
            if (codedisplay === 1) {
                var htmltab = document.getElementById("tabbut1");
                var csstab = document.getElementById("tabbut2");
                var jstab = document.getElementById("tabbut3");

                htmltab.className = "curtab";
                csstab.className = "nocurtab";
                jstab.className = "nocurtab";

                document.getElementById("html-editor-wrapper").className = "vis";
                document.getElementById("css-editor-wrapper").className = "invis";
                document.getElementById("js-editor-wrapper").className = "invis";
            }
            else {}
        }


        /*
         * Display the css editor when the css tab is clicked.
         */

        function showcsstab() {
            var htmltab = document.getElementById("tabbut1");
            var csstab = document.getElementById("tabbut2");
            var jstab = document.getElementById("tabbut3");

            htmltab.className = "nocurtab";
            csstab.className = "curtab";
            jstab.className = "nocurtab";

            document.getElementById("html-editor-wrapper").className = "invis";
            document.getElementById("css-editor-wrapper").className = "vis";
            document.getElementById("js-editor-wrapper").className = "invis";
        }


        /*
         * Display the javascript editor when the javascript tab is
         * clicked.
         */

        function showjstab() {
            var htmltab = document.getElementById("tabbut1");
            var csstab = document.getElementById("tabbut2");
            var jstab = document.getElementById("tabbut3");

            htmltab.className = "nocurtab";
            csstab.className = "nocurtab";
            jstab.className = "curtab";

            document.getElementById("html-editor-wrapper").className = "invis";
            document.getElementById("css-editor-wrapper").className = "invis";
            document.getElementById("js-editor-wrapper").className = "vis";
        }


        /*
         * Set the height of the ace editors depending on the
         * container height whenever the window is resized
         * using the maxLines option.
         *
         * Varies depending on the selected editor display.
         */

        function resized() {

            if (codedisplay === 1) {
                document.getElementById("right").style.width = "calc(100vw - " + document.getElementById("left").scrollWidth + ")";
                document.getElementById("output1").style.width = "calc(100vw - " + document.getElementById("left").scrollWidth + ")";
                document.getElementById("height").innerHTML = document.getElementById("output1").scrollHeight;
                document.getElementById("width").innerHTML = document.getElementById("output1").scrollWidth;

                var height = (( window.innerHeight - 180)/16);
                var aceEditor = window.ace.edit(htmleditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true
                });
                aceEditor.resize();

                var aceEditor = window.ace.edit(csseditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true
                });
                aceEditor.resize();

                var aceEditor = window.ace.edit(jseditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true
                });
                aceEditor.resize();
            }
            else {
                document.getElementById("right").style.width = "calc(100vw - " + document.getElementById("left").scrollWidth + ")";
                document.getElementById("output1").style.width = "calc(100vw - " + document.getElementById("left").scrollWidth + ")";
                document.getElementById("height").innerHTML = document.getElementById("output1").scrollHeight;
                document.getElementById("width").innerHTML = document.getElementById("output1").scrollWidth;

                var height = (( window.innerHeight - 300)/48);
                var aceEditor = window.ace.edit(htmleditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true
                });
                aceEditor.resize();

                var aceEditor = window.ace.edit(csseditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true
                });
                aceEditor.resize();

                var aceEditor = window.ace.edit(jseditor);

                aceEditor.setOptions({
                    maxLines: height,
                    wrap: true

                });
                aceEditor.resize();
            }
        }


        /*
         * Add class 'cur' to the selected project in the load
         * menu and wait until 'Open' confirmed.
         */

        function setcur(element) {
            document.getElementsByClassName("cur")[0].classList.remove("cur");

            element.classList.add("cur");

            if (element.id === "p0" || element.id === "p1") {
                document.getElementById("delete-project").style.opacity = "0";
                document.getElementById("delete-project").style.pointerEvents = "none";
            }
            else {
                document.getElementById("delete-project").style.opacity = "0.5";
                document.getElementById("delete-project").style.pointerEvents = "auto";
            }
        }


        /*
         * Close the Open Project menu.
         */

        function closeLoad() {
            document.getElementById("load-wrapper").style.display = "none";
        }


        /*
         * Open the selected project from the Open Project menu.
         *
         * Projects are saved as objects that contain the code for each
         * file.
         *
         * Load the project files into the editor.
         */

        function openCur() {
            var index = document.getElementsByClassName("cur")[0].id.charAt(1);
            var pHTML = ace.edit("htmleditor");
            var pCSS = ace.edit("csseditor");
            var pJS = ace.edit("jseditor");

            pHTML.setValue(projectList[index].html);
            pCSS.setValue(projectList[index].css);
            pJS.setValue(projectList[index].js);
            pHTML.clearSelection();
            pCSS.clearSelection();
            pJS.clearSelection();
            closeLoad();
            compile();

            var nameList = document.getElementsByClassName("proj-title");

            if (index > 1) {
                for (var i = 0; i < nameList.length; i++) {
                    nameList[i].innerHTML = projectList[index].name;
                }
            }

        }

        function deleteCur() {
            var curSelection = document.getElementsByClassName("cur")[0];
            var index = document.getElementsByClassName("cur")[0].id.charAt(1);

            var ans = confirm("Are you sure you want to perminently delete this project?");

            if (ans == true) {
                if (curSelection.id !== "p0" && curSelection.id !== "p1") {
                    curSelection.style.display = "none";
                    projectList[index].name = "NULLNULLNULL";
                }
                else {

                }
            }
            else {

            }

            setcur(document.getElementById("p0"));
        }


        /*
         * Create and display a full screen iframe that contains the
         * contents of the output iframe.
         */

        function fullScreen() {
            document.getElementById("iframe-area").innerHTML = "<iframe id='fullscreen'></iframe>"

            var code = document.getElementById("fullscreen").contentWindow.document;
            var ed_html = ace.edit("htmleditor");
            var ed_css = ace.edit("csseditor");
            var ed_js = ace.edit("jseditor");

            code.open();
            code.writeln(ed_html.getValue() + "<style>" + ed_css.getValue() + "</style>" + "<script>" + ed_js.getValue() + "</scrip" + "t>");
            code.close();

            document.getElementById("fullscreen-wrapper").style.display = "block";
        }


        /*
         * Hide the full screen iframe and return to the editor.
         */

        function minimize() {
            document.getElementById("fullscreen-wrapper").style.display = "none";
        }


        /*
         * Hide the Save dialog when cancelled.
         */

        function closeSave() {
            document.getElementById("save-wrapper").style.display = "none";
        }


        /*
         * Create the project object and push it to the project list when
         * Save confirmed then add the project to the Saved Projects
         * menu.
         */

        function saveProjectFinal() {
            var pName = document.getElementById("save-title").value;
            var pHTML = ace.edit("htmleditor").getValue();
            var pCSS = ace.edit("csseditor").getValue();
            var pJS = ace.edit("jseditor").getValue();
            var index = projectList.length;

            var overwrite = 0;

            for (var i = 0; i < projectList.length; i++) {
                if (pName === projectList[i].name) {
                    overwrite = 1;
                    if (window.confirm("Saving this project as '" + pName + "' will overwrite any other project saved as '" + pName + "'. Do you wish to continue?")) {
                        window.projectList[i].html = pHTML;
                        window.projectList[i].css = pCSS;
                        window.projectList[i].js = pJS;

                        window.savedProjects[i-2].html = pHTML;
                        window.savedProjects[i-2].css = pCSS;
                        window.savedProjects[i-2].js = pJS;
                    }
                    else {
                    }
                }
            }

            if (overwrite === 0) {
                window.projectList.push({'name': pName, 'html':pHTML, 'css':pCSS, 'js': pJS});
                window.savedProjects.push({'name': pName, 'html':pHTML, 'css':pCSS, 'js': pJS});

                document.getElementById("saved-projects").innerHTML += "<div class='project-box' id='p" + index + "' onclick='setcur(this)'><div class='project-img'><i class='material-icons'>code</i></div><div class='project-title'>" + pName + "</div><div class='project-date'>HTML, CSS, JavaScript</div></div>";
            }

            closeSave();
        }

        function download() {
            var ext = document.getElementById("ext");
            var pHTML = ace.edit("htmleditor").getValue();
            var pCSS = ace.edit("csseditor").getValue();
            var pJS = ace.edit("jseditor").getValue();

            if (ext.value === ".zip") {
                var zip = new JSZip();
                zip.file("index.html", pHTML);
                zip.file("styles.css", pCSS);
                zip.file("index.js", pJS);
                zip.generateAsync({type:"blob"})
                .then(function(content) {
                    saveAs(content, document.getElementsByClassName("proj-title")[0].innerHTML + ".zip");
                });

            }
            else if (ext.value === ".html") {
                var textToWrite = pHTML;
                var writeUp = "";

                for (var i = 0; i < textToWrite.length; i++) {
                    writeUp += textToWrite.charAt(i);
                }

                var textFileAsBlob = new Blob([writeUp], {type:'text/plain'});
                var downloadLink = document.createElement("a");

                downloadLink.download = "index.html";
                downloadLink.innerHTML = "Download File";

                if (window.webkitURL != null) {
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                }
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";

                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();
            }
            else if (ext.value === ".html + .css + .js") {
                var textToWrite = pHTML + "	\r\
                <style>\r\
                " + pCSS + "	\r\
                </style>\r\
                <script>\r\
                " + pJS + "\r\
                </scri" + "pt>";
                var writeUp = "";

                for (var i = 0; i < textToWrite.length; i++) {
                    writeUp += textToWrite.charAt(i);
                }

                var textFileAsBlob = new Blob([writeUp], {type:'text/plain'});
                var downloadLink = document.createElement("a");

                downloadLink.download = "index.html";
                downloadLink.innerHTML = "Download File";

                if (window.webkitURL != null) {
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                }
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";

                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();
            }
            else if (ext.value === ".css") {
                var textToWrite = pCSS;
                var writeUp = "";

                for (var i = 0; i < textToWrite.length; i++) {
                    writeUp += textToWrite.charAt(i);
                }

                var textFileAsBlob = new Blob([writeUp], {type:'text/plain'});
                var downloadLink = document.createElement("a");

                downloadLink.download = "styles.css";
                downloadLink.innerHTML = "Download File";

                if (window.webkitURL != null) {
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                }
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";

                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();
            }
            else {
                var textToWrite = pJS;
                var writeUp = "";

                for (var i = 0; i < textToWrite.length; i++) {
                    writeUp += textToWrite.charAt(i);
                }

                var textFileAsBlob = new Blob([writeUp], {type:'text/plain'});
                var downloadLink = document.createElement("a");

                downloadLink.download = "index.js";
                downloadLink.innerHTML = "Download File";

                if (window.webkitURL != null) {
                    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
                }
                else {
                    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                    downloadLink.onclick = destroyClickedElement;
                    downloadLink.style.display = "none";

                    document.body.appendChild(downloadLink);
                }

                downloadLink.click();
            }
        }

        function changeName(rootName) {
            var newName = rootName.innerHTML;
            var nameList = document.getElementsByClassName("proj-title");

            for (var i = 0; i < nameList.length; i++) {
                nameList[i].innerHTML = newName;
            }
        }
