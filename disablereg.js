// JavaScript Document To Run Batch that Disables Win 10 Popup

var shell = new ActiveXObject ( "WScript.Shell" );
var theCommand = shell.ExpandEnvironmentStrings("%PROGRAMDATA%\\CDP\\SnapBack\\Apps\\disablewindows10\\DisableW10Upgrade.bat");

var ret = shell.Run(theCommand,0,false);
shell = null;
