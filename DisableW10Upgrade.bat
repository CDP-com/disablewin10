:: This Batch File does followings:
::     1. Check whether gwx.exe is runing, kill it if it is.
::     2. Disable all windows 10 update related settings in registry.
::     3. Serch for gwx.exe file, rename it to gwx1.exe if found so scheduled task can't start it again.
::     4. Disable GWX task
@echo off
Setlocal EnableDelayedExpansion

set "str=\system32"
set "strPath=%windir%%str%"

tasklist /FI "IMAGENAME eq gwx.exe" 2>NUL | find /I /N "gwx.exe">NUL  
if "%ERRORLEVEL%"=="0" taskkill /F /IM GWX.exe /T > NUL
regedit /s %~dp0\DisableW10Upgrade.reg

for /r %strPath% %%a in (*) do (
    if /I "%%~nxa"=="gwx.exe" (
        set p=%%~dpnxa  
        set pa=%%~dpa
    )
)

if defined p (  
    if !pa:~-1!==\ SET pa=!pa:~0,-1!
    REM echo !pa!    
    takeown /F %p% /A > NUL
    ICACLS %p% /grant "*S-1-5-32-544:(D,WDAC)" >NUL
    ren %p% GWX1.exe
)

schtasks /query /TN "\Microsoft\Windows\Setup\gwx\launchtrayprocess" > NUL
if "%ERRORLEVEL%"=="0" schtasks /change /TN "\Microsoft\Windows\Setup\gwx\launchtrayprocess" /DISABLE  > NUL

Echo Windows 10 Update is disabled.
Echo Windows 10 Update is disabled on %date% at %time% >> %ALLUSERSPROFILE%\CDP\SnapBack\Logs\W10Update.log

pause