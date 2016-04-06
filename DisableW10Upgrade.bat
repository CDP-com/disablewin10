:: This Batch File does followings:
::     1. Check whether gwx.exe is runing, kill it if it is.
::     2. Disable all windows 10 update related settings in registry.
::     3. Serch for gwx.exe file, rename it to gwx1.exe if found so scheduled task can't start it again.
::
@echo off
Setlocal EnableDelayedExpansion

set "str=\windows\system32"
set "strPath=%SystemDrive%%str%"


tasklist /FI "IMAGENAME eq gwx.exe" 2>NUL | find /I /N "gwx.exe">NUL  
if "%ERRORLEVEL%"=="0" taskkill /F /IM GWX.exe /T
regedit /s "%~dp0\DisableW10Upgrade.reg"

for /r %strPath% %%a in (*) do (
    if /I "%%~nxa"=="gwx.exe" (
        set p=%%~dpnxa  
        set pa=%%~dpa
    )
)

if defined p (  
    if !pa:~-1!==\ SET pa=!pa:~0,-1!
    REM echo !pa!    
    takeown /F %p% /A
    ICACLS %p% /grant "*S-1-5-32-544:(D,WDAC)"
    ren %p% GWX1.exe
)

Echo Windows 10 Update is disabled.


pause