tinyMCEPopup.requireLangPack();var ed;
function init(){ed=tinyMCEPopup.editor;tinyMCEPopup.resizeToInnerSize();document.getElementById('backgroundimagebrowsercontainer').innerHTML=getBrowserHTML('backgroundimagebrowser','backgroundimage','image','table');document.getElementById('bordercolor_pickcontainer').innerHTML=getColorPickerHTML('bordercolor_pick','bordercolor');document.getElementById('bgcolor_pickcontainer').innerHTML=getColorPickerHTML('bgcolor_pick','bgcolor');var i=ed;var t=ed.dom.getParent(ed.selection.getStart(),"td,th");var f=document.forms[0];var s=ed.dom.parseStyle(ed.dom.getAttrib(t,"style"));var c=t.nodeName.toLowerCase();var a=ed.dom.getAttrib(t,'align')||getStyle(t,'text-align');var v=ed.dom.getAttrib(t,'valign')||getStyle(t,'vertical-align');var w=trimSize(getStyle(t,'width','width'));var h=trimSize(getStyle(t,'height','height'));var b=convertRGBToHex(getStyle(t,'bordercolor','borderLeftColor'));var d=convertRGBToHex(getStyle(t,'bgcolor','backgroundColor'));var e=ed.dom.getAttrib(t,'class');var g=getStyle(t,'background','backgroundImage').replace(new RegExp("url\\(['\"]?([^'\"]*)['\"]?\\)",'gi'),"$1");var j=ed.dom.getAttrib(t,'id');var l=ed.dom.getAttrib(t,'lang');var k=ed.dom.getAttrib(t,'dir');var m=ed.dom.getAttrib(t,'scope');addClassesToList('class','table_cell_styles');TinyMCE_EditableSelects.init();if(!ed.dom.hasClass(t,'mceSelected')){f.bordercolor.value=b;f.bgcolor.value=d;f.backgroundimage.value=g;f.width.value=w;f.height.value=h;f.id.value=j;f.lang.value=l;f.style.value=ed.dom.serializeStyle(s);selectByValue(f,'align',a);selectByValue(f,'valign',v);selectByValue(f,'class',e,true,true);selectByValue(f,'celltype',c);selectByValue(f,'dir',k);selectByValue(f,'scope',m);if(isVisible('backgroundimagebrowser'))document.getElementById('backgroundimage').style.width='180px';updateColor('bordercolor_pick','bordercolor');updateColor('bgcolor_pick','bgcolor');}else tinyMCEPopup.dom.hide('action');}
function updateAction(){var e,a=ed,t,b,c,f=document.forms[0];if(!AutoValidator.validate(f)){tinyMCEPopup.alert(AutoValidator.getErrorMessages(f).join('. ')+'.');return false;}tinyMCEPopup.restoreSelection();e=ed.selection.getStart();t=ed.dom.getParent(e,"td,th");b=ed.dom.getParent(e,"tr");c=ed.dom.getParent(e,"table");if(ed.dom.hasClass(t,'mceSelected')){tinymce.each(ed.dom.select('td.mceSelected,th.mceSelected'),function(l){updateCell(l);});ed.addVisual();ed.nodeChanged();a.execCommand('mceEndUndoLevel');tinyMCEPopup.close();return;}switch(getSelectValue(f,'action')){case"cell":var d=getSelectValue(f,'celltype');var g=getSelectValue(f,'scope');function doUpdate(s){if(s){updateCell(t);ed.addVisual();ed.nodeChanged();a.execCommand('mceEndUndoLevel');tinyMCEPopup.close();}};if(ed.getParam("accessibility_warnings",1)){if(d=="th"&&g=="")tinyMCEPopup.confirm(ed.getLang('table_dlg.missing_scope','',true),doUpdate);else doUpdate(1);return;}updateCell(t);break;case"row":var h=b.firstChild;if(h.nodeName!="TD"&&h.nodeName!="TH")h=nextCell(h);do{h=updateCell(h,true);}while((h=nextCell(h))!=null);break;case"col":var j,k=0,h=b.firstChild,r=c.getElementsByTagName("tr");if(h.nodeName!="TD"&&h.nodeName!="TH")h=nextCell(h);do{if(h==t)break;k+=h.getAttribute("colspan")?h.getAttribute("colspan"):1;}while((h=nextCell(h))!=null);for(var i=0;i<r.length;i++){h=r[i].firstChild;if(h.nodeName!="TD"&&h.nodeName!="TH")h=nextCell(h);j=0;do{if(j==k){h=updateCell(h,true);break;}j+=h.getAttribute("colspan")?h.getAttribute("colspan"):1;}while((h=nextCell(h))!=null);}break;case"all":var r=c.getElementsByTagName("tr");for(var i=0;i<r.length;i++){var h=r[i].firstChild;if(h.nodeName!="TD"&&h.nodeName!="TH")h=nextCell(h);do{h=updateCell(h,true);}while((h=nextCell(h))!=null);}break;}ed.addVisual();ed.nodeChanged();a.execCommand('mceEndUndoLevel');tinyMCEPopup.close();}
function nextCell(e){while((e=e.nextSibling)!=null){if(e.nodeName=="TD"||e.nodeName=="TH")return e;}return null;}
function updateCell(t,s){var i=ed;var f=document.forms[0];var b=t.nodeName.toLowerCase();var d=getSelectValue(f,'celltype');var e=i.getDoc();var g=ed.dom;if(!s)g.setAttrib(t,'id',f.id.value);g.setAttrib(t,'lang',f.lang.value);g.setAttrib(t,'dir',getSelectValue(f,'dir'));g.setAttrib(t,'style',ed.dom.serializeStyle(ed.dom.parseStyle(f.style.value)));g.setAttrib(t,'scope',f.scope.value);g.setAttrib(t,'class',getSelectValue(f,'class'));ed.dom.setAttrib(t,'align','');ed.dom.setAttrib(t,'vAlign','');ed.dom.setAttrib(t,'width','');ed.dom.setAttrib(t,'height','');ed.dom.setAttrib(t,'bgColor','');ed.dom.setAttrib(t,'borderColor','');ed.dom.setAttrib(t,'background','');t.style.width=getCSSSize(f.width.value);t.style.height=getCSSSize(f.height.value);t.style.textAlign=f.align.value;t.style.verticalAlign=f.valign.value;t.style.borderColor=f.bordercolor.value;t.style.backgroundColor=f.bgcolor.value;if(f.backgroundimage.value!="")t.style.backgroundImage="url('"+f.backgroundimage.value+"')";else t.style.backgroundImage='';if(b!=d){var n=e.createElement(d);for(var c=0;c<t.childNodes.length;c++)n.appendChild(t.childNodes[c].cloneNode(1));for(var a=0;a<t.attributes.length;a++)ed.dom.setAttrib(n,t.attributes[a].name,ed.dom.getAttrib(t,t.attributes[a].name));t.parentNode.replaceChild(n,t);t=n;}g.setAttrib(t,'style',g.serializeStyle(g.parseStyle(t.style.cssText)));return t;}
function changedBackgroundImage(){var f=document.forms[0];var s=ed.dom.parseStyle(f.style.value);s['background-image']="url('"+f.backgroundimage.value+"')";f.style.value=ed.dom.serializeStyle(s);}
function changedSize(){var f=document.forms[0];var s=ed.dom.parseStyle(f.style.value);var w=f.width.value;if(w!="")s['width']=getCSSSize(w);else s['width']="";var h=f.height.value;if(h!="")s['height']=getCSSSize(h);else s['height']="";f.style.value=ed.dom.serializeStyle(s);}
function changedColor(){var f=document.forms[0];var s=ed.dom.parseStyle(f.style.value);s['background-color']=f.bgcolor.value;s['border-color']=f.bordercolor.value;f.style.value=ed.dom.serializeStyle(s);}
function changedStyle(){var f=document.forms[0];var s=ed.dom.parseStyle(f.style.value);if(s['background-image'])f.backgroundimage.value=s['background-image'].replace(new RegExp("url\\('?([^']*)'?\\)",'gi'),"$1");else f.backgroundimage.value='';if(s['width'])f.width.value=trimSize(s['width']);if(s['height'])f.height.value=trimSize(s['height']);if(s['background-color']){f.bgcolor.value=s['background-color'];updateColor('bgcolor_pick','bgcolor');}if(s['border-color']){f.bordercolor.value=s['border-color'];updateColor('bordercolor_pick','bordercolor');}if(s['text-align'])f.align.value=s['text-align'];if(s['vertical-align'])f.valign.value=s['vertical-align'];}
tinyMCEPopup.onInit.add(init);