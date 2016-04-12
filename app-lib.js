//***** Use this file to set up your buttons and include any custom functions for your app *****
// 
var development = 0;						// 1 this app is in development, 0 this app is in production
//var currentUserDefaultCaution = "0";		// **This is the global Throw caution to the wind flag for the current use

/*-----------------------------------------------------*/
/*-------------- Standard App Variables ---------------*/
/*-----------------------------------------------------*/

var appname = "disablewindows10";				// This app's name / folder name which must be unique
var apptitle = "Disable Windows 10 Notification";				// This display title written to the HTML
var connect_link = "http://factory.snapback-apps.com/app/disable-windows-10-notification/";     // The link to your App's Connect Page in the SnapBack Apps Factory 
var group_name ="App Helpers";				// The group or individual responsible for this app

/*-----------------------------------------------------*/
/*---------------------- Buttons ----------------------*/
/*-----------------------------------------------------*/

var btncount = 2;                            // This is the number of buttons on the App Home tab in main.html

//Setup for Button0 (The First Button)
var btn0_Title = "Disable Win 10 Notification";		// This is what is displayed on the button.
var btn0_MouseOver = "Click this button to disable your Windows 10 notification until July 22, 2016";	// This is what appears upon mouseover for the button.
var btn0_Description = "Clicking this button will disable the Windows 10 notification until July 22, 2016.";		// This is what is displayed as the description of the button.
var btn0_Why = "You would want to run this button if you are currently receiving the Upgrade to Windows 10 notification and you wish to disable it.";		// Use this to explain to an end user why they would want to run this button.
var btn0_Command = "disablereg.js";	// This is the actual script the button will be calling.
var btn0_Source = "disablereg.txt";    // Duplicate the above script as a .txt file so that the source code can be shown on the How it Works tab.
var btn0_CommandParms = "";                 // Add any parameters if and only if your command receives them.
var btn0_ReloadAfterRun = 1; 
var btn0_id="btn0";							// The unique ID of the button.  Please follow the format provided.

// Permissions for button0 to be set in HKEY_LOCAL_MACHINE 
// Don't forget to edit the complementary app-reg.reg file and run it as an administrator
var btn0_KeyValue="button0"; 				// Key value name for the registry
var btn0_DefaultEnableButton=1;
var btn0_CurrentEnableButton=1;        		// Display on Permissions tab.  Only an admin can modify current values 
var btn0_LastModifiedEnableButton="";  		// Update timestamp if admin modifies current value
var btn0_DefaultAllowUser=1;
var btn0_CurrentAllowUser=1;         		// Display on Permissions tab.  Only an admin can modify current values 
var btn0_LastModifiedAllowUser="";   		// Update timestamp if admin modifies current value
var btn0_DefaultCaution=1;
var btn0_CurrentCaution=1;           		// Display on Permissions tab.  Only an admin can modify current values 
var btn0_LastModifiedCaution="";     		// Update timestamp if admin modifies current value
//var buttonname0 ="";

// Service Information for Button0
// This is used in production only and verified by the Certification Committee
// Do not edit if you are unfamiliar with the SnapBack Apps Service
var btn0_ServiceName="btn0";                    // A unique name if using the service.  Need by service in xml file for button 
var btn0_ElevateNeeded=1;                  	// Does this button need elevation? Needed by service in xml file for button
var btn0_ScriptHasUI=0;                    	// Does the script have an UI? Needed by service in xml file for button





//Setup for Button1 (The Second Button)
var btn1_Title = "Enable Windows 10 Notification";		// This is what is displayed on the button.
var btn1_MouseOver = "Click this button to ENABLE your Windows 10 notification";	// This is what appears upon mouseover for the button.
var btn1_Description = "Clicking this button will enable the Windows 10 notification.";		// This is what is displayed as the description of the button.
var btn1_Why = "You would want to run this button if you are currently not receiving the Upgrade to Windows 10 notification and would like to enable it.";		// Use this to explain to an end user why they would want to run this button.
var btn1_Command = "enablereg.js";	// This is the actual script the button will be calling.
var btn1_Source = "enablereg.txt";    // Duplicate the above script as a .txt file so that the source code can be shown on the How it Works tab.
var btn1_CommandParms = "";                 // Add any parameters if and only if your command receives them.
var btn1_ReloadAfterRun =0; 
var btn1_id="btn1";							// The unique ID of the button.  Please follow the format provided.

// Permissions for button1 to be set in HKEY_LOCAL_MACHINE 
// Don't forget to edit the complementary app-reg.reg file and run it as an administrator
var btn1_KeyValue="button1"; 				// Key value name for the registry
var btn1_DefaultEnableButton=1;
var btn1_CurrentEnableButton=1;        		// Display on Permissions tab.  Only an admin can modify current values 
var btn1_LastModifiedEnableButton="";  		// Update timestamp if admin modifies current value
var btn1_DefaultAllowUser=1;
var btn1_CurrentAllowUser=1;         		// Display on Permissions tab.  Only an admin can modify current values 
var btn1_LastModifiedAllowUser="";   		// Update timestamp if admin modifies current value
var btn1_DefaultCaution=1;
var btn1_CurrentCaution=1;           		// Display on Permissions tab.  Only an admin can modify current values 
var btn1_LastModifiedCaution="";     		// Update timestamp if admin modifies current value
//var buttonname1 ="";

// Service Information for Button1
// This is used in production only and verified by the Certification Committee
// Do not edit if you are unfamiliar with the SnapBack Apps Service
var btn1_ServiceName="btn1";                    // A unique name if using the service.  Need by service in xml file for button 
var btn1_ElevateNeeded=1;                  	// Does this button need elevation? Needed by service in xml file for button
var btn1_ScriptHasUI=0;                    	// Does the script have an UI? Needed by service in xml file for button




	
/*-----------------------------------------------------*/
/*----------------- Custom Functions ------------------*/
/*-----------------------------------------------------*/	
//***** Use the below area for your common functions *****

function CheckStatus() {
	try {
		var DisableOSUpgrade = ReadFromRegistry("HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\DisableOSUpgrade");
		var s= "<div class='statusdiv'>";
		if (DisableOSUpgrade == 1) {
			s+="Windows 10 Notification is Currently <strong>DISABLED</strong> on this Machine";
		}
		else {
			s+="Windows 10 Notification is Currently <strong>ENABLED</strong> on this Machine";
		}
		s+="<br /><a onClick='window.location.reload()'>Click Here to Reload and See Your Changes</a></div>";
		document.write(s);
	}
	catch(e) {
		var s="<div class='statusdiv'>Windows 10 Notification is Currently <strong>ENABLED</strong> on this Machine<br /><a onClick='window.location.reload()'>Click Here to Reload and See Your Changes</a></div>";
		document.write(s);
	}
}

$(document).ready(function() {
	try {
		var DisableOSUpgrade = ReadFromRegistry("HKEY_LOCAL_MACHINE\\SOFTWARE\\Policies\\Microsoft\\Windows\\WindowsUpdate\\DisableOSUpgrade");
		if (DisableOSUpgrade == 1) {
			$( '#cdpbutton1 button' ).css('background-color','#e6e6e6').css( 'cursor', 'not-allowed' ).attr("disabled", 'disable').attr("title", 'This button cannot be clicked since the notification is already disabled');
		}
		else {
			$( '#cdpbutton2 button' ).css('background-color','#e6e6e6').css( 'cursor', 'not-allowed' ).attr("disabled", 'disable').attr("title", 'This button cannot be clicked since the notification is already enabled');
		}
	}
	catch(e) {
		$( '#cdpbutton2 button' ).css('background-color','#e6e6e6').css( 'cursor', 'not-allowed' ).attr("disabled", 'disable').attr("title", 'This button cannot be clicked since the notification is already enabled')
	}
})

