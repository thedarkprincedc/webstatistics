/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(['sap/ui/core/theming/Parameters'],function(P){"use strict";var S={};S.appendShapeStrings=function(d){d.forEach(function(i){if(i.graphicInfo){i.shapeString=g(i.graphicInfo);delete i.graphicInfo;}});};var g=function(o){var s='';if(o.color&&(typeof o.color==='string')){var m=10,p=m/2,a=p,w=m,h=m,i=o.type==='line';if(o.type&&i){p=m;w=m*2;m=6;}var b={rx:m/2,ry:m/2,type:o.shape,borderWidth:0};s=s+'<svg width='+w+'px height='+h+'px '+'focusable = false>';if(i){var l=o.lineInfo;var c=P.get(l.lineColor)||l.lineColor||o.color;if(l.lineType==='dotted'||l.lineType==='dash'){s=s+"<line x1 = '0' y1='"+a+"' x2 = '"+w+"' y2 = '"+a+"' stroke-width = '2' stroke-dasharray = '5, 3' ";}else if(l.lineType==='dot'){var d=Math.floor(w/2);d=d&1?d:d-1;if(d<3){d=3;}var e=w/d;s=s+"<line x1 ='"+(e/2)+"'y1='"+a+"' x2 = '"+w+"' y2 = '"+a+"' stroke-dasharray = ' 0,"+e*2+"' ";s=s+"stroke-width = '"+e+"' stroke-linecap = 'round'";}else{s=s+"<line x1 = '0' y1='"+a+"' x2 = '"+w+"' y2 = '"+a+"' stroke-width = '2' ";}s=s+" stroke = '"+c+"'> </line>";}s=s+"<path d = '"+S.generateShapePath(b)+"'";if(!o.pattern){s=s+" fill = '"+o.color+"'";}else if(o.pattern==='noFill'){var C=P.get('sapUiChartBackgroundColor');if(C==='transparent'){C="white";}s=s+" fill = '"+C+"'";s=s+" stroke = '"+o.color+"' stroke-width= '1px'";}else{s=s+" fill = '"+o.pattern+"'";}s=s+" transform = 'translate("+p+","+a+")'></path>";s=s+'</svg>';}return s;};S.generateShapePath=function(p){var a;var t=p.borderWidth/2;switch(p.type){case"circle":a="M"+(-p.rx-t)+",0 A"+(p.rx+t)+","+(p.ry+t)+" 0 1,0 "+(p.rx+t)+",0 A";a+=(p.rx+t)+","+(p.ry+t)+" 0 1,0 "+(-p.rx-t)+",0z";break;case"cross":a="M"+(-p.rx-t)+","+(-p.ry/3-t)+"H"+(-p.rx/3-t)+"V"+(-p.ry-t)+"H"+(p.rx/3+t);a+="V"+(-p.ry/3-t)+"H"+(p.rx+t)+"V"+(p.ry/3+t)+"H"+(p.rx/3+t);a+="V"+(p.ry+t)+"H"+(-p.rx/3-t)+"V"+(p.ry/3+t)+"H"+(-p.rx-t)+"Z";break;case"diamond":a="M0,"+(-p.ry-t)+"L"+(p.rx+t)+",0"+" 0,"+(p.ry+t)+" "+(-p.rx-t)+",0"+"Z";break;case"triangle-down":case"triangleDown":a="M0,"+(p.ry+t)+"L"+(p.rx+t)+","+-(p.ry+t)+" "+-(p.rx+t)+","+-(p.ry+t)+"Z";break;case"triangle-up":case"triangleUp":a="M0,"+-(p.ry+t)+"L"+(p.rx+t)+","+(p.ry+t)+" "+-(p.rx+t)+","+(p.ry+t)+"Z";break;case"triangle-left":case"triangleLeft":a="M"+-(p.rx+t)+",0L"+(p.rx+t)+","+(p.ry+t)+" "+(p.rx+t)+","+-(p.ry+t)+"Z";break;case"triangle-right":case"triangleRight":a="M"+(p.rx+t)+",0L"+-(p.rx+t)+","+(p.ry+t)+" "+-(p.rx+t)+","+-(p.ry+t)+"Z";break;case"intersection":a="M"+(p.rx+t)+","+(p.ry+t)+"L"+(p.rx/3+t)+",0L"+(p.rx+t)+","+-(p.ry+t)+"L";a+=(p.rx/2-t)+","+-(p.ry+t)+"L0,"+(-p.ry/3-t)+"L"+(-p.rx/2+t)+","+-(p.ry+t)+"L";a+=-(p.rx+t)+","+-(p.ry+t)+"L"+-(p.rx/3+t)+",0L"+-(p.rx+t)+","+(p.ry+t)+"L";a+=(-p.rx/2+t)+","+(p.ry+t)+"L0,"+(p.ry/3+t)+"L"+(p.rx/2-t)+","+(p.ry+t)+"Z";break;case'squareWithRadius':var r=p.rx;var b=r-3;a="M0,"+-r+"L"+-b+","+-r+"Q"+-r+","+-r+" "+-r+","+-b+"L"+-r+","+b+"Q"+-r+","+r+" "+-b+","+r;a+="L"+b+","+r+"Q"+r+","+r+" "+r+","+b+"L"+r+","+-b+"Q"+r+","+-r+" "+b+","+-r+"Z";break;case"square":case"sector":default:a="M"+(-p.rx-t)+","+(-p.ry-t)+"L"+(p.rx+t)+",";a+=(-p.ry-t)+"L"+(p.rx+t)+","+(p.ry+t)+"L"+(-p.rx-t)+","+(p.ry+t)+"Z";break;}return a;};return S;});
